var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.post("/cadastrarMaquina", function (req, res) {
    maquinaController.cadastrarMaquina(req, res);
});
router.get("/listarMaquinas/:fkEmpresa", function (req, res) {
    maquinaController.listarMaquinas(req, res);
});


module.exports = router;