// Handles most checking and also logging of commands
const fs = require("fs");
const math = require("./math.js");
const config = require("./config.js");

var iso=["aa","ab","ae","af","ak","am","an","ar","as","av","ay","az","ba","be","bg","bh","bi","bm","bn","bo","br","bs","ca","ce","ch","co","cr","cs","cu","cv","cy","da","de","dv","dz","ee","el","en","eo","es","et","eu","fa","ff","fi","fj","fo","fr","fy","ga","gd","gl","gn","gu","gv","ha","he","hi","ho","hr","ht","hu","hy","hz","ia","id","ie","ig","ii","ik","io","is","it","iu","ja","jv","ka","kg","ki","kj","kk","kl","km","kn","ko","kr","ks","ku","kv","kw","ky","la","lb","lg","li","ln","lo","lt","lu","lv","mg","mh","mi","mk","ml","mn","mr","ms","mt","my","na","nb","nd","ne","ng","nl","nn","no","nr","nv","ny","oc","oj","om","or","os","pa","pi","pl","ps","pt","qu","rm","rn","ro","ru","rw","sa","sc","sd","se","sg","si","sk","sl","sm","sn","so","sq","sr","ss","st","su","sv","sw","ta","te","tg","th","ti","tk","tl","tn","to","tr","ts","tt","tw","ty","ug","uk","ur","uz","ve","vi","vo","wa","wo","xh","yi","yo","za","zh","zu"],iso2={"\ufeffaar":"aa",abk:"ab",afr:"af",aka:"ak",alb:"sq",amh:"am",ara:"ar",arg:"an",arm:"hy",asm:"as",ava:"av",ave:"ae",aym:"ay",aze:"az",bak:"ba",bam:"bm",baq:"eu",bel:"be",ben:"bn",bih:"bh",bis:"bi",bos:"bs",bre:"br",bul:"bg",bur:"my",cat:"ca",cha:"ch",che:"ce",chi:"zh",chu:"cu",chv:"cv",cor:"kw",cos:"co",cre:"cr",cze:"cs",dan:"da",div:"dv",dut:"nl",dzo:"dz",eng:"en",epo:"eo",est:"et",ewe:"ee",fao:"fo",fij:"fj",fin:"fi",fre:"fr",fry:"fy",ful:"ff",geo:"ka",ger:"de",gla:"gd",gle:"ga",glg:"gl",glv:"gv",gre:"el",grn:"gn",guj:"gu",hat:"ht",hau:"ha",heb:"he",her:"hz",hin:"hi",hmo:"ho",hrv:"hr",hun:"hu",ibo:"ig",ice:"is",ido:"io",iii:"ii",iku:"iu",ile:"ie",ina:"ia",ind:"id",ipk:"ik",ita:"it",jav:"jv",jpn:"ja",kal:"kl",kan:"kn",kas:"ks",kau:"kr",kaz:"kk",khm:"km",kik:"ki",kin:"rw",kir:"ky",kom:"kv",kon:"kg",kor:"ko",kua:"kj",kur:"ku",lao:"lo",lat:"la",lav:"lv",lim:"li",lin:"ln",lit:"lt",ltz:"lb",lub:"lu",lug:"lg",mac:"mk",mah:"mh",mal:"ml",mao:"mi",mar:"mr",may:"ms",mlg:"mg",mlt:"mt",mon:"mn",nau:"na",nav:"nv",nbl:"nr",nde:"nd",ndo:"ng",nep:"ne",nno:"nn",nob:"nb",nor:"no",nya:"ny",oci:"oc",oji:"oj",ori:"or",orm:"om",oss:"os",pan:"pa",per:"fa",pli:"pi",pol:"pl",por:"pt",pus:"ps",que:"qu",roh:"rm",rum:"ro",run:"rn",rus:"ru",sag:"sg",san:"sa",sin:"si",slo:"sk",slv:"sl",sme:"se",smo:"sm",sna:"sn",snd:"sd",som:"so",sot:"st",spa:"es",srd:"sc",srp:"sr",ssw:"ss",sun:"su",swa:"sw",swe:"sv",tah:"ty",tam:"ta",tat:"tt",tel:"te",tgk:"tg",tgl:"tl",tha:"th",tib:"bo",tir:"ti",ton:"to",tsn:"tn",tso:"ts",tuk:"tk",tur:"tr",twi:"tw",uig:"ug",ukr:"uk",urd:"ur",uzb:"uz",ven:"ve",vie:"vi",vol:"vo",wel:"cy",wln:"wa",wol:"wo",xho:"xh",yid:"yi",yor:"yo",zha:"za",zul:"zu"},map={afar:"aa",abkhazian:"ab",afrikaans:"af",akan:"ak",albanian:"sq",amharic:"am",arabic:"ar",aragonese:"an",armenian:"hy",assamese:"as",avaric:"av",avestan:"ae",aymara:"ay",azerbaijani:"az",bashkir:"ba",bambara:"bm",basque:"eu",belarusian:"be",bengali:"bn","bihari languages":"bh",bislama:"bi",tibetan:"bo",bosnian:"bs",breton:"br",bulgarian:"bg",burmese:"my",catalan:"ca",valencian:"ca",czech:"cs",chamorro:"ch",chechen:"ce",chinese:"zh","church slavic":"cu","old slavonic":"cu","church slavonic":"cu","old bulgarian":"cu","old church slavonic":"cu",chuvash:"cv",cornish:"kw",corsican:"co",cree:"cr",welsh:"cy",czech:"cs",danish:"da",german:"de",divehi:"dv",dhivehi:"dv",maldivian:"dv",dutch:"nl",flemish:"nl",dzongkha:"dz",greek:"el",english:"en",esperanto:"eo",estonian:"et",basque:"eu",ewe:"ee",faroese:"fo",persian:"fa",fijian:"fj",finnish:"fi",french:"fr",french:"fr","western frisian":"fy",fulah:"ff",georgian:"ka",german:"de",gaelic:"gd","scottish gaelic":"gd",irish:"ga",galician:"gl",manx:"gv",guarani:"gn",gujarati:"gu",haitian:"ht","haitian creole":"ht",hausa:"ha",hebrew:"he",herero:"hz",hindi:"hi","hiri motu":"ho",croatian:"hr",hungarian:"hu",armenian:"hy",igbo:"ig",icelandic:"is",ido:"io","sichuan yi":"ii",nuosu:"ii",inuktitut:"iu",interlingue:"ie",occidental:"ie",interlingua:"ia",indonesian:"id",inupiaq:"ik",icelandic:"is",italian:"it",javanese:"jv",japanese:"ja",kalaallisut:"kl",greenlandic:"kl",kannada:"kn",kashmiri:"ks",georgian:"ka",kanuri:"kr",kazakh:"kk","central khmer":"km",kikuyu:"ki",gikuyu:"ki",kinyarwanda:"rw",kirghiz:"ky",kyrgyz:"ky",komi:"kv",kongo:"kg",korean:"ko",kuanyama:"kj",kwanyama:"kj",kurdish:"ku",lao:"lo",latin:"la",latvian:"lv",limburgan:"li",limburger:"li",limburgish:"li",lingala:"ln",lithuanian:"lt",luxembourgish:"lb",letzeburgesch:"lb","luba-katanga":"lu",ganda:"lg",macedonian:"mk",marshallese:"mh",malayalam:"ml",maori:"mi",marathi:"mr",malay:"ms",macedonian:"mk",malagasy:"mg",maltese:"mt",mongolian:"mn",maori:"mi",malay:"ms",burmese:"my",nauru:"na",navajo:"nv",navaho:"nv","ndebele, south":"nr","south ndebele":"nr","ndebele, north":"nd","north ndebele":"nd",ndonga:"ng",nepali:"ne",dutch:"nl",flemish:"nl","norwegian nynorsk":"nn","nynorsk, norwegian":"nn","norwegian bokmål":"nb","bokmål, norwegian":"nb",norwegian:"no",chichewa:"ny",chewa:"ny",nyanja:"ny",occitan:"oc",ojibwa:"oj",oriya:"or",oromo:"om",ossetian:"os",ossetic:"os",panjabi:"pa",punjabi:"pa",persian:"fa",pali:"pi",polish:"pl",portuguese:"pt",pushto:"ps",pashto:"ps",quechua:"qu",romansh:"rm",romanian:"ro",moldavian:"ro",moldovan:"ro",rundi:"rn",russian:"ru",sango:"sg",sanskrit:"sa",sinhala:"si",sinhalese:"si",slovak:"sk",slovak:"sk",slovenian:"sl","northern sami":"se",samoan:"sm",shona:"sn",sindhi:"sd",somali:"so","sotho, southern":"st",spanish:"es",castilian:"es",albanian:"sq",sardinian:"sc",serbian:"sr",swati:"ss",sundanese:"su",swahili:"sw",swedish:"sv",tahitian:"ty",tamil:"ta",tatar:"tt",telugu:"te",tajik:"tg",tagalog:"tl",thai:"th",tibetan:"bo",tigrinya:"ti",tonga:"to",tswana:"tn",tsonga:"ts",turkmen:"tk",turkish:"tr",twi:"tw",uighur:"ug",uyghur:"ug",ukrainian:"uk",urdu:"ur",uzbek:"uz",venda:"ve",vietnamese:"vi","volapük":"vo",welsh:"cy",walloon:"wa",wolof:"wo",xhosa:"xh",yiddish:"yi",yoruba:"yo",zhuang:"za",chuang:"za",chinese:"zh",zulu:"zu"};

