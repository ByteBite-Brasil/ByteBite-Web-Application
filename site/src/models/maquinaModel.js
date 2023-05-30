var database = require("../database/config");

function cadastrarMaquina(loginMaquina, senhaMaquina, fkEmpresa) {
    console.log("ACESSEI O CADASTRO MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarMaquina():", loginMaquina, senhaMaquina, fkEmpresa);
    var instrucao = `
        INSERT INTO maquina (nome, senha, fk_empresa_maquina, ativa) VALUES ('${loginMaquina}', '${senhaMaquina}', '${fkEmpresa}', 'True');
        
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarMaquinas(fkEmpresa) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarMaquinas()");
    var instrucao = `
        SELECT * FROM maquina where fk_empresa_maquina = '${fkEmpresa}' and ativa = 'True';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarUsuarios(fkEmpresa) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarUsuarios()");
    var instrucao = `
        SELECT * FROM usuario where fk_empresa_usuario = ${fkEmpresa};
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

function atualizarUsuario(nome, id, fkEmpresa, email, senha ,telefone) {
    console.log("ACESSEI O ATUALIZAR MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarUsuario():", nome, id, fkEmpresa, email, senha ,telefone);
    if(senha == null || senha == undefined || senha == ''){
        var instrucao = `
        UPDATE usuario SET nome = 
            '${nome}', email = '${email}', telefone = '${telefone}' 
                where idUsuario = '${id}' and fk_empresa_usuario = '${fkEmpresa}';  
    `;
    }
    else {
        var instrucao = `
        UPDATE usuario SET nome = 
            '${nome}', email = '${email}', senha = '${senha}', telefone = '${telefone}' 
                where idUsuario = '${id}' and fk_empresa_usuario = '${fkEmpresa}';
    `;
    }
 
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluirMaquina(id, fkEmpresa) {
    console.log("ACESSEI O ATUALIZAR MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirMaquina():", id, fkEmpresa);
    var instrucao = `
        UPDATE maquina SET ativa = 'False' where idMaquina = '${id}' and fk_empresa_maquina = '${fkEmpresa}';
        
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function excluirEmpresa(fkEmpresa) {
    console.log("ACESSEI O ATUALIZAR MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirEmpresa():", fkEmpresa);
    var instrucao = `
        UPDATE empresa SET ativa = 'False' where idEmpresa = '${fkEmpresa}';        
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluirUser(id, fkEmpresa) {
    console.log("ACESSEI O ATUALIZAR MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirUser():", id, fkEmpresa);
    var instrucao = `
        DELETE FROM usuario WHERE idUsuario = '${id}' and fk_empresa_usuario = '${fkEmpresa}';
        
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarDadosEmpresa(fkEmpresa) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarMaquinas()");
    var instrucao = `
        SELECT * FROM empresa where idEmpresa = '${fkEmpresa}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarEmpresa(razaoSocial, emailEmpresa, cnpj, idEmpresa, senha) {
    console.log("ACESSEI O ATUALIZAR MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarEmpresa():", razaoSocial, emailEmpresa, cnpj, idEmpresa, senha);
    if(senha == null || senha == undefined || senha == ''){
        var instrucao = `
        UPDATE empresa SET razaoSocial = 
            '${razaoSocial}', email = '${emailEmpresa}', cnpj = '${cnpj}' where idEmpresa = '${idEmpresa}'
        
    `;
    }
    else {
        var instrucao = `
        UPDATE empresa SET razaoSocial = 
            '${razaoSocial}', email = '${emailEmpresa}', cnpj = '${cnpj}', senha = '${senha}' where idEmpresa = '${idEmpresa}'
        
    `;
    }
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



module.exports = {
    cadastrarMaquina,
    listarMaquinas,
    atualizarMaquina,
    excluirMaquina,
    listarUsuarios,
    excluirUser,
    atualizarUsuario,
    excluirEmpresa,
    listarDadosEmpresa,
    atualizarEmpresa
}
