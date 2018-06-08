class roll {
	static run(client, args) {
		const m = args.shift();
		let text = args.join(" ").toLowerCase();
		let regex = RegExp("(\\d+)([d])(\\d*)(\\s*[+]\\s*)(\\d+)|(\\d+)([d])(\\d+)|(\\d+)");
		if (!regex.test(text) && args[0]) {
			return m.channel.send("That doesn't look like a valid syntax! Try again!");
		}
		let result = text.match(regex);
		if (result === null) result = ["", "6", "", ""];
		let sides,
			dice,
			throws = [],
			bonus,
			sum = 0;
		while (result.indexOf(undefined) !== -1) {
			result.splice(result.indexOf(undefined), 1);
		}
		switch (result.length) {
			case 2:
				sides = parseInt(result[1]);
				if (sides === 0) sides = 6;
				let thrw = Math.floor(Math.random() * sides + 1);
				m.channel.send(`You roll a ${sides}-sided die, it shows a ${thrw}!`);
				break;
			case 4:
				dice = parseInt(result[1]);
				if (dice === 0) dice = 1;
				sides = parseInt(result[3]);
				if (sides === 0) sides = 6;
				for (let i = 0; i < dice; i++) {
					throws.push(
						Math.floor(Math.random() * sides + 1)
					);
				}
				for (let i in throws) {
					sum += throws[i];
				}
				switch (dice) {
					case 1:
						m.channel.send(`You roll a ${sides}-sided die. It shows a ${throws[0]}!`);
						break;
					default:
						throws[throws.length - 2] = throws[throws.length - 2] + " and " + throws.pop();
						m.channel.send(`You roll ${dice} ${sides}-sided dice. They show ${throws.join(", ")} and add up to a ${sum}!`);
						break;
				}
				break;
			case 6:
				dice = parseInt(result[1]);
				if (dice === 0) dice = 1;
				sides = parseInt(result[3]);
				if (sides === 0) sides = 6;
				bonus = parseInt(result[5]);
				for (let i = 0; i < dice; i++) {
					throws.push(
						Math.floor(Math.random() * sides + 1)
					);
				}
				for (let i in throws) {
					sum += throws[i];
				}
				switch (dice) {
					case 1:
						m.channel.send(`You roll a ${sides}-sided die. It shows a ${throws[0]}, which adds to a ${sum + bonus} with the bonus!`);
						break;
					default:
						throws[throws.length - 2] = throws[throws.length - 2] + " and " + throws.pop();
						m.channel.send(`You roll ${dice} ${sides}-sided dice. They show ${throws.join(", ")} and add up to a ${sum}, which adds to a ${sum + bonus} with the bonus!`);
						break;
				}
				break;
		}
	}
}

module.exports = roll;