exports.language = name => {

    // Validate the name string
    if (typeof name !== 'string') {
      throw new Error(`The language must be a string, received ${typeof name}`);
    }
    // Possible overflow errors
    if (name.length > 100) {
      throw new Error(`The language must be a string under 100 characters, received ${name.length}`);
    }
  
    // Let's work with lowercase for everything
    name = name.toLowerCase();
  
    // Pass it through several possible maps to try to find the right one
    name = map[name] || iso2[name] || name;
  
    // Make sure we have the correct name or throw
    if (!iso.includes(name)) {
      throw new Error(`The name "${name}" is not part of the ISO 639-1 and I couldn't automatically parse it :(`);
    }
    return name;
};

exports.getcmd = function(content,id,name) {
	let cmd = content.split(" ")[0];
	if (cmd.startsWith("//")){cmd = cmd.slice (2);}
	return cmd;
}

exports.getargs = function(content) {
	let args = content.split(" ").slice(1);
	return args;
}

exports.ownerCheck = function(id) {
	if (id == "211227683466641408" || id == "297556557774979072") return true;
	return false;
}

exports.checkBirb = function(content,id) {
	if (id === "337401886699290626") {return 0;}
	if (content.includes("Caw")){return 1;}
	if (content.includes("CAW")){return 2;}
	if (content.includes("caw")){return 3;}
	if (content.includes("Chirp")){return 4;}
	if (content.includes("CHIRP")){return 5;}
	if (content.includes("chirp")){return 6;}
	else {return 0;}
}

