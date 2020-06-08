const { createMessageAdapter } = require('@slack/interactive-messages');
const { WebClient } = require('@slack/web-api');

import * as Utils from './helpers/workflows'
import "regenerator-runtime/runtime.js"
require('dotenv').config()

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackInteractions = createMessageAdapter(slackSigningSecret);

const token = process.env.SLACK_API_TOKEN;
const apiClient = new WebClient(token);

const homeButtonRegex = RegExp('home_button_*')
const invalidChoiceRegex = new RegExp('invalid_choice_*')

// Example of handling attachment actions. This is for button click, but menu selection would use `type: 'select'`.
slackInteractions.action({ type: 'button', actionId:  homeButtonRegex }, (payload, respond) => {
    // Logs the contents of the action to the console
    console.log('A home button was clicked')
    switch (payload.actions[0].value) {
        case 'inscription_button':
            Utils.inscriptionFlow(apiClient, payload)
            break;
        case 'recap_button':
            Utils.recapFlow(apiClient, payload)
            break;
        case 'faq_button':
            Utils.openFaq(apiClient, payload.trigger_id)
            break;
    }

    // Return a replacement message
    return { text: 'Action bien traitée...' };
});

slackInteractions.action({ type: 'button', blockId: 'valid_choice' }, (payload, respond) => {
    console.log('A valid choice was selected')
    apiClient.chat.postMessage({
        channel: payload.user.id,
        text: `Bravo !!! pour la bonne réponse :tada:`
    })
        .catch(error => {
            console.log(error)
        })

    return { text: 'Bonne réponse bien traitée...' };
});

slackInteractions.action({ type: 'button', blockId: invalidChoiceRegex }, (payload, respond) => {
    console.log('An invalid choice was selected')
    apiClient.chat.postMessage({
        channel: payload.user.id,
        text: `Oups !! too bad wrong answer !`
    })
        .catch(error => {
            console.log(error)
        })

    return { text: 'Mauvaise réponse bien traitée...' };
});


(async () => {
    const port = process.env.PORT;
    const server = await slackInteractions.start(port);

    console.log(`Listening for events on ${server.address().port}`);
})();