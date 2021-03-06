﻿///////////////////
/// <reference path="../Dettagli.html" />
//
// Funzioni per la pagina di test delle immagini
//
///////////////////


$(document).ready(function () {
    $.getJSON(MaDe_Config.server_REST + "/Dati", function (data) {
        drawTabella(data);
        Storage(data);
    })
    title()
});

function drawTabella(data) {
    var str = '';
    str += "<table style='width:1200px; float:none; text-align:center;'>"
    //str += "<tr><th>Titolo</th><th>Foto</th></tr>"
    for (var i in data) {
        var path = makeImgPath(data[i].file_path);
        var ico64 = makeIco64Path(data[i].file_path);
        str += '<tr><td class="titolo">' + data[i].soggetto_titolo + '</td></tr>';
        str += '<tr><td><a href="../Dettagli.html?ID=' + data[i].codice + '" target="_blank" ><img src="' + path + '" ></a></td></tr>';
    }
    str += "</table>"
    $("#bookmark").html(str);
}


function title() {
    var str = "Web Service = " + MaDe_Config.server_REST;
    $("#title").html(str);
}


function Storage(foto) {
    var displayFoto = new Array();
    for (var i in foto) {
        //if (foto[i].visibile) {
        displayFoto.push(foto[i].codice)
        //}
    }
    sessionStorage.idFoto = JSON.stringify(displayFoto);
    console.log(displayFoto);

}