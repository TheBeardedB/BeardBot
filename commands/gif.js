const { MessageEmbed } = require("discord.js");
const https = require('https');

module.exports = {
    name: 'gif',
    description: 'Donation link for bot author',
    example: '~donate',
    aliases: ['jif', 'giphy', 'gifme'],
    APIKey: 'DNI9BDLXGVF5',
    execute (message, args){
        message.delete();

        parts  = args[0].split( '-' );
        gifID = parts[ parts.length - 1 ];

        https.request(
            {
            hostname: 'api.tenor.com',
            path: `/v1/gifs?id=${gifID}&key=${APIKey}`,
            }
        )
        const embed = new MessageEmbed();
        embed.setImage(args[0])
            .setAuthor(message.author.username, message.author.displayAvatarURL());
        
        message.channel.send(embed);
    }
}