var express = require('express');
var TabHinchableController = require('../controllers/tabHinchable');

var router = express.Router();

//Midelware
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads'});

router.post('/tabhinchable', TabHinchableController.saveTable);
router.get('/tabhinchable', TabHinchableController.getTables);
router.get('/tabhinchable/:id', TabHinchableController.getTable); //el interrogante lo hace opcional el id
router.put('/tabhinchable/:id', TabHinchableController.updateTable);
router.delete('/tabhinchable/:id', TabHinchableController.deleteTable);
router.post('/upload-image/:id', multipartMiddleware, TabHinchableController.uploadImage);
router.get('/get-image/:image', TabHinchableController.getImageFile);


module.exports = router;