module.exports = {
    name: 'kick',
    description: 'This command does nothing, it is here as a sample with all the available options',
    permission: ['dicord permission that the requesting user requires to execute this command'],
    args: false,
    cooldown: 0, //Time in seconds before this command can be executed by the same user again    
    example: 'An example showing how the command might be used',
    aliases: ['boot'],
    execute(message,args){
           message.reply('Skipping command, it has no power here');
        console.log('Skipping command, it has no power here');
    }
}