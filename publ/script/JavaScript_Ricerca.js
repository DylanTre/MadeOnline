var foto;

function Storage() {
    var displayFoto = new Array();
    for (var i in foto) {
        if (foto[i].visibile) {
            displayFoto.push(foto[i].codice)
        }
    }
    sessionStorage.idFoto = JSON.stringify(displayFoto);
    window.open('showStorage.html', '_blank');

}

function Data_ISO10(d) {
    return d.toISOString().slice(0, 10);
}

function showContatore() {
    iCnt = 0;
    for (var i in foto) {
        if (foto[i].visibile)
            iCnt++;
    }
    if (iCnt == 900)
        iCnt = 0;
    $("#numfoto").html("Trovate " + iCnt + " foto");
}

function azzeraRicerca() {
    $("#bookmark").hide();

    $("#txtSoggetto").val("");
    $("#cbAlbum").val("-1");
    $("#dMin").val("1914-01-01");
    $("#dMax").val("1918-12-31");

    $("#filtro_cbAlbum").html("");
    $("#filtro_txtSoggetto").html("");
    $("#filtro_Periodo").html("");

    for (var i in foto) {
        foto[i].visibile = true;
    }
    showContatore();
}

function getFotoAll() {
    $.get(MaDe_Config.server_REST + "/Dati", function (data) {
        foto = data;
        azzeraRicerca();
    });
}

function filtraSoggetto() {

    s = $("#txtSoggetto").val().toUpperCase();
    $("#filtro_txtSoggetto").append(s + ' ');
    for (var i in foto) {
        if (foto[i].visibile) {
            trovato = foto[i].soggetto.includes(s) || foto[i].soggetto_titolo.includes(s);
            if (!trovato) {
                foto[i].visibile = false;
            }
        }
    }

    showContatore();
    Tabella();
}

function filtraAlbum() {

    num = parseInt($("#cbAlbum").val());
    $("#filtro_cbAlbum").append(num + ' ');

    if (num >= 0) {
        for (var i in foto) {
            if (foto[i].visibile) {
                trovato = foto[i].id_album == num;
                if (!trovato) {
                    foto[i].visibile = false;
                }
            }
        }
    }
    else {
        alert("Album non valido!")
    }

    showContatore();
    Tabella();
}

function filtraPeriodo() {

    sdMin = $("#dMin").val();
    sdMax = $("#dMax").val();

    $("#filtro_Periodo").append(sdMin + '--' + sdMax + ' ');

    for (var i in foto) {
        if (foto[i].visibile) {
            fdmin = Data_ISO10(new Date(foto[i].data_da));
            fdmax = Data_ISO10(new Date(foto[i].data_a));
            trovato = fdmin >= sdMin && fdmax <= sdMax;
            if (!trovato) {
                foto[i].visibile = false;
            }
        }
    }

    showContatore();
    Tabella();
}

function Tabella() {
    var str = '';
    str += "<table>"
    str += "<tr><th>ID Album</th><th>Soggetto/Titolo</th><th>Periodo</th><th>Foto</th></tr>"
    for (var i in foto) {
        if (foto[i].visibile) {
            var path = makeImgPath(foto[i].file_path);
            var ico64 = makeIco64Path(foto[i].file_path);

            str += '<tr>';
            str += '<td class="txtCenter">' + foto[i].id_album + '</td>';
            str += '<td>' + foto[i].soggetto.trim() + '<br><i>' + foto[i].soggetto_titolo.trim() + '</i></td>';
            dMin = new Date(foto[i].data_da);
            dMax = new Date(foto[i].data_a);
            sMin = dMin.toLocaleDateString();
            sMax = dMax.toLocaleDateString();
            if (sMin == sMax) {
                sdata = sMin;
            }
            else {
                sdata = sMin + " -- " + sMax;
            }
            str += '<td class="txtCenter">' + sdata + '</td>';
            str += '<td class="txtCenter"><a href="' + path + '" target="_blank" ><img src="' + ico64 + '" ></a></td>';
            str += '<tr>';
        }
    }
    str += "<table>"

    $("#bookmark").html(str);
    $("#bookmark").show();
}



function creaFiltro()
{
    
    $.get(MaDe_Config.server_REST + "/Album", function (data) {
        var album = [];//vettore
        for (var i = 0; i < data.length; i++) {
            album.push(data[i].id_album);
        }
        var s = '<table border="1">'
        s += '<tr>'
        s += '             <td>Soggetto/Titolo/Intestazione contiene: </td>'
        s += '            <td><input id="txtSoggetto" type="text" /></td>'
        s += '           <td><input type="button" value="Aggiungi Filtro" onclick="filtraSoggetto()" /></td>'
        s += '           <td id="filtro_txtSoggetto"></td>'
        s += '        </tr>'
        s += '        <tr>'
        s += '            <td>Album Numero:</td>'
        s += '            <td>'
        s += '                <select id="cbAlbum">'
        //s += '<option value=14</option>'
        //s += '<option value=14</option>'
        album.forEach(function (item, index) {
            s += '<option value="' + item + '">Album ' + item + '</option>'
        });
        s += '                </select>'
        s += '           </td>'
        s += '           <td><input type="button" value="Aggiungi Filtro" onclick="filtraAlbum()" /></td>'
        s += '            <td id="filtro_cbAlbum"></td>'
        s += '        </tr>'
        s += '        <tr>'
        s += '            <td>Periodo</td>'
        s += '             <td><input id="dMin" type="date" /> -- <input id="dMax" type="date" /></td>'
        s += '            <td><input type="button" value="Aggiungi Filtro" onclick="filtraPeriodo()" /></td>'
        s += '            <td id="filtro_Periodo"></td>'
        s += '        </tr>        '
        s += '    </table>'

        $("#filtro").html(s);
    });
  
}