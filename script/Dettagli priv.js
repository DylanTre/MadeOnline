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
    $.getJSON(MaDe_Config.server_REST + "/" + MaDe_Config.guid + "/Dati/Codice/" + aval[1], function (data) {


        test(data);
    });

    $("#btnSucc").click(function () {

        if (index === listaCodici.length - 1) {
            index = -1;
        }
        index++;
        console.log(index);
        $.getJSON(MaDe_Config.server_REST + "/" + MaDe_Config.guid + "/Dati/Codice/" + listaCodici[index], function (data) {
            test(data);
        });
    });

    $("#btnPrec").click(function () {

        if (index === 0) {
            index = listaCodici.length;
        }

        index--;

        $.getJSON(MaDe_Config.server_REST + "/" + MaDe_Config.guid + "/Dati/Codice/" + listaCodici[index], function (data) {
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
        tab += '<td class = "colonnaR">'  + checkUndef(data[0][f]) + '</td>';
        tab += '</tr>';
    }
    tab += '</table>';

    $('#dettaglio').html(tab);
}

function checkUndef(v) {
    if (v === undefined || v === null) {
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
       "fieldname": "tipo_media",
       "caption": "Tipo media",
       "ord": 3,
       "cb": false,
       "r_pub": false,
       "v_pub": false
   },
   {
       "fieldname": "tiposcheda",
       "caption": "Tipo di scheda",
       "ord": 4,
       "cb": false,
       "r_pub": false,
       "v_pub": false
   },
   {
       "fieldname": "archivio",
       "caption": "Archivio fotografico",
       "ord": 5,
       "cb": false,
       "r_pub": false,
       "v_pub": false
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
       "fieldname": "collocazione",
       "caption": "Collocazione",
       "ord": 7,
       "cb": false,
       "r_pub": false,
       "v_pub": false
   },
   {
       "fieldname": "num_inventario",
       "caption": "Numero di inventario",
       "ord": 8,
       "cb": false,
       "r_pub": false,
       "v_pub": false
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
       "fieldname": "soggetto_descrizione",
       "caption": "Descrizione oggetto",
       "ord": 11,
       "cb": true,
       "r_pub": false,
       "v_pub": false
   },
   {
       "fieldname": "soggetto_specifiche",
       "caption": "Specifiche oggetto",
       "ord": 12,
       "cb": true,
       "r_pub": false,
       "v_pub": false
   },
   {
       "fieldname": "num_negativo",
       "caption": "Numero di negativo",
       "ord": 13,
       "cb": false,
       "r_pub": false,
       "v_pub": false
   },
   {
       "fieldname": "altri_formati",
       "caption": "Altri formati",
       "ord": 14,
       "cb": false,
       "r_pub": false,
       "v_pub": false
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
       "fieldname": "serie_titolo",
       "caption": "Titolo della serie",
       "ord": 16,
       "cb": false,
       "r_pub": false,
       "v_pub": false
   },
   {
       "fieldname": "serie_num_ord",
       "caption": "Nr. d'ordine nella serie",
       "ord": 17,
       "cb": false,
       "r_pub": false,
       "v_pub": false
   },
   {
       "fieldname": "condizione",
       "caption": "Condizione generica",
       "ord": 18,
       "cb": true,
       "r_pub": false,
       "v_pub": false
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
       "caption": "Validità  Data esec.-Da",
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
       "caption": "Validità  Data esec.-A",
       "ord": 24,
       "cb": false,
       "r_pub": false,
       "v_pub": true
   },
   {
       "fieldname": "osservazioni",
       "caption": "Osservazioni",
       "ord": 25,
       "cb": false,
       "r_pub": false,
       "v_pub": false
   },
   {
       "fieldname": "fondo_provenienza",
       "caption": "Fondo di provenienza",
       "ord": 26,
       "cb": false,
       "r_pub": false,
       "v_pub": false
   },
   {
       "fieldname": "fondo_provenienza_luogo",
       "caption": "Luogo Fondo di prov.",
       "ord": 27,
       "cb": false,
       "r_pub": false,
       "v_pub": false
   },
   {
       "fieldname": "acquisizione_data",
       "caption": "Data di acquisizione",
       "ord": 28,
       "cb": false,
       "r_pub": false,
       "v_pub": false
   },
   {
       "fieldname": "acquisizione_data_valid",
       "caption": "Validità  Data Acq.",
       "ord": 29,
       "cb": true,
       "r_pub": false,
       "v_pub": false
   },
   {
       "fieldname": "acquisizione_tipo",
       "caption": "Tipo di acquisizione",
       "ord": 30,
       "cb": true,
       "r_pub": false,
       "v_pub": false
   },
   {
       "fieldname": "copyright",
       "caption": "Copyright",
       "ord": 31,
       "cb": true,
       "r_pub": false,
       "v_pub": false
   },
   {
       "fieldname": "inventari",
       "caption": "Inventari",
       "ord": 32,
       "cb": false,
       "r_pub": false,
       "v_pub": false
   },
   {
       "fieldname": "committenza",
       "caption": "Committenza",
       "ord": 33,
       "cb": false,
       "r_pub": false,
       "v_pub": false
   },
   {
       "fieldname": "tipo_supporto",
       "caption": "Tipo di supporto",
       "ord": 34,
       "cb": false,
       "r_pub": false,
       "v_pub": false
   },
   {
       "fieldname": "identificativo_volume",
       "caption": "Identificat. di volume",
       "ord": 35,
       "cb": false,
       "r_pub": false,
       "v_pub": false
   },
   {
       "fieldname": "annotazioni",
       "caption": "Annotazioni",
       "ord": 36,
       "cb": false,
       "r_pub": false,
       "v_pub": false
   }
];