var maquinaModel = require("../models/maquinaModel");

function cadastrarMaquina(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var loginMaquina = req.body.nomeMaquinaServer;
    var senhaMaq = req.body.senhaMaquinaServer;
    var fkEmpresa = req.body.fkEmpresaServer
    if (senhaMaq == undefined) {
        res.status(400).send("Máquina indefinida");
    } else if (loginMaquina == undefined) {
        res.status(400).send("Senha da Máquina indefinida!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Senha da Máquina indefinida!");
    } else {
        maquinaModel.cadastrarMaquina(loginMaquina, senhaMaq, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarMaquinas(req, res) {
    var idEmpresa = req.params.fkEmpresa;
    maquinaModel.listarMaquinas(idEmpresa)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarUsuarios(req, res) {
    var idEmpresa = req.params.fkEmpresa;
    maquinaModel.listarUsuarios(idEmpresa)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function atualizaMaquina(req, res) {
    var nomeMaquina = req.body.nomeMaquinaServer;
    var idMaquina = req.body.idMaquinaServer;
    var fkEmpresa = req.body.fkEmpresaServer;
    if (nomeMaquina == undefined) {
        res.status(400).send("Máquina indefinida");
    } else if (idMaquina == undefined) {
        res.status(400).send("Senha da Máquina indefinida!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Senha da Máquina indefinida!");
    } else {
        maquinaModel.atualizarMaquina(nomeMaquina, idMaquina, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao atualizar a máquina! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function excluirMaquina(req, res) {
    var idMaquina = req.body.idMaquinaServer;
    var fkEmpresa = req.body.fkEmpresaServer;
     if (idMaquina == undefined) {
        res.status(400).send("Senha da Máquina indefinida!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Senha da Máquina indefinida!");
    } else {
        maquinaModel.excluirMaquina(idMaquina, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao atualizar a máquina! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


module.exports = {
    cadastrarMaquina,
    listarMaquinas,
    atualizaMaquina,
    excluirMaquina,
    listarUsuarios
}