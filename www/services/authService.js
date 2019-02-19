import Router from "next/router";
import cookie from "js-cookie";

//store JWT in cookie that expires in 7 days
export const login = async token => {
  cookie.set("token", token, { expires: 7 });
  Router.push("/");
};

//remove JWT from cookies
export const logout = () => {
  cookie.remove("token");
  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now());
  Router.push("/login");
};
