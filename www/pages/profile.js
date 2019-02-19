import React, { Component } from "react";
import Link from "next/link";
import { Button, Container, Row, Col } from "reactstrap";
import NextSeo from "next-seo";
import Page from "../components/page";
import MottoAnimation from "../components/animations/motto";
import KeywordsAnimation from "../components/animations/keywords";
import { withAuth } from "../services/authService";
import config from "../config.json";

class Profile extends Component {
  // TODO use trail to animate brand text https://codesandbox.io/embed/zn2q57vn13
  render() {
    console.log(this.props);
    return (
      <Page bg="home">
        <NextSeo
          config={{
            title: config.motto,
            description: config.tagline,
            noindex: false,
            openGraph: {
              url: this.props.absoluteURL,
              title: config.motto,
              description: config.tagline
            }
          }}
        />
        <Row className="my-4 pb-4">
          <Col xs={{ size: 12 }} className="f0 fw9">
            <div className="tc c-black">Profile</div>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default withAuth(Profile);
