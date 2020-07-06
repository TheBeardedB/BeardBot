module.exports = {
    name: 'command_template',
    description: 'This command does nothing, it is here as a sample with all the available options',
    permission: 'dicord permission that the requesting user requires to execute this command',
    args: true|false,
    cooldown: 5, //Time in seconds before this command can be executed by the same user again    
    example: 'An example showing how the command might be used',
    usage: 'descriptive description of the arguments for the command',
    execute(message,args){
        message.reply('This command has no purpose how did you get here?');
    }
}