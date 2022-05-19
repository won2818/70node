const outsourcSF = require('../serviceFacade/outsourcServiceFacade');
const { delivery } = require('util/');


let data;

exports.searchOutsourcInfoList = async (request, response) => {

    console.log(request.query);
    
    const param = {    
    searchDateCondition : request.query.searchDateCondition,
    startDate : request.query.startDate,
    endData : request.query.endDate
    }
    
    try{
        data={
            errorMsg:"success",
            errorCode:0,
            gridRowJson:await outsourcSF.searchOutsourcInfoList(param)
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


exports.searchOderableList = async(request, response) => {

    console.log(request.query);
    
    const param = {    
    searchDateCondition : request.query.searchDateCondition,
    startDate : request.query.startDate,
    endData : request.query.endDate
    }
    
    try{
        data={
            errorMsg:"success",
            errorCode:0,
            gridRowJson:await outsourcSF.searchOderableList(param)
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


exports.insertOutsourc = async(request, response) => {

    console.log(request.body);
    
    try{
        await outsourcSF.insertOutsourc(request.body)
        data={
            errorMsg:"success",
            errorCode:0,
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