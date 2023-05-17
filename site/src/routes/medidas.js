var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.post("/getMaquinas", function (req, res) {
    medidaController.getMaquinas(req, res);
});

router.get("/ultimas/dados/maquinas/:idMaquina/:idComponente/:idTipo", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router;