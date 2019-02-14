import React, { useState, useEffect } from "react";
import { useTransition, animated, config } from "react-spring";

function KeywordsAnimation() {
  const keywords = [
    { id: 0, text: "Explorers" },
    { id: 1, text: "Wanderers" },
    { id: 2, text: "Travellers" }
  ];
  const [index, set] = useState(0);
  const transitions = useTransition(keywords[index], keyword => keyword.id, {
    from: { opacity: 0, transform: "translate3d(0,-20px,0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0px,0)" },
    leave: { opacity: 0, transform: "translate3d(0, 20px,0)" },
    config: config.molasses,
    unique: true,
    initial: null
  });

  useEffect(() => {
    let wordInterval = setInterval(() => set(state => (state + 1) % 3), 3000);
    return () => {
      clearInterval(wordInterval);
    };
  }, []);

  return transitions.map(({ item, props, key }) => (
    <animated.div key={key} style={{ ...props, position: "absolute" }}>
      {item.text}
    </animated.div>
  ));
}

export default KeywordsAnimation;
