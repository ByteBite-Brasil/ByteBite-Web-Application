var medidaModel = require("../models/medidaModel");

function getMaquinas(req, res) {

    console.log("Entrei no controlles")

    var idEmpresa = req.body.idServer;

    medidaModel.getMaquinas(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function getMaquinasAlertas(req, res) {

    console.log("Entrei no controlles")

    var idEmpresa = req.body.idServer;

    medidaModel.getMaquinasAlertas(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 10;

    var idMaquina = req.params.idMaquina;
    var idComponente = req.params.idComponente;
    var idTipo = req.params.idTipo;


    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(idMaquina, idComponente, idTipo, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });


}

function buscarMedidasEmTempoReal(req, res) {

    var idMaquina = req.params.idMaquina;
    var idComponente = req.params.idComponente;
    var idTipo = req.params.idTipo;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idMaquina, idComponente, idTipo).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });

}

function buscarTopMedidas(req, res) {

    const limite_linhas = 10;

    var idMaquina = req.params.idMaquina;
    var idComponente = req.params.idComponente;
    var idTipo = req.params.idTipo;


    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarTopMedidas(idMaquina, idComponente, idTipo).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });


}

function buscarUltimoAlerta(req, res) {


    var idMaquina = req.params.idMaquina;

    medidaModel.buscarUltimoAlerta(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });


}

function buscarTodosOsAlertas(req, res) {

    var idMaquina = req.params.idMaquina;

    medidaModel.buscarTodosOsAlertas(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });


}

function buscarNumeroTotaldeAlertas(req, res) {

    var idMaquina = req.params.idMaquina;

    medidaModel.buscarNumeroTotaldeAlertas(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });


}

module.exports = {
    getMaquinas,
    getMaquinasAlertas,
    buscarTodosOsAlertas,
    buscarUltimoAlerta,
    buscarUltimasMedidas,
    buscarTopMedidas,
    buscarNumeroTotaldeAlertas,
    buscarMedidasEmTempoReal

}