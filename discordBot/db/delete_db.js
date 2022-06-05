
var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "discordbot",
	password: "discord",
	database: "discord_chatlog"
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});
con.query('DELETE FROM Logs',function(error){
	if(error) throw error;
	con.end();
});

