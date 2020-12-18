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
  if(old_m.member.id==bot.user.id){
    return
  }
  console.log(new_m.member.user)
  return
  let oldCannel=old_m.channel
  let newChannel=new_m.channel
  if(oldCannel==null&&newChannel!=null){
    console.log("someone joined in channel"+ newChannel.name)
    let connection=await newChannel.join()
    setTimeout(()=>{
      let hallospeech=connection.play("./Hallo.mp3")
      hallospeech.on("speaking",speaking=>{
    
        console.log("test")
            if(!speaking){
        connection.play(discordTTS.getVoiceStream(new_m.member.displayName,"de-DE"))
              
            }
      })
      
    },1500)
  }else if(newChannel==null){
    console.log("someone left channel"+oldCannel.name)
  }else{
    console.log("someone switched to channel"+ newChannel.name)
    let connection=await newChannel.join()
     setTimeout(()=>{
        let hallospeech=connection.play("./Hallo.mp3")
      hallospeech.on("speaking",speaking=>{
        console.log("test")
        if(!speaking){
        connection.play(discordTTS.getVoiceStream(new_m.member.displayName,"de-DE"))
          
        }
      })
      
     },1500)
  }
})