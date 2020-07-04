module.exports = {
    name: 'hello',
    description: 'Hello,',
    execute(message,args) {
        message.channel.send('World!');
    }
}