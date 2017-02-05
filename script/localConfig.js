// ******************************
// File di configurazione globale
// ******************************

// server_REST: Web Service REST+mySql
// server_HOME: Server Web
//         img: Path alle cartelle immagini (risoluzione x web)
//       ico64: Path alle cartelle icone (larghezza=64px)
//      ico128: Path alle cartelle icone (larghezza=128px)

var MaDe_Config =
	{
        "server_REST": "http://daas.marconirovereto.it:8080",
        "server_HOME": "http://daas.marconirovereto.it",
        "img": "/img/album",
        "ico64": "/img/album/ico64",
        "ico128": "/img/album/ico128",
        "guid": "094C4271-7FB0-4070-985E-26EC39EBACF5"
	};

function CreaMenu()
{
    var s = "";
    s+= "<nav>";
    s+= "   <ul>";
    s+= "   <li>";
    s += '<a id="index" href="../index.html">Home</a>';
    s += '</li>';
    s += '<li>';
    s += '<a id="ricerca"href="../ricerca.html">Ricerca</a>';
    s += '</li>';
    s += '<li>';
    s += '<a id="TestImg"href="../TestImg.html">Galleria</a>';
    s += '</li>';
    s += '<li>';
    s += '<a id="Info"href="../Info.html"> Informazioni</a>';
    s += '</li>';
    s += '<li>';
    s += '<a id="RicercaPrivata" href="../priv/RicercaPrivata.html">Area Riservata</a>';
    s += '</li>';
    s+=   "</ul>";
    s += "</nav>";
    $("#menu").html(s);
}

//s += '<a href="index.html"<div id="menu" />Home</a>';
//s += '</li>';
//s += '<a href="ricerca.html" class="active"<div id="menu" />Ricerca</a>';
//s += '</li>';
//s += '<li>';
//s += '<a href="TestImg.html"<div id="menu" />Galleria</a>';
//s += '</li>';
//s += '<li>';
//s += '<a href="Info.html" <div id="menu" />Info</a>';
//s += '</li>';
//s += '<li>';
//s += '<a href="priv/RicercaPrivata.html"<div id="menu" />Area Riservata</a>';
//s += '</li>';