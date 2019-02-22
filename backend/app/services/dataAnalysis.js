const fs = require('fs'); 
const csv = require('csv-parser');
const path = require('path');


const recidivismData = path.join(__dirname, './../../data/recidivism_data.csv');
const crimeRateData = path.join(__dirname, './../../data/crime_rate_data.csv');


getRecidivismDataForCounty = async function (county) {
    const readStream = fs.createReadStream(recidivismData).pipe(csv());

    let currentYear;
    let yearAggregate = 0;
    let countyObj = {
        county,
    };

    for await (const data of readStream) {
        try {
            if (data.COUNTY === '' || countyObj.county !== data.COUNTY) continue;

            let month = data['M-Y'].split("-")[0];
            let year = data['M-Y'].split("-")[1];
            year = '20' + year;

            if (!currentYear) currentYear = year;

            if (!countyObj[year]) countyObj[year] = {};

            if (currentYear != year) {
                countyObj[year]['aggregate'] = yearAggregate;
                yearAggregate = 0;
                currentYear = undefined;
            }

            let { allA, allB, allC } = processRecidivismDataRow(data)

            yearAggregate = yearAggregate + allA + allB + allC;

            countyObj[year][month] = {
                '1170(h)': allA,
                'PRCS': allB,
                'Parolees': allC,
                'Aggregate': allA + allB + allC
            }
        }
        catch(err) {
            console.log(err);
            TE(err);
        }
    }
    return countyObj;
}
exports.getRecidivismDataForCounty = getRecidivismDataForCounty;

exports.getRecidivismDataForCounties = async function (counties) {
    const results = []

    for (let c of counties) {
        let err, county;
        [err, county] = await to(getRecidivismDataForCounty(c));
        if (err) TE(err);
        results.push(county);
    }
    return results;
}

exports.getRecidivismDataForCalifornia = async function () {
    const readStream = fs.createReadStream(recidivismData).pipe(csv());

    let california = {};

    for await (const data of readStream) {
        try {
            if (data.COUNTY === '') continue;

            let month = data['M-Y'].split("-")[0];
            let year = data['M-Y'].split("-")[1];
            year = '20' + year;

            if (!california[year]) california[year] = {};

            // seems like pertinent ones are A3, B3, B4, all of C
            let { allA, allB, allC } = processRecidivismDataRow(data)
            
            if (california[year][month]) {
                california[year][month]['1170(h)'] += allA;
                california[year][month]['PRCS'] += allB;
                california[year][month]['Parolees'] += allC; 
                california[year][month]['Aggregate'] = california[year][month]['Aggregate'] + allA + allB + allC;
            } else {
                california[year][month] = {
                    '1170(h)': allA,
                    'PRCS': allB,
                    'Parolees': allC,
                    'Aggregate': allA + allB + allC
                }
            }
        }
        catch(err) {
            console.log(err);
            TE(err);
        }
    }

    return california;
}

processRecidivismDataRow = function (row) {
    const a1 = parseInt(row['A1']) || 0;
    const a2 = parseInt(row['A2']) || 0;
    const a3 = parseInt(row['A3']) || 0;
    const allA = a1 + a2 + a3;

    const b1 = parseInt(row['B1']) || 0;
    const b2 = parseInt(row['B2']) || 0;
    const b3 = parseInt(row['B3']) || 0;
    const b4 = parseInt(row['B4']) || 0;
    const allB = b1 + b2 + b3 + b4;

    const c1 = parseInt(row['C1']) || 0;
    const c2 = parseInt(row['C2']) || 0;
    const c3 = parseInt(row['C3']) || 0;
    const c4 = parseInt(row['C4']) || 0;
    const allC = c1 + c2 + c3 + c4;

    return { allA, allB, allC };
}


getCrimeRateDataForCounty = async function (county) {
    const readStream = fs.createReadStream(crimeRateData).pipe(csv());

    for await (const data of readStream) {
        if (county.COUNTY === '' || county !== data.County) continue;

        let countyObj = {
            county: data['County'],
            Violent: data['Violent'],
            Murder: data['Murder'],
            Rape: data['Rape'],
            Property: data['Property'],
            Burglary: data['Burglary']
        }
        countyObj['Aggrevated assult'] = data['Aggrevated assult'];
        countyObj['Vehicle theft'] = data['Vehicle theft'];
        countyObj['Larceny theft'] = data['Larency theft']
        return countyObj;
    }

    return 0;
}

exports.getCrimeRateDataForCounties = async function (counties) {
    const results = []
    for (let c of counties) {
        let err, county;
        [err, county] = await to(getCrimeRateDataForCounty(c));
        if (err) TE(err);
        results.push(county);
    }
    return results;
}


exports.getCrimeRateDataForCalifornia = async function () {
    const readStream = fs.createReadStream(crimeRateData).pipe(csv());

    for await (const data of readStream) {
        if (data.County === '' || data.County !== 'Statewide') continue;

        let countyObj = {
            county: data['County'],
            Violent: data['Violent'],
            Murder: data['Murder'],
            Rape: data['Rape'],
            Property: data['Property'],
            Burglary: data['Burglary']
        }
        countyObj['Aggrevated assult'] = data['Aggrevated assult'];
        countyObj['Vehicle theft'] = data['Vehicle theft'];
        countyObj['Larceny theft'] = data['Larency theft']
        return countyObj;
    }
}