// Prefix, commands, etc.
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database("./data/servers.db", (err) => {if (err) {console.log(err.message)}console.log("Connected to servers.db")});

var welcomes = new Map();
var logSettings = new Map();
var afk = new Map();
var blacklists = new Map();

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

/**
 * 
 * @param {String} content 
 * @param {String} id 
 * @param {String} name 
 */
exports.getcmd = function(content,id,name) {
    if (prefixes.get(id) == undefined) {console.log("Couldn't find a prefix, inserting a default");let prefix = "//";db.run('INSERT INTO prefixes VALUES ("'+id+'","'+name+'","//");',[],function(err){if (err) {return console.log(err.message);}});updatePrefixes();}
    let prefix = prefixes.get(id);
	let cmd = content.split(" ")[0];
	if (cmd.startsWith(prefix)){cmd = cmd.slice(prefix.length);}
	return cmd;
}

/**
 * 
 * @param {String} id 
 */
exports.getprefix = function(id) {
    return prefixes.get(id);
}

/**
 * 
 * @param {Guild} guild 
 */
exports.addGuild = function(guild) {
    db.run('INSERT INTO prefixes VALUES ("'+guild.id+'","'+guild.name+'","//");',[],function(err){
        if (err) {
            return console.log(err.message);
        }
        updatePrefixes();
    })
}

/**
 * 
 * @param {Guild} guild 
 */
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

/**
 * 
 * @param {Guild} guild 
 * @param {String} newPrefix 
 */
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

/**
 * 
 * @param {String} guildID 
 * @param {String} channelID 
 * @param {String} message 
 */
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

/**
 * 
 * @param {String} guildID 
 */
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

/**
 * 
 * @param {String} guildID 
 */
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

/**
 * 
 * @param {String} guildID 
 * @param {String} channelID 
 * @param {String} setting 
 */
exports.setLogSettings = function(guildID,channelID,setting){
    if (setting == null && channelID == null) {
        return new Promise ((resolve,reject) => {
            db.run("DELETE FROM logs WHERE guildID = ?;",[guildID],err => {
                if (err) reject (err);
                logSettings.delete(guildID);
                resolve("Logging has been disabled!");
            });
        });
    }

    if (channelID && setting == null) {
        return new Promise((resolve,reject) => {
            let settings = JSON.stringify(logSettings.get(guildID));
            db.run("UPDATE logs SET channelID = ?, logSettings = ? WHERE guildID = ?;",[channelID,settings,guildID],err => {
                if (err) reject(err);
                logSettings.set(guildID,{channel: channelID, settings: logSettings.get(guildID)});
                resolve(`Logging channel successfully changed to <#${channelID}>!`);
            })
        });
    }

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

/**
 * 
 * @param {String} guildID 
 */
exports.getLogSettings = function(guildID){
    if (!logSettings.get(guildID)) {return null;} else {return logSettings.get(guildID);}
}

/**
 * 
 * @param {String} id 
 * @param {String} message 
 */
exports.setAFK = function(id, message) {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO afk VALUES ( ? , ? )",[id, message],err => {
            if (err) reject(err);
            afk.set(id,message);
            resolve();
        });
    });
}

/**
 * 
 * @param {String} id 
 */
exports.delAFK = function(id) {
	return new Promise((resolve, reject) => {
        afk.delete(id);
        db.run("DELETE FROM afk WHERE id == '"+id+"'",err => {
            if (err) reject(err);
            resolve();
        });
    });
}

/**
 * 
 * @param {String} id 
 */
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

/**
 * 
 * @param {String} id 
 * @param {Array} tags 
 */
exports.setBlacklist = function(id, tags) {
    tags = parseTags(tags);
    return new Promise((resolve, reject) => {
        if (!blacklists.has(id)) {
            db.run("INSERT INTO blacklists VALUES (?, ?);",[id,JSON.stringify(tags)],err => {
                if (err) reject("Couldn't set your blacklist tags: "+err);
                blacklists.set(id, tags);
                resolve("Successfully set your blacklist tags!");
            });
        } else {
            let newTags = blacklists.get(id);
            for (let i in tags) {
                if (!newTags.includes(tags[i])) newTags.push(tags[i]);
            }
            db.run("UPDATE blacklists SET id = ?, tags = ? WHERE id = ?",[id,JSON.stringify(newTags),id],err => {
                if (err) reject("Couldn't update your blacklist tags: "+err);
                blacklists.set(id, newTags);
                resolve("Successfully updated your blacklist tags!");
            });
        }
    });
}

/**
 * 
 * @param {String} id 
 * @returns {Array}
 */
exports.getBlacklistTags = function(id) {
    if (blacklists.has(id)) return reverseParseTags(blacklists.get(id));
    return [];
}

exports.getBlacklist = function(id) {
    if (blacklists.has(id)) return blacklists.get(id);
    return [];
}

/**
 * 
 * @param {String} id 
 * @param {Array} tags 
 */
exports.delBlacklist = function(id, tags) {
    tags = parseTags(tags);
    return new Promise((resolve, reject) => {
        if (!blacklists.has(id)) return reject("You don't have any tags blacklisted!");
        if (!tags || !tags[0]) return reject("You didn't specify any tags!");
        let curTags = blacklists.get(id);
        let removedTags = [];
        for (let i in tags) {
            if (curTags.includes(tags[i])) {
                removedTags.push(tags[i]);
                curTags.splice(curTags.indexOf(tags[i]),1);
            }
        }
        if (curTags.length == 0) {
            return db.run("DELETE FROM blacklists WHERE id = ?",[id],err => {
                if (err) return reject("Couldn't save your removed tags: "+err);
                blacklists.delete(id);
                resolve("Successfully removed the following tags from your blacklist:```"+removedTags.join(", ")+"```");
            });
        } else {
            return db.run("UPDATE blacklists SET id = ?, tags = ? WHERE id = ?",[id,JSON.stringify(curTags),id],err => {
                if (err) return reject("Couldn't save your removed tags: "+err);
                blacklists.set(id,curTags);
                resolve("Successfully removed the following tags from your blacklist:```"+removedTags.join(", ")+"```");
            });
        }
    });
}

function updateBlacklists() {
    db.all("SELECT * FROM blacklists ORDER BY id",[],(err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach(row => {
            blacklists.set(row.id,JSON.parse(row.tags));
        });
    });
}

/**
 * 
 * @param {Array} tags 
 * @returns {Array}
 */
function parseTags(tags) {
    for (let i in tags) {
        if (!tags[i].startsWith("-")) tags[i] = "-"+tags[i];
    }
    return tags;
}

/**
 * 
 * @param {Array} tags
 * @returns {Array} 
 */
function reverseParseTags(tags) {
    for (let i in tags) {
        if (tags[i].startsWith("-")) tags[i] = tags[i].slice(1);
    }
    return tags;
}

updatePrefixes();
updateWelcomes();
updateLogSettings();
updateAFKSettings();
updateBlacklists();
global.welcomes = welcomes;