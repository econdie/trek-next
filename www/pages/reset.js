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
import { withoutAuth } from "../services/authService";
import config from "../config.json";
import { api } from "../services/apiService";

class Reset extends Component {
  static async getInitialProps(ctx) {
    return {};
  }

  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: ""
      },
      validate: {},
      focused: "",
      isSubmitting: false,
      isSubmitted: false,
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

  handleReset = () => {
    const { email } = this.state.data;
    const endpoint = "/reset";
    this.setState({ isSubmitting: true, error: null });
    http
      .post(`${api}${endpoint}`, {
        email: email
      })
      .then(response => {
        this.setState({
          isSubmitting: false,
          isSubmitted: true,
          validate: {
            email: false
          },
          error: null
        });
      })
      .catch(error => {
        const errorMsg =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : config.error.unexpected;

        this.setState({
          isSubmitting: false,
          validate: {
            email: false
          },
          error: errorMsg
        });
        this.focusInput("email");
      });
  };

  focusInput = input => {
    this.setState({ focused: input });
  };

  render() {
    const { validate, isSubmitted } = this.state;
    const isValidated = validate.email && validate.email == "valid";
    let btnSubmitClass = "btn-crimson";
    btnSubmitClass +=
      isValidated && !this.state.isSubmitting ? " btn-pulse-crimson" : "";
    return (
      <Page bg="auth" hasToken={this.props.hasToken}>
        <NextSeo
          config={{
            title: "Reset",
            description: "Reset TrekNext password",
            noindex: true,
            openGraph: {
              url: this.props.absoluteURL,
              title: "Reset",
              description: "Reset TrekNext password"
            }
          }}
        />
        <Row>
          <Col xs={{ size: 12 }}>
            <h2 className="tc c-white ts1 fw6">Reset your password</h2>
          </Col>
        </Row>
        <div style={{ maxWidth: "750px", margin: "0 auto" }}>
          {isSubmitted ? (
            <Container>
              <Row className="py-3 mt-3" style={{ backgroundColor: "#fff" }}>
                <Col xs={{ size: 12 }} className="tc c-success f5 fw6">
                  Further instructions will be sent to {this.state.data.email}.
                </Col>
              </Row>
            </Container>
          ) : (
            <Container>
              <Row className="py-3 mt-3" style={{ backgroundColor: "#fff" }}>
                <Col xs={{ size: 12 }} className="tc">
                  <Link href="/signup">
                    <a className="c-primary f5 fw6">Don't have an account?</a>
                  </Link>
                </Col>
              </Row>
              <Form className="f4">
                <Row className="py-3" style={{ backgroundColor: "#f6f6f6" }}>
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
                        <FormFeedback>
                          Please provide a valid email!
                        </FormFeedback>
                      ) : null}
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
                    {!isValidated && !this.state.error
                      ? "Provide email to unlock"
                      : null}
                    {this.state.error ? this.state.error : null}
                  </Col>
                  <Col xs={{ size: 12 }} className="tc mt-2">
                    <Button
                      className={btnSubmitClass}
                      disabled={!isValidated || this.state.isSubmitting}
                      style={{ minWidth: "130px" }}
                      onClick={() => this.handleReset()}
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
          )}
        </div>
      </Page>
    );
  }
}

export default withoutAuth(Reset);
