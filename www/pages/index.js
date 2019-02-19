import React, { Component } from "react";
import Link from "next/link";
import { Button, Container, Row, Col } from "reactstrap";
import NextSeo from "next-seo";
import Page from "../components/page";
import MottoAnimation from "../components/animations/motto";
import KeywordsAnimation from "../components/animations/keywords";
import { withoutAuth } from "../services/authService";
import config from "../config.json";

class Index extends Component {
  render() {
    return (
      <Page bg="home" hasToken={this.props.hasToken}>
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
            <div className="tc c-black">
              <MottoAnimation />
            </div>
          </Col>
        </Row>
        <Row className="my-4">
          <Col xs={{ size: 12 }}>
            <h1 className="tc ts1">
              <strong>{config.brand}</strong>
            </h1>
          </Col>
        </Row>
        <Row className="my-4">
          <Col xs={{ size: 12 }} className="f0 fw9">
            <div className="tc c-black">
              <small>Built for... </small>
              <KeywordsAnimation />
            </div>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <Row className="my-4">
          <Col xs={{ size: 12 }} className="tc">
            <Link href="/signup">
              <a>
                <Button className="btn-black btn-pulse">Get Started</Button>
              </a>
            </Link>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default withoutAuth(Index);
