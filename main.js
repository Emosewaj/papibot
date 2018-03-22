const fs = require("fs");
const url = require("url");
const http = require("http");
const yt = require("ytdl-core");
const tl = require("translate");
const Kaori = require("kaori");
const kaori = new Kaori(require("./depen/kaori/moreSites.json"));
const disc = require("./depen/index.js");
const rem = require("./depen/rem.js");
const blocked = require("./depen/blocked.js");
const math = require("./depen/math.js");
const tos = require("./depen/tos.js");
const config = require("./depen/config.js");
const convert = require("./depen/converter.js");

const cfg = require("./config.json");
const Discord = require("discord.js");
const self = new Discord.Client({
    messageCacheLifetime: 90, // A message becomes sweepable after 90 seconds
    messageSweepInterval: 300, // The message cache is emptied every 5 minutes
    disabledEvents: [
        "TYPING_START" // We don't need to listen for users starting or stopping to type.
    ]
});
const prefix = cfg.defaultPrefix;
var token;
switch(cfg.mode) {
	case "main": token = cfg.tokens.main; break;
	case "test": token = cfg.tokens.test; break;
}

var cb;
var cmd;
var args = [];
const facts = require("./data/didyouknow.json");

self.on("ready", () => {
	self.version = "07/03/2018";
	self.commandsUsed = 0;
	self.commandsUsedAllTime = require("./data/cmdUseAllTime.json").value;
	self.errors = {
		notNsfw: "I can't do that here! Try again in an nsfw channel!",
		noArgs: "You need to specify at least one tag! Tags are seperated by spaces!",
		noImage: "Sorry, couldn't find any image with those tags!"
	}
	self.user.setPresence({"game":{"name":"Type //help to begin!"}});
	self.channels.get("419968973287981061").send({embed:new Discord.RichEmbed().setTitle(`Papi-Bot v${self.version}`)
    .addField("Status",self.user.presence.status,true)
    .addField("Version",self.version,true)
    .addField("Guilds",self.guilds.size,true)
    .addField("RAM Usage",`${(process.memoryUsage().heapUsed/1024/1024).toFixed(2)} MB`,true)
    .setColor(self.guilds.get("292040520648228864").me.displayHexColor)
    .setThumbnail(self.user.displayAvatarURL)}); // Notify that we're online
});

// Word triggers
self.on("message", msg => {
	if (msg.channel.type == "dm") return;
	if (msg.author == self.user) return;
	if (tos.check(msg.guild.id) == false) return;
	let wtcmd = config.getcmd(msg.content,msg.guild.id,msg.guild.name);
	let wtargs = disc.getargs(msg.content);
	
	//These are very specific and work regardless of server setting
	if (msg.content.toLowerCase() == "goodnight, papi" || msg.content.toLowerCase() == "good night, papi"){
		let gn;
		let ending;
		if (msg.author.id == "211227683466641408"){
			ending = "master";
		} else {ending = msg.author.username}
		switch(math.randomNo(1,8)){
			case 1: gn = "Goodnight";break;
			case 2: gn = "Good night";break;
			case 3: gn = "Nighty";break;
			case 4: gn = "Nini";break;
			case 5: gn = "Good nighty";break;
			case 6: gn = "Nighty night";break;
			case 7: gn = "Sleep well";break;
			case 8: gn = "Sweet dreams";break;
		}
		msg.channel.startTyping();
		setTimeout(()=>{
			msg.channel.stopTyping(true);
			msg.channel.send(`${gn}, ${ending} = v=`);
		},1500);
		return;
	}

	//Check for blocked Servers
	if (blocked.check(msg.guild.id)) return;
	//Check for blocked Users
	if (blocked.checkUser(msg.author.id)) return;

	switch(disc.checkBirb(msg.content,msg.guild.id)){
		case 0: break;
		case 1: msg.channel.send("Chirp");break;
		case 2: msg.channel.send("CHIRP");break;
		case 3: msg.channel.send("chirp");break;
		case 4: msg.channel.send("Caw");break;
		case 5: msg.channel.send("CAW");break;
		case 6: msg.channel.send("caw");break;
	}

	switch(disc.checkMisc(msg.content.toLowerCase())){
		case 0: break;
		case 1: msg.reply("end yourself, filthy normie");msg.react("🇰").then(() => { msg.react("🇾").then(() => { msg.react("🇸").then(() => {}); }); });break;
		case 2: msg.channel.send("lad");break;
		case 3: msg.react("🐦");msg.react("🦅");msg.react("🦆");msg.react("🦉");break;
		case 4: msg.react("🏳️‍🌈");break;
		case 5: msg.react("🐸");break;
		case 6: msg.channel.send("yourself");break;
		case 7: msg.channel.send("allahu akbar");break;
		case 8: msg.channel.send("Admin he's doing it sideways");break;
		case 9: msg.react("🇰");break;
	}

	if (blocked.checkIm(msg.guild.id)){return;}
	switch(disc.checkIm(wtcmd,wtargs)){
		case 0: break;
		case 1: msg.channel.send(`Hi ${wtargs.join(" ")}!\nI'm Papi!`);msg.react(self.emojis.find("name","heheXD")).catch(console.warn);break;
	}
});

