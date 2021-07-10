module.exports = {
  name: "startgame",
  description:
    "starts the game of trivia after everyone has joined needs one argument for the number of rounds",
  aliases: ["sg"],
  run(msg, args) {
    if (args.length != 1)
      return msg.reply(
        "wrong number of arguments, if you need help with this command, type in the help command"
      );

    if (isNaN(args[0]))
      return msg.reply(
        "Argument must be a number, if you need help with this command, type in the help command"
      );

    if (!msg.client.triviaInProgress)
      return msg.reply(
        "Trivia game must be in progress to use this command, if you need help with this command, type in the help command"
      );

    msg.client.triviaGameStarted = true;
    msg.client.numTriviaRounds = args[0];

    const allMembers = msg.client.triviaMembers.array();
    let alertMsg = "";
    allMembers.forEach((member) => {
      const user = msg.client.users.cache.find(
        (u) => u.username == member
      ).toString();
      alertMsg += `${user}, `;
    });

    msg.channel.send(alertMsg + "your game of trivia is starting");
    msg.client.runTriviaGame(msg);
  },
};
