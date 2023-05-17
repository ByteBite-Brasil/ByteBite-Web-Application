var database = require("../database/config");

function cadastrarMaquina(loginMaquina, senhaMaquina, fkEmpresa) {
    console.log("ACESSEI O CADASTRO MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarMaquina():", loginMaquina, senhaMaquina, fkEmpresa);
    var instrucao = `
        INSERT INTO maquina (nome, senha, fk_empresa_maquina) VALUES ('${loginMaquina}', '${senhaMaquina}', '${fkEmpresa}');
        
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarMaquinas(fkEmpresa) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarMaquinas()");
    var instrucao = `
        SELECT * FROM maquina where fk_empresa_maquina = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarMaquina(nomeMaquina, id, fkEmpresa) {
    console.log("ACESSEI O ATUALIZAR MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarMaquina():", nomeMaquina, id, fkEmpresa);
    var instrucao = `
        UPDATE maquina SET nome = '${nomeMaquina}' where idMaquina = '${id}' and fk_empresa_maquina = '${fkEmpresa}';
        
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluirMaquina(id, fkEmpresa) {
    console.log("ACESSEI O ATUALIZAR MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirMaquina():", id, fkEmpresa);
    var instrucao = `
        DELETE FROM maquina WHERE idMaquina = '${id}' and fk_empresa_maquina = '${fkEmpresa}';
        
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    cadastrarMaquina,
    listarMaquinas,
    atualizarMaquina,
    excluirMaquina
}
