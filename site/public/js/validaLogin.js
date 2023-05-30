verificarTipoLogin();

function verificarTipoLogin(){
    console.log('chamei a função de verificar tipo login')
    var tipoLogin = sessionStorage.TYPE_LOGIN;
    if(tipoLogin == 'usuario'){
        var cadFun = document.getElementById('testeCadFun');
        var cardMaq = document.getElementById('testeCadMaq');
        var cardUser = document.getElementById('testePerfilUser');
        cadFun.style.display = 'none';
        cardMaq.style.display = 'none';
        cardUser.style.display = 'none';
    }
}