exports.checkIm = function(cmd,args) {
	cmdLC = cmd.toLowerCase();
	if (args.length > 9) return 0;
	if (cmdLC == "i'm" || cmdLC == "im") {return 1} else {return 0}
}

exports.checkMisc = function(content) {
	if (content.includes("🅱")) return 1;
	if (content == "wew") return 2;
	if (content.includes("birb")) return 3;
	if (content.includes("gay")) return 4;
	if (content.includes("kek")) return 5;
	if (content == "delete") return 6;
	if (content.includes("explode")) return 7;
	if (content.includes("phoon")) return 8;
	if (content == "k") return 9;
	return 0;
}

exports.roll = function(number,array,boolean){
	var roll = [];
	do {
		for (i = 0;i < number;i++){
			roll[i] = math.randomNo(0,9)
		}
	} while (roll[0] == 0);
	let first = roll[roll.length-1];
	let second = roll[roll.length - 2];
	let third = roll[roll.length - 3];
	let fourth = roll[roll.length - 4];
	let fifth = roll[roll.length - 5];
	let sixth = roll[roll.length - 6];
	let seventh = roll[roll.length - 7];
	let eigth = roll[roll.length - 8];
	if (boolean == true){array.pop();var text = array.join(" ");} else {var text = array.join(" ")}
	var get = "";
	if (number > 8){
		if (first == second) { get = " Nice dubs!"; }
		if (first == second && second == third) { get = " Nice trips!"; }
		if (first == second && second == third && third == fourth) { get = " Cool quads!"; }
		if (first == second && second == third && third == fourth && fourth == fifth) { get = " Sick quints!"; }
		if (first == second && second == third && third == fourth && fourth == fifth && fifth == sixth) { get = " Amazing sexts!"; }
		if (first == second && second == third && third == fourth && fourth == fifth && fifth == sixth && sixth == seventh) { get = " Unbelievable septs!"; }
		if (first == second && second == third && third == fourth && fourth == fifth && fifth == sixth && sixth == seventh && seventh == eigth) { get = " HOLY FUCK, OCTS! @everyone LOOK AT THIS SICK ROLL!"; }
	}
	if (text === undefined) {var reply = (roll.join("")+get+"\n").toString();} else {var reply = (roll.join("")+get+"\n"+text).toString();}
	return reply;
}

