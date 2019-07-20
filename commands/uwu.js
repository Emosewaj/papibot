class uwu {
    static run(client, args) {
        const m = args.shift();
        if (!args[0]) return m.reply("chu fowgot to give me a sentence unu");

        let content = args
        for (let i in content) {
            while (content[i].toLowerCase().includes("you"))
                for (let k = 0; k < 8; k++)
                    content[i] = content[i].replace(genString("you", k), genString("chu", k));
            while (content[i].toLowerCase().includes("love"))
                for (let k = 0; k < 16; k++)
                    content[i] = content[i].replace(genString("love", k), genString("wuv", k));
        }

        content = content.join(" ");

        while (content.toLowerCase().includes("chur"))
            for (let i = 0; i < 16; i++)
                content = content.replace(genString("chur", i), genString("your", i));

        let nyas = /n[aeiou]/g
        let NYAS = /N[AEIOU]/g

        let array1;
        while (array1 = nyas.exec(content) != null) {
            content = content.split("");
            content.splice(nyas.lastIndex - 1, 0, "y")
            content = content.join("");
        }
        while (array1 = NYAS.exec(content) != null) {
            content = content.split("");
            content.splice(NYAS.lastIndex - 1, 0, "Y");
            content.content.join("");
        }

        content = content.replace(/r|l/g, "w").replace(/R|L/g, "W");

        m.channel.send(content + " uwu");
    }

    static help() {
        return {
            category: "general",
            shortDesc: "Tuwn a sentence into fuwwy-speak uwu",
            longDesc: "Turns a given sentence into furry-speak.",
            syntax: "uwu <text>"
        };
    }
}

function genString(word, binary) {
    binary = binary.toString(2);

    while (binary.length < word.length)
        binary = "0" + binary;

    binary = binary.split("");
    word = word.split("");

    for (let i in word) {
        if (binary[i] == "1")
            word[i] = word[i].toUpperCase();
        else
            word[i] = word[i].toLowerCase();
    }

    return word.join("");
}

module.exports = uwu;