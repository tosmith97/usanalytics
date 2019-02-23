import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { SimpleFormPageComponent } from '../components/SimpleFormPageComponent/SimpleFormPageComponent';
import './login-view.css';

export default class LoginView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginEmail: 'admin@tularecounty.ca.gov',
      loginPassword: 'password',
    }
  }

  _onClick = () => {
    this.props.history.push('admin/workspace');
  }


  render() {
    return (
      <SimpleFormPageComponent pageTitle="Log In">
        <Helmet
          title="California Analytics Login"
          meta={[
            { name: 'description', content: 'Description of LoginPage' },
          ]}
        />
        <h2> California Analytics </h2>
        <Form onSubmit={this.login} className="login-form-container">
          <FormGroup row>
            <Col xs="12">
              <Input style={{color: "black" }} type="email" name="mail" placeholder="Email" value={this.state.loginEmail} onChange={e => this.setState({ loginEmail: e.target.value })} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs="12">
              <Input style={{color: "black"}} type="password" name="password" placeholder="Password" value={this.state.loginPassword} onChange={e => this.setState({ loginPassword: e.target.value })} />
            </Col>
          </FormGroup>
          <Row>
            <Col xs="12">
            </Col>
          </Row>
          <Button block color="primary" type="submit" onClick={this._onClick}> Log In </Button>
        </Form>
      </SimpleFormPageComponent>
    );
  }
}
