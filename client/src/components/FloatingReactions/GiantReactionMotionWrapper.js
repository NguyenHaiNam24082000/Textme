import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const BigFloatingReactionItemContainer = styled(motion.div)`
  position: absolute;
  pointer-events: none;
  bottom: 50%;
  transform: translate(0,50%) !important;
  right: 250px;
`;

export default function GiantReactionMotionWrapper({ motionKey, children }) {
  return (
    <BigFloatingReactionItemContainer
      initial={initialAnimationObj}
      animate={enterAnimationObj}
      exit={exitAnimationObj}
      key={motionKey}
      role="img"
    >
      {children}
    </BigFloatingReactionItemContainer>
  );
}

const initialAnimationObj = { opacity: 0, y: 0, scale: 0.3 };
const enterAnimationObj = {
  opacity: [0, 0, 1, 1],
  y: ["0vh", "-35vh", "-40vh", "-55vh"],
  scale: [0.3, 0.3, 1, 1],
  transition: {
    type: "spring",
    duration: 1.5,
    ease: [0.5, 0.5, 0.4, 0.5],
    delay: 1,
    times: [0, 0.1, 0.3, 0.8],
  },
};
const exitAnimationObj = {
  opacity: 0,
  y: 0,
  scale: 0.6,
  transition: {
    duration: 0.25,
  },
};
