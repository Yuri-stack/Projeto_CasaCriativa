const sqlite3 = require('sqlite3').verbose();       //importando a biblioteca sqlite3
const db = new sqlite3.Database('./workshop.db');   //instanciando e definindo onde está o db

db.serialize(() => {

    //criando a tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id integer primary key autoincrement,
            img text,
            title text,
            category text,
            description text,
            link text            
        );
    `)

    //inserindo dados
    // const query = `
    // INSERT INTO ideas(
    //     img,
    //     title,
    //     category,
    //     description,
    //     link
    // )VALUES (?,?,?,?,?);
    // `
    // const values = [
    //     "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    //     "Curso de Programação 2",
    //     "Estudo",
    //     " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //     "https://rocketseat.com.br"
    // ]

    // db.run(query, values, function(err){
    //     if (err) return console.log(err)

    //     console.log(this);

    // })

    //consultando a table
    // db.all(`SELECT * FROM ideas`, function(err, rows){
    //     if (err) return console.log(err)

    //     console.log(rows);
    // })

    //deletando uma ideia
    // db.run(`DELETE FROM ideas WHERE id = ?`, [19], function(err){
    //     if (err) return console.log(err)

    //     console.log("DELETEI", this)
    // })
})

module.exports = db     //exportando o banco de dados
