



/* ===========================================================================================*/
/* =========================== funções salvar e carregar dados ================================*/
/* ===========================================================================================*/

function saveInStorage(vetor_sessao)
{
    var str_vetor_sessao = JSON.stringify(vetor_sessao);
    localStorage.setItem("dados_sessoes_cinema", str_vetor_sessao);

}

function loadFromStorage()
{
    var str_vetor_sessao = localStorage.getItem("dados_sessoes_cinema");

    if( str_vetor_sessao != null )
    {
        var vetor_sessao     = JSON.parse(str_vetor_sessao);
        return vetor_sessao;
    }
    var vetor_sessao = [];
    return vetor_sessao;
}

function loadFromStorageSalas()
{
    var str_vetor_salas = localStorage.getItem("dados_salas_cinema");
    var vetor_salas     = JSON.parse(str_vetor_salas);
    return vetor_salas;

}

function loadFromStorageFilmes()
{
    var str_vetor_filmes = localStorage.getItem("dados_filmes_cinema");
    var vetor_filmes     = JSON.parse(str_vetor_filmes);
    return vetor_filmes;

}

/* ===========================================================================================*/
/* =============================== funções de CADASTRAR Sessões ================================*/
/* ===========================================================================================*/

function setAddSessaoForm()
{
    $("#content_section").html(
        "<form>" +
        "<fieldset>" +
        "<span>" +
        "<label>Código do Filme:</label>" +
        "<select id='codigo_filme'>" +
        "<option disabled='disabled' selected='selected'>Selecione o código do Filme</option>"+
        "</select>" +
        "</span>" +
        "<span>" +
        "<label>Código da Sala:</label>" +
        "<select id='codigo_sala'>" +
        "<option disabled='disabled' selected='selected'>Selecione o código da Sala</option>"+
        "</select>" +
        "</span>" +
        "<span>" +
        "<label>Data:</label>" +
        "<input id='data_sessao' type='date'>" +
        "</span>" +
        "<br>" +
        "<span>" +
        "<label>Horário:</label>" +
        "<input id='horario_sessao' type='time'>" +
        "</span>" +
        "<br>" +
        "<span>" +
        "<label>Preço:</label>" +
        "<input id='valor_ingresso' type='number' step='0.5' placeholder='Ex:25,00'>" +
        "</span>" +
        "<br>" +
        "<span>" +
        "<input type=button class='btn_form' value='Adicionar' onclick='addSessao()'>"+
        "<input type='reset' class='btn_form' value='Limpar'>"+
        "</span>" +
        "</fieldset>" +
        "</form>" +
        "<table border='1'>" +
        "<thead>" +
        "<tr>" +
        "<th>Código Filme</th>"+
        "<th>Código Sala</th>" +
        "<th>Data</th>" +
        "<th>Horário</th>" +
        "<th>Preço</th>" +
        "</thead>" +
        "<tbody id='linha_tabela'>" +
        "</tbody>" +
        "</table>"
    );
    
    setCodFilme();
    setCodSala();
    
}

function setCodFilme()
{
    var vetor_filmes      = loadFromStorageFilmes();
    var str_codigo_filmes = "";
    var i;

    for( i=0 ; i<vetor_filmes.length ; i++ )
    {
        str_codigo_filmes += "<option>" + vetor_filmes[i].codigo +"</option>";
    }

    $("#codigo_filme").append(str_codigo_filmes);
}

function setCodSala()
{
    var vetor_salas      = loadFromStorageSalas();
    var str_codigo_salas = "";
    var i;

    for( i=0 ; i<vetor_salas.salas.length ; i++ )
    {
        str_codigo_salas += "<option>" + vetor_salas.salas[i].codigo + "</option>";
    }

    $("#codigo_sala").append(str_codigo_salas);
}

