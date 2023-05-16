var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");


router.post("/getMaquinas", function (req, res) {

    console.log("Passei no routers")

    medidaController.getMaquinas(req, res);
});

router.get("/ultimas/cpu/consumo/:idMaquina/:idComponente/:idTipo", function (req, res) {
    medidaController.buscarUltimasMedidasConsumoCPU(req, res);
});

router.get("/ultimas/cpu/temperatura/:idMaquina/:idComponente/:idTipo", function (req, res) {
    medidaController.buscarUltimasMedidasTemperaturaCPU(req, res);
});

router.get("/tempo-real/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router;