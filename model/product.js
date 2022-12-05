const db = require('../util/database');


module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        return db.execute(
            'INSERT INTO products (title) VALUES (?)',
            [this.title]
        );
    }
}
