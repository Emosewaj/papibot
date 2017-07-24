// A little side note before all the source code
// I wouldn't have been able to do this without the help of Torri, thank you so much for assisting me through setting this whole thing up!
// As well as all those tips you've given me, because I was too lazy to google myself.

// Also fix message.react() pls thx

const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'TOKEN REMOVED'
const prefix = '//';

bot.on('ready', () => {
	console.log("Ready for work!");
});

bot.on('message', message => {
	
	// Blocked users
	// Hentai God#2638, Silk#5473
	if (message.author.id == 244608898881945600 || message.author.id == 144605767541063680) {
		return;
	}
	
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
	if (message.content.includes('Pwah') === true) { //made by Kitsu pls no steal
        message.channel.send('PWAP');return;
	}
	if (message.content.includes('🅱') === true) {
		message.channel.send('<@'+ message.author.id +'> end yourself, filthy normie');return;
	}
	if (((message.content).toLowerCase()).includes('broken') === true && message.author.bot == false) {
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
		if (message.author.bot) return;
		message.channel.send('Go to japan Store download, download the beta & and Go back :smiley:');
		message.react('🆗');return;
	}
	if (((message.content).toLowerCase()).includes('autist') === true) {
		message.reply('no u');return;
	}
	if (((message.content).toLowerCase()).includes('silk') === true) {
		if (message.author.bot) return;
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

bot.on('message', message => {
	
	// Blocked users
	// Hentai God#2638, Silk?
	if (message.author.id == 244608898881945600 || message.author.id == 237705549737623555) return;
	
	// Check for Prefix here
	if (message.author.bot || !message.content.startsWith(prefix)) return;

	let command = message.content.split(" ")[0];
	command = command.slice (prefix.length);

	let args = message.content.split(" ").slice(1);

	command = (command).toLowerCase();
  
	// Actual // commands here
	if (command === 'ping') {
		console.log(message.author.username +'#'+ message.author.discriminator + ' issued command //ping');
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
		}
	}
	
	if (command === 'id') {
		console.log(message.author.username +'#'+ message.author.discriminator + ' issued command //id');
		if (message.mentions.users.first() == undefined) {
			message.reply("Your Discord ID is "+message.author.id+"!");
		}
		else {
			message.reply("<@"+message.mentions.users.first().id+">'s Discord ID is "+message.mentions.users.first().id);
		}
		return;
	}
	
	if (command === 'avatar') {
		console.log(message.author.username+'#'+message.author.discriminator+' issued command //avatar');
		if (message.mentions.users.first() == undefined) {
			message.reply("This is your avatar!\n"+message.author.displayAvatarURL);
		}
		else {
			message.reply("This is <@"+message.mentions.users.first().id+">'s Avatar!\n"+message.mentions.users.first().displayAvatarURL);
		}
		return;
	}

	if (command === 'status') {
		console.log(message.author.username+'#'+message.author.discriminator+' issued command //status');
		if (message.mentions.users.first() == undefined) {
			message.reply('You need to tag a user for this command to work, dummy.');
			return;
		}
		if (message.mentions.users.first().presence.game !== null) {
			message.reply(message.mentions.users.first().username+' is currently '+message.mentions.users.first().presence.status+' and is playing '+message.mentions.users.first().presence.game.name+'.');
		}
		else {
			message.reply(message.mentions.users.first().username+' is currently '+message.mentions.users.first().presence.status+'.');
		}
		return;
	}
	
	
	if (command === 'invite') {
		console.log(message.author.username+'#'+message.author.discriminator+' requested the invite link!');
		message.reply("Here's my invite link: \nhttps://discordapp.com/oauth2/authorize?client_id=337217642660233217&scope=bot&permissions=523328");
		message.channel.send('<@211227683466641408> says thanks!');return;
	}
	
	if (command === 'source') {
		console.log(message.author.username+'#'+message.author.discriminator+' requested the bot source code.')
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
		if (isNaN(length) == true) {message.reply("oops, you did something wrong. Did you enter letters or something? I can only take whole numbers as an input here.");
			return;}
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
		console.log(message.author.username+'#'+message.author.discriminator+' issued command help.');
		var help = "Hi, I'm Papi and I can do a lot of things!\n\
I can currently do the following commands:\n\
`//ping`, `//id`, `//avatar`, `//status`, `//source`, `//invite` and `//roll`\n\
I can also do a few other things that don't require a specific command, but those are secret!\n\
I'll get more commands as time goes by, so keep checking!\n\
Enter `//helpext` to get extended information on all the commands!";
		message.reply(help);return;
	}
	
	if (command === 'helpext') {
		console.log(message.author.username+'#'+message.author.discriminator+' issued command helpext.');
		var helpext = "`//ping`: Pings me, I will reply with one of various answers depending on a randomly generated number.\n\
`//id <@user>`: Returns the Discord ID of the tagged user, or yours if noone was tagged.\n\
`//avatar <@user>`: Shows the tagged user's avatar, or yours if noone was tagged.\n\
`//status <@user>`: Shows the status of a user and what they are playing, if anything, or yours if noone was tagged.\n\
`//source`: Links the github repository of my sourcecode.\n\
`//invite`: Makes me send my invite link so you can have me on your very own server!.\n\
`//roll <length> <text>`: Rolls a random number with the requested amount of digits, or nine digits if none was specified.";
		message.reply('here are my commands:\n'+helpext+"\n[necessary parameter]\n<optional parameter>");
	}

	// Owner-only commands
	if (command === 'say') {
		if (message.author.id != 211227683466641408) {
			console.log('Denied //say request by '+message.author.username+'#'+message.author.discriminator+'.');
			console.log('Text was "'+ args.join(" ")+'"');
			return;
		}
		else {
			console.log(message.author.username+'#'+message.author.discriminator+' made me say "' + args.join(" ")+'"');
			message.delete();
			message.channel.send(args.join(" ")); // thanks Shibo~
		}
		return;
	}
	
	// Cheekily copying that command from god
	else {
		if (args[0] == undefined) return;
		
		if (command == "eat") {
			message.reply("ate "+args.join(" ")+", pal!");return;
		}
		if (command == "be") {
			message.reply("been "+args.join(" ")+", pal!");return;
		} 
		if (command == "sleep") {
			message.reply("slept "+args.join(" ")+", pal!");return;
		}
		if (command.endsWith("n") == true) {
			message.reply(command+"ned "+args.join(" ")+", pal!");return;
		}
		if (command.endsWith("p") == true) {
			message.reply(command+"ped "+args.join(" ")+", pal!");return;
		} else {
			message.reply(command+"ed "+args.join(" ")+", pal!");return;
		}
	}
});

bot.login(token);
