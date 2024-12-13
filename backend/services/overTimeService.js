const overTimeModel = require('../models/OverTime');

const createOverTimeService = async(body) => {
    try {
        const res_ = await overTimeModel.createOne(body);
        return res_;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createOverTimeService
}