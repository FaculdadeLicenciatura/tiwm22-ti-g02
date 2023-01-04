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

const GetBilhetes = () => {
    $.ajax(url).done(function(xml){
        $(xml).find("Artigo").each(function(){
            console.log($(this).find("Categoria").text())
            if($(this).find("Categoria").text() == "Bilhete")
            {
                $("#precos").append(`<table>
                        <thead>
                            <tr>
                                <td colspan="7">
                                    Nome
                                </td>
                                <td colspan="3">
                                    Preco
                                </td>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="7">
                                    ${$(this).find("Nome").text()}
                                </td>
                                <td colspan="3">
                                    ${$(this).find("Preco").text()}
                                </td>
                            </tr>
                        </tbody>
                    </table>`);
            }
            
        });
    }).fail(function(){
        alert("fuck");
    })
}

