var foto;

function Storage(foto) {
    var displayFoto = new Array();
    for (var i in foto) {
        if (foto[i].visibile) {
            displayFoto.push(foto[i].codice);
        }
    }
    sessionStorage.idFoto = JSON.stringify(displayFoto);
    console.log(displayFoto);
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

    $("#numfoto").html("Trovate " + iCnt + " foto");
}

function azzeraRicerca() {
    $("#bookmark").hide();

    //cancello tutte le textbox
    $("#filtro").find("input[type=text]").val('');
    //cancello tutte le combobox
    $('[id^=cb]').val("-1");
    //cancello tutti i filtri aggiunti
    $('td[id^=filtro]').text("");

    $("input[type=date]").val("1914-01-01");

    $("#dMin").val("1914-01-01");
    $("#dMax").val("1918-12-31");

    $("#btn_annotazioni").html("");
    for (var i in foto) {
        foto[i].visibile = true;
    }
    showContatore();
}

function isStringaVuota(s) {
    return s === "" || s === undefined || s === null;
}
function PrendiPath(percorso) {
    var path = '';

    if (isStringaVuota (percorso))
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

function getFotoAll() {
    $.get(MaDe_Config.server_REST + "/" + MaDe_Config.guid +"/Dati", function (data) {
        foto = data;
        Storage(data);
        azzeraRicerca();
    });
}

function filtraSoggetto() {

    s = $("#txtSoggetto").val().toUpperCase();
    $("#filtro_txtSoggetto").append(s + ' ; ');
    switch ($("#Tipo_ricerca").val()) {
        //AND
        case "0":
            for (var k in foto) {
                if (foto[k].visibile) {
                    trovato = foto[k].soggetto.includes(s) || foto[k].soggetto_titolo.includes(s);
                    if (!trovato) {
                        foto[k].visibile = false;
                    }
                }
            }
            break;
            //OR
        case "1":
            for (var i in foto) {
                trovato = foto[i].soggetto.includes(s) || foto[i].soggetto_titolo.includes(s);
                if (!trovato) {
                    foto[i].visibile = false;
                }
            }
            break;
    }

    Storage(foto);
    showContatore();
    Tabella();
}

//function filtraAlbum() {
//    num = parseInt($("#cbAlbum").val());
//    $("#filtro_cbAlbum").append(num + ' ');
//    console.log("entrato");
//    if (num >= 0) {
//        switch ($("#Tipo_ricerca").val()) {
//            //AND
//            case "0":
//                for (var i in foto) {
//                    console.log(foto[i]);
//                    if (foto[i].visibile) {
//                        trovato = foto[i].id_album == num;
//                        if (!trovato) {
//                            foto[i].visibile = false;
//                        }
//                    }
//                }
//                break;
//            //OR
//            case "1":
//                console.log("1");
//                for (var i in foto) {
//                    if (foto[i].id_album == num)
//                    //    foto[i].visibile = true;
//                    //else
//                        foto[i].visibile = false;
//                }
//                break;
//        }
//    }
//    else {
//        alert("Album non valido!")
//    }
//    showContatore();
//    Tabella();
//}
function filtraAlbum(campo,id_cb, id_filtro) {

    num = parseInt($("#" + id_cb).val());
    $("#" + id_filtro).append(num + ' ; ');

    if (num < 0) {
        alert("Album non valido!");
        return;
    }

    switch ($("#Tipo_ricerca").val()) {
        //AND
        case "0":
            for (var k in foto) {
                if (foto[k].visibile) {
                    trovato = foto[k][campo] === num;
                    if (!trovato) {
                        foto[k].visibile = false;
                    }
                }
            }
            break;
            //OR
        case "1":
            var trovato = false;
            var res = [];
            res = $("#" + id_filtro).text().split(" ; ");
            for (var i in foto) {
                for (var j = 0; j < res.length - 1; j++) {
                    trovato = foto[i][campo] === res[j];
                    if (trovato) {
                        foto[i].visibile = true;
                        break;
                    }
                    if (!trovato)
                        foto[i].visibile = false;
                }
            }
    }
    Storage(foto);
    showContatore();
    Tabella();
}
function filtraPeriodo(idMin, idMax, idFiltro, idCampoDa, idCampoA) {
    var due_campi = idCampoA !== "" || idCampoA !== undefined || idCampoA !== null;
    sdMin = $("#" + idMin).val();
    
    if (isStringaVuota(idMax))
    {
        sdMax = Data_ISO10(new Date());//  new Date();
    }
    else
    {
        sdMax = $("#" + idMax).val();
    }
    $("#" + idFiltro).append(sdMin + '--' + sdMax + ' ');

    fdmax = sdMax;
    switch ($("#Tipo_ricerca").val()) {
        //AND
        case "0":
            for (var k in foto) {
                if (foto[k].visibile) {
                    fdmin = Data_ISO10(new Date(foto[k][idCampoDa]));
                    if (due_campi) fdmax = Data_ISO10(new Date(foto[k][idCampoA]));
                    trovato = fdmin >= sdMin && fdmax <= sdMax;
                    if (!trovato) {
                        foto[k].visibile = false;
                    }
                }
            }
            break;
            //OR
        case "1":
            for (var i in foto) {
                fdmin = Data_ISO10(new Date(foto[i][idCampoDa]));
                if (due_campi) fdmax = Data_ISO10(new Date(foto[i][idCampoA]));
                trovato = fdmin >= sdMin && fdmax <= sdMax;
                if (!trovato) {
                    foto[i].visibile = false;
                }
            }
            break;
    }

    Storage(foto);
    showContatore();
    Tabella();
}

//function filtraFondo() {
//    switch ($("#Tipo_ricerca").val()) {
//        //AND
//        case "0":
//            for (var i in foto) {
//                if (foto[i].visibile) {
//                    if (foto[i].id_fondo != $("#cbFondo").val())
//                        foto[i].visibile = false;
//                }
//            }
//            break;
//            //OR
//        case "1":
//            for (var i in foto) {
//                if (foto[i].id_fondo != $("#cbFondo").val())
//                    foto[i].visibile = false;
//            }
//            break;
//    }
//    $("#filtro_Fondo").append($("#cbFondo option:selected").text() + ' ; ');
//    Storage();
//    showContatore();
//    Tabella();
//}
//function filtraSerie() {
//    switch ($("#Tipo_ricerca").val()) {
//        //AND
//        case "0":
//            for (var i in foto) {
//                if (foto[i].visibile) {
//                    if (foto[i].id_serie != $("#cbSerie").val())
//                        foto[i].visibile = false;
//                }
//            }
//            break;
//            //OR
//        case "1":
//            for (var i in foto) {
//                if (foto[i].id_serie != $("#cbSerie").val())
//                    foto[i].visibile = false;
//            }
//            break;
//    }
//    $("#filtro_Serie").append($("#cbSerie option:selected").text() + ' ; ');
//    Storage();
//    showContatore();
//    Tabella();
//}
function filtro_Generico(campo, id_txt, id_filtro) {
    var combo = id_txt.indexOf("cb")===0;
    
    //combo = id_txt.charAt(0) == 'c' && id_txt.charAt(1) == 'b'; 
    if (combo)
        $("#" + id_filtro).append($("#" + id_txt + " option:selected").val() + ' ; ');
    else
        $("#" + id_filtro).append($("#" + id_txt).val() + ' ; ');

    switch ($("#Tipo_ricerca").val()) {
        //AND
        case "0":
            for (var k in foto) {
                if (foto[k].visibile) {
                    //console.log(campo+" "+typeof foto[k][campo]);
                    if (!foto[k][campo] || String(foto[k][campo]) !== $("#" + id_txt).val())
                        foto[k].visibile = false;
                }
            }
            break;
            //OR
        case "1":

            res = $("#" + id_filtro).text().split(" ; ");
            //console.log("res" + res);

            for (var i in foto) {
                for (var j = 0; j < res.length - 1; j++) {
                    trovato = foto[k][campo] && String(foto[k][campo]) === res[j];
                    if (trovato) {
                        foto[i].visibile = true;
                        break;
                    }
                    if (!trovato)
                        foto[i].visibile = false;
                }
            }


    }
    Storage(foto);
    showContatore();
    Tabella();
}
function Tabella() {
    var str = '';
    str += "<table>";
    //str += "<tr><th>ID Album</th><th>Soggetto/Titolo</th><th>Periodo</th><th>Foto</th></tr>";
    str += '<tr>';
    for (var i in foto)
    {
        if (foto[i].visibile)
        {
            var path = makeImgPath(foto[i].file_path);
            var ico64 = makeIco64Path(foto[i].file_path);

            str += '<td>';
            //str += '<td class="txtCenter">' + foto[i].id_album + '</td>';
            //str += '<td>' + foto[i].soggetto.trim() + '<br><i>' + foto[i].soggetto_titolo.trim() + '</i></td>';
            //dMin = new Date(foto[i].data_da);
            //dMax = new Date(foto[i].data_a);
            //sMin = dMin.toLocaleDateString();
            //sMax = dMax.toLocaleDateString();
            //if (sMin === sMax)
            //{
            //    sdata = sMin;
            //}
            //else
            //{
            //    sdata = sMin + " -- " + sMax;
            //}
            //str += '<td class="txtCenter">' + sdata + '</td>';
            if (window.location.href.indexOf("/priv/") > 0)
            {
                str += '<td class="txtCenter"><a href="/priv/DettagliPrivati.html?ID=' + foto[i].codice + '" target="_blank" ><img src="' + ico64 + '" ></a></td>';
            }
            else
            {
                str += '<td class="txtCenter"><a href="../Dettagli.html?ID=' + foto[i].codice + '" target="_blank" ><img src="' + ico64 + '" ></a></td>';
            }
                
            str += '</td>';
        }

    }
    str += '</tr>';
    str += "<table>";

    $("#bookmark").html(str);
    $("#bookmark").show();
}


function Filtro_Publ() {
    //CAMPI RICERCA PUBBLICI:
    // V= fatto O=da fare
    //V intestazione
    //V fondo(CB)
    //V soggetto
    //V soggetto_titolo
    //V serie(CB)
    //V data_da - data_a

    $.get(MaDe_Config.server_REST + "/Album", function (data) {
        var album = [];//vettore
        for (var i = 0; i < data.length; i++) {
            album.push(data[i].id_album);
        }
        $.get(MaDe_Config.server_REST + "/Serie", function (data) {

            var serie = [];//vettore
            for (var i = 0; i < data.length; i++) {
                serie.push(data[i].serie_titolo);
            }

            $.get(MaDe_Config.server_REST + "/Fondi", function (data) {

                var fondo = [];//vettore
                for (var i = 0; i < data.length; i++) {
                    fondo.push(data[i].fondo);
                }
                var s = '<table border="1">';
                s += '<tr>';
                s += '             <td>Soggetto/Titolo/Intestazione contiene: </td>';
                s += '            <td><input id="txtSoggetto" type="text" /></td>';
                s += '           <td><input type="button" id="btn_soggetto" value="Aggiungi Filtro" /></td>';
                s += '           <td id="filtro_txtSoggetto"></td>';
                s += '        </tr>';
                s += '        <tr>';
                s += '            <td>Album Numero:</td>';
                s += '            <td>';
                s += '                <select id="cbAlbum">';
                album.forEach(function (item, index) {
                    s += '<option value="' + item + '">Album ' + item + '</option>';
                });
                s += '                </select>';
                s += '           </td>';
                s += '           <td><input type="button" id="btn_collocazione" value="Aggiungi Filtro" /></td>';
                s += '            <td id="filtro_cbAlbum"></td>';
                s += '        </tr>';
                s += '        <tr>';
                s += '            <td>Periodo</td>';
                s += '             <td><input id="dMin" type="date" /> -- <input id="dMax" type="date" /></td>';
                s += '            <td><input type="button" id="btn_periodo" value="Aggiungi Filtro" /></td>';
                s += '            <td id="filtro_Periodo"></td>';
                s += '        </tr>        ';
                //FONDO
                s += '<tr>';
                s += '             <td>Fondo: </td>';
                s += '            <td>';
                s += '                <select id="cbFondo">';
                fondo.forEach(function (item, index) {
                    //s += '<option value="' + index + '">Fondo ' + item + '</option>'
                    s += '<option value="' + item + '">Fondo ' + item + '</option>';
                });
                s += '                </select>';
                s += '</td>';
                s += '           <td><input type="button" id="btn_fondo" value="Aggiungi Filtro" /></td>';
                s += '           <td id="filtro_Fondo"></td>';
                s += '        </tr>';
                //SERIE
                s += '<tr>';
                s += '             <td>Serie: </td>';
                s += '            <td>';
                s += '                <select id="cbSerie">';
                serie.forEach(function (item, index) {
                    s += '<option value="' + item + '">Serie ' + item + '</option>';
                });
                s += '                </select>';
                s += '</td>';
                s += '           <td><input type="button" id="btn_serie" value="Aggiungi Filtro" /></td>';
                s += '           <td id="filtro_Serie"></td>';
                s += '        </tr>';
                s += '    </table>';
                $("#filtro").html(s);

                $("#btn_collocazione").click(function () { filtraAlbum("id_album", "cbAlbum", "filtro_cbAlbum"); });
                $("#btn_fondo").click(function () { filtro_Generico("fondo_provenienza", "cbFondo", "filtro_Fondo"); });
                $("#btn_serie").click(function () { filtro_Generico("serie_titolo", "cbSerie", "filtro_Serie"); });
                $("#btn_periodo").click(function () { filtraPeriodo("dMin", "dMax", "filtro_Periodo"); });
                $("#btn_soggetto").click(function () { filtraSoggetto(); });
            });
        });
    });
}

function Filtro_Priv() {

    $.get(MaDe_Config.server_REST + "/Album", function (data) {
        var album = [];//vettore
        for (var i = 0; i < data.length; i++) {
            album.push(data[i].id_album);
        }
        $.get(MaDe_Config.server_REST + "/Serie", function (data) {

            var serie = [];//vettore
            for (var i = 0; i < data.length; i++) {
                serie.push(data[i].serie_titolo);
            }

            $.get(MaDe_Config.server_REST + "/Fondi", function (data) {

                var fondo = [];//vettore
                for (var i = 0; i < data.length; i++) {
                    fondo.push(data[i].fondo);
                }

                var s = '<table border="1">';
                //codice
                s += '        <tr>';
                s += '            <td>Codice</td>';
                s += '             <td><input id="txtCodice" type="text" /></td>';
                s += '            <td><input type="button" id="btn_Codice" value="Aggiungi Filtro" /></td>';
                s += '            <td id="filtro_Codice"></td>';
                s += '        </tr>';
                s += '<tr>';
                //tipo media
                s += '        <tr>';
                s += '            <td>Tipo di media</td>';
                s += '             <td><input id="txtTipoMedia" type="text" /></td>';
                s += '            <td><input type="button" id="btn_TipoMedia" value="Aggiungi Filtro" /></td>';
                s += '            <td id="filtro_TipoMedia"></td>';
                s += '        </tr>';
                //tipo scheda
                s += '        <tr>';
                s += '            <td>Tipo di Scheda</td>';
                s += '             <td><input id="txtTipoScheda" type="text" /></td>';
                s += '            <td><input type="button" id="btn_TipoScheda" value="Aggiungi Filtro" /></td>';
                s += '            <td id="filtro_TipoScheda"></td>';
                s += '        </tr>';
                //archivio
                s += '        <tr>';
                s += '            <td>Archivio Fotografico</td>';
                s += '             <td><input id="txtArchivio" type="text" /></td>';
                s += '            <td><input type="button" id="btn_archivio" value="Aggiungi Filtro" /></td>';
                s += '            <td id="filtro_Archivio"></td>';
                //fondo
                s += '<tr>';
                s += '             <td>Fondo: </td>';
                s += '            <td>';
                s += '                <select id="cbFondo">';
                fondo.forEach(function (item, index) {
                    // s += '<option value="' + index + '">Fondo ' + item + '</option>'
                    s += '<option value="' + item + '">Fondo ' + item + '</option>';

                });
                s += '                </select>';
                s += '</td>';
                s += '           <td><input type="button" id="btn_fondo" value="Aggiungi Filtro" /></td>';
                s += '           <td id="filtro_Fondo"></td>';
                s += '        </tr>';
                //collocazione
                s += '        <tr>';
                s += '            <td>Album Numero:</td>';
                s += '            <td>';
                s += '                <select id="cbAlbum">';
                album.forEach(function (item, index) {
                    s += '<option value="' + item + '">Album ' + item + '</option>';
                });
                s += '                </select>';
                s += '           </td>';
                s += '           <td><input type="button" id="btn_collocazione" value="Aggiungi Filtro" /></td>';
                s += '            <td id="filtro_cbAlbum"></td>';
                s += '        </tr>';
                //numero Inventario
                s += '        <tr>';
                s += '            <td>Num Inventario</td>';
                s += '             <td><input id="txtNumInventario" type="text" /></td>';
                s += '            <td><input type="button" id="btn_num_inventario" value="Aggiungi Filtro" /></td>';
                s += '            <td id="filtro_NumInventario"></td>';
                s += '        </tr>';
                //Soggetto/Titolo/Intestazione
                s += '        <tr>';
                s += '             <td>Soggetto/Titolo/Intestazione contiene: </td>';
                s += '            <td><input id="txtSoggetto" type="text" /></td>';
                s += '           <td><input type="button" id="btn_soggetto" value="Aggiungi Filtro" /></td>';
                s += '           <td id="filtro_txtSoggetto"></td>';
                s += '        </tr>';
                //soggetto descrizione
                s += '        <tr>';
                s += '            <td>Descrizione Oggetto</td>';
                s += '             <td>';
                s += '                <select id="cbSoggDescrizione">';
                s += '<option value="FOTOGRAFIA">FOTOGRAFIA</option>';
                s += '                </select>';
                s += '           </td>';
                s += '            <td><input type="button" id="btn_soggetto_descrizione" value="Aggiungi Filtro" /></td>';
                s += '            <td id="filtro_SoggDescrizione"></td>';
                s += '        </tr>';
                //Sogg Specifiche
                s += '        <tr>';
                s += '            <td>Specifiche Oggetto</td>';
                s += '             <td>';
                s += '                <select id="cbSoggSpecifiche">';
                s += '                  <option value="FOTOGRAFIA B.N.">FOTOGRAFIA B.N.</option>';
                s += '                </select>';
                s += '           </td>';
                s += '            <td><input type="button" id="btn_soggetto_specifiche" value="Aggiungi Filtro" /></td>';
                s += '            <td id="filtro_SoggSpecifiche"></td>';
                s += '        </tr>';
                //num negativo
                s += '        <tr>';
                s += '            <td>Numero di Negativo</td>';
                s += '             <td><input id="txtNumNegativo" type="text" /></td>';
                s += '            <td><input type="button" id="btn_num_negativo" value="Aggiungi Filtro" /></td>';
                s += '            <td id="filtro_NumNegativo"></td>';
                s += '        </tr>';
                //altri formati
                s += '        <tr>';
                s += '            <td>Altri Formati</td>';
                s += '             <td><input id="txtAltriFormati" type="text" /></td>';
                s += '            <td><input type="button" id="btn_altri_formati" value="Aggiungi Filtro" /></td>';
                s += '            <td id="filtro_AltriFormati"></td>';
                s += '        </tr>';
                //serie
                s += '<tr>';
                s += '             <td>Serie: </td>';
                s += '            <td>';
                s += '                <select id="cbSerie">';
                serie.forEach(function (item, index) {
                    s += '<option value="' + item + '">Serie ' + item + '</option>';
                });
                s += '                </select>';
                s += '</td>';
                s += '           <td><input type="button" id="btn_serie" value="Aggiungi Filtro" /></td>';
                s += '           <td id="filtro_Serie"></td>';
                s += '        </tr>';
                //serie titolo (stessa cosa di serie)
                //s += '        <tr>'
                //s += '            <td>Titolo della serie</td>'
                //s += '             <td><input id="txtSerieTitolo" type="text" /></td>'
                //s += '            <td><input type="button" id="btn_serie_titolo" value="Aggiungi Filtro" /></td>'
                //s += '            <td id="filtro_SerieTitolo"></td>'
                //s += '        </tr>'
                //serie num ord
                s += '        <tr>';
                s += '            <td>Nr.ordine nella serie</td>';
                s += '             <td><input id="txtSerieNumOrd" type="text" /></td>';
                s += '            <td><input type="button" id="btn_serie_num_ord" value="Aggiungi Filtro" /></td>';
                s += '            <td id="filtro_SerieNumOrd"></td>';
                s += '        </tr>';
                //condizione
                s += '        <tr>';
                s += '            <td>Condizione</td>';
                s += '             <td>';
                s += '                <select id="cbCondizione">';
                s += '                  <option value="BUONO">BUONO</option>';
                s += '                  <option value="DISCRETO">DISCRETO</option>';
                s += '                </select>';
                s += '           </td>';
                s += '            <td><input type="button" id="btn_condizione" value="Aggiungi Filtro" /></td>';
                s += '            <td id="filtro_Condizione"></td>';
                s += '        </tr>';

                //periodo
                s += '        <tr>';
                s += '            <td>Periodo</td>';
                s += '             <td><input id="dMin" type="date" /> -- <input id="dMax" type="date" /></td>';
                s += '            <td><input type="button" id="btn_periodo" value="Aggiungi Filtro" /></td>';
                s += '            <td id="filtro_Periodo"></td>';
                s += '        </tr>        ';

                ////Data di esecuzione-Da
                //s += '        <tr>';
                //s += '            <td>Data di esecuzione Da--A</td>';
                //s += '             <td><input id="txtDataEsecDa" type="date" />  -- <input id="txtDataEsecA" type="date" /></td>';
                //s += '            <td><input type="button" id="btn_data_esecuz_da" value="Aggiungi Filtro" /></td>';
                //s += '            <td id="filtro_DataEsecDa"></td>';
                //s += '        </tr>';
                //Validità Data esec.-Da
                s += '        <tr>';
                s += '            <td>Validità Data esec. Da</td>';
                s += '             <td>';
                s += '                <select id="cbDataEsecDaValid">';
                s += '                  <option value="PRESUNTA">PRESUNTA</option>';
                s += '                  <option value="CERTO">CERTO</option>';
                s += '                </select>';
                s += '           </td>';
                s += '            <td><input type="button" id="btn_data_esecuz_da_valid" value="Aggiungi Filtro" /></td>';
                s += '            <td id="filtro_DataEsecDaValid"></td>';
                s += '        </tr>';
                //data esec a
                //s += '        <tr>'
                //s += '            <td>Data Esecuzione a</td>'
                //s += '             <td><input id="txtDataEsecA" type="date" /></td>'
                //s += '            <td><input type="button" id="btn_data_esecuz_a" value="Aggiungi Filtro" /></td>'
                //s += '            <td id="filtro_DataEsecA"></td>'
                //s += '        </tr>'
                //data esec a valida
                s += '        <tr>';
                s += '            <td>Data Esecuzione Valida a</td>';
                s += '          <td>';
                s += '                <select id="cbDataEsecAValid">';
                s += '                  <option value="PRESUNTA">PRESUNTA</option>';
                s += '                  <option value="CERTO">CERTO</option>';
                s += '                </select>';
                s += '           </td>';
                s += '            <td><input type="button" id="btn_data_esecuz_a_valid" value="Aggiungi Filtro"  /></td>';
                s += '            <td id="filtro_DataEsecAValid"></td>';
                s += '        </tr>';
                //osservazioni
                s += '        <tr>';
                s += '            <td>Osservazioni</td>';
                s += '             <td><input id="txtOsservazioni" type="text" /></td>';
                s += '            <td><input type="button" id="btn_osservazioni" value="Aggiungi Filtro"  /></td>';
                s += '            <td id="filtro_Osservazioni"></td>';
                s += '        </tr>';
                //fondo provenienza (stessa cosa di fondo)
                //s += '        <tr>'
                //s += '            <td>Fondo di provenienza</td>'
                //s += '             <td><input id="txtFondoProvenienza" type="text" /></td>'
                //s += '            <td><input type="button" id="btn_fondo_provenienza" value="Aggiungi Filtro" /></td>'
                //s += '            <td id="filtro_FondoProvenienza"></td>'
                //s += '        </tr>'
                //fondo provenienza luogo
                s += '        <tr>';
                s += '            <td>Luogo Fondo di provenienza</td>';
                s += '             <td><input id="txtFondoProvenienzaLuogo" type="text" /></td>';
                s += '            <td><input type="button" id="btn_fondo_provenienza_luogo" value="Aggiungi Filtro"  /></td>';
                s += '            <td id="filtro_FondoProvenienzaLuogo"></td>';
                s += '        </tr>';
                ////acquisizione data
                //s += '        <tr>';
                //s += '            <td>Data di acquisizione</td>';
                //s += '             <td><input id="txtAcquisizioneData" type="date" /></td>';
                //s += '            <td><input type="button" id="btn_acquisizione_data" value="Aggiungi Filtro" /></td>';
                //s += '            <td id="filtro_AcquisizioneData"></td>';
                //s += '        </tr>';
                //acquisizione data valida
                s += '        <tr>';
                s += '            <td>Validità Data di acquisizione</td>';
                s += '             <td>';
                s += '                <select id="cbAcquisizioneDataValida">';
                s += '                  <option value="CERTO">CERTO</option>';
                s += '                </select>';
                s += '           </td>';
                s += '            <td><input type="button" id="btn_acquisizione_data_valid" value="Aggiungi Filtro" /></td>';
                s += '            <td id="filtro_AcquisizioneDataValida"></td>';
                s += '        </tr>';
                //acquisizione tipo
                s += '        <tr>';
                s += '            <td>Tipo di acquisizione</td>';
                s += '             <td>';
                s += '                <select id="cbAcquisizioneTipo">';
                s += '                  <option value="DONAZIONE">DONAZIONE</option>';
                s += '                  <option value="CONVENZIONE">CONVENZIONE</option>';
                s += '                  <option value="ACQUISTO">ACQUISTO</option>';
                s += '                </select>';
                s += '           </td>';
                s += '            <td><input type="button" id="btn_acquisizione_tipo" value="Aggiungi Filtro" /></td>';
                s += '            <td id="filtro_AcquisizioneTipo"></td>';
                s += '        </tr>';
                //copyright
                s += '        <tr>';
                s += '            <td>Copyright</td>';
                s += '             <td>';
                s += '                <select id="cbCopyright">';
                s += '                </select>';
                s += '           </td>';
                s += '            <td><input type="button" id="btn_copyright" value="Aggiungi Filtro" /></td>';
                s += '            <td id="filtro_Copyright"></td>';
                s += '        </tr>';
                //inventari
                s += '        <tr>';
                s += '            <td>Inventari</td>';
                s += '            <td><input id="txtInventari" type="text" /></td>';
                s += '            <td><input type="button" id="btn_inventari" value="Aggiungi Filtro" /></td>';
                s += '            <td id="filtro_Inventari"></td>';
                s += '        </tr>';
                //committenza
                s += '        <tr>';
                s += '            <td>Committenza</td>';
                s += '             <td><input id="txtCommittenza" type="text" /></td>';
                s += '            <td><input type="button" id="btn_committenza" value="Aggiungi Filtro" /></td>';
                s += '            <td id="filtro_Committenza"></td>';
                s += '        </tr>';
                //tipo supporto
                s += '        <tr>';
                s += '            <td>Tipo di Supporto</td>';
                s += '            <td><input id="txtTipoSupporto" type="text" /></td>';
                s += '            <td><input type="button" id="btn_tipo_supporto" value="Aggiungi Filtro" /></td>';
                s += '            <td id="filtro_TipoSupporto"></td>';
                s += '        </tr>';
                //identificativo volume
                s += '        <tr>';
                s += '            <td>Identificativo Volume</td>';
                s += '             <td><input id="txtIdenVolume" type="text" /></td>';
                s += '            <td><input type="button" id="btn_identificativo_volume" value="Aggiungi Filtro" /></td>';
                s += '            <td id="filtro_IdenVolume"></td>';
                s += '        </tr>';
                //annotazioni
                s += '        <tr>';
                s += '            <td>Annotazioni</td>';
                s += '             <td><input id="txtAnnotazioni" type="text" /></td>';
                s += '            <td><input type="button" id="btn_annotazioni" value="Aggiungi Filtro"/></td>';
                s += '            <td id="filtro_Annotazioni"></td>';
                s += '        </tr>';

                s += '    </table>';
                $("#filtro").html(s);

                //campo, id_txt, id_filtro
                $("#btn_Codice").click(function () { filtro_Generico("codice", "txtCodice", "filtro_Codice"); });
                $("#btn_TipoMedia").click(function () { filtro_Generico("tipo_media", "txtTipoMedia", "filtro_TipoMedia"); });
                $("#btn_TipoScheda").click(function () { filtro_Generico("tiposcheda", "txtTipoScheda", "filtro_TipoScheda"); });
                $("#btn_archivio").click(function () { filtro_Generico("archivio", "txtArchivio", "filtro_Archivio"); });
                $("#btn_fondo").click(function () { filtro_Generico("fondo_provenienza", "cbFondo", "filtro_Fondo"); });
                $("#btn_collocazione").click(function () { filtraAlbum("id_album", "cbAlbum", "filtro_cbAlbum"); });
                $("#btn_num_inventario").click(function () { filtro_Generico("num_inventario", "txtNumInventario", "filtro_NumInventario"); });
                //soggetto/titolo/intestazione
                $("#btn_soggetto").click(function () { filtraSoggetto(); });
                $("#btn_soggetto_descrizione").click(function () { filtro_Generico("soggetto_descrizione", "cbSoggDescrizione", "filtro_SoggDescrizione"); });
                $("#btn_soggetto_specifiche").click(function () { filtro_Generico("soggetto_specifiche", "cbSoggSpecifiche", "filtro_SoggSpecifiche"); });
                $("#btn_num_negativo").click(function () { filtro_Generico("num_negativo", "txtNumNegativo", "filtro_NumNegativo"); });
                $("#btn_altri_formati").click(function () { filtro_Generico("altri_formati", "txtAltriFormati", "filtro_AltriFormati"); });
                $("#btn_serie").click(function () { filtro_Generico("serie_titolo", "cbSerie", "filtro_Serie"); });
                //da modificare
                //$("#btn_serie_titolo").click(function () { filtro_Generico("serie_titolo", "cbSerieTitolo", "filtro_SerieTitolo"); })
                $("#btn_serie_num_ord").click(function () { filtro_Generico("serie_num_ord", "txtSerieNumOrd", "filtro_SerieNumOrd"); });
                //DA FARE CB
                $("#btn_condizione").click(function () { filtro_Generico("condizione", "cbCondizione", "filtro_Condizione"); });
                $("#btn_periodo").click(function () { filtraPeriodo("dMin", "dMax", "filtro_Periodo", "data_da", "data_a"); });

                //DA FARE COME PERIODO
                $("#btn_data_esecuz_da").click(function () { filtraPeriodo("txtDataEsecDa", "txtDataEsecA", "filtro_DataEsecDa", "data_esecuz_da", "data_esecuz_a"); });
                //DA FARE CB
                $("#btn_data_esecuz_da_valid").click(function () { filtro_Generico("data_esecuz_da_valid", "cbDataEsecDaValid", "filtro_DataEsecDaValid"); });
                //DA FARE COME PERIODO
                //UNITA CON data_esecuz_da
                //$("#btn_data_esecuz_a").click(function () { filtraPeriodo("txtDataEsecuz_a", "txtDataEsecA", "filtro_DataEsecA", "data_esecuz_a"); })
                //$("#btn_data_esecuz_a_valid").click(function () { filtro_Generico("data_esecuz_a_valid", "txtDataEsecAValid", "filtro_DataEsecAValid"); });
                $("#btn_osservazioni").click(function () { filtro_Generico("osservazioni", "txtOsservazioni", "filtro_Osservazioni"); });
                //$("#btn_fondo_provenienza").click(function () { filtro_Generico("fondo_provenienza", "cbFondoProvenienza", "filtro_FondoProvenienza"); })
                $("#btn_fondo_provenienza_luogo").click(function () { filtro_Generico("fondo_provenienza_luogo", "txtFondoProvenienzaLuogo", "filtro_FondoProvenienzaLuogo"); });
                //$("#btn_acquisizione_data").click(function () { filtro_Generico("acquisizione_data", "txtAcquisizioneData", "filtro_AcquisizioneData"); });
                $("#btn_acquisizione_data_valid").click(function () { filtro_Generico("acquisizione_data_valid", "cbAcquisizioneDataValida", "filtro_AcquisizioneDataValida"); });
                $("#btn_acquisizione_tipo").click(function () { filtro_Generico("acquisizione_tipo", "cbAcquisizioneTipo", "filtro_AcquisizioneTipo"); });
                $("#btn_copyright").click(function () { filtro_Generico("copyright", "cbCopyright", "filtro_Copyright"); });
                $("#btn_inventari").click(function () { filtro_Generico("inventari", "txtInventari", "filtro_Inventari"); });
                $("#btn_committenza").click(function () { filtro_Generico("committenza", "txtCommittenza", "filtro_Committenza"); });
                $("#btn_tipo_supporto").click(function () { filtro_Generico("tipo_supporto", "txtTipoSupporto", "filtro_TipoSupporto"); });
                $("#btn_identificativo_volume").click(function () { filtro_Generico("identificativo_volume", "txtIdenVolume", "filtro_IdenVolume"); });
                $("#btn_annotazioni").click(function () { filtro_Generico("annotazioni", "txtAnnotazioni", "filtro_Annotazioni"); });
            });
        });
    });
}


//function creaFiltro(refresh) {

//    switch ($("#Tipo_campi").val()) {
//        //Campi privati
//        case "0":
//            if (refresh == true)
//                window.location.href = "/priv/RicercaPrivata.html";
//            Filtro_Priv();
//            break;
//            //Campi pubblici
//        case "1":
//            if (refresh == true)
//                window.location.href = "../ricerca.html";
//            Filtro_Publ();
//            break;

//        default:
//            Filtro_Publ();
//    }
//}
