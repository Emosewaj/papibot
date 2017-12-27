// Handles most checking and also logging of commands
const fs = require("fs");
const math = require("./math.js");
const config = require("./config.js");

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
		case "general": var text = "these are the general-use commands:\n\
```\n\
"+prefix+"8ball [text] ..................................... The magic 8ball has all the answers you need.\n\
"+prefix+"avatar [@user] ................................... Shows the tagged user's avatar, or yours if noone was tagged.\n\
"+prefix+"calc <equation> .................................. Calculates the given equation and returns the result. Any JS Math.* operation supported.\n\
"+prefix+"convert <amount> <source unit> <target unit> ..... Convert two units!\n\
"+prefix+"decide <option> or <option> [or [option]...] ..... Randomly decides from the given options for you.\n\
"+prefix+"die <sides> ...................................... Roll a die!\n\
"+prefix+"fact ............................................. Get an interesting fact from a big list of facts available.\n\
"+prefix+"guildinfo ........................................ Shows information about this guild.\n\
"+prefix+"info ............................................. Reveals info about the bot.\n\
"+prefix+"invite ........................................... Makes me send my invite link so you can have me on your very own server!\n\
"+prefix+"morse <text or morse> ............................ Converts the given text into morse code or vice versa!\n\
"+prefix+"randcap <text> || rc <text> ...................... Randomly capitalize the given text.\n\
"+prefix+"report <@User> <reason> .......................... Report a user for abusing any of this bot's features. Please also provide evidence!\n\
"+prefix+"reverse <text> ................................... Reverse some text!\n\
"+prefix+"roll [text] [length] ............................. Rolls a random number with the requested amount of digits, or nine if none were specified.\n\
"+prefix+"sendnoots ........................................ Noot noot!\n\
"+prefix+"superscript <text> || ss <text> .................. Turn some text into unicode superscript (most letters supported)\n\
"+prefix+"status [@user] ................................... Shows the status of a user and what they are playing, if anything.\n\
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
"+prefix+"sendnudes ..... Only looking, no touching allowed!\n\
```All of these commands are restricted to channels **marked as NSFW!**";break;
		default: var text = "hello! Thanks for using Emosewaj's Papi-Bot!\n\
\n\
To get help for commands, use either of these sub-commands:\n\
```\n\
"+prefix+"help general ............ Get information about general-use commands.\n\
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
	"setwelcome","shutdown","block","unblock","report","randcap","ss","rc","die","setlog","exec","fact","reply", "morse", "cleanup", "userinfo", "convert"];
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
