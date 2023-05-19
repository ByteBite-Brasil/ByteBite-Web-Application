listarUsuariosEmpresa();

async function listarUsuariosEmpresa(){
    var fkEmpresa = sessionStorage.ID_USUARIO;
    
    try {
        const request = await fetch(`/maquina/listarUsuarios/${fkEmpresa}`);
        const usuarios = await request.json();
        criarCardUsuario(usuarios);
    } catch (error) {
        console.log(error);
    }
}

function criarCardUsuario(usuarios){
    var tableUsuarios = document.getElementById('usuariosBody');
    console.log('entrei no card de criar')
    usuarios.forEach(usuario => {
        const usuarioBody = document.createElement('div');
        const userId = document.createElement('div');
        const spanId = document.createElement('span')
        const nameUser = document.createElement('div');
        const spanName = document.createElement('span');
        const telUser = document.createElement('div');
        const spanTel = document.createElement('span');
        const emailUser = document.createElement('div');
        const spanEmail = document.createElement('span');
        const acaoUser = document.createElement('div');
        const buttonEditar = document.createElement('button')
        const buttonExcluir = document.createElement('button')

        usuarioBody.className = 'bodyUsuarios';
        userId.className = 'bodyUserTable id';
        nameUser.className = 'bodyUserTable name';
        telUser.className = 'bodyUserTable celPhone'
        emailUser.className = 'bodyUserTable email';
        acaoUser.className = 'bodyUserTable acao';

        buttonEditar.className = 'buttonCadPer green';
        buttonExcluir.className = 'buttonCadPer red'

        buttonEditar.innerHTML = 'Editar';
        buttonExcluir.innerHTML = 'Excluir'

        acaoUser.appendChild(buttonEditar);
        acaoUser.appendChild(buttonExcluir);
        usuarioBody.appendChild(userId);
        userId.appendChild(spanId);
        usuarioBody.appendChild(nameUser);
        nameUser.appendChild(spanName)
        usuarioBody.appendChild(telUser);
        telUser.appendChild(spanTel)
        usuarioBody.appendChild(emailUser);
        emailUser.appendChild(spanEmail);
        usuarioBody.appendChild(acaoUser);

        tableUsuarios.appendChild(usuarioBody);

        spanId.innerHTML = `${usuario.idUsuario}`
        spanName.innerHTML = `${usuario.nome}`
        spanTel.innerHTML = `${usuario.telefone}`
        spanEmail.innerHTML = `${usuario.email}`

        buttonEditar.addEventListener('click', openModal1);
        buttonExcluir.addEventListener('click', openModal2);
    });
}