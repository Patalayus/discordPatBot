const { Client, MessageEmbed } = require('discord.js')

const bot = new Client()

const ping = require('minecraft-server-util');

const token = 'TOKEN HERE'

const PREFIX = '!'

bot.on('ready', () => {
    console.log('Bot has come online.')
})

bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(' ')

    switch (args[0]) {
        case 'mc':

            if (!args[1]) return message.channel.send('You must type a minecraft server ip')

            ping.status(args[1]) // port is default 25565
                .then((response) => {
                    const Embed = new MessageEmbed()
                        .setTitle('Server Status')
                        .addField('Server IP', response.host)
                        .addField('Server Version', response.version)
                        .addField('Online Players', response.onlinePlayers)
                        .addField('Max Players', response.maxPlayers)

                    message.channel.send(Embed)
                    console.log(response);
                })
            break;
    }
})

bot.login(token)
