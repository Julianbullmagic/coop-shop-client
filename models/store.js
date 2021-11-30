const db = require('../util/database');

module.exports = class Store {
  constructor(storeid, name, title, image, url, icon) {
    this.storeid = storeid||null;
    this.name = name||null;
    this.title=title||null;
    this.image=image||null;
    this.url=url||null;
    this.icon=icon||null;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM stores ORDER BY RAND()');
  }

  static fetchUserStore(creatorid){
    return db.execute(`SELECT * FROM stores WHERE creator=${creatorid}`);
  }

  static fetchRandomTen() {
    return db.execute(`SELECT * FROM stores WHERE title NOT LIKE '%test%' ORDER BY RAND() LIMIT 10`);
  }

  static fetchRandomTenByCategory(category){
    console.log,("fetching stores by category",`SELECT * FROM stores WHERE
    title LIKE '%${category}%'
    OR description LIKE '%${category}%'
    OR name LIKE '%${category}%'
    OR category LIKE '%${category}%'
    ORDER BY RAND() LIMIT 10`)
    return db.execute(`SELECT * FROM stores WHERE
    (title LIKE '%${category}%'
    OR description LIKE '%${category}%'
    OR name LIKE '%${category}%'
    OR category LIKE '%${category}%')
    AND title NOT LIKE '%test%'
    ORDER BY RAND() LIMIT 10`, [category]);
  }

  static search(search) {
    return db.execute(`SELECT * FROM stores WHERE name LIKE '%${search}%' OR title LIKE '%${search}%' OR description LIKE '%${search}%'`)
  }

  static async create(store) {
    console.log("store",store.userid)
    console.log('INSERT INTO stores (name,title,description,image,icon,category,creator) VALUES (?,?,?,?,?,?,?)',
                  store.name,store.title,store.description,store.image,store.icon,store.category,store.userid)
    return db.execute(
             'INSERT INTO stores (name,title,description,image,icon,category,creator,email,phone) VALUES (?,?,?,?,?,?,?,?,?)',
              [store.name,store.title,store.description,store.image,store.icon,store.category,store.userid,store.email,store.phone]
    )
  }

  static edit(store) {
    console.log("editting store",store)
      return db.execute(`UPDATE stores SET
        name='${store.name}',
        title='${store.title}',
        description='${store.description}',
        category='${store.category}',
        image='${store.image}',
        icon='${store.icon}'
        WHERE storeid='${store.id}'`)
  }

  static async delete(store) {
    console.log(`DELETE FROM stores WHERE storeid=${store}`)
    return db.execute(
            `DELETE FROM stores WHERE storeid=${store}`
            ,
          function(err, results, fields) {
            console.log(results);
            console.log(fields);
            console.log(err)
          }
    )
  }

  static async deleteListing(listing) {
    console.log(`DELETE FROM listings WHERE listingid=${listing}`)
    return db.execute(
            `DELETE FROM listings WHERE listingid=${listing}`
            ,
          function(err, results, fields) {
            console.log(results);
            console.log(fields);
            console.log(err)
          }
    )
  }

  static async deleteListingsForStore(listing) {
    console.log(`DELETE FROM listings WHERE storeid=${listing}`)
    return db.execute(
            `DELETE FROM listings WHERE storeid=${listing}`
            ,
          function(err, results, fields) {
            console.log(results);
            console.log(fields);
            console.log(err)
          }
    )
  }



  static async searchbycategory(search,category){
    console.log(`SELECT * FROM stores WHERE
     (name LIKE '%${search}%'
      OR title LIKE '%${search}%'
      OR description LIKE '%${search}%')
      AND
      (name LIKE '%${category}%'
       OR title LIKE '%${category}%'
       OR description LIKE '%${category}%')`)

    return db.execute(`SELECT * FROM stores WHERE
     (name LIKE '%${search}%'
      OR title LIKE '%${search}%'
      OR description LIKE '%${search}%')
      AND
      (name LIKE '%${category}%'
       OR title LIKE '%${category}%'
       OR description LIKE '%${category}%')`
    )
  }
  static fetchStore(id) {
    return db.execute(`SELECT * FROM stores WHERE storeid=${id}`);
  }
};
