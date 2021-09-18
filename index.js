const fs = require('fs');
// require the discord.js module, this is a discord bot afterall
const Discord = require('discord.js');

// import the configuration for the bot
// NOTE: Someday we want parts of this to be 
const bot_config = require('./config/bot.json');
let secrets;
try{
    secrets = require('./config/secrets.json');
}catch (error)
{
    //Do nothing we don't care
}
const token = process.env.TOKEN ? process.env.TOKEN : secrets.token;

// create a client to allow the bot to log in
const client = new Discord.Client();

// create the cooldown collection
const cooldowns = new Discord.Collection();

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
    if(!message.content.startsWith(bot_config.prefix) || message.author.bot ) return;

    const args = message.content.slice(bot_config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if(!command) {
        message.reply(`No command matches ${commandName}`); 
        return;
    }

    if(command.args && !args.length)
    {
        let reply = `${commandName} requires arguments and none were provided`;

        if(command.usage)
        {
            reply += `\nTry: ${config.prefix}${commandName} ${command.usage}`;
        }
        if(command.example)
        {
            reply += `\nAs shown in the following example:\n${command.example}`;
        }

        return message.reply(reply);
    }
    
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }
    else{
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }    
    try {
        command.execute(message, args);        
    } catch (error) {
        console.error(error);
        message.reply(`Error executing ${command}, please check the arguments and try again`);
    }
});

client.on('guildCreate', ( guild ) => {
    // Do the things you need to do
    // I think I am going to make this a module
})

client.on('presenceUpdate', (oldUser, newUser) => {
    console.debug("Received Presence update event");
})
