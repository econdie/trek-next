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
import Link from "next/link";
import { NextSeo } from "next-seo";
import Page from "../../components/page";
import http from "../../services/httpService";
import config from "../../config.json";
import { api } from "../../services/apiService";

class SignUpConfirmation extends Component {
  static async getInitialProps({ req, query }) {
    const endpoint = "/signup/confirmation";
    let success = false;
    let msg = "";

    try {
      const response = await http.post(`${api}${endpoint}`, {
        code: query.code
      });

      success = response.status == 200;
      msg = response.data.message
        ? response.data.message
        : "Thanks for confirming your email, you can now close this page.";
    } catch (error) {
      msg =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : config.error.unexpected;
    }

    return { success, msg };
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Page bg="auth" hasToken={this.props.hasToken}>
        <NextSeo
          title={"Email Confirmation"}
          description={"Confirm TrekNext email"}
          noindex={true}
          canonical={"https://www.treknext.com/signup"}
          openGraph={{
            url: "https://www.treknext.com/signup",
            title: "Email Confirmation",
            description: "Confirm TrekNext email"
          }}
        />
        <Row className="mb-3">
          <Col xs={{ size: 12 }}>
            <h2 className="tc c-white ts1 fw6">Confirm your email</h2>
          </Col>
        </Row>

        <div style={{ maxWidth: "750px", margin: "0 auto" }}>
          <Container>
            <Row className="py-3 mt-3" style={{ backgroundColor: "#fff" }}>
              {this.props.success ? (
                <Col xs={{ size: 12 }} className="tc c-success f5 fw6">
                  {this.props.msg}
                </Col>
              ) : (
                <Col xs={{ size: 12 }} className="tc c-crimson f5 fw6">
                  {this.props.msg}
                </Col>
              )}
            </Row>
          </Container>
        </div>
      </Page>
    );
  }
}

export default SignUpConfirmation;
