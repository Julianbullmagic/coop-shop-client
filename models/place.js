const db = require('../util/database');

module.exports = class Place {
  constructor(id, streetnumber, street, state, postcode, details, lasttimeknownempty) {
    this.id = id;
    this.streetnumber: streetnumber;
    this.street: street,
    this.city: city,
    this.state: state,
    this.postcode: postcode,
    this.details: details,
    this.lasttimeknownempty:lasttimeknownempty
  }

  static fetchAll() {
    return db.execute('SELECT * FROM places');
  }

  static post(item) {
    return db.execute('INSERT INTO places (item) VALUES (?)', [item]);
  }

  static update(id, item) {
    return db.execute('UPDATE places SET item = ? WHERE id = ?', [item, id]);
  }

  static delete(id) {
    return db.execute('DELETE FROM places WHERE id = ?', [id]);
  }
};
