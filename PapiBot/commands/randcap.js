class randcap {
	static run(client, args) {
		const m = args.shift();
		if (!args[0]) return m.channel.send("You need to send me some text for that!");
		let text = args.join(" ").toLowerCase().split(""),
			upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
			lower = "abcdefghijklmnopqrstuvwxyz".split(""),
			j = 0;
		for (let i in text) {
			if (lower.indexOf(text[i]) !== -1) {
				if (j === 0) {
					text[i] = lower[lower.indexOf(text[i])];
					j++;
				} else {
					text[i] = upper[lower.indexOf(text[i])];
					j--;
				}
			}			
		}
		return m.channel.send(text.join(""));
	}

	static help() {
		return {
			category: "general",
			shortDesc: "Capitalises a string lIkE tHiS",
			longDesc: "Capitalises a string lIkE tHiS aUtOmAtIcAlLy to imitate a certain meme.",
			syntax: "randcap <text>"
		};
	}
}

module.exports = randcap;