exports.getHelp = function(array,guild_id){
	let prefix = config.getprefix(guild_id);
	switch(array.join(" ")){
		case "general":
		case "general 1": var text = "these are the general-use commands (page 1/2):\n\
```\n\
"+prefix+"8ball [text] ..................................... The magic 8ball has all the answers you need.\n\
"+prefix+"afk <reason> ..................................... Set an AFK message that is shown when someone tags you.\n\
"+prefix+"avatar [@user] ................................... Shows the tagged user's avatar, or yours if noone was tagged.\n\
"+prefix+"calc <equation> .................................. Calculates the given equation and returns the result. Any JS Math.* operation supported.\n\
"+prefix+"convert <amount> <source unit> <target unit> ..... Convert two units!\n\
"+prefix+"decide <option> or <option> [or [option]...] ..... Randomly decides from the given options for you.\n\
"+prefix+"die <sides> ...................................... Roll a die!\n\
"+prefix+"fact ............................................. Get an interesting fact from a big list of facts available.\n\
"+prefix+"guildinfo ........................................ Shows information about this guild.\n\
"+prefix+"info ............................................. Reveals info about the bot.\n\
"+prefix+"invite ........................................... Makes me send my invite link so you can have me on your very own server!\n\
```Enter `//help general 2` to view the second page!";break
		case "general 2": var text = "these are the general-use commands (page 2/2):\n\
```\n\
"+prefix+"morse <text or morse> ............................ Converts the given text into morse code or vice versa!\n\
"+prefix+"randcap <text> || rc <text> ...................... Randomly capitalize the given text.\n\
"+prefix+"report <@User> <reason> .......................... Report a user for abusing any of this bot's features. Please also provide evidence!\n\
"+prefix+"reverse <text> ................................... Reverse some text!\n\
"+prefix+"roll [text] [length] ............................. Rolls a random number with the requested amount of digits, or nine if none were specified.\n\
"+prefix+"sendnoots ........................................ Noot noot!\n\
"+prefix+"superscript <text> || ss <text> .................. Turn some text into unicode superscript (most letters supported)\n\
"+prefix+"status [@user] ................................... Shows the status of a user and what they are playing, if anything.\n\
"+prefix+"translate <text> <from> <to> ..................... Translate the given text from the given language to the other.\n\
"+prefix+"userinfo [@user] ................................. Display extensive information about you or whoever you mentioned.\n\
```";break;
		case "technical": var text = "these are the more technical commands:\n\
```\n\
"+prefix+"id [@user] ..... Returns the Discord ID of the tagged user, or yours if noone was tagged.\n\
"+prefix+"ping ........... Pings me, I will reply with one of various answers!\n\
"+prefix+"source ......... Links the github repo of my source code (note: might not be 100% recent).\n\
```";break;
		case "music": var text = "these are all music-related commands:\n\
```\n\
"+prefix+"join .............. Joins the channel you are currently in.\n\
"+prefix+"leave ............. Leaves the channel I'm currently in.\n\
"+prefix+"play <yt url> ..... Plays the specified YouTube Video.\n\
```";break;
		case "administrative": var text = "these are the administrative commands:\n\
```\n\
"+prefix+"kick <@user> [reason] ...... Kicks the specified user, as long as you and the bot have the permission to do so.\n\
"+prefix+"ban <@user> [reason] ....... Bans the specified user, permission-rule as above applies here as well.\n\
"+prefix+"toggle <wt|im|bc> .......... Toggles word triggers and the I'm-dadjoke trigger for your server respectively.\n\
"+prefix+"setlog ..................... Change logging options for your server.\n\
"+prefix+"setprefix <new prefix> ..... Sets a new server-wide prefix for the bot.\n\
"+prefix+"setwelcome ................. Activate or deactivate welcome messages for the server.\n\
```";break;
		case "nsfw": var text = "these are the non-worksafe commands:\n\
```\n\
"+prefix+"checkTags <tag(s)> ..... Check if one or more tags are valid on the available sites!\n\
"+prefix+"danbooru <tag(s)> ...... Search danbooru for lewds!\n\
"+prefix+"e621 <tag(s)> .......... Search e621 for lewds!\n\
"+prefix+"gelbooru <tag(s)> ...... Search gelbooru for lewds!\n\
"+prefix+"rule34 <tag(s)> ........ Search rule34 for lewds!\n\
"+prefix+"sendnudes .............. Only looking, no touching allowed!\n\
```All of these commands are restricted to channels **marked as NSFW!**\n\
See here for a guide on tags: https://goo.gl/pgWwH6";break;
		default: var text = "hello! Thanks for using Emosewaj's Papi-Bot!\n\
\n\
To get help for commands, use either of these sub-commands:\n\
```\n\
"+prefix+"help general ............ Get information about general-use commands. (2 Pages)\n\
"+prefix+"help administrative ..... Get information on administrative commands.\n\
"+prefix+"help nsfw ............... Get information on lewd commands.\n\
"+prefix+"help technical .......... Get information on more technical, development-oriented commands.\n\
"+prefix+"help music .............. Get information on how to use Papi-Bot for music.\n\
```";break;
	}
	return text;
}

