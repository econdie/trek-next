import React, { Component } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import NextSeo from "next-seo";
import Page from "../components/page";
import KeywordsAnimation from "../components/animations/keywords";
import config from "../config.json";

class Index extends Component {
  render() {
    return (
      <Page bg="home">
        <NextSeo
          config={{
            title: config.brand,
            description: config.motto,
            noindex: false
          }}
        />
        <Row>
          <Col xs={{ size: 12 }}>
            <h2 className="tc">{config.motto}</h2>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={{ size: 12 }}>
            <h1 className="tc">
              <strong>{config.brand}</strong>
            </h1>
          </Col>
        </Row>
        <Row className="my-4 pb-4">
          <Col xs={{ size: 12 }} className="f0 fw9">
            <div className="tc c-black">
              <small>Built for... </small>
              <KeywordsAnimation />{" "}
            </div>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <Row className="my-4 pt-4">
          <Col xs={{ size: 12 }} className="tc">
            <Button className="btn-black btn-pulse">Get Started</Button>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default Index;
