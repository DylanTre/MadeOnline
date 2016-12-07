///////////////////
//
// Funzioni per la pagina di test della tabella
//
///////////////////

$(document).ready(function () {
    $.getJSON(MaDe_Config.server_REST + "/Dati", function (data) {
        drawTabella(data);
    })
    title()
});

function drawTabella(data) {
    var str = '';
    str += "<table>"
    str += "<tr><th>Codice</th><th>Soggetto</th><th>Serie</th><th>Collocazione</th><th>File</th></tr>"
    for (var i in data) {
        str += '<tr>';
        str += '<td>' + data[i].codice + '</td>';
        str += '<td>' + data[i].soggetto_titolo + '</td>';
        str += '<td>' + data[i].id_album + '</td>';
        str += '<td>' + data[i].serie_num_ord + '</td>';
        str += '<td>' + data[i].file_path + '</td>';
        str += '<tr>';
    }
    str += "<table>"
    $("#bookmark").html(str);
}


function getVersion() {
    $.get(MaDe_Config.server_REST + "/Version", function (data) {
        $("#bookmark").html(data);
    });
}

function getAll() {
    $.get(MaDe_Config.server_REST + "/" + MaDe_Config.guid + "/Dati", function (data) {
        drawTabella(data);
    });
}

function getCodice(id) {
    $.get(MaDe_Config.server_REST + "/Dati/Codice/" + id, function (data) {
        drawTabella(data);
    });
}

function getSerieTitoli() {
    $.get(MaDe_Config.server_REST + "/Serie", function (data) {
        var str = '';

        str += "<table>"
        str += "<tr><th>ID Serie</th><th>Titolo delle serie</th></tr>"
        for (var i in data) {
            str += '<tr>';
            str += '<td>' + data[i].id_serie + '</td>';
            str += '<td>' + data[i].serie_titolo + '</td>';
            str += '<tr>';
        }
        str += "<table>"

        $("#bookmark").html(str);
    });
}

function getFotoAll() {
    $.get(MaDe_Config.server_REST + "/Dati", function (data) {
        var str = '';
        str += "<table>"
        str += "<tr><th>ID Serie</th><th>Collocazione</th><th>Titolo delle serie</th><th>Serie Path</th></tr>"
        for (var i in data) {

            var path = makeImgPath(data[i].file_path);
            var ico64 = makeIco64Path(data[i].file_path);

            str += '<tr>';
            str += '<td>' + data[i].id_album + '</td>';
            str += '<td>' + data[i].serie_num_ord + '</td>';
            str += '<td>' + data[i].soggetto + '</td>';
            str += '<td><a href="' + path + '" target="_blank" ><img src="' + ico64 + '" ></a></td>';
            str += '<tr>';
        }
        str += "<table>"

        $("#bookmark").html(str);
    });
}

function title()
{
    var str = "Web Service = " + MaDe_Config.server_REST;
    $("#title").html(str);
}