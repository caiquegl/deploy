

function getNoticias() {

    

    fetch("https://newsapi.org/v2/top-headlines?country=br&category=science&apiKey=fd67ec332bed40ecab3e342590423cc7")
    .then(function (resultado){
        return resultado.json()
    })
    .then(function (resultadoNews){
        let cardNews = document.getElementById("listaDeNoticias");


        cardNews.innerHTML="";



        resultadoNews.articles.forEach(noticia => {
            cardNews.innerHTML += `
            <div class="container news">
            <a href="${noticia.url}">
                <img src="${noticia.urlToImage}" alt="Notícias enem">
                <div class="text-news">
                    <h2>
                    ${noticia.title}
                    </h2>
                    <h4>
                    ${noticia.description}
                    </h4>
                </a>
                </div>
        </div>
        `

        }); 

    })
}


