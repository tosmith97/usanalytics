const dAService = require('../services/dataAnalysis');


exports.getDataForCountries = async function (req, res) {
    const { counties } = req.body;

    let err, results;
    [err, results] = await to(dAService.getDataForCounties(counties));
    if (err) return ReE(res, err);

    return ReS(res, {results}, 200);
}