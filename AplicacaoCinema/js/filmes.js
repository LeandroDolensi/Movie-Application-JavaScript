
// vetor global que contém os filmes
var vetor_filmes = [
    {codigo:1, nome:"Guerra Mundial Z", lancamento:2013, diretor:"Marc Forster", 
    atores:["Brad Pitt", "Mirelle Enos", "Daniella Kertesz"]}, 
    {codigo:2, nome:"Cruella", lancamento:2021, diretor:"Craig Gillespie", 
    atores:["Emma Stone", "Emma Thompson", "Emily Beecham"]}, 
    {codigo:3, nome:"Vingadores: Guerra Infinita", lancamento:2018, diretor:"Joe Russo", 
    atores:["Scarlett Johansson", "Chris Hemsworth", "Robert Downey Jr."]}];

// variável global para controlar quantos atores são colocados
var contador_atores;

/* ===========================================================================================*/
/* =========================== funções salvar e carregar dados ================================*/
/* ===========================================================================================*/

function saveInStorage(vetor_filmes)
{
    var str_vetor_filmes = JSON.stringify(vetor_filmes);
    localStorage.setItem("dados_filmes_cinema", str_vetor_filmes);
}

saveInStorage(vetor_filmes);

function loadFromStorage()
{
    var str_vetor_filmes = localStorage.getItem("dados_filmes_cinema");

    if (str_vetor_filmes != null )
    {
        var vetor_filmes     = JSON.parse(str_vetor_filmes);
        return vetor_filmes; 
    }
    
    var vetor_filmes = [];
    return vetor_filmes;
}

/* ===========================================================================================*/
/* =============================== funções de CADASTRAR filmes ================================*/
/* ===========================================================================================*/

function setAddFilmeForm()
{
    contador_atores = 1;
    document.querySelector('#content_section').innerHTML = 
    '<form>' +
    '<fieldset>' +
    '<span>' +
    '<label>Código do filme:</label>' +
    '<input id="form_codigo" type="text" placeholder="0000">' +
    '</span>' +
    '<br>' +
    '<span>' +
    '<label>Nome:</label>' +
    '<input id="form_nome" type="text">' +
    '</span>' +
    '<br>' +
    '<span>' +
    '<label>Ano de lançamento:</label>' +
    '<input id="form_lancamento" type="number" min="1900" value="2000" step="1">' +
    '</span>' +
    '<br>' +
    '<span>' +
    '<label">Diretor:</label>' +
    '<input id="form_diretor" type="text" >' +
    '</span>' +
    '<br>' +
    '<span id="adicionar_atores">' +
    '<label>Ator/Atriz:</label>'  +
    '<input class="form_atores" type="text" value="" >' +
    '</span>' +
    '<span>' +
    '<input type="button" class="btn_form" id="add_atores" value="+" onclick="addAtores()">' +
    '</span>' +
    '<br>' +
    '<span>' +
    '<input type=button  class="btn_form" value="Adicionar" onclick="addFilme()">' +
    '<input type="reset" class="btn_form" value="Limpar">' +
    '</span>' +
    '</fieldset>' +
    '</form>' +
    '<br><br>' +
    '<table border="1">' +
    '<thead>' +
    '<tr>' +
    '<th>Código</th>' +
    '<th>Nome</th>' +
    '<th>Lançamento</th>' +
    '<th>Diretor</th>' +
    '<th>Ator 1</th>' +
    '<th>Ator 2</th>' +
    '<th>Ator 3</th>' +
    '</thead>'+
    '<tbody id="linha_tabela">' +
    '</tbody>' +
    '</table>';
}

function addAtores()
{
    if( contador_atores < 3 )
    {
        document.querySelector('#adicionar_atores').innerHTML +=
        '<br><label>Ator/Atriz:</label>' + 
        '<input class="form_atores" class="btn_form" type="text" value="" >';
        contador_atores++;
    }
}

