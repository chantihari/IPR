import React from "react"
import PropTypes from 'prop-types'
import MetaTags from 'react-meta-tags';
import { Col, Container, Row, Card } from "reactstrap"
// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"
// actions
import { loginUser, apiError } from "../../store/actions"
// import images
import bg from "../../assets/images/bg.jpg";
import logoDark from "../../assets/images/logo-dark.png";

const Login = props => {
  const handleValidSubmit = (event, values) => {
    props.loginUser(values, props.history)
  }

  return (
    <React.Fragment>
      <div className="account-pages">
        <MetaTags>
          <title>Login</title>
        </MetaTags>

        <div
          className="accountbg"
          style={{
            background: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>

        <div className="wrapper-page account-page-full">
          <Card className="shadow-none">
            <div className="card-block">
              <div className="account-box">
                <div className="card-box shadow-none p-4">
                  <div className="p-2">
                    <div className="text-center mt-4">
                      <Link to="/">
                        <img src={logoDark} height="60" alt="logo" />
                      </Link>
                    </div>

                    <h4 className="font-size-18 mt-5 text-center">
                      Welcome Back !
                    </h4>
                    <p className="text-muted text-center">
                      Sign in to continue to IPR.
                    </p>

                    <AvForm
                      className="form-horizontal mt-4"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v)
                      }}
                    >
                      {props.error && typeof props.error === "string" ? (
                        <Alert color="danger">{props.error}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <AvField
                          name="email"
                          label="Email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="Password"
                          type="password"
                          required
                          placeholder="Enter Password"
                        />
                      </div>

                      <Row className="mb-3">
                        <Col sm={6}>
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="customControlInline" />
                            <label className="form-check-label" htmlFor="customControlInline">Remember me</label>
                          </div>
                        </Col>
                        <Col sm={6} className="text-end">
                          <button
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit"
                          >
                            Log In
                          </button>
                        </Col>
                      </Row>
                      <Row className="mt-2 mb-0 row">
                        <div className="col-12 mt-4">
                          <Link to="/forgot-password">
                            <i className="mdi mdi-lock"></i> Forgot your
                            password?
                          </Link>
                        </div>
                      </Row>

                    </AvForm>

                    <div className="mt-5 pt-4 text-center">
                      <p>
                        © {new Date().getFullYear()} IPR. All rights reserved
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>


      </div>
    </React.Fragment>
  )
}



const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError })(Login)
)

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
}
