import React, { Component } from "react";

class Splash extends Component {
  render() {
    return (
      <div className="splash">
        <div className="container tc fw7 f1">{this.props.text}</div>
      </div>
    );
  }
}

export default Splash;
