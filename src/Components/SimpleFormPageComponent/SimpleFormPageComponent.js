import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';
import './simple-form-page-component.css';


export const SimpleFormPageComponent = (props) => {
  return (
    <Container fluid className="simple-form-page-grid flex-col">
      <Row className="justify-content-center">
        <Col sm="11" md="7" lg="6" className="simple-form-page-info-col">
          <div className="simple-form-page-container">
            <div className={props.loadingCondition ? 'simple-form-page-hidden' : ''}> {props.children} </div>
            {props.loadingCondition &&
              <div className="simple-form-page-loader">
                <ClipLoader size={60} color="#3ca2e0" />
              </div>
            }
          </div>
        </Col>
      </Row>
    </Container>
  );
}

SimpleFormPageComponent.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  loadingCondition: PropTypes.bool,
}

SimpleFormPageComponent.defaultProps = {
  loadingCondition: false,
}
