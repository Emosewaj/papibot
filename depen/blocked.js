// Check for any blocked servers on the list
const servers = ["337401886699290626"]; //The Queen's Lair

exports.check = function(id){
    if (servers.includes(id)){return true;}
}

// yes, that's literally all this file does, fuck you
