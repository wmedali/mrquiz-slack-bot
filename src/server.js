const { createMessageAdapter } = require('@slack/interactive-messages');
const { WebClient } = require('@slack/web-api');

import * as Utils from './helpers/workflows'
import "regenerator-runtime/runtime.js"
require('dotenv').config()

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackInteractions = createMessageAdapter(slackSigningSecret);

const token = process.env.SLACK_API_TOKEN;
const apiClient = new WebClient(token);


// Example of handling attachment actions. This is for button click, but menu selection would use `type: 'select'`.
slackInteractions.action({ type: 'button' }, (payload, respond) => {
    // Logs the contents of the action to the console

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
        default:
            return { text: 'Je connais pas cette action...' }
    }

    // Return a replacement message
    return { text: 'Action bien traitée...' };
});


(async () => {
    const port = process.env.PORT;
    const server = await slackInteractions.start(port);

    console.log(`Listening for events on ${server.address().port}`);
})();