// Actual commands
self.on("message", msg => {
	if (msg.channel.type == "dm"){return;}
	if (!msg.content.startsWith(config.getprefix(msg.guild.id))) {return;}
	if (msg.author == self.user) {return;}
	var embed = new Discord.RichEmbed();
	if (tos.check(msg.guild.id) == false && msg.content.startsWith("//tos") != true){msg.channel.send("This server has not accepted the terms of service yet! Please review and accept them using `//tos`!");return;}
	cmd = config.getcmd(msg.content,msg.guild.id,msg.guild.name);
	args = disc.getargs(msg.content);
	mention = msg.mentions.members.first();
	if (!cmd) {return;}
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("Command",msg.author.displayAvatarURL)
	.setTimestamp()
	.addField("Author",`${msg.author.username}`,true)
	.addField("Guild",`${msg.guild.name}`,true)
	if (msg.content.length > 1024) {
		let longCMD = msg.content
		logEmbed.addField("Command",longCMD.slice(0,1023),true)
		.addField("Command",longCMD.slice(1024),true);
	} else {
		logEmbed.addField("Command",msg.content,true);
	}

	//Check for blocked Users
	if (blocked.checkUser(msg.author.id)){return;}

	self.channels.get("357870372206673921").send({embed: logEmbed});
	self.commandsUsed++
	self.commandsUsedAllTime++
	fs.writeFile("./data/cmdUseAllTime.json",JSON.stringify({value:self.commandsUsedAllTime}),err => {
		if (err) throw err;
	});

	// Commands
	switch(cmd){
		case "ping": {
			msg.channel.send(`Pong!\n📶 Websocket ping: ${self.pings[0]}`).then(m => {
				m.edit(`${m.content}\n📨 Message ping: ${m.createdTimestamp-msg.createdTimestamp}`);
			});
			break;
		}
		case "id": {
			switch(mention){
				case undefined: return msg.reply(`your Discord ID is \`${msg.author.id}\`!`);break;
				default: return msg.reply(`${msg.mentions.members.first().displayName}'s Discord ID is \`${mention.id}\`!`);break;
			}
		}
		case "avatar": {
			switch(mention){
				case undefined: return msg.reply("this is your avatar!",{embed: {author: {name: "Click here for the full size!", url: msg.author.displayAvatarURL}, image: {url: msg.author.displayAvatarURL}}});break;
				default: return msg.reply(`this is ${mention.displayName}'s avatar!`,{embed: {author: {name: "Click here for the full size!", url: msg.mentions.users.first().displayAvatarURL}, image: {url: msg.mentions.users.first().displayAvatarURL}}});break;
			}
		} 
		case "guildinfo": {
			embed.setTitle("Guild Information")
			.setAuthor(msg.guild.name, msg.guild.iconURL)
			.setFooter(`Info requested by ${msg.author.tag}`, msg.author.displayAvatarURL)
  			.setTimestamp()
			.addField("Owner:", msg.guild.owner.user.tag, true)
			.addField("Member count:", msg.guild.memberCount, true)
			.addField("Guild region:", msg.guild.region, true)
			.addField("Channel count:",msg.guild.channels.size,true)
			.addField("Emoji count:",msg.guild.emojis.size,true)
			.addField("My prefix:",config.getprefix(msg.guild.id),true)
			.addField("Created at:", msg.guild.createdAt)
			.addField("Guild icon:",msg.guild.iconURL.toString())
			.setColor(msg.guild.me.displayHexColor)
			.setThumbnail(msg.guild.iconURL);
			return msg.channel.send({embed});
		}
		case "userinfo": {
			let member;
			switch(mention) {
				case undefined: member = msg.member; break;
				default: member = msg.mentions.members.first(); break;
			}
			let sharedServers = 0;
			self.guilds.forEach(Guild => {
				if (Guild.members.has(member.id)) {
					sharedServers++;
				}
			})
			embed.setTitle("User Information")
			.setAuthor(member.user.tag, member.user.displayAvatarURL)
			.setFooter(`Info requested by ${msg.author.tag}`, msg.author.displayAvatarURL)
			.setTimestamp()
			.addField("Username:",member.user.username,true)
			.addField("Discriminator:",member.user.discriminator,true)
			.addField("Discord ID:",member.id,true)
			.addField("Account created at:",member.user.createdAt,true)
			.addField("Is a bot:",member.user.bot.toString().replace("true","Yes").replace("false","No"),true);
			let status = member.user.presence.status.replace("online","Online").replace("offline","Offline").replace("idle","AFK").replace("dnd","Do Not Disturb");
			if (member.user.presence.game != null) {
				embed.addField("Presence:",`Status: ${status} | Playing: ${member.user.presence.game.name}`,true);
			} else {
				embed.addField("Presence:",`Status: ${status}`,true);
			}
			embed.addField("Servers shared with Papi-Bot:",sharedServers,true)
			.addField("\u200B","**Guild Member Information**")
			.addField("Joined at:",member.joinedAt,true)
			.addField("Nickname:",new String(member.nickname).replace("null","None"),true)
			.addField("Highest Role:",member.highestRole.name,true)
			.addField("Name Colour (hex):","`"+member.displayHexColor+"`",true)
			.addField("\u200B","**Avatar**")
			.addField("Avatar URL:",member.user.displayAvatarURL)
			.setColor(member.displayHexColor)
			.setThumbnail(member.user.displayAvatarURL);
			return msg.channel.send({embed});
		}
		case "status": {
			switch(mention){ // TODO: Make this code better
				case undefined: switch(msg.author.presence.game){
						case null: return msg.reply(`you are currently ${msg.author.presence.status}!`);
						default: return msg.reply(`you are currently ${msg.author.presence.status} and are playing ${msg.author.presence.game.name}!`);
					}
				default: switch(mention.presence.game){
						case null: return msg.reply(`${msg.mentions.members.first().displayName} is currently ${mention.presence.status}!`);
						default: return msg.reply(`${msg.mentions.members.first().displayName} is currently ${mention.presence.status} and is playing ${mention.presence.game.name}!`);
					}
			}
		}
		case "invite": {
			embed.setAuthor("Select a link!",self.user.displayAvatarURL)
			.setDescription("[Invite me to your server!](https://discordapp.com/oauth2/authorize?client_id=337217642660233217&scope=bot&permissions=70773831)\n[Join the support server!](https://discord.gg/cXVD7Vm)")
			return msg.channel.send({embed});
		}
		case "source": {
			embed.setAuthor("Click here for my source repository!",self.user.displayAvatarURL,"https://github.com/Jawesome99/papibot")
			.setDescription("Please mind, that it might not be on the most recent version!")
			.addField("Last update:",self.version);
			return msg.channel.send({embed});
		}
		case "roll": {
			if (args[args.length-1] !== undefined) {
				var digits = parseInt(args[args.length-1].toString());
				var digInArgs = true;
			} else {
				var digits = 9;
				var digInArgs = false;
			}
			let get;
			if (isNaN(digits)) {
				digits = 9;digInArgs = false;
			}
			if (digits > 25) {
				msg.reply("spam is a bad thing, I hope you can understand that! Can you try again with less than 25 digits, please?");break;
			}
			if (digits < 1) {
				msg.reply("I can't generate a number with no digits!");break;
			}
			return msg.reply(disc.roll(digits,args,digInArgs));
		}
		case "help": {
			return msg.reply(disc.getHelp(args,msg.guild.id));
		}
		case "bug": {
			embed.setAuthor("Found a bug? Click here to create an issue report!",self.user.displayAvatarURL,"https://github.com/Jawesome99/papibot/issues");
			return msg.channel.send({embed});
		}
		case "8ball": {
			return msg.reply(args.join(" "),{files:[`./data/8ball/${disc.eightball()}.gif`]});
		}
		case "reverse": {
			msg.channel.send(disc.reverse(msg.content)).then(() => {},() => {
				msg.channel.send("You need to send me some text for that!")
			});
			return
		}
		case "calc": {
			if (!args[0]) {
				return msg.channel.send("You have to give me an equation!");
			}
			return msg.reply(math.calc(args));
		}
		case "decide": {
			if (!args[0]) {
				return msg.channel.send("Decide what?");
			}
			return msg.reply(disc.decideForMe(args));
		}
		case "toggle": {
			if(msg.member.permissions.has("MANAGE_GUILD") || msg.author.id === "211227683466641408" || msg.author.id === "297556557774979072") {
				if (args[0] === undefined) {
					return msg.channel.send("What do you want to toggle?");
				}
				if (args[0].toLowerCase() === "wt") {
					return msg.channel.send(blocked.toggleWT(msg.guild.id));
				}
				if (args[0].toLowerCase() === "im") {
					return msg.channel.send(blocked.toggleIm(msg.guild.id));
				}
				if (args[0].toLowerCase() === "bc") {
					return msg.channel.send(blocked.toggleBC(msg.guild.id));
				}
				else {
					return msg.channel.send("Accepted parameters: `wt`, `im`, `bc`");
				};
			} else {
				return msg.channel.send("You do not have permission to do that!")
			};
		}
		case "sendnoots": {
			let noots = fs.readFileSync("./data/sendnoots.txt","utf8").split("\r\n");
			return msg.channel.send("Noot noot!",{files:[noots[math.randomNo(0,noots.length-1)]]});
		}
		case "info": {
			embed.setAuthor("Papi-Bot",self.user.displayAvatarURL,"https://discordapp.com/oauth2/authorize?client_id=337217642660233217&scope=bot&permissions=70773831")
			.setDescription("Click my name for my invite link!")
			.addField("Users cached",self.users.size,true)
			.addField("Servers available",self.guilds.size,true)
			.addField("Emoji available",self.emojis.size,true)
			.addField("Last Ping",self.pings[0],true)
			.addField("D.JS version",Discord.version,true)
			.addField("Commands used (since last restart)",self.commandsUsed,true)
			.addField("Commands used (all time)",self.commandsUsedAllTime,true)
			.setColor(msg.guild.me.displayHexColor);
			let usage = process.memoryUsage().heapUsed;let size = ["B","KB","MB","GB"];let usageData = 0
			while (usage/1024 >= 1) {
				usage = usage/1024;usageData++
			}
			embed.addField("Memory Usage",parseInt(usage)+size[usageData],true);
			let uptime = disc.parseUptime(process.uptime());
			embed.addField("Uptime",uptime,true)
			.setTimestamp();
			return msg.channel.send({embed});
		}
		case "ss":
		case "superscript": {
			return msg.channel.send(disc.superscript(args));
		}
		case "report": {
			if (!args[0]) {
				return msg.channel.send("Report a user by mentioning them and include a reason! Evidence has to be provided, otherwise your report might be ignored! You can either include a link somewhere in your report or send an attachment, i.e. a photo!\nAbusing this feature will result in you being blocked from using the bot!");
			}
			if (!mention) {
				return msg.channel.send("Who are you reporting? Mention them!");
			}
			let reporter = msg.author;
			let reportee = mention.user;
			let reason = args.join(" ");
			let guild = msg.guild.name;
			if (msg.attachments.first()) {
				let attachment = msg.attachments.first().url;
				self.fetchUser("211227683466641408").then(Owner => {
					Owner.send(`A report has been sent in by ${reporter.tag} (ID: ${reporter.id}) from ${guild}\nReportee: ${reportee.tag} (ID: ${reportee.id})\n\nReason: ${reason}\nEvidence: ${attachment}`);
					msg.channel.send("Your report has been submitted!");
				})
			} else {
				self.fetchUser("211227683466641408").then(Owner => {
					Owner.send(`A report has been sent in by ${reporter.tag} (ID: ${reporter.id}) from ${guild}\nReportee: ${reportee.tag} (ID: ${reportee.id})\n\nReason: ${reason}\nNo attachment provided!`);
					msg.channel.send("Your report has been submitted!");
				})
			};
			break;
		}
		case "rc":
		case "randcap": {
			if (!args[0]) {
				return msg.channel.send("You need to send me some text for that!");
			}
			return msg.channel.send(disc.randCap(args));
		}
		case "die": {
			return msg.channel.send(math.die(args[0]));
		}
		case "fact": {
			let fact = math.randomNo(0,facts.length-1);
			return msg.channel.send(`Fact #${fact+1}: ${facts[fact]}`);
		}
		case "morse": {
			let alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(""),
				morse = "/,.-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..,.----,..---,...--,....-,.....,-....,--...,---..,----.,-----".split(","),
				text = args.join(" ").toUpperCase();
			while (text.includes("Ä") || text.includes("Ö") || text.includes("Ü")) {
				text = text.replace("Ä","AE").replace("Ö","OE").replace("Ü","UE");
			}
			if (text.startsWith(".") || text.startsWith("-")) {
				text = text.split(" ");
				let length = text.length;
				for (i = 0; i < length; i++) {
					text[i] = alpha[morse.indexOf(text[i])];
				}
				text = text.join("");
			} else {
				text = text.split("");
				let length = text.length;
				for (i = 0; i < length; i++) {
					text [i] = morse[alpha.indexOf(text[i])];
				}
				text = text.join(" ");
			}
			return msg.channel.send("```"+text+"```");
		}
		case "convert": {
			return msg.channel.send(convert.convert(args[0], args[1], args[2]));
		}
		case "translate": {
			return msg.channel.send("Loading...").then(m => {
				let to = args.pop();
				let from = args.pop();
				let text = args.join(" ");
				if (!to || !from || !text) return m.edit("Error: Invalid arguments:```//translate <text> <from> <to>```");
				try {disc.language(to)} catch (err) {m.edit(`Error parsing target language: ${err}`); return;}
				try {disc.language(from)} catch (err) {m.edit(`Error parsing source language: ${err}`); return;}
				tl(text,{from, to, engine: cfg.tlEngine, key: cfg.tlKey}).then(translation => {
					m.edit({
						embed: new Discord.RichEmbed().setTitle("Translation")
						.setDescription(`[Powered by Yandex.Translate](http://translate.yandex.com/?lang=${disc.language(from)}-${disc.language(to)}&text=${encodeURIComponent(text)})`)
						.addField(from,"```\n"+text+"```")
						.addField(to,"```\n"+translation+"```")
						.setTimestamp()
					});
				}, err => {m.edit(`Error: ${err}`)});
			});
			break;
		}
		case "afk": {
			if (!args[0]) return msg.channel.send("Error: Please provide a reason!");
			let reason = args.join(" ");
			return config.setAFK(msg.author.id,reason).then(() => {
				return msg.channel.send("I've set your AFK message, see you soon!");
			},err => {
				return msg.channel.send(`Error setting your AFK message: ${err}`);
			});
		}

		//NSFW
		case "sendnudes": {
			if(!(msg.channel.nsfw || msg.channel.name.toLowerCase().includes("nsfw"))) return msg.channel.send(self.errors.notNsfw);
			let nudes = fs.readFileSync("./data/sendnudes.txt","utf8").split("\r\n");
			return msg.channel.send("P-please don't stare...", {files: [nudes[math.randomNo(0,nudes.length-1)]]});
		}
		case "e621": {
			if (!(msg.channel.nsfw || msg.channel.name.toLowerCase().includes("nsfw"))) return msg.channel.send(self.errors.notNsfw);
			if (!args) return msg.channel.send(self.errors.noArgs);
			return msg.channel.send("Taking a look...").then(m => {
				return kaori.search("e621", {tags: args, random: true, limit: 1}).then(images => {
					return m.edit("Found a picture!",{
						embed: new Discord.RichEmbed()
						.setImage(images[0].common.fileURL)
						.setTitle("Click here to open full image!")
						.setURL(images[0].common.fileURL)
						.setDescription(`Rating: ${disc.parseRating(images[0].common.rating)}\nScore: ${images[0].common.score}`)
					});
				}).catch(e => m.edit(self.errors.noImage));
			});
		}
		case "danbooru": {
			if (!(msg.channel.nsfw || msg.channel.name.toLowerCase().includes("nsfw"))) return msg.channel.send(self.errors.notNsfw);
			if (!args) return msg.channel.send(self.errors.noArgs);
			if (args.length > 2) return msg.channel.send("Sorry, I can't search for more than 2 tags at a time with danbooru!")
			return msg.channel.send("Taking a look...").then(m => {
				return kaori.search("danbooru", {tags: args, random: true, limit: 1}).then(images => {
					return m.edit("Found a picture!",{
						embed: new Discord.RichEmbed()
						.setImage(images[0].common.fileURL)
						.setTitle("Click here to open full image!")
						.setURL(images[0].common.fileURL)
						.setDescription(`Rating: ${disc.parseRating(images[0].common.rating)}\nScore: ${images[0].common.score}`)
					});
				}).catch(e => m.edit(self.errors.noImage));
			});
		}
		case "gelbooru": {
			if (!(msg.channel.nsfw || msg.channel.name.toLowerCase().includes("nsfw"))) return msg.channel.send(self.errors.notNsfw);
			if (!args) return msg.channel.send(self.errors.noArgs);
			return msg.channel.send("Taking a look...").then(m => {
				return kaori.search("gelbooru", {tags: args, random: true, limit: 1}).then(images => {
					return m.edit("Found a picture!",{
						embed: new Discord.RichEmbed()
						.setImage(images[0].common.fileURL)
						.setTitle("Click here to open full image!")
						.setURL(images[0].common.fileURL)
						.setDescription(`Rating: ${disc.parseRating(images[0].common.rating)}\nScore: ${images[0].common.score}`)
					});
				}).catch(e => m.edit(self.errors.noImage));
			});
		}
		case "rule34": {
			if (!(msg.channel.nsfw || msg.channel.name.toLowerCase().includes("nsfw"))) return msg.channel.send(self.errors.notNsfw);
			if (!args) return msg.channel.send(self.errors.noArgs);
			return msg.channel.send("Taking a look...").then(m => {
				return kaori.search("rule34", {tags: args, random: true, limit: 1}).then(images => {
					return m.edit("Found a picture!",{
						embed: new Discord.RichEmbed()
						.setImage(images[0].common.fileURL)
						.setTitle("Click here to open full image!")
						.setURL(images[0].common.fileURL)
						.setDescription(`Rating: ${disc.parseRating(images[0].common.rating)}\nScore: ${images[0].common.score}`)
					});
				}).catch(e => m.edit(self.errors.noImage));
			});
		}

		//Music
		/*
		case "join": {
			switch(disc.join(msg.member)){
				case 0: {
					return msg.reply("you aren't in a voice channel!");
				}
				case 1: {
					msg.member.voiceChannel.join().then(connection => {
						msg.channel.send(`Joined voice channel ${msg.guild.voiceConnection.channel.name}!`);
					}).catch(msg.channel.send(`I couldn't join ${msg.member.voiceChannel.name}!\n`));
				}
			}
			break;
		}
		case "leave": {
			switch(disc.leave(msg.guild.voiceConnection)){
				case 0: {
					return msg.reply("I'm not in a voice channel!");
				}
				case 1: {
					msg.channel.send(`Left voice channel ${msg.guild.voiceConnection.channel.name}!`);
					return msg.guild.voiceConnection.channel.leave();
				}
			}
			return;
		}
		case "play": {
			switch(disc.play(msg.guild.voiceConnection,msg.member)){
				case 0: {
					return msg.reply("you and I need to be in the same voice channel!");
					break;
				}
				case 1: {
					msg.channel.startTyping();
					yt.getInfo(args[0], (err, info) => {
						if (err) {
							msg.channel.send(`An error occured: ${err.message}`);
							return msg.channel.stopTyping(true);
						}

						let runtime = disc.parseUptime(info.length_seconds);
						let video = new Discord.RichEmbed()
						.setAuthor(info.author.name,info.author.avatar,info.author.channel_url)
						.setThumbnail(info.iurlmaxres)
						.setTitle(info.title)
						.addField("Length:",runtime,true)
						.addField("Viewcount:",info.short_view_count_text,true)
						.setColor(msg.guild.me.displayHexColor);
						if (info.description.length > 150) {
							video.setDescription(`${info.description.slice(0,149)}...`);
						} else {
							video.setDescription(info.description);
						}

						if (msg.guild.voiceConnection.speaking) {
							// Stop the running audio if there's a dispatcher and let the event handle the playing.
							let toPlay = args[0];
							if (msg.guild.dispatcher && !msg.guild.dispatcher.ended) {
								let m = msg;
								let connection = m.guild.voiceConnection;
								let dispatcher = m.guild.dispatcher;
								dispatcher.on("end", () => {
									m.reply("playing your video!",{embed:video});
									m.channel.stopTyping(true);
									m.guild.dispatcher = connection.playStream(yt(toPlay, {audioonly: true}), {passes: 1});
									msg.delete().then(()=>{},reason=>{console.warn(reason)});
									return;
								})
								
								msg.guild.dispatcher.end();
							}
							return;
						}	

						msg.reply("sure thing, playing your video!",{embed:video});
						msg.channel.stopTyping(true);
						msg.guild.dispatcher = msg.guild.voiceConnection.playStream(yt(args[0], { audioonly: true }), { passes: 1 });
						return msg.delete().then(()=>{},reason=>{console.warn(reason)});
					});
					break;
				}
			}
			return;
		}
		*/
		case "join":
		case "leave":
		case "play": return msg.channel.send("The music commands are currently not available. :frowning:")
			
		//Administrative
		case "kick": {
			if (msg.member.permissions.has("KICK_MEMBERS")) {
				if (msg.guild.members.get(self.user.id).permissions.has("KICK_MEMBERS")) {
					if (msg.mentions.members.first() === undefined) {
						msg.channel.send("You need to tag someone!")
					} else {args.shift();msg.mentions.members.first().kick(args.join(" ")).then(() => {msg.channel.send(`Kicked ${msg.mentions.users.first().tag}!`)},err => {msg.channel.send(`Something went wrong: ${err}`)});return;
					}
				} else {
					msg.channel.send("I don't have the required permission! Please add it by enabling \"Kick Members\" for the Papi-Bot role!");return;
				}
			} else {
				msg.channel.send("You don't have the required permission to do that!");return;
			}
		}
		break;
		case "ban": {
			if (msg.member.permissions.has("BAN_MEMBERS")) {
				if (msg.guild.members.get(self.user.id).permissions.has("BAN_MEMBERS")) {
					if (msg.mentions.members.first() === undefined) {
						msg.channel.send("You need to tag someone!")
					} else {
						args.shift();msg.mentions.members.first().ban({reason: args.join(" ")}).then(() => {msg.channel.send(`Banned ${msg.mentions.users.first().tag}!`)},err => {msg.channel.send(`Something went wrong: ${err}`)});return;
					}
				} else {
					msg.channel.send("I don't have the required permission! Please add it by enabling \"Ban Members\" for the Papi-Bot role!");return;
				}
			} else {
				msg.channel.send("You don't have the required permission to do that!");return;
			}
		}
		break;
		case "setprefix": {
			if (!msg.member.permissions.has("MANAGE_GUILD")) {msg.channel.send("You do not have the required permission!");break;}
			if (!args[0]) {msg.channel.send("You didn't specify a new prefix!");break;}
			else {switch(config.changePrefix(msg.guild,args[0])){
				case 0: msg.channel.send("Error setting prefix! Please contact owner through DM!");break;
				case 1: msg.channel.send(`Successfully set command-prefix to ${args[0]}!`);break;
				default: msg.channel.send("Unexpected return value! Please contact owner through DM!");break;
			}}
		}
		break;
		case "setwelcome": {
			if (!msg.member.permissions.has("MANAGE_GUILD")) {msg.channel.send("You do not have the required permission!");break;}
			msg.channel.send("Please enter the name of the channel you would like to have the welcome messages appear, type `dm` to send the welcome message to the new member's private chat, `remove` to disable or type `cancel` to abort!\nExample:\n`general`");
			let collector = msg.channel.createMessageCollector(m => m.author == msg.author,{ time: 20000 });
			collector.on("collect",m => {
				if (m.content == "cancel") {collector.stop();msg.channel.send("Command was cancelled.")}
				else if (m.content == "remove") {collector.stop();config.removeWelcome(m.guild.id).then(resolve => {msg.channel.send(resolve)},error => {msg.channel.send(error)})}
				else {
					collector.stop();
					if (m.content == "dm") {
						var welcomeChannel = {id: "dm"}
					} else {
						var welcomeChannel = m.guild.channels.find(Channel => {if (Channel.name.includes(m.content)) {return true;} else {return false;}})
						if (!welcomeChannel) {msg.channel.send("I couldn't find a channel with that name! Please try again!");return;}
						if (!welcomeChannel.permissionsFor(m.guild.me).has("SEND_MESSAGES")) {msg.channel.send("I can't send messages to that channel, command aborted!");return;}
					}
					msg.channel.send("Please send me the message you would like me to display! You can use the following operators: `$MEMBER_NAME`, `$MEMBER_TAG`, `MEMBER_MENTION`, `$GUILD_NAME`, `$GUILD_MEMBERCOUNT`!\nType `cancel` to abort!\nExample:\n`Hello, $MEMBER_NAME, welcome to $GUILD_NAME!`");
					let collector2 = m.channel.createMessageCollector(m2 => m2.author == msg.author,{ time: 60000 });
					collector2.on("collect",m2 => {
						if (m2.content == "cancel") {collector2.stop();msg.channel.send("Command was cancelled.")}
						else {
							collector2.stop();
							config.setWelcome(m2.guild.id,welcomeChannel.id,m2.content).then(answer => {msg.channel.send(answer);},error => {msg.channel.send(error);});
							return;
						}
					})
					collector2.on("end",(collected,reason) => {
						if (reason == "time") {msg.channel.send("Command was cancelled.");return;}
					})
				}
			});
			collector.on("end",(collected,reason) => {
				if (reason == "time") {msg.channel.send("Command was cancelled.");return;}
			});
		}
		break;
		case "setlog": {
			if (!msg.member.permissions.has("MANAGE_GUILD")) {msg.channel.send("You do not have the required permission!");break;}
			let logSettings = config.getLogSettings(msg.guild.id);
			if (logSettings == null) {
				msg.channel.send("This server is not currently logging any activity! Please enter a channel name to be used for logging or `cancel` to abort!")
				let collector = msg.channel.createMessageCollector(m => m.author == msg.author,{time: 45000});
				collector.on("collect",m => {
					if (m.content.toLowerCase() == "cancel") {
						collector.stop("time");
					}
					else if (m.guild.channels.find("name",m.content) && m.guild.channels.find("name",m.content).permissionsFor(m.guild.me).has("SEND_MESSAGES")) {
						m.channel.send(`Using ${m.content} as the log channel! You can now change your log settings using \`//setlog\`!`);
						config.setLogSettings(m.guild.id,m.guild.channels.find("name",m.content).id,null);
						return;
					}
				})
				collector.on("end",(collected,reason) => {
					if (reason == "time") {msg.channel.send("Command aborted!");return;}
				})
			} else {
				switch(args[0]){
					case "channel": {
						config.setLogSettings(msg.guild.id,logSettings.channel,"channel").then(resolve => {
							msg.channel.send(resolve);
						}, reject => {
							msg.channel.send(reject);
						});
						return;
					}
					case "emoji": {
						config.setLogSettings(msg.guild.id,logSettings.channel,"emoji").then(resolve => {
							msg.channel.send(resolve);
						}, reject => {
							msg.channel.send(reject);
						});
						return;
					}
					case "bans": {
						config.setLogSettings(msg.guild.id,logSettings.channel,"ban").then(resolve => {
							msg.channel.send(resolve);
						}, reject => {
							msg.channel.send(reject);
						});
						return;
					}
					case "member": {
						config.setLogSettings(msg.guild.id,logSettings.channel,"member").then(resolve => {
							msg.channel.send(resolve);
						}, reject => {
							msg.channel.send(reject);
						});
						return;
					}
					case "guild": {
						config.setLogSettings(msg.guild.id,logSettings.channel,"guild").then(resolve => {
							msg.channel.send(resolve);
						}, reject => {
							msg.channel.send(reject);
						});
						return;
					}
					default: {
						let text = (`These are the current logging settings: \n\n${logSettings.settings.guildUpdates} Log guild updates? \n${logSettings.settings.channelUpdates} Log channel updates? \n${logSettings.settings.memberUpdates} Log member updates? \n${logSettings.settings.banUpdates} Log bans? \n${logSettings.settings.emojiUpdates} Log emoji updates? \n\nTo toggle either of the settings, use \`//setlog <setting>\`, for example: \`//setlog member\``);
						while (text.includes("true") || text.includes("false")) {
							text = text.replace("true","☑");
							text = text.replace("false","❌");
						}
						msg.channel.send(text);
					}
				}
			}
			
		}
		break;
		case "cleanup": {
			if (!msg.member.permissions.has("MANAGE_MESSAGES")) return msg.channel.send("You don't have the permission to do that!");
			let prunecount = parseInt(args[0]);
			msg.channel.fetchMessages({ limit: 100 }).then(Messages => {
				let msgArray = Messages.filterArray(m => m.author.id === self.user.id);
				if (msgArray.length > prunecount) msgArray.length = prunecount;
				msg.channel.bulkDelete(msgArray).then(Msgs => {
					msg.channel.send(`Cleaned up ${Msgs.size} of my messages!`).then(m => {m.delete(5000);msg.delete(5000)});
				}, e => {
					msg.channel.send("Bulk delete failed, using fallback method.").then(m => {
						msgArray.push(m);
						var Msgs = 0;
						function del(i) {
							msgArray[i].delete().then(() => {
								Msgs++;
								if (i == msgArray.length-1) {
									msg.channel.send(`Cleaned up ${Msgs} of my messages!`).then(m1 => {m1.delete(5000);msg.delete(5000)});
								} else {del(i+1)}
							});
						}
						del(0);
					});
				})
			});
		}
		break;
	}
});

