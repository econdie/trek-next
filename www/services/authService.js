import { Component } from "react";
import Router from "next/router";
import cookie from "js-cookie";
import nextCookie from "next-cookies";

//store JWT in cookie that expires in 7 days
export const login = async token => {
  cookie.set("token", token, { expires: 7 });
  Router.push("/profile");
};

//remove JWT from cookies
export const logout = () => {
  cookie.remove("token");
  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now());
  Router.push("/login");
};

//wraps a child component to check for existance of JWT and injects token for usage
export const withAuth = WrappedComponent =>
  class extends Component {
    static async getInitialProps(ctx) {
      const token = auth(ctx);

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, token };
    }

    constructor(props) {
      super(props);
    }

    componentDidMount() {
      window.addEventListener("storage", this.syncLogout);
    }

    componentWillUnmount() {
      window.removeEventListener("storage", this.syncLogout);
      window.localStorage.removeItem("logout");
    }

    syncLogout = event => {
      if (event.key === "logout") {
        console.log("logged out from storage!");
        Router.push("/login");
      }
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

const auth = ctx => {
  const { token } = nextCookie(ctx);

  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
    return;
  }

  if (!token) {
    Router.push("/login");
  }

  return token;
};
