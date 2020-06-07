require('dotenv').config()

//Load the FAQ view modal in JSON 
const faqView = require('../../views/faqView.json')


let inscriptionFlow = (apiClient, payload) => {
    apiClient.chat.postMessage({
        channel : payload.user.id,
        text: `Bienvenue à Mr Quiz, tu es bien inscris <@${payload.user.id}>`
    })
    .catch(error => {
        console.log('Send private message error !', error)
    })
}


let recapFlow = (apiClient, payload) => {
    apiClient.chat.postMessage({
        channel : payload.user.id,
        mrkdwn: true,
        text: `Encore une fois toi ! Bon <@${payload.user.id}> *Voici ton récapitulatif*`
    })
    .catch(error => {
        console.log('Send private message error !', error)
    })
}

let openFaq = (apiClient, triggerId) => {
    apiClient.views.open({
        trigger_id: triggerId,
        view: faqView
    })
}

export { openFaq, recapFlow, inscriptionFlow }
