const fs = require("fs");
const url = require("url");
const http = require("http");
const exec = require("child_process").exec;
const spawn = require("child_process").spawn;
const yt = require("ytdl-core");
const disc = require('./depen/index');
const rem = require('./depen/rem.js');
const blocked = require('./depen/blocked.js');
const Discord = require("discord.js");
const self = new Discord.Client();
const token = "TOKEN REMOVED"
const prefix = "//";
var cb;
var cmd;
var args = [];

self.on("ready", () => {
	console.log("Papi-Bot v2017.08.03 online in "+self.guilds.array().length+" guilds\nLogged in as "+self.user.tag+"\n");
	self.user.setGame("Type //help to begin!");
});

// Word triggers
self.on("message", msg => {
	if (msg.channel.type == "dm"){return;}

	const send = msg.channel.send.bind(msg.channel);
	const reply = msg.reply.bind(msg);
	const react = msg.react.bind(msg);

	if (msg.author == self.user) return;
	cmd = disc.getcmd(msg.content);
	args = disc.getargs(msg.content);
	mention = msg.mentions.members.first();
	
	switch(msg.author.id) {
		case "273932044868780033": react("🇬🇧");break;
		case "305794406781550602": react("🇦🇴");break;
	}

	//Check for blocked Servers
	if (blocked.check(msg.guild.id)){return;}

	switch(disc.checkBirb(msg.content,msg.guild.id)){
		case 0: break;
		case 1: send("Chirp").catch();break;
		case 2: send("CHIRP").catch();break;
		case 3: send("chirp").catch();break;
		case 4: send("Caw").catch();break;
		case 5: send("CAW").catch();break;
		case 6: send("caw").catch();break;
	}
	switch(disc.checkIm(cmd,msg.guild.id)){
		case 0: break;
		case 1: send('Hi '+args.join(" ")+"!\nI'm Papi!").catch();break;
	}
	switch(disc.checkMisc(msg.content.toLowerCase())){
		case 0: break;
		case 1: reply("end yourself, filthy normie").catch();react("🇰").then(function() { react("🇾").then(function() { react("🇸").then(function(){ }); }); });break;
		case 2: send("lad").catch();break;
		case 3: react("🐦").catch();react("🦅").catch();react("🦆").catch();react("🦉").catch();break;
		case 4: react("🏳️‍🌈").catch();break;
		case 5: react("🐸").catch();break;
		case 6: react("🍅").catch();break;
		case 7: send("yourself").catch();break;
		case 8: reply("no u").catch();break;
		case 9: send("allahu akbar").catch();break;
		case 10: send("Admin he's doing it sideways").catch();break;
		case 11: reply("no u").catch();break;
	}
});

