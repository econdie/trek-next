import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { FaGrav } from "react-icons/fa";

class Footer extends Component {
  getYear = () => {
    return new Date().getFullYear();
  };

  render() {
    return (
      <footer className="py-4">
        <Container>
          <Row>
            <Col className="tc tl">
              Built by{" "}
              <a
                href="https://www.erikcondie.com"
                alt="Erik Condie's website"
                target="_blank"
              >
                Erik Condie
              </a>{" "}
              &copy; {this.getYear()} <FaGrav size={32} className="mx-2" />
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;
