const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'donate',
    description: 'Donation link for bot author',
    example: '~donate',
    aliases: ['kofi', 'ko-fi', 'support'],
    execute (message, args){
        const embed = new MessageEmbed();
        embed.setImage('https://media.giphy.com/media/3o7TKDK6NaugAhCxpe/giphy.gif')
            .setDescription(`You can suport the bot author by buying them a coffee :\n https://ko-fi.com/thebeardedb`)
            .setAuthor(message.author.username, message.author.displayAvatarURL());
        
        message.channel.send(embed);
    }
}