function addFilme()
{
    var dados_formulario = organizaDadosFormulario();

    var mensagem = "";
    if ( dados_formulario.codigo == "" ) mensagem += "Código do filme está vazio\n";

    if ( dados_formulario.codigo != "" && codigoExiste(dados_formulario.codigo) )
    { mensagem += "Código do filme já cadastrado\n"; }

    if( mensagem != "")
    {
        alert(mensagem);
        return;
    }

    var vetor_filmes = loadFromStorage();
    vetor_filmes.push(dados_formulario);
    saveInStorage(vetor_filmes);

    alert("Sala cadastrada com sucesso!");
    atualizarTabela(dados_formulario);
}

function organizaDadosFormulario()
{
    var objeto_formulario        = new Object();
    
    objeto_formulario.codigo     = document.getElementById("form_codigo").value;
    objeto_formulario.nome       = document.getElementById("form_nome").value;
    objeto_formulario.lancamento = document.getElementById("form_lancamento").value;
    objeto_formulario.diretor    = document.getElementById("form_diretor").value;

    var atores = document.getElementsByClassName("form_atores");
    var vetor_atores = [];
    var i;
    for( i=0 ; i<atores.length ; i++ )
    {
        vetor_atores[i] = atores[i].value;
    }
    
    objeto_formulario.atores = vetor_atores;
    return objeto_formulario;
}

function codigoExiste(codigo)
{
    vetor_filmes = loadFromStorage();
    var i;
    for( i=0 ; i<vetor_filmes.length ; i++ )
    {
        if( vetor_filmes[i].codigo == codigo ) return true; 
    }
    return false;
}

function atualizarTabela(dados_formulario)
{
    var linha_tabela =
    '<tr class="linha_hover">' +
    '<td>' + dados_formulario.codigo     + '</td>' +
    '<td>' + dados_formulario.nome       + '</td>' +
    '<td>' + dados_formulario.lancamento + '</td>' +
    '<td>' + dados_formulario.diretor    + '</td>' +
    '<td>' + dados_formulario.atores[0]  + '</td>' +
    '<td>' + dados_formulario.atores[1]  + '</td>' +
    '<td>' + dados_formulario.atores[2]  + '</td>' +
    '</tr>';
    document.querySelector('#linha_tabela').innerHTML += linha_tabela;
}


/* ===========================================================================================*/
/* =============================== funções de ALTERAR filmes ================================*/
/* ===========================================================================================*/

function setAlterarFilme()
{
    document.querySelector('#content_section').innerHTML = 
    '<form>' +
    '<fieldset>' +
    '<span>' +
    '<label>Código do filme:</label>' +
    '<input type="text" id="change_filme">' +
    '</span>' +
    '<span>' +
    '<input type="button" class="btn_form" onclick="alterarDados()" value="Procurar">' +
    '</form>';
}

function alterarDados()
{
    var vetor_filmes = loadFromStorage();
    var indice_codigo = setPegarCodigo();
    if( indice_codigo >= 0 )
    {
       setAddFilmeForm();
       vetor_filmes.splice(indice_codigo, 1);
       saveInStorage(vetor_filmes);
    } else return;
}

function setPegarCodigo()
{
    var codigo = document.querySelector('#change_filme').value;
    var mensagem = "";

    if( codigo == "" ) mensagem += "Campo código está vazio";
    if( codigo != "" && ( !codigoExiste(codigo) ) ) mensagem += "Este código não consta na base de dados";

    if( mensagem != "" ) { alert(mensagem); return -1; }

    indice_codigo  = localizaIndice(codigo);
    return indice_codigo;
}

function localizaIndice(codigo)
{
    var vetor_filmes = loadFromStorage();
    var i;
    for( i=0 ; i<vetor_filmes.length ; i++ )
    {
        if( vetor_filmes[i].codigo == codigo ) return i;
    }
}

/* ===========================================================================================*/
/* =============================== funções de EXCLUIR filmes ================================*/
/* ===========================================================================================*/

function setExcluirFilme()
{
    document.querySelector('#content_section').innerHTML = 
    '<form>' +
    '<fieldset>' +
    '<span>' +
    '<label>Código do filme:</label>' +
    '<input type="text" id="change_filme">' +
    '</span>' +
    '<span>' +
    '<input type="button" class="btn_form" onclick="excluirDados()" value="Procurar">' +
    '</form>';
}

