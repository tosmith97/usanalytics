const dAService = require('../services/dataAnalysis');
const csv = require('fast-csv');

exports.getRecidivismDataForCounties = async function (req, res) {
    const { counties } = req.body;

    let err, results;
    [err, results] = await to(dAService.getRecidivismDataForCounties(counties));
    if (err) return ReE(res, err);

    return ReS(res, {results}, 200);
}

exports.getRecidivismDataForCalifornia = async function (req, res) {
    let err, results;
    [err, results] = await to(dAService.getRecidivismDataForCalifornia());
    if (err) return ReE(res, err);

    return ReS(res, {results}, 200);
}


exports.getCrimeRateDataForCounties = async function (req, res) {
    const { counties } = req.body;
    console.log(req.body);
    let err, results;
    [err, results] = await to(dAService.getCrimeRateDataForCounties(counties));
    if (err) return ReE(res, err);

    return ReS(res, {results}, 200);
}

exports.getCrimeRateDataForCalifornia = async function (req, res) {
    let err, results;
    [err, results] = await to(dAService.getCrimeRateDataForCalifornia());
    if (err) return ReE(res, err);

    return ReS(res, {results}, 200);
}


exports.uploadFile = async function (req, res) {
    let err, _;
    
    [err, _] = await to(dAService.handleCSVUpload(req.file.path));
    if (err) return ReE(res, err);

    return ReS(res, { message: 'File uploaded successfully' }, 201);
}