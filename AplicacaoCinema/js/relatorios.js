

/* ===========================================================================================*/
/* =========================== funções de carregar dados ================================*/
/* ===========================================================================================*/

function loadFromStorageSessao()
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
/* =============================== funções para RELATÓRIO I   ================================*/
/* ===========================================================================================*/

/* Mostrar todos os dados de todas as salas cujo tipo de exibição seja X e
capacidade para mais de Y pessoas, onde X e Y são fornecidos pelo usuário */

function setRelatorioI()
{
    $("#content_table_section").html("");
    $("#content_section").html(
        "<form>" +
        "<fieldset>" +
        "<span>" +
        "<label>Tipo de exibição:</label>" +
        "<input type='text' id='tipo_exibicao' placeholder='2d, 3d'>" +
        "</span>" +
        "<br>" +
        "<span>" +
        "<label>Capacidade da sala:</label>" +
        "<input type='number' id='capacidade_sala' step='50'>"+
        "</span>" +
        "<br>" +
        "<span>" +
        "<input type='button' value='Relatorio' class='btn_form' onclick='gerarRelatorioI()'>" +
        "<input type='reset' class='btn_form' value='Limpar'>" +
        "</span>" +
        "</fieldset>"+
        "</form>"
    );
}


function gerarRelatorioI()
{
    $("#content_table_section").html("");
    var vetor_salas = loadFromStorageSalas();
    var t_exibicao  = $("#tipo_exibicao").val();
    var capacidade  = $("#capacidade_sala").val();

    $("#content_table_section").html(
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
        '</table>'
    )

    var i;
    for( i=0 ; i<vetor_salas.salas.length ; i++ )
    {
        if(vetor_salas.salas[i].t_exibicao == t_exibicao && 
            vetor_salas.salas[i].capacidade > capacidade )
            colocarLinhaI(i);
    }
}

function colocarLinhaI(i)
{
    var vetor_salas = loadFromStorageSalas();
    var linha_tabela =
    '<tr class="linha_hover">' +
    '<td>' + vetor_salas.salas[i].codigo + '</td>' + 
    '<td>' + vetor_salas.salas[i].nome + '</td>' + 
    '<td>' + vetor_salas.salas[i].capacidade + '</td>' + 
    '<td>' + vetor_salas.salas[i].t_exibicao + '</td>' + 
    '<td>' + vetor_salas.salas[i].acessivel + '</td>' +
    '</tr>';

    $("#listar_salas").append(linha_tabela);
}

/* ===========================================================================================*/
/* =============================  funções para RELATÓRIO II   ================================*/
/* ===========================================================================================*/

/* Mostrar todos os dados de todos os filmes que foram lançados a partir do ano X
e contam com a participação do ator Y, onde X e Y são fornecidos pelo usuário */

function setRelatorioII()
{
    $("#content_table_section").html("");
    $("#content_section").html(
        "<form>" +
        "<fieldset>" +
        "<span>" +
        "<label>Ano:</label>" +
        "<input type='number' id='id_ano' value='2000' step='1'>" +
        "</span>" +
        "<br>" +
        "<span>" +
        "<label>Nome do ator/atriz:</label>" +
        "<input type='text' id='id_nome' placeholder='nome completo'>"+
        "</span>" +
        "<br>" +
        "<span>" +
        "<input type='button' value='Relatorio' class='btn_form' onclick='gerarRelatorioII()'>" +
        "<input type='reset' class='btn_form' value='Limpar'>" +
        "</span>" +
        "</fieldset>"+
        "</form>"
    );
}

function gerarRelatorioII()
{
    $("#content_table_section").html("");
    var vetor_filmes = loadFromStorageFilmes();
    var ano          = $("#id_ano").val();
    var nome         = $("#id_nome").val();

    $("#content_table_section").html(
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
        '</table>'
    );

    var i, j;
    for( i=0 ; i<vetor_filmes.length ; i++ )
    {
        if( vetor_filmes[i].lancamento >= ano )
        {
            for( j=0 ; j<vetor_filmes[i].atores.length ; j++ )
            {
                if( vetor_filmes[i].atores[j] == nome )
                {
                    colocarLinhaII(i);
                }
            }
        }
    }
}

function colocarLinhaII(i)
{
    var vetor_filmes = loadFromStorageFilmes();
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
    
    $("#linha_tabela").append(linha_tabela);
}

