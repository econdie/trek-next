import React, { Component } from "react";
import Router from "next/router";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback,
  Spinner
} from "reactstrap";
import { FaLock } from "react-icons/fa";
import Link from "next/link";
import NextSeo from "next-seo";
import Page from "../components/page";
import http from "../services/httpService";
import config from "../config.json";

class SignUp extends Component {
  static getInitialProps({ req }) {
    return {};
  }

  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: "",
        password: "",
        confirmPassword: ""
      },
      validate: {},
      focused: "",
      isSubmitting: false,
      error: null
    };
  }

  validateEmail = e => {
    const { validate, data } = this.state;
    if (e.target.value.length === 0) {
      validate.email = false;
    } else {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      validate.email = regex.test(e.target.value) ? "valid" : "invalid";
    }

    data.email = e.target.value;
    this.setState({ validate, data });
  };

  validatePassword = e => {
    const { validate, data } = this.state;
    if (e.target.value.length === 0) {
      validate.password = false;
    } else {
      validate.password = e.target.value.length >= 8 ? "valid" : "invalid";
    }
    data.password = e.target.value;
    if (data.confirmPassword && data.confirmPassword.length > 0) {
      validate.confirmPassword =
        data.password === data.confirmPassword ? "valid" : "invalid";
    }

    this.setState({ validate, data });
  };

  validateConfirmPassword = e => {
    const { validate, data } = this.state;
    if (e.target.value.length === 0) {
      validate.confirmPassword = false;
    } else {
      validate.confirmPassword =
        data.password && e.target.value === data.password ? "valid" : "invalid";
    }
    data.confirmPassword = e.target.value;
    this.setState({ validate, data });
  };

  focusInput = input => {
    this.setState({ focused: input });
  };

  resetForm = () => {
    this.setState({
      isSubmitting: false,
      data: { email: "", password: "", confirmPassword: "" },
      validate: { password: false, confirmPassword: false, email: false }
    });
  };

  handleSignUp = () => {
    const { email, password } = this.state.data;
    const endpoint = "/signup";
    this.setState({ isSubmitting: true, error: null });
    http
      .post(`${this.props.api}${endpoint}`, {
        email: email,
        password: password
      })
      .then(response => {
        Router.push("/");
      })
      .catch(error => {
        const errorMsg =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : config.error.unexpected;

        this.setState({
          isSubmitting: false,
          data: { email, password: "", confirmPassword: "" },
          validate: {
            password: false,
            confirmPassword: false,
            email: "invalid"
          },
          error: errorMsg
        });
        this.focusInput("email");
      });
  };

  render() {
    const { validate } = this.state;
    const isValidated =
      validate.email &&
      validate.password &&
      validate.confirmPassword &&
      validate.email == "valid" &&
      validate.password == "valid" &&
      validate.confirmPassword == "valid";
    let btnSubmitClass = "btn-crimson";
    btnSubmitClass +=
      isValidated && !this.state.isSubmitting ? " btn-pulse-crimson" : "";
    return (
      <Page bg="auth">
        <NextSeo
          config={{
            title: "Sign Up",
            description: "Create your free TrekNext account",
            noindex: true,
            openGraph: {
              url: this.props.absoluteURL,
              title: "Sign Up",
              description: "Create your free TrekNext account"
            }
          }}
        />
        <Row>
          <Col xs={{ size: 12 }}>
            <h2 className="tc c-white ts1">
              <strong>Create your account</strong>
            </h2>
          </Col>
        </Row>

        <div style={{ maxWidth: "750px", margin: "0 auto" }}>
          <Container>
            <Row className="py-3 mt-3" style={{ backgroundColor: "#fff" }}>
              <Col xs={{ size: 12 }} className="tc">
                <Link href="/login">
                  <a className="c-crimson c-black-hover f4 fw6">
                    Already have an account?
                  </a>
                </Link>
              </Col>
            </Row>

            <Row
              className="py-3"
              style={{ height: "350px", backgroundColor: "#f6f6f6" }}
            >
              <Col xs={{ size: 12 }} md={{ size: 6, offset: 3 }}>
                <Form className="f4">
                  <FormGroup style={{ height: "90px" }}>
                    <Label for="email">Email</Label>
                    <Input
                      valid={
                        this.state.validate.email &&
                        this.state.validate.email === "valid"
                      }
                      invalid={
                        this.state.validate.email &&
                        this.state.validate.email === "invalid"
                      }
                      value={this.state.data.email}
                      type="email"
                      name="email"
                      id="email"
                      autoComplete={0}
                      placeholder=""
                      onChange={this.validateEmail}
                      onFocus={() => this.focusInput("email")}
                      onBlur={() => this.setState({ focused: "" })}
                    />
                    {this.state.focused !== "email" ? (
                      <FormFeedback>
                        <strong>Please provide a valid email!</strong>
                      </FormFeedback>
                    ) : null}
                  </FormGroup>
                  <FormGroup style={{ height: "100px" }}>
                    <Label for="mainPassword">Password</Label>
                    <Input
                      valid={
                        this.state.validate.password &&
                        this.state.validate.password === "valid"
                      }
                      invalid={
                        this.state.validate.password &&
                        this.state.validate.password === "invalid"
                      }
                      value={this.state.data.password}
                      type="password"
                      name="mainPassword"
                      id="mainPassword"
                      placeholder=""
                      onChange={this.validatePassword}
                      onFocus={() => this.focusInput("password")}
                      onBlur={() => this.setState({ focused: "" })}
                    />
                    {this.state.focused !== "password" ? (
                      <FormFeedback>
                        <strong>
                          Please make your password at least 8 characters!
                        </strong>
                      </FormFeedback>
                    ) : null}
                    {this.state.validate.password == "invalid" &&
                    this.state.focused !== "password" ? null : (
                      <small>must contain at least 8 characters.</small>
                    )}
                  </FormGroup>
                  <FormGroup style={{ height: "100px" }}>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input
                      valid={
                        this.state.validate.confirmPassword &&
                        this.state.validate.confirmPassword === "valid"
                      }
                      invalid={
                        this.state.validate.confirmPassword &&
                        this.state.validate.confirmPassword === "invalid"
                      }
                      value={this.state.data.confirmPassword}
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder=""
                      onChange={this.validateConfirmPassword}
                      onFocus={() => this.focusInput("confirmPassword")}
                      onBlur={() => this.setState({ focused: "" })}
                    />
                    {this.state.focused !== "confirmPassword" ? (
                      <FormFeedback>
                        <strong>Passwords do not match!</strong>
                      </FormFeedback>
                    ) : null}
                    {this.state.validate.confirmPassword == "invalid" &&
                    this.state.focused !== "confirmPassword" ? null : (
                      <small>must match previous password.</small>
                    )}
                  </FormGroup>
                </Form>
              </Col>
            </Row>

            <Row
              className="pt-3"
              style={{
                height: "100px",
                marginBottom: "40px",
                backgroundColor: "#fff"
              }}
            >
              <Col
                xs={{ size: 12 }}
                className="tc c-crimson f4 fw2 mb-1"
                style={{ height: "30px" }}
              >
                {!isValidated && !this.state.error
                  ? "Provide missing details above to unlock"
                  : null}
                {this.state.error ? this.state.error : null}
              </Col>
              <Col xs={{ size: 12 }} className="tc" style={{ height: "70px" }}>
                <Button
                  className={btnSubmitClass}
                  disabled={!isValidated || this.state.isSubmitting}
                  style={{ minWidth: "130px" }}
                  onClick={() => this.handleSignUp()}
                >
                  {this.state.isSubmitting ? "Thinking..." : "Submit"}
                  {!isValidated && !this.state.isSubmitting ? (
                    <FaLock size={16} className="ml-1 mb-1" />
                  ) : null}
                  {this.state.isSubmitting ? (
                    <Spinner
                      color="light"
                      size="sm"
                      className="ml-1"
                      style={{ marginBottom: "1px" }}
                    />
                  ) : null}
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </Page>
    );
  }
}

export default SignUp;
