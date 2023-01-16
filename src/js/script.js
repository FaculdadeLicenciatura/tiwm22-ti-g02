
$(function() {
    $('.carousel').carousel('cycle');
});

const getURL = () => {
    var url;
    if(window.location.href.split("/")[4] == "index.html")
    {
        url = "./xml/zoo.xml"
    }
    else{
        url = "../xml/zoo.xml"
    }
    return url;
}
function submitForm() {
    // Get form data
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
  
    var data = {
        service_id: 'service_r7utrm4',
        template_id: 'template_v95074k',
        user_id: 'user_wZaMbT1BRr0apWJA897IS',
        template_params: {
            'username': name,
            'message': message,
            'reply_to' : email
        }
    };
     
    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
    }).done(function() {
        alert('Contacto Enviado!');
    }).fail(function(error) {
        alert('Oops... Erro!' + JSON.stringify(error));
    });
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
        alert("Erro ao ir buscar os animais");
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
        alert("Erro ao ir buscar os animais pelo tipo");
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
        alert("Erro ao ir buscar as especies");
    })
}


const getAnimalType = () => {
    const url = getURL();
    $.ajax(url).done(function (xml) {
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
                    <a href="./html/animals.html?tipo=${$(this).find("NomeTipoEspecie").text()}" class="info">Ver Mais</a>
                </figcaption>
            </figure>`);
            distinct.push($(this).find("NomeTipoEspecie").text());
        }});
    }).fail(function () {
        alert("Erro ao ir buscar o tipo de animais");
    })
}
const GetArtigos = () => {
    const url = getURL();
    $.ajax(url).done(function (xml) {
        $(xml).find("Artigo").each(function () {
           
            if($(this).find("Categoria").text() == "Artigo")
            {
                $("#articles").append(`
                <figure class="AnimalClass">
                    <img src="${$(this).find("Foto").text()}" class="image" alt="${$(this).find("Nome").text()} Image"/>
                    <figcaption>
                        <h2>${$(this).find("Nome").text()}</h2>
                        <h3>${$(this).find("Preco").text() + "€"}</h3>
                        <a href="" class="info">Comprar</a>
                    </figcaption>
                </figure>
                `)
            }
        });
    }).fail(function () {
        alert("Erro ao ir buscar os artigos");
    })

}

const GetBilhetes = () => {
    const url = getURL();
    $.ajax(url).done(function (xml) {
        $(xml).find("Artigo").each(function () {
            if ($(this).find("Categoria").text() == "Bilhete") {
                $(".tbody").append(`
                    <tr>
                        <td>
                            ${$(this).find("Nome").text()}
                        </td>
                        <td>
                            ${$(this).find("Preco").text() + "€"}
                        </td>
                        <td>
                            ${$(this).find("Quantidade").text()}
                        </td>
                    </tr>`);
            }

        });
    }).fail(function () {
        alert("Erro ao ir buscar os bilhetes");
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
        alert("Erro ao ir buscar os detalhes do animal");
    })
}

const GetEmployees = () => {
    const url = getURL();
    $.ajax(url).done(function (xml) {
        $(xml).find("funcionario").each(function () {
            console.log($(this).find("Nome").text())
            $(".Employees").append(`
                <figure class="Employee">
                        <img src="${$(this).find("Foto").text()}" alt="${$(this).find("Nome").text()}" class="EmpImage">
                        <figcaption>
                            <h3>${$(this).find("Nome").text()}</h5>
                            <p>${$(this).find("Descricao").text()}</p>
                            <p>${$(this).find("Especialidade").text()}</p>
                        </figcaption>
                </figure>
                `)
        });
    }).fail(function () {
        alert("Erro ao ir buscar os artigos");
    })

}
