import App, { Container } from "next/app";
import Router from "next/router";
import React from "react";
import NextSeo from "next-seo";
import NProgress from "nprogress";

// import default seo configuration
import SEO from "../next-seo.config";

let startTime = 0;
let endTime = 0;
//for page load indicator if data fetch requires time
Router.events.on("routeChangeStart", url => {
  console.log(`Loading: ${url}`);
  startTime = new Date();
  NProgress.start();
});
Router.events.on("routeChangeComplete", url => {
  NProgress.done();
  endTime = new Date();
  var timeDiff = endTime - startTime;
  var ms = Math.round(timeDiff);
  console.log("Transition in " + ms + "ms");
});
Router.events.on("routeChangeError", () => NProgress.done());

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <NextSeo config={SEO} />
        <Component {...pageProps} />
      </Container>
    );
  }
}
