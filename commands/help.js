const {prefix} = require('../config/config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'provides a list of all the loaded commands and their descriptions',
    example: '~help',
    aliases: ['commands'],
    args: false,
    usage: '<command name>',
    execute(message,args) {
        const data = [];
        const { commands } = message.client;
        const embed = new MessageEmbed();
        if(!args.length) {
            commands.forEach(command => {
                data.push(`• **${command.name}** - ${command.description}`);
            });
            
            data.push(`\nYou can send \`${prefix}help <command name>\` to get info on a specific command!`);

            
            embed.setTitle('Command List');
        }
        else{
            const name = args[0].toLowerCase();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

            if (!command) {
                return message.reply('that\'s not a valid command!');
            }

            data.push(`**Name:** ${command.name}`);

            if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
            if (command.description) data.push(`**Description:** ${command.description}`);
            if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

            data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
            
            if (command.example) data.push(`**Example: \n ${command.example}`);
        }

        embed.setColor(0xa53311)
             .setDescription(data)
             .setURL('https://google.com');
                    
        message.channel.send(embed);
    }
}