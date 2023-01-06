let url = "../xml/zoo.xml";


// const getAnimals = ()=> {
//     $.ajax(url).done(function(xml){
//         $(xml).find("Animal").each(function(){
//             $("#animais").append(`
//                                  <figure><img src="${$(this).find("Foto").text()}" class="image"/></figure>
//                                 <p>${$(this).find("Nome").text()}</p>
//                                 <p>${$(this).find("Idade").text()}</p>
//                                 <p>${$(this).find("Especie").text()} ${$(this).find("SubEspecie").text()}</p>
//                                 </article>`);
//         });
//     }).fail(function(){
//         alert("fuck");
//     })
// }

const getAnimals = ()=> {
    $.ajax(url).done(function(xml){
        $(xml).find("Animal").each(function(){
            $("#animais").append(`
            <figure class="AnimalClass">
  <img src="${$(this).find("Foto").text()}" class="image" alt="${$(this).find("Nome").text()} Image"/>
  <figcaption>
    <h2>${$(this).find("Nome").text()}<span>${$(this).find("Especie").text()} ${$(this).find("SubEspecie").text()}</span></h2><h3><span class="customAge">${$(this).find("Idade").text()} Anos</span></h3>
    <p>${$(this).find("SmallDesc").text()}</p>
    <a href="#" class="info">Mais Informações</a>
  </figcaption>
</figure>`);
        });
    }).fail(function(){
        alert("fuck");
    })
}


/* <figure class="snip1336">
  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg" alt="sample87" />
  <figcaption>
    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample4.jpg" alt="profile-sample4" class="profile" />
    <h2>Hans Down<span>Engineer</span></h2>
    <p>I'm looking for something that can deliver a 50-pound payload of snow on a small feminine target. Can you suggest something? Hello...? </p>
    <a href="#" class="follow">Follow</a>
    <a href="#" class="info">More Info</a>
  </figcaption>
</figure> */
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

