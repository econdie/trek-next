import App from "next/app";
import { Router } from "next/router";
import React from "react";
import { DefaultSeo } from "next-seo";
import NProgress from "nprogress";
import nextCookie from "next-cookies";
import config from "../config.json";

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

    //inject hasToken to every page to know if user is considered logged in
    const { token } = nextCookie(ctx);
    pageProps.hasToken = !!token;
    //inject absoluteURL property to every page so we can use in open graph
    pageProps.absoluteURL = config.baseUrl + ctx.asPath;
    //inject api to pages so we know what endpoint to use
    // pageProps.api =
    //   process.env.NODE_ENV === "production" ? config.API_PROD : config.API_DEV;
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <DefaultSeo config={SEO} />
        <Component {...pageProps} />
      </React.Fragment>
    );
  }
}
