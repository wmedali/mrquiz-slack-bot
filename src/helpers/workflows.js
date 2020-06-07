require('dotenv').config()

//Load the FAQ view modal in JSON 
const faqView = require('../../datasource/faqView.json')
const interactiveQuestionBlocks = require('../../datasource/interactiveQuestion.json')



let inscriptionFlow = (apiClient, payload) => {
    apiClient.chat.postMessage({
        channel : payload.user.id,
        text: `Bienvenue à Mr Quiz, tu es bien inscris <@${payload.user.id}>`
    }).then( (response) => {
        sendWelcomingQuestion(apiClient, payload)
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

let sendWelcomingQuestion = (apiClient, payload) => {
    apiClient.chat.postMessage({
        channel : payload.user.id,
        text: 'Voici une première question pour toi',
        blocks : interactiveQuestionBlocks.blocks
    }).catch( error => {
        console.log(error)
    })
}
export { openFaq, recapFlow, inscriptionFlow }
