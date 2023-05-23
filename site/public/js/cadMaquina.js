listarMaquinas();
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
        ipt_maqNome.value = "";
        ipt_senhaMaq.value = "";
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
        const cardMaquina = document.createElement("div");
        const idTotem = document.createElement("div");
        const nomeTotem = document.createElement("div");
        const buttonArea = document.createElement("div")
        const buttonEditar = document.createElement("button")
        const buttonExcluir = document.createElement("button")
        buttonEditar.innerHTML = "Editar";
        buttonExcluir.innerHTML = "Excluir";
        buttonEditar.className = "buttonCadPer green"
        buttonExcluir.className = "buttonCadPer red"

        cardMaquina.className = "bodyTable"
        idTotem.className = "idMaquina"
        nomeTotem.className = "nameMaquina"
        buttonArea.className = "maqAcao"

        idTotem.innerHTML = `${maquina.idMaquina}`
        nomeTotem.innerHTML = `${maquina.nome}`


        minhasMaquinas.appendChild(cardMaquina);
        cardMaquina.appendChild(idTotem)
        cardMaquina.appendChild(nomeTotem)
        buttonArea.appendChild(buttonEditar)
        buttonArea.appendChild(buttonExcluir)
        cardMaquina.appendChild(buttonArea)

        buttonEditar.setAttribute("id", "editarCliente")
        buttonExcluir.setAttribute("id", "excluirCliente")

        buttonEditar.addEventListener('click',() => openModal1(maquina.idMaquina, maquina.nome));
        buttonExcluir.addEventListener('click', () => openModal2(maquina.idMaquina));
    });

}

async function atualizarMaquina(id){
    try {
        var idMaquina = id;
        var nomeMaquina = maquinaName.value;
        var fkEmpresa = sessionStorage.ID_USUARIO;
        const conexao = await fetch("/maquina/atualizarMaquina", {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                nomeMaquinaServer: nomeMaquina,
                idMaquinaServer: idMaquina,
                fkEmpresaServer: fkEmpresa
            })
        });
    } catch(e){
        throw new Exception(e);
    }

}

async function excluirMaquina(id){
    try {
        var idMaquina = id;
        var fkEmpresa = sessionStorage.ID_USUARIO;
        const conexao = await fetch("/maquina/excluirMaquina", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                idMaquinaServer: idMaquina,
                fkEmpresaServer: fkEmpresa
            })
        });
        conexao.ok(conexao.body);
    } catch(e){
        throw new Exception(e);
    }
}
