import rbga from "color-rbga";
import { createGlobalStyle } from "styled-components";

const GlobalTheme =
  createGlobalStyle <
  { theme } >
  `
    :root {
        ${(props) => generateVariables(props.theme)}
`;

export const generateVariables = (theme) => {
  return Object.keys(theme).map((key) => {
    const color = rbga(theme[key]);
    if (color) {
      const [r, g, b] = color;
      return `--${key}: ${theme[key]}; --${key}-rgb: ${r}, ${g}, ${b};`;
    } else {
      return `--${key}: ${theme[key]};`;
    }
  });
};

