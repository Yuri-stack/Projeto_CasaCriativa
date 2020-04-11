function onOff(){
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")

    document
        .querySelector("body")
        .classList
        .toggle("hideScroll")

    document
        .querySelector("#modal")
        .classList
        .toggle("addScroll")
}

function checkFields(e){
    const valuesToCheck = [
        "title",
        "img",
        "category",
        "description",
        "link",
    ]

    const isEmpty = valuesToCheck.find(function(value){
        const checkIfIsString = typeof e.target[value].value === "string"   //verificando se os campos input tem um valor identico a String
        const checkIfIsEmpty = !e.target[value].value.trim()              //verificando se o campo está vazio

        if(checkIfIsString && checkIfIsEmpty){
            return true;
        }
    })

    if(isEmpty){
        event.preventDefault()
        alert("Preencha todos os campos")
    }
}
