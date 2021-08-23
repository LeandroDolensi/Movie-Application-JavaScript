

var vetor_json_salas = '{"salas":[{"codigo":1, "nome":"sala1", "capacidade":200, "t_exibicao":"3d", "acessivel":"sim"},{"codigo":2, "nome":"sala2", "capacidade":300, "t_exibicao":"3d", "acessivel":"sim"},{"codigo":3, "nome":"sala3", "capacidade":250, "t_exibicao":"2d", "acessivel":"sim"},{"codigo":4, "nome":"sala0", "capacidade":150, "t_exibicao":"2d", "acessivel":"não"}]}';

localStorage.setItem("dados_salas_cinema", vetor_json_salas);

var vetor_salas = JSON.parse(vetor_json_salas);

/* ===========================================================================================*/
/* =========================== funções salvar e carregar dados ================================*/
/* ===========================================================================================*/

function saveInStorage(vetor_salas)
{
    var str_vetor_salas = JSON.stringify(vetor_salas);
    localStorage.setItem("dados_salas_cinema", str_vetor_salas);
}

function loadFromStorage()
{
    var str_vetor_salas = localStorage.getItem("dados_salas_cinema");

    if (str_vetor_salas != null )
    {
        var vetor_salas = JSON.parse(str_vetor_salas);
        return vetor_salas;
    }

    var vetor_salas = [];
    return vetor_salas;
}



/* ===========================================================================================*/
/* =============================== funções de CADASTRAR salas ================================*/
/* ===========================================================================================*/

function setAddSalaForm()
{
    document.querySelector('#content_section').innerHTML = 
    '<form id="form_add_sala">' +
    '<fieldset>' +
    '<span>' +
    '<label>Código da sala:</label>' +
    '<input type="text" placeholder="0000">' +
    '</span>' +
    '<br>' +
    '<span>' +
    '<label>Nome:</label>' +
    '<input type="text">' +
    '</span>' +
    '<br>' +
    '<span>' +
    '<label>Capacidade:</label>' +
    '<input type="number" min="0" value="0" step="10">' +
    '</span>' +
    '<br>' +
    '<span>' +
    '<label">Tipo de exibição:</label>' +
    '<input type="text" placeholder="2d, 3d">' +
    '</span>' +
    '<br>' +
    '<span>' +
    '<label>Acessível:</label>' +
    '<input type="text" placeholder="sim, não">' +
    '</span>' +
    '<br>' +
    '<span>' +
    '<input type="button" class="btn_form" onclick="addSala()" value="Adicionar">' +
    '</span>' +
    '<span>' +
    '<input type="reset" class="btn_form" value="Limpar">' +
    '</span>' +
    '</fieldset>' +
    '</form>' +
    '<br><br>' +
    '<table>' +
    '<thead>' +
    '<tr>' +
    '<th>Código</th>' +
    '<th>Nome</th>' +
    '<th>Capacidade</th>' +
    '<th>Exibição</th>' +
    '<th>Acessível</th>' +
    '</thead>'+
    '<tbody id="linha_tabela">' +
    '</tbody>' +
    '</table>';
}

function addSala()
{
    var dados_formulario = document.forms["form_add_sala"];
    
    var mensagem = "";
    if ( dados_formulario[1].value == "")
    {
        mensagem += "Código da sala está vazio\n";
    }

    if ( dados_formulario[3].value == 0 )
    {
        mensagem += "Capacidade tem um valor inválido\n";
    }

    if ( dados_formulario[1].value != "" && codigoExiste(dados_formulario[1].value))
    {
        mensagem += "Código de Sala já cadastrado\n";
    }

    if (mensagem != "")
    {
        alert(mensagem);
        return;
    }

    atualizarVetorSalas(dados_formulario);
    
    alert("Sala cadastrada com sucesso!");
    atualizarTabela(dados_formulario);
    
}

function atualizarTabela(dados_formulario)
{
    var linha_tabela =
    '<tr class="linha_hover">' +
    '<td>' + dados_formulario[1].value + '</td>' + 
    '<td>' + dados_formulario[2].value + '</td>' + 
    '<td>' + dados_formulario[3].value + '</td>' + 
    '<td>' + dados_formulario[4].value + '</td>' + 
    '<td>' + dados_formulario[5].value + '</td>' +
    '<tr>';
    document.querySelector('#linha_tabela').innerHTML += linha_tabela;
}

function codigoExiste(codigo)
{
    vetor_salas = loadFromStorage();
    var i;
    for( i=0 ; i<vetor_salas.salas.length ; i++ )
    {
        if( vetor_salas.salas[i].codigo == codigo ) return true; 
    }
    return false;
}

function atualizarVetorSalas(formulario)
{
    vetor_salas    = loadFromStorage();
    var sala        = new Object();
    sala.codigo     = formulario[1].value;
    sala.nome       = formulario[2].value;
    sala.capacidade = formulario[3].value;
    sala.t_exibicao = formulario[4].value;
    sala.acessivel  = formulario[5].value;
    vetor_salas.salas.push(sala);
    saveInStorage(vetor_salas);
    
}

/* ===========================================================================================*/
/* ================================= funções de ALTERAR sala =================================*/
/* ===========================================================================================*/

