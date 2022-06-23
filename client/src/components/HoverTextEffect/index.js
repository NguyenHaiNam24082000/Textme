import { Space, Text } from "@mantine/core";
import React from "react";
import styled from "styled-components";
import useSound from "use-sound";

import popsSfx from "../../assets/sounds/rising-pops.mp3";

// import UnstyledButton from '../helpers/UnstyledButton';
// import Spacer from '../helpers/Spacer';
// import { PRIMARY } from "../helpers/constants";
const PRIMARY = "hsl(240deg, 85%, 55%)";
const ARROW_DELAY = 125;

function Hover({ onClick, children }) {
  const [play, { stop }] = useSound(popsSfx, { volume: 0.5 });

  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <Text
      variant="link"
      size="xs"
      className="cursor-pointer flex items-center"
      weight={500}
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovering(true);
        play();
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        stop();
      }}
    >
      <ButtonContents isHovering={isHovering}>
        <span>{children}</span>
      </ButtonContents>
    </Text>
  );
}

const ButtonContents = ({ isHovering, children }) => {
  return (
    <>
      {children}
      {/* <Space w="xs" /> */}
      <div className="flex items-center h-full">
        <ArrowSvg width="36" height="8" viewBox="0 0 36 12" fill="none">
          <path
            d="M0.75 6H11.25 M6 0.75L11.25 6L6 11.25"
            stroke={PRIMARY}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: true ? 1 : 0,
              transition: `opacity ${isHovering ? 0 : ARROW_DELAY}ms`,
            }}
          />

          <path
            d="M15 10L19.5 5.5L15 1"
            stroke={PRIMARY}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: isHovering ? 1 : 0,
              transition: `opacity ${isHovering ? 0 : ARROW_DELAY}ms`,
            }}
          />
          <path
            d="M23 10L27.5 5.5L23 1"
            stroke={PRIMARY}
            strokeOpacity="0.66"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: isHovering ? 1 : 0,
              transition: `opacity ${
                isHovering ? 0 : ARROW_DELAY
              }ms ${ARROW_DELAY}ms`,
            }}
          />
          <path
            d="M31 10L35.5 5.5L31 1"
            stroke={PRIMARY}
            strokeOpacity="0.35"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: isHovering ? 1 : 0,
              transition: `opacity ${isHovering ? 0 : ARROW_DELAY}ms ${
                ARROW_DELAY * 2
              }ms`,
            }}
          />
        </ArrowSvg>
      </div>
    </>
  );
};

// const Button = styled(UnstyledButton)`
//   display: inline-flex;
//   align-items: center;
//   font-size: 18px;
//   margin-top: 16px;
//   color: var(--color-text);
//   font-weight: var(--font-weight-bold);
// `;

const ArrowSvg = styled.svg`
  transform: translateY(2px);
`;

export default Hover;
