import React, { Component } from "react";
import NextSeo from "next-seo";
import Page from "../components/page";
import config from "../config.json";

class Error extends Component {
  static getInitialProps(error) {
    const statusCode = error.res
      ? error.res.statusCode
      : error.err
      ? error.err.statusCode
      : null;
    return { statusCode };
  }

  renderError = () => {
    const { statusCode } = this.props;
    let h1 = "Unexpected Error";
    let h4 = "Oops! Something went wrong.";

    if (statusCode == "404") {
      h1 = "Not Found";
      h4 = "Oops! The content you're attempting to access could not be found.";
    }

    return (
      <div className="text-center py-5">
        <h1>{statusCode + " - " + h1}</h1>
        <br />
        <h4>{h4}</h4>
        <br />
        <p className="f4 fw6">
          For assistance please{" "}
          <a
            href="mailto:erikcondie@gmail.com"
            target="_blank"
            className="c-crimson"
          >
            contact me
          </a>
        </p>
        <br />
      </div>
    );
  };

  render() {
    return (
      <Page bg="auth">
        <NextSeo
          config={{
            title: "Error",
            description: "TrekNext error occurred",
            noindex: true,
            openGraph: {
              url: this.props.absoluteURL,
              title: "Error",
              description: "TrekNext error occurred"
            }
          }}
        />
        {this.renderError()}
      </Page>
    );
  }
}

export default Error;
