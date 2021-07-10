const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'userinfo',
	description: 'Gets the info of the mentioned user',
	run(message, args) {
		let user;
		if (message.mentions.users.first()) {
			user = message.mentions.users.first();
			useralso = message.mentions.users.first();
		} else {
			user = message.author;
			useralso = message.member;
			//i made useralso so it shows nickname correctly
		}
		const userStatus = {
			online: 'Online',
			idle: 'Idle/Inactive',
			dnd: 'Busy/Do Not Disturb',
			offline: 'Unavailable/Offline',
		};
		const mememb = message.guild.member(user);
		Promise.resolve(mememb).then(function () {
			var presence = user.presence.activities.length
				? user.presence.activities.filter((x) => x.type === 'PLAYING')
				: null;
			const memberemb = message.guild.members.fetch(user);
			Promise.resolve(memberemb).then(function (info) {
				var roles = info.roles.cache.map((roles) => `${roles}`).join(', ');
				roles = roles.slice(0, -9);
				const embed = new MessageEmbed()
					.setColor('GREEN')
					.setThumbnail(message.author.avatarURL)
					.addField(`${user.tag}`, `${user}`, true)
					.addField('ID:', `${user.id}`, true)
					.addField('Nickname:', `${useralso.nickname ? `${useralso.nickname}` : 'None'}`, true)
					.addField('Status:', `${userStatus[user.presence.status]}`, true)
					.addField('Game:', `${presence && presence.length ? presence[0].name : 'None'}`, true)
					.addField('Roles:', info.roles.cache ? roles : 'None', true)
					.setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`);
				message.channel.send({ embed });
			});
		});
	},
};
