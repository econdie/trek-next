import React, { Component } from "react";
import Link from "next/link";
import { Button, Container, Row, Col } from "reactstrap";
import { NextSeo } from "next-seo";
import Page from "../components/page";
import { withAuth } from "../services/authService";
import config from "../config.json";

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto"
};

const popScale = scaleLinear()
  .domain([0, 100000000, 1400000000])
  .range(["#CFD8DC", "#607D8B", "#37474F"]);

class Profile extends Component {
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
        <Row className="my-4">
          <Col xs={{ size: 12 }} className="f0 fw9">
            <div className="tc c-black">Progress (0 / 245)</div>
          </Col>
        </Row>

        <div style={wrapperStyles}>
          <ComposableMap
            projectionConfig={{
              scale: 205,
              rotation: [-11, 0, 0]
            }}
            width={980}
            height={551}
            style={{
              width: "100%",
              height: "auto"
            }}
          >
            <ZoomableGroup center={[0, 20]}>
              <Geographies
                geography={"/static/maps/world-50m-with-population.json"}
              >
                {(geographies, projection) =>
                  geographies.map((geography, i) => (
                    <Geography
                      key={i}
                      geography={geography}
                      projection={projection}
                      onClick={this.handleClick}
                      style={{
                        default: {
                          fill: popScale(geography.properties.pop_est),
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none"
                        },
                        hover: {
                          fill: "#263238",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none"
                        },
                        pressed: {
                          fill: "#263238",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none"
                        }
                      }}
                    />
                  ))
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </Page>
    );
  }
}

export default withAuth(Profile);
