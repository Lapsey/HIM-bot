const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Provides a list of commands, shows how to use them.",
  aliases: ["h"],
  run(msg, args) {
    let commands = msg.client.commands.array();

    const helpMsg = new MessageEmbed()
      .setTitle(msg.client.user.username)
      .setDescription("A list of commands, and how to use them.")
      .setColor("#F8AA2A");

    commands.forEach((cmd) => {
      helpMsg.addField(
        `**${msg.client.prefix}${cmd.name} ${
          cmd.aliases ? `(${cmd.aliases})` : ""
        }**`,
        `${cmd.description}`,
        true
      );
    });

    helpMsg.setTimestamp();

    msg.channel.send(helpMsg);
  },
};
