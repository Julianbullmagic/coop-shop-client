require('dotenv').config()
const axios=require("axios");
const express = require('express');
const path = require('path');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const listingRoutes = require('./routes/listing');
const storeRoutes = require('./routes/store');
const app = express();
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const db = require('./util/database');

app.use(bodyParser.json());

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept")
  next();
})


// ;(async function(){
//
//   let usdtoaud
//   let cnytoaud
//   let vndtoaud
//   let eurtoaud
//   let madtoaud
//   let gbptoaud
//
//   var options = {
//     method: 'GET',
//     url: 'https://currency-exchange.p.rapidapi.com/exchange',
//     params: {from: 'EUR', to: 'AUD', q: '1.0'},
//     headers: {
//       'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
//       'x-rapidapi-key': '24f2c04f41msh794ec7d5b9283dcp1ebdf7jsn01969526d5ac'
//     }
//   };
//
//   await axios.request(options).then(function (response) {
//   	console.log(response.data);
//      eurtoaud=response.data
//   }).catch(function (error) {
//   	console.error(error);
//   });
//
//
// var options = {
//   method: 'GET',
//   url: 'https://currency-exchange.p.rapidapi.com/exchange',
//   params: {from: 'USD', to: 'AUD', q: '1.0'},
//   headers: {
//     'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
//     'x-rapidapi-key': '24f2c04f41msh794ec7d5b9283dcp1ebdf7jsn01969526d5ac'
//   }
// };
//
// await axios.request(options).then(function (response) {
// 	console.log(response.data);
//    usdtoaud=response.data
// }).catch(function (error) {
// 	console.error(error);
// });
//
// var options = {
//   method: 'GET',
//   url: 'https://currency-exchange.p.rapidapi.com/exchange',
//   params: {from: 'CNY', to: 'AUD', q: '1.0'},
//   headers: {
//     'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
//     'x-rapidapi-key': '24f2c04f41msh794ec7d5b9283dcp1ebdf7jsn01969526d5ac'
//   }
// };
//
// await axios.request(options).then(function (response) {
// 	console.log(response.data);
//    cnytoaud=response.data
// }).catch(function (error) {
// 	console.error(error);
// });
//
//
// var options = {
//   method: 'GET',
//   url: 'https://currency-exchange.p.rapidapi.com/exchange',
//   params: {from: 'MAD', to: 'AUD', q: '1.0'},
//   headers: {
//     'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
//     'x-rapidapi-key': '24f2c04f41msh794ec7d5b9283dcp1ebdf7jsn01969526d5ac'
//   }
// };
//
// await axios.request(options).then(function (response) {
// 	console.log(response.data);
//    madtoaud=response.data
// }).catch(function (error) {
// 	console.error(error);
// });
//
// var options = {
//   method: 'GET',
//   url: 'https://currency-exchange.p.rapidapi.com/exchange',
//   params: {from: 'VND', to: 'AUD', q: '1.0'},
//   headers: {
//     'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
//     'x-rapidapi-key': '24f2c04f41msh794ec7d5b9283dcp1ebdf7jsn01969526d5ac'
//   }
// };
//
// await axios.request(options).then(function (response) {
// 	console.log(response.data);
//    vndtoaud=response.data
// }).catch(function (error) {
// 	console.error(error);
// });
//
// var options = {
//   method: 'GET',
//   url: 'https://currency-exchange.p.rapidapi.com/exchange',
//   params: {from: 'GBP', to: 'AUD', q: '1.0'},
//   headers: {
//     'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
//     'x-rapidapi-key': '24f2c04f41msh794ec7d5b9283dcp1ebdf7jsn01969526d5ac'
//   }
// };
//
// await axios.request(options).then(function (response) {
// 	console.log(response.data);
//    gbptoaud=response.data
// }).catch(function (error) {
// 	console.error(error);
// });
//
//
//
// console.log("CONVERSION RATES",usdtoaud,cnytoaud,vndtoaud,eurtoaud,madtoaud,gbptoaud)
//
// db.query("DELETE FROM stores WHERE indigenous=false")
// db.query("DELETE FROM listings WHERE indigenous=false")
//
//
//   var cooperatives=await axios.get('https://openapi.etsy.com/v2/shops?api_key=rz3xz66xvzkj5q2u8meogty7&limit=20&shop_name=cooperative').then(function (response) {
//     return response.data.results
//   }).catch(function (error) {
//   	console.error(error);
//   });
//
//   // console.log(cooperatives)
//
// cooperatives=cooperatives.map(item=>{return {id:item.shop_id,name:item.shop_name||null,title:item.title||null,
//   image:item.image_url_760x100||null,url:item.url||null,icon:item.icon_url_fullxfull||null
// }})
//
//
//
//
// for (let business of cooperatives){
//   let about=await axios.get(`https://openapi.etsy.com/v2/shops/${business.id}/about?api_key=rz3xz66xvzkj5q2u8meogty7`)
//   .then(function (response) {
//     return response.data.results[0]
//   }).catch(function (error) {
//     console.error(error);
//   });
//
// console.log(about)
//
// let storecategory
//
//
//
//
//
//
//   let listings=await axios.get(`https://openapi.etsy.com/v2/shops/${business.id}/listings/active?api_key=rz3xz66xvzkj5q2u8meogty7`)
//   .then(function (response) {
//     return response.data.results
//   }).catch(function (error) {
//     console.error(error);
//   });
// // console.log(business.name,business.id)
//
// listings=listings.map(item=>{
//
//   let convertedprice
// console.log(item.currency_code)
//   if(item.currency_code=="USD"){
//     convertedprice=item.price*usdtoaud.toFixed(2)
//   }
//
//   if(item.currency_code=="CNY"){
//     convertedprice=item.price*cnytoaud.toFixed(2)
//   }
//
//   if(item.currency_code=="VND"){
//     convertedprice=item.price*vndtoaud.toFixed(2)
//   }
//
//   if(item.currency_code=="EUR"){
//     convertedprice=item.price*vndtoaud.toFixed(2)
//   }
//   if(item.currency_code=="MAD"){
//     convertedprice=item.price*madtoaud.toFixed(2)
//   }
//
//   if(item.currency_code=="GBP"){
//     convertedprice=item.price*gbptoaud.toFixed(2)
//   }
//
//   return {listingid:item.listing_id,title:item.title,
//   description:item.description,price:convertedprice.toFixed(2),
//   tags:item.tags.join(),materials:item.materials.join(),shopsectionid:item.shop_section_id,
//   url:item.url,views:item.views,numfavourers:item.num_favorers,whenmade:item.when_made,
//   weight:`${item.item_weight}${item.item_weight_unit||''}`,
//   length:`${item.item_length}${item.item_length_unit||''}`,
//   width:`${item.item_width}${item.item_width_unit||''}`,
//   height:`${item.item_height}${item.item_height_unit||''}`,
//   used:item.used_manufacturer}})
//
//   for (let listing of listings){
//
// let images=await axios.get(`https://openapi.etsy.com/v2/listings/${listing.listingid}/images?api_key=rz3xz66xvzkj5q2u8meogty7`)
//   .then(function (response) {
//     return response.data.results
//   }).catch(function (error) {
//     console.error(error);
//   });
//
// images=images.map(item=>{return item.url_fullxfull})
// images=images.join()
// listing.images=images
// console.log(listing)
//
//     await db.query(
//        `INSERT INTO listings (listingid,storeid,title,description,price,tags,materials,
//          url,views,numfavourers,whenmade,weight,length,width,height,used,images,indigenous)
//          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
//         [listing.listingid,business.id,listing.title,listing.description,listing.price,listing.tags,
//           listing.materials,listing.url,listing.views,listing.numfavourers,
//           listing.whenmade,listing.weight,listing.length,listing.width,listing.height,listing.used,listing.images,false]
//     ).catch(function (error) {
//       console.error(error);
//     });
//   }
// if(about){
//   if(about.hasOwnProperty('story')){
//     await db.query(
//        'INSERT INTO stores (storeid,name,title,description,image,url,icon,indigenous) VALUES (?,?,?,?,?,?,?,?)',
//         [business.id,business.name,business.title,about.story,business.image,business.url,business.icon,false]
//     ).catch(function (error) {
//       console.error(error);
//     });
//   }
//   if(!about.hasOwnProperty('story')){
//     await db.query(
//        'INSERT INTO stores (storeid,name,title,image,url,icon,indigenous) VALUES (?,?,?,?,?,?,?)',
//         [business.id,business.name,business.title,business.image,business.url,business.icon,false]
//     ).catch(function (error) {
//       console.error(error);
//     });
//   }
// }
// if(!about){
//   await db.query(
//      'INSERT INTO stores (storeid,name,title,image,url,icon,indigenous) VALUES (?,?,?,?,?,?,?)',
//       [business.id,business.name,business.title,business.image,business.url,business.icon,false]
//   ).catch(function (error) {
//     console.error(error);
//   });
// }
//
// }
//
//
//
//
//
//
//     const browser = await puppeteer.launch({ headless: false });;
//     const page = await browser.newPage();
//
//
//         await page.goto(`https://www.made-in-china.com/company-search/cooperative/C1/1.html`);
//         let storelinks = await page.$$eval('h2.company-name a[target="_blank"]', links => { return links.map(link =>
//           {
//             var data={title:link.innerText,link:link.href}
//             return data
//
//           })})
//
//             storelinks=storelinks.filter(function notCapitalist(link) {
//   return !link.title.includes('Co.')
// });
// storelinks=storelinks.filter(function notCapitalist(link) {
// return !link.title.includes('CO.')
// });
// storelinks=storelinks.filter(function notCapitalist(link) {
// return !link.title.includes('Corp.')
// });
// storelinks=storelinks.filter(function notCapitalist(link) {
// return !link.title.includes('CORP.')
// });
// storelinks=storelinks.filter(function cooperative(link) {
// return link.title.includes('Cooperative')
// });
//
//
// for (let link of storelinks){
//   await page.goto(link.link);
//   let description= await page.$eval('div.desc-detail', title => { return title.innerText})
//   .catch((error) => {
//   console.error(error);
// });
//
// let interval=10000*Math.random()
// page.waitForTimeout(interval)
// if(description){
//   description=description.trim()}
//   console.log(link)
// console.log("description",description)
//       let storeid=getRandomInt(1000000000)
//       console.log("storeid",storeid)
//
//   await db.query(
//      `INSERT INTO stores (storeid,title,description,url,indigenous) VALUES (?,?,?,?,?)`,
//       [storeid,link.title||null,description||null,link.link||null,false]
//   ).catch(function (error) {
//     console.error(error);
//   });
//
//
//   await page.click('a.product-more')
//   .catch((error) => {
//   console.error(error);
// });
// await page.waitForTimeout(3000)
// let listinglinks = await page.$$eval('div.prod-name a', links => { return links.map(link =>
//       {
//         var data={title:link.textContent.trim(),link:link.href}
//         return data
//       })})
//       for (let link of listinglinks){
//         await page.goto(link.link)
//         let price= await page.$eval('span.price-item', title => { return title.innerText})
//         .catch((error) => {
//         console.error(error);
//       });
//
//
//
//
//
//
//
//
//         console.log(price)
//         let description= await page.$eval('div.desc.rich-text.J-tab-cnt', title => {return title.textContent})
//         .catch((error) => {
//         console.error(error);
//       });
//
//
//         let descriptiontable= await page.$eval('div.desc.rich-text.J-tab-cnt table', title => {return title.textContent})
//         .catch((error) => {
//         console.error(error);
//       });
//       if(description){
//         description=description.replace(descriptiontable,'').trim()
//       }
//       console.log(description)
//         let image= await page.$eval('img[itemprop="image"]', img => {return img.src})
//         .catch((error) => {
//         console.error(error);
//       });
//       let listingid=getRandomInt(1000000000)
//       console.log("listingid",listingid)
//           await db.query(
//              `INSERT INTO listings (listingid,storeid,title,description,url,images,indigenous) VALUES (?,?,?,?,?,?,?)`,
//               [listingid,storeid,link.title||null,description||null,link.link||null,image||null,false]
//           ).catch(function (error) {
//             console.error(error);
//           })
//         await page.waitForTimeout(1000)
//       }
// }
//
//
// let ebaylinks=[]
//     await page.goto('https://www.ebay.com/sns?store_search=cooperative');
//      let cooperativeebaylinks= await page.$$eval('div.sns-item__title a', links => { return links.map(link =>
//       {
//         var data={title:link.textContent,link:link.href}
//         return data
//       })})
// ebaylinks.push(...cooperativeebaylinks)
//
// await page.goto('https://www.ebay.com/sns?store_search=coop');
//  cooperativeebaylinks= await page.$$eval('div.sns-item__title a', links => { return links.map(link =>
//   {
//     var data={title:link.textContent,link:link.href}
//     return data
//   })})
// ebaylinks.push(...cooperativeebaylinks)
//
// ebaylinks=ebaylinks.filter(function notCoop(link) {
// return !link.title.toLowerCase().includes('coop')
// });
// console.log(ebaylinks)
//
// ebaylinks.push({title:"The Bower Coop",link:"https://www.ebay.com.au/str/thebowercoop"})
//
// for (var link of ebaylinks){
//   await page.goto(link.link)
//   .catch((error) => {
//   console.error(error);
// });
//
//   await page.waitForTimeout(3000)
//
//
//   let description=await page.$eval('p.str-header__description--text', element => { return element.textContent})
//   .catch((error) => {
//   console.error(error);
// });
//   console.log(description)
//   link.description=description
//
//
//     let image=await page.$eval('img.str-header__logo--img', element => { return element.src})
//     .catch((error) => {
//     console.error(error);
//   });
//   link.image=image
//     console.log(image)
//
//     let storeid=getRandomInt(1000000000)
//     console.log("storeid",storeid)
//
//     let products=await page.$$eval('article.str-item-card a', element => { return element.map(link =>{return link.href})})
//     .catch((error) => {
//     console.error(error);
//   });
//
//
//
// if(products.length>0){
//   await db.query(
//      `INSERT INTO stores (storeid,title,description,url,image,indigenous) VALUES (?,?,?,?,?,?)`,
//       [storeid,link.title||null,link.description||null,link.link||null,link.image||null,false]
//   ).catch(function (error) {
//     console.error(error);
//   });
// }
//
//
//   let categorynames=await page.$$eval('li.srp-refine__category__item a span', element => { return element.map(link =>{return link.innerText})})
//   .catch((error) => {
//   console.error(error);
// });
//
// let categorylinks=await page.$$eval('li.srp-refine__category__item a', element => { return element.map(link =>{return link.href})})
// .catch((error) => {
// console.error(error);
// });
//
// if(categorynames.length==0){
//   console.log("products",products)
//    await getListingData(products)
// }
//
// console.log(categorynames,categorylinks)
// let categories=[]
// for (let x=0;x<categorynames.length;x++){
//   var category={name:categorynames[x],link:categorylinks[x]}
//   console.log(category)
//   categories.push(category)
// }
//
// function shuffle(array) {
//   var currentIndex = array.length,  randomIndex;
//
//   // While there remain elements to shuffle...
//   while (currentIndex != 0) {
//
//     // Pick a remaining element...
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;
//
//     // And swap it with the current element.
//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex], array[currentIndex]];
//   }
//
//   return array;
// }
//
// categories=shuffle(categories);
// categories=categories.slice(0,10)
//
//   console.log(categories)
//
// for (var category of categories){
//   console.log(category)
//   await page.goto(category.link)
//   var listinglinks=await page.$$eval('div.s-item__info.clearfix a', element => { return element.map(link =>{return link.href})})
//   .catch((error) => {
//   console.error(error);
// });
//   console.log("listing links",listinglinks)
// listinglinks=listinglinks.slice(0,30)
//  await getListingData(listinglinks)
// }
//
//
//
// async function getListingData(listingURLS){
//
//   for (var list of listingURLS){
//     await page.goto(list).catch((error) => {
//       console.error(error);
//     });
//     let listingtitle= await page.$eval('h1.it-ttl', element => { return element.innerText})
//     .catch((error) => {
//     console.error(error);
//   })
//   let listingtitlespan= await page.$eval('h1.it-ttl span', element => { return element.innerText})
//   .catch((error) => {
//   console.error(error);
// })
//
// if(listingtitlespan){
// listingtitle=listingtitle.replace(listingtitlespan,'').trim()
// }
//
//
//   console.log("listing title",listingtitle)
//
//   let listingprice= await page.$eval('span[itemprop="price"]', element => { return element.innerText})
//   .catch((error) => {
//   console.error(error);
// })
// console.log("listing price",listingprice)
// let convertedprice
//
// if (listingprice.includes('US')){
//   let splitprice=listingprice.split('$')
//   let price=splitprice[1]
//   price=parseFloat(price)
//   console.log("listing price",price)
//   convertedprice=price*usdtoaud.toFixed(2)
// }
// if(!listingprice.includes('US')){
//   let splitprice=listingprice.split('$')
//   listingprice=splitprice[1]
//   listingprice=parseFloat(listingprice).toFixed(2)
// }
//
// convertedprice=convertedprice.toFixed(2)
// console.log("convertedprice",convertedprice)
//
// let condition= await page.$eval('div[itemprop="itemCondition"]', element => { return element.innerText})
// .catch((error) => {
// console.error(error);
// })
// console.log("condition",condition)
//
// let listingimgs=[]
//
// let listingimg= await page.$eval('img#icImg', element => { return element.src})
// .catch((error) => {
// console.error(error);
// })
// console.log("imgs",listingimg)
//   listingimgs.push(listingimg)
//
// await page.click('button.next-arr')
// .catch((error) => {
// console.error(error);
// })
// await page.waitForTimeout(3000)
// let listingimgtwo= await page.$eval('img#icImg', element => { return element.src})
// .catch((error) => {
// console.error(error);
// })
// console.log("imgs",listingimgtwo)
// await page.click('button.next-arr')
// .catch((error) => {
// console.error(error);
// })
// await page.waitForTimeout(3000)
//
//   listingimgs.push(listingimgtwo)
//
// let listingimgthree= await page.$eval('img#icImg', element => { return element.src})
// .catch((error) => {
// console.error(error);
// })
// console.log("imgs",listingimgthree)
//   listingimgs.push(listingimgthree)
//
// await page.click('button.next-arr')
// .catch((error) => {
// console.error(error);
// })
// await page.waitForTimeout(3000)
//
// let listingimgfour= await page.$eval('img#icImg', element => { return element.src})
// .catch((error) => {
// console.error(error);
// })
// console.log("imgs",listingimgfour)
//   listingimgs.push(listingimgfour)
//
// await page.click('button.next-arr')
// .catch((error) => {
// console.error(error);
// })
// await page.waitForTimeout(3000)
//
// let listingimgfive= await page.$eval('img#icImg', element => { return element.src})
// .catch((error) => {
// console.error(error);
// })
// console.log("imgs",listingimgfive)
//   listingimgs.push(listingimgfive)
//
//
//   let uniqueimages = listingimgs.filter((c, index) => {
//     return listingimgs.indexOf(c) === index;
// });
//
//
//
// console.log(uniqueimages.join());
// uniqueimages=uniqueimages.join()
// if(listingtitle){
//   let listingid=getRandomInt(1000000000)
//   console.log("listingid",listingid,listingtitle)
//   console.log("FULL SQL",listingid,storeid,listingtitle,listingprice,list,condition,uniqueimages)
//       await db.query(
//          `INSERT INTO listings (listingid,storeid,title,price,url,used,images,indigenous) VALUES (?,?,?,?,?,?,?,?)`,
//           [listingid,storeid,listingtitle,convertedprice.toFixed(2),list,condition,uniqueimages,false]
//       ).catch(function (error) {
//         console.error(error);
//       })
// }
// }
// }
// }
//
// await browser.close()
//
//
//
// })()



// Serve only the static files form the dist directory
// app.use(express.static(__dirname + '/dist/angular9-heroku-app'));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('dist/angular9-heroku-app'))

    app.get('*',(req,res) => {
        res.sendFile(path.join(__dirname,'dist','angular9-heroku-app','index.html'))
    })
}

//
// app.get('/*', function(req,res) {
//
// res.sendFile(path.join(__dirname+'/dist/angular9-heroku-app/index.html'));
// });

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
