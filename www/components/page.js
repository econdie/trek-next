import React, { Component } from "react";
import Navigation from "./page/navbar";
import Footer from "./page/footer";

class Page extends Component {
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <div className="container main-container mt-2 mb-5">
          {this.props.children}
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Page;