/* ===========================================================================================*/
/* =============================  funções para RELATÓRIO III   ================================*/
/* ===========================================================================================*/

/* Mostrar o código do filme, nome do filme, atores, código da sala, nome da sala
e os demais atributos de todas as sessões exibidas a partir de uma data inicial X 
até uma data final Y, onde ambas as datas são fornecidas pelo usuário. */

function setRelatorioIII()
{
    $("#content_table_section").html("");
    $("#content_section").html(
        "<form>" +
        "<fieldset>" +
        "<span>" +
        "<label>Data inicial:</label>" +
        "<input type='date' id='data_inicial'>" +
        "</span>" +
        "<br>" +
        "<span>" +
        "<label>Data final:</label>" +
        "<input type='date' id='data_final'>"+
        "</span>" +
        "<br>" +
        "<span>" +
        "<input type='button' value='Relatorio' class='btn_form' onclick='gerarRelatorioIII()'>" +
        "<input type='reset' class='btn_form' value='Limpar'>" +
        "</span>" +
        "</fieldset>"+
        "</form>"
    );
}

function gerarRelatorioIII()
{
    $("#content_table_section").html("");
    var vetor_sessao = loadFromStorageSessao();

    var data_inicial = $("#data_inicial").val();
    var data_final   = $("#data_final").val();
    
    $("#content_table_section").html(
        '<table border="1">' +
        '<thead>' +
        '<tr>' +
        '<th>Código do filme</th>' +
        '<th>Nome do filme</th>' +
        '<th>Ator 1</th>' +
        '<th>Ator 2</th>' +
        '<th>Ator 3</th>' +
        '<th>Código da sala</th>' +
        '<th>Nome da sala</th>' +
        '<th>Data da sessão</th>' +
        '</thead>'+
        '<tbody id="linha_tabela">' +
        '</tbody>' +
        '</table>'
    );
    var i;
    for( i=0 ; i<vetor_sessao.length ; i++ )
    {
        if( vetor_sessao[i].data >= data_inicial && vetor_sessao[i].data <= data_final )
        {
            colocarLinhaIII(i);
        }
    }
}

function colocarLinhaIII(i)
{
    var vetor_filmes = loadFromStorageFilmes();
    var vetor_salas  = loadFromStorageSalas();
    var vetor_sessao = loadFromStorageSessao();

    var indice_filme = localizaFilme(i);
    if( indice_filme == null ) 
    {
        alert("Ops, aconteceu algum erro. Parece que o filme desta sessão não existe.");
        return;
    }

    var indice_sala  = localizaSala(i);
    if( indice_sala == null ) 
    {
        alert("Ops, aconteceu algum erro. Parece que a sala desta sessão não existe.");
        return;
    }

    var linha_tabela =
        '<tr calss="linha_hover">' +
        '<td>' + vetor_filmes[indice_filme].codigo     + '</td>' +
        '<td>' + vetor_filmes[indice_filme].nome       + '</td>' +
        '<td>' + vetor_filmes[indice_filme].atores[0]  + '</td>' +
        '<td>' + vetor_filmes[indice_filme].atores[1]  + '</td>' +
        '<td>' + vetor_filmes[indice_filme].atores[2]  + '</td>' +
        '<td>' + vetor_salas.salas[indice_sala].codigo + '</td>' +
        '<td>' + vetor_salas.salas[indice_sala].nome   + '</td>' +
        '<td>' + vetor_sessao[i].data                  + '</td>' +
        '</tr>';

    $("#linha_tabela").append(linha_tabela);
}

function localizaFilme(i)
{
    var vetor_filmes = loadFromStorageFilmes();
    var vetor_sessao = loadFromStorageSessao();

    var j;
    for( j=0 ; j<vetor_filmes.length ; j++ )
    {
        if( vetor_sessao[i].codigo_filme == vetor_filmes[j].codigo ) return j;
    }
    return null;
}

function localizaSala(i)
{
    var vetor_salas  = loadFromStorageSalas();
    var vetor_sessao = loadFromStorageSessao();

    var j;
    for( j=0 ; j<vetor_salas.salas.length ; j++ )
    {
        if( vetor_sessao[i].codigo_sala == vetor_salas.salas[j].codigo ) return j;
    }
    return null;
}
