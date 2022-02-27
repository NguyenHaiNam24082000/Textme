import { useEffect } from "react";

export default function Parallax() {
  useEffect(() => {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var bgg = document.getElementById("bg_glow");
    var w = (ctx.canvas.width = window.innerWidth);
    var h = (ctx.canvas.height = window.innerHeight);
    window.onresize = function () {
      // w = ctx.canvas.width = window.innerWidth;
      // h = ctx.canvas.height = window.innerHeight;
      w = ctx.canvas.width;
      h = ctx.canvas.height;
      maxHeight = h * 0.9;
      minHeight = h * 0.5;
      dots = [];
      pushDots();
      ctx.globalCompositeOperation = "lighter";
    };

    // document.getElementById("overlay").onclick = function () {
    //   hue = Math.random() * 360;
    //   bgg.style.background =
    //     "radial-gradient(ellipse at center, hsla(" +
    //     hue +
    //     ",50%,50%,.8) 0%,rgba(0,0,0,0) 100%)";
    //   dots = [];
    //   pushDots();
    // };
    // setInterval(function () {
    //     hue = Math.random() * 360;
    //   bgg.style.background =
    //     "radial-gradient(ellipse at center, hsla(" +
    //     hue +
    //     ",50%,50%,.8) 0%,rgba(0,0,0,0) 100%)";
    //   dots = [];
    //   pushDots();
    // },60000);

    var dots = [{}];
    var mx = 0;
    var my = 0;
    var md = 100;
    var maxWidth = 15;
    var minWidth = 2;
    var maxHeight = h * 0.9;
    var minHeight = h * 0.5;
    var maxSpeed = 35;
    var minSpeed = 6;
    var hue = 230;
    var hueDif = 50; // Hue +/-
    var glow = 10; // Set to 0 for better performance
    ctx.globalCompositeOperation = "lighter";

    function pushDots(num) {
      for (var i = 1; i < md; i++) {
        dots.push({
          x: Math.random() * w,
          y: (Math.random() * h) / 2,
          h: Math.random() * (maxHeight - minHeight) + minHeight,
          w: Math.random() * (maxWidth - minWidth) + minWidth,
          c: Math.random() * (hue + hueDif - (hue - hueDif)) + (hue - hueDif),
          m: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        });
      }
    }
    pushDots();

    function render() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 1; i < dots.length; i++) {
        ctx.beginPath();
        var grd = ctx.createLinearGradient(
          dots[i].x,
          dots[i].y,
          dots[i].x + dots[i].w,
          dots[i].y + dots[i].h
        );
        grd.addColorStop(0.0, "hsla(" + dots[i].c + ",50%,50%,.0)");
        grd.addColorStop(0.2, "hsla(" + dots[i].c + 20 + ",50%,50%,.5)");
        grd.addColorStop(0.5, "hsla(" + dots[i].c + 50 + ",70%,60%,.8)");
        grd.addColorStop(0.8, "hsla(" + dots[i].c + 80 + ",50%,50%,.5)");
        grd.addColorStop(1, "hsla(" + (dots[i].c + 100) + ",50%,50%,.0)");
        ctx.shadowBlur = glow;
        ctx.shadowColor = "hsla(" + dots[i].c + ",50%,50%,1)";
        ctx.fillStyle = grd;
        ctx.fillRect(dots[i].x, dots[i].y, dots[i].w, dots[i].h);
        ctx.closePath();
        dots[i].x += dots[i].m / 100;
        if (dots[i].x > w + maxWidth) {
          dots.splice(i, 1);
          dots.push({
            x: 0,
            y: Math.random() * h,
            h: Math.random() * (maxHeight - minHeight) + minHeight,
            w: Math.random() * (maxWidth - minWidth) + minWidth,
            c: Math.random() * (hue + hueDif - (hue - hueDif)) + (hue - hueDif),
            m: Math.random() * (maxSpeed - minSpeed) + minSpeed,
          });
        }
      }
      window.requestAnimationFrame(render);
    }

    bgg.style.background =
      "radial-gradient(ellipse at center, hsla(" +
      hue +
      ",50%,50%,.8) 0%,rgba(0,0,0,0) 100%)";
    render();
  }, []);
  return (
    <div className="absolute w-full h-full bottom-0 left-0 right-0">
      <div id="bg_glow"></div>
      <div id="overlay"></div>
      <canvas id="canvas" className="w-full h-full"></canvas>
    </div>
  );
};
