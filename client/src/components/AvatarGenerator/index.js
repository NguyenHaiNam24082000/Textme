import "./index.css";
import { useEffect, useState } from "react";
import { SVG } from "@svgdotjs/svg.js";
import { random } from "@georgedoescode/generative-utils";
import tinycolor from "tinycolor2";
import { saveSvgAsPng } from "save-svg-as-png";
import { Upload, Badge, Avatar } from "@douyinfe/semi-ui";
import { Image } from "@mantine/core";
import UploadAvatar from "../../assets/images/icons/upload_avatar.svg";
const imageOptions = {
  scale: 0.2,
  encoderOptions: 1,
};

const numRows = 5;
const numCols = 5;
let squareSize = 144;
let draw;
let colorPalette;
// let colors;

export default function AvatarGenerator({
  value,
  colors,
  handleGenerateAvatar,
}) {
  const [bgInner, setBgInner] = useState("");
  const [bgOuter, setBgOuter] = useState("");
  useEffect(() => {
    generateAvatar();
  }, [colors, handleGenerateAvatar]);

  const generateAvatar = () => {
    document.querySelector(".avatar") &&
      document.querySelector(".avatar").hasChildNodes() &&
      document
        .querySelector(".avatar")
        .removeChild(document.querySelector(".avatar").childNodes[0]);
    colorPalette = random(colors);
    draw = SVG()
      .addTo(".avatar")
      .size("100%", "100%")
      .viewbox(`0 0 ${numRows * squareSize} ${numCols * squareSize}`);

    const bg = tinycolor
      .mix(colorPalette[0], colorPalette[1], 50)
      .desaturate(10)
      .toString();

    // Make Lighter version
    setBgInner(tinycolor(bg).lighten(10).toString());
    // And darker version
    setBgOuter(tinycolor(bg).darken(10).toString());

    // Create Grid
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        generateLittleBlock(i, j);
      }
    }
    generateBigBlock();
    value.length >= 2 && generateLittleLetterBlock();
  };

  function generateLittleBlock(i, j) {
    const { foreground, background } = getTwoColors(colorPalette);

    // We'll add our style options to this array.
    const blockStyleOptions = [
      drawCross,
      drawDots,
      drawHalfSquare,
      drawDiagonalSquare,
      drawCircle,
      drawOppositeCircles,
      drawQuarterCircle,
      drawRectangle,
      drawMinus,
      drawDivide,
      drawTriangle,
    ];
    // Then choose one randomly
    const blockStyle = random(blockStyleOptions);

    const xPos = i * squareSize;
    const yPos = j * squareSize;

    // And execute it!
    blockStyle(xPos, yPos, foreground, background);
  }

  function generateLittleLetterBlock() {
    const { foreground, background } = getTwoColors(colorPalette);
    const xPos = random(0, numRows, true) * squareSize;
    // Random Y position
    const yPos = random(0, numCols, true) * squareSize;
    const letter =
      value.split(" ").length >= 2
        ? value.toUpperCase().trim().split(" ")[1][0]
        : value.toUpperCase().trim()[1];
    drawLetterBlock(xPos, yPos, foreground, background, letter);
  }

  function generateBigBlock() {
    const { foreground, background } = getTwoColors(colorPalette);

    const blockStyleOptions = [
      drawCross,
      drawDots,
      drawHalfSquare,
      drawDiagonalSquare,
      drawCircle,
      drawOppositeCircles,
      drawQuarterCircle,
      drawRectangle,
      drawMinus,
      drawDivide,
      drawTriangle,
    ];

    let prevSquareSize = squareSize;

    // Random multiplier (2 or 3 squares)
    const multiplier = 2;
    // Random X position
    const xPos = random(0, numRows - multiplier, true) * prevSquareSize;
    // Random Y position
    const yPos = random(0, numCols - multiplier, true) * prevSquareSize;

    // Make squareSize bigger
    squareSize = multiplier * prevSquareSize;

    // Get random square style
    const blockStyle = random(blockStyleOptions);
    const letter = value.toUpperCase().trim()[0];
    value.length >= 1
      ? drawLetterBlock(xPos, yPos, foreground, background, letter)
      : blockStyle(xPos, yPos, foreground, background);
    // Reset squareSize
    squareSize = prevSquareSize;
  }

  function getTwoColors(colors) {
    let colorList = [...colors];
    // Get random index for this array of colors
    const colorIndex = random(0, colorList.length - 1, true);
    // Set the background to the color at that array
    const background = colorList[colorIndex];
    // Remove that color from the options
    colorList.splice(colorIndex, 1);
    // Set the foreground to any other color in the array
    const foreground = random(colorList);

    return { foreground, background };
  }

  function drawCircle(x, y, foreground, background) {
    // Create group element
    const group = draw.group().addClass("draw-circle");

    // Draw Background
    group.rect(squareSize, squareSize).fill(background).move(x, y);

    // Draw Foreground
    group
      .circle(squareSize / 2 + 32)
      .fill(foreground)
      .move(x + squareSize / 4 - 16, y + squareSize / 4 - 16);

    // 30% of the time add inner circle
    if (Math.random() < 0.3) {
      group
        .circle(squareSize / 2)
        .fill(background)
        .move(x + squareSize / 4, y + squareSize / 4);
    }
  }

  function drawRectangle(x, y, foreground, background) {
    // Create group element
    const group = draw.group().addClass("draw-rectangle");

    // Draw Background
    group.rect(squareSize, squareSize).fill(background).move(x, y);

    // Draw Foreground
    group
      .rect(squareSize / 2 + 32, squareSize / 2 + 32)
      .fill(foreground)
      .move(x + squareSize / 4 - 16, y + squareSize / 4 - 16);
    if (Math.random() < 0.3)
      group
        .rect(squareSize / 2, squareSize / 2)
        .fill(background)
        .move(x + squareSize / 4, y + squareSize / 4);
  }

  function drawTriangle(x, y, foreground, background) {
    // Create group element
    const group = draw.group().addClass("draw-triangle");

    // Draw Background
    group.rect(squareSize, squareSize).fill(background).move(x, y);

    // Draw Foreground
    draw
      .polygon("72,16 16,128 128,128")
      .fill(foreground)
      .center(x + squareSize / 2, y + squareSize / 2);
    if (Math.random() < 0.3)
      draw
        .polygon("72,48 48,96 96,96")
        .fill(background)
        .center(x + squareSize / 2, y + squareSize / 2 + 16);
  }

  function drawOppositeCircles(x, y, foreground, background) {
    const group = draw.group().addClass("opposite-circles");
    const circleGroup = draw.group();

    group.rect(squareSize, squareSize).fill(background).move(x, y);

    const mask = draw.rect(squareSize, squareSize).fill("#fff").move(x, y);

    // Choose one of these options
    const offset = random([
      // top left + bottom right
      [0, 0, squareSize, squareSize],
      // top right + bottom left
      [0, squareSize, squareSize, 0],
    ]);

    // Use new offsets when placing circles
    circleGroup
      .circle(squareSize)
      .fill(foreground)
      .center(x + offset[0], y + offset[1]);

    circleGroup
      .circle(squareSize)
      .fill(foreground)
      .center(x + offset[2], y + offset[3]);

    circleGroup.maskWith(mask);
    group.add(circleGroup);
  }

  function drawDots(x, y, foreground, background) {
    const group = draw.group().addClass("dots");

    const sizeOptions = [1, 2, 3, 4, 5, 6];
    const size = random(sizeOptions);

    // const offset = 15;
    const circleSize = 32;
    // const space = (squareSize - offset * 2 - circleSize) / (size - 1);

    // Draw Background
    group.rect(squareSize, squareSize).fill(background).move(x, y);
    //top left,top right,middle left,center,middle right,bottom left,bottom right
    const position = [
      [0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 1],
      [1, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 1, 0, 1, 1],
      [1, 1, 1, 0, 1, 1, 1],
    ];
    //top left
    position[size - 1][0] &&
      group
        .circle(circleSize)
        .fill(foreground)
        .move(x + 16, y + 16);
    //top right
    position[size - 1][1] &&
      group
        .circle(circleSize)
        .fill(foreground)
        .move(x + squareSize - 16 - circleSize, y + 16);
    //middle left
    position[size - 1][2] &&
      group
        .circle(circleSize)
        .fill(foreground)
        .move(x + 16, y + squareSize / 2 - 16);
    //center
    position[size - 1][3] &&
      group
        .circle(circleSize)
        .fill(foreground)
        .move(x + squareSize / 2 - 16, y + squareSize / 2 - 16);
    //middle right
    position[size - 1][4] &&
      group
        .circle(circleSize)
        .fill(foreground)
        .move(x + squareSize - 16 - circleSize, y + squareSize / 2 - 16);
    //bottom left
    position[size - 1][5] &&
      group
        .circle(circleSize)
        .fill(foreground)
        .move(x + 16, y + squareSize - 16 - circleSize);
    //bottom right
    position[size - 1][6] &&
      group
        .circle(circleSize)
        .fill(foreground)
        .move(
          x + squareSize - 16 - circleSize,
          y + squareSize - 16 - circleSize
        );

    // Draw Dots
    // for (let i = 0; i < size; i++) {
    //   for (let j = 0; j < size; j++) {
    //     group
    //       .circle(circleSize)
    //       .fill(foreground)
    //       .move(x + offset + i * space, y + offset + j * space);
    //   }
    // }
  }

  function drawCross(x, y, foreground, background) {
    const group = draw.group().addClass("draw-cross");
    const crossGroup = draw.group();
    // Draw Background
    group.rect(squareSize, squareSize).fill(background).move(x, y);

    // Draw Foreground
    crossGroup
      .rect(squareSize / 1.5, squareSize / 5)
      .fill(foreground)
      .center(x + squareSize / 2, y + squareSize / 2);

    crossGroup
      .rect(squareSize / 1.5, squareSize / 5)
      .fill(foreground)
      .center(x + squareSize / 2, y + squareSize / 2)
      .transform({ rotate: 90 });

    if (Math.random() < 0.4) {
      crossGroup.transform({ rotate: 45, origin: "center center" });
    }
  }

  function drawMinus(x, y, foreground, background) {
    const group = draw.group().addClass("draw-minus");
    // Draw Background
    group.rect(squareSize, squareSize).fill(background).move(x, y);

    // Draw Foreground
    group
      .rect(squareSize / 1.5, squareSize / 5)
      .fill(foreground)
      .center(x + squareSize / 2, y + squareSize / 2);
  }

  function drawDivide(x, y, foreground, background) {
    const group = draw.group().addClass("draw-divide");
    // Draw Background
    group.rect(squareSize, squareSize).fill(background).move(x, y);

    // Draw Foreground
    const circleSize = 32;
    group
      .circle(circleSize)
      .fill(foreground)
      .center(x + squareSize / 2, y + squareSize / 2 - circleSize * 1.25);

    group
      .rect(squareSize / 1.5, squareSize / 5)
      .fill(foreground)
      .center(x + squareSize / 2, y + squareSize / 2);

    group
      .circle(circleSize)
      .fill(foreground)
      .center(x + squareSize / 2, y + squareSize / 2 + circleSize * 1.25);
  }

  function drawQuarterCircle(x, y, foreground, background) {
    const group = draw.group().addClass("quarter-circle");
    const circleGroup = draw.group();

    // Draw Background
    group.rect(squareSize, squareSize).fill(background).move(x, y);

    const mask = draw.rect(squareSize, squareSize).fill("#fff").move(x, y);

    const xOffset = squareSize * random([0, 1], true);
    const yOffset = squareSize * random([0, 1], true);
    // Draw Foreground
    circleGroup
      .circle(squareSize * 2)
      .fill(foreground)
      .center(x + xOffset, y + yOffset);

    if (Math.random() < 0.6) {
      circleGroup
        .circle(squareSize)
        .fill(background)
        .center(x + xOffset, y + yOffset);
    }

    circleGroup.maskWith(mask);
    group.add(circleGroup);
  }

  function drawDiagonalSquare(x, y, foreground, background) {
    const group = draw.group().addClass("diagonal-square");

    // Draw Background
    group.rect(squareSize, squareSize).fill(background).move(x, y);

    // Draw Foreground

    let polygon;
    if (Math.random() > 0.5) {
      polygon = group.polygon(
        `${x},${y} ${x},${y + squareSize}, ${x + squareSize},${y}`
      );
    } else {
      polygon = group.polygon(
        `${x},${y} ${x + squareSize},${y} ${x + squareSize},${y + squareSize}`
      );
    }

    polygon.fill(foreground);
  }

  //draw Text
  function drawLetterBlock(x, y, foreground, background, character) {
    const group = draw.group().addClass("half-square");
    const mask = draw.rect(squareSize, squareSize).fill("#fff").move(x, y);

    // Draw Background
    group.rect(squareSize, squareSize).fill(background).move(x, y);

    // Draw Foreground
    // const character = random(selectedCharacters);
    const text = group.plain(character);
    text.font({
      family: "Arial, Helvetica, sans-serif",
      size: squareSize * 1,
      weight: 600,
      anchor: "middle",
      fill: foreground,
      leading: 1,
    });
    text.center(x + squareSize / 2, y + squareSize / 2);
    // text.rotate(random([0, 90, 180, 270]));
    group.maskWith(mask);
  }

  function drawHalfSquare(x, y, foreground, background) {
    const group = draw.group().addClass("half-square");

    let halfX = 2;
    let halfY = 2;
    if (random([0, 1])) {
      halfX = 1;
    } else {
      halfY = 1;
    }

    // Draw Background
    group.rect(squareSize, squareSize).fill(background).move(x, y);

    // Draw Foreground
    group
      .rect(squareSize / halfX, squareSize / halfY)
      .fill(foreground)
      .move(x, y);
  }

  return (
    <>
      {/* <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setV(e.target.value);
        }}
      />
      <button onClick={generateAvatar}>generate</button> */}
      {/* <div
        ref={ref}
        className="avatar"
        style={{
          background: `radial-gradient(${bgInner} 0%, ${bgOuter} 100%)`,
        }}
      ></div> */}
      <Upload
        // className="avatar-upload"
        // action={api}
        // onSuccess={onSuccess}
        // accept={imageOnly}
        showUploadList={false}
        // onError={() => Toast.error("upload failed")}
      >
        <Badge
          count={
            <Image width={20} height={20} radius="xl" src={UploadAvatar} />
          }
          style={{
            width: "28px",
            height: "28px",
            right: "18px",
            top: "18px",
            boxShadow: "0 2px 4px 0 rgb(0 0 0 / 60%)",
          }}
          className="flex justify-center items-center bg-white rounded-full"
          type="primary"
        >
          <Avatar
            data-content="Change Avatar"
            size="extra-large"
            className="avatar relative"
          />
        </Badge>
      </Upload>
      {/* <button
        onClick={() => {
          setTimeout(() => {
            saveSvgAsPng(draw.node, "shapes.png", imageOptions);
          }, 0);
        }}
      >
        download
      </button> */}
    </>
  );
}