// Actual commands
self.on("message", msg => {
	if (msg.channel.type == "dm"){return;}
	if (!msg.content.startsWith(prefix)) return;
	disc.log(cmd,msg.guild.name,msg.author.tag,args);
	const send = msg.channel.send.bind(msg.channel);
	const reply = msg.reply.bind(msg);
	const react = msg.react.bind(msg);

	// Commands
	switch(cmd){
		case "ping": switch(disc.ping()){
				case 1:
				case 2: send("Hello");break;
				case 3:
				case 4: send("Hi there");break;
				case 5:
				case 6: send("How are you?");break;
				case 7:
				case 8: send("Good to see you");break;
				case 9:
				case 10: send("Online and ready!");break;
			} break;

		case "id": switch(mention){
				case undefined: reply("your Discord ID is "+msg.author.id+"!");break;
				default: reply(msg.mentions.members.first().displayName+"'s Discord ID is "+mention.id+"!");break;
			} break;
		case "avatar": switch(mention){
				case undefined: reply("this is your avatar!\n"+msg.author.displayAvatarURL);break;
				default: reply("this is "+mention.displayName+"'s avatar!\n"+msg.mentions.users.first().displayAvatarURL);break;
			} break;
		case "guildavatar": reply("this is "+msg.guild.name+"'s guild icon!\n"+msg.guild.iconURL);break;
		case "status": switch(mention){
				case undefined: console.log(msg.author.presence);switch(msg.author.presence.game){
						case null: reply("you are currently "+msg.author.presence.status+"!");break;
						default: reply("you are currently "+msg.author.presence.status+" and are playing "+msg.author.presence.game.name+"!");break;
					}break;
				default: switch(mention.presence.game){
						case null: reply(msg.mentions.members.first().displayName+" is currently "+mention.presence.status+"!");break;
						default: reply(msg.mentions.members.first().displayName+" is currently "+mention.presence.status+" and is playing "+mention.presence.game.name+"!");break;
					}break;
			} break;
		case "invite": reply("here's my invite link!\nhttps://discordapp.com/oauth2/authorize?client_id=337217642660233217&scope=bot&permissions=70773825\nMy master says thank you!");break;
		case "source": reply("here's my source code! It's possible that it might not be the most recent version of it, but it should be updated regularily!\nhttps://github.com/Jawesome99/papibot");break;
		case "roll": //roll <text> <digits>
			if (args[args.length-1] !== undefined) {var digits = parseInt(args[args.length-1].toString());var digInArgs = true;} else {var digits = 9;var digInArgs = false;}
			let get;
			if (isNaN(digits)) {digits = 9;digInArgs = false;}
			if (digits > 25) {reply("spam is a bad thing, I hope you can understand that! Can you try again with less than 25 digits, please?");break;}
			if (digits < 1) {reply("I can't generate a number with no digits!");break;}
			reply(disc.roll(digits,args,digInArgs));break;
		case "help": reply(disc.getHelp(args));break;

		//music
		case "join": switch(disc.join(msg.member)){
				case 0: reply("you aren't in a voice channel!");break;
				case 1: msg.member.voiceChannel.join().then(connection => {send("Joined voice channel "+msg.guild.voiceConnection.channel.name+"!")}).catch(console.log);break;
			}break;
		case "leave": switch(disc.leave(msg.guild.voiceConnection)){
				case 0: reply("I'm not in a voice channel!");break;
				case 1: send("Left voice channel "+msg.guild.voiceConnection.channel.name+"!");msg.guild.voiceConnection.channel.leave();break;
			}break;
		case "play": switch(disc.play(msg.guild.voiceConnection,msg.member,args,fs.readdirSync("D:/botmusic/default"),fs.readdirSync("D:/botmusic/userupload"))){
				case 0: reply("something's not right! Either you or me aren't in a voice channel or what you gave me isn't a valid YouTube URL or file name!");break;
				case 1: msg.guild.voiceConnection.playStream(yt(args[0], { audioonly: true }), { passes: 5 });return;
				case 2: msg.guild.voiceConnection.playFile("D:/botmusic/default/"+args.join(" "), { passes: 5 });reply("playing "+args.join(" ")+"!");break;
				case 3: msg.guild.voiceConnection.playFile("D:/botmusic/userupload/"+args.join(" "), { passes: 5 });reply("playing "+args.join(" ")+"!");break;
			}break;
		case "list": reply("these are the currently available files to play:\n```\n"+fs.readdirSync("D:/botmusic/default").join("\n")+"\n"+fs.readdirSync("D:/botmusic/userupload").join("\n")+"\n```");break;
		case "upload": switch(disc.upload(msg.attachments)){
				case -1: reply("you didn't send any attachment!");break;
				case 0: reply("That attachment doesn't have a valid file type!");break;
				case 1: send("Downloading file...");
					var child = exec("wget --no-check-certificate -P D:/botmusic/userupload "+msg.attachments.first().url, function(err,stdout,stderr) {
						if (err) {throw err;} else {console.log(msg.attachments.first().filename+" downloaded to D:/botmusic/userupload");reply("file "+msg.attachments.first().filename+" downloaded successfully!");return;}
					});break;
			}break;
		case "download": switch(disc.download(args,fs.readdirSync("D:/botmusic/default"),fs.readdirSync("D:/botmusic/userupload"))){
				case 0: reply("you need to specify a valid filename");break;
				case 1: reply("Uploading "+args.join(" "));
					send("",{files:["D:/botmusic/default/"+args.join(" ")]}).then(function(){},function(err){console.log(err);send("I couldn't send that file! Sorry!")});break;
				case 2: reply("Uploading "+args.join(" "));
					send("",{files:["D:/botmusic/userupload/"+args.join(" ")]}).then(function(){},function(err){console.log(err);send("I couldn't send that file! Sorry!")});break;
			}break;
		case "delete": console.log(msg.author.id);switch(disc.ownerCheck(msg.author.id)){
				case 0: break;
				case 1: switch(disc.download(args,fs.readdirSync("D:/botmusic/default"),fs.readdirSync("D:/botmusic/userupload"))){
						case 0: reply("you need to specify a valid file name.")
						case 1: fs.unlink("D:/botmusic/default/"+args.join(" "));reply("deleted "+args.join(" ")+"!").catch();break;
						case 2: fs.unlink("D:/botmusic/userupload/"+args.join(" "));reply("deleted "+args.join(" ")+"!").catch();break;
					}
			}break;


	}
});