function excluirDados()
{
    var vetor_filmes = loadFromStorage();
    var indice_codigo = setPegarCodigo();
    if( indice_codigo >= 0 )
    {
        vetor_filmes.splice(indice_codigo, 1);
        alert("Filme excluído com sucesso!");
    } else return;
    saveInStorage(vetor_filmes);
}

/* ===========================================================================================*/
/* =============================== funções de LISTAR UM filme ================================*/
/* ===========================================================================================*/

function setListarUmFilme()
{
    document.querySelector('#content_section').innerHTML = 
    '<form>' +
    '<fieldset>' +
    '<span>' +
    '<label>Código do filme:</label>' +
    '<input type="text" id="change_filme">' +
    '</span>' +
    '<span>' +
    '<input type="button" class="btn_form" onclick="listarUmFilme()" value="Procurar">' +
    '</form>';
}

function listarUmFilme()
{
    var vetor_filmes = loadFromStorage();
    var indice_codigo = setPegarCodigo();
    if( indice_codigo >= 0 )
    {
        document.querySelector('#content_section').innerHTML =
        '<table border="1">' +
        '<thead>' +
        '<tr>' +
        '<th>Código</th>' +
        '<th>Nome</th>' +
        '<th>Lançamento</th>' +
        '<th>Diretor</th>' +
        '<th>Ator 1</th>' +
        '<th>Ator 2</th>' +
        '<th>Ator 3</th>' +
        '</thead>'+
        '<tbody>' +
        '<tr class="linha_hover">' +
        '<td>' + vetor_filmes[indice_codigo].codigo     + '</td>' +
        '<td>' + vetor_filmes[indice_codigo].nome       + '</td>' +
        '<td>' + vetor_filmes[indice_codigo].lancamento + '</td>' +
        '<td>' + vetor_filmes[indice_codigo].diretor    + '</td>' +
        '<td>' + vetor_filmes[indice_codigo].atores[0]  + '</td>' +
        '<td>' + vetor_filmes[indice_codigo].atores[1]  + '</td>' +
        '<td>' + vetor_filmes[indice_codigo].atores[2]  + '</td>' +
        '</tr>' + 
        '</tbody>' +
        '</table>';
    }
}

/* ===========================================================================================*/
/* ============================ funções de LISTAR TODOS os filmes ============================*/
/* ===========================================================================================*/

function listaTodosFilmes()
{
    var vetor_filmes = loadFromStorage();
    document.querySelector('#content_section').innerHTML =
        '<table border="1">' +
        '<thead>' +
        '<tr>' +
        '<th>Código</th>' +
        '<th>Nome</th>' +
        '<th>Lançamento</th>' +
        '<th>Diretor</th>' +
        '<th>Ator 1</th>' +
        '<th>Ator 2</th>' +
        '<th>Ator 3</th>' +
        '</thead>'+
        '<tbody id="listar_filme">' +
        '</tbody>' +
        '</table>';

        var i;
        for( i=0 ; i<vetor_filmes.length ; i++ )
        {
            colocaLinhaFilme(i);
        }
}

function colocaLinhaFilme(i)
{
        var vetor_filmes = loadFromStorage();
        var linha_tabela = 
        '<tr class="linha_hover">' +
        '<td>' + vetor_filmes[i].codigo     + '</td>' +
        '<td>' + vetor_filmes[i].nome       + '</td>' +
        '<td>' + vetor_filmes[i].lancamento + '</td>' +
        '<td>' + vetor_filmes[i].diretor    + '</td>' +
        '<td>' + vetor_filmes[i].atores[0]  + '</td>' +
        '<td>' + vetor_filmes[i].atores[1]  + '</td>' +
        '<td>' + vetor_filmes[i].atores[2]  + '</td>' +
        '</tr>';

        document.querySelector('#listar_filme').innerHTML += linha_tabela;
}
