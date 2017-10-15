// Terms of service for this bot
const fs = require("fs");

global.accepted = fs.readFileSync("./data/tos/accepted.txt","utf8");

const tos = "**TERMS OF SERVICE**\n\n\
By using this bot all members agree to the following terms:\n\n\
**1.** This bot may **temporarily** log issued commands including arguments, i.e. the entire message, username and tag as well as the name of the guild the command was issued in. This applies for every command.¹ Logs are flushed with every restart and are **never** saved permanently.\n\
**2.** This bot may **permanently** save guild IDs and names used for identification of accepted servers and/or for the utiliation of the trigger-blacklists and custom prefixes.\n\
**3.** The bot-owner may choose to block specific users or servers using their ID. An official reason does **not** have to be stated.\n\
**4.** This bot's invite link contains the **minimum required permissions** for full current functionality. Any issues, such as non-useability within a guild caused by missing permissions are attributed to the respective server's staff.²\n\
**5.** This bot will by default react to certain words. You can either a) accept this behaviour or b) toggle it using the `//toggle wt` command once you've accepted the ToS.\n\
**6.** By agreing to these terms you agree to this guild's ID being saved indefinitly, or until you decline the terms of service.\n\n\
¹: Excluding the tos command.\n\
²: Any future features that might require additional permissions can and should be added when it's discovered that they are missing to ensure full functionality.";

exports.read = function() {
    return tos;
}

exports.accept = function(id) {
    let servers = accepted.split(",");
    if (servers.includes(id)) {return "You've already accepted the terms of service.";}
    else {
        servers.push(id);
        fs.writeFileSync("./data/tos/accepted.txt",servers,"utf8");
        global.accepted = servers.toString();
        return "Thank you for accepting the terms of service! Have fun using Papi-Bot on your server!\n\nType `//help` to begin!";
    }
}

exports.deny = function(id) {
    let servers = accepted.split(",");
    if (servers.includes(id)) {
        servers.splice(servers.indexOf(id),1);
        fs.writeFileSync("./data/tos/accepted.txt",servers,"utf8");
        global.accepted = servers.toString();
    }
    return "Sorry to hear that! I will now be leaving this guild. Have a nice day!";
}

exports.check = function(id) {
    if (global.accepted.split(",").includes(id)) {return true;} else {return false;}
}
