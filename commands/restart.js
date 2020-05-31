const Discord = require("discord.js")
const editJsonFile = require("edit-json-file")

module.exports = {
  name: 'restart',
  execute(message, args) {
    if (message.client.guilds.resolve(process.env.PRIMARYGUILD).member(message.author).roles.highest.comparePositionTo(process.env.MINCONFIG) < 0) {
      const embed2 = new Discord.MessageEmbed()
        .setColor(process.env.EMBEDCOLOR)
        .setAuthor("Missing Permissions.", "https://cdn.discordapp.com/attachments/539579135786352652/641188940983959555/627171202464743434.png");
      message.channel.send(embed2);
      return;
    } else {
      const restartembed = new Discord.MessageEmbed()
        .setColor(process.env.EMBEDCOLOR)
        .setAuthor("Restarting Bot...", "https://cdn.discordapp.com/attachments/539579135786352652/675722466819178496/565691607781867540.gif")
      message.channel.send(restartembed).then(m => {
        setTimeout(function () {
          const restartembedd = new Discord.MessageEmbed()
            .setColor(process.env.EMBEDCOLOR)
            .setAuthor("Restarted.", "https://cdn.discordapp.com/attachments/539579135786352652/641188971010850816/627171162857930802.png")
          m.edit(restartembedd)
          setTimeout(function () {
            process.exit()
          }, 200)
        }, 1000)
      })
    }
  },
};
