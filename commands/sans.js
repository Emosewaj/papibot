// what the fuck brain

class sans {
	static run(client, args) {
        const m = args.shift();
        if(!args[0]) return m.reply(":torielmad:");

        let content = args.join(" ");
        let regex = /\w/g
        content = getSans() + " " + content.replace(regex, "e");
        return m.channel.send(content);
	}

	static help() {
		return {
			category: "general",
			shortDesc: "Turns a given sentence into sans' sounds",
			longDesc: "Turns a given sentence into the noises sans would make.",
			syntax: "sans <sentence>"
		};
    }
}

function getSans() {
    let rnd = Math.random();
    if(rnd <= 0.01) return ":sansbadtime:";
    else return ":sanswink:";
}

module.exports = sans;