function addSessao()
{
    var dados_formulario = organizaDadosFormulario();

    var mensagem = "";

    if ( dados_formulario.data           == "" ) mensagem += "Campo Data está vazio!";
    if ( dados_formulario.horario        == "" ) mensagem += "Campo Horário está vazio!";
    if ( dados_formulario.valor_ingresso == "" ) mensagem += "Campo Preço está vazio!";

    if ( sessaoExiste(dados_formulario) > 0 )    mensagem += "Esta sessão já está cadastrada!";

    if ( mensagem != "" )
    {
        alert(mensagem);
        return;
    }

    var vetor_sessao = loadFromStorage();
    vetor_sessao.push(dados_formulario);
    saveInStorage(vetor_sessao);

    alert("Sessão cadastrada com sucesso!");
    atualizarTabela(dados_formulario);
}

function atualizarTabela(dados_formulario)
{
    var linha_tabela = 
    "<tr class='linha_hover'>" +
    "<td>"    + dados_formulario.codigo_filme   + "</td>" +
    "<td>"    + dados_formulario.codigo_sala    + "</td>" +
    "<td>"    + dados_formulario.data           + "</td>" +
    "<td>"    + dados_formulario.horario        + "</td>" +
    "<td>R$ " + dados_formulario.valor_ingresso + "</td>" +
    "</tr>";

    $("#linha_tabela").append(linha_tabela);

}

function sessaoExiste(dados_formulario)
{
    var vetor_sessao = loadFromStorage();
    var contador         = 0;
    var i;
 
    for( i=0 ; i<vetor_sessao.length ; i++ )
    {
        if( vetor_sessao[i].codigo_filme == dados_formulario.codigo_filme ) contador += 1;
        if( vetor_sessao[i].codigo_sala  == dados_formulario.codigo_sala  ) contador += 1;
        if( vetor_sessao[i].data         == dados_formulario.data         ) contador += 1;
        if( vetor_sessao[i].horario      == dados_formulario.horario      ) contador += 1;
        if( contador == 4 ) return i;
        contador = 0;
    }
    i = 0;
    return i;
}

function organizaDadosFormulario()
{
    var objeto_formulario             = new Object();

    objeto_formulario.codigo_filme   = $("#codigo_filme").val();
    objeto_formulario.codigo_sala    = $("#codigo_sala").val();
    objeto_formulario.data           = $("#data_sessao").val();
    objeto_formulario.horario        = $("#horario_sessao").val();
    objeto_formulario.valor_ingresso = $("#valor_ingresso").val();

    return objeto_formulario;
}

/* ===========================================================================================*/
/* =============================== funções de ALTERAR Sessões ================================*/
/* ===========================================================================================*/

function setAlterarSessao()
{
    $("#content_section").html(
        "<form>" +
        "<fieldset>" +
        "<span>" +
        "<label>Selecione uma sessão:</label>" +
        "<select id='codigo_sessao'>"+
        "<option disabled='disabled' selected='selected'>Selecione a sessão</option>"+
        "</select>" +
        "</span>"+
        "<br>" +
        "<span>" +
        "<input type=button class='btn_form' value='Selecionar' onclick='alterarDados()'>"+
        "<input type='reset' class='btn_form' value='Limpar'>"+
        "</fieldset>"+
        "</form>"
    );
    setCodSessao();
}

function alterarDados()
{   
    var vetor_sessao = loadFromStorage();
    var objeto_sessao = $("#codigo_sessao").val();
    
    if( objeto_sessao != null )
    {
        setAddSessaoForm();
        vetor_sessao.splice(objeto_sessao, 1);
        saveInStorage(vetor_sessao);
    }
    else alert("Selecione uma opção.");
    

}

function setPegarSessao()
{
    var objeto_sessao = new Object();

    objeto_sessao.codigo_filme   = $("#codigo_filme").val();
    objeto_sessao.codigo_sala    = $("#codigo_sala").val();
    objeto_sessao.data           = $("#data_sessao").val();
    objeto_sessao.horario        = $("#horario_sessao").val();

    return objeto_sessao;
}

/* ===========================================================================================*/
/* =============================== funções de EXCLUIR Sessões ================================*/
/* ===========================================================================================*/

function setExcluirSessao()
{
    setSelectSessao();
}

