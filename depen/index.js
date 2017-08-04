// Handles most checking and also logging of commands
let cb;

exports.log = function(command, guild, usertag, args) {
	var date = new Date();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	console.log("["+hour+":"+minute+":"+second+"] in "+guild+": User "+usertag+" issued \""+command+"\" with arguments \""+args.join(" ")+"\".");
}

exports.getcmd = function(content) {
	let cmd = content.split(" ")[0];
	if (cmd.startsWith("//")){cmd = cmd.slice (2);}
	return cmd;
}
exports.getargs = function(content) {
	let args = content.split(" ").slice(1);
	return args;
}

exports.ownerCheck = function(id) {
	if (id == "211227683466641408") {cb = 1;return cb;} else {cb = 0;return cb;}
}

exports.checkBirb = function(content,id) {
	if (id === "337401886699290626") {cb = 0;return cb;}
	if (content.includes("Caw")){cb = 1;return cb;}
	if (content.includes("CAW")){cb = 2;return cb;}
	if (content.includes("caw")){cb = 3;return cb;}
	if (content.includes("Chirp")){cb = 4;return cb;}
	if (content.includes("CHIRP")){cb = 5;return cb;}
	if (content.includes("chirp")){cb = 6;return cb;}
	if (content.includes("Pwah")){cb = 7;return cb;}
	else {cb = 0;return cb;}
}

exports.checkIm = function(cmd,guildID) {
	if (guildID === 337401886699290626) {cb = 0;return cb;}
	cmdLC = cmd.toLowerCase();
	if (cmdLC == "i'm" || cmdLC == "im"){cb = 1;}
	else {cb = 0;}
	return cb;
}

exports.checkMisc = function(content) {
	if (content.includes("🅱")){cb = 1;return cb;}
	if (content == "wew"){cb = 2;return cb;}
	if (content.includes("birb")){cb = 3;return cb;}
	if (content.includes("gay")){cb = 4;return cb;}
	if (content.includes("kek")){cb = 5;return cb;}
	if (content.includes("tomato")){cb = 6;return cb;}
	if (content == "delete"){cb = 7;return cb;}
	if (content.includes("autist")){cb = 8;return cb;}
	if (content.includes("explode")){cb = 9;return cb;}
	if (content.includes("phoon")){cb = 10;return cb;}
	if (content.includes("because ur a fucking cunt")){cb = 11;return cb;}
	else {cb = 0;return cb;}
}

exports.ping = function(){
	cb = Math.floor((Math.random() * 10) + 1);
	return cb;
}

exports.roll = function(number,array,boolean){
	var roll = [];
	do {
		for (i = 0;i < number;i++){
			roll[i] = Math.floor(Math.random()*10);
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
	if (number > 8){
		if (first == second) { var get = " Nice dubs!"; }
		if (first == second && second == third) { var get = " Nice trips!"; }
		if (first == second && second == third && third == fourth) { var get = " Cool quads!"; }
		if (first == second && second == third && third == fourth && fourth == fifth) { var get = " Sick quints!"; }
		if (first == second && second == third && third == fourth && fourth == fifth && fifth == sixth) { var get = " Amazing sexts!"; }
		if (first == second && second == third && third == fourth && fourth == fifth && fifth == sixth && sixth == seventh) { var get = " Unbelievable septs!"; }
		if (first == second && second == third && third == fourth && fourth == fifth && fifth == sixth && sixth == seventh && seventh == eigth) { var get = " HOLY FUCK, OCTS! @everyone LOOK AT <@"+message.author.id+">'S SICK ROLL!"; }
		else {var get = "";}
	} else {var get = "";}
	if (text === undefined) {var reply = (roll.join("")+get+"\n").toString();} else {var reply = (roll.join("")+get+"\n"+text).toString();}
	return reply;
}

exports.getHelp = function(array){
	switch(array.join(" ")){
		case "general": var text = "these are the general-use commands:\n\
```\n\
//avatar <@user> ........... Shows the tagged user's avatar, or yours if noone was tagged.\n\
//guildavatar .............. Shows this guild's avatar.\n\
//invite ................... Makes me send my invite link so you can have me on your very own server!.\n\
//roll <text> <length> ..... Rolls a random number with the requested amount of digits, or nine if none were specified.\n\
//status [@user] ........... Shows the status of a user and what they are playing, if anything.\n\
```";break;
		case "technical": var text = "these are the more technical commands:\n\
```\n\
//id <@user> ..... Returns the Discord ID of the tagged user, or yours if noone was tagged.\n\
//ping ........... Pings me, I will reply with one of various answers!\n\
//source ......... Links the github repo of my source code (note: might not be 100% recent).\n\
```";break;
		case "music": var text = "these are all music-related commands:\n\
```\n\
//join ...................... Joins the channel you are currently in.\n\
//leave ..................... Leaves the channel I'm currently in.\n\
//list ...................... Lists all local-playable files (YouTube audio-stream coming soon™!).\n\
//play [file or yt url] ..... Plays the specified file.\n\
//upload [attachment] ....... Upload a file to the userupload directory.\n\
//download [filename] ....... Sends a file from the filelist to the channel for you to download.\n\
```";break;
		default: var text = "hello! Thanks for using Emosewaj's Papi-Bot!\n\
\n\
To get help for commands, use either of these sub-commands:\n\
```\n\
//help general ............ Get information about general-use commands.\n\
//help technical .......... Get information on more technical, development-oriented commands.\n\
//help music .............. Get information on how to use Papi-Bot for music.\n\
```";break;
	}
	return text;
}

exports.join = function(author) {
	switch(author.voiceChannel){
		case undefined: cb = 0;return cb;
		default: cb = 1;return cb;
	}
}

exports.leave = function(connection) {
	switch(connection){
		case null: cb = 0;return cb;
		default: cb = 1;return cb;
	}
}

exports.play = function(connection,userconnection,array,def,uu) {
	switch(connection){
		case undefined: cb = 0;return cb;
		default: switch(userconnection.voiceChannel){
			case undefined: cb = 0;return cb;
			default: if (array[0] == undefined) {cb = 0; return cb;}
				if (array[0].startsWith("https://www.youtu")) {cb = 1;return cb;}
				if (def.includes(array.join(" "))){cb = 2;return cb;}
				if (uu.includes(array.join(" "))){cb = 3;return cb;}
				else {cb = 0;return cb;}
		}
	}
}

exports.upload = function(attachment) {
	if (attachment.first() == undefined) {cb = -1;return cb;}
	var url = attachment.first().url;
	if (!url.endsWith(".mp3") && !url.endsWith(".wav") && !url.endsWith(".ogg") && !url.endsWith(".wma")) {cb = 0; return cb;}
	else {cb = 1;return cb;}
}

exports.download = function(array,def,uu) {
	if (array == undefined){cb = 0; return cb;}
	if (def.includes(array.join(" "))){cb = 1;return cb;}
	if (uu.includes(array.join(" "))){cb = 2;return cb}
	else {cb = 0;return cb;}
}

exports.getguilds = function(array) {
	if (array[0] == "id") {cb = 1;return cb;} else {cb = 0;return cb;}
}

exports.commandCheck = function(cmd) {
	let cmdlist = ["ping","id","avatar","guildavatar","status","invite","source","roll","help","join","leave","list","play","upload","download","delete","say","eval","setname","getguilds","react","shutdown","dm"];
	if (cmdlist.includes(cmd)){cb = 1;return cb} else {cb = 0;return cb;}
}
