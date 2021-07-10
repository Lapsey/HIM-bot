module.exports = function setStatus(client) {
  client.user.setActivity(`${client.prefix}help in bot-chat`, { type: "LISTENING" });
}