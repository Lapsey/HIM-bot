module.exports = {
  name: "setprefix",
  description:
    "Changes the prefix needed before commands \n to use: type the setprefix command followed by a space followed by the new prefix",
  aliases: ["sp"],
  run(msg, args) {
    msg.client.prefix = args[0];
    msg.channel.send(`The command prefix has been changed to ${args[0]}`);
    require('../functions/setStatus.js')(msg.client);
  },
};
