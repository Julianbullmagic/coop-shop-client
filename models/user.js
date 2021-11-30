const db = require('../util/database');

module.exports = class User {
  constructor(name, email, bio, phone, cool, password) {
    this.name = name;
    this.email = email;
    this.bio = bio;
    this.phone=phone;
    this.cool=cool;
    this.password = password;
  }

  static find(email) {
    console.log("finding email",email)
    return db.execute('SELECT * FROM users WHERE email = ?', [email]);
  }

  static save(user) {
    console.log("user!",user)
    console.log(`INSERT INTO users (name, email, bio, phone, cool, password)
VALUES (${user.name},${user.email},${user.bio},${user.phone},${user.cool})`)
    return db.execute(`INSERT INTO users (name, email, bio, phone, cool, password)
VALUES (?,?,?,?,?,?)`,[user.name,user.email,user.bio,user.phone,user.cool,user.password])
  }
};