function setAlterarSala()
{
    document.querySelector('#content_section').innerHTML = 
    '<form>' +
    '<fieldset>' +
    '<span>' +
    '<label>Código da sala:</label>' +
    '<input type="text" id="change_sala" placeholder="0000">' +
    '</span>' +
    '<span>' +
    '<input type="button" class="btn_form" onclick="alterarDados()" value="Procurar">' +
    '</form>';
}

function alterarDados()
{
    vetor_salas = loadFromStorage();
    var indice_codigo = setPegarCodigo();
    if( indice_codigo >= 0 )
    {
       setAddSalaForm();
       vetor_salas.salas.splice(indice_codigo, 1); 
       saveInStorage(vetor_salas);
    } else return;
}

function setPegarCodigo()
{
    var codigo = document.querySelector('#change_sala').value;
    var mensagem = "";

    if( codigo == "" ) mensagem += "Campo código está vazio";
    if( codigo != "" && ( !codigoExiste(codigo) ) ) mensagem += "Este código não consta na base de dados";

    if( mensagem != "" ) { alert(mensagem); return -1; }

    indice_codigo  = localizaIndice(codigo);
    return indice_codigo;
}

function localizaIndice(codigo)
{
    vetor_salas = loadFromStorage();
    var i;
    for( i=0 ; i<vetor_salas.salas.length ; i++ )
    {
        if( vetor_salas.salas[i].codigo == codigo ) return i;
    }
}

/* ===========================================================================================*/
/* ================================= funções de EXCLUIR sala =================================*/
/* ===========================================================================================*/

function setExcluirSala()
{
    document.querySelector('#content_section').innerHTML = 
    '<form>' +
    '<fieldset>' +
    '<span>' +
    '<label>Código da sala:</label>' +
    '<input type="text" id="change_sala" placeholder="0000">' +
    '</span>' +
    '<span>' +
    '<input type="button" class="btn_form" onclick="excluirDados()" value="Procurar">' +
    '</form>';
}

function excluirDados()
{
    vetor_salas = loadFromStorage();
    var indice_codigo = setPegarCodigo();
    if( indice_codigo >= 0 )
    {
        vetor_salas.salas.splice(indice_codigo, 1);
        alert("Sala excluída com sucesso!");
        saveInStorage(vetor_salas);
    } else return;
}

/* ===========================================================================================*/
/* ============================== funções de LISTAR UMA sala =================================*/
/* ===========================================================================================*/

function setListarUmaSala()
{
    document.querySelector('#content_section').innerHTML = 
    '<form>' +
    '<fieldset>' +
    '<span>' +
    '<label>Código da sala:</label>' +
    '<input type="text" id="change_sala" placeholder="0000">' +
    '</span>' +
    '<span>' +
    '<input type="button" class="btn_form" onclick="listarUmaSala()" value="Procurar">' +
    '</form>';
}

function listarUmaSala()
{
    vetor_salas = loadFromStorage();
    var indice_codigo = setPegarCodigo();
    if( indice_codigo >= 0 )
    {
        document.querySelector('#content_section').innerHTML =
        '<table>' +
        '<thead>' +
        '<tr>' +
        '<th>Código</th>' +
        '<th>Nome</th>' +
        '<th>Capacidade</th>' +
        '<th>Exibição</th>' +
        '<th>Acessível</th>' +
        '</thead>'+
        '<tbody>' +
        '<tr class="linha_hover">' +
        '<td>' + vetor_salas.salas[indice_codigo].codigo     + '</td>' + 
        '<td>' + vetor_salas.salas[indice_codigo].nome       + '</td>' + 
        '<td>' + vetor_salas.salas[indice_codigo].capacidade + '</td>' + 
        '<td>' + vetor_salas.salas[indice_codigo].t_exibicao + '</td>' + 
        '<td>' + vetor_salas.salas[indice_codigo].acessivel  + '</td>' +
        '</tr>'
        '</tbody>' +
        '</table>';
    }
}

/* ===========================================================================================*/
/* ============================ funções de LISTAS TODAS as salas =============================*/
/* ===========================================================================================*/

function listaTodasSalas()
{
    vetor_salas = loadFromStorage();
    document.querySelector('#content_section').innerHTML =
        '<table border="1">' +
        '<thead>' +
        '<tr>' +
        '<th>Código</th>' +
        '<th>Nome</th>' +
        '<th>Capacidade</th>' +
        '<th>Exibição</th>' +
        '<th>Acessível</th>' +
        '</thead>'+
        '<tbody id="listar_salas">' +
        '</tbody>' +
        '</table>';

        var i;
        for( i=0 ; i<vetor_salas.salas.length ; i++ )
        {
            colocaLinhaSala(i);
        }
}

function colocaLinhaSala(i)
{
        var vetor_salas = loadFromStorage();
        var linha_tabela = 
        '<tr class="linha_hover">' +
        '<td>' + vetor_salas.salas[i].codigo + '</td>' + 
        '<td>' + vetor_salas.salas[i].nome + '</td>' + 
        '<td>' + vetor_salas.salas[i].capacidade + '</td>' + 
        '<td>' + vetor_salas.salas[i].t_exibicao + '</td>' + 
        '<td>' + vetor_salas.salas[i].acessivel + '</td>' +
        '</tr>';

        document.querySelector('#listar_salas').innerHTML += linha_tabela;
}