exports.join = function(author) {
	switch(author.voiceChannel){
		case undefined: return 0;
		default: return 1;
	}
}

exports.leave = function(connection) {
	switch(connection){
		case null: return 0;
		default: return 1;
	}
}

exports.play = function(connection,userconnection) {
	switch(connection){
		case undefined:
		case null: return 0;
		default: switch(userconnection.voiceChannel){
			case undefined:
			case null: return 0;
			default: return 1;
		}
	}
}

exports.getguilds = function(array) {
	if (array[0] == "id") {return 1;}
	if (array[0] == "owner") {return 2;}
	else {return 0;}
}

exports.eightball = function() {
	return math.randomNo(1,20);
}

exports.reverse = function(string) {
	array = string.split("").slice(10);
	let reverseArray = [];
	let repeat = array.length;
	for (i = 0;i < repeat;i++) {
		reverseArray[i] = array.pop();
	}
	return reverseArray.join("");
}

exports.decideForMe = function(array) {
	let decisions = array.join(" ").split(" or ");
	return ("I'd say "+decisions[math.randomNo(0,decisions.length-1)]+"!");
}

exports.superscript = function(args) {
	if (args.length == 0) {return "You need to send me some text!";}
	let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"," ","1","2","3","4","5","6","7","8","9","0"]
	let superscript = ["ᵃ","ᵇ","ᶜ","ᵈ","ᵉ","ᶠ","ᵍ","ʰ","ⁱ","ʲ","ᵏ","ˡ","ᵐ","ⁿ","ᵒ","ᵖ","q","ʳ","ˢ","ᵗ","ᵘ","ᵛ","ʷ","ˣ","ʸ","ᶻ"," ","¹","²","³","⁴","⁵","⁶","⁷","⁸","⁹","⁰"]
	let text = args.join(" ").toLowerCase().split("");
	for (i=0;i<text.length;i++){
		text[i] = superscript[alphabet.indexOf(text[i])]
	}
	return text.join("");
}

