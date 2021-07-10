const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const schedule = require('node-schedule');
const triviaLogic = require("./triviaLogic");
require("dotenv").config();

client.once("ready", () => {
  loadCommands();
  client.prefix = "!";
  client.runTriviaGame = triviaLogic.runTriviaGame;
  console.log(`Bot logged in as ${client.user.username}`);
  require('./functions/setStatus.js')(client);
});

client.on("message", (msg) => {
  if (msg.author.bot) return;
  if (!msg.guild) return;
  if (!msg.content.startsWith(client.prefix)) return;
  if (msg.channel.name != "bot-chat") return;

  const commandName = msg.content
    .split(" ")[0]
    .replace(client.prefix, "")
    .toLowerCase();

  const args = msg.content.split(" ");
  args.splice(0, 1);

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return commandNotFoundError(msg, commandName);
  command.run(msg, args);
});

client.on('messageReactionAdd', (reactOrig, user) => {
  if (reactOrig.message.channel.name == "counting") {
    require('./countingFUps.js').checkCountMessedUp(reactOrig, user);
  }
  
  if (!client.triviaGameStarted) return;
  if (reactOrig.me) return;
  if (reactOrig.message.channel.name != 'bot-chat') return

  triviaLogic.triviaReactionHandler(reactOrig, user);
})

function loadCommands() {
  client.commands = new Discord.Collection();

  const commandFileNames = fs.readdirSync("./commands").filter((file) => {
    return file.endsWith(".js");
  });

  commandFileNames.forEach((file) => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
  });
}

function commandNotFoundError(msg, commandName) {
  msg.reply(`Sorry, the command with the name "${commandName}" could not be found, 
  try using the ${client.prefix}help command for help with this`);
}

client.login(process.env.BOT_TOKEN);
