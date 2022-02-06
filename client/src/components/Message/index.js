import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import { Highlight } from "@mantine/core";

export default function Message(props) {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const x = useMotionValue(0);

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  const item = {
    hidden: {
      opacity: 0,
      y: 50,
      transition: { ease: [0.78, 0.14, 0.15, 0.86] },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: { ease: [0.78, 0.14, 0.15, 0.86] },
    },
  };
  return (
    <motion.li
      variants={item}
      initial="hidden"
      animate={controls}
      ref={ref}
      style={{
        margin: 6,
        padding: 8,
        x,
        cursor: "pointer",
      }}
      // onDragEnd={(event, info) => {
      //   if (Math.abs(info.point.x) > 200) {
      //     setIsVisible(false);
      //   }
      // }}
      whileTap={{
        cursor: "grabbing",
      }}
      drag="x"
      dragConstraints={{ left: 6, right: 6 }}
      key={props.key}
    >
      <pre>
        <Highlight
          highlight={props.searchMessage.split(" ")}
          children={JSON.stringify(props.post, null, 2)}
        ></Highlight>
      </pre>
    </motion.li>
  );
}
