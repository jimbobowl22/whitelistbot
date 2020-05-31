const prefix = process.env.PREFIX
const Discord = require("discord.js")
const axios = require("axios")
const editJsonFile = require("edit-json-file");

module.exports = {
        name: 'forceunlink',
        execute(message, args) {
                if (message.member.roles.highest.comparePositionTo(process.env.MINCONFIG) < 0) {
                        const embed2 = new Discord.MessageEmbed()
                                .setColor(process.env.EMBEDCOLOR)
                                .setAuthor("Missing Permissions.", "https://cdn.discordapp.com/attachments/539579135786352652/641188940983959555/627171202464743434.png");
                        message.channel.send(embed2);
                        return;
                }
                if (message.mentions.members.first()) {
                        let file = editJsonFile("./links.json")
                        let lol = file.get("links." + message.mentions.members.first().id)
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
                                const embed = new Discord.MessageEmbed()
                                        .setColor(process.env.EMBEDCOLOR)
                                        .setDescription("Force unlinked account **" + a + "** from **" + message.mentions.members.first().user.tag + "**.")
                                message.channel.send(embed)
                        }
                } else if (!args[0]) {
                        const embed = new Discord.MessageEmbed()
                                .setColor(process.env.EMBEDCOLOR)
                                .setAuthor("Missing Arguments.", "https://cdn.discordapp.com/attachments/539579135786352652/641188940983959555/627171202464743434.png")
                                .setFooter("Format: !forceunlink [ROBLOXName] OR [DiscordUser]")
                        message.channel.send(embed)
                } else {
                        axios.get('https://api.roblox.com/users/get-by-username?username=' + args[0])
                                .then(function (callback) {
                                        if (callback.data.success === false) {
                                                const embedawdawd = new Discord.MessageEmbed()
                                                        .setColor(process.env.EMBEDCOLOR)
                                                        .setAuthor("Invalid Roblox User.", message.guild.iconURL)
                                                message.channel.send(embedawdawd);
                                        } else {
                                                let file = editJsonFile(`./links.json`)
                                                let lol = file.get("links." + callback.data.Id)
                                                if (!lol) {
                                                        const errembed = new Discord.MessageEmbed()
                                                                .setAuthor("No Linked Account.", "https://cdn.discordapp.com/attachments/539579135786352652/641188940983959555/627171202464743434.png")
                                                                .setColor(process.env.EMBEDCOLOR)
                                                        message.channel.send(errembed)
                                                } else {
                                                        let a = lol.discord
                                                        file.unset("links." + a.toString())
                                                        file.unset("links." + callback.data.Id)
                                                        file.save()
                                                        const embed = new Discord.MessageEmbed()
                                                                .setColor(process.env.EMBEDCOLOR)
                                                                .setDescription("Force unlinked account **" + callback.data.Id + "**.")
                                                        message.channel.send(embed)
                                                }
                                        }
                                })
                }
        },
};