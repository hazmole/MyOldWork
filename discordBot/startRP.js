
const APP_ID = "XXXXXXXXXXXX"; // App ID
const BOT_TOKEN = "XXXXXXXXXXX"; // Bot Token

const _ADMIN_CH = "XXXXX"; // Channel ID
const ANNOUNCE_CH = "XXXXX"; // Channel ID

const Discord = require('discord.js');
const discordClient = new Discord.Client();

discordClient.login(BOT_TOKEN);

var theChannel;

//==================
// Discord Client Config
discordClient.on('ready', () => {
        console.log("==================================");
	console.log("Start Reporter.");

	theChannel = discordClient.channels.get(ANNOUNCE_CH);
});

discordClient.on('message', message => {
	var date = new Date();
	var channel = message.channel;
	var match = message.content.match(/^\\report( [^ ]*)?( ((.|\n)*))?/);

	// console.log(channel.id);
	if(match==null) return ;
	if(match && (match[1]==null || match[3]==null)){
		channel.send("正確的檢舉格式如下：\n \\report 檢舉對象 發生頻道 檢舉理由");
		return ;
	}	

	var reply_string = "檢舉已經受理，管理群將會盡速處理！\n";
	channel.send(reply_string);
	
	var string = date+"\n";
	string += " 檢舉人："+message.author+"\n";
	string += " 目標："+match[1]+"\n";
	string += " 理由："+match[3]+"\n";
	theChannel.send(string);
});

