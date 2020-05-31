const prefix = process.env.PREFIX
const Discord = require("discord.js")
const axios = require("axios")
const fs = require("fs")
const editJsonFile = require("edit-json-file");

module.exports = {
        name: 'account',
        execute(message, args) {
                if (!message.mentions.members.first()) {
                        let file = editJsonFile("./products.json")
                        let file2 = editJsonFile("./links.json")
                        let user = file2.get("links." + message.author.id)
                        const firstembed = new Discord.MessageEmbed()
                                .setColor(process.env.EMBEDCOLOR)
                                .setAuthor("Fetching Account...", "https://cdn.discordapp.com/attachments/539579135786352652/675722466819178496/565691607781867540.gif")
                        message.channel.send(firstembed).then(async m => {
                                if (!user) {
                                        const errembed = new Discord.MessageEmbed()
                                                .setAuthor("No Linked Account.", "https://cdn.discordapp.com/attachments/539579135786352652/641188940983959555/627171202464743434.png")
                                                .setColor(process.env.EMBEDCOLOR)
                                        m.edit(errembed)
                                } else {
                                        let lol = file.get("products")
                                        let text = ""
                                        for (var k in lol) {
                                                if (lol[k].users[user.roblox]) {
                                                        text = text + lol[k].name + "\n"
                                                }
                                        }
                                        if (text === "") {
                                                text = "None"
                                        }
                                        axios.get("https://users.roblox.com/v1/users/" + user.roblox)
                                                .then(function (callback2) {
                                                        const finalembed = new Discord.MessageEmbed()
                                                                .setAuthor("Your Account", message.client.user.avatarURL())
                                                                .addField("User", callback2.data.name + " (" + user.roblox + ")", true)
                                                                .addField("Licenses", text, true)
                                                                .setThumbnail('https://www.roblox.com/headshot-thumbnail/image?userId=' + user.roblox + '&width=420&height=420&format=png')
                                                                .setColor(process.env.EMBEDCOLOR)
                                                        m.edit(finalembed)
                                                })
                                }
                        })
                } else {
                        let file = editJsonFile("./products.json")
                        let file2 = editJsonFile("./links.json")
                        let user = file2.get("links." + message.mentions.members.first().id)
                        const firstembed = new Discord.MessageEmbed()
                                .setColor(process.env.EMBEDCOLOR)
                                .setAuthor("Fetching Account...", "https://cdn.discordapp.com/attachments/539579135786352652/675722466819178496/565691607781867540.gif")
                        message.channel.send(firstembed).then(async m => {
                                if (!user) {
                                        const errembed = new Discord.MessageEmbed()
                                                .setAuthor("No Linked Account.", "https://cdn.discordapp.com/attachments/539579135786352652/641188940983959555/627171202464743434.png")
                                                .setColor(process.env.EMBEDCOLOR)
                                        m.edit(errembed)
                                } else {
                                        let lol = file.get("products")
                                        let text = ""
                                        for (var k in lol) {
                                                if (lol[k].users[user.roblox]) {
                                                        text = text + lol[k].name + "\n"
                                                }
                                        }
                                        if (text === "") {
                                                text = "None"
                                        }
                                        axios.get("https://users.roblox.com/v1/users/" + user.roblox)
                                                .then(function (callback2) {
                                                        const finalembed = new Discord.MessageEmbed()
                                                                .setAuthor(message.mentions.members.first().user.name + "'s Account", message.client.user.avatarURL())
                                                                .addField("User", callback2.data.name + " (" + user.roblox + ")", true)
                                                                .addField("Licenses", text, true)
                                                                .setThumbnail('https://www.roblox.com/headshot-thumbnail/image?userId=' + user.roblox + '&width=420&height=420&format=png')
                                                                .setColor(process.env.EMBEDCOLOR)
                                                        m.edit(finalembed)
                                                })
                                }
                        })
                }
        },
};