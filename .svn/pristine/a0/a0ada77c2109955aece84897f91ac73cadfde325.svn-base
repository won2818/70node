const express = require("express"); //express 프레임워크
const router = express.Router(); //react Router랑 거의 같은 개념이다.

const EmpCodeController = require("./controller/empCodeController");
const boardController = require("./board/controller/boardController");

router.get("/codeList/:deptName", EmpCodeController.findEmpCodeList);
router.get("/board/boardList", boardController.boardList);
router.get("/board/boardPost/:boardSeq", boardController.boardPost);
router.post("/board/writePost", boardController.writePost);
router.delete("/board/deletePost/:boardSeq", boardController.deletePost);
router.post("/board/updatePost", boardController.updatePost);
router.post("/board/writeReply", boardController.writeReply);
router.post("/board/addReply", boardController.addReply);
router.get("/board/requestReply/:boardSeq", boardController.requestReply);
module.exports = router;
