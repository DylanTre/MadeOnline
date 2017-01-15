var des_dati_publ;

$.get(MaDe_Config.server_REST + "/Fields/Publ", function (data) {
    des_dati_publ = data;
});
var des_dati_priv;
$.get(MaDe_Config.server_REST + "/Fields/Priv", function (data) {
    des_dati_priv = data;
});

var Fondi;
$.get(MaDe_Config.server_REST + "/Fondi", function (data) {
    Fondi = data;
});

var Serie;
$.get(MaDe_Config.server_REST + "/Serie", function (data) {
    Serie = data;
});

function addTitoli() {
    var data = PrendiData();
    s = '<tr>';
    for (var i in data) {
        s += '<th>';
        s += data[i].caption;
        s += '</th>';
    }
    s += '</tr>';
    return s;
}

function addRiga(r) {
    //var path = makeImgPath(data[i].file_path);
    //var ico64 = makeIco64Path(data[i].file_path);
    var tmp = "";
   var data = PrendiData();
   
    s = '<tr>';
    for (var i in data) {
        s += '<td class="txtCenter">';
        if (data[i].fieldname == 'fondo') {
            s += getPath(r.id_fondo, "Fondi", 'id_fondo', 'fondo');
        }
        else if (data[i].fieldname == 'serie') {
            s += getPath(r.id_serie, "Serie", 'id_serie', 'serie_titolo')
        }
        else if(data[i].fieldname=='collocazione') {
            s += eval('r' + '.' + data[i].fieldname);
        }
        s += '</td>';

    }
    s += '</tr>';
    return s;
}
// path=/Dati default.
function getFotoAll(path) {
    path = PrendiPath(path);
    console.log(path);

    console.log(MaDe_Config.server_REST + path);
    $.get(MaDe_Config.server_REST + path, function (data) {
        var str = '';
        str += "<table>"
        str += addTitoli();
        for (var i in data) {
            str += addRiga(data[i]);
        }
        str += "</table>"
        $("#bookmark").html(str);
    });
}
function getFotoAllContiene() {
    var path = $("#scelta").val();
    var input_txt = $("#inputSelection").val();
    var input_date = $("#data").val();
    if (input_txt == "" && input_date == "")
        getFotoAll();
    else if (input_txt != "" && input_date == "") {
        path += input_txt;
        getFotoAll(path);
    }
    else if (input_date != "") {
        path += input_date;
        getFotoAll(path);
        console.log("PATH:" + path);

    }

    $("#inputSelection").val("");

}
function getPath(id, Campo, FieldId, FieldReturn, Dati) {
    var ris = "";
    for (var i in eval(Campo)) {
        if (eval(Campo + '[i].' + FieldId) == id) {
            ris = eval(Campo + '[i].' + FieldReturn);
            break;
        }
    }
    return ris;
}
function PrendiData() {
    var data = '';
    switch ($("#Tipo_campi").val()) {
        case "0": data = des_dati_priv;
            break;
        case "1": data = des_dati_publ;
            break;
        default:
            data = des_dati_publ;
    }
    return data;
}
function PrendiPath(percorso) {
    var path = '';
    if (percorso == "" || percorso == undefined)
        percorso = "/Dati";
    switch ($("#Tipo_campi").val()) {
        case "0": path = "/094C4271-7FB0-4070-985E-26EC39EBACF5" + percorso;
            break;
        case "1": path = percorso;
            break;
        default:
            path = "/Dati";
    }
    return path;
}

function drawTabellaImg(data) {
    var str = '';
    str += "<table style='width:1200px; float:none; text-align:center;'>"
    //str += "<tr><th>Titolo</th><th>Foto</th></tr>"
    for (var i in data) {
        var path = makeImgPath(data[i].file_path);
        var ico64 = makeIco64Path(data[i].file_path);
        str += '<tr><td class="titolo">' + data[i].soggetto_titolo + '</td></tr>';
        str += '<tr><td><a href="' + path + '" target="_blank" ><img src="' + path + '" ></a></td></tr>';
    }
    str += "</table>"
    $("#bookmark").html(str);
}




