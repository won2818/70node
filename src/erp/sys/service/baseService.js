const empSearchingDAO = require("src/erp/hr/emp/DAO/empSearchingDAO");
const empSecretDAO = require("src/erp/hr/emp/DAO/empSecretDAO");

exports.myLogin = async (loginTo) => {
  const result = await empSearchingDAO.getTotalEmpInfo(loginTo);
  const map = {
    companyCode: loginTo.companyCode,
    empCode: result.empCode,
  };
  const empSecretInfo = await empSecretDAO.selectUserPassWord(map);
  //로그인실패처리
  if (empSecretInfo !== null || empSecretInfo !== undefined) {
    if (loginTo.password !== empSecretInfo.userPassword) {
      throw new Error("비밀번호를 확인 해주세요.");
    }
  }
  return result;
};

exports.myAuth = async (authTo) => {
  const result = await empSearchingDAO.getEmpAuthInfo(authTo);
  console.log("result 확인", result);
  return result;
};

exports.menuAuth = async (url) => {
  const result = await empSearchingDAO.getMenuAuthInfo(url);
  console.log("result 확인", result);
  return result;
};
