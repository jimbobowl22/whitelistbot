const prefix = process.env.PREFIX
const Discord = require("discord.js")
const axios = require("axios")
const editJsonFile = require("edit-json-file");

module.exports = {
        name: 'give',
        execute(message, args) {
                if (message.member.roles.highest.comparePositionTo(process.env.MINWHITELIST) < 0) {
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
                                .setFooter("Format: !give [DiscordUser] [ProductID]")
                        message.channel.send(embed)
                } else if (!args[1]) {
                        const embed = new Discord.MessageEmbed()
                                .setColor(process.env.EMBEDCOLOR)
                                .setAuthor("Missing Arguments.", "https://cdn.discordapp.com/attachments/539579135786352652/641188940983959555/627171202464743434.png")
                                .setFooter("Format: !give [DiscordUser] [ProductID]")
                        message.channel.send(embed)
                } else {
                        let file = editJsonFile("./links.json")
                        let file2 = editJsonFile("./products.json")
                        const person = file.get("links." + message.mentions.members.first().id)
                        if (!person) {
                                const embed2 = new Discord.MessageEmbed()
                                        .setColor(process.env.EMBEDCOLOR)
                                        .setAuthor("No account linked to this user.", "https://cdn.discordapp.com/attachments/539579135786352652/641188940983959555/627171202464743434.png");
                                message.channel.send(embed2);
                                return;
                        } else {
                                message.client.guilds.resolve(process.env.PRIMARYGUILD).members.fetch(person.discord).then(userrr => {
                                        if (!userrr) {
                                                const embed2 = new Discord.MessageEmbed()
                                                        .setColor(process.env.EMBEDCOLOR)
                                                        .setAuthor("User not in server.", "https://cdn.discordapp.com/attachments/539579135786352652/641188940983959555/627171202464743434.png");
                                                message.channel.send(embed2);
                                                return;
                                        } else {
                                                const product = file2.get("products." + args[1].toLowerCase())
                                                if (!product) {
                                                        const embed2 = new Discord.MessageEmbed()
                                                                .setColor(process.env.EMBEDCOLOR)
                                                                .setAuthor("Invalid Product.", "https://cdn.discordapp.com/attachments/539579135786352652/641188940983959555/627171202464743434.png");
                                                        message.channel.send(embed2);
                                                        return;
                                                } else {
                                                        file2.set("products." + args[1].toLowerCase() + ".users." + person.roblox + ".status", true)
                                                        file2.set("products." + args[1].toLowerCase() + ".users." + person.roblox + ".userid", person.roblox)
                                                        file2.save()
                                                        const embed2 = new Discord.MessageEmbed()
                                                                .setColor(process.env.EMBEDCOLOR)
                                                                .setDescription("Licenced **" + product.name + "** to **" + person.roblox + "**.")
                                                        message.channel.send(embed2);
                                                        axios.get("https://users.roblox.com/v1/users/" + person.roblox)
                                                                .then(function (callback2) {
                                                                        const finalembed = new Discord.MessageEmbed()
                                                                                .setColor(process.env.EMBEDCOLOR)
                                                                                .setAuthor("License Granted", message.client.user.avatarURL())
                                                                                .addField("User", callback2.data.name + " (" + person.roblox + ")", true)
                                                                                .addField("Product", product.name, true)
                                                                                .addField("Method", "Manual - <@" + message.author.id + ">")
                                                                                .setThumbnail('https://www.roblox.com/headshot-thumbnail/image?userId=' + person.roblox + '&width=420&height=420&format=png')
                                                                        message.guild.channels.resolve(process.env.LOGSCHANNEL).send(finalembed)
                                                                })
                                                        const embed = new Discord.MessageEmbed()
                                                                .setColor(process.env.EMBEDCOLOR)
                                                                .setAuthor("You have been granted a license!", message.client.user.avatarURL())
                                                                .setDescription("You have now been granted a license for `" + product.name + "`. We hope you enjoy your product!");
                                                        userrr.send(embed)
                                                }
                                        }
                                })
                        }
                }
        },
};