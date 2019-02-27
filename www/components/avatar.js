import React, { Component } from "react";

class Avatar extends Component {
  render() {
    return (
      <div
        className={"avatar-" + this.props.size}
        style={{
          backgroundImage: `url(https://storage.googleapis.com/trek-next.appspot.com/public/avatar-default-sm.png)`
        }}
      />
    );
  }
}

export default Avatar;
