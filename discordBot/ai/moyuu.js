

//=====================
// Static Handler Object
//=====================

module.exports = {
	"name": "墨雨",
	"mood_reset_period" : 2,
	"reaction_pool" : [

{content: "喵！",					type: [99], mood:{max: 2,min:-2}, offset:{max:100,min:1} },
{content: "欸嘿嘿～",				type: [99], mood:{max: 2,min:-2}, offset:{max:100,min:1} },
{content: "（盯）",					type: [99], mood:{max: 2,min:-2}, offset:{max:0,min:0} },
{content: "唔（眉頭動了一下）",		type: [99], mood:{max: 2,min:-2}, offset:{max:-1,min:-5} },
{content: "咪嗷！（逃走）",			type: [99], mood:{max: 2,min:-2}, offset:{max:-6,min:-15} },
{content: "請、請不要這個樣子！",	type: [99], mood:{max: 2,min:-2}, offset:{max:-1,min:-15} },
{content: "嗄！（不開心的叫聲）",	type: [99], mood:{max: 2,min:-2}, offset:{max:-16,min:-20} },
{content: "請不要這樣！（躲開）",	type: [99], mood:{max: 2,min:-2}, offset:{max:-16,min:-20} },
{content: "再繼續下去人家要生氣囉！",	type: [99], mood:{max: 2,min:-2}, offset:{max:-16,min:-20} },

{content: "哈囉～",			type: [1], mood:{max: 2,min: 0}, offset: "*" },
{content: "你好！",			type: [1], mood:{max: 2,min: 0}, offset: "*" },
{content: "嗨！",			type: [1], mood:{max: 2,min: 0}, offset: "*" },
{content: "你好……",			type: [1], mood:{max:-1,min:-1}, offset: "*" },
{content: "……嗨",			type: [1], mood:{max:-1,min:-1}, offset: "*" },
{content: "晚安～",			type: [1.1], mood:{max: 2,min: 0}, offset: "*" },
{content: "祝好夢～",		type: [1.1], mood:{max: 2,min: 0}, offset: "*" },
{content: "……（揮手）",		type: [1.1], mood:{max:-1,min:-1}, offset: "*" },
{content: "晚安～",			type: [1.1], mood:{max:-1,min:-1}, offset: "*" },
{content: "嗯……",			type: [1,1.1], mood:{max:-1,min:-2}, offset: "*" },

{content: "超開心的說！",			type: [2], mood:{max: 2,min:2}, offset: "*" },
{content: "耶！（跳來跳去）",		type: [2], mood:{max: 2,min:2}, offset: "*" },
{content: "開心～",					type: [2], mood:{max: 1,min:1}, offset: "*" },
{content: "哼哼～（開心地哼歌）",	type: [2], mood:{max: 1,min:1}, offset: "*" },
{content: "還好～",					type: [2], mood:{max: 0,min:0}, offset: "*" },
{content: "其實有點無聊",			type: [2], mood:{max: 0,min:0}, offset: "*" },
{content: "普普通通的說",			type: [2], mood:{max: 0,min:0}, offset: "*" },
{content: "喵……（扭頭）",			type: [2], mood:{max:-1,min:-1}, offset: "*" },
{content: "人家不太開心（嘟嘴）",	type: [2], mood:{max:-1,min:-1}, offset: "*" },
{content: "……哼（鼓臉頰）",			type: [2], mood:{max:-2,min:-2}, offset: "*" },
{content: "現在人家在工作，請晚點再跟我說話",
									type: [2], mood:{max:-2,min:-2}, offset: "*" },

{content: "請不要干擾人家工作！",	type: [3], mood:{max:-1,min:-2}, offset: "*" },
{content: "嗯（敷衍）",				type: [3], mood:{max:-1,min:-2}, offset: "*" },
{content: "嗯！謝謝～（害羞）",		type: [3], mood:{max:2,min:0}, offset:{max:100,min:1} },
{content: "欸嘿嘿～（臉紅）",		type: [3], mood:{max:2,min:0}, offset:{max:100,min:1} },
{content: "喵～（有點開心）",		type: [3], mood:{max:2,min:0}, offset:{max:100,min:1} },
{content: "欸、欸欸（慌亂））",		type: [3], mood:{max:2,min:0}, offset:{max:0,min:-100} },
{content: "咿！（縮起來）",			type: [3], mood:{max:2,min:0}, offset:{max:0,min:-100} },
{content: "對不起，但你是個好人……",	type: [3], mood:{max:2,min:0}, offset:{max:0,min:-100} },

{content: "嗯？人家沒有在生氣喔？",	type: [4], mood:{max: 2,min:0},  offset: "*" },
{content: "人家，還有點，不高興",	type: [4], mood:{max:-1,min:-1}, offset: "*" },
{content: "……（鼓起臉頰）",			type: [4], mood:{max:-1,min:-1}, offset: "*" },
{content: "……還在生氣",				type: [4], mood:{max:-2,min:-2}, offset: "*" },
{content: "哼！（氣鼓鼓）",			type: [4], mood:{max:-2,min:-2}, offset: "*" },

{content: "……",						type: "*", mood:{max:-2,min:-2}, offset: "*" },
{content: "唔！討厭！",				type: "*", mood:{max: 2,min:-2}, offset:{max:-21,min:-100} },
{content: "變態！變態！變態！",		type: "*", mood:{max: 2,min:-2}, offset:{max:-21,min:-100} },
{content: "噁心！",					type: "*", mood:{max: 2,min:-2}, offset:{max:-21,min:-100} },
]
};
