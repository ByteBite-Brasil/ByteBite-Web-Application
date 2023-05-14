var database = require("../database/config");

function getMaquinas(idEmpresa) {

    console.log("sai do fetch")

    instrucaoSql = `select * from maquina where fk_empresa_maquina = ${idEmpresa};`


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidas(idMaquina, limite_linhas) {
    
        instrucaoSql = `SELECT top ${limite_linhas} lc.idLog, lc.data_, lc.hora, lc.medicao, c.total, c.unidadeMedida, tc.nome, tl.trataDe
        FROM log_captura lc
        INNER JOIN configuracao cfg ON lc.fk_configuracao = cfg.idConfiguracao
        INNER JOIN componente c ON cfg.fk_componente = c.idComponente
        INNER JOIN tipo_componente tc ON c.fk_tipo_componente = tc.idTipoComponente
        INNER JOIN tipo_log tl ON lc.fk_tipo_log = tl.idTipoLog
        WHERE cfg.fk_maquina = ${idMaquina}
        order by lc.idLog desc`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idMaquina) {
    
        instrucaoSql = `SELECT top 1 lc.idLog, lc.data_, lc.hora, lc.medicao, c.total, c.unidadeMedida, tc.nome, tl.trataDe
        FROM log_captura lc
        INNER JOIN configuracao cfg ON lc.fk_configuracao = cfg.idConfiguracao
        INNER JOIN componente c ON cfg.fk_componente = c.idComponente
        INNER JOIN tipo_componente tc ON c.fk_tipo_componente = tc.idTipoComponente
        INNER JOIN tipo_log tl ON lc.fk_tipo_log = tl.idTipoLog
        WHERE cfg.fk_maquina = ${idMaquina}
        order by lc.idLog desc`


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    getMaquinas,
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
