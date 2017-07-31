// A little side note before all the source code
// I wouldn't have been able to do this without the help of Torri, thank you so much for assisting me through setting this whole thing up!
// As well as all those tips you've given me, because I was too lazy to google myself.

// Also fix message.react() pls thx

const fs = require('fs');
const Discord = require('discord.js');
const self = new Discord.Client();
const token = 'TOKEN REMOVED'
const prefix = '//';

self.on('ready', () => {
	console.log("Papi-Bot v2017.07.30 online in "+self.guilds.array().length+" guilds\nLogged in as "+self.user.tag+"\n");
});

function log(command, guild, usertag, args) {
	var date = new Date();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	console.log("["+hour+":"+minute+":"+second+"] in "+guild+": User "+usertag+" issued \""+command+"\" with arguments \""+args.join(" ")+"\".");
}

self.on('message', message => {
	
	// Blocked users
	// None rn
//	if (message.author.id == none rn) return;
	
	//self
	if (message.author == self.user) return;
	
	// Add flags to users
	if (message.author.id == 273932044868780033 || message.author.id == 328544500882604042) {
		message.react('🇬🇧');
	}
	if (message.author.id == 144605767541063680) {
		message.react('🏳️‍🌈');
	}
	if (message.author.id == 305794406781550602) {
		message.react('🇦🇴');
	}
	
	// remove the text commands if the message begins with the prefix
	if (message.content.startsWith(prefix)) return;
	
	// Text commands that should work without the prefix
	if (message.content.includes('caw') === true) {
		message.channel.send('chirp');return;
	}
	if (message.content.includes('Caw') === true) {
		message.channel.send('Chirp');return;
	}
	if (message.content.includes('CAW') === true) {
		message.channel.send('CHIRP');return;
	}
	if (message.content.includes('chirp') === true) {
		message.channel.send('caw');return;
	}
	if (message.content.includes('Chirp') === true) {
		message.channel.send('Caw');return;
	}
	if (message.content.includes('CHIRP') === true) {
		message.channel.send('CAW');return;
	}
	if (message.content.includes('Pwah') === true) { //made by Kitsu pls no steal
        message.channel.send('PWAP');return;
	}
	if (message.content.startsWith("I'm ") || message.content.startsWith('Im ') || message.content.startsWith('im ') || message.content.startsWith("i'm ")) {
		let command = message.content.split(" ")[0];
		command = command.slice (prefix.length);
		let args = message.content.split(" ").slice(1);
		command = (command).toLowerCase();
		if (args.length > 10 || args[0] == undefined) return;
		
		message.channel.send('Hi '+args.join(" ")+"!\nI'm Papi!");return;
	}
	if (message.content.includes('🅱') === true) {
		message.channel.send('<@'+ message.author.id +'> end yourself, filthy normie');return;
	}
	if (((message.content).toLowerCase()).includes('broken') === true) {
		message.channel.send('<@'+ message.author.id +'> ur broken');return;
	}
	if (((message.content).toLowerCase()).includes('tomato') === true) {
		message.react('🍅');return;
	}
	if (((message.content).toLowerCase()).includes('birb') || ((message.content).toLowerCase()).includes ('bird') === true) {
		message.react('🐦');
		message.react('🦅');
		message.react('🦆');
		message.react('🦉');return;
	}
	if (((message.content).toLowerCase()).includes('kek') === true) {
		message.react('🐸');return;
	}
	if (((message.content).toLowerCase()).includes('japan store') === true) {
		message.channel.send('Go to japan Store download, download the beta & and Go back :smiley:');
		message.react('🆗');return;
	}
	if (((message.content).toLowerCase()).includes('autist') === true) {
		message.reply('no u');return;
	}
	if (((message.content).toLowerCase()).includes('silk') === true) {
		if (Math.floor((Math.random() * 100) + 1) == 50) {
			message.reply('did you know Silk is gay?');return;
		}
	}
	if (((message.content).toLowerCase()).includes('explode') === true) {
		message.reply('allahu akbar');return;
	}
	if (((message.content).toLowerCase()).includes('gay') === true) {
		message.react('🏳️‍🌈');return;
	}
	if (message.content.includes('because ur a fucking cunt') === true) {
		message.reply('no u');return;
	}
	if (((message.content).toLowerCase()) === 'delete') {
		message.channel.send('yourself');return;
	}
	if (((message.content).toLowerCase()).includes('phoon') === true) {
		message.channel.send("Admin he's doing it sideways");return;
	}
	if (((message.content).toLowerCase()).includes('wew') === true) {
		message.channel.send("lad");return;
	}
});

