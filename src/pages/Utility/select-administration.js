import React from "react"
import MetaTags from 'react-meta-tags';
import { Link } from "react-router-dom"
import { Card, CardBody, Row, Col } from "reactstrap"

//Import Images
import logoDark from "../../assets/images/logo-dark.png";
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import {
  selectAdministration
} from "../../store/actions"

const SelectAdmin = props => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>Choose Administration | IPR</title>
      </MetaTags>
    

      <section className="my-5">
        <div className="container-alt container">
          <Row className="justify-content-center">
            <div className="col-10 text-center">
              <div className="home-wrapper mt-5">
                <div className="mb-4">
                  <img src={logoDark} alt="logo" height="60" />
                </div>


                <h3 className="mt-4">Choose your Administration</h3>

                <Row>
                  <Col md="4" className="text-center">
                    <Card className="mt-4 maintenance-box">
                      <CardBody>
                        <i className="mdi mdi-desktop-mac h2"></i>
                        <h6 className="text-uppercase mt-3">
                          SOFTWARE & DEVICE <br />SETUP
                        </h6>
                        <Link
                          className="btn btn-primary waves-effect waves-light"
                          to="dashboard"
                          role="button"
                          onClick={(e) => props.selectAdministration("software")}
                        >
                          Select
                        </Link>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="4" className="text-center">
                    <Card className="mt-4 maintenance-box">
                      <CardBody>
                        <i className="mdi mdi-hospital-box h2"></i>
                        <h6 className="text-uppercase mt-3">
                          HOSPITAL & USER <br />MANAGEMENT
                        </h6>
                        <Link
                          className="btn btn-success waves-effect waves-light"
                          to="dashboard"
                          role="button"
                          onClick={(e) => props.selectAdministration("hospital")}
                        >
                          Select
                        </Link>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="4" className="text-center">
                    <Card className="mt-4 maintenance-box">
                      <CardBody>
                        <i className="mdi mdi-human-queue h2"></i>
                        <h6 className="text-uppercase mt-3">
                          PATIENT RECORDS & <br /> LOCATIONS
                        </h6>
                        <Link
                          className="btn btn-info waves-effect waves-light"
                          to="dashboard"
                          role="button"
                          onClick={(e) => props.selectAdministration("patient")}
                        >
                          Select
                        </Link>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          </Row>
        </div>
      </section>

    </React.Fragment>
  )
}

SelectAdmin.propTypes = {
  selectAdministration: PropTypes.func,
}

const mapStateToProps = state => {
  return { ...state.Layout }
}

export default connect(mapStateToProps, {
  selectAdministration,
})(SelectAdmin)
