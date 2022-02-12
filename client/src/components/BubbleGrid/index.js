import React, { useEffect } from "react";
import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";

const options = {
  size: 250,
  minSize: 0,
  gutter: 15,
  provideProps: true,
  numCols: 6,
  fringeWidth: 200,
  yRadius: 400,
  xRadius: 400,
  cornerRadius: 0,
  showGuides: false,
  compact: true,
  gravitation: 5,
};

const data = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "ninety",
  "twenty",
];
export default function BubbleGrid() {
  const children = data?.map((data, i) => {
    return <Child className="child" key={i} setClick={handleClick} />;
  });
  useEffect(() => {
    const bubbles = document.querySelector("._2MD0k");
    const dragspeed = 2;
    let isDown = false;
    let startX;
    let startY;
    let scrollLeft;
    let scrollTop;

    bubbles.addEventListener("mousedown", (e) => {
      isDown = true;
      bubbles.classList.add("active");
      startX = e.pageX - bubbles.offsetLeft;
      startY = e.pageY - bubbles.offsetTop;
      scrollLeft = bubbles.scrollLeft;
      scrollTop = bubbles.scrollTop;
    });
    bubbles.addEventListener("mouseleave", () => {
      isDown = false;
      bubbles.classList.remove("active");
    });
    bubbles.addEventListener("mouseup", () => {
      isDown = false;
      bubbles.classList.remove("active");
    });
    bubbles.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - bubbles.offsetLeft;
      const y = e.pageY - bubbles.offsetTop;
      const walk = (x - startX) * dragspeed;
      const topwalk = (y - startY) * dragspeed;
      bubbles.scrollLeft = scrollLeft - walk;
      bubbles.scrollTop = scrollTop - topwalk;
    });
  }, []);

  return (
    <BubbleUI options={options} className="w-full h-full">
      {children}
    </BubbleUI>
  );
}

function Child({ data, setClick, goInner }) {
  return (
    <div
      className="w-full h-full bg-white rounded-full shadow-lg"
      onClick={() => {
        setClick(data);
        goInner(true);
      }}
    >
      {data}
    </div>
  );
}
