const base = require("sqlite3").Database;

class Database {
	constructor(path) {
		this.db = new base(path, err => {
			if (err) throw err;
		});
		this.log("DB loaded");
	}

	get(table, id) {
		return new Promise((resolve, reject) => {
			switch (table) {
				case "prefixes":
					this.db.get("SELECT prefix FROM prefixes WHERE id = ?;", [id], (err, row) => {
						if (err) reject(err);
						resolve(row.prefix);
					});
					break;
			}
		});
	}

	set(table, id, val) {
		return new Promise((resolve, reject) => {
			switch (table) {
				case "prefixes":
					this.db.get("SELECT * FROM prefixes WHERE id = ?;", [id], (err, row) => {
						if (err) reject(err);
						if (row) {
							this.db.run("UPDATE prefixes SET prefix = ? WHERE id = ?;", [val, id], err => {
								if (err) reject(err);
								resolve();
							});
						} else {
							this.db.run("INSERT INTO prefixes VALUES (?, ?);", [id, val], err => {
								if (err) reject(err);
								resolve();
							});
						}
					});
			}
		});
	}

	log(string) {
		let date = new Date();
		let hr = date.getHours().toString();
		let min = date.getMinutes().toString();
		let sec = date.getSeconds().toString();
		if (hr.length < 2) hr = "0" + hr;
		if (min.length < 2) min = "0" + min;
		if (sec.length < 2) sec = "0" + sec;
		let ts = `[${hr}:${min}:${sec}]`;
		console.log(`${ts} ${string}`);
	}
}

module.exports = Database;