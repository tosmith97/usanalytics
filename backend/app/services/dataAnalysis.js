const fs = require('fs'); 
const csv = require('csv-parser');
const path = require('path');


exports.getDataForCounties = async function (counties) {
    const filename = path.join(__dirname, './../../data/recidivism_data.csv');
    
    const results = []
    const readStream = fs.createReadStream(filename).pipe(csv());

    console.log(counties);

    let currentYear;
    let yearAggregate = 0;
    let currentCounty = {
        county: counties[0],
    };
    let currentCountyIndex = 1;
    let skip = false; 

    for await (const data of readStream) {
        if (currentCountyIndex > counties.length) break;

        try {
            if (data.COUNTY === '') continue;
            if (currentCounty.county !== data.COUNTY && skip) continue;

            if (currentCounty.county != data.COUNTY) {
                results.push(currentCounty);
                currentCounty = {
                    county: counties[currentCountyIndex],
                };
                currentCountyIndex = currentCountyIndex + 1;
                yearAggregate = 0;
                currentYear = undefined;
                skip = true;
            } else {
                skip = false; 
            }

            let month = data['M-Y'].split("-")[0];
            let year = data['M-Y'].split("-")[1];
            year = '20' + year;

            if (!currentYear) currentYear = year;

            if (!currentCounty[year]) currentCounty[year] = {};

            if (currentYear != year) {
                currentCounty[year]['aggregate'] = yearAggregate;
                yearAggregate = 0;
                currentYear = undefined;
            }

            // seems like pertinent ones are A3, B3, B4, all of C
            let allA = parseInt(data['A1']) + parseInt(data['A2']) + parseInt(data['A3']);
            let allB = parseInt(data['B1']) + parseInt(data['B2']) + parseInt(data['B3']) + parseInt(data['B4']);
            let allC = parseInt(data['C1']) + parseInt(data['C2']) + parseInt(data['C3']) + parseInt(data['C4']);
            
            yearAggregate = yearAggregate + allA + allB + allC;

            currentCounty[year][month] = {
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
    return results;
}