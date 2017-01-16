var aval;

var listaCodici;

var index;

$(document).ready(function () {

    aval = document.URL.split('=');
    listaCodici = JSON.parse(sessionStorage.idFoto);

    for (var i = 0; i < listaCodici.length; i++) {
        if (listaCodici[i] == aval[1]) {
            index = i;
        }
    }

    $.getJSON(MaDe_Config.server_REST + "/Dati/Codice/" + aval[1], function (data) {

        test(data);
    })

    $("#btnSucc").click(function () {

        if (index == listaCodici.length - 1) {
            index = -1;
        }
        index++;
        console.log(index);
        $.getJSON(MaDe_Config.server_REST + "/Dati/Codice/" + listaCodici[index], function (data) {
            test(data);
        })
    });

    $("#btnPrec").click(function () {

        if (index == 0) {
            index = listaCodici.length;
        }

        index--;

        $.getJSON(MaDe_Config.server_REST + "/Dati/Codice/" + listaCodici[index], function (data) {
            test(data);
        })
    });

});

function test(data) {
    var path = makeImgPath("/Dati/Codice/" + listaCodici[index]);

    console.log(path);
    //var out = '<img src="' + path + '" >';

    var out = 'Cod: ' + data[0].codice + ' album: ' + data[0].id_album + ' <img src="' + path + '" >';

    $('#dettaglio').html(out);
}
