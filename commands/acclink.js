const Discord = require("discord.js")
const editJsonFile = require("edit-json-file");

module.exports = {
        name: 'acclink',
        execute(message, args) {
                if (!args[0]) {
                        const errembed = new Discord.MessageEmbed()
                                .setAuthor("Missing Arguments.", "https://cdn.discordapp.com/attachments/539579135786352652/641188940983959555/627171202464743434.png")
                                .setFooter("Format: !acclink [LinkID]")
                                .setColor(process.env.EMBEDCOLOR)
                        message.channel.send(errembed)
                } else {
                        let file = editJsonFile("./links.json")
                        let lol = file.get("codes." + args[0])
                        if (!lol || args[0] !== lol.linkcode) {
                                const errembed = new Discord.MessageEmbed()
                                        .setAuthor("Invalid Account Link Code.", "https://cdn.discordapp.com/attachments/539579135786352652/641188940983959555/627171202464743434.png")
                                        .setColor(process.env.EMBEDCOLOR)
                                message.channel.send(errembed)
                        } else {
                                let b = file.get("links." + lol.robloxid.toString())
                                let c = file.get("links." + message.author.id)
                                if (!c) {
                                        if (!b) {
                                                file.set("links." + message.author.id + ".roblox", lol.robloxid)
                                                file.set("links." + message.author.id + ".discord", message.author.id)
                                                file.set("links." + lol.robloxid + ".roblox", lol.robloxid)
                                                file.set("links." + lol.robloxid + ".discord", message.author.id)
                                                file.save()
                                                const errembed = new Discord.MessageEmbed()
                                                        .setAuthor("Successfully Linked Account.", message.client.user.avatarURL())
                                                        .setColor(process.env.EMBEDCOLOR)
                                                message.channel.send(errembed)
                                        } else {
                                                const errembed = new Discord.MessageEmbed()
                                                        .setAuthor("This account is already linked to a user.", "https://cdn.discordapp.com/attachments/539579135786352652/641188940983959555/627171202464743434.png")
                                                        .setColor(process.env.EMBEDCOLOR)
                                                message.channel.send(errembed)
                                        }
                                } else {
                                        const errembed = new Discord.MessageEmbed()
                                                .setAuthor("You are already linked to a roblox account.", "https://cdn.discordapp.com/attachments/539579135786352652/641188940983959555/627171202464743434.png")
                                                .setColor(process.env.EMBEDCOLOR)
                                        message.channel.send(errembed)
                                }
                        }
                }
        },
};