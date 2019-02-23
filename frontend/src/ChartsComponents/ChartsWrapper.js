import React from 'react';
import { Line, Bar, Pie } from "react-chartjs-2";
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
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

import {GetGraphOptions} from "./charts_options.jsx"
import {DataWrapper} from "./charts_data.jsx";

// This should take in data


// Options that can be configured (data,color, size, icon, multiple toggles (todo))

// Classic Line Graph
// Parameters: dataX, dataY, color (blue, green, pink), size (1-12)(n), title(n), (n)ylabel (took out size and labels to work with aneesh better)
class LineChart extends React.Component {
  render() {

    return(
      <CardBody>
        <div className="chart-area">
          <Line
            data={DataWrapper(this.props.dataX, this.props.dataY, this.props.color)}
            options={GetGraphOptions("line", this.props.color )}
          />
        </div>
      </CardBody>
    )
  }
}



// Bar Graph Component
class BarChart extends React.Component {
  render() {

    return(
      <Col lg={this.props.size}>
        <Card className="card-chart">
          <CardHeader>
            <h5 className="card-category">{this.props.ylabel}</h5>
            <CardTitle tag="h3">
              <i className="tim-icons icon-bell-55 text-info" />{" "}
              {this.props.title}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <div className="chart-area">
              <Bar
                data={DataWrapper(this.props.dataX, this.props.dataY, this.props.color)}
                options={GetGraphOptions("bar", this.props.color )}
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    )
  }
}






// Pie Chart Component
export {
  LineChart,
  BarChart,
}