self.on('message', message => {
	
	// Blocked users
	// None rn
//	if (message.author.id == none rn) return;
	
	// Check for Prefix here
	if (message.author.bot || !message.content.startsWith(prefix)) return;
	let command = message.content.split(" ")[0];
	command = command.slice (prefix.length);
	let args = message.content.split(" ").slice(1);
	command = (command).toLowerCase();
	let guild = message.guild.name;
	let usertag = message.author.tag;
	
	log(command, guild, usertag, args);
  
	// Actual // commands here
	if (command === 'ping') {
		switch (Math.floor((Math.random() * 10) + 1)) {
			case 1:
				message.channel.send('Hello');break;
			case 2:
				message.channel.send('Hi there');break;
			case 3:
				message.channel.send('How are you?');break;
			case 4:
				message.channel.send('Chirp');break;
			case 5:
				message.channel.send('*dab*');break;
			case 6:
				message.channel.send("I'm here fam");break;
			case 7:
				message.channel.send("Good to see you");break;
			case 8:
				message.channel.send("Ika sucks\n\n\nokay maybe not 100%");break;
			case 9:
				message.channel.send("Papi-Bot, at your service");break;
			case 10:
				message.channel.send("Online and ready");break;
		} return;
	}
	if (command === 'id') {
		if (message.mentions.users.first() == undefined) {
			message.reply("Your Discord ID is "+message.author.id+"!");
		}
		else {
			message.reply("<@"+message.mentions.users.first().id+">'s Discord ID is "+message.mentions.users.first().id);
		} return;
	}
	if (command === 'avatar') {
		if (message.mentions.users.first() == undefined) {
			message.reply("This is your avatar!\n"+message.author.displayAvatarURL);
		}
		else {
			message.reply("This is <@"+message.mentions.users.first().id+">'s Avatar!\n"+message.mentions.users.first().displayAvatarURL);
		} return;
	}
	if (command === 'guildavatar') {
		message.reply("This is "+guild+"'s Guild Icon!\n"+message.guild.iconURL);return;
	}
	if (command === 'status') {
		if (message.mentions.users.first() == undefined) {
			message.reply('You need to tag a user for this command to work, dummy.');return;
		}
		if (message.mentions.users.first().presence.game !== null) {
			message.reply(message.mentions.users.first().username+' is currently '+message.mentions.users.first().presence.status+' and is playing '+message.mentions.users.first().presence.game.name+'.');
		}
		else {
			message.reply(message.mentions.users.first().username+' is currently '+message.mentions.users.first().presence.status+'.');
		} return;
	}
	if (command === 'invite') {
		message.reply("Here's my invite link: \nhttps://discordapp.com/oauth2/authorize?client_id=337217642660233217&scope=bot&permissions=70773825");
		message.channel.send('<@211227683466641408> says thanks!');return;
	}
	if (command === 'source') {
		var source = "Here is my source code:\n\
https://github.com/Jawesome99/papibot";
		message.reply(source)
		message.channel.send("But please don't stare too much >.<;");return;
	}
	if (command === 'roll') {
		let numbers = [];
		if (args[0] > 25) {message.reply("sorry, I don't like spam. Can you try that again but with maximum of 25 digits, please?");
			return;}
		if (args[0] < 1) {message.reply("you want me to generate a random number with less than one digit? Are you stupid or something?");
			return;}
		if (args[0] != undefined) {var length = parseInt(args[0]);}
		else {var length = 9;}
		if (isNaN(length) == true) {message.reply("oops, you did something wrong. Did you enter letters or something? I can only take whole numbers as an input here.");return;}
		do {
			for (i=0; i < length; i++) {
				numbers[i] = Math.floor((Math.random() * 10) + 0);
			}
		} while (numbers[0] == 0);
		let first = numbers[numbers.length-1];
		let second = numbers[numbers.length - 2];
		let third = numbers[numbers.length - 3];
		let fourth = numbers[numbers.length - 4];
		let fifth = numbers[numbers.length - 5];
		let sixth = numbers[numbers.length - 6];
		let seventh = numbers[numbers.length - 7];
		let eigth = numbers[numbers.length - 8];
		let get = ""; 
		let argtext = []
		if (args[1] != undefined) {
			let argstring = args.toString();
			argtext = argstring.split(",").slice(1);
			message.delete();
		}
		if (length > 8) {
			if (first == second) {
				get = " Nice dubs!";
			}
			if (first == second && second == third) {
				get = " Nice trips!";
			}
			if (first == second && second == third && third == fourth) {
				get = " Cool quads!";
			}
			if (first == second && second == third && third == fourth && fourth == fifth) {
				get = " Sick quints!";
			}
			if (first == second && second == third && third == fourth && fourth == fifth && fifth == sixth) {
				get = " Amazing sexts!";
			}
			if (first == second && second == third && third == fourth && fourth == fifth && fifth == sixth && sixth == seventh) {
				get = " Unbelievable septs!";
			}
			if (first == second && second == third && third == fourth && fourth == fifth && fifth == sixth && sixth == seventh && seventh == eigth) { // if this ever happens I'm going to eat a broom
				get = " HOLY FUCK, OCTS! @everyone LOOK AT <@"+message.author.id+">'S SICK ROLL!";
			}
		}
		message.reply(numbers.join("")+get+"\n"+argtext.join(" "));return;
	}
	if (command === 'help') {
		var help = "hello! Thanks for using Emosewaj's Papi-Bot!\n\
\n\
To get help for commands, use either of these sub-commands:\n\
```\n\
//help general ............ Get information about general-use commands.\n\
//help technical .......... Get information on more technical, development-oriented commands.\n\
//help music .............. Get information on how to use Papi-Bot for music.\n\
```";
		var general = "these are the general-use commands:\n\
```\n\
//avatar <@user> ........... Shows the tagged user's avatar, or yours if noone was tagged.\n\
//guildavatar .............. Shows this guild's avatar.\n\
//invite ................... Makes me send my invite link so you can have me on your very own server!.\n\
//roll <length> <text> ..... Rolls a random number with the requested amount of digits, or nine if none were specified.\n\
//status [@user] ........... Shows the status of a user and what they are playing, if anything.\n\
```";
		var technical = "these are the more technical commands:\n\
```\n\
//id <@user> ..... Returns the Discord ID of the tagged user, or yours if noone was tagged.\n\
//ping ........... Pings me, I will reply with one of various answers!\n\
//source ......... Links the github repo of my source code (note: might not be 100% recent).\n\
```";
		var music = "these are all music-related commands:\n\
```\n\
//join .................... Joins the channel you are currently in.\n\
//leave ................... Leaves the channel I'm currently in.\n\
//list .................... Lists all local-playable files (YouTube audio-stream coming soon™!).\n\
//play [file] ............. Plays the specified file.\n\
//upload [attachment] ..... Upload a file to the userupload directory.\n\
```";

		if (args[0] === undefined) {message.reply(help);return;}
		if (args[0] == "general") {message.reply(general);return;}
		if (args[0] == "technical") {message.reply(technical);return;}
		if (args[0] == "music") {message.reply(music);return;}
		else {message.reply("I don't know that category, sorry!");}
	}
	
	// Voice & Music related
	if (command === 'join') {
		voiceChannel = message.member.voiceChannel
		if (message.member.voiceChannel) {
				voiceChannel.join().then(connection => {
					message.channel.send("Joined channel "+message.guild.voiceConnection.channel.name+"!");
				})
				.catch(console.log);
		} else { message.reply("Couldn't connect to the voice channel!"); }
		return;
	}
	if (command === 'leave') {
		if (message.guild.voiceConnection === null) {message.channel.send("I'm not in a voice channel!");return;}
		voiceChannel = message.guild.voiceConnection.channel;
		voiceChannel.leave();
		message.channel.send("Left channel "+voiceChannel.name+"!");return;
	}
	if (command === 'play') {
		if (args[0] === undefined) {message.reply("You need to specify a valid filename!");return;}
		if (fs.readdirSync('D:/botmusic/default').includes(args.join(" "))) {
			message.guild.voiceConnection.playFile("D:/botmusic/default/"+args.join(" "));
			message.reply("playing "+args.join(" "));return;
		}
		if (fs.readdirSync('D:/botmusic/userupload').includes(args.join(" "))) {
			message.guild.voiceConnection.playFile("D:/botmusic/userupload/"+args.join(" "));
			message.reply("playing "+args.join(" ")+" from userupload");return;
		} else {
			message.reply(args[0]+" is not a valid filename!");return;
		}			
	}
	if (command === 'list') {
		var files = fs.readdirSync('D:/botmusic/default');
		var userfiles = fs.readdirSync('D:/botmusic/userupload');
		message.reply("these are the currently available files to play:\n```\n"+files.join("\n")+"\n"+userfiles.join("\n")+"\n```");
	}
	if (command === 'upload' && message.attachments !== undefined) {
		//Dependencies
		var url = require('url');
		var http = require('http');
		var exec = require('child_process').exec;
		var spawn = require('child_process').spawn;
		// App variables
		var file_url = message.attachments.first().url;
		var DOWNLOAD_DIR = 'D:/botmusic/userupload';
		
		var download_file_wget = function(file_url) {
			var file_name = message.attachments.first().filename;
			message.channel.send("Downloading "+file_name+"...");
			var wget = 'wget --no-check-certificate -P ' + DOWNLOAD_DIR + ' ' + file_url;
			var child = exec(wget, function(err,stdout,stderr) {
				if (err) throw err;
				else {console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);message.reply("file "+file_name+" downloaded successfully!");return;}
			});
		}
		if (file_url.endsWith(".mp3") || file_url.endsWith(".wav") || file_url.endsWith(".ogg") || file_url.endsWith(".flac") || file_url.endsWith(".wma")){download_file_wget(file_url);}
		else { message.reply("sorry, I can only accept audio files! Please keep your upload to one of the most used formats! Thank you~!");return;}
	}
	// Owner only
	if (command === 'say') {
		if (message.author.id != 211227683466641408) return;
		else {
			message.delete();
			message.channel.send(args.join(" ")); // thanks Shibo~
		} return;
	}
	if (command === 'getguilds') {
		if (message.author.id != 211227683466641408) return;
		else {
			if (args[0] === undefined) {message.channel.send("```\n"+self.guilds.array().join("\n")+"\n```");return;}
		}
	}
	if (command === 'eval') {
		if (message.author.id != 211227683466641408) return;
		else {
			message.delete();
			eval(args.join(" "));return;
		}
	}
	if (command === 'shutdown') {
		if (message.author.id != 211227683466641408) return;
		else {
			self.destroy();
			console.log("\nPapi-Bot was shut down.");
			process.exit(0);
		}
	}
	
	// Cheekily copying that command from god
	else {
		if (args[0] == undefined) return;
		for (i=0; i < args.length; i++) {
			if (args[i] == "yourself") args[i] = "myself";
			if (args[i] == "you") args[i] = "me";
			if (args[i] == "your") args[i] = "my";
		}
		switch (Math.floor((Math.random() * 10) + 1)) {
			case 1:
				var ending = ", pal!";break;
			case 2:
				var ending = ", fam!";break;
			case 3:
				var ending = ", bro!";break;
			case 4:
				var ending = ", bud!";break;
			case 5:
				var ending = ", dude!";break;
			case 6:
				var ending = ", comrade!";break;
			case 7:
				var ending = ", partner!";break;
			case 8:
				var ending = ", mate!";break;
			case 9:
				var ending = ", goy!";break;
			case 10:
				var ending = ", gurl!";break;
		}
		if (command == "eat") {
			message.reply("ate "+args.join(" ")+ending);return;
		}
		if (command == "be") {
			message.reply("been "+args.join(" ")+ending);return;
		} 
		if (command == "sleep") {
			message.reply("slept "+args.join(" ")+ending);return;
		}
		if (command == "do") {
			message.reply("did "+args.join(" ")+ending);return;
		}
		if (command == "poop") {
			message.reply("pooped "+args.join(" ")+ending);return;
		}
		if (command == "make") {
			message.reply("made "+args.join(" ")+ending);return;
		}
		if (command == "have") {
			message.reply("had "+args.join(" ")+ending);return;
		}
		if (command == "go") {
			let argsstring = args.join(" ").toString();
			let args2 = argsstring.split(" ").slice(1);
			message.reply("gone "+args[0]+"ed "+args2.join(" ")+ending);return;
		}
		if (command.endsWith("n") == true) {
			message.reply(command+"ned "+args.join(" ")+ending);return;
		}
		if (command.endsWith("p") == true) {
			message.reply(command+"ped "+args.join(" ")+ending);return;
		} 
		if (command.endsWith("e") == true) {
			message.reply(command+"d "+args.join(" ")+ending);return;
		}
		if (command.endsWith("b") == true) {
			message.reply(command+"bed "+args.join(" ")+ending);return;
		}
		if (command.endsWith("s") == true) {
			message.reply(command+"sed "+args.join(" ")+ending);return;
		} else {
			message.reply(command+"ed "+args.join(" ")+ending);return;
		}
	} return;
});

self.login(token);
