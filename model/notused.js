const db = require('../util/database');

module.exports = class Player {
    constructor(id, name, gender, inTeam) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.inTeam = inTeam;
    }

    save() {
        return db.execute(
            'INSERT INTO players (id, name, gender,inTeam) VALUES (?, ?, ?, ?)',
            [this.id, this.name, this.gender, this.inTeam]
        );
    }

    static createTable() {
        let query = 'ALTER TABLE players ADD ' + 'code VARCHAR(255)';
        db.query(query);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM players');
    }
}
