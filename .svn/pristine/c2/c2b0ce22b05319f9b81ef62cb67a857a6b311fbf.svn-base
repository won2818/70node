const express = require("express"); //express 프레임워크
const router = express.Router(); //react Router랑 거의 같은 개념이다.

const myLoginController = require("./controller/myLoginController");

router.post("/login", myLoginController.login);
router.post("/auth", myLoginController.auth);
router.post("/menuAuth", myLoginController.menuAuth);

module.exports = router;
