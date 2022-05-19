var oracledb = require("oracledb"); //오라클을 사용하겟따.
var config = require("config/database.json").config; //오라클 아이디 정보 뭐 그런곳을 담는곳이라 생각하면 된다.  의존성을 위해 분리시켜놨다.
const { JtoCamel, doRelease } = require("util/");
oracledb.autoCommit = true; //java 와 달리 node 에서는 autocommit이 false 이다 true로 항상 바꾸어 사용하여야 된다.
const moment = require("moment");

exports.boardList = async (map) => {
  let connection;

  try {
    connection = await oracledb.getConnection(config);
    console.log("커넥션", connection);
    const result = await connection.execute(
      "SELECT * FROM NOTICE_BOARD ORDER BY BOARD_SEQ DESC",

      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT } // Json 형태로 넘어오도록 설정
    );
    console.log("결과는?!!", result);
    return JtoCamel(result.rows);
  } catch (err) {
    throw new Error(err.message);
  } finally {
    doRelease(connection);
  }
};

exports.selectBoardPost = async (boardSeq) => {
  let connection;

  try {
    connection = await oracledb.getConnection(config);
    console.log("커넥션", connection);
    const result = await connection.execute(
      "	SELECT *  FROM NOTICE_BOARD WHERE BOARD_SEQ  = :boardSeq ",

      {
        boardSeq: boardSeq,
      },
      { outFormat: oracledb.OUT_FORMAT_OBJECT } // Json 형태로 넘어오도록 설정
    );

    return JtoCamel(result.rows[0]);
  } catch (err) {
    throw new Error(err.message);
  } finally {
    doRelease(connection);
  }
};

exports.insertPost = async (param) => {
  console.log("insertPost");
  console.log(param);

  let connection;
  try {
    connection = await oracledb.getConnection(config);
    await connection.execute(
      "INSERT INTO NOTICE_BOARD VALUES(" +
        `BOARD_SEQ.nextval,'${param.empCode}','${param.title}','${
          param.body
        }','${moment().format("YYYY-MM-DD")}',0,0) `
    );

    const result = await connection.execute(
      "SELECT * FROM NOTICE_BOARD WHERE BOARD_SEQ = BOARD_SEQ.CURVAL"
    );

    return result;
  } catch (err) {
    console.log("INSERTPOST");
    throw new Error(err.message);
  } finally {
    doRelease(connection);
  }
};

//글수정하기
exports.updatePost = async (param) => {
  try {
    connection = await oracledb.getConnection(config);
    await connection.execute(
      "UPDATE NOTICE_BOARD SET TITLE=:title, BODY=:body WHERE BOARD_SEQ=:boardSeq",

      {
        boardSeq: param.boardSeq,
        title: param.title,
        body: param.body,
      },
      { outFormat: oracledb.OUT_FORMAT_OBJECT } // Json 형태로 넘어오도록 설정
    );

    const result = await connection.execute(
      "SELECT * FROM NOTICE_BOARD WHERE BOARD_SEQ =:boardSeq",
      {
        boardSeq: param.boardSeq,
      }
    );

    return JtoCamel(result.rows[0]);
  } catch (err) {
    throw new Error(err.message);
  } finally {
    doRelease(connection);
  }
};

//글삭제하기
exports.deletePost = async (boardSeq) => {
  try {
    connection = await oracledb.getConnection(config);
    const result = await connection.execute(
      "delete from NOTICE_BOARD where BOARD_SEQ=:boardSeq",
      {
        boardSeq: boardSeq,
      },
      { outFormat: oracledb.OUT_FORMAT_OBJECT } // Json 형태로 넘어오도록 설정
    );
    console.log("삭제결과는?!!", result);
    return JtoCamel(result.rows[0]);
  } catch (err) {
    throw new Error(err.message);
  } finally {
    doRelease(connection);
  }
};

//댓글 등록하기
exports.writeReply = async (replyInfo) => {
  try {
    connection = await oracledb.getConnection(config);
    await connection.execute(
      `INSERT INTO BOARD_REPLY VALUES('${replyInfo.boardSeq}', BOARD_REPLY_SEQ.NEXTVAL, NULL, '${replyInfo.empCode}', '${replyInfo.content}',SYSDATE)`
    );
  } catch (err) {
    throw new Error(err.message);
  } finally {
    doRelease(connection);
  }
};

//댓글 조회 하기
exports.requestReply = async (boardSeq) => {
  try {
    connection = await oracledb.getConnection(config);
    const result = await connection.execute(
      "SELECT BOARD_SEQ, REPLY_SEQ, REF_SEQ, A.EMP_CODE, CONTENT, REG_DATE, EMP_NAME, COLOR FROM BOARD_REPLY A, EMPLOYEE_BASIC B WHERE A.EMP_CODE = B.EMP_CODE AND BOARD_SEQ = :boardSeq ORDER BY REPLY_SEQ",
      { boardSeq: boardSeq },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    console.log("댓글 리스트", result);
    return JtoCamel(result.rows);
  } catch (err) {
    throw new Error(err.message);
  } finally {
    doRelease(connection);
  }
};

//대댓글 등록 하기
exports.addReply = async (replyInfo) => {
  try {
    connection = await oracledb.getConnection(config);
    await connection.execute(
      `INSERT INTO BOARD_REPLY VALUES('${replyInfo.boardSeq}', BOARD_REPLY_SEQ.NEXTVAL, '${replyInfo.refSeq}', '${replyInfo.empCode}', '${replyInfo.content}',SYSDATE)`
    );
  } catch (err) {
    throw new Error(err.message);
  } finally {
    doRelease(connection);
  }
};
