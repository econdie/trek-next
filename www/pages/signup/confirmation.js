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
import NextSeo from "next-seo";
import Page from "../../components/page";
import http from "../../services/httpService";
import config from "../../config.json";

class SignUpConfirmation extends Component {
  static async getInitialProps({ req, query }) {
    return { code: query.code };
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Page bg="auth" hasToken={this.props.hasToken}>
        <NextSeo
          config={{
            title: "Email Confirmation",
            description: "Confirm TrekNext email",
            noindex: true,
            canonical: "https://www.treknext.com/signup",
            openGraph: {
              url: "https://www.treknext.com/signup",
              title: "Email Confirmation",
              description: "Confirm TrekNext email"
            }
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
              <Col xs={{ size: 12 }} className="tc c-success f5 fw6">
                Thanks for confirming your email, you can now close this page.
              </Col>
            </Row>
          </Container>
        </div>
      </Page>
    );
  }
}

export default SignUpConfirmation;
