const userIsMod = require("../functions/userIsMod")

module.exports = {
    name: "shadowrealm",
    description: "Sends the mentioned user to the shadow realm NOTE: MUST HAVE MOD ROLE",
    run(msg, args) {
        if (userIsMod(msg)) {
            if (args.length < 1) return msg.reply('wrong number of arguments');
            const person = msg.mentions.members.first();
            person.roles.remove(person.roles.cache)
            const shadowrealmRole = msg.guild.roles.cache.find(role => role.name === "Time Out"); 
            person.roles.add(shadowrealmRole);
        } else {
            msg.reply('You are not a MOD');
        }
    }
}