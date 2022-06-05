
const APP_ID = "XXXXXXXXXXX";  // App ID
const BOT_TOKEN = "XXXXXXXXX"; // Bot token
const THIS_GUILD_ID = "XXXX";  // Server ID

const ChannelCfg = {
	Test: "XXXXXX", // channel ID (Test)
	Rules: "XXXXXX", // channel ID (Rules)
	Welcome: "XXXXXX", // channel ID (Welcome)
	ApplyFor: "XXXXXX", // channel ID (Register)
}
const RoleCfg = {
	Food: "XXXXXX", // role1 ID
	Wanted: "XXXXXX", // role2 ID
}

const Discord = require('discord.js');
const discordClient = new Discord.Client();

discordClient.login(BOT_TOKEN);

var theChannel;
var theSelf;
//==================
// Discord Client Config
discordClient.on('ready', () => {
    console.log("==================================");
	console.log("Start Hotpot Spoon.");

	// init
	getGuild( (guild) => {
		guild.me.setNickname("小精靈角角");
	});
});

discordClient.on('guildMemberAdd', member => {
	getChannel(ChannelCfg.Welcome, (ch) => {
		ch.send(getWelcomeMessage(member.user));
	});
	getRole(RoleCfg.Food, (role)=>{
		member.roles.add(role);
	});
});
discordClient.on('guildMemberRemove', member => {
	getChannel(ChannelCfg.Test, (ch) => {
		ch.send(getGoodbyeMessage(member.user.username));
	});
});



discordClient.on('message', message => {
	//	console.log(message.content);
	if(!message || !message.author) return ;
	if(message.author.id==APP_ID) return ;

	// Warning Message
	var channel = message.channel;
	var match = message.content.match(/(大\\?大|大\\?佬|萌\\?新|巨\\?巨|巨\\?佬)/);
	if(match){
		channel.send(`${message.author}……這個食材……不可以說${match[1]}……！`);
		return ;
	}

	// Gacha
	gacha(message);

	// Apply For
	AutoFulfillApply(message);

});


//========================
// Main Task
function AutoFulfillApply(message){
	if(message.channel.id != ChannelCfg.ApplyFor ) return ;
	if(message.content.indexOf("+1") == -1) return ;

	getRole(RoleCfg.Wanted, (role)=>{
		message.guild.members.cache.get(message.author.id).roles.add(role);
	});
}

//========================
// Message
function getWelcomeMessage(user){
	return `${user} 嗨～你現在也是食材了，記得去 <#${ChannelCfg.Rules}>。 看看喔！
在這裡不用擔心自己是新手或誰是玩很久，也不用擔心資歷，我們不使用大大和萌新，大家都是 <@!593058040719343646> 的食……啊，一起玩PbtA的好夥伴！然後在 <#${ChannelCfg.Welcome}> 這邊可以自我介紹～
另外 可以去 <#${ChannelCfg.ApplyFor}> 喊一下+1
那邊正在發通知身份組 有那個的話之後有開團就會收到通知 :partying_face:`;
}
function getGoodbyeMessage(userName){
	return `${userName}離開了... TAT`;
}

//========================
// Gacha feature
var botGachaStatus = 0;
function gacha(message){
	var gacha_match;
    switch(botGachaStatus){
        case 1: gacha_match = message.content.match(/這邊有\\三角形喔～！/); break;
        case 2: gacha_match = message.content.match(/這邊有三角形喔～\\！/); break;
        case 3: gacha_match = message.content.match(/這邊\\有三角形喔～！/); break;
        case 0:
        default:
            gacha_match = message.content.match(/\\這邊有三角形喔～！/); break;
    }
	if(gacha_match){
		var res_msg = randArr(gacha_message);
		var res_img_src = randArr(gacha_img);
		res_msg = res_msg.replace("@", message.author);

		channel.send(res_msg+"\n"+res_img_src);
	}
}
var gacha_message = [
    "@，送你這個三角形，可以跟我跑一次團嗎？",
    "@，不知道爺爺有沒有在看我帶團呢？",
    "@，名字寫作三角形的三角，日文寫成パワー　バイ　ザ　アポカリプス喔。",
    "@，也要來跑團嗎？",
    "@，好想快點跟大家一起跑團啊～～",
    "啊，@，那個三角形是……！",
    "@，這次團務……不是三角形的……！",
    "@，今天的團務有很多三角，我很喜歡！"
];
var gacha_img = [
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1500207040002.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/1541321612001.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1503726305005.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/1541320220002.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1537532622007.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1531743370010.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/1532092269002.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1536492726001.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/1559607302.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1576934093006.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/1576934093003.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1583318938.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/1583319286.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/577991/20200417121011CcB2alhQ.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/577991/20200601113829vtNGig51.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/1510986103.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1522504887001.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1521555128001.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/1521555128002.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/1521894527003.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1528014284001.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1529153376004.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/1529153376002.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1536750748001.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1539653191012.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/1539653191007.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1547205244002.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/1551862266.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1561971397.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1570189051001.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/1570515487.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1578828354005.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1493725902.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1516447446.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1539856475003.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/1540614977.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1549626421003.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1552922596.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1562827026.jpg",
	"https://cdn.img-conv.gamerch.com/img.gamerch.com/a3-game/wikidb_img/1594033195.jpg"
];

//========================
function getGuild(callback){
	discordClient.guilds.fetch(THIS_GUILD_ID).then( callback );
}
function getChannel(ch_id, callback){
	discordClient.channels.fetch(ch_id).then( callback );
}
function getRole(role_id, callback){
	getGuild( (guild)=>{ guild.roles.fetch(role_id).then( callback ); } );
}

//========================
function randArr(arr){
	return arr[randInt(arr.length)];
}
function randInt(num){
    return Math.floor(Math.random() * num);
}
