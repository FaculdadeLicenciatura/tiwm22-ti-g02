let url = "../xml/zoo.xml";


const getAnimals = ()=> {
    $.ajax(url).done(function(xml){
        $(xml).find("Animal").each(function(){
            $("#animais").append(`<div class="animal">
                                 <img src="${$(this).find("Foto").text()}" class="image">
                                <p>${$(this).find("Nome").text()}</p>
                                <p>${$(this).find("Idade").text()}</p>
                                <p>${$(this).find("Especie").text()} ${$(this).find("SubEspecie").text()}</p>
                                </div>`);
        });
    }).fail(function(){
        alert("fuck");
    })
}

