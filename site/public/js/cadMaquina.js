async function cadastrarMaquina(){
    var nomeMaquina = ipt_maqNome.value;
    var senhaMaquina = ipt_senhaMaq.value;
    var fkEmpresa = sessionStorage.ID_USUARIO;

    try {
        const conexao = await fetch("/maquina/cadastrarMaquina", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                nomeMaquinaServer: nomeMaquina,
                senhaMaquinaServer: senhaMaquina,
                fkEmpresaServer: fkEmpresa
            })
        });
        listarMaquinas();
    } catch (error) {
        console.log(error);
    }
}

async function listarMaquinas(){
    var fkEmpresa = sessionStorage.ID_USUARIO;
    
    try {
        const request = await fetch(`/maquina/listarMaquinas/${fkEmpresa}`);
        const maquinas = await request.json();
        construirCardsMaquinas(maquinas);

    } catch (error) {
        console.log(error);
    }
}

function construirCardsMaquinas(maquinas){
    var minhasMaquinas = document.getElementById("formMaquina");
    maquinas.forEach(maquina => {
        const cardMaquina = document.createElement("div")
        const buttonMaq = document.createElement("button")
        buttonMaq.className = "btnmaq";
        cardMaquina.className = "btnmaq"
        cardMaquina.appendChild(buttonMaq);
        minhasMaquinas.appendChild(cardMaquina);
        buttonMaq.innerHTML = maquina.idMaquina;
    });
}
