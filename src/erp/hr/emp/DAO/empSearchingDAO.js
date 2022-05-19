var oracledb = require('oracledb'); //오라클을 사용하겟따.
var config = require('config/database.json').config; //오라클 아이디 정보 뭐 그런곳을 담는곳이라 생각하면 된다.  의존성을 위해 분리시켜놨다.
const { JtoCamel, doRelease } = require('util/');

oracledb.autoCommit = true; //java 와 달리 node 에서는 outocommit이 false 이다 true로 항상 바꾸어 사용하여야 된다.

exports.getTotalEmpInfo = async (loginTo) => {
  console.log('getTotalEmpInfo 회사 코드 :', loginTo.companyCode);
  console.log('getTotalEmpInfo 사업장 코드 :', loginTo.workplaceCode);
  console.log('getTotalEmpInfo 사원코드 :', loginTo.empCode);

  let connection;
  try {
    connection = await oracledb.getConnection(config);
    const result = await connection.execute(
      'SELECT EMP_CODE, COMPANY_CODE, EMP_NAME, EMP_ENG_NAME, HIRE_DATE, RETIREMENT_DATE,\r\n' +
        '        USER_OR_NOT, SOCIAL_SECURITY_NUMBER, BIRTH_DATE, GENDER, SEQ, UPDATE_HISTORY, UPDATE_DATE, \r\n' +
        '        USER_ID, WORKPLACE_CODE, WORKPLACE_NAME, DEPT_CODE, PHONE_NUMBER, EMAIL, ZIP_CODE, \r\n' +
        '        BASIC_ADDRESS, DETAIL_ADDRESS, LEVEL_OF_EDUCATION, IMAGE, POSITION_CODE, \r\n' +
        '        POSITION_NAME, DEPT_NAME,AUTHORITY_CODE, AUTHORITY_LEVEL\r\n' +
        '    FROM\r\n' +
        '    ( SELECT E1.EMP_CODE, E1.COMPANY_CODE, E1.EMP_NAME, E1.EMP_ENG_NAME, E1.HIRE_DATE, E1.RETIREMENT_DATE, \r\n' +
        '            E1.USER_OR_NOT, E1.SOCIAL_SECURITY_NUMBER, E1.BIRTH_DATE, E1.GENDER, \r\n' +
        '        E2.SEQ, E2.UPDATE_HISTORY, E2.UPDATE_DATE, E2.USER_ID, E2.WORKPLACE_CODE, W.WORKPLACE_NAME,\r\n' +
        '        E2.DEPT_CODE, E2.PHONE_NUMBER, E2.ZIP_CODE, E2.BASIC_ADDRESS, E2.DETAIL_ADDRESS,\r\n' +
        '        E2.LEVEL_OF_EDUCATION, E2.IMAGE, E2.POSITION_CODE, E2.EMAIL,E2.AUTHORITY_CODE,\r\n' +
        '        P.POSITION_NAME, D.DEPT_NAME, A.AUTHORITY_LEVEL\r\n' +
        '        FROM EMPLOYEE_BASIC E1, EMPLOYEE_DETAIL E2, WORKPLACE W, POSITION P, DEPARTMENT D, AUTHORITY A\r\n' +
        '        WHERE E1.EMP_CODE = E2.EMP_CODE \r\n' +
        '            AND E1.COMPANY_CODE = W.COMPANY_CODE \r\n' +
        '            AND E2.WORKPLACE_CODE = W.WORKPLACE_CODE\r\n' +
        '            AND E2.WORKPLACE_CODE = P.WORKPLACE_CODE \r\n' +
        '            AND E2.DEPT_CODE = P.DEPT_CODE \r\n' +
        '            AND E2.POSITION_CODE = P.POSITION_CODE\r\n' +
        '            AND E2.WORKPLACE_CODE = D.WORKPLACE_CODE \r\n' +
        '            AND E2.DEPT_CODE = D.DEPT_CODE\r\n' +
        '            AND ( E2.EMP_CODE, E2.SEQ ) IN \r\n' +
        '                ( SELECT EMP_CODE, MAX(SEQ) FROM EMPLOYEE_DETAIL GROUP BY EMP_CODE ) \r\n' +
        '            AND E2.AUTHORITY_CODE_NUMBER = A.AUTHORITY_CODE_NUMBER) \r\n' +
        '    WHERE COMPANY_CODE = :companyCode \r\n' +
        '        AND WORKPLACE_CODE = :workplaceCode \r\n' +
        '        AND USER_ID = :empCode',
      {
        companyCode: loginTo.companyCode,
        workplaceCode: loginTo.workplaceCode,
        empCode: loginTo.empCode,
      },
      { outFormat: oracledb.OBJECT } // Json 형태로 넘어오도록 설정
    );
    return JtoCamel(result.rows[0]);
  } catch (err) {
    throw new Error('입력된 정보에 해당하는 사원은 없습니다.');
  } finally {
    doRelease(connection);
  }
};

