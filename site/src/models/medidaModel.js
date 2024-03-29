var database = require("../database/config");

function getMaquinas(idEmpresa) {

    console.log("sai do fetch")

    instrucaoSql = `select * from maquina where fk_empresa_maquina = ${idEmpresa};`


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getMaquinasAlertas(idEmpresa) {

    instrucaoSql = `SELECT m.idMaquina, m.nome AS nomeMaquina, COUNT(a.idAlerta) AS quantidadeAlertas
    FROM maquina m
    INNER JOIN configuracao cfg ON m.idMaquina = cfg.fk_maquina
    INNER JOIN log_captura lc ON cfg.idConfiguracao = lc.fk_configuracao
    INNER JOIN alerta a ON lc.idLog = a.fk_log_captura
    WHERE m.fk_empresa_maquina = ${idEmpresa}
    GROUP BY m.idMaquina, m.nome
    HAVING COUNT(a.idAlerta) > 0
    ORDER BY m.idMaquina;`


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidas(idMaquina, idComponente, idTipo, limite_linhas) {

    if (idTipo == 2) {

        instrucaoSql = `SELECT top ${limite_linhas} lc.idLog, lc.data_, lc.hora, lc.medicao, c.total, c.unidadeMedida, tc.nome, tl.trataDe
        FROM log_captura lc
        INNER JOIN configuracao cfg ON lc.fk_configuracao = cfg.idConfiguracao
        INNER JOIN componente c ON cfg.fk_componente = c.idComponente
        INNER JOIN tipo_componente tc ON c.fk_tipo_componente = tc.idTipoComponente
        INNER JOIN tipo_log tl ON lc.fk_tipo_log = tl.idTipoLog
        WHERE cfg.fk_maquina = ${idMaquina} AND c.fk_tipo_componente = ${idComponente} AND lc.fk_tipo_log = ${idTipo}
        ORDER BY lc.idLog DESC;`

    } else {

        instrucaoSql = `SELECT top ${limite_linhas} lc.idLog, lc.data_, lc.hora, lc.medicao, c.total, c.unidadeMedida, tc.nome, tl.trataDe, ROUND((lc.medicao / c.total) * 100, 1) AS porcentagem
        FROM log_captura lc
        INNER JOIN configuracao cfg ON lc.fk_configuracao = cfg.idConfiguracao
        INNER JOIN componente c ON cfg.fk_componente = c.idComponente
        INNER JOIN tipo_componente tc ON c.fk_tipo_componente = tc.idTipoComponente
        INNER JOIN tipo_log tl ON lc.fk_tipo_log = tl.idTipoLog
        WHERE cfg.fk_maquina = ${idMaquina} AND c.fk_tipo_componente = ${idComponente} AND lc.fk_tipo_log = ${idTipo}
        ORDER BY lc.idLog DESC`

    }

    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimoAlerta(idMaquina) {

    console.log('Passei pelo models')

    instrucaoSql = `SELECT top 1 a.idAlerta, a.fk_log_captura, lc.medicao AS valor_log_captura, c.nome AS criticidade, d.descricaoAlerta AS descricao, m.nome AS maquina, j.quantidade AS quantidade_janelas, tl.idTipoLog AS tipo_log
    FROM alerta a
    INNER JOIN log_captura lc ON a.fk_log_captura = lc.idLog
    INNER JOIN criticidade c ON a.fk_criticidade = c.idCriticidade
    INNER JOIN descricao d ON a.fk_descricao = d.idDescricao
    INNER JOIN configuracao cfg ON lc.fk_configuracao = cfg.idConfiguracao
    INNER JOIN maquina m ON cfg.fk_maquina = m.idMaquina
    INNER JOIN janelas j ON a.fk_janelas = j.idJanelas
    INNER JOIN tipo_log tl ON lc.fk_tipo_log = tl.idTipoLog
    WHERE m.idMaquina = ${idMaquina} order by a.idAlerta desc;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTodosOsAlertas(idMaquina) {

    console.log('Passei pelo models')

    instrucaoSql = `SELECT a.idAlerta, a.fk_log_captura, lc.medicao AS valor_log_captura, lc.data_, lc.hora, c.nome AS criticidade, d.descricaoAlerta AS descricao, m.nome AS maquina, j.quantidade AS quantidade_janelas, tl.idTipoLog AS tipo_log
    FROM alerta a
    INNER JOIN log_captura lc ON a.fk_log_captura = lc.idLog
    INNER JOIN criticidade c ON a.fk_criticidade = c.idCriticidade
    INNER JOIN descricao d ON a.fk_descricao = d.idDescricao
    INNER JOIN configuracao cfg ON lc.fk_configuracao = cfg.idConfiguracao
    INNER JOIN maquina m ON cfg.fk_maquina = m.idMaquina
    INNER JOIN janelas j ON a.fk_janelas = j.idJanelas
    INNER JOIN tipo_log tl ON lc.fk_tipo_log = tl.idTipoLog
    WHERE m.idMaquina = ${idMaquina} order by a.idAlerta desc;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarNumeroTotaldeAlertas(idMaquina) {

    console.log('Passei pelo models')

    instrucaoSql = `SELECT COUNT(a.idAlerta) AS total_alertas
    FROM alerta a
    INNER JOIN log_captura lc ON a.fk_log_captura = lc.idLog
    INNER JOIN criticidade c ON a.fk_criticidade = c.idCriticidade
    INNER JOIN descricao d ON a.fk_descricao = d.idDescricao
    INNER JOIN configuracao cfg ON lc.fk_configuracao = cfg.idConfiguracao
    INNER JOIN maquina m ON cfg.fk_maquina = m.idMaquina
    INNER JOIN janelas j ON a.fk_janelas = j.idJanelas
    INNER JOIN tipo_log tl ON lc.fk_tipo_log = tl.idTipoLog
    WHERE m.idMaquina = ${idMaquina};
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTopMedidas(idMaquina, idComponente, idTipo) {

    instrucaoSql = `SELECT MAX(lc.medicao) AS maior_medicao
    FROM log_captura lc
    INNER JOIN configuracao cfg ON lc.fk_configuracao = cfg.idConfiguracao
    INNER JOIN componente c ON cfg.fk_componente = c.idComponente
    INNER JOIN tipo_componente tc ON c.fk_tipo_componente = tc.idTipoComponente
    INNER JOIN tipo_log tl ON lc.fk_tipo_log = tl.idTipoLog
    WHERE cfg.fk_maquina = ${idMaquina} AND c.fk_tipo_componente = ${idComponente} AND lc.fk_tipo_log = ${idTipo}`

    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idMaquina, idComponente, idTipo) {

    if (idTipo == 2) {

        instrucaoSql = `SELECT top 1 lc.idLog, lc.data_, lc.hora, lc.medicao, c.total, c.unidadeMedida, tc.nome, tl.trataDe
        FROM log_captura lc
        INNER JOIN configuracao cfg ON lc.fk_configuracao = cfg.idConfiguracao
        INNER JOIN componente c ON cfg.fk_componente = c.idComponente
        INNER JOIN tipo_componente tc ON c.fk_tipo_componente = tc.idTipoComponente
        INNER JOIN tipo_log tl ON lc.fk_tipo_log = tl.idTipoLog
        WHERE cfg.fk_maquina = ${idMaquina} AND c.fk_tipo_componente = ${idComponente} AND lc.fk_tipo_log = ${idTipo}
        ORDER BY lc.idLog DESC;`

    } else {

        instrucaoSql = `SELECT top 1 lc.idLog, lc.data_, lc.hora, lc.medicao, c.total, c.unidadeMedida, tc.nome, tl.trataDe, ROUND((lc.medicao / c.total) * 100, 1) AS porcentagem
        FROM log_captura lc
        INNER JOIN configuracao cfg ON lc.fk_configuracao = cfg.idConfiguracao
        INNER JOIN componente c ON cfg.fk_componente = c.idComponente
        INNER JOIN tipo_componente tc ON c.fk_tipo_componente = tc.idTipoComponente
        INNER JOIN tipo_log tl ON lc.fk_tipo_log = tl.idTipoLog
        WHERE cfg.fk_maquina = ${idMaquina} AND c.fk_tipo_componente = ${idComponente} AND lc.fk_tipo_log = ${idTipo}
        ORDER BY lc.idLog DESC`


    }
    // console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    getMaquinas,
    buscarTodosOsAlertas,
    getMaquinasAlertas,
    buscarUltimoAlerta,
    buscarUltimasMedidas,
    buscarTopMedidas,
    buscarMedidasEmTempoReal,
    buscarNumeroTotaldeAlertas
}
