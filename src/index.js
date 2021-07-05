const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

client.once('ready', () => {
    console.log(`Bot logged in as ${client.user.username}`);
});

client.login(process.env.BOT_TOKEN);