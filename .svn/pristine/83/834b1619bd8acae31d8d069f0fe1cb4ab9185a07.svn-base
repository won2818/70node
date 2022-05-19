const baseService = require('../service/baseService');
const { delivery } = require('util/');


let data;

exports.findEmpCodeList = async (request, response) => {
    
    const deptName = request.params.deptName;

    try{
        data={
            errorMsg:"success",
            errorCode:0,
            "empCodeList":await baseService.getEmpCodeList(deptName)
        }
    }catch(err){
        data = {
            errorCode : -1,
            errorMsg : err.message
        }
    }finally{
        delivery(response,data);
    }
 
}
