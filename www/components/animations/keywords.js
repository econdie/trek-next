import React, { useState, useEffect } from "react";
import { useTransition, animated, config } from "react-spring";
import {
  FaPeopleCarry,
  FaHiking,
  FaPlaneDeparture,
  FaMountain,
  FaGlobeAmericas,
  FaLuggageCart
} from "react-icons/fa";

function KeywordsAnimation() {
  const keywords = [
    {
      id: 0,
      text: "Explorers",
      fa: <FaMountain size={24} className="c-white mr-1 mb-1" />
    },
    {
      id: 1,
      text: "Wanderers",
      fa: <FaHiking size={24} className="c-white mr-1 mb-1" />
    },
    {
      id: 2,
      text: "Travellers",
      fa: <FaPlaneDeparture size={24} className="c-white mr-1 mb-1" />
    },
    {
      id: 3,
      text: "Nomads",
      fa: <FaLuggageCart size={24} className="c-white mr-1 mb-1" />
    },
    {
      id: 4,
      text: "Humans",
      fa: <FaPeopleCarry size={24} className="c-white mr-1 mb-1" />
    }
  ];
  const [index, set] = useState(0);
  const transitions = useTransition(keywords[index], keyword => keyword.id, {
    from: { opacity: 0, transform: "translate3d(50%,-20px,0)" },
    enter: { opacity: 1, transform: "translate3d(50%, 0px,0)" },
    leave: { opacity: 0, transform: "translate3d(50%, 20px,0)" },
    config: config.molasses,
    unique: true,
    initial: null
  });

  useEffect(() => {
    let wordInterval = setInterval(() => set(state => (state + 1) % 5), 3000);
    return () => {
      clearInterval(wordInterval);
    };
  }, []);

  return transitions.map(({ item, props, key }) => (
    <animated.div
      key={key}
      className="tc"
      style={{ ...props, position: "absolute", right: "50%" }}
    >
      {item.fa} {item.text}
    </animated.div>
  ));
}

export default KeywordsAnimation;
