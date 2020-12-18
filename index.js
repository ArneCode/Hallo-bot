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
  try{
	//console.log(msg);
	if (msg.content.toLowerCase() == 'hallo'&&msg.author.id!=bot.user.id) {
	  console.log(msg.content)
	  msg.channel.send("HALLO")
		if (msg.member.voice.channel) {
			let connection = await msg.member.voice.channel.join();
			connection.play('./Hallo.mp3');
		}
	}
}catch(err){
  msg.channel.send(err.stack)
}
  
});
bot.on('ready', () => {
	console.log('ready');
});
bot.on("voiceStateUpdate",async (old_m,new_m)=>{
  let newVoice=new_m.voiceChannel
  console.log(newVoice)
})