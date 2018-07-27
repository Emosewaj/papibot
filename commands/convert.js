const { Collection, RichEmbed } = require("discord.js"),
	categories = new Collection(),
	units = new Collection;
let temp1 = require("../data/categories.json"),
	temp2 = require("../data/units.json");
for (i = 0; i < temp1.length; i++) {
	categories.set(temp1[i].name, temp1[i]);
}
for (i = 0; i < temp2.length; i++) {
	units.set(temp2[i].name, temp2[i].val);
}

class convert {
	static run(client, args) {
		const m = args.shift();
		let value = parseFloat(args[0]),
			sourceUnit = args[1],
			targetUnit = args[2];
		if (!value) return m.channel.send("Error: Couldn't parse input value!");
		let sourceCat = categories.find(cat => { if (cat.units.includes(sourceUnit)) return true; }),
			targetCat = categories.find(cat => { if (cat.units.includes(targetUnit)) return true; });
		if (!sourceCat || !targetCat) return m.channel.send("Error: Either source unit or target unit don't exist!");
		if (sourceCat.name !== targetCat.name) return m.channel.send("Error: Source unit and target unit are not in the same category!");

		var base, result;
		if (sourceCat.name === "temperature") {
			switch (sourceUnit) {
				case "c":
					base = value;
					break;
				case "k":
					base = value - 273.15;
					break;
				case "f":
					base = (value - 32) / 1.8;
					break;
			}
			switch (targetUnit) {
				case "c":
					result = base;
					break;
				case "k":
					result = base + 273.15;
					break;
				case "f":
					result = base * 1.8 + 32;
					break;
			}
		} else {
			base = value * units.get(sourceUnit.toLowerCase());
			result = base / units.get(targetUnit.toLowerCase());
		}
		let name = sourceCat.name.split("");
		name[0] = name[0].toUpperCase();
		name = name.join("");
		let embed = new RichEmbed()
			.setTitle("Conversion")
			.setDescription(name)
			.addField("Input", value+" "+sourceUnit)
			.addField("Result", result.toFixed(2)+" "+targetUnit);
		return m.channel.send({ embed });
	}

	static help() {
		return {
			category: "general",
			shortDesc: "Converts something from A to B",
			longDesc: "Converts a given unit to a different unit of the same category. Most Google supported conversions are supported.",
			syntax: "convert <amount> <source unit> <target unit>"
		};
	}
}

module.exports = convert;