//AFK messages
self.on("message", msg => {
	if (msg.author == self.user || msg.channel.type == "dm" || !tos.check(msg.guild.id) || msg.content.startsWith(config.getprefix(msg.guild.id))) return;
	if (config.getAFK(msg.author.id)) {
		config.delAFK(msg.author.id).then(() => {
			return msg.channel.send(`Welcome back, ${msg.author.username}! I've removed your AFK message!`);
		},err => {return console.log(err)});
	}

	if (msg.mentions.members.first() && config.getAFK(msg.mentions.members.first().id)) {
		return msg.channel.send(`Hey there! **${msg.mentions.users.first().username}** is currently not available! Reason: *${config.getAFK(msg.mentions.members.first().id)}*`);
	}
});

// Owner commands
self.on("message", async msg => {
	if (msg.channel.type == "dm"){return;}
	if (!msg.content.startsWith(config.getprefix(msg.guild.id))) return;
	if (tos.check(msg.guild.id) == false && !disc.ownerCheck(msg.author.id)){;return;}
	
	const commands = ["say","eval","setname","getguilds","dm","react","sendintro","restart","shutdown","broadcast","block","unblock","exec","reply"];
	if (commands.includes(cmd)){
		switch(disc.ownerCheck(msg.author.id)){
			case false: return msg.channel.send(disc.explainOwnerCMD(cmd));
			case true: switch(cmd) {
				case "say": {
					msg.delete().then(()=> {
						return msg.channel.send(args.join(" "));
					},()=> {
						return;
					});
					break;
				}
				case "eval": {	
					try {		
						let result = eval(args.join(" "));
						if (result instanceof Promise) {
							result = await result;
						}
					} catch(err) {
						return msg.channel.send(`Error: ${err.message}`);
					};
					return;
				}
				case "exec": {
					try {
						let result = eval(args.join(" "));
						if (result instanceof Promise) {
							result = await result;
							if (result != null && result != undefined && !result) {
								return msg.channel.send(`\`\`\`typeof ${typeof result}\ninstanceof ${result.constructor.toString().split("{")[0]}\`\`\`\n\`\`\`\n${result}\`\`\``);
							} else {
								return msg.channel.send(`\`\`\`\n${result}\`\`\``);
							}
						} else {
							if (result != null && result != undefined && !result) {
								return msg.channel.send(`\`\`\`typeof ${typeof result}\ninstanceof ${result.constructor.toString().split("{")[0]}\`\`\`\n\`\`\`\n${result}\`\`\``);
							} else {
								return msg.channel.send(`\`\`\`\n${result}\`\`\``);
							}
						}
					} catch(err) {
						return msg.channel.send(`Error: ${err.message}`);
					};
					return;
				}
				case "setname": {
					msg.guild.me.setNickname(args.join(" ")).then(() => {
						return msg.channel.send("Successfully set my name!");
					}, err => {
						return msg.channel.send(`Error, couldn't set my name: ${err}`);
					});
					break;
				}
				case "getguilds": {
					let argstring;
					let argtext;
					switch(disc.getguilds(args)){
						case 0: {
							let list = [];
							self.guilds.forEach(Guild => {list.push(`${Guild.memberCount} - ${Guild.name}`)})
							return msg.channel.send(`\`\`\`${list.join("\n")}\`\`\``);
						}
						case 1: {
							argstring = args.toString();
							argtext = argstring.split(",").slice(1);
							return msg.channel.send(`\`\`\`\n${self.guilds.find('name',argtext.join(" ")).id}\n\`\`\``);
						}
						case 2: {
							argstring = args.toString();
							argtext = argstring.split(",").slice(1);
							return msg.channel.send(`\`\`\`\n${self.guilds.find("name",argtext.join(" ")).owner.user.tag}\n\`\`\``);
						}
					}
					break;
				}
				case "dm": {
					let id = args.shift();
					self.fetchUser(id).then(User => {
						User.send(args.join(" ")).then(() => {
							return msg.channel.send(`Successfully sent "${args.join(" ")}" to ${User.tag}`);
						}, err => {
							return msg.channel.send(`Error: ${err}`);
						});
					});
					break;
				}
				case "reply": {
					if(!global.lastDM) return;
					global.lastDM.send(args.join(" ")).then(() => {
						return msg.channel.send(`Successfully sent "${args.join(" ")}" to ${global.lastDM.tag}!`);
					}, err => {
						return msg.channel.send(`Error: ${err}`);
					});
					break;
				}
				case "react": {
					msg.channel.fetchMessage(args[0]).then(message => {
						return message.react(args[1]);
					}).catch(console.warn);
					break;
				}
				case "sendintro": {
					let newGuild = self.guilds.get(args[0]);
					var intro = (`Hello! Sorry for my late introduction, unfortunately I was added while I was offline, so I didn't notice! Anyway, my name is Papi and I hope all ${newGuild.memberCount-1} of you will enjoy my presence!\n\nType //help to begin!`);
					let channel = newGuild.channels.find(Channel => {
						if(Channel.permissionsFor(newGuild.me).has("SEND_MESSAGES")) {
							return true;
						} else {
							return false;
						}
					});
					channel.send(intro).then(() => {
						return self.channels.get("419962831522234368").send("Successfully sent intro")
					},err => {
						return self.channels.get("419962831522234368").send(`Couldn't send intro: ${err}`)
					});
					break;
				}
				case "broadcast": {
					let channels = [];
					self.guilds.forEach(g => {
						if (blocked.checkBroadcasts(g.id)) return;
						let channel = g.channels.find(ch => {
							if (ch.type == "text" &&
							ch.permissionsFor(self.user).has("VIEW_CHANNEL") &&
							ch.permissionsFor(self.user).has("SEND_MESSAGES") &&
							!ch.name.includes("rule") &&
							!ch.name.includes("support") &&
							!ch.name.includes("announce") &&
							!ch.name.includes("staff") &&
							!ch.name.includes("log")
							) return true;
						});
						if (!channel) return;
						channels.push(channel);
					});
					const text = args.join(" ");
					var sends = 0;

					function sendBroadcast(text) {
						let channel = channels.shift();
						let prefix = config.getprefix(channel.guild.id);
						let toSend = text;
						while (toSend.includes("$PREFIX")) {
							toSend = toSend.replace("$PREFIX",prefix);
						}
						channel.send(toSend).then(() => {
							sends++;
							console.log(`Message sent to #${channel.name} in ${channel.guild.name}, sent to ${sends}/${self.guilds.size} guilds`);
							if (channels.length != 0) setTimeout(() => {sendBroadcast(text)},2500);
						}).catch(e => {
							console.log(`Couldn't send a message to #${channel.name} in ${channel.guild.name}: ${e}`);
							if (channels.length != 0) setTimeout(() => {sendBroadcast(text)},2500);
						});
					}
					
					return sendBroadcast(text);
				}
				case "block": {
					if (!mention && isNaN(args[0])) {
						return msg.channel.send("Mention someone to block or use their ID!");
					}
					if (mention) {
						return msg.channel.send(blocked.blockUser(mention.id));
					}
					if (!isNaN(args[0])) {
						return msg.channel.send(blocked.blockUser(args[0]));
					}
				}
				case "unblock": {
					if (!mention && isNaN(args[0])) {
						return msg.channel.send("Mention someone to unblock or use their ID!");
					}
					if (mention) {
						return msg.channel.send(blocked.unblockUser(mention.id));
					}
					if (!isNaN(args[0])) {
						return msg.channel.send(blocked.unblockUser(args[0]));
					}
				}
				case "shutdown": {
					msg.channel.send("Papi-Bot was shut down.").then(() => {
						self.destroy().then(() => {
							console.log("\nPapi-Bot was shut down.");
							return process.exit(0);
						}).catch(console.warn)
					});
				}
			}
		}
	} else {
		return;
	}
});

// Meme command
self.on("message", msg => {
	if (msg.channel.type == "dm"){return;}
	if (!msg.content.startsWith(config.getprefix(msg.guild.id))) return;
	if (msg.author == self.user) return;

	//Check for blocked Users
	if (blocked.checkUser(msg.author.id) || !args[0]) return;

	switch(disc.commandCheck(cmd)){
		case 1: return;
		case 0: return msg.reply(rem.other(cmd,args));
	}
});

// Guild introduction	
self.on("guildCreate", guild => {
	var intro = (`Hello! My name is Papi-Bot! I hope all ${guild.memberCount-1} of you will enjoy my presence! Please accept the terms of service to begin (\`//tos\`)!`);
	var ownerIntro = `Hello, my name is Papi-Bot and I was just added to your guild ${guild.name}! Unfortunately I can't introduce myself because there is no channel I can currently speak in. Please make sure I can send messages to at least one channel, then use \`//tos\` to read and accept or deny my terms of service! Thanks for having me around!`;
	let invChannel = guild.channels.find(Channel => {if (Channel.permissionsFor(guild.me).has("SEND_MESSAGES") && Channel.type == "text"){return true} else {return false}})
	if (invChannel == null || invChannel == undefined || !invChannel || !invChannel.send) {
		guild.owner.send(ownerIntro);
		config.addGuild(guild);
	} else {
		invChannel.send(intro);
		config.addGuild(guild);
	}
	let embed = new Discord.RichEmbed()
	.setAuthor("Guild added",guild.owner.user.displayAvatarURL)
	.addField("Name:",guild.name)
	.addField("ID:",guild.id)
	.addField("Owner:",`${guild.owner} (${guild.owner.user.tag})`)
	.addField("Members:",guild.memberCount-1)
	.setThumbnail(guild.iconURL);
	invChannel.createInvite().then(Invite => {
		self.channels.get("419968973287981061").send(`<@211227683466641408> I was added to a new guild!\nInvite: ${Invite.url}`,{embed});
	}, err => {
		self.channels.get("419968973287981061").send("<@211227683466641408> I was added to a new guild!",{embed});
	});
});

// Guild leaving
self.on("guildDelete", guild => {
	let embed = new Discord.RichEmbed()
	.setAuthor("Guild deleted",guild.owner.user.displayAvatarURL)
	.addField("Name:",guild.name)
	.addField("ID:",guild.id)
	.addField("Owner:",`${guild.owner} (${guild.owner.user.tag})`)
	.addField("Members:",guild.memberCount-1)
	.setThumbnail(guild.iconURL);
	self.channels.get("419968973287981061").send("<@211227683466641408> I was removed from a guild!",{embed});
	config.removeGuild(guild);
});

// Welcome messages
self.on("guildMemberAdd",member => {
	if (!config.getWelcome(member.guild.id)) {return;}
	let welcomeData = config.getWelcome(member.guild.id);
	if (welcomeData.channel == "dm") {
		var channel = member.user;
	} else {
		var channel = member.guild.channels.get(welcomeData.channel);
	}
	let toSend = welcomeData.message;
	while (toSend.includes("$MEMBER_NAME") || toSend.includes("$GUILD_NAME") || toSend.includes("$GUILD_MEMBERCOUNT") || toSend.includes("$MEMBER_TAG") || toSend.includes("$MEMBER_MENTION")) {
		toSend = toSend.replace("$MEMBER_NAME",member.user.username);
		toSend = toSend.replace("$GUILD_NAME",member.guild.name);
		toSend = toSend.replace("$GUILD_MEMBERCOUNT",member.guild.memberCount);
		toSend = toSend.replace("$MEMBER_TAG",member.user.tag);
		toSend = toSend.replace("$MEMBER_MENTION",`<@${member.id}>`);
	}
	channel.send(toSend.toString());
})

