import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";
import React, { useEffect, useRef } from "react";
import bg1 from "../../../assets/images/backgrounds/bg1.jpg";
import bg2 from "../../../assets/images/backgrounds/bg2.jpg";
import bg3 from "../../../assets/images/backgrounds/bg3.jpeg";
import bg4 from "../../../assets/images/backgrounds/bg4.jpg";
import bg5 from "../../../assets/images/backgrounds/bg5.jpg";
import bg6 from "../../../assets/images/backgrounds/bg6.jpg";
import bg7 from "../../../assets/images/backgrounds/bg7.jpg";
import bg8 from "../../../assets/images/backgrounds/bg8.jpg";
import bg9 from "../../../assets/images/backgrounds/bg9.jpg";
import bg10 from "../../../assets/images/backgrounds/bg10.webp";
import bg11 from "../../../assets/images/backgrounds/bg11.webp";
import bg12 from "../../../assets/images/backgrounds/bg12.jpg";

const backgrounds = [
  bg1,
  bg2,
  bg3,
  bg4,
  bg5,
  bg6,
  bg7,
  bg8,
  bg9,
  bg10,
  bg11,
  bg12,
];

const VideoCard = (props) => {
  const ref = useRef();
  const canvasRef = useRef();
  const peer = props.peer;
  const contextRef = useRef(null);

  const onResults = (results) => {
    contextRef.current.save();
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    contextRef.current.drawImage(
      results.segmentationMask,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    // Only overwrite existing pixels.
    contextRef.current.globalCompositeOperation = "source-out";
    // contextRef.current.fillStyle = "#00FF00";
    // contextRef.current.fillRect(
    //   0,
    //   0,
    //   canvasRef.current.width,
    //   canvasRef.current.height
    // );
    const image = new Image();
    image.src = backgrounds[0];
    if (bg1 === "blur(5px)") {
      contextRef.current.filter = "blur(5px)";
    } else if (bg1 === "blur(10px)") {
      contextRef.current.filter = "blur(10px)";
    } else {
      contextRef.current.drawImage(
        image,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }

    // Only overwrite missing pixels.
    contextRef.current.globalCompositeOperation = "destination-atop";
    contextRef.current.drawImage(
      results.image,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    contextRef.current.restore();
  };

  useEffect(() => {
    peer.on("stream", (stream) => {
      console.log("peer stream");
      if (canvasRef.current) {
        contextRef.current = canvasRef.current.getContext("2d");
        ref.current.srcObject = stream;
        sendToMediaPipe();
      }
    });

    peer.on("track", (track, stream) => {});
    const selfieSegmentation = new SelfieSegmentation({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
    });

    selfieSegmentation.setOptions({
      modelSelection: 1,
      selfieMode: true,
    });

    const sendToMediaPipe = async () => {
      if (!ref.current.videoWidth) {
        console.log(ref.current.videoWidth);
        requestAnimationFrame(sendToMediaPipe);
      } else {
        await selfieSegmentation.send({ image: ref.current });
        requestAnimationFrame(sendToMediaPipe);
      }
    };

    selfieSegmentation.onResults(onResults);
  }, [peer]);

  return (
    <div className="flex relative w-full h-full rounded-md overflow-hidden">
      <video muted playsInline autoPlay ref={ref} />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 rounded-md"
        style={{
          width: ref.current?.clientWidth || "100%",
          height: ref.current?.clientHeight || "100%",
        }}
      />
    </div>
  );
};

export default VideoCard;
