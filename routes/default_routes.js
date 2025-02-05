const router = require('express').Router();
const {
    index,
    showMongoData,
    parseFrontendToMongo
} = require('../controllers/default_controllers');

router.get('/', index);

router.get('/showMongoData', showMongoData);

router.post('/parse-this-data-to-mongo', parseFrontendToMongo);

module.exports=router;