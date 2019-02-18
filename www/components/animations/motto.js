import React, { useState, useEffect } from "react";
import { useTrail, animated, config } from "react-spring";
import tnConfig from "../../config.json";

function MottoAnimation() {
  // const letters = ['T', 'r', 'e', 'k', 'N', 'e', 'x', 't'];
  const letters = tnConfig.motto.split("");
  const [index, set] = useState(true);
  const trail = useTrail(letters.length, {
    config: config.gentle,
    opacity: 1,
    color: "black",
    from: { opacity: 0.8, color: "#fff" }
  });

  return trail.map(({ ...rest }, index) => (
    <animated.span key={"brandLetter" + index} style={{ ...rest }}>
      {letters[index]}
    </animated.span>
  ));
}

export default MottoAnimation;
