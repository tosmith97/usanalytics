const dAService = require('../services/dataAnalysis');


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


exports.uploadFile = function (req, res) {
    const fileRows = [];

    // open uploaded file
    csv.fromPath(req.file.path)
        .on("data", function (data) {
            fileRows.push(data); // push each row
        })
        .on("end", function () {
            console.log(fileRows)
            // fs.unlinkSync(req.file.path);   // remove temp file
            //process "fileRows" and respond
        })
    
    dAService.handleCSVUpload(req.file.path);

    return ReS(res, 201);
}