
$(function() {
    $('.carousel').carousel('cycle');
});

const getURL = () => {
    var url;
    console.log(window.location.href.split("/")[3])
    if(window.location.href.split("/")[3] == "index.html")
    {
        url = "./src/xml/zoo.xml"
    }
    else{
        url = "../xml/zoo.xml"
    }
    return url;
}

const getAnimals = () => {
    const url = getURL();
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

const getAnimalsByType = () => {
    const url = getURL();
    $.ajax(url).done(function (xml) {
        var getAnimalType = window.location.href.split('=')[1];
        $("#pageTitle").text(`A nossa familia de ${getAnimalType}`)
        $(xml).find("Animal").each(function () {
            if($(this).find("NomeTipoEspecie").text() == getAnimalType || getAnimalType == "Todos")
            {
                $("#animais").append(`
                <figure class="AnimalClass">
                    <img src="${$(this).find("Foto").text()}" class="image" alt="${$(this).find("Nome").text()} Image"/>
                    <figcaption class="AnimalFigCaption">
                        <h2>${$(this).find("Nome").text()}<span>${$(this).find("NomeEspecie").text()} ${$(this).find("NomeSubEspecie").text()}</span></h2><h3><span class="customAge">${$(this).find("Idade").text()} Anos</span></h3>
                        <p>${$(this).find("SmallDesc").text()}</p>
                        <a href="./animal-details.html?Nome=${$(this).find("Nome").text()}" class="info">Mais Informações</a>
                    </figcaption>
                </figure>`);
            }
        })
    }).fail(function () {
        alert("Erro");
    })
}

const getEspecies = () => {
    const url = getURL();
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
    const url = getURL();
    $.ajax(getURL()).done(function (xml) {
        var distinct = [];
        $(xml).find("Tipo").each(function () {
            if(distinct.includes($(this).find("NomeTipoEspecie").text()))
            {
                return;
            }
            else
            {
            $("#subespecies").append(`
            <figure class="AnimalClass">
            <img src="${$(this).find("ImagemTipoEspecie").text()}" class="image" alt="${$(this).find("NomeTipoEspecie").text()} Image"/>
                <figcaption>
                    <h2>${$(this).find("NomeTipoEspecie").text()}<span> Habitat: ${$(this).find("HabitatTipoEspecie").text()}</span></h2>
                    <p>${$(this).find("SmallDescTipoEspecie").text()}</p>
                    <a href="./src/html/animals.html?tipo=${$(this).find("NomeTipoEspecie").text()}" class="info">Ver Mais</a>
                </figcaption>
            </figure>`);
            distinct.push($(this).find("NomeTipoEspecie").text());
        }});
    }).fail(function () {
        alert("Erro");
    })
}
const GetBilhetes = () => {
    const url = getURL();
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

const getEspecieDetail = () => {
    const url = getURL();
    $.ajax(url).done(function (xml) {
        var getAnimalType = window.location.href.split('=')[1];
        $(xml).find("Animal").each(function () {
            if($(this).find("Nome").text() == getAnimalType || getAnimalType == "Todos")
            {
                $("#sectiondetails").append(`
                

                <section class="col-md-6 ">
                    <article class="post-wrap col-sm-12">
                        <section class="featured-media">
                        <section class="image-container">
                            <!--alterar-->
                            <img class="img-thumbnail image-rei"
                            src="${$(this).find("Foto").text()}">
                        </section>
                        </section>
                        <h1 class="title">${$(this).find("NomeEspecie").text()}</h1>
                        <section class="post-entry">
                        <p>${$(this).find("Descricao").text()}</p>
                        </section>
                    </article>
                    </section>
                    <section class="col-md-6">
                    <article class="sppb-addon-content">
                        <p><strong>Descrição Pequena</strong><br> <em>${$(this).find("SmallDesc").text()}</em></p>
                        <p><strong>Nome do Tipo de Especie<br></strong>${$(this).find("NomeTipoEspecie").text()}</p>
                        <p><strong>Habitat <br></strong>${$(this).find("HabitatTipoEspecie").text()}</p>
                        <p><strong>Info da Especie<br></strong>${$(this).find("InfoEspecie").text()}</p>
                        <p><strong>Local<br></strong>${$(this).find("Local").text()}</p>
                        <p><strong>Idade<br></strong>${$(this).find("Idade").text()} Anos</p>
                        <p>&nbsp;</p>
                    </article>
                </section>
                `);
            }
        })
    }).fail(function () {
        alert("Erro lol");
    })
}
