const express = require('express');
const listingController = require('../controllers/listing');
const router = express.Router();
const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, process.env.SECRETKEY)
  if(!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}

router.get('/', listingController.getAllListings);

router.post('/createlisting',verifyToken, listingController.createListing)

router.put('/editlisting',verifyToken, listingController.editListing)

router.delete('/deletelisting/:listingid',verifyToken, listingController.deleteListing);

router.get('/fetchlistingsforshop/:storeid', listingController.fetchListingsForShop);

router.get('/tenrandomlistings', listingController.getRandomTenListings);

router.get('/randomtenlistingsfromshop/:id', listingController.randomtenlistingsfromshop);

router.get('/fetchlisting/:id', listingController.fetchlisting);

router.get('/search/:search', listingController.search);

router.get('/searchbyshop/:storeid/:search', listingController.searchbystore);

router.get('/search/:search/:category', listingController.searchbycategory);

router.get('/searchbyshop/:storeid/:search/:category', listingController.searchbystorecategory);

router.get('/getcategoriesforshop/:storeid',listingController.getcategoriesforshop)

router.get('/getallcategories',listingController.getcategories)

router.get('/randomtenlistingsfromshopbycategory/:storeid/:category',listingController.getlistingsfromshopbycategory)

router.get('/randomtenlistingsbycategory/:category',listingController.getlistingsbycategory)

router.post('/', listingController.postListing);

router.put('/', listingController.putListing);

router.delete('/:id', listingController.deleteListing);

module.exports = router;
