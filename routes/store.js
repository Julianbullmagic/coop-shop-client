const express = require('express');
const jwt = require('jsonwebtoken')
const storeController = require('../controllers/store');
const router = express.Router();

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

router.get('/', storeController.getAllStores);

router.get('/mystores/:userid',verifyToken, storeController.fetchUserStore)

router.post('/create',verifyToken, storeController.createStore);

router.put('/edit',verifyToken, storeController.editStore);

router.delete('/delete/:storeid',verifyToken, storeController.deleteStore);

router.delete('/deletelistingsforstore/:storeid',verifyToken, storeController.deleteListingsForStore);

router.delete('/deletelisting/:listingid',verifyToken, storeController.deleteListing);

router.get('/search/:search', storeController.search);

router.get('/search/:search/:category', storeController.searchbycategory);

router.get('/getrandomten', storeController.getRandomTenStores);

router.get('/randomtenstoresbycategory/:category',storeController.getstoresbycategory)


router.get('/fetchstore/:id', storeController.fetchStore);

module.exports = router;
