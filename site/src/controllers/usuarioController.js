var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
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

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var razao = req.body.razaoServer;
    var cnpj = req.body.cnpjServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;


    // Faça as validações dos valores
    if (razao == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu Cnpj está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(razao, cnpj, email, senha)
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

function getIdEmpresa(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.getIdEmpresa(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado[0].idEmpresa)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


function cadastrarEndereco(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    var cep = req.body.cepServer;
    var rua = req.body.ruaServer;
    var num = req.body.numServer;
    var cidade = req.body.cidadeServer;
    var estado = req.body.estadoServer;
    var id = req.body.idempresaServer;

    // Faça as validações dos valores
    if (cep == undefined) {
        res.status(400).send("Seu Cep está undefined!");
    } else if (rua == undefined) {
        res.status(400).send("Seu logradouro está undefined!");
    } else if (num == undefined) {
        res.status(400).send("O numéro do seu endereço está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua cidade está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } else if(id == undefined){
        res.status(400).send("Seu estado está undefined!");
    }else{

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarEndereco(cep, rua, num, cidade, estado, id)
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

module.exports = {
    entrar,
    cadastrar,
    getIdEmpresa,
    cadastrarEndereco,
    listar,
    testar
}