//Query selector para acessar o elemento deles na tela
var appForm = document.querySelector("#app form");
var listaEl = document.querySelector("#app ul");

let inputNovaTarefa = document.querySelector('#input_user');
let btnAddTarefa = document.querySelector('#favorito');
let listaTarefas = document.querySelector('#listaTarefas');


const qtdIdsDisponiveis = Number.MAX_VALUE;
const botao = document.getElementById("but")


//Utilizando o ajax para fazer a requisição
var xhttp = new XMLHttpRequest();
var url_base = 'https://api.github.com/';
var lista = [];

// _________________________________________ Animação de transição entre as tela _________________________________
$(function () {
    "use strict";
    var main  = $(".main"),
        about = $(".aboutSection");

    $(".about").click(function () {
        main.animate({
            'height': '0',
            'top': '50vh',
            'padding': '0'
        }, 300)
        .animate({
            'width': '2px',
            'left': '50%'
        }, 900)
        .fadeOut(200, function () {
            about.fadeIn(200);
            about.animate({
                'width': '100%',
                'left': '0'
            }, 900);
            about.animate({
                'min-height': '100vh',
                'top': '0',
                'padding-top': '50px',
                'padding-bottom': '50px'
            }, 300);
        });
    });

    //_________________________________________Butão de retorno ao menu principal_____________________________
    $(".home").click(function () {
        about.animate({
            'min-height': '0',
            'height': '0',
            'top': '50vh',
            'padding': '0'
        }, 300)
        .animate({
            'width': '2px',
            'left': '50%'
        }, 900)
        .fadeOut(200, function () {
            main.fadeIn(200)
            .animate({
                'width': '100%',
                'left': '0'
            }, 900)
            .animate({
                'height': '100vh',
                'top': '0',
                'padding-top': '100px',
                'padding-bottom': '100px'
            }, 300);
        });
    });
});

//___________________________________________________ Buscar ususario do Git________________________________________________
botao.addEventListener("click",buscarRepo)

//Ao clicar no botão é chamado a função BuscarRepositorio. 
//Em seguida é criadoa variavel "user" que recebe o valor difgitado pelo usuario mediante seu id "input_user"
//prevetDefault o preventrefoult
function buscarRepo(e){

	var user = document.getElementById("input_user").value;
	if(user.length === 0) {
		alert("Por favor, preencha o nome do usuário");
		return;
	}

	var url = url_base + 'users/' + user + '/repos';
	xhttp.open('GET', url);
	xhttp.send();

    //Toda vez que o statechange trocar é chamada a função.
    //readState status da requisição
    //status - qual foi a resposta, ok 
    // Caso ele não retorne 4 (finalizado) ou o status seja diferente de 200( valor retornado quando não tem erro) ele envia uma mensagem de erro.
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState === 4){
			if(xhttp.status === 200){
                //retorna como string, mas transforma em json, que acessa as propriedades
				var result = JSON.parse(xhttp.responseText);

                //mapeia array
				lista = result.map(function(item){
					return { 
						name: item.name, 
						description: item.description, 
						html_url: item.html_url 
					};
				});
				renderLista();
                
			}else{
				alert('Falha ao buscar usuário.');
			
			}
		}
	}
}
//__________________________________________Adicionar a lista________________________________________

function renderLista(){
    // é zerado o elemento de tela UL
	listaEl.innerHTML = '';

    // o for varre a arraylista, e pra cada item é criado um elemento li
	for(item of lista){
		var nameEl = document.createElement('strong');
		nameEl.appendChild(document.createTextNode(item.name));

		var descriptionEl = document.createElement('p');
		descriptionEl.appendChild(document.createTextNode(item.description));

		var urlEl = document.createElement('a');
		urlEl.setAttribute('href', item.html_url);
		urlEl.setAttribute('target', '_blank');
		urlEl.appendChild(document.createTextNode(item.html_url));

        //elemetno ul vai li
		var itemEl = document.createElement('li');
		itemEl.appendChild(nameEl);
		itemEl.appendChild(descriptionEl);
		itemEl.appendChild(urlEl);

		listaEl.appendChild(itemEl);
	}
}

//+++++++++++++++++++++++        ++++++++++++++++++++++


btnAddTarefa.addEventListener('click', (e) => {

    let tarefa = {
        nome: inputNovaTarefa.value,
    }
    adicionarTarefa(tarefa);
});


//____________________________________________-Adicionar O usuario aos favoritos ____________________________________

function adicionarTarefa(tarefa) {
    let li = criarTagLI(tarefa);
    listaTarefas.appendChild(li);  
    inputNovaTarefa.value = '';  
}

function criarTagLI(tarefa) {

    let li = document.createElement('li');
    li.id = tarefa.id;

    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome;

    let div  = document.createElement('div');
    
    let btnExcluir  = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onclick', 'excluir('+tarefa.id+')');

    div.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(div);
    return li;
}

//_________________________________________-Excluir usuario _________________________

function excluir(idTarefa) {
    let confirmacao = window.confirm('Tem certeza que deseja excluir? ');
    if(confirmacao) {
        let li = document.getElementById(''+ idTarefa + '');
        if(li) {
            listaTarefas.removeChild(li);
        } else {
            alert('Elemento HTML não encontrado!');
        }
    }
}








