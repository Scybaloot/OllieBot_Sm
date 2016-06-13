'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hi! My name is Ollie!\n I am a real boy!')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('What\'s your name?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Arf Arf! Nice to meats you ${name} (hehe I like meats) \n 
That your name right? %[Yes](postback:yes) %[No](postback:no)`))
                .then(() => 'finish');
        }
    },

    treat: {
        receive: (bot, message) => {
            return bot.say('I love peanuts butters!');
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Arf Arf! I am doggie with limited vocabulibrary. Sorry ${name}, I don't ` +
                        'know that much'))
                .then(() => 'finish');
        }
    }
});
