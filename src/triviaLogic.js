const axios = require("axios");
const { MessageEmbed } = require("discord.js");
const { convert } = require("html-to-text");
const emojiSn = require("emoji-to-short-name");
let currentRound;
let phase = "buzzer";

module.exports = {
  runTriviaGame(msg) {
    currentRound = 1;
    let url = `https://opentdb.com/api.php?amount=${msg.client.numTriviaRounds}`;
    axios.get(url).then((response) => {
      const { data } = response;
      msg.client.trivia = data.results;
      createTriviaRound(data.results, msg);
    });
  },

  triviaReactionHandler(reactOrig, user) {
    const userAnswering = reactOrig.client.triviaMembers.get(user.id);
    if (!userAnswering)
      return reactOrig.message.channel.send(
        "You must be in the game to answer"
      );

    if (phase == "buzzer") {
      reactOrig.message.channel
        .send(user.username + " is answering")
        .then((msg) => {
          msg.react("1️⃣");
          msg.react("2️⃣");
          msg.react("3️⃣");
          msg.react("4️⃣");
        });

      phase = "answer";
    } else {
      const currentTriviaAnswers =
        convert(reactOrig.message.client.currentTriviaAnswers, { wordwrap: 130 });
      const currentCorrectAnswer =
        convert(reactOrig.message.client.currentCorrectAnswer, { wordwrap: 130 });
      if (
        currentTriviaAnswers.split(',')[getNumberFromEmoji(reactOrig._emoji.name) - 1] ==
        currentCorrectAnswer
      ) {
        reactOrig.message.channel.send("That is correct, you get one point");
      } else {
        reactOrig.message.channel.send(
          `That was the wrong answer, the correct answer was ${currentCorrectAnswer}`
        );
      }

      if (currentRound > reactOrig.message.client.numTriviaRounds) {
        const msg = reactOrig.message;

        msg.client.triviaInProgress = false;
        msg.client.triviaGameStarted = false;
        msg.client.triviaMembers = null;
        msg.channel.send('that\'s it that\'s all folks');
      } else {
        createTriviaRound(reactOrig.message.client.trivia, reactOrig.message);
      }

      phase = 'buzzer'; 
    }
  },
};

function createTriviaRound(trivia, msg) {
  const triviaMsg = new MessageEmbed();
  const currentTrivia = trivia[currentRound - 1];
  const question = convert(currentTrivia.question, {
    wordwrap: 130,
  });

  triviaMsg
    .setColor("#35c5f4")
    .setTitle(
      `${msg.client.user.username}'s Wonderous Trivia - Round ${currentRound} - ${question}`
    )
    .setDescription(
      "A game in which the points don't matter and its all made up."
    );

  const allAnswers = currentTrivia.incorrect_answers.concat(
    currentTrivia.correct_answer
  );
  const shuffledAnswers = shuffle(allAnswers);
  msg.client.currentTriviaAnswers = shuffledAnswers;
  msg.client.currentCorrectAnswer = convert(currentTrivia.correct_answer, {
    wordwrap: 130,
  });

  for (let i = 0; i < shuffledAnswers.length; i++) {
    triviaMsg.addField(
      i + 1,
      convert(shuffledAnswers[i], { wordwrap: 130 }),
      false
    );
  }

  msg.channel.send(triviaMsg).then((msg) => {
    msg.react("🔘");
  });
  currentRound++;
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function getNumberFromEmoji(emoji) {
  if (emoji == "1️⃣") return 1;
  if (emoji == "2️⃣") return 2;
  if (emoji == "3️⃣") return 3;
  if (emoji == "4️⃣") return 4;
}