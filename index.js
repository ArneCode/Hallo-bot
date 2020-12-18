const Discord = require('discord.js');
require("@discordjs/opus")
const bot = new Discord.Client();
const token = process.env.BOT_TOKEN;
bot.login(token);
bot.on('guildMemberAdd', async member => {
	console.log(member);
	let connection = await member.voice.channel.join();
	connection.play('./Hallo.mp3');
});
bot.on('message', async msg => {
  
	//console.log(msg);
	if (msg.content.toLowerCase() == 'hallo'&&msg.author.id!=bot.user.id) {
	  console.log(msg.content)
	  msg.channel.send("HALLO")
		if (msg.member.voice.channel) {
			let connection = await msg.member.voice.channel.join();
			connection.play('./Hallo.mp3');
		}
	}
});
bot.on('ready', () => {
	console.log('ready');
});
