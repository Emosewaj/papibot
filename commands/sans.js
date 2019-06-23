// what the fuck brain

class sans {
	static run(client, args) {
        const m = args.shift();
        if(!args[0]) return m.reply("<:torielmad:438819336187150376>");

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
    if(rnd <= 0.01) return "<:sansbadtime:438819336141144075>";
    else return "<:sanswink:438819336082292737>";
}

module.exports = sans;