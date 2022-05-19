var oracledb = require('oracledb'); //오라클을 사용하겟따.
var config = require('config/database.json').config;  //오라클 아이디 정보 뭐 그런곳을 담는곳이라 생각하면 된다.  의존성을 위해 분리시켜놨다.
const { JtoCamel,doRelease } = require('util/');
oracledb.autoCommit=true; //java 와 달리 node 에서는 outocommit이 false 이다 true로 항상 바꾸어 사용하여야 된다.

exports.searchOutsourcInfoList = async ({searchDateCondition, startDate, endData}) => {

  console.log(searchDateCondition);
  console.log(startDate);
  console.log(endData);

    let connection;
    try{
      connection = await oracledb.getConnection(config);
      const result = await connection.execute(
        "	SELECT*FROM OUTSOURC_INFO o WHERE "+
        "("+ 
        `CASE :searchDateCondition `+
        "WHEN 'claimDate' THEN "+
        "TO_DATE(o.CLAIM_DATE, 'YYYY-MM-DD') "+
        "WHEN 'dueDate' THEN "+
        "TO_DATE(o.DUE_DATE, 'YYYY-MM-DD') "+
        "END "+
        ") "+
        "BETWEEN "+
        `TO_DATE(:startDate,'YYYY-MM-DD') `+
        "AND "+
        `TO_DATE(:endData,'YYYY-MM-DD')`,
        [searchDateCondition, startDate, endData],
        { outFormat: oracledb.OBJECT }// Json 형태로 넘어오도록 설정
      );     
      
      return JtoCamel(result.rows);
      
    }catch(err){
     throw new Error(err.message);
    } finally {
      doRelease(connection);
    }
}

exports.searchOderableList = async ({searchDateCondition, startDate, endData}) => {

  console.log(searchDateCondition);
  console.log(startDate);
  console.log(endData);

    let connection;
    try{
      connection = await oracledb.getConnection(config);
      const result = await connection.execute(
        "SELECT "+ 
        "* "+ 
        "FROM "+
        "MRP_GATHERING m "+
        "WHERE "+
        "m.REQUEST_STATUS is null "+
        "and m.OUTSOURC_STATUS is null "+
        "and "+
        "( "+
        "CASE :searchDateCondition "+
        "WHEN 'claimDate' THEN "+
        "TO_DATE(m.CLAIM_DATE, 'YYYY-MM-DD') "+
        "WHEN 'dueDate' THEN "+
        "TO_DATE(m.DUE_DATE, 'YYYY-MM-DD') "+
        "END "+
        ") "+
        "BETWEEN "+
        "TO_DATE(:startDate,'YYYY-MM-DD') "+
        "AND "+
        "TO_DATE(:endData,'YYYY-MM-DD') "+
      "and "+
      "m.item_code in (select item_code from item i where i.ITEM_CLASSIFICATION='IT-SI') ",
        [searchDateCondition, startDate, endData],
        { outFormat: oracledb.OBJECT }// Json 형태로 넘어오도록 설정
      );     
      
      return JtoCamel(result.rows);
      
    }catch(err){
     throw new Error(err.message);
    } finally {
      doRelease(connection);
    }
}

var StringBuffer = function(){
  this.buffer = new Array();
  };
  
  StringBuffer.prototype.append = function(str){
      this.buffer.push(str);
      return this;
  };
  StringBuffer.prototype.toString = function(){
  return this.buffer.join("");
  };


exports.insertOutsourc = async (param) => {

  console.log("insertOutsourc");
  console.log(param);

    let connection;

    let str = new StringBuffer();


    str.append("insert all ");

    param.forEach(el => {     
str.append(
  "INTO OUTSOURC_INFO  (  "+
    "CLAIM_DATE, "+
    "DUE_DATE, "+
    "ITEM_CODE, "+
    "ITEM_NAME, "+
    "MRP_GATHERING_NO, "+
    "MRP_GATHERING_SEQ, "+
    "NECESSARY_AMOUNT, "+
    "ORDER_OR_PRODUCTION_STATUS, "+
    "OUTSOURC_AMOUNT, "+
    "SUM_PRICE_OF_OUTSOURC, "+
    "UNIT_OF_MRP_GATHERING, "+
    "UNIT_PRICE_OF_OUTSOURC, "+ 
    "OUTSOURC_NO "+            
    ") VALUES( "+
    `'${el.claimDate}', `+
    `'${el.dueDate}', `+
    `'${el.itemCode}', `+
    `'${el.itemName}', `+
    `'${el.mrpGatheringNo}', `+
    `${el.mrpGatheringSeq}, `+
    `${el.necessaryAmount}, `+
    `'${el.orderOrProductionStatus}', `+
    `${el.outsourcAmount}, `+
    `${el.sumPriceOfOutsourc}, `+
    `'${el.unitOfMrpGathering}', `+
    `${el.unitPriceOfOutsourc}, `+
    `'OPC-'||GET_OUTSOURC_SEQ) `
);

str.append(" ");
    });

    str.append(" SELECT * FROM DUAL ");

    console.log(str.toString());

    try{
      connection = await oracledb.getConnection(config);
      await connection.execute(
        str.toString()
      );     
      
      
    }catch(err){
      console.log("insertOutsourc");
     throw new Error(err.message);
    } finally {
      doRelease(connection);
    }
  }


  exports.updateNecessaryAmount = async (param) => {

    console.log("updateNecessaryAmount");

    let mrpGatheringNoArr = [];

    param.forEach(el => {     
mrpGatheringNoArr.push(el.mrpGatheringNo);
});

let mrpGNList = mrpGatheringNoArr.join(",");
  
      let connection;
      try{
        connection = await oracledb.getConnection(config);
        await connection.execute(
          "DECLARE "+
          "V_ERR_NO NUMBER; "+
          "V_ERR_MSG varchar2(50); "+
          "BEGIN "+
          `P_INSERT_OUTSOURC_INFO('${mrpGNList}',V_ERR_MSG,V_ERR_NO); `+
          "END; "
        );     
        
      }catch(err){
       throw new Error(err.message);
      } finally {
        doRelease(connection);
      }
  }





  exports.updateRequestStatus = async (param) => {

    console.log("updateRequestStatus");

    let mrpGatheringNoArr = [];

    param.forEach(el => {     
      if(el.necessaryAmount==el.outsourcAmount){
mrpGatheringNoArr.push(el.mrpGatheringNo);
}
});

let mrpGNList = mrpGatheringNoArr.join("', '");

console.log(`'${mrpGNList}'`);

    let connection;
    try{
      connection = await oracledb.getConnection(config);


     await connection.execute(
        "UPDATE "+
        "mrp_gathering "+
        "SET "+
        "REQUEST_STATUS='Y' "+
        "WHERE "+
        `MRP_GATHERING_NO in ('${mrpGNList}')`
      );     

      }catch(err){
       throw new Error(err.message);
      } finally {
        doRelease(connection);
      }
  }