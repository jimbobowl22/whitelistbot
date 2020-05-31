const prefix = process.env.PREFIX
const Discord = require("discord.js")

module.exports = {
        name: 'help',
        execute(message, args) {
                const embed = new Discord.MessageEmbed()
                        .setColor(process.env.EMBEDCOLOR)
                        .setAuthor("Help", message.client.user.avatarURL())
                        .addField("Commands", "**" + prefix + "account**\n**" + prefix + "products**\n**" + prefix + "acclink**\n**" + prefix + "unlink**")
                message.channel.send(embed)
        },
};