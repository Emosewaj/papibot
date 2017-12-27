const Discord = require("discord.js");

let temp1 = require("../data/categories.json");
let temp2 = require("../data/units.json");
const categories = new Discord.Collection();
const units = new Discord.Collection();
for (i = 0; i < temp1.length; i++) {
	categories.set(temp1[i].name,temp1[i]);
}
for (i = 0; i < temp2.length; i++) {
	units.set(temp2[i].name,temp2[i].val);
}

exports.convert = function(value, sUnit, tUnit) {
	value = parseFloat(value);
	if (!value) return "Error: Couldn't parse input!";
	let sCat = categories.find(cat => {if (cat.units.includes(sUnit)) return true}),
	tCat = categories.find(cat => {if (cat.units.includes(tUnit)) return true});
	if (!sCat || !tCat) return "Error: Either source unit or target unit don't exist!";
	if (sCat.name !== tCat.name) return "Error: Source unit and target unit are not in the same category.";
	if (sCat.name == "temperatures") {
		let base;
		let result;
		switch(sUnit) {
			case "c": {
				base = value;
				break;
			}
			case "k": {
				base = value-273.15;
				break;
			}
			case "f": {
				base = (value-32)/1.8;
				break;
			}
		}
		switch(tUnit) {
			case "c": {
				result = base;
				break;
			}
			case "k": {
				result = base+273.15;
				break;
			}
			case "f": {
				result = base*1.8+32;
			}
		}
	} else {
		var base = value*(units.get(sUnit.toLowerCase()));
		var result = base/(units.get(tUnit.toLowerCase()));
	}
	return (`${value} ${sUnit} are equal to ${result.toFixed(2)} ${tUnit}!`);
}
