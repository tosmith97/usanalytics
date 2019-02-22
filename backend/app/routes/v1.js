const express 			= require('express');
const router 			= express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/csv/' });

const MainController 	= require('./../controllers/MainController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});


/*
  POST Request
  localhost:8000/v1/county/recidivism
  Sample request:
    {
	    "counties": ["Alameda", "Yolo"]
    }
*/ 
router.post('/county/recidivism',           MainController.getRecidivismDataForCounties);

/*
    GET Request
    localhost:8000/v1/california/recidivism
*/
router.get('/california/recidivism',           MainController.getRecidivismDataForCalifornia);

/*
  POST Request
  localhost:8000/v1/county/crime
  Sample request:
    {
	    "counties": ["Alameda", "Yolo"]
    }
*/ 
router.post('/county/crime',           MainController.getCrimeRateDataForCounties);

/*
    GET Request
    localhost:8000/v1/california/crime
*/
router.get('/california/crime',           MainController.getCrimeRateDataForCalifornia);


router.get('/file/upload',     upload.single('file'),          MainController.uploadFile);

module.exports = router;
