module.exports = function userIsMod(msg) {
    const modRole = msg.guild.roles.cache.find(role => role.name === "Mod");
    return msg.member._roles.includes(modRole.id);
}