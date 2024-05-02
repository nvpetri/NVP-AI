const button = document.getElementById('send--question')


const consultaGemini = (question) => {

    const keyGoogle = ''

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + keyGoogle;


    const requestData = {
        contents: [{
            parts: [{
                text: `${question}`
            }]
        }]
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    }

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            const responseTextIa = data.candidates[0].content.parts[0].text
            respostaIa(responseTextIa)
        })
        .catch(error => console.error('Error: ', error))
}


const respostaIa = (responseTextIa) => {
    const textAreaPt = document.getElementById('answer-pt')
    textAreaPt.value = responseTextIa

    consultaMyMemory(responseTextIa, (translatedText) => {
        const responseEnElement = document.getElementById('answer-pt')
        responseEnElement.innerText = translatedText
    })
}

const consultaMyMemory = (text, callback) => {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=pt|en`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const translatedText = data.responseData.translatedText
            callback(translatedText)
        })
        .catch(error => console.error('Error: ', error))
}

button.addEventListener('click', () => {
    const question = document.getElementById('ask--user').value
    consultaGemini(question)
})

// function getQuestion() {
//     const question = document.getElementById('ask--user')
//     consultaGemini(question)
// }

// button.addEventListener('click', getQuestion())