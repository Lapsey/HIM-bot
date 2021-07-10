const { Collection } = require("discord.js");

module.exports = {
  name: "starttrivia",
  description:
    "Starts a round of trivia, \n to use: type in this command, and others can join the game by the jointrivia command, once everyone who is joining gets in, type the command startgame and enjoy",
  aliases: ["st"],
  run(msg, args) {
    if (msg.client.triviaInProgress)
      return msg.reply("Trivia is already in progress");
    msg.client.triviaMembers = new Collection();
    msg.client.triviaMembers.set(msg.member.user.id, msg.member.user.username);
    msg.client.triviaInProgress = true;
  },
};
