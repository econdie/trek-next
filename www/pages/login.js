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

class Login extends Component {
  static getInitialProps({ req }) {
    return {};
  }

  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: "",
        password: ""
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
    this.setState({ validate, data });
  };

  focusInput = input => {
    this.setState({ focused: input });
  };

  handleLogin = () => {
    const { email, password } = this.state.data;
    const endpoint = "/login";
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
          data: { email: "", password: "" },
          validate: {
            password: false,
            email: false
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
      validate.email == "valid" &&
      validate.password == "valid";
    let btnSubmitClass = "btn-crimson";
    btnSubmitClass +=
      isValidated && !this.state.isSubmitting ? " btn-pulse-crimson" : "";
    return (
      <Page bg="auth">
        <NextSeo
          config={{
            title: "Login",
            description: "Login to TrekNext",
            noindex: true,
            openGraph: {
              url: this.props.absoluteURL,
              title: "Login",
              description: "Login to TrekNext"
            }
          }}
        />
        <Row>
          <Col xs={{ size: 12 }}>
            <h2 className="tc c-white ts1">
              <strong>Login to your account</strong>
            </h2>
          </Col>
        </Row>
        <div style={{ maxWidth: "750px", margin: "0 auto" }}>
          <Container>
            <Row className="py-3 mt-3" style={{ backgroundColor: "#fff" }}>
              <Col xs={{ size: 12 }} className="tc">
                <Link href="/signup">
                  <a className="c-crimson c-black-hover f4 fw6">
                    Don't have an account?
                  </a>
                </Link>
              </Col>
            </Row>

            <Row
              className="py-3"
              style={{ height: "250px", backgroundColor: "#f6f6f6" }}
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
                          Your password will be at least 8 characters!
                        </strong>
                      </FormFeedback>
                    ) : null}
                  </FormGroup>
                </Form>
              </Col>
            </Row>

            <Row
              className="pt-3"
              style={{
                height: "100px",
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
                  onClick={() => this.handleLogin()}
                >
                  {this.state.isSubmitting ? "Thinking..." : "Login"}
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

export default Login;
