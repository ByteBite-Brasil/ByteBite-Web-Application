var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.post("/getMaquinas", function (req, res) {
    medidaController.getMaquinas(req, res);
});

router.post("/getMaquinasAlertas", function (req, res) {
    medidaController.getMaquinasAlertas(req, res);
});

router.get("/ultimas/dados/maquinas/:idMaquina/:idComponente/:idTipo", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/top/dados/maquinas/:idMaquina/:idComponente/:idTipo", function (req, res) {
    medidaController.buscarTopMedidas(req, res);
});

router.get("/ultimo/alerta/maquinas/:idMaquina", function (req, res) {

    medidaController.buscarUltimoAlerta(req, res);
});

router.get("/total/alerta/maquinas/:idMaquina", function (req, res) {

    medidaController.buscarNumeroTotaldeAlertas(req, res);
});

router.get("/todos/alerta/maquinas/:idMaquina", function (req, res) {

    medidaController.buscarTodosOsAlertas(req, res);
});

router.get("/tempo-real/:idMaquina/:idComponente/:idTipo", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router;