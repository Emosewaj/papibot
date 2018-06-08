class superscript {
	static run(client, args) {
		const m = args.shift();
		if (!args[0]) return m.channel.send("You need to send me some text!");
		let alphabet = "abcdefghijklmnopqrstuvwxyz 1234567890".split(""),
			ss = "ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ ¹²³⁴⁵⁶⁷⁸⁹⁰".split(""),
			text = args.join(" ").toLowerCase().split("");
		for (let i in text) {
			text[i] = ss[alphabet.indexOf(text[i])];
		}
		return m.channel.send(text.join(""));
	}
}

module.exports = superscript;