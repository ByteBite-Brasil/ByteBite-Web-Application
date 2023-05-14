var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.post("/getMaquinas", function (req, res) {

    console.log("Passei no routers")

    medidaController.getMaquinas(req, res);
});


router.get("/tempo-real/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router;