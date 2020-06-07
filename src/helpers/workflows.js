const { WebClient } = require('@slack/web-api');
require('dotenv').config()

//Load the FAQ view modal in JSON 
const faqView = require('../../views/faqView.json')


const token = process.env.SLACK_API_TOKEN;
const web = new WebClient(token);


let inscriptionFlow = (payload) => {
    web.chat.postMessage({
        channel : payload.user.id,
        text: `Bienvenue à Mr Quiz, tu es bien inscris <@${payload.user.id}>`
    })
    .catch(error => {
        console.log('Send private message error !', error)
    })
}


let recapFlow = (payload) => {
    web.chat.postMessage({
        channel : payload.user.id,
        mrkdwn: true,
        text: `Encore une fois toi ! Bon <@${payload.user.id}> *Voici ton récapitulatif*`
    })
    .catch(error => {
        console.log('Send private message error !', error)
    })
}

let openFaq = (triggerId) => {
    web.views.open({
        trigger_id: triggerId,
        view: faqView
    })
}

export { openFaq, recapFlow, inscriptionFlow }
