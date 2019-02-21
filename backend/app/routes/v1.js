const express 			= require('express');
const router 			= express.Router();
const MainController 	= require('./../controllers/MainController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

router.post('/county/recidivism',           MainController.getDataForCountries);

module.exports = router;
