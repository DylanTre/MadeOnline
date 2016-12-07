// **************************************************
// File con codice js utilizzato in più pagine HTML
// **************************************************

function makeImgPath(file_path) {
    return MaDe_Config.server_HOME + MaDe_Config.img + file_path;
}

function makeIco64Path(file_path) {
    return MaDe_Config.server_HOME + MaDe_Config.img + '/ico64' + file_path;
}

function getHelp() {
    window.open(MaDe_Config.server_REST)
}
