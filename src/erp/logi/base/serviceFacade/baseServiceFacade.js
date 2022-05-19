const codeDetailAS = require('../applicationService/baseApplicationService');

exports.getDetailCodeList = async (divisionCode) => {
    const result = await codeDetailAS.getDetailCodeList(divisionCode);    
    return result;
}

