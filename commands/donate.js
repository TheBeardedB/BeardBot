module.exports = {
    name: 'donate',
    description: 'Donation link for bot author',
    example: '~donate',
    aliases: ['kofi', 'ko-fi', 'support'],
    execute (message, args){
        message.reply(`You can suport the bot author by buying them a coffee :\n https://ko-fi.com/thebeardedb`);
    }
}