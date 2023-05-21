var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.post("/cadastrarMaquina", function (req, res) {
    maquinaController.cadastrarMaquina(req, res);
});
router.get("/listarMaquinas/:fkEmpresa", function (req, res) {
    maquinaController.listarMaquinas(req, res);
});
router.get("/listarUsuarios/:fkEmpresa", function (req, res) {
    maquinaController.listarUsuarios(req, res);
});
router.delete("/excluirUsuario", function (req, res) {
    maquinaController.excluirUsuario(req, res);
});
router.put("/atualizarUsuario", function (req, res) {
    maquinaController.atualizarUsuario(req, res);
});
router.put("/atualizarMaquina", function (req, res) {
    maquinaController.atualizaMaquina(req, res);
});
router.delete("/excluirMaquina", function (req, res) {
    maquinaController.excluirMaquina(req, res);
});
router.delete("/excluirEmpresa", function (req, res) {
    maquinaController.excluirEmpresa(req, res);
});


module.exports = router;