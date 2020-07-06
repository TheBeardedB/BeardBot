module.exports = {
    name: 'echo',
    description: 'A command that echos your input',
    example: '~echo This is a test of the echo command',
    args: true,
    usage: '<statement>',
    execute(message,args) {
        echo = args.join(' ');

        message.reply(echo);
    }
}