const baseSF = require('../serviceFacade/baseServiceFacade');
const { delivery } = require('util/');


let data;

exports.findDetailCodeList = async (request, response) => {
    
    const divisionCode = request.params.divisionCode;

    try{
        data={
            errorMsg:"success",
            errorCode:0,
            "detailCodeList":await baseSF.getDetailCodeList(divisionCode)
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

