import React, { Component } from "react";
import Link from "next/link";
import { Button, Container, Row, Col } from "reactstrap";
import { NextSeo } from "next-seo";
import Page from "../components/page";
import { withAuth } from "../services/authService";
import config from "../config.json";

class Settings extends Component {
  render() {
    return (
      <Page bg="home" hasToken={this.props.hasToken}>
        <NextSeo
          title={config.motto}
          description={config.tagline}
          noindex={false}
          openGraph={{
            url: this.props.absoluteURL,
            title: config.motto,
            description: config.tagline
          }}
        />
        <Row className="my-4 pb-4">
          <Col xs={{ size: 12 }} className="f0 fw9">
            <div className="tc c-black">
              Settings... yeah there is nothing here yet!
            </div>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default withAuth(Settings);