// Owner commands
self.on("message", msg => {
	if (msg.channel.type == "dm"){return;}
	if (!msg.content.startsWith(prefix)) return;
	const send = msg.channel.send.bind(msg.channel);
	const reply = msg.reply.bind(msg);
	const react = msg.react.bind(msg);

	switch(disc.ownerCheck(msg.author.id)){
		case 0: break;
		case 1: switch(cmd){
				case "say": msg.delete();send(args.join(" "));break;
				case "eval": eval(args.join(" "));break;
				case "setname": msg.guild.me.setNickname(args.join(" ")).then(function(){send("Successfully set my name!")},function(err){send("Couldn't set my name!")});break;
				case "getguilds": switch(disc.getguilds(args)){
						case 0: send("```\n"+self.guilds.array().join("\n")+"\n```");break;
						case 1: let argstring = args.toString();let argtext = argstring.split(",").slice(1);send("```\n"+self.guilds.find('name',argtext.join(" ")).id+"\n```");break;
					}break;
				case "dm": let id = args.shift();
					let text = args;
					self.fetchUser(id).then(function(User) {User.send(text.join(" ")).then(function(){send("Successfully sent \""+text.join(" ")+"\" to "+User.tag)})});break;
				case "react": msg.channel.fetchMessage(args[0]).then(message => message.react(args[1])).catch(console.log);break;
				case "shutdown": msg.channel.send("Papi-Bot was shut down").then(function() {self.destroy();console.log("\nPapi-Bot was shut down.");process.exit(0);}).catch(console.log);
			}
	}
});

// Meme commands
self.on("message", msg => {
	if (msg.channel.type == "dm"){return;}
	if (!msg.content.startsWith(prefix)) return;
	const send = msg.channel.send.bind(msg.channel);
	const reply = msg.reply.bind(msg);
	if (msg.author == self.user) return;
	cmd = disc.getcmd(msg.content);
	args = disc.getargs(msg.content);

	switch(disc.commandCheck(cmd)){
		case 1: break;
		case 0: reply(rem.other(cmd,args));
	}
});

self.on("guildCreate", guild => {
	self.guilds.get("292040520648228864").channels.get("292040520648228864").send("<@211227683466641408>, master! I was added to a new guild!\nName: "+guild.name+"\nID: "+guild.id);
	var intro = ("Hello! My name is Papi-Bot! I hope all "+(guild.memberCount-1)+" of you will enjoy my presence! Type //help to begin!");
	var success = "Successfully sent introduction to new guild";
	var failure = "Couldn't send introduction to new guild";
	var ownerIntro = "Sorry! I tried, but couldn't introduce myself to your server! I'm a new bot and I was added by either you or one of your staff members, though I can't say who exactly it was...\n\
Anyway, it would be great if you could introduce me to your members and tell them that '//help' tells them how to interact with me.\n\n\
Oh, and before I forget it, I react to certain words in a few different ways, if you would like that to be disabled on your server, please message the user '<@211227683466641408>' and tell them to add your server to the list of exceptions. They only need to know the server's name!\n\n\
Thanks for having me!"
	guild.defaultChannel.send(intro).then(function(){console.log(success)},function(){
		if (guild.channels.find("name","general") !== null) {
			guild.channels.find("name","general").send(intro);
		} else if (guild.channels.find("name","social") !== null) {
			guild.channels.find("name","social").send(intro);
		} else {
			guild.owner.createDM().then(function(DMChannel){
				DMChannel.send(ownerIntro);
			},function(){console.log("Couldn't send intro at all.")}
		)}
	});
});

// Forward received DMs to me
self.on("message", msg => {
	if (msg.channel.type == "dm" && msg.author != self.user){
		self.fetchUser("211227683466641408").then(function(User) {User.send("From "+msg.author.tag+": "+msg.content)})
	} else {return;}
});

self.login(token);
