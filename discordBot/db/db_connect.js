

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
/*
	var data = {
		date: new Date(),
		uid: "137776984909545472",
		content: "================"
	};
	con.query('INSERT INTO Logs SET ?', data, function(err){
		if (err) throw err;
	});
*/

var date = new Date();
date.setDate(date.getDate()-7);
con.query('SELECT * FROM Logs WHERE date > ?',date,function(error, rows, fields){
	if(error) throw error;
//	console.log(rows);

//	console.log(rows);
//	console.log(JSON.stringify(rows));

	con.end(); 
});

con.query('SELECT COUNT(*) FROM Logs', function(err, rows, fields){
	console.log(rows[0]["COUNT(*)"]);
});

