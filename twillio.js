var Slack = require('slack-node');

webhookUri = "https://hooks.slack.com/services/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";

slack = new Slack();
slack.setWebhook(webhookUri);

slack.webhook({
 channel: "#1607-juniors",
 username: "Tessel Hackathon Group 11",
 text: "Temperature is not cold enough!"
}, function(err, response) {
 console.log(response);
});

module.exports =
