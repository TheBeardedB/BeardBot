const config = require('../config/config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'link to invite the bot to your server',
    example: '~invite',
    args: false,
    execute(message,args) {
        const embed = new MessageEmbed()
            .setTitle(`Get ${config.botName} in your server!`)
            .setColor(0xa53311)
            .setDescription(config.description)
            .setURL(config.invite);

        message.channel.send(embed);
    }
}