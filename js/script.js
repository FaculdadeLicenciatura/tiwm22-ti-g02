let url = "../xml/zoo.xml";
const getAnimals = () => {
    $.ajax(url).done(function (xml) {
        $(xml).find("Animal").each(function () {
            $("#animais").append(`
            <figure class="AnimalClass">
                <img src="${$(this).find("Foto").text()}" class="image" alt="${$(this).find("Nome").text()} Image"/>
                <figcaption>
                    <h2>${$(this).find("Nome").text()}<span>${$(this).find("NomeEspecie").text()} ${$(this).find("NomeSubEspecie").text()}</span></h2><h3><span class="customAge">${$(this).find("Idade").text()} Anos</span></h3>
                    <p>${$(this).find("SmallDesc").text()}</p>
                    <a href="#" class="info">Mais Informações</a>
                </figcaption>
            </figure>`);
        });
    }).fail(function () {
        alert("Erro");
    })
}
const getEspecies = () => {
    $.ajax(url).done(function (xml) {
        $(xml).find("Especie").each(function () {
            $("#especies").append(`
            <figure class="AnimalClass">
                <figcaption>
                    <h2>${$(this).find("NomeEspecie").text()}<span>${$(this).find("Tipo").text()}</span></h2>
                    <a href="#" class="info">Mais Informações</a>
                </figcaption>
            </figure>`);
        });
    }).fail(function () {
        alert("Erro");
    })
}
const getAnimalType = () => {
    $.ajax(url).done(function (xml) {
        var distinct = [];
        $(xml).find("Especie").each(function () {
            if(distinct.includes($(this).find("Tipo").text()))
            {
                return;
            }
            else
            {
            $("#subespecies").append(`
            <figure class="AnimalClass">
                <figcaption>
                    <h2>${$(this).find("Tipo").text()}<span> Habitat: ${$(this).find("Local").text()}</span></h2>
                    <a href="#" class="info">Ver Mais</a>
                </figcaption>
            </figure>`);
            distinct.push($(this).find("Tipo").text());
        }});
    }).fail(function () {
        alert("Erro");
    })
}
const GetBilhetes = () => {
    $.ajax(url).done(function (xml) {
        $(xml).find("Artigo").each(function () {
            console.log($(this).find("Categoria").text())
            if ($(this).find("Categoria").text() == "Bilhete") {
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
    }).fail(function () {
        alert("fuck");
    })
}

