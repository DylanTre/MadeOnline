var aval;
var listaCodici;
var index;
$(document).ready(function () {

    aval = document.URL.split('=');
    listaCodici = JSON.parse(sessionStorage.idFoto);

    for (var i = 0; i < listaCodici.length; i++) {
        if (String(listaCodici[i] === aval[1])) {
            index = i;
        }
    }
    $.getJSON(MaDe_Config.server_REST + "/Dati/Codice/" + aval[1], function (data) {

        test(data);
    });

    $("#btnSucc").click(function () {

        if (index === listaCodici.length - 1) {
            index = -1;
        }
        index++;
        console.log(index);
        $.getJSON(MaDe_Config.server_REST + "/Dati/Codice/" + listaCodici[index], function (data) {
            test(data);
        });
    });

    $("#btnPrec").click(function () {

        if (index === 0) {
            index = listaCodici.length;
        }

        index--;

        $.getJSON(MaDe_Config.server_REST + "/Dati/Codice/" + listaCodici[index], function (data) {
            test(data);
        });
    });
});

var f;
function test(data) {

    var path = makeImgPath(data[0].file_path);

    console.log(path);

    var tab = '<table id = "Tabella" border = 1>';

    tab += '<tr class = "riga"><td class = "colonnaL"> foto </td> <td class = "colonnaR"> <img src="' + path + '" > </td> </tr>';

    for (var i = 0; i < fldDesc.length; i++) {
        f = fldDesc[i].fieldname;

        tab += '<tr class = "riga">';
        tab += '<td class = "colonnaL">' + fldDesc[i].caption + '</td>';
        tab += '<td class = "colonnaR">' + checkUndef(eval('data[0].' + f)) + '</td>';
        tab += '</tr>';
    }
    tab += '</table>';

    $('#dettaglio').html(tab);
}

function checkUndef(v) {
    if (v === undefined) {
        return "";
    }
    else {
        return v;
    }
}

var fldDesc = [
  {
      "fieldname": "codice",
      "caption": "Codice",
      "ord": 1,
      "cb": false,
      "r_pub": false,
      "v_pub": true
  },
  {
      "fieldname": "intestazione",
      "caption": "Intestazione",
      "ord": 2,
      "cb": false,
      "r_pub": true,
      "v_pub": true
  },
  {
      "fieldname": "fondo",
      "caption": "Fondo",
      "ord": 6,
      "cb": true,
      "r_pub": true,
      "v_pub": true
  },
  {
      "fieldname": "soggetto",
      "caption": "Identific. del soggetto",
      "ord": 9,
      "cb": false,
      "r_pub": true,
      "v_pub": true
  },
  {
      "fieldname": "soggetto_titolo",
      "caption": "Titolo del soggetto",
      "ord": 10,
      "cb": false,
      "r_pub": true,
      "v_pub": true
  },
  {
      "fieldname": "serie",
      "caption": "Identific. della serie",
      "ord": 15,
      "cb": true,
      "r_pub": true,
      "v_pub": true
  },
  {
      "fieldname": "data_da",
      "caption": "Data di esecuzione-Da",
      "ord": 19,
      "cb": false,
      "r_pub": true,
      "v_pub": true
  },
  {
      "fieldname": "data_esecuz_da",
      "caption": "Data di esecuzione-Da",
      "ord": 20,
      "cb": false,
      "r_pub": false,
      "v_pub": true
  },
  {
      "fieldname": "data_esecuz_da_valid",
      "caption": "Validità  Data esec.-Da",
      "ord": 21,
      "cb": true,
      "r_pub": false,
      "v_pub": true
  },
  {
      "fieldname": "data_a",
      "caption": "Data di esecuzione-A",
      "ord": 22,
      "cb": false,
      "r_pub": true,
      "v_pub": true
  },
  {
      "fieldname": "data_esecuz_a",
      "caption": "Data di esecuzione-A",
      "ord": 23,
      "cb": false,
      "r_pub": false,
      "v_pub": true
  },
  {
      "fieldname": "data_esecuz_a_valid",
      "caption": "Validità  Data esec.-A",
      "ord": 24,
      "cb": false,
      "r_pub": false,
      "v_pub": true
  }
];