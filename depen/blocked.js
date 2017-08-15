// Check for any blocked servers on the list
const fs = require("fs");

global.servers = fs.readFileSync("./data/blocked/servers.txt","utf8");
global.users = fs.readFileSync("./data/blocked/users.txt","utf8");
global.serversIm = fs.readFileSync("./data/blocked/serversIm.txt","utf8");

exports.check = function(id){
    if (servers.split(",").includes(id)){return true;}
}
exports.checkUser = function(id){
    if (users.split(",").includes(id)){return true;}
}
exports.checkIm = function(id){
    if (serversIm.split(",").includes(id)){return true;}
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

// yes, that's literally all this file does, fuck you
