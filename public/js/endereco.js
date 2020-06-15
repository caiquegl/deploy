// const url = 'https://viacep.com.br/ws/';
// const type = '/json/';
// const cepInput = document.getElementById("cep");
// const logradouroInput = document.getElementById("logradouro");
// const ufInput = document.getElementById("uf");
// const cidadeInput = document.getElementById("cidade");
// const bairroInput = document.getElementById("bairro");



// function buscaCep(){
//     let cepValue = cepInput.value;
//     fetch(`${url}${cepValue}${type}`).then(
//         function (resultado){
//         return resultado.json()
//     }).then(
//         function (resultadoCep){
//             logradouroInput.value = resultadoCep.logradouro;
//             ufInput.value = resultadoCep.uf;
//             cidadeInput.value = resultadoCep.localidade;
//             bairroInput.value = resultadoCep.bairro;
//         }
//     )
// }

// function validando(valor){

//     var cep = valor.replace(/\D/g, '');

//         //Verifica se campo cep possui valor informado.
//         if (cep != "") {

//             //Expressão regular para validar o CEP.
//             var validacep = /^[0-9]{8}$/;

//             //Valida o formato do CEP.
//             if(validacep.test(cep)) {

//                 //Preenche os campos com "..." enquanto consulta webservice.
//                 document.getElementById('logradouro').value="...";
//                 document.getElementById('bairro').value="...";
//                 document.getElementById('cidade').value="...";
//                 document.getElementById('uf').value="...";
//                 document.getElementById('ibge').value="...";

//                 //Cria um elemento javascript.
//                 var script = document.createElement('script');

//                 //Sincroniza com o callback.
//                 script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

//                 //Insere script no documento e carrega o conteúdo.
//                 document.body.appendChild(script);

//             } //end if.
//             else {
//                 //cep é inválido.
//                 limpa_formulário_cep();
//                 alert("Formato de CEP inválido.");
//             }
//         } //end if.
//         else {
//             //cep sem valor, limpa formulário.
//             limpa_formulário_cep();
//         }
// }


function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
    document.getElementById('ibge').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('rua').value=(conteudo.logradouro);
    document.getElementById('bairro').value=(conteudo.bairro);
    document.getElementById('cidade').value=(conteudo.localidade);
    document.getElementById('uf').value=(conteudo.uf);
    document.getElementById('ibge').value=(conteudo.ibge);
} //end if.
else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    document.getElementById('viacep').innerHTML= '<div class="alert alert-info" role="alert">CEP não encontrado!</div>'
    alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('rua').value="...";
        document.getElementById('bairro').value="...";
        document.getElementById('cidade').value="...";
        document.getElementById('uf').value="...";

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
}
};