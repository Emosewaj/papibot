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
	// Zeta so rad#4999, Hentai God#2638
	if (message.author.id == 192819309829947392 || message.author.id === 244608898881945600) {
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
		message.channel.send('chirp');
	}
	if (message.content.includes('Caw') === true) {
		message.channel.send('Chirp');
	}
	if (message.content.includes('CAW') === true) {
		message.channel.send('CHIRP');
	}
	if (message.content.includes('Pwah') === true) { //made by Kitsu pls no steal
        message.channel.send('PWAP');
	}
	if (message.content.includes('🅱') === true) {
		message.channel.send('<@'+ message.author.id +'> end yourself, filthy normie');
		return;
	}
	if (((message.content).toLowerCase()).includes('broken') === true) {
		message.channel.send('<@'+ message.author.id +'> ur broken');
		return;
	}
	if (((message.content).toLowerCase()).includes('tomato') === true) {
		message.react('🍅');
		return;
	}
	if (((message.content).toLowerCase()).includes('birb') === true) {
		message.react('🐦');
		message.react('🦅');
		message.react('🦆');
		message.react('🦉');
		return;
	}
	if (((message.content).toLowerCase()).includes('kek') === true) {
		message.react('🐸');
		return;
	}
	if (((message.content).toLowerCase()).includes('japan store') === true) {
		if (message.author.bot) return;
		message.channel.send('Go to japan Store download, download the beta & and Go back :smiley:');
		message.react('🆗');
		return;
	}
	if (((message.content).toLowerCase()).includes('autist') === true) {
		message.reply('no u');
		return;
	}
	if (((message.content).toLowerCase()).includes('silk') === true) {
		if (message.author.bot) return;
		message.reply('did you know Silk is gay?');
		return;
	}
	if (((message.content).toLowerCase()).includes('explode') === true) {
		message.reply('allahu akbar');
		return;
	}
	if (((message.content).toLowerCase()).includes('gay') === true) {
		message.react('🏳️‍🌈');
		return;
	}
	if (message.content.includes('because ur a fucking cunt') === true) {
		message.reply('no u');
		return;
	}
	if (((message.content).toLowerCase()) === 'delete') {
		message.channel.send('yourself');
		return;
	}
	if (((message.content).toLowerCase()).includes('phoon') === true) {
		message.channel.send("Admin he's doing it sideways");
		return;
	}
	
	// Check for Prefix here
	if (message.author.bot || !message.content.startsWith(prefix)) return;

	let command = message.content.split(" ")[0];
	command = command.slice (prefix.length);

	let args = message.content.split(" ").slice(1);

	command = (command).toLowerCase();
  
	// Actual // commands here
	if (command === 'ping') {
		console.log(message.author.username +'#'+ message.author.discriminator + ' issued command //ping');
		message.channel.send("I'm back");
	}
	
	if (command === 'id') {
		console.log(message.author.username +'#'+ message.author.discriminator + ' issued command //id');
		if (message.mentions.users.first() == undefined) {
			message.reply("Your Discord ID is "+message.author.id+"!");
		}
		else {
			message.reply("<@"+message.mentions.users.first().id+">'s Discord ID is "+message.mentions.users.first().id);
		}
	}
	
	if (command === 'avatar') {
		console.log(message.author.username+'#'+message.author.discriminator+' issued command //avatar');
		if (message.mentions.users.first() == undefined) {
			message.reply("This is your avatar!");
			message.channel.send(message.author.avatarURL);
		}
		else {
			message.reply("This is <@"+message.mentions.users.first().id+">'s Avatar!");
			message.channel.send(message.mentions.users.first().avatarURL);
		}
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
	}
	
	
	if (command === 'invite') {
		console.log(message.author.username+'#'+message.author.discriminator+' requested the invite link!');
		message.reply("Here's my invite link: ");
		message.channel.send('https://discordapp.com/oauth2/authorize?client_id=337217642660233217&scope=bot&permissions=523328');
		message.channel.send('<@211227683466641408> says thanks!');
	}
	
	if (command === 'source') {
		console.log(message.author.username+'#'+message.author.discriminator+' requested the bot source code.')
		var source = "Here is my source code:\n\
https://github.com/Jawesome99/papibot";
		message.reply(source)
		message.channel.send("But please don't stare too much >.<;");
	}
	
	if (command === 'roll') {
		var numbers = [];
		if (args[0] > 1976) {message.reply("oops, that's a little too big for me to handle!\nCan you try again with fewer than 1977 digits, please?");
			return;}
		if (args[0] < 1) {message.reply("you want me to generate a random number with less than one digit? Are you stupid or something?");
			return;}
		if (args[0] != undefined) {var length = parseInt(args[0]);}
		else {var length = 9;}
		if (isNaN(length) == true) {message.reply("oops, you did something wrong. Did you enter letters or something? I can only take whole numbers as an input here.");
			return;}
		for (i=0; i < length; i++) {
			numbers[i] = Math.floor((Math.random() * 10) + 0);
		}
		message.reply(numbers.join(""));
		
		
	}
	
	if (command === 'help') {
		console.log(message.author.username+'#'+message.author.discriminator+' issued command help.');
		var help = "Hi, I'm Papi and I can do a lot of things!\n\
I can currently do the following commands:\n\
`//ping`, `//id`, `//avatar`, `//status`, `//source` and `//roll`\n\
I can also do a few other things that don't require a specific command, but those are secret!\n\
I'll get more commands as time goes by, so keep checking!\n\
Enter `//helpext` to get extended information on all the commands!";
		message.reply(help);
	}
	
	if (command === 'helpext') {
		console.log(message.author.username+'#'+message.author.discriminator+' issued command helpext.');
		var helpext = "`//ping`: Pings me, I will reply with one of various answers depending on a randomly generated number.\n\
`//id <@user>`: Returns the Discord ID of the tagged user, or yours if noone was tagged.\n\
`//avatar <@user>`: Shows the tagged user's avatar, or yours if noone was tagged.\n\
`//status <@user>`: Shows the status of a user and what they are playing, if anything, or yours if noone was tagged.\n\
`//source`: Links the github repository of my sourcecode.\n\
`//roll <length>`: Rolls a random number with the requested amount of digits, or nine digits if none was specified.";
		message.reply('here are my commands:\n'+helpext);
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
	}
	
	if (command === 'multilinetest') {
		message.channel.send("First Line\n\
Second Line\n\
Third Line");
	}
});

bot.login(token);