function setSelectSessao()
{
    $("#content_section").html(
        "<form>" +
        "<fieldset>" +
        "<span>" +
        "<label>Selecione uma sessão:</label>" +
        "<select id='codigo_sessao'>"+
        "<option disabled='disabled' selected='selected'>Selecione a sessão</option>"+
        "</select>" +
        "</span>"+
        "<br>" +
        "<span>" +
        "<input type=button class='btn_form' value='Selecionar' onclick='excluirDados()'>"+
        "<input type='reset' class='btn_form' value='Limpar'>"+
        "</fieldset>"+
        "</form>"
    );
    setCodSessao();
}

function setCodSessao()
{
    var vetor_sessao = loadFromStorage();
    var str_codigo_sessao = "";
    var i;

    for( i=0 ; i<vetor_sessao.length ; i++ )
    {
        str_codigo_sessao += "<option value='"+i+"'>"+ vetor_sessao[i].codigo_filme  + ", " +
                                                       vetor_sessao[i].codigo_sala   + ", " +
                                                       vetor_sessao[i].data          + ", " +
                                                       vetor_sessao[i].horario       + ", " +
                                                       vetor_sessao[i].valor_ingresso+ ", " +
                                                       "</option>";
                                        
    }

    $("#codigo_sessao").append(str_codigo_sessao);
}


function excluirDados()
{
    var vetor_sessao = loadFromStorage();
    var objeto_sessao = $("#codigo_sessao").val();

    if( objeto_sessao != null )
    {
        vetor_sessao.splice(objeto_sessao, 1);
        alert("Sessão excluída com sucesso!");
        saveInStorage(vetor_sessao);

    } else alert("Selecione uma opção");
    
    
}

/* ===========================================================================================*/
/* =============================== funções de LISTAR Sessões ================================*/
/* ===========================================================================================*/

function setListarUmaSessao()
{
    var objeto_sessao = $("#codigo_sessao").val();

    $("#content_section").html(
        "<form>" +
        "<fieldset>" +
        "<span>" +
        "<label>Selecione uma sessão:</label>" +
        "<select id='codigo_sessao'>"+
        "<option disabled='disabled' selected='selected'>Selecione a sessão</option>"+
        "</select>" +
        "</span>"+
        "<br>" +
        "<span>" +
        "<input type=button class='btn_form' value='Selecionar' onclick='listarUmaSessao()'>"+
        "<input type='reset' class='btn_form' value='Limpar'>"+
        "</fieldset>"+
        "</form>"
    );
    setCodSessao();
}

function listarUmaSessao()
{
    var vetor_sessao = loadFromStorage();
    var objeto_sessao = $("#codigo_sessao").val();

    $("#content_section").html(
        "<table border='1'>" +
        "<thead>" +
        "<tr>" +
        "<th>Código Filme</th>"+
        "<th>Código Sala</th>" +
        "<th>Data</th>" +
        "<th>Horário</th>" +
        "<th>Preço</th>" +
        "</thead>" +
        "<tbody id='linha_tabela'>" +
        '<td>' + vetor_sessao[objeto_sessao].codigo_filme    + '</td>' +
        '<td>' + vetor_sessao[objeto_sessao].codigo_sala       + '</td>' +
        '<td>' + vetor_sessao[objeto_sessao].data + '</td>' +
        '<td>' + vetor_sessao[objeto_sessao].horario   + '</td>' +
        '<td>' + vetor_sessao[objeto_sessao].valor_ingresso  + '</td>' +
        "</tbody>" +
        "</table>"
    );
}

/* ===========================================================================================*/
/* =============================== funções de LISTAR Sessões ================================*/
/* ===========================================================================================*/

function listarTodasSessoes()
{
    var vetor_sessao = loadFromStorage();
    $("#content_section").html(
        "<table border='1'>" +
        "<thead>" +
        "<tr>" +
        "<th>Código Filme</th>"+
        "<th>Código Sala</th>" +
        "<th>Data</th>" +
        "<th>Horário</th>" +
        "<th>Preço</th>" +
        "</thead>" +
        "<tbody id='linha_tabela'>" +
        "</tbody>" +
        "</table>"
    );

    var i;
    for( i=0 ; i<vetor_sessao.length ; i++ )
    {
        atualizarTabela(vetor_sessao[i]);
    }
}