exports.randCap = function(args) {
	let text = args.join(" ").toLowerCase().split("");
	let upper = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	let lower = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	for (i=0;i<text.length;i++){
		if (lower.indexOf(text[i]) != -1) {
			switch(math.randomNo(0,1)){
				case 0: text[i] = upper[lower.indexOf(text[i])];break;
				case 1: text[i] = lower[lower.indexOf(text[i])];break;
			}
		} else {text[i] = text[i];}
	}
	return text.join("");
}

exports.parseRating = function(string) {
	switch(string) {
		case "s": return "Safe"
		case "q": return "Questionable"
		case "e": return "Explicit"
		default: return "Unknown"
	}
}

exports.parseUptime = function(uptime) {
	let days = 0;
	let hours = 0;
	let minutes = 0;
	let seconds = Math.round(uptime);
	
	while ((seconds - 60) > 1) {
		seconds -= 60;
		minutes++;
	}
	while ((minutes - 60) > 1) {
		minutes -= 60;
		hours++;
	}
	while ((hours - 24) > 1) {
		hours -= 24;
		days++;
	}
	
	if (days == 0) {
		if (hours == 0) {
			if (minutes == 0) {
				return `${seconds} Seconds`;
			} else {
				return `${minutes} Minutes, ${seconds} Seconds`;
			}
		} else {
			return `${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`;
		}
	} else {
		return `${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`;
	}
}

exports.commandCheck = function(cmd) {
	let cmdlist = ["ping","id","avatar","guildinfo","status","invite","source","roll","help","join","leave","play", "say","eval","setname","getguilds",
	"react","shutdown","dm","bug","8ball","kick","ban","reverse","sendnudes","calc","decide","sendintro","toggle","sendnoots","tos","info","setprefix","broadcast","superscript","rpg",
	"setwelcome","shutdown","block","unblock","report","randcap","ss","rc","die","setlog","exec","fact","reply", "morse", "cleanup", "userinfo", "convert","translate","afk","e621","danbooru",
	"gelbooru","rule34","checktags","ct","checktag"];
	if (cmdlist.includes(cmd)){return 1;} else {return 0;}
}

exports.explainOwnerCMD = function(cmd) {
	var text;
	switch(cmd){
		case "say": text = "Since others may use this command to make me say bad things or even to anonymously bully others, my owner cannot allow others to use this command.";break;
		case "eval": text = "Letting everyone be able to execute Javascript code through me is dangerous, therefore it's just logical for my owner to disallow this command.";break;
		case "setname": text = "This is for my owner to be able to rename me at will (in servers they are in). If you want to rename me, just go ahead and do so (required you have the necessary permission, which is Manage Nicknames)!";break;
		case "getguilds": text = "My owner decided to not make the list of servers I'm in public.";break;
		case "dm": text = "Since others may use this command to make me say bad things or even to anonymously bully others, my owner cannot allow others to use this command.";break;
		case "react": text = "Making me react to certain messages as a joke is only something my owner is allowed to do.";break;
		case "sendnudes": text = "Since my owner sees sentimental value in me due to the time and energy they invested into developing me, they fear others might use me only for the porn, they therefore decided to keep this command for themselfes.";break;
		case "shutdown": text = "I don't really need to explain why this command is owner-only, do I?";break;
		case "broadcast": text = "Broadcasts are used to notify servers of new commands or any information that would need to be spread.";break;
		case "block":
		case "unblock": text = "The blocking system is used to restrict abusive users the access to the bot.";break;
		case "reply": text = "Replying is used to reply to direct messages I receive, this is easier than using the `dm` command for the same purpose, as for `dm`, an ID has to be found first.";break;
		default: text = "No reason yet stated.";break;
	}
	return ("Oops! Looks like you've sent an owner-only command! Here's why this command is restriced to my owner:\n"+text);
}