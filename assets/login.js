'use strict'

const buttonLogin = document.getElementById('login')

async function obterDados() {
    const url = 'https://back-login.vercel.app/usuarios'
    try {
        const response = await fetch(url)
        const usuarios = await response.json()
        return usuarios
    } catch (error) {
        console.error('Erro ao obter dados do usuário:', error)
    }
}

function validaLogin() {
    obterDados().then(usuarios => {

        var emailInput = document.getElementById('mail').value.trim()
        var senhaInput = document.getElementById('password').value

        var usuarioEncontrado = usuarios.find(function(usuario) {
            return usuario.email.trim() === emailInput && usuario.senha === senhaInput
        })

        if (usuarioEncontrado) {
            sessionStorage.setItem('userId', usuarioEncontrado.id)
            window.location.href = '/html/pgHome.html'
        } else {
            alert('Usuário ou senha incorretos. Tente novamente.')
        }
    })
}

buttonLogin.addEventListener('click', validaLogin)