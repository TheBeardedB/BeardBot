module.exports = {
    name: 'hello',
    description: 'Hello,',
    example: '~hello',
    args: false,
    execute(message,args) {
        message.channel.send('World!');
    }
}