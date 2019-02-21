import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';
import { HashLink as Link } from 'react-router-hash-link';
import { SimpleFormPageComponent } from '../Components/SimpleFormPageComponent/SimpleFormPageComponent';
import './login-view.css';

export default class LoginView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginEmail: 'admin@sfgov.org',
      loginPassword: 'password',
    }
  }

  login = (event) => {
    // turn off react default behavior
    event.preventDefault();
  }

  render() {
    return (
      <SimpleFormPageComponent pageTitle="Log In">
        <h2> Log In </h2>
        <Form onSubmit={this.login} className="login-form-container">
          <FormGroup row>
            <Col xs="12">
              <Input type="email" name="mail" placeholder="Email" value={this.state.loginEmail} onChange={e => this.setState({ loginEmail: e.target.value })} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs="12">
              <Input type="password" name="password" placeholder="Password" value={this.state.loginPassword} onChange={e => this.setState({ loginPassword: e.target.value })} />
            </Col>
          </FormGroup>
          <Row>
            <Col xs="12">
            </Col>
          </Row>
          <Button block color="primary" type="submit"> Log In </Button>

          <h6 className="login-button-divider"> or </h6>
          <Button color="success" block> Sign Up </Button>
        </Form>
      </SimpleFormPageComponent>
    );
  }
}
