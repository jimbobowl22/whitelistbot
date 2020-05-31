const prefix = process.env.PREFIX
const Discord = require("discord.js")
const axios = require("axios")
const editJsonFile = require("edit-json-file");

module.exports = {
        name: 'forcelink',
        execute(message, args) {
                if (message.member.roles.highest.comparePositionTo(process.env.MINCONFIG) < 0) {
                        const embed2 = new Discord.MessageEmbed()
                                .setColor(process.env.EMBEDCOLOR)
                                .setAuthor("Missing Permissions.", "https://cdn.discordapp.com/attachments/539579135786352652/641188940983959555/627171202464743434.png");
                        message.channel.send(embed2);
                        return;
                }
                if (!message.mentions.members.first()) {
                        const embed = new Discord.MessageEmbed()
                                .setColor(process.env.EMBEDCOLOR)
                                .setAuthor("Missing Arguments.", "https://cdn.discordapp.com/attachments/539579135786352652/641188940983959555/627171202464743434.png")
                                .setFooter("Format: !forcelink [ROBLOXName] [DiscordUser]")
                        message.channel.send(embed)
                } else if (!args[1]) {
                        const embed = new Discord.MessageEmbed()
                                .setColor(process.env.EMBEDCOLOR)
                                .setAuthor("Missing Arguments.", "https://cdn.discordapp.com/attachments/539579135786352652/641188940983959555/627171202464743434.png")
                                .setFooter("Format: !forcelink [ROBLOXName] [DiscordUser]")
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
                                                file.set("links." + message.mentions.members.first().user.id.toString() + ".roblox", callback.data.Id)
                                                file.set("links." + message.mentions.members.first().user.id.toString() + ".discord", message.mentions.members.first().user.id)
                                                file.set("links." + callback.data.Id + ".roblox", callback.data.Id)
                                                file.set("links." + callback.data.Id + ".discord", message.mentions.members.first().user.id)
                                                file.save()
                                                const embed = new Discord.MessageEmbed()
                                                        .setColor(process.env.EMBEDCOLOR)
                                                        .setDescription("Force linked account **" + callback.data.Id + "** to **" + message.mentions.members.first().user.tag + "**.")
                                                message.channel.send(embed)
                                        }
                                })
                }
        },
};