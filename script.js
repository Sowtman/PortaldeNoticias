const API_KEY = 'e6137ab2c7734929b951d0efd26c4bc3';

function exibeNoticias () {
    let divTela = document.getElementById('tela');
    let texto = '';

    
    let dados = JSON.parse (this.responseText);
    console.log(dados);
    
    for (i=0; i< 6; i++) {
        let noticia = dados.articles[i];        
        let data = new Date (noticia.publishedAt);

        texto = texto + `
        <div class="col-12 col-sm-12 col-md-12 col-lg-6" id="tela">
            <div class="box-noticia">
                <img src="${noticia.urlToImage}" alt="" class="imgNoticia">
                <h3 class="titulo">${noticia.title}</h3><br>
                <span class="creditos">${data.toLocaleDateString ()} - 
                    ${noticia.source.name} - 
                    ${noticia.author}</span><br>
                <span class="text">
                ${noticia.content} <a href="${noticia.url}">Leia mais ...</a>
                </span>
            </div>
        </div>                
        `;
    };

    
    divTela.innerHTML = texto;
}

function executaPesquisa () 
{   
    let xhr = new XMLHttpRequest ();
    xhr.onload = exibeNoticias;
    xhr.open ('GET', `https://newsapi.org/v2/top-headlines?country=br&apiKey=${API_KEY}`);
    xhr.send ();
   
}
function executaPesquisaFiltrada (query) 
{   
    
    let xhr = new XMLHttpRequest ();
    xhr.onload = exibeNoticias;
    xhr.open ('GET', `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`);
    xhr.send ();
    document.getElementById("titulo").innerHTML = "Resultado sobre " + query + ":";
    document.getElementById("btnSalvar").style.display = "block";
}
function exibeSource(query, titulo)
{
    
    let xhr = new XMLHttpRequest ();
    xhr.onload = exibeNoticias;
    xhr.open ('GET', `http://newsapi.org/v2/top-headlines?country=br&category=${query}&apiKey=${API_KEY}`);
    xhr.send ();
    document.getElementById("titulo").innerHTML = "Principais noticias sobre " + titulo;
   
}
function exibeDestaque()
{
    executaPesquisa();
    listarPesquisas();
}
function exibeEsportes()
{    
    exibeSource('sports', 'Esportes');
    listarPesquisas();
}
function exibeTecnologia()
{    
    exibeSource('technology', 'Tecnologia');
    listarPesquisas();
}
function exibeSaude()
{    
    exibeSource('health', 'Saúde');
    listarPesquisas();
}
function exibeEconomia()
{    
    exibeSource('business', 'Economia');
    listarPesquisas();
}
function salvarPesquisa()
{    
    let Dadospesquisa = JSON.parse(localStorage.getItem('PesquisasSalvas') || '[]');
    Dadospesquisa.push ({
        titulo: txtTitulo.value, textoPesquisa: txtPesquisasSalvas.value
    })
    localStorage.setItem("PesquisasSalvas", JSON.stringify(Dadospesquisa));
    
}
function listarPesquisas()
{
    //  
    let retArray = localStorage.getItem("PesquisasSalvas");
    retArray = JSON.parse(retArray);
    let PesquisasSalvas = document.getElementById("pesquisasSalvas");
    let texto = '';
    
    for (let index = 0; index < retArray.length; index++) {
        texto += `<a type="button" class="dropdown-item" onclick="executaPesquisaFiltrada('${retArray[index].textoPesquisa}');">${retArray[index].titulo}</a> <br>`;   
        
    }
    PesquisasSalvas.innerHTML = texto;

    
}
    
btnSalvar.onclick = () => {
    document.getElementById("txtPesquisasSalvas").value = document.getElementById("txtPesquisa").value;
}
btnSalvarPesquisa.onclick = () => {
    
    salvarPesquisa();

    listarPesquisas();
}
btnPesquisa.onclick = () =>{
    let texto = document.getElementById('txtPesquisa').value;
    executaPesquisaFiltrada(texto);
}


document.addEventListener('keydown', function (event) {
    if (event.keyCode == 13){
     executaPesquisaFiltrada();
    }
});


