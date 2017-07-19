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
	
	// Text commands that should work without the prefix
	if (message.content.includes('caw') === true) {
		console.log(message.author.username +'#'+ message.author.discriminator + ' issued no-prefix command caw.');
		message.channel.send('chirp');
	}
	if (message.content.includes('Caw') === true) {
		console.log(message.author.username +'#'+ message.author.discriminator + ' issued no-prefix command Caw.');
		message.channel.send('Chirp');
	}
	if (message.content.includes('CAW') === true) {
		console.log(message.author.username +'#'+ message.author.discriminator + ' issued no-prefix command CAW.');
		message.channel.send('CHIRP');
	}
	if (message.content.includes('Pwah') === true) { //made by Kitsu pls no steal
        console.log(message.author.username +'#'+ message.author.discriminator + ' issued no-prefix command Pwah.');
        message.channel.send('PWAP');
    }
	if (message.content.includes('🅱') === true) {
		console.log(message.author.username +'#'+ message.author.discriminator + ' issued no-prefix command anti-B.');
		message.channel.send('<@'+ message.author.id +'> end yourself, filthy normie');
	}
	if (((message.content).toLowerCase()).includes('broken') === true) {
		console.log(message.author.username +'#'+ message.author.discriminator + ' issued no-prefix command broken.');
		message.channel.send('<@'+ message.author.id +'> ur broken');
	}
	if (((message.content).toLowerCase()).includes('tomato') === true) {
		console.log(message.author.username+'#'+message.author.discriminator+' issued no-prefix command tomato.');
		message.react('🍅');
	}
	if (((message.content).toLowerCase()).includes('birb') === true) {
		console.log(message.author.username+'#'+message.author.discriminator+' issued no-prefix command birb.');
		message.react('🐦');
//		message.react('🕊️'); :dove: is broken óvó
		message.react('🦅');
		message.react('🦆');
		message.react('🦉');
	}
	if (((message.content).toLowerCase()).includes('kek') === true) {
		console.log(message.author.username+'#'+message.author.discriminator+' issued no-prefix command kek.');
		message.react('🐸');
	}
	if (((message.content).toLowerCase()).includes('japan store') === true) {
		if (message.author.bot) return;
		console.log(message.author.username+'#'+message.author.discriminator+' issued no-prefix command japan Store.');
		message.channel.send('Go to japan Store download, download the beta & and Go back :smiley:');
		message.react('🆗');
	}
	if (((message.content).toLowerCase()).includes('autist') === true) {
		console.log(message.author.username+'#'+message.author.discriminator+' issued no-prefix command autist.');
		message.reply('no u');
	}
	if (((message.content).toLowerCase()).includes('silk') === true) {
		if (message.author.bot) return;
		console.log(message.author.username+'#'+message.author.discriminator+' issued no-prefix command silk.');
		message.reply('did you know <@144605767541063680> is gay?');
	}
	if (((message.content).toLowerCase()).includes('explode') === true) {
		console.log(message.author.username+'#'+message.author.discriminator+' issued no-prefix command explode.');
		message.reply('allahu akbar');
	}
	if (((message.content).toLowerCase()).includes('gay') === true) {
		if (message.author.bot) return;
		console.log(message.author.username+'#'+message.author.discriminator+' issued no-prefix command gay.');
		message.react('🏳️‍🌈');
	}
	if (message.author.id == 273932044868780033) {
		message.react('🇬🇧');
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
		message.channel.send('Hello');
	}
	
	if (command === 'id') {
		console.log(message.author.username +'#'+ message.author.discriminator + ' issued command //id');
		message.reply("Your Discord ID is "+message.author.id+"!");
	}
	
	if (command === 'avatar') {
		console.log(message.author.username+'#'+message.author.discriminator+' issued command //avatar');
		message.reply("This is your avatar!");
		message.channel.send(message.author.avatarURL);
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
		message.reply("Here is my source code: ")
		message.channel.send('https://github.com/Jawesome99/papibot');
		message.channel.send("But please don't stare too much >.<;");
	}
	
	if (command === 'help') {
		console.log(message.author.username+'#'+message.author.discriminator+' issued command help.');
		message.reply("Hi, I'm Papi and I can do a lot of things!");
		message.channel.send("I can currently do the following commands:");
		message.channel.send("`//ping`, `//id`, `//avatar`, `//status`, `//source`");
		message.channel.send("I can also do a few other things that don't require a specific command, but those are secret!");
		message.channel.send("I'll get more commands as time goes by, so keep checking!");
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
});

bot.login(token);
