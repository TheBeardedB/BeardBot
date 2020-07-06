module.exports = {
    name: 'reload',
    description: 'Reloads a command',
    example: '~reload help',
    args: true,
    usage: '<command name>',
    execute(message,args)
    {   
        if(args[0] === 'all')
        {
            commands = message.client.commands;
            names = [];
            commands.forEach(command => {
                names.push(command.name);
            });

            names.forEach(name => {
                const commandName = name.toLowerCase();
                const command = message.client.commands.get(commandName)
                    || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

                if(command) delete require.cache[require.resolve(`./${command.name}.js`)];

                try {
                    const newCommand = require(`./${commandName}.js`);
                    message.client.commands.set(commandName, newCommand);

                    message.channel.send(`Command \`${commandName}\` was reloaded!`);
                } catch (error) {
                    console.log(error);
                    message.channel.send(`There was an error while reloading a command \`${commandName}\`:\n\`${error.message}\``);
                }
            });

            message.channel.send(`Reloaded: ${names}`);
        }
        else {
            const commandName = args[0].toLowerCase();
            const command = message.client.commands.get(commandName)
                || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

            if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);

            delete require.cache[require.resolve(`./${command.name}.js`)];

            try {
                const newCommand = require(`./${command.name}.js`);
                message.client.commands.set(newCommand.name, newCommand);

                message.channel.send(`Command \`${command.name}\` was reloaded!`);
            } catch (error) {
                console.log(error);
                message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
            }
        }
        
    }
}