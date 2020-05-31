const prefix = process.env.PREFIX
const Discord = require("discord.js")
const axios = require("axios")
const fs = require("fs")
const editJsonFile = require("edit-json-file");

module.exports = {
        name: 'delete',
        execute(message, args) {
                if (message.member.roles.highest.comparePositionTo(process.env.MINCONFIG) < 0) {
                        const embed2 = new Discord.MessageEmbed()
                                .setColor(process.env.EMBEDCOLOR)
                                .setAuthor("Missing Permissions.", "https://cdn.discordapp.com/attachments/539579135786352652/641188940983959555/627171202464743434.png");
                        message.channel.send(embed2);
                        return;
                }
                if (!args[0]) {
                        const embed = new Discord.MessageEmbed()
                                .setColor(process.env.EMBEDCOLOR)
                                .setAuthor("Missing Arguments.", "https://cdn.discordapp.com/attachments/539579135786352652/641188940983959555/627171202464743434.png")
                                .setFooter("Format: !delete [ProductID] ")
                        message.channel.send(embed)
                } else {

                        let file = editJsonFile(`./products.json`)
                        file.unset("products." + args[0].toLowerCase())
                        file.save()
                        const embed = new Discord.MessageEmbed()
                                .setColor(process.env.EMBEDCOLOR)
                                .setDescription("Deleted License **" + args[0].toLowerCase() + "**.")
                        message.channel.send(embed)
                }
        },
};