module.exports = {
  name: "ping",
  description: "Gives you the bot's current ping",
  run(msg, args) {
    msg.reply("Current Ping: " + Math.floor(msg.client.ws.ping));
  },
};
