import React, { Component } from "react";
import Navigation from "./page/navbar";
import Footer from "./page/footer";

class Page extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="footerless">
          <Navigation />
          <div className="container content-container">
            {this.props.children}
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Page;
