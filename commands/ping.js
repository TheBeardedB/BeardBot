module.exports ={
    name: 'ping',
    description: 'Ping!',
    example: '~ping',
    args: false,
    execute (message, args) {
        message.channel.send('Pong');
    }
}