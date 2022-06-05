
const fs = require('fs');
const https = require('https');

const Discord = require('discord.js');
const discordClient = new Discord.Client();

const WebSocketServer = require('ws').Server;
const WebSocket = require('ws');

const bot_ai   = require('./ai/moyuu');
const bot_body = require('./ai/generalBot');

var PORT, CERT_PATH, INTERACT_CHANNEL, THIS_ID;

function ChatTransmit(port, cert_path, channel_id, app_id, is_debug){
	var CT = this;

	// Initialize
	{
		PORT = port;
		CERT_PATH = cert_path;
		INTERACT_CHANNEL = channel_id;
//		INTERACT_CHANNEL_WEBHOOK = channel_webhook;
		THIS_ID = app_id;
		bot = new bot_body.construct(THIS_ID, is_debug, bot_ai);

		discordClient.login('XXXXXXX');
	}
}
exports.start = ChatTransmit;

var wss, theChannel, bot;
//====================================================
// Functions
var banned_list = [];
function command(message){
	var command_arr=null;

	// Ban
	if(null!=(command_arr=message.content.match(/^\\ban (.*)/))){
		if( !isRoleManagar( message.member.roles ) ) return ;
		var name = command_arr[1];
		if(banned_list.includes(name)){
			theChannel.send("這個人已經在黑名單上囉～");
		}
		else{
			banned_list.push(name);
			theChannel.send("收到！不會再傳送["+name+"]的話了！");
		}
	}
	// Un-Ban
	if(null!=(command_arr=message.content.match(/^\\unban (.*)/))){
		if( !isRoleManagar( message.member.roles ) ) return ;
                var name = command_arr[1];
                var idx = banned_list.indexOf(name);
		if(idx!=-1){
			banned_list.splice(idx,1);
                        theChannel.send("["+name+"]刑期解除～");
                }
        }
	
	// Show Banned List
	if(null!=(command_arr=message.content.match(/^\\banlist/))){
		var msg = "";
		banned_list.forEach(function(name){
			msg += name+",";
		});
		theChannel.send("轉發封鎖名單："+msg);
	}


}

function isRoleManagar(roles){
	if(roles.find("name", "Admin") || roles.find("name", "管理員") || roles.find("name", "輔導員")) return true;
	return false;
}

function fetchRecord(callback){
	theChannel.fetchMessages({limit: 50})
	.then(function(log){
		callback( JSON.stringify( parseMessages( log.array() ) ) );
	});

}
function broadcastMessage(message){
	wss.clients.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(message);
		}
	});
}

function parseMessages(messages){
	if(!Array.isArray(messages)) return [];
	var arr = [];
	for(var i=messages.length-1;i>=0;i--) arr.push(getMessageFormat(messages[i]));
	return arr;
}
function getMessageFormat(message){
	var msg_format = {};

//	console.log(message.author);

	msg_format["date"] =  new Date();
	msg_format["user_id"] = (message.author)? message.author.id: "";
	msg_format["username"] = (message.author)? message.author.username: "";
	msg_format["avatar"] = (message.author)? message.author.avatarURL: "";
	msg_format["content"] = message.content;
	msg_format["attachment"] = [];

	// replace to user nickname
	if(message.member!=null && message.member.nickname!=null)
		 msg_format["username"] = message.member.nickname;
	// handle mention
	var mentions = (message.mentions.users).array();
	for(var i=0;i<mentions.length;i++){
		var pattern = new RegExp("<@\!?"+mentions[i].id+">", 'g');
		var name = mentions[i].username;
		msg_format["content"] = msg_format["content"].replace( pattern, ("@"+name) );
	}
	// handle Emoji
	var emojies = discordClient.emojis.array();
	for(var i=0;i<emojies.length;i++){
		var pattern = new RegExp("<:"+emojies[i].name+":"+emojies[i].id+">", 'g');
		msg_format["content"] = msg_format["content"].replace( pattern, (":"+emojies[i].name+":") );;
	}

	// append attachment
	var attachments = (message.attachments).array();
	for(var i=0;i<attachments.length;i++){
		msg_format["attachment"].push( attachments[i].url );
	}

	return msg_format;
}

function actingSpeak(msg_obj){
	var username = msg_obj["username"];
	var content = msg_obj["content"];

	// parse Emoji
//	var emojis = discordClient.emojis.array();
//	for(var i=0;i<emojis.length;i++){
		
//	}
/*
	var data = {"content":content, "username":username, "avatar_url":msg_obj["avatar"]};
	var options = {
		hostname: 'discordapp.com',
		path: INTERACT_CHANNEL_WEBHOOK,
		method: 'POST',
		headers: { 'Content-Type': 'application/json', }
	};
	var req = https.request(options, null);
	req.on('error', (e) => {  console.error(`problem with request: ${e.message}`);});
	req.write(JSON.stringify(data));
	req.end();
*/
	if(!banned_list.includes(username))	theChannel.send("["+username+"]： "+content);
}


//==================
// Discord Client Config
discordClient.on('ready', () => {
	var date = new Date();
	console.log("==================================");
	console.log(date);

	theChannel = discordClient.channels.get(INTERACT_CHANNEL);

	// Setting websocket
	var privateKey  = fs.readFileSync(CERT_PATH+"privkey.pem",  'utf8');
	var certificate = fs.readFileSync(CERT_PATH+"fullchain.pem", 'utf8');
	var credentials = {
		key: privateKey, 
		cert: certificate
	};

	var httpsServer = https.createServer(credentials);
	httpsServer.listen( PORT );

	wss = new WebSocketServer({ server: httpsServer });
	wss.on('connection', wss_onConnection );
});
discordClient.on('message', message => {
	// Lock in this channel
	if(message.channel.id!=INTERACT_CHANNEL) return ;

	// Command
	command(message);

	// Get Message Format
	var msg = getMessageFormat(message);
	// Broadcast
	broadcastMessage(JSON.stringify(msg));
	// Other entertainment
	bot.react(message);

});

	//==================
	// WebSocket Server Config
	function wss_onConnection(ws) {
		//console.log("OAO");

		ws.on('message', function incoming(message) {
			message = JSON.parse(message);
			if(message["type"]=="custom_message"){
				actingSpeak(message);
			}
			if(message["type"]=="CT_talk"){
				theChannel.send(message["content"]);
			}
			if(message["type"]=="CLEAR_THIS_FUCKING_MESSAGE"){
/*				theChannel.fetchMessages({limit: parseInt(message["number"]) })
				.then(function(log){
					var msg_arr = log.array();
					for(var i=0;i<msg_arr.length;i++)	msg_arr[i].delete();
				});
*/
			}
		});
		fetchRecord(function(string){
			ws.send(string);
		});
	}




