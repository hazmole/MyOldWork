
//=====================
// Static Handler Object
//=====================
function GeneralBot(app_id, is_debug, ai){

	var bot = this;

	bot.ai = ai;
	bot.id = 0;
	bot.name = "generalBot";
	bot.mood = 0;
	bot.mood_reset_period = 2;
	bot.last_active_date = new Date();
	bot.is_debug = is_debug;

	bot.react = function(message){

		// The Only one Mentioned
		if( !message.mentions.users.has(bot.id) || message.mentions.users.array().length!=1 ) return;
		if( message.author.id==bot.id && message.content.match(/^\[/)==null ) return;

		return ;

		//========================================
		// Mood Reset
		// if active time over 2 hour, reset mood
		var l_date = new Date();
		var time_diff = ( l_date.getTime() - bot.last_active_date.getTime() ) / (1000*3600);
		while( time_diff > 2){ 
			multiMood(0.5);
			time_diff -= 2;
		}
		bot.last_active_date = l_date;

		//========================================
		// Detect Content
	    	var content = message.content;
		var motion_type   = detectMotion( content );
		var sentence_type = detectSentence( content );
		if(sentence_type==0 && motion_type>0) sentence_type=99;		

		//========================================
		// Change Mood
		var mood_offset = getMoodOffsetByContent(sentence_type, motion_type);
		changeMood(mood_offset);
		var mood_status = getMoodStatus();
	
		//========================================
		// React Message
		var reaction_array = [];
		bot.ai.reaction_pool.forEach( (react)=>{
			// sentence_constrain
			if(react.type!="*" && !react.type.includes(sentence_type))		return false;
			// mood_constrain
			if(react.mood.min > mood_status || react.mood.max < mood_status)	return false;
			// /mood_change_constrain
			if(react.offset!="*" && (react.offset.min > mood_offset || react.offset.max < mood_offset)) return false;

			reaction_array.push(react.content);
		});

		if(reaction_array.length > 0){
			var text = reaction_array[ randInt(reaction_array.length) ];
			message.reply(text);
		}
	}

	function getMoodOffsetByContent(sentence_type, motion_type){
		var offset=0;
		// Mood Change
		switch(sentence_type){
			case 1:
			case 1.1:	offset += 1;break;
			case 3:		offset += randInt(11)-5;break;
			case 4:		offset += randInt(3)-1;break;
			case 100:	offset += 20;break;
		}	
		switch(motion_type){
			case 1:	  	offset += randInt(11)-5;break;
			case 1.5: 	offset += randInt(11)-5;break;
			case 2:	  	offset += randInt(11)-8;break;
			case 3:		offset += randInt(10)-20;break;
			case 4:		offset += -50; break;	
		}
		return offset;
	}


	function detectSentence( content ){
                if( content.match(/(喜歡|愛)[你妳]/))	return 3;
                if( content.match(/(今天|現在|心情|感覺)(如何|還好|怎(麼)?樣)(嗎|呢)?/))	return 2
                if( content.match(/((還?在|不)生氣|氣消)了?[嗎\?？]/))	return 4
		if( content.match(/([你妳]好)|([早午]安)/))	return 1;
		if( content.match(/晚安/))			return 1.1;
//		if( content.match(/小墨雨最最最可愛了！$/))	return 100;
//		if( content.match(/(今天|剛剛|最近)?發生什麼事了嗎/))			return 1.1;

		return 0;
	}
	function detectMotion( content ){
		var motion = content.match(/[\(（]([^\)]+)[\)）]?$/);
		if(motion==null)	return -1;
		motion = motion[1];
		
		if( motion.match(/摸頭$/))   		return 1;
		if( motion.match(/蹭$/))   		return 1.5;
		if( motion.match(/抱(緊|好|著)?$/))   	return 2;
		if( motion.match(/親+(嘴|臉)?$/))   	return 3;
		if( motion.match(/舔/))   		return 4;
		return 0;	
	}

	//========================
	// Mood Functions
	//========================
	function getMoodStatus(){
		var mood = bot.mood;
		if(mood >= 60)		return 2;
		else if(mood >= 20) 	return 1;
		else if(mood >=-20)	return 0;
		else if(mood >=-40) 	return -1;
		else			return -2;
	}
	function changeMood(offset){
		if(offset!=0) setMood(bot.mood + offset);
	}
	function multiMood(arg){
		if(arg!=1) setMood(bot.mood * arg);
	}
	function setMood(value){
		bot.mood = value;
		// limited mood
		if(bot.mood > 100) bot.mood = 100;
		if(bot.mood <-100) bot.mood =-100;
	}

	//=================
	// Support
	function randInt(num){
		return Math.floor(Math.random() * num);
	}

	// Initialize
	{
		bot.id = app_id;
		bot.name = bot.ai.name;
		bot.mood_reset_period = bot.ai.mood_reset_period;
		console.log("ID registered: "+app_id);
	}
}

exports.construct = GeneralBot;
