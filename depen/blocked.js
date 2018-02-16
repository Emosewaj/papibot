// Check for any blocked servers on the list
const fs = require("fs");

global.servers = fs.readFileSync("./data/blocked/servers.txt","utf8");
global.users = fs.readFileSync("./data/blocked/users.txt","utf8");
global.serversIm = fs.readFileSync("./data/blocked/serversIm.txt","utf8");
global.broadcasts = fs.readFileSync("./data/blocked/broadcasts.txt","utf8");

exports.check = function(id){
    if (servers.split(",").includes(id)){return true;}
}
exports.checkUser = function(id){
    if (users.split(",").includes(id)){return true;}
}
exports.checkIm = function(id){
    if (serversIm.split(",").includes(id)){return true;}
}
exports.checkBroadcasts = function(id){
    if (broadcasts.split(",").includes(id)){return true;} else {return false;}
}

exports.blockUser = function(id){
    let blockedUsers = users.split(",");
    if (blockedUsers.includes(id)){
        return ("This user is already blocked!");
    } else {
        blockedUsers.push(id);
        fs.writeFileSync("./data/blocked/users.txt",blockedUsers,"utf8");
        global.users = blockedUsers.toString();
        return ("Blocked user!");
    }
}
exports.unblockUser = function(id){
    let blockedUsers = users.split(",");
    if (!blockedUsers.includes(id)){
        return ("This user isn't blocked!");
    } else {
        blockedUsers.splice(blockedUsers.indexOf(id),1);
        fs.writeFileSync("./data/blocked/users.txt");
        global.users = blockedUsers.toString();
        return ("Unblocked user!");
    }
}

exports.toggleWT = function(id){
    let newServers = servers.split(",");
    if (newServers.includes(id)){
        newServers.splice(newServers.indexOf(id),1);
        fs.writeFileSync("./data/blocked/servers.txt",newServers,"utf8");
        global.servers = newServers.toString();
        return ("Your server was removed from the word trigger blacklist!");
    }
    if (!newServers.includes(id)){
        newServers.push(id);
        fs.writeFileSync("./data/blocked/servers.txt",newServers,"utf8");
        global.servers = newServers.toString();
        return ("Your server was added to the word trigger blacklist!");
    } else {return ("Something went terribly wrong!")}; //This should never happen
}
exports.toggleIm = function(id){
    let newServers = serversIm.split(",");
    if (newServers.includes(id)){
        newServers.splice(newServers.indexOf(id),1);
        fs.writeFileSync("./data/blocked/serversIm.txt",newServers,"utf8");
        global.serversIm = newServers.toString();
        return ("Your server was removed from the \"I'm\" trigger blacklist!");
    }
    if (!newServers.includes(id)){
        newServers.push(id);
        fs.writeFileSync("./data/blocked/serversIm.txt",newServers,"utf8");
        global.serversIm = newServers.toString();
        return ("Your server was added to the \"I'm\" trigger blacklist!");
    } else {return ("Something went terribly wrong!")}; //This should never happen
}
exports.toggleBC = function(id){
    let newServers = broadcasts.split(",");
    if (newServers.includes(id)){
        newServers.splice(newServers.indexOf(id),1);
        fs.writeFileSync("./data/blocked/broadcasts.txt",newServers,"utf8");
        global.broadcasts = newServers.toString();
        return("Your server will now receive global broadcasts!");
    }
    if (!newServers.includes(id)){
        newServers.push(id);
        fs.writeFileSync("./data/blocked/broadcasts.txt",newServers,"utf8");
        global.broadcasts = newServers.toString();
        return("Your server will no longer receive global broadcasts!");
    } else {return ("Something went terribly wrong!")}; //This should never happen
}