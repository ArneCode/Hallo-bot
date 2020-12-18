const Discord = require('discord.js');
const discordTTS=require("discord-tts");// text to speech for discord
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
			connection.play('./audio/Hallo.mp3');
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
  if(old_m.member.id==bot.user.id){
    return
  }

  let oldCannel=old_m.channel
  let newChannel=new_m.channel
  if(newChannel!=null){
    let connection=await newChannel.join()
    setTimeout(()=>{
      let hallospeech=connection.play("./audio/Tschuess.mp3")
      hallospeech.on("speaking",speaking=>{
        if(!speaking){
          //Hallo file has finished playing
          let dispatcher=connection.play(discordTTS.getVoiceStream(new_m.member.displayName,"de-DE",2))
          dispatcher.on("speaking",speaking=>{
            if(!speaking){
              connection.disconnect()
            }
          })
        }
      })
    },1500)
  }else{
    let connection=await newChannel.join()
    setTimeout(()=>{
      let hallospeech=connection.play("./Hallo.mp3")
      hallospeech.on("speaking",speaking=>{
        if(!speaking){
          //Hallo file has finished playing
          let dispatcher=connection.play(discordTTS.getVoiceStream(new_m.member.displayName,"de-DE",2))
          dispatcher.on("speaking",speaking=>{
            if(!speaking){
              connection.disconnect()
            }
          })
        }
      })
    },1500)
  }
  
})