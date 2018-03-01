// Prefix, commands, etc.
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database("./data/servers.db", (err) => {if (err) {console.log(err.message)}console.log("Connected to servers.db")});

var welcomes = new Map();
var logSettings = new Map();
var afk = new Map();

function updatePrefixes(){
    global.prefixes = new Map();
    db.all("SELECT serverID,prefix FROM prefixes ORDER BY serverID;",[],(err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            prefixes.set(row.serverID,row.prefix);
        })
    })
}

exports.getcmd = function(content,id,name) {
    if (prefixes.get(id) == undefined) {console.log("Couldn't find a prefix, inserting a default");let prefix = "//";db.run('INSERT INTO prefixes VALUES ("'+id+'","'+name+'","//");',[],function(err){if (err) {return console.log(err.message);}});updatePrefixes();}
    let prefix = prefixes.get(id);
	let cmd = content.split(" ")[0];
	if (cmd.startsWith(prefix)){cmd = cmd.slice(prefix.length);}
	return cmd;
}

exports.getprefix = function(id) {
    return prefixes.get(id);
}

exports.addGuild = function(guild) {
    db.run('INSERT INTO prefixes VALUES ("'+guild.id+'","'+guild.name+'","//");',[],function(err){
        if (err) {
            return console.log(err.message);
        }
        updatePrefixes();
    })
}

exports.removeGuild = function(guild) {
    db.run("DELETE FROM prefixes WHERE serverID = '"+guild.id+"';",[],function(err){
        if (err) {
            return console.log(err.message);
        }
        updatePrefixes();
    })
    db.run("DELETE FROM welcome WHERE guildID = '"+guild.id+"';",[],function(err){
        if (err) {
            return console.log(err.message);
        }
        updateWelcomes();
    });
}

exports.changePrefix = function(guild,newPrefix) {
    prefixes.set(guild.id,newPrefix);
    db.run("UPDATE prefixes SET name = '"+guild.name+"', prefix ='"+newPrefix+"' WHERE serverID = '"+guild.id+"';",[],function(err){
        if (err) {
            console.log(err.message);return 0;
        }
    });
    return 1;
}

function updateWelcomes(){
    db.all("SELECT * FROM welcome ORDER BY guildID;",[],(err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            welcomes.set(row.guildID,{ channel: row.channelID, message: row.message});
        })
    })
}

exports.setWelcome = function(guildID,channelID,message){
    return new Promise((reject,resolve) => {
        let array = message.split("");
        let newArray = [];
        let insert = "Successfully set your welcome message!";let update = "Successfully updated your welcome message!";
        for (i=0;i<array.length;i++){
            if (array[i] == "'") {newArray[i] = "''";}
            else if (array[i] == '"') {newArray[i] = '""';}
            else {newArray[i] = array[i]}
        }
        message = newArray.join("");
        if (!welcomes.get(guildID)) {
            db.run('INSERT INTO welcome VALUES ("'+guildID+'","'+channelID+'","'+message+'");',[],function(err){
                if (err) {
                    console.log(err.message);
                    let error = ("Error: "+err+"\nPlease report to the developer!")
                    reject(error);
                }
                welcomes.set(guildID,{channel: channelID, message: message})
                resolve(insert);
            })
        } else {
            db.run("UPDATE welcome SET channelID = '"+channelID+"', message = '"+message+"' WHERE guildID = '"+guildID+"';",[],function(err){
                if (err) {
                    console.log(err.message);
                    let error = ("Error: "+err+"\nPlease report to the developer!")
                    reject(error);
                }
                welcomes.set(guildID,{channel: channelID, message: message})
                resolve(update);
            })
        }
    })
}

exports.removeWelcome = function(guildID){
    return new Promise((resolve,reject) => {
        db.run("DELETE FROM welcome WHERE guildID = '"+guildID+"';",[],function(err) {
            if (err) {
                console.log(err.message);
                let error = ("Error: "+err+"\nPlease report to the developer!")
                reject(error);
            }
            welcomes.delete(guildID);
            resolve("Disabled welcome messages!");
        })
    })
}

exports.getWelcome = function(guildID){
    return welcomes.get(guildID);
}

function updateLogSettings() {
    db.all("SELECT * FROM logs ORDER BY guildID;",[],(err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            let settings = row.logSettings.split(",");
            logSettings.set(row.guildID,{
                channel: row.channelID,
                settings: JSON.parse(row.logSettings)
            });
        })
    })
}

exports.setLogSettings = function(guildID,channelID,setting){
    if (logSettings.get(guildID)){
        let curSettings = logSettings.get(guildID);
        switch(setting){
            case "channel": if (curSettings.settings.channelUpdates == true) {curSettings.settings.channelUpdates = false} else {curSettings.settings.channelUpdates = true};break;
            case "emoji": if (curSettings.settings.emojiUpdates == true) {curSettings.settings.emojiUpdates = false} else {curSettings.settings.emojiUpdates = true};break;
            case "ban": if (curSettings.settings.banUpdates == true) {curSettings.settings.banUpdates = false} else {curSettings.settings.banUpdates = true};break;
            case "member": if (curSettings.settings.memberUpdates == true) {curSettings.settings.memberUpdates = false} else {curSettings.settings.memberUpdates = true};break;
            case "guild": if (curSettings.settings.guildUpdates == true) {curSettings.settings.guildUpdates = false} else {curSettings.settings.guildUpdates = true};break;
        }
        let newSettings = JSON.stringify(curSettings.settings);

        logSettings.set(guildID,{channel: channelID, settings: curSettings.settings});

        return new Promise((resolve,reject) => {
            db.run("UPDATE logs SET channelID = '"+channelID+"', logSettings = '"+newSettings+"' WHERE guildID = '"+guildID+"';",[],err => {
                if (err) reject(err);
                resolve("Logging settings successfully updated!");
            })
        })
    } else {
        let curSettings = {
            channel: channelID,
            settings: {
                channelUpdates: false,
                emojiUpdates: false,
                banUpdates: false,
                memberUpdates: false,
                guildUpdates: false
            }
        }
        switch(setting){
            case "channel": if (curSettings.settings.channelUpdates == true) {curSettings.settings.channelUpdates = false} else {curSettings.settings.channelUpdates = true};break;
            case "emoji": if (curSettings.settings.emojiUpdates == true) {curSettings.settings.emojiUpdates = false} else {curSettings.settings.emojiUpdates = true};break;
            case "ban": if (curSettings.settings.banUpdates == true) {curSettings.settings.banUpdates = false} else {curSettings.settings.banUpdates = true};break;
            case "member": if (curSettings.settings.memberUpdates == true) {curSettings.settings.memberUpdates = false} else {curSettings.settings.memberUpdates = true};break;
            case "guild": if (curSettings.settings.guildUpdates == true) {curSettings.settings.guildUpdates = false} else {curSettings.settings.guildUpdates = true};break;
            default: break;
        }
        let newSettings = JSON.stringify(curSettings.settings);

        logSettings.set(guildID,{channel: channelID, settings: curSettings.settings});

        return new Promise((resolve,reject) => {
            db.run("INSERT INTO logs VALUES ('"+guildID+"', '"+channelID+"', '"+newSettings+"');",[],err => {
                if (err) reject(err);
                resolve("Logging settings successfully setup!");
            })
        })
    }
}

exports.getLogSettings = function(guildID){
    if (!logSettings.get(guildID)) {return null;} else {return logSettings.get(guildID);}
}

exports.setAFK = function(id, message) {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO afk VALUES ('"+id+"', '"+message+"')",[],err => {
            if (err) reject(err);
            afk.set(id,message);
            resolve();
        });
    });
}

exports.delAFK = function(id) {
	return new Promise((resolve, reject) => {
        afk.delete(id);
        db.run("DELETE FROM afk WHERE id == '"+id+"'",err => {
            if (err) reject(err);
            resolve();
        });
    });
}

exports.getAFK = function(id) {
    if (afk.has(id)) return afk.get(id);
    return;
}

function updateAFKSettings() {
    db.all("SELECT * FROM afk ORDER BY id",[],(err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach(row => {
            afk.set(row.id,row.message);
        });
    });
}

updatePrefixes();
updateWelcomes();
updateLogSettings();
updateAFKSettings();
global.welcomes = welcomes;