const Discord = require('discord.js');
const discordTTS = require('discord-tts'); // text to speech for discord
require('@discordjs/opus');
const bot = new Discord.Client();
const token = process.env.BOT_TOKEN;
bot.login(token);
bot.on('guildMemberAdd', async member => {
	console.log(member);
	let connection = await member.voice.channel.join();
	connection.play('./Hallo.mp3');
});
let enabled=true
bot.on('message', async msg => {
	try {
		//console.log(msg);
		if(!enabled){
		  if(RegExp(/hallo enable/i).test(msg.content)){
		  enabled=true
		  msg.channel.send("I am now active")
		}
		console.log("returning, because I am not enabled")
		return
		}
		if(RegExp(/hallo disable/i).test(msg.content.toLowerCase())){
		  enabled=false
		   msg.channel.send("I am now not active anymore")
		}
		if (
			['hallo', 'hi', 'guten tag', 'moin', 'hello', 'servus'].includes(
				msg.content.toLowerCase()
			) &&
			msg.author.id != bot.user.id
		) {
			console.log(msg.content);
			msg.channel.send('HALLO');
			if (msg.member.voice.channel) {
				let connection = await msg.member.voice.channel.join();
				let hallospeech = connection.play('./audio/Hallo.mp3');
				hallospeech.on('speaking', speaking => {
					if (!speaking) {
						connection.disconnect();
					}
				});
			}
		}
	} catch (err) {
		console.log(err.stack);
	}
});
bot.on('ready', () => {
	console.log('ready');
});
bot.on('voiceStateUpdate', async (old_m, new_m) => {
  if(!enabled){
    return
  }
	try {
		if (old_m.member.id == bot.user.id) {
			return;
		}

		let oldChannel = old_m.channel;
		let newChannel = new_m.channel;
		if (newChannel != null && oldChannel == null) {
		  console.log(`${new_m.member.displayName} joined ${newChannel}. HALLO!`)
			let connection = await newChannel.join();
			setTimeout(() => {
				let hallospeech = connection.play('./audio/Hallo.mp3');
				hallospeech.on('speaking', speaking => {
					if (!speaking) {
						//Hallo file has finished playing
						let dispatcher = connection.play(
							discordTTS.getVoiceStream(new_m.member.displayName, 'de-DE', 2)
						);
						dispatcher.on('speaking', speaking => {
							if (!speaking) {
								connection.disconnect();
							}
						});
					}
				});
			}, 1500);
		} else if (newChannel == null && oldChannel != null) {
		   console.log(`${old_m.member.displayName} left ${oldChannel}. Tschüss!`)
			let connection = await oldChannel.join();
			setTimeout(() => {
				let hallospeech = connection.play('./audio/Tschuess.mp3');
				hallospeech.on('speaking', speaking => {
					if (!speaking) {
						//Hallo file has finished playing
						let dispatcher = connection.play(
							discordTTS.getVoiceStream(old_m.member.displayName, 'de-DE', 2)
						);
						dispatcher.on('speaking', speaking => {
							if (!speaking) {
								connection.disconnect();
							}
						});
					}
				});
			}, 1500);
		}
	} catch (err) {
		console.log(err);
	}
});
