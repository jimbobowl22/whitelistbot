const prefix = process.env.PREFIX
const Discord = require("discord.js")
const editJsonFile = require("edit-json-file");

module.exports = {
        name: 'unlink',
        execute(message, args) {
                let file = editJsonFile("./links.json")
                let lol = file.get("links." + message.author.id)
                if (!lol) {
                        const errembed = new Discord.MessageEmbed()
                                .setAuthor("No Linked Account.", "https://cdn.discordapp.com/attachments/539579135786352652/641188940983959555/627171202464743434.png")
                                .setColor(process.env.EMBEDCOLOR)
                        message.channel.send(errembed)
                } else {
                        let a = lol.roblox
                        file.unset("links." + a.toString())
                        file.unset("links." + message.author.id)
                        file.save()
                        const errembed = new Discord.MessageEmbed()
                                .setAuthor("Successfully Unlinked Account.", message.client.user.avatarURL())
                                .setColor(process.env.EMBEDCOLOR)
                        message.channel.send(errembed)
                }
        },
};