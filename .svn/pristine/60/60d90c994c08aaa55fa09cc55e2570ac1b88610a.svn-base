const boardDAO = require("../DAO/boardDAO");

exports.boardList = async () => {
  const result = await boardDAO.boardList();
  return result;
};

exports.getBoardPost = async (boardSeq) => {
  const result = await boardDAO.selectBoardPost(boardSeq);

  return result;
};

exports.writePost = async (param) => {
  return await boardDAO.insertPost(param);
};

exports.updatePost = async (param) => {
  const result = await boardDAO.updatePost(param);
  return result;
};

exports.deletePost = async (boardSeq) => {
  const result = await boardDAO.deletePost(boardSeq);
  return result;
};

exports.writeReply = async (replyInfo) => {
  await boardDAO.writeReply(replyInfo);
};

exports.requestReply = async (boardSeq) => {
  const result = await boardDAO.requestReply(boardSeq);
  return result;
};

exports.addReply = async (replyInfo) => {
  await boardDAO.addReply(replyInfo);
};
