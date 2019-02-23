import _ from 'lodash'
import config from './config';

async function getCountyRecidivism (counties) {
    let options = {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({"counties": counties})
        }
        let resp = await fetch(config['backend_url'] + '/county/recidivism', options);
        let json =  await resp.json();
        json = json['results'];
        resp = {};
        json.forEach((county) => {
            let countyName = county.county;
            let c = JSON.parse(JSON.stringify(county));
            delete c.county
            resp[countyName] = c
        })
        return resp;
}

    // NOTE: this expects counties.length = 1 bc this is a hackathon and I'm bad
export async function getYearlyCountyRecidivism(counties){
    let resp = await getCountyRecidivism(counties);
    // need aggregates from each month in last year
    for (let c of counties) {
        let agg = []
        let county = resp[c];

        Object.keys(county[config.CURRENT_YEAR]).forEach((month) => {
        if (county[config.CURRENT_YEAR][month]['Aggregate']) {
            
            // certified sorted
            agg.push({
            month,
            'aggregate': county[config.CURRENT_YEAR][month]['Aggregate']
            });
        }
        });

        // need 12-n months from previous year
        const nRemainingMonths = 12 - agg.length;

        let oldAgg = [];
        const lastYear = config.CURRENT_YEAR - 1
        Object.keys(county[lastYear]).forEach((month) => {
        if (county[lastYear][month]['Aggregate']) {
            
            // certified sorted
            oldAgg.push({
            month,
            'aggregate': county[lastYear][month]['Aggregate']
            });
        }
        });
        let remaining = _.takeRight(oldAgg, nRemainingMonths);
        const recidivismOverLastYear = remaining.concat(agg);

        let recidivismOverLastYearX = []
        let recidivismOverLastYearY = []
        for (let m of recidivismOverLastYear) {
            recidivismOverLastYearY.push(m.aggregate);
            recidivismOverLastYearX.push(m.month);
        }
        return {recidivismOverLastYearX, recidivismOverLastYearY};
    }
}