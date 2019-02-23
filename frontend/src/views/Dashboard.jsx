import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import config from '../config';
import Dropzone from 'react-dropzone';

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "../variables/charts.jsx";

const similarCountiesDict = {
  'SF': ['Tulare', 'Stanislaus', 'Yolo'],
  'Tulare': ['Stanislaus', 'SF', 'Yolo'],
  'Stanislaus': ['Tulare', 'SF', 'Yolo'],
  'Yolo': ['Tulare', 'SF', 'Stanislaus']
}

const populationsDict = {
  'SF': '884,363',
  'Tulare': '63,855',
  'Stanislaus': '547,899',
  'Yolo': '219,116'
}

const reentryProgramsDict = {
  'SF': [['Housing Help', 'https://betterhousing.org'], ['Job Resume Training', 'https://greatresumes.org']],
  'Tulare': [['Housing Help', 'https://betterhousing.org'], ['Drug Abuse Treatment Program', 'https://greatresumes.org']],
  'Stanislaus': [['The Last Mile: Computer Technical Education', 'https://thelastmile.org/'], ['Food Assistance Programs', 'https://LAFood.org'], ['Job Resume Training', 'https://greatresumes.org'], ['Parole Appointment Flexibility', 'https://flexibleparole.org']],
  'Yolo': [['Housing Help', 'https://betterhousing.org'], ['Job Resume Training', 'https://greatresumes.org'], ['Job Resume Training', 'https://greatresumes.org']]
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1"
    };
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };

  onDrop = (acceptedFiles, rejectedfiles) => {
    // fetch logic
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      const fileAsText = reader.result;
      // send csv via fetch here
      console.log('even litter', fileAsText)

    }
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.readAsText(file);
  }

  render() {
    var uploaderMarkup = this.props.countyName !== 'SF' ? '' 
    : <Button
      tag="label"
      className={classNames("btn-simple", {
        active: this.state.bigChartData === "data1"
      })}
      color="info"
      id="0"
      size="sm"
      // onClick={() => this.setBgChartData("data1")}
    >
      <input
        defaultChecked
        className="d-none"
        name="options"
        type="radio"
      />
      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
        Upload {this.props.countyName} County Monthly Report
      </span>
      <span className="d-block d-sm-none">
        <i className="tim-icons icon-single-02" />
      </span>
      <Dropzone onDrop={this.onDrop}>
        {({getRootProps, getInputProps, isDragActive}) => {
          return (
            <div
              {...getRootProps()}
              className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
            >
            
                  <input {...getInputProps()} />
                        {
                          isDragActive ?
                            <p>Drop files here...</p> :
                            <p>Try dropping some files here, or click to select files to upload.</p>
                        }

            </div>
          )
        }}
      </Dropzone>
    </Button>
    
    var reentryProgramMarkup = []
    
    reentryProgramsDict[this.props.countyName].forEach((info) => {
      var programMarkup = <tr>
      <td style={{cursor: "pointer"}}>{info[0]}</td>
      <td>{info[1]}</td>
    </tr>
      reentryProgramMarkup.push(programMarkup)
    })

    var countiesSimilarMarkup = []

    similarCountiesDict[this.props.countyName].forEach((county, index) => {
      console.log('this is index', index)
      var rate = index % 2 === 0 ? "30%" : "25%"
      var countyMarkup = <tr>
      <td style={{cursor: "pointer"}} onClick={() => this.props.changeCountyName(county)}>{county} County</td>
      <td>{populationsDict[county]}</td>
      <td>{rate}</td>
    </tr>
    countiesSimilarMarkup.push(countyMarkup)
    })
    
    return (
      // <>
        <div className="content">
            <div style={{marginTop: '-51px', paddingBottom: '30px', color: 'white'}}>Viewing Analytics for {this.props.countyName} County</div>
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Total Shipments</h5>
                      <CardTitle tag="h2">Performance</CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        {/* <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data1"
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => this.setBgChartData("data1")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Accounts
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button> */}
                        {uploaderMarkup}
                        {/* <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data2"
                          })}
                          onClick={() => this.setBgChartData("data2")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Purchases
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-gift-2" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="2"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data3"
                          })}
                          onClick={() => this.setBgChartData("data3")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Sessions
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-tap-02" />
                          </span>
                        </Button> */}
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample1[this.state.bigChartData]}
                      options={chartExample1.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Total Shipments</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-bell-55 text-info" />{" "}
                    763,215
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Daily Sales</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                    3,500€
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={chartExample3.data}
                      options={chartExample3.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Completed Tasks</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-send text-success" /> 12,100K
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample4.data}
                      options={chartExample4.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="12" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Reentry programs in {this.props.countyName} County</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reentryProgramMarkup}
                      {/* <tr>
                        <td style={{cursor: "pointer"}} onClick={() => this.props.changeCountyName('Tulare')}>Tulare County</td>
                        <td>Oud-Turnhout</td>
                      </tr>
                      <tr>
                        <td style={{cursor: "pointer"}} onClick={() => this.props.changeCountyName('Stanislaus')}>Los Angeles County</td>
                        <td>Sinaai-Waas</td>
                      </tr>
                      <tr>
                        <td style={{cursor: "pointer"}} onClick={() => this.props.changeCountyName('Yolo')}>Yolo County</td>
                        <td>Baileux</td>
                      </tr> */}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="12" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Counties Similar to You Based on Recidivism Rate and Population</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Population</th>
                        <th>Recidivism Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <tr>
                        <td style={{cursor: "pointer"}} onClick={() => this.props.changeCountyName('Tulare')}>Tulare County</td>
                        <td>Oud-Turnhout</td>
                        <td className="text-center">$36,738</td>
                      </tr>
                      <tr>
                        <td style={{cursor: "pointer"}} onClick={() => this.props.changeCountyName('Stanislaus')}>Los Angeles County</td>
                        <td>Sinaai-Waas</td>
                        <td className="text-center">$23,789</td>
                      </tr>
                      <tr>
                        <td style={{cursor: "pointer"}} onClick={() => this.props.changeCountyName('Yolo')}>Yolo County</td>
                        <td>Baileux</td>
                        <td className="text-center">$56,142</td>
                      </tr> */}
                      {countiesSimilarMarkup}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      // </>
    );
  }
}

export default Dashboard;
