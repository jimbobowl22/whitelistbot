const prefix = process.env.PREFIX
const Discord = require("discord.js")
const axios = require("axios")
const fs = require("fs")
const editJsonFile = require("edit-json-file");

module.exports = {
        name: 'create',
        execute(message, args) {
                if (message.member.roles.highest.comparePositionTo(process.env.MINCONFIG) < 0) {
                        const embed2 = new Discord.MessageEmbed()
                                .setColor(process.env.EMBEDCOLOR)
                                .setAuthor("Missing Permissions.", "https://cdn.discordapp.com/attachments/539579135786352652/641188940983959555/627171202464743434.png");
                        message.channel.send(embed2);
                        return;
                }
                if (!args[1]) {
                        const embed = new Discord.MessageEmbed()
                                .setColor(process.env.EMBEDCOLOR)
                                .setAuthor("Missing Arguments.", "https://cdn.discordapp.com/attachments/539579135786352652/641188940983959555/627171202464743434.png")
                                .setFooter("Format: !create [ProductID] [ProductName] ")
                        message.channel.send(embed)
                } else {
                        let file = editJsonFile(`./products.json`)
                        file.set("products." + args[0].toLowerCase() + ".name", message.content.substring(9 + parseInt(args[0].length)))
                        file.set("products." + args[0].toLowerCase() + ".hubid", args[0].toLowerCase())
                        file.set("products." + args[0].toLowerCase() + ".users.1.status", true)
                        file.set("products." + args[0].toLowerCase() + ".users.1.id", "1")
                        file.save()
                        const embed = new Discord.MessageEmbed()
                                .setColor(process.env.EMBEDCOLOR)
                                .setDescription("Created Licence **" + message.content.substring(9 + parseInt(args[0].length)) + "**.")
                        message.channel.send(embed)
                }
        },
};