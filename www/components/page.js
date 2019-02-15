import React, { Component } from "react";
import Navigation from "./page/navbar";
import Footer from "./page/footer";
import Splash from "./page/splash";

class Page extends Component {
  getSplash = () => {
    if (!this.props.splash) {
      return null;
    } else {
      return <Splash text={this.props.splash} />;
    }
  };

  render() {
    let pageClasses = "footerless";
    pageClasses = this.props.bg
      ? pageClasses + " bg-" + this.props.bg
      : pageClasses;
    return (
      <React.Fragment>
        <div className={pageClasses}>
          <Navigation />
          {this.getSplash()}
          <div className="container content-container">
            {this.props.children}
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

Page.defaultProps = {
  bg: null
};

export default Page;
