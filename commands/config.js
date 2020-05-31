const prefix = process.env.PREFIX
const Discord = require("discord.js")
const axios = require("axios")
const fs = require("fs")
const editJsonFile = require("edit-json-file");

module.exports = {
        name: 'config',
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
                                .setFooter("Format: !config [ProductID]")
                        message.channel.send(embed)
                } else {
                        let file = editJsonFile(`./products.json`)
                        let a = file.get("products." + args[0].toLowerCase())
                        if (!a) {
                                const embed2 = new Discord.MessageEmbed()
                                        .setColor(process.env.EMBEDCOLOR)
                                        .setAuthor("Invalid Product.", "https://cdn.discordapp.com/attachments/539579135786352652/641188940983959555/627171202464743434.png");
                                message.channel.send(embed2);
                                return;
                        } else {
                                let b = file.get("products." + args[0].toLowerCase() + ".name")
                                const previewembed = new Discord.MessageEmbed()
                                        .setAuthor("Licence Config", message.client.user.avatarURL())
                                        .setDescription("**Please select an option to modify.**\n📝 - Licence Name `" + b + "` `")
                                        .setColor(process.env.EMBEDCOLOR);
                                message.channel.send(previewembed).then(m => {
                                        m.react('📝').then(() => m.react('🛑'));
                                        const filter = (reaction2, user) => { return ['📝', '🛑'].includes(reaction2.emoji.name) && user.id === message.author.id; };
                                        m.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] })
                                                .then(collected => {
                                                        const reaction2 = collected.first();
                                                        if (reaction2.emoji.name === '📝') {
                                                                m.delete()
                                                                const embed = new Discord.MessageEmbed()
                                                                        .setAuthor("What is the new name?", message.client.user.avatarURL())
                                                                        .setColor(process.env.EMBEDCOLOR);
                                                                message.channel.send(embed)
                                                                const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 600000 });
                                                                collector.on('collect', msg => {
                                                                        collector.stop()
                                                                        const embed = new Discord.MessageEmbed()
                                                                                .setAuthor("Changed product name to **" + msg.content + ".", message.client.user.avatarURL() + "**.")
                                                                                .setColor(process.env.EMBEDCOLOR)
                                                                        message.channel.send(embed)
                                                                        file.set("products." + args[0].toLowerCase() + ".name", msg.content)
                                                                        file.save()
                                                                })
                                                        } else if (reaction2.emoji.name === '🛑') {
                                                                m.delete()
                                                        }
                                                })
                                })
                        }
                }
        },
};