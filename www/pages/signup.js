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
import { login, withoutAuth } from "../services/authService";
import config from "../config.json";

class SignUp extends Component {
  static async getInitialProps({ req }) {
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
        if (response.data.payload.token !== undefined) {
          login(response.data.payload.token);
        } else {
          const errorMsg = config.error.unexpected;
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
        }
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
      <Page bg="auth" hasToken={this.props.hasToken}>
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
            <h2 className="tc c-white ts1 fw6">Create your account</h2>
          </Col>
        </Row>

        <div style={{ maxWidth: "750px", margin: "0 auto" }}>
          <Container>
            <Row className="py-3 mt-3" style={{ backgroundColor: "#fff" }}>
              <Col xs={{ size: 12 }} className="tc">
                <Link href="/login">
                  <a className="c-primary f5 fw6">Already have an account?</a>
                </Link>
              </Col>
            </Row>
            <Form className="f4">
              <Row
                className="py-3"
                style={{ height: "340px", backgroundColor: "#f6f6f6" }}
              >
                <Col xs={{ size: 12 }} md={{ size: 6, offset: 3 }}>
                  <FormGroup style={{ height: "85px" }}>
                    <Label for="email" className="f6 fw6">
                      Email
                    </Label>
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
                      <FormFeedback>Please provide a valid email!</FormFeedback>
                    ) : null}
                  </FormGroup>
                  <FormGroup style={{ height: "85px" }}>
                    <Label for="mainPassword" className="f6 fw6">
                      Password
                    </Label>
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
                        Please make your password at least 8 characters!
                      </FormFeedback>
                    ) : null}
                    {this.state.validate.password == "invalid" &&
                    this.state.focused !== "password" ? null : (
                      <span className="f6 fw2">
                        must contain at least 8 characters.
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup style={{ height: "80px" }}>
                    <Label for="confirmPassword" className="f6 fw6">
                      Confirm Password
                    </Label>
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
                      <FormFeedback>Passwords do not match!</FormFeedback>
                    ) : null}
                    {this.state.validate.confirmPassword == "invalid" &&
                    this.state.focused !== "confirmPassword" ? null : (
                      <span className="f6 fw2">
                        must match previous password.
                      </span>
                    )}
                  </FormGroup>
                </Col>
              </Row>

              <Row
                className="py-3 mb-4"
                style={{
                  backgroundColor: "#fff"
                }}
              >
                <Col xs={{ size: 12 }} className="tc c-crimson f5 fw2">
                  {!isValidated && !this.state.error ? (
                    "Provide missing details above to unlock"
                  ) : (
                    <span className="c-success">All set to go!</span>
                  )}
                  {this.state.error ? this.state.error : null}
                </Col>
                <Col xs={{ size: 12 }} className="tc mt-2">
                  <Button
                    className={btnSubmitClass}
                    disabled={!isValidated || this.state.isSubmitting}
                    style={{ minWidth: "130px" }}
                    onClick={() => this.handleSignUp()}
                    type="submit"
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
            </Form>
          </Container>
        </div>
      </Page>
    );
  }
}

export default withoutAuth(SignUp);
