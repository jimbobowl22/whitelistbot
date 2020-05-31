const prefix = process.env.PREFIX
const Discord = require("discord.js");
const axios = require("axios");
const editJsonFile = require('edit-json-file');

module.exports = {
        name: 'products',
        execute(message, args) {
                let file = editJsonFile("./products.json")
                let lol = file.get("products")
                let text = ""
                for (var k in lol) {
                        text = text + lol[k].name + " (`" + lol[k].hubid + "`)\n"
                }
                const embed2 = new Discord.MessageEmbed()
                        .setColor(process.env.EMBEDCOLOR)
                        .setAuthor("License Manager Information", message.client.user.avatarURL())
                        .addField("Products", text)
                        .setFooter("Each product's ProductID is marked in (Brackets)")
                message.channel.send(embed2)
        },
};