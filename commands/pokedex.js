const P = require("pokedex-promise-v2");
const Pokedex = new P();
const { RichEmbed, Collection } = require("discord.js");

const colours = new Collection();
colours.set("black", "#000000")
	.set("blue", "BLUE")
	.set("brown", "#A0522D")
	.set("grey", "GREY")
	.set("green", "GREEN")
	.set("pink", "#FFC0CB")
	.set("purple", "PURPLE")
	.set("red", "RED")
	.set("white", "#FFFFFF")
	.set("yellow", "#FFFF00");

class pokedex {
	static async run(client, args) {
		const m = args.shift();
		const msg = await m.channel.send("Please wait...");
		let embed = new RichEmbed();
		let category = args.shift().toLowerCase();
		let searchQuery = joinWords(args.join(" ").toLowerCase());
		switch(category) {
			case "berry": {
				let berry = await Pokedex.getBerryByName(searchQuery).catch(() => {});
				if (!berry) return msg.edit("No such berry! Don't include \"berry\"!");
				let berryItem = await Pokedex.resource(berry.item.url).catch(() => {});
				embed.setTitle(firstToUpper(berry.name + " Berry"))
					.setThumbnail(berryItem.sprites.default)
					.addField("Cost", "₽" + berryItem.cost, true)
					.addField("Growth Time", berry.growth_time + " hours", true)
					.addField("Maximum Harvest Yield", berry.max_harvest + "x", true)
					.addField("Natural Gift Power", berry.natural_gift_power, true)
					.addField("Size", berry.size + " mm", true)
					.addField("Smoothness", berry.smoothness, true)
					.addField("Soil Drying Rate", berry.soil_dryness, true)
					.addField("Firmness", splitWords(berry.firmness.name), true);
				
				let flavorString = "";
				for (let i = 0; i < berry.flavors.length; i++) {
					flavorString += firstToUpper(berry.flavors[i].flavor.name) + ": " + berry.flavors[i].potency + "\n";
				}
				embed.addField("Flavours", flavorString);
				break;
			}
			case "generation": {
				let gen = await Pokedex.getGenerationByName(searchQuery).catch(() => {});
				if (!gen) return msg.edit("No such generation! Try a number!");
				for (let i = 0; i < gen.names.length; i++) {
					embed.setTitle(gen.names[i].name);
					if (gen.names[i].language.name == "en") break;
				}
				embed.addField("Region", firstToUpper(gen.main_region.name), true)
					.addField("New Pokémon", gen.pokemon_species.length, true)
					.addField("New Moves", gen.moves.length, true)
					.addField("New Abilities", gen.abilities.length, true)
					.addField("New Types", gen.types.length, true);
				let gamesString = "";
				for (let i = 0; i < gen.version_groups.length; i++) {
					if (gen.version_groups[i].name.length < 3) {
						gamesString += gen.version_groups[i].name.toUpperCase() + "\n";
						continue;
					}
					gamesString += splitWords(gen.version_groups[i].name) + "\n";
				}
				embed.addField("\u200B", "**Games**\n" + gamesString);
				break;
			}
			case "game": {
				let version = await Pokedex.getVersionByName(searchQuery).catch(() => {});
				if (!version) return msg.edit("No such game!");
				let versionGroup = await Pokedex.resource(version.version_group.url).catch(() => {});
				let versionGen = await Pokedex.resource(versionGroup.generation.url).catch(() => {});
				embed.setTitle("Pokémon " + firstToUpper(version.name));
				for (let i = 0; i < versionGen.names.length; i++) {
					if (versionGen.names[i].language.name == "en") {
						embed.addField("Generation", versionGen.names[i].name);
					}
				}
				let regionsString = "";
				for (let i = 0; i < versionGroup.regions.length; i++) {
					regionsString += firstToUpper(versionGroup.regions[i].name) + "\n";
				}
				embed.addField("Regions", regionsString);
				let gamesString = "";
				for (let i = 0; i < versionGen.version_groups.length; i++) {
					if (versionGen.version_groups[i].name.length < 3) {
						gamesString += versionGen.version_groups[i].name.toUpperCase() + "\n";
						continue;
					}
					gamesString += splitWords(versionGen.version_groups[i].name) + "\n";
				}
				embed.addField("Other Games", gamesString);
				break;
			}
			case "item": {
				let item = await Pokedex.getItemByName(searchQuery).catch(() => {});
				if (!item) return msg.edit("No such item!");
				let itemFlingEffect = null;
				if (item.fling_effect) itemFlingEffect = await Pokedex.resource(item.fling_effect.url).catch(() => {});
				embed.setTitle(splitWords(item.name))
					.setThumbnail(item.sprites.default)
					.setDescription("Category: " + splitWords(item.category.name))
					.addField("Cost", "₽" + item.cost, true)
					.addField("Held by", item.held_by_pokemon.length + " Pokémon", true)
					.addField("Effect", removeNewlines(item.effect_entries[0].effect))
					.addField("Fling Power", denull(item.fling_power), true);
				if (!itemFlingEffect) embed.addField("Fling Type", denull(item.fling_effect), true);
				else {
					for (let i = 0; i < itemFlingEffect.effect_entries.length; i++) {
						if (itemFlingEffect.effect_entries[i].language.name == "en") {
							embed.addField("Fling Type", itemFlingEffect.effect_entries[i].effect, true);
						}
					}
				}
				for (let i = 0; i < item.flavor_text_entries.length; i++) {
					if (item.flavor_text_entries[i].language.name == "en") {
						embed.setDescription("Category: " + splitWords(item.category.name) + "\n\n" + removeNewlines2(item.flavor_text_entries[i].text));
						break;
					}
				}
				break;
			}
			case "move": {
				let move = await Pokedex.getMoveByName(searchQuery).catch(() => {});
				if (!move) return msg.edit("No such move!");
				embed.setTitle(splitWords(move.name))
					.setDescription(move.effect_entries[0].effect.replace("$effect_chance%", move.effect_chance + "%"))
					.addField("Damage Class", firstToUpper(move.damage_class.name), true)
					.addField("Move Type", splitWords(move.type.name), true)
					.addField("PP", move.pp, true)
					.addField("Power", denull2(move.power), true)
					.addField("Accuracy", denull2(move.accuracy), true)
					.addField("Priority", move.priority, true)
					.addField("Targets", splitWords(move.target.name), true)
					.addField("Effect Chance", denull2(move.effect_chance) + "%", true);
				break;
			}
			case "pokemon": {
				let pokemon = await Pokedex.getPokemonByName(searchQuery).catch(() => {});
				if (!pokemon) return msg.edit("No such Pokémon!");
				let pokemonSpecies = await Pokedex.resource(pokemon.species.url).catch(() => {});
				let chance = Math.random();
				embed.setTitle(splitWords(pokemon.name));
				if (chance <= 1.0/4096.0) {
					embed.setThumbnail(pokemon.sprites.front_shiny);
				} else {
					embed.setThumbnail(pokemon.sprites.front_default);
				}
				let descriptionString = "";
				for (let i = 0; i < pokemonSpecies.genera.length; i++) {
					if (pokemonSpecies.genera[i].language.name == "en") {
						descriptionString += pokemonSpecies.genera[i].genus;
						break;
					}
				}
				descriptionString += "\n\n";
				for (let i = 0; i < pokemonSpecies.flavor_text_entries.length; i++) {
					if (pokemonSpecies.flavor_text_entries[i].language.name == "en") {
						descriptionString += removeNewlines2(pokemonSpecies.flavor_text_entries[i].flavor_text);
						break;
					}
				}
				embed.setDescription(descriptionString)
					.addField("Height", (pokemon.height * 10) + "cm", true)
					.addField("Weight", (pokemon.weight / 10) + "kg", true)
					.addField("Base Experience", pokemon.base_experience + " EXP", true)
					.addField("Pokédex ID", pokemon.id, true);
				let typesString = "";
				for (let i = pokemon.types.length - 1; i >= 0; i--) {
					typesString += firstToUpper(pokemon.types[i].type.name) + "\n";
				}
				embed.addField("Types", typesString, true);
				let abilitiesString = "";
				for (let i = pokemon.abilities.length - 1; i >= 0; i--) {
					abilitiesString += splitWords(pokemon.abilities[i].ability.name);
					if (pokemon.abilities[i].is_hidden) abilitiesString += " (Hidden)";
					abilitiesString += "\n";
				}
				embed.addField("Abilities", abilitiesString, true)
					.addField("Gender Rates", parseGenderRate(pokemonSpecies.gender_rate), true)
					.addField("Capture Rate", ((pokemonSpecies.capture_rate / 255) * 100).toFixed(2) + "%", true)
					.addField("Egg Group", splitWords(pokemonSpecies.egg_groups[0].name), true)
					.addField("Growth Rate", splitWords(pokemonSpecies.growth_rate.name), true)
					.addField("Shape", splitWords(pokemonSpecies.shape.name), true);
				let heldItemsString = "";
				for (let i = 0; i < pokemon.held_items.length; i++) {
					heldItemsString += splitWords(pokemon.held_items[i].item.name) + "\n";
				}
				embed.addField("Held Items", denull(heldItemsString), true);
				let statsString = "";
				for (let i = pokemon.stats.length - 1; i >= 0 ; i--) {
					statsString += splitWords(pokemon.stats[i].stat.name) + ": " + pokemon.stats[i].base_stat;
					if (pokemon.stats[i].effort > 1) statsString += " (" + pokemon.stats[i].effort + " EV)";
					statsString += "\n";
				}
				embed.addField("Stats", statsString, true)
					.addField("Learnable Moves", pokemon.moves.length, true)
					.setColor(colours.get(pokemonSpecies.color.name));
				break;
			}
			default: {
				return msg.edit("Invalid argument! Use `//help pokedex` for more information!");
			}
		}

		embed.setFooter("Entry requested by " + m.member.displayName).setTimestamp();
		return msg.edit({embed});
	}

	static help() {
		return {
			category: "general",
			shortDesc: "Searches the Pokédex",
			longDesc: "Searches the Pokédex for an entry in the given category. When using names, replace any spaces with dashes (-), IDs work as well.\n`pokedex pokemon eevee` and `pokedex pokemon 133` both result in Eevee's Pokédex Entry.\n\nAvailable categories:\nPokémon (`pokemon`)\nItems (`item`)\nMoves (`move`)\nBerries (`berry`)\nGenerations (`generation`)\nGames (`game`)\n\nPlease report any bugs you find!",
			syntax: "pokedex <category> <entry>"
		};
	}
}

function firstToUpper(string) {
	let charArray = string.split("");
	charArray[0] = charArray[0].toUpperCase();
	return charArray.join("");
}

function splitWords(string) {
	let words = string.split("-");
	for (let i = 0; i < words.length; i++) {
		words[i] = firstToUpper(words[i]);
	}
	return words.join(" ");
}

function joinWords(string) {
	return string.split(" ").join("-");
}

function denull(obj) {
	if (obj == null || obj == "") return "None";
	return obj;
}

function denull2(obj) {
	if (obj == null) return "0";
	return obj;
}

function removeNewlines(string) {
	while (string.includes("\n:")) {
		string = string.replace("\n:", ":");
	}
	return string;
}

function removeNewlines2(string) {
	while (string.includes("\n")) {
		string = string.replace("\n", " ")
	}
	return string;
}

function parseGenderRate(int) {
	if (int == -1) return "Genderless";
	let fPercentage = (int * (1/8)) * 100;
	let mPercentage = (1 - (int * (1/8))) * 100;
	return `${mPercentage}% male, ${fPercentage}% female`;
}

module.exports = pokedex;