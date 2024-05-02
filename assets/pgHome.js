'use strict'

async function getUserName() {
    const user = sessionStorage.getItem('userId')
    console.log(user)
    const url = `https://back-login.vercel.app/usuarios/${user}`

    try {
        const response = await fetch(url)
        const usuario = await response.json()

        if (usuario) {
            const userName = document.getElementById('user-name')
            userName.textContent = usuario.nome
        } else {
            console.error(error)
        }


    } catch (error) {
        console.error(error)
    }

}

getUserName()