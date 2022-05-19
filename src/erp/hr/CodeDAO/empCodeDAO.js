var oracledb = require('oracledb'); //오라클을 사용하겟따.
var config = require('config/database.json').config;  //오라클 아이디 정보 뭐 그런곳을 담는곳이라 생각하면 된다.  의존성을 위해 분리시켜놨다.
const { JtoCamel,doRelease } = require('util/');
oracledb.autoCommit=true; //java 와 달리 node 에서는 outocommit이 false 이다 true로 항상 바꾸어 사용하여야 된다.

exports.selectEmpCodeList = async (deptName) => {
    let connection;
    if(deptName==='전체부서'){
    try{
      connection = await oracledb.getConnection(config);
      const result = await connection.execute(
        "SELECT  DISTINCT(a.EMP_CODE), b.DEPT_NAME, c.EMP_NAME, d.POSITION_NAME FROM EMPLOYEE_DETAIL a, DEPARTMENT b, EMPLOYEE_BASIC c, POSITION d " +
        " WHERE a.DEPT_CODE=b.DEPT_CODE" +
        " AND c.EMP_CODE=a.EMP_CODE" +
        " AND d.POSITION_CODE=a.POSITION_CODE" +
        " AND d.DEPT_CODE=b.DEPT_CODE" +
        " ORDER BY b.DEPT_NAME ",
        [],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }// Json 형태로 넘어오도록 설정
      );
      
      return JtoCamel(result.rows);
      
    }catch(err){
     throw new Error(err.message);
    } finally {
      doRelease(connection);
    }
  }else{
    try{
      connection = await oracledb.getConnection(config);
      const result = await connection.execute(
        "SELECT  DISTINCT(a.EMP_CODE), b.DEPT_NAME, c.EMP_NAME, d.POSITION_NAME FROM EMPLOYEE_DETAIL a, DEPARTMENT b, EMPLOYEE_BASIC c, POSITION d " +
        " WHERE a.DEPT_CODE=b.DEPT_CODE" +
        " AND c.EMP_CODE=a.EMP_CODE" +
        " AND d.POSITION_CODE=a.POSITION_CODE" +
        " AND d.DEPT_CODE=b.DEPT_CODE" +
        " AND b.DEPT_CODE= :deptName",
        [deptName],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }// Json 형태로 넘어오도록 설정
      );     
      
      return JtoCamel(result.rows);
      
    }catch(err){
     throw new Error(err.message);
    } finally {
      doRelease(connection);
    }

  }
}