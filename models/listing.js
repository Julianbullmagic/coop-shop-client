const db = require('../util/database');

module.exports = class Listing {

  constructor(listingid,storeid, title, description, price, tags, materials, shopsectionid, url, views, numfavourers,
  whenmade, weight, length, width, height, used, images) {
    this.listingid = listingid||null;
    this.storeid = storeid||null;
    this.title=title||null;
    this.description=description||null;
    this.price=price||null;
    this.tags=tags||null;
    this.materials=materials||null;
    this.shopsectionid=shopsectionid||null;
    this.url=url||null;
    this.views=views||null;
    this.numfavourers=numfavourers||null;
    this.whenmade=whenmade||null;
    this.weight=weight||null;
    this.length=length||null;
    this.width=width||null;
    this.height=height||null;
    this.used=used||null;
    this.images=images||null;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM listings ORDER BY RAND()');
  }


  static async delete(listing) {
    console.log("listing",listing)
    console.log(`DELETE FROM listings WHERE listingid=${listing}`)

    return db.execute(`DELETE FROM listings WHERE listingid=${listing}`)
    ,
  function(err, results, fields) {
    console.log(results);
    console.log(fields);
    console.log(err)
  }
  }


  static create(listing) {
    console.log("listing",listing)
    console.log('INSERT INTO listings (title,storeid,description,price,tags,materials,category,used,images) VALUES (?,?,?,?,?,?,?,?,?)',
                  listing.title,listing.storeid,listing.description,listing.price,listing.tags,listing.materials,listing.category,listing.condition,listing.images)
    return db.execute(
             'INSERT INTO listings (title,storeid,description,price,tags,materials,category,used,images) VALUES (?,?,?,?,?,?,?,?,?)',
              [listing.title,listing.storeid,listing.description,listing.price,listing.tags,listing.materials,listing.category,listing.condition,listing.images]
    )
  }

  static edit(listing) {
    console.log("editting listing",listing)
    console.log(`UPDATE listings SET title=${listing.title},storeid=${listing.storeid},description=${listing.description},
    price=${listing.price},tags=${listing.tags},materials=${listing.materials},category=${listing.category},
    used=${listing.used},images=${listing.images} WHERE [listingid=${listing.id}]`)
      return db.execute(`UPDATE listings SET
        title='${listing.title}',
        storeid='${listing.storeid}',
        description='${listing.description}',
        price='${listing.price}',
        tags='${listing.tags}',
        materials='${listing.materials}',
        category='${listing.category}',
        used='${listing.used}',
        images='${listing.images}'
        WHERE listingid='${listing.id}'`)
  }

static fetchListingsForShop(storeid){
  return db.execute(`SELECT * FROM listings WHERE storeid=${storeid}`);
}

  static fetchRandomTen() {
    return db.execute(`SELECT * FROM listings WHERE NOT (title='Test' OR title='test') ORDER BY RAND() LIMIT 10`);
  }
  static fetchRandomTenFromShop(id){
    return db.execute('SELECT * FROM listings WHERE storeid=? ORDER BY RAND() LIMIT 10', [id]);
  }

  static fetchRandomTenFromShopByCategory(id,category){
    console.log(`SELECT * FROM listings WHERE storeid=${id}
          AND (title LIKE '%${category}%'
          OR description LIKE '%${category}%'
          OR tags LIKE '%${category}%'
          OR category LIKE '%${category}%')
          ORDER BY RAND() LIMIT 10`)
    return db.execute(
      `SELECT * FROM listings WHERE storeid=${id}
      AND (title LIKE '%${category}%'
      OR description LIKE '%${category}%'
      OR tags LIKE '%${category}%'
      OR category LIKE '%${category}%')
      ORDER BY RAND() LIMIT 10`);
  }

  static fetchRandomTenByCategory(category){
    return db.execute(`SELECT * FROM listings WHERE
    (title LIKE '%${category}%'
    OR description LIKE '%${category}%'
    OR tags LIKE '%${category}%'
    OR category LIKE '%${category}%')
    AND title NOT LIKE '%test%'
    ORDER BY RAND() LIMIT 10`, [category]);
  }

  static fetchListing(id){
    return db.execute('SELECT * FROM listings WHERE listingid=?', [id]);
  }

 static getCategoriesForShop(storeid){
   return db.execute(`SELECT DISTINCT category FROM listings WHERE storeid=${storeid} ORDER BY RAND()`)
 }

 static getCategories(){
   return db.execute(`SELECT DISTINCT category FROM listings ORDER BY RAND()`)
 }



  static search(search) {
    console.log(`SELECT * FROM listings WHERE title LIKE '%${search}%'
    OR description LIKE '%${search}%'
    OR tags LIKE '%${search}%'`)
    return db.execute(`SELECT * FROM listings WHERE title LIKE '%${search}%'
    OR description LIKE '%${search}%'
    OR tags LIKE '%${search}%'`)
  }

  static searchbystore(storeid,search){
    console.log(`SELECT * FROM listings WHERE storeid=${storeid}
      AND (title LIKE '%${search}%'
    OR description LIKE '%${search}%'
    OR tags LIKE '%${search}%')`)
    return db.execute(`SELECT * FROM listings WHERE storeid=${storeid}
      AND (title LIKE '%${search}%'
    OR description LIKE '%${search}%'
    OR tags LIKE '%${search}%')`)
  }

  static searchbycategory(search,category) {
    console.log(`SELECT * FROM listings WHERE (title LIKE '%${search}%'
    OR description LIKE '%${search}%'
    OR tags LIKE '%${search}%'
    OR category LIKE '%${search}%')
    &&
    (title LIKE '%${category}%'
    OR description LIKE '%${category}%'
    OR tags LIKE '%${category}%'
    OR category LIKE '%${category}%')`)
    return db.execute(`SELECT * FROM listings WHERE
      (title LIKE '%${search}%'
    OR description LIKE '%${search}%'
    OR tags LIKE '%${search}%'
    OR category LIKE '%${search}%')
    &&
    (title LIKE '%${category}%'
    OR description LIKE '%${category}%'
    OR tags LIKE '%${category}%'
    OR category LIKE '%${category}%')`)
  }

  static searchbystorecategory(storeid,search,category){
    return db.execute(`SELECT * FROM listings WHERE storeid=${storeid}
    && (title LIKE '%${search}%'
    OR description LIKE '%${search}%'
    OR tags LIKE '%${search}%'
    OR category LIKE '%${search}%')
    &&
    (title LIKE '%${category}%'
    OR description LIKE '%${category}%'
    OR tags LIKE '%${category}%'
    OR category LIKE '%${category}%')`)
  }

  static post(item) {
    return db.execute('INSERT INTO listings (item) VALUES (?)', [item]);
  }

  static update(id, item) {
    return db.execute('UPDATE listings SET item = ? WHERE id = ?', [item, id]);
  }

  static delete(id) {
    return db.execute('DELETE FROM listings WHERE id = ?', [id]);
  }
};