/**
 * Most of the following events are log-events for local logging.
 * See index.js for the logging settings
 */
self.on("channelCreate",channel => {
	if (channel.type == "dm") {return;}
	let logSettings = config.getLogSettings(channel.guild.id);
	if (logSettings == null || logSettings.settings.channelUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("Channel created")
	.addField("Name",channel.name,true)
	.addField("Type",channel.type,true)
	.setTimestamp();
	logChannel.send({embed: logEmbed});
})
self.on("channelDelete",channel => {
	if (channel.type == "dm") {return;}
	let logSettings = config.getLogSettings(channel.guild.id);
	if (logSettings == null || logSettings.settings.channelUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("Channel deleted")
	.addField("Name",channel.name,true)
	.addField("Type",channel.type,true)
	.setTimestamp();
	logChannel.send({embed: logEmbed});
})
self.on("channelUpdate",(oldChannel,newChannel) => {
	if (oldChannel.type == "dm" || newChannel.type == "dm") {return;}
	let logSettings = config.getLogSettings(newChannel.guild.id);
	if (logSettings == null || logSettings.settings.channelUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("Channel updated")
	.addField("Old Name",oldChannel.name,true)
	.addField("New Name",newChannel.name,true)
	.addField("Type",newChannel.type,true)
	.setTimestamp();
	logChannel.send({embed: logEmbed});
})
self.on("emojiCreate",emoji => {
	let logSettings = config.getLogSettings(emoji.guild.id);
	if (logSettings == null || logSettings.settings.emojiUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("Emoji created")
	.addField("name",emoji.name,true)
	.addField("Emoji",emoji.toString(),true)
	.setTimestamp();
	logChannel.send({embed: logEmbed});
})
self.on("emojiDelete",emoji => {
	let logSettings = config.getLogSettings(emoji.guild.id);
	if (logSettings == null || logSettings.settings.emojiUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("Emoji deleted")
	.addField("Name",emoji.name,true)
	.setTimestamp();
	logChannel.send({embed: logEmbed});
})
self.on("emojiUpdate",(oldEmoji,newEmoji) => {
	let logSettings = config.getLogSettings(newEmoji.guild.id);
	if (logSettings == null || logSettings.settings.emojiUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("Emoji updated")
	.addField("Old name",oldEmoji.name,true)
	.addField("New name",newEmoji.name,true)
	.addField("Emoji",newEmoji.toString())
	.setTimestamp();
	logChannel.send({embed: logEmbed});
})
self.on("guildBanAdd",(guild,user) => {
	let logSettings = config.getLogSettings(guild.id);
	if (logSettings == null || logSettings.settings.banUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("User banned",user.displayAvatarURL)
	.addField("Tag",user.tag,true)
	.setTimestamp();
	logChannel.send({embed: logEmbed});
})
self.on("guildBanRemove",(guild,user) => {
	let logSettings = config.getLogSettings(guild.id);
	if (logSettings == null || logSettings.settings.banUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("User unbanned",user.displayAvatarURL)
	.addField("Tag",user.tag,true)
	.setTimestamp();
	logChannel.send({embed: logEmbed});
})
self.on("guildMemberAdd",member => {
	let logSettings = config.getLogSettings(member.guild.id);
	if (logSettings == null || logSettings.settings.memberUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("User joined",member.user.displayAvatarURL)
	.addField("Tag",member.user.tag,true)
	.setTimestamp();
	logChannel.send({embed: logEmbed});
})
self.on("guildMemberRemove",member => {
	let logSettings = config.getLogSettings(member.guild.id);
	if (logSettings == null || logSettings.settings.memberUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("User left",member.user.displayAvatarURL)
	.addField("Tag",member.user.tag,true)
	.setTimestamp();
	logChannel.send({embed: logEmbed});
})
self.on("guildMemberUpdate",(oldMember,newMember) => {
	let logSettings = config.getLogSettings(newMember.guild.id);
	if (logSettings == null || logSettings.settings.memberUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let valid = false;
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("Member updated",newMember.user.displayAvatarURL)
	.setTimestamp();
	if (oldMember.user.tag !== newMember.user.tag) {logEmbed.addField("Old username",oldMember.user.tag,true);logEmbed.addField("New username",newMember.user.tag,true);valid = true;}
	if (oldMember.nickname !== newMember.nickname) {logEmbed.addField("Old nickname",oldMember.nickname,true);logEmbed.addField("New nickname",newMember.nickname,true);valid = true;}
	if (oldMember.user.displayAvatarURL !== newMember.user.displayAvatarURL) {logEmbed.addField("New Avatar","\u200B").setImage(newMember.user.displayAvatarURL);valid = true;}
	if (valid == true) {logChannel.send({embed: logEmbed})} else {return;}
})
self.on("guildUpdate",(oldGuild,newGuild) => {
	let logSettings = config.getLogSettings(newGuild.id);
	if (logSettings == null || logSettings.settings.guildUpdates == false) {return;}
	logChannel = self.channels.get(logSettings.channel);
	let valid = false;
	let logEmbed = new Discord.RichEmbed()
	.setAuthor("Guild updated")
	.setTimestamp();
	if (oldGuild.name !== newGuild.name) {logEmbed.addField("Old Name",oldGuild.name,true);logEmbed.addField("New name",newGuild.name,true);valid = true;}
	if (oldGuild.ownerID !== newGuild.ownerID) {logEmbed.addField("Old Owner",oldGuild.owner.user.tag,true);logEmbed.addField("New owner",newGuild.owner.user.tag,true);valid = true;}
	if (oldGuild.region !== newGuild.region) {logEmbed.addField("Old region",oldGuild.region,true);logEmbed.addField("New region",newGuild.region,true);valid = true;}
	if (oldGuild.icon !== newGuild.icon) {logEmbed.addField("New icon","\u200B").setImage(newGuild.iconURL);valid = true;}
	if (valid == true) {logChannel.send({embed: logEmbed})} else {return;}
})

// Forward received DMs to me
self.on("message", msg => {
	if (msg.channel.type == "dm" && msg.author != self.user){
		if (msg.content.startsWith("//")) {msg.channel.send("Papi-Bot is designed to work in guild, direct messages are forwarded to the developer! (Your message was forwarded anyway)");}
		self.fetchUser("211227683466641408").then(User => {
			User.send(`From ${msg.author.tag}: ${msg.content}`);
			if (msg.attachments.first() != undefined) {User.send(`From ${msg.author.tag}: ${msg.attachments.first().url}`);}
			global.lastDM = msg.author;
		});
	} else {return;}
});

process.on("uncaughtException", err => {
	fs.writeFileSync("./logs/lastCrash.log",err.stack);
	console.error(err.stack);
	self.channels.get("419968973287981061")
	.send(`<@211227683466641408> Crashed: ${err}\n at ${new Date().toString()}`,{files: ["./logs/lastCrash.log"]}).then(()=>{process.exit(1);},()=>{process.exit(1);});
});

// ToS Check
self.on("message", msg => {
	if (msg.channel.type == "dm") return;
	if (msg.author == self.user) return;
	toscmd = disc.getcmd(msg.content);
	tosargs = disc.getargs(msg.content);

	if (toscmd == "tos") {
		if (!msg.member.permissions.has("MANAGE_GUILD")) {msg.channel.send("You do not have the required permission for this command!");return;}
		switch(tosargs.join(" ")){
			case "read": msg.channel.send(tos.read());break;
			case "accept": msg.channel.send(tos.accept(msg.guild.id));break;
			case "deny": msg.channel.send(tos.deny(msg.guild.id));msg.guild.leave();break;
			default: msg.channel.send("Accepted parameters: `read`, `accept`, `deny`\nExample: `//tos read`");break;
		}
	} else return;
});

process.on('unhandledRejection', err => {
	console.warn(`Uncaught Promise Error: \n${err.stack}`)
});

self.login(token);
