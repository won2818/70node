const outsourcDAO = require('../DAO/outsourcOrderDAO');

exports.searchOutsourcInfoList = async (param) => {
    const result = await outsourcDAO.searchOutsourcInfoList(param);    
    return result;
}

exports.searchOderableList = async (param) => {
    const result = await outsourcDAO.searchOderableList(param);    
    return result;
}

exports.insertOutsourc = async (param) => {
    await outsourcDAO.insertOutsourc(param);
    await outsourcDAO.updateNecessaryAmount(param);
    await outsourcDAO.updateRequestStatus(param);
}