exports.getEmpAuthInfo = async (authTo) => {
  let connection;
  console.log("getEmpAuthInfo 회사 코드 :", authTo.companyCode);
  console.log("getEmpAuthInfo 사업장 코드 :", authTo.workplaceCode);
  console.log("getEmpAuthInfo 사원코드 :", authTo.empCode);
  try {
    connection = await oracledb.getConnection(config);
    const result = await connection.execute(
      "SELECT AUTHORITY_CODE_NUMBER \r\n" +
        "FROM \r\n" +
        "(SELECT A.COMPANY_CODE, A.EMP_CODE, B.USER_ID, B.WORKPLACE_CODE, C.AUTHORITY_CODE_NUMBER \r\n" +
        "FROM EMPLOYEE_BASIC A, EMPLOYEE_DETAIL B, EMPLOYEE_AUTHORITY C, AUTHORITY D \r\n" +
        "WHERE A.EMP_CODE = B.EMP_CODE \r\n" +
        "AND B.EMP_CODE = C.EMP_CODE \r\n" +
        "AND C.AUTHORITY_CODE_NUMBER = D.AUTHORITY_CODE_NUMBER) \r\n" +
        "WHERE COMPANY_CODE = :companyCode \r\n" +
        "AND WORKPLACE_CODE = :workplaceCode \r\n" +
        "AND USER_ID = :empCode",
      {
        companyCode: authTo.companyCode,
        workplaceCode: authTo.workplaceCode,
        empCode: authTo.empCode,
      }
    );
    const newResult = [];
    result.rows.map((arr) => newResult.push(arr[0]));
    return newResult;
  } catch (err) {
    throw new Error("입력된 정보에 해당하는 사원 권한은 없습니다.");
  } finally {
    doRelease(connection);
  }
};

exports.getMenuAuthInfo = async (url) => {
  let connection;
  console.log("getMenuAuthInfo 회사 코드 :", url.url);
  try {
    connection = await oracledb.getConnection(config);
    const result = await connection.execute(
      "SELECT AUTHORITY_CODE_NUMBER \r\n" +
        "FROM \r\n" +
        "(SELECT A.MENU_URL, C.AUTHORITY_CODE_NUMBER \r\n" +
        "FROM MENU A, AUTHORITY B, MENU_AUTHORITY C \r\n" +
        "WHERE A.MENU_CODE = C.MENU_CODE \r\n" +
        "AND B.AUTHORITY_CODE_NUMBER = C.AUTHORITY_CODE_NUMBER) \r\n" +
        "WHERE MENU_URL = :url",
      {
        url: url.url,
      }
    );
    const newResult = [];
    result.rows.map((arr) => newResult.push(arr[0]));
    return newResult;
  } catch (err) {
    throw new Error("입력된 정보에 해당하는 메뉴 권한은 없습니다.");
  } finally {
    doRelease(connection);
  }
};
