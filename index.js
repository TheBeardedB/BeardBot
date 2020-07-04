const fs = require('fs');
// require the discord.js module, this is a discord bot afterall
const Discord = require('discord.js');

// import the configuration for the bot
// NOTE: Someday we want parts of this to be 
const config = require('./config/config.json');
const {token} = require('./config/secrets.json');

// create a client to allow the bot to log in
const client = new Discord.Client();

function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

// These are start-up tasks, this code runs one time
// the event triggers once the bot is logged in
client.once('ready', ()=>{
    // initalize the command collection
    client.commands = new Discord.Collection();

    // sync the command files
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    console.log('Loading Commands');
    // load the commands into the collection
    for (const file of commandFiles)
    {
        const command = require(`./commands/${file}`);

        // set a new item in the Collection
        // with the key as the command name and the value as the exported module
        client.commands.set(command.name, command);
        console.log(`Loaded ${command.name}`);
    }

    client.user.setActivity('the most dangerous game');
    console.log('Ready');
});

// log in to Discord with the token
client.login(token);

// Whenever a mesasge is sent 
client.on('message', message => {
    console.log(message.content);
    // If the message doesn't start with our prefix or is from a bot then ignore it
    if(!message.content.startsWith(config.prefix) || message.author.bot ) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)) {
        message.reply(`No command matches ${command}`); 
        return;
    }

    try {
        client.commands.get(command).execute(message, args);        
    } catch (error) {
        console.error(error);
        message.reply(`Error executing ${command}, please check the arguments and try again`);
    }
});
