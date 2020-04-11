const express = require('express');     //importando a biblioteca do express para simular o servidor
const server = express();               //instanciando o express
const nunjucks = require('nunjucks');   //importando a biblioteca nunjucks

const db = require("./db")              //importando o arquivo db

server.use(express.static('public'));   //configurando para que o servidor enxergue os arquivos estáticos

server.use(express.urlencoded({extended: true}))    //habilitando o método req.body

nunjucks.configure('views', {           //configurando o nunjucks
    express: server,
    noCache: true,
})

server.get("/", function(req, res){                     //criando a rota de acesso para o index

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err){
            console.log(err)
            return res.send("Erro no banco de dados");
        }
    
        const reversedIdeas = [...rows].reverse()       //colocando todo o conteudo das Rows que estão no banco nessa nova variavel
                                                        //invertendo a ordem dos itens do array
        let lastIdeas = []
        for(let ideia of reversedIdeas){     
            if(lastIdeas.length < 3){
                lastIdeas.push(ideia)
            }
        }    

        return res.render('index.html', {ideias: lastIdeas})        //__dirname é o caminho do documento
    })

})

server.get("/ideias", function(req, res){    

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err){
            console.log(err)
            return res.send("Erro no banco de dados");
        }

        const reversedIdeas = [...rows].reverse()    

        return res.render('ideias.html', {ideias: reversedIdeas})   //render é usado para carregar a pagina

    });

})

server.post("/", function(req, res){
    //inserindo dados

    const query = `
        INSERT INTO ideas(
            img,
            title,
            category,
            description,
            link
        )VALUES (?,?,?,?,?);
    `
    const values = [
        req.body.img,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function(err){
        if (err){
            console.log(err)
            return res.send("Erro no banco de dados");
        }

        return res.redirect("/ideias"); //após o processo, redirecione para a pagina ideias

    })
})

server.listen(3000);    //carregamos o servidor na porta 3000