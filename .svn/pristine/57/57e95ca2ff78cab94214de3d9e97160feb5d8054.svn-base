const boardService = require("../service/boardService");
const { delivery } = require("util/");

let data;
//글목록불러오기
exports.boardList = async (request, response) => {
  try {
    data = {
      errorMsg: "success",
      errorCode: 0,
      boardList: await boardService.boardList(),
    };
  } catch (err) {
    data = {
      errorCode: -1,
      errorMsg: err.message,
    };
  } finally {
    delivery(response, data);
  }
};

//글하나불러오기
exports.boardPost = async (request, response) => {
  const boardSeq = request.params.boardSeq;
  try {
    data = {
      errorMsg: "success",
      errorCode: 0,
      boardPost: await boardService.getBoardPost(boardSeq),
    };
  } catch (err) {
    data = {
      errorCode: -1,
      errorMsg: err.message,
    };
  } finally {
    delivery(response, data.boardPost); //여기서 boardPost로 뽑아주니 바로 안겹치고나옴. util로 이동
  }
};

//글작성하기
exports.writePost = async (request, response) => {
  console.log(request.body);
  try {
    const post = await boardService.writePost(request.body);
    data = {
      errorMsg: "success",
      errorCode: 0,
      board: post,
    };
  } catch (err) {
    data = {
      errorCode: -1,
      errorMsg: err.message,
    };
  } finally {
    delivery(response, data);
  }
};

//글수정하기
exports.updatePost = async (request, response) => {
  //get 방식으로 접근한것은 request.params 로 받을 수 있다.
  //post,delete,put 으로 전송한 데이터들은 request.body 안에 담겨 사용 할 수 있다

  //if json 으로 받을때
  const param = request.body;
  try {
    data = {
      errorMsg: "success",
      errorCode: 0,
      updatepost: await boardService.updatePost(param),
    };
  } catch (err) {
    data = {
      errorCode: -1,
      errorMsg: err.message,
    };
  } finally {
    delivery(response, data.updatepost);
  }
};

exports.deletePost = async (request, response) => {
  const boardSeq = request.params.boardSeq;
  try {
    data = {
      errorMsg: "success",
      errorCode: 0,
      deletePost: await boardService.deletePost(boardSeq),
    };
  } catch (err) {
    data = {
      errorCode: -1,
      errorMsg: err.message,
    };
  } finally {
    delivery(response, data.deletePost);
  }
};

exports.writeReply = async (request, response) => {
  const replyInfo = request.body;
  console.log("댓글 등록", replyInfo);
  await boardService.writeReply(replyInfo);
  try {
    data = {
      errorMsg: "success",
      errorCode: 0,
    };
  } catch (err) {
    data = {
      errorCode: -1,
      errorMsg: err.message,
    };
  } finally {
    delivery(response, data);
  }
};

exports.requestReply = async (request, response) => {
  const boardSeq = request.params.boardSeq;
  console.log("댓글 조회 boardSeq", boardSeq);
  try {
    data = {
      errorMsg: "success",
      errorCode: 0,
      requestReply: await boardService.requestReply(boardSeq),
    };
  } catch (err) {
    data = {
      errorCode: -1,
      errorMsg: err.message,
    };
  } finally {
    delivery(response, data.requestReply);
  }
};

exports.addReply = async (request, response) => {
  const replyInfo = request.body;
  console.log("대댓글 등록", replyInfo);
  await boardService.addReply(replyInfo);
  try {
    data = {
      errorMsg: "success",
      errorCode: 0,
    };
  } catch (err) {
    data = {
      errorCode: -1,
      errorMsg: err.message,
    };
  } finally {
    delivery(response, data);
  }
};
