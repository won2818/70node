const express = require('express'); //express 프레임워크
const router = express.Router();    //react Router랑 거의 같은 개념이다.


const codeController = require('./base/controller/codeController');
const outsourcOrderController = require('./outsourc/controller/outsourcOrderController');


router.get('/codeList/:divisionCode', codeController.findDetailCodeList);

router.get('/outsourc/searchOutsourcInfoList.do', outsourcOrderController.searchOutsourcInfoList);

router.get('/outsourc/searchOderableList.do', outsourcOrderController.searchOderableList);

router.post('/outsourc/insertOutsourc.do', outsourcOrderController.insertOutsourc);

module.exports = router;