module.exports = {
  name: "jointrivia",
  description: "joins a game of trivia, provided that there is a game started",
  aliases: ["jt"],
  run(msg, args) {
    if (!msg.client.triviaInProgress) {
      return msg.reply(
        "there must be a trivia game started to use the command, to start a game use the starttrivia command"
      );
    }

    const user = msg.client.triviaMembers.get(msg.member.user.id);
    if (user) return msg.reply("You are already in this game of trivia");
    msg.client.triviaMembers.set(msg.member.user.id, msg.member.user.username);
  },
};
