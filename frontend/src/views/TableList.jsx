import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

class CountyList extends React.Component {
  render() {
    var countyMarkup = []
    counties.forEach((county, index) => {
      var rate = 0
      if (index % 5 === 0) {
        rate = "25%"
      } else if (index % 5 === 1) {
        rate = "30%"
      } else if (index % 5 === 2) {
        rate = "35%"
      } else if (index % 5 === 3) { 
        rate = "40%"
      } else {
        rate = "20%"
      }
      var markup = <tr>
        <td> {county} </td>
        <td>100,000</td>
        <td>{rate}</td>
      </tr>
      countyMarkup.push(markup)
    })
    console.log('here is county markup', countyMarkup)
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">All Counties</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Population</th>
                        <th>County Recidivism Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {countyMarkup}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            {/* <Col md="12">
              <Card className="card-plain">
                <CardHeader>
                  <CardTitle tag="h4">Table on Plain Background</CardTitle>
                  <p className="category">Here is a subtitle for this table</p>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>City</th>
                        <th className="text-center">Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dakota Rice</td>
                        <td>Niger</td>
                        <td>Oud-Turnhout</td>
                        <td className="text-center">$36,738</td>
                      </tr>
                      <tr>
                        <td>Minerva Hooper</td>
                        <td>Curaçao</td>
                        <td>Sinaai-Waas</td>
                        <td className="text-center">$23,789</td>
                      </tr>
                      <tr>
                        <td>Sage Rodriguez</td>
                        <td>Netherlands</td>
                        <td>Baileux</td>
                        <td className="text-center">$56,142</td>
                      </tr>
                      <tr>
                        <td>Philip Chaney</td>
                        <td>Korea, South</td>
                        <td>Overland Park</td>
                        <td className="text-center">$38,735</td>
                      </tr>
                      <tr>
                        <td>Doris Greene</td>
                        <td>Malawi</td>
                        <td>Feldkirchen in Kärnten</td>
                        <td className="text-center">$63,542</td>
                      </tr>
                      <tr>
                        <td>Mason Porter</td>
                        <td>Chile</td>
                        <td>Gloucester</td>
                        <td className="text-center">$78,615</td>
                      </tr>
                      <tr>
                        <td>Jon Porter</td>
                        <td>Portugal</td>
                        <td>Gloucester</td>
                        <td className="text-center">$98,615</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col> */}
          </Row>
        </div>
      </>
    );
  }
}

var counties = ["Alameda",
"Alpine",
"Amador",
"Butte",
"Calaveras",
"Colusa",
"Contra Costa",
"Del Norte",
"El Dorado",
"Fresno",
"Glenn",
"Humboldt",
"Imperial",
"Inyo",
"Kern",
"Kings",
"Lake",
"Lassen",
"Los Angeles",
"Madera",
"Marin",
"Mariposa",
"Mendocino",
"Merced",
"Modoc",
"Mono",
"Monterey",
"Napa",
"Nevada",
"Orange",
"Placer",
"Plumas",
"Riverside",
"Sacramento",
"San Benito",
"San Bernardino",
"San Diego",
"San Francisco",
"San Joaquin",
"San Luis Obispo",
"San Mateo",
"Santa Barbara",
"Santa Clara",
"Santa Cruz",
"Shasta",
"Sierra",
"Siskiyou",
"Solano",
"Sonoma",
"Stanislaus",
"Sutter",
"Tehama",
"Trinity",
"Tulare",
"Tuolumne",
"Ventura",
"Yolo",
"Yuba"]

export default CountyList;
