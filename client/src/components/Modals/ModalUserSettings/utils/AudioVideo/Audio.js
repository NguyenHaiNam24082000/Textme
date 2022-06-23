import React from "react";
import Sketch from "react-p5";
import "p5/lib/p5";
import "p5/lib/addons/p5.sound";
import ScratchSong from "../../../../../assets/sounds/Everglow-Patrick Patrikios.mp3";

function Audio() {
  let song;
  let fft;
  let particles = [];
  let img;
  let amp;
  const setup = (p5) => {
    // let canvasDiv = document.getElementById("canvasDiv");
    // let width = canvasDiv?.offsetWidth;
    // let height = canvasDiv?.offsetHeight;
    //const p5Canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    const p5Canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5Canvas.parent("canvasDiv");
    p5.angleMode(p5.DEGREES);
    p5.imageMode(p5.CENTER);
    p5.rectMode(p5.CENTER);
    fft = new p5.constructor.FFT(0.3);
    img.filter(p5.BLUR, 12);
    p5.noLoop();
  };

  const preload = (p5) => {
    // let href=window.location.href.toLowerCase();
    // let music= href.split("?audio=")[1]
    // console.log(music);
    song = p5.loadSound(ScratchSong);
    img = p5.loadImage(
      `https://gamek.mediacdn.vn/thumb_w/640/133514250583805952/2022/2/27/photo-1-1645955725620466721160.jpg`
    );
    console.log(song);
  };

  function mouseClicked(p5) {
    if (
      p5.mouseX > 0 &&
      p5.mouseX < p5.width &&
      p5.mouseY > 0 &&
      p5.mouseY < p5.height
    ) {
      if (song.isPlaying()) {
        song.pause();
        p5.noLoop();
      } else {
        song.play();
        p5.loop();
      }
    }
  }

  const draw = (p5) => {
    // if (window.noLoop) return p5.noLoop();
    p5.background(0);
    p5.translate(p5.width / 2, p5.height / 2);
    fft.analyze();
    amp = fft.getEnergy(20, 200);
    p5.push();
    if (amp > 230) {
      p5.rotate(p5.random(-0.5, 0.5));
    }
    p5.image(img, 0, 0, p5.width, p5.height);
    p5.pop();

    var alpha = p5.map(amp, 0, 255, 180, 150);
    p5.fill(0, alpha);
    p5.noStroke();
    p5.rect(0, 0, p5.width, p5.height);

    p5.stroke(255);
    p5.strokeWeight(3);
    p5.noFill();

    var wave = fft.waveform();
    for (var t = -1; t <= 1; t += 2) {
      p5.beginShape();
      for (var i = 0; i <= 180; i += 0.5) {
        var index = p5.floor(p5.map(i, 0, 180, 0, wave.length - 1));
        var r = p5.map(wave[index], -1, 1, 150, 350);
        var x = r * p5.sin(i) * t;
        var y = r * p5.cos(i);
        p5.vertex(x, y);
      }
      p5.endShape();
    }
    var p = new Particle(p5);
    particles.push(p);
    for (var i = particles.length - 1; i >= 0; i--) {
      if (!particles[i].edges(p5)) {
        particles[i].update(amp > 230);
        particles[i].show(p5);
      } else {
        particles.splice(i, 1);
      }
    }
  };

  class Particle {
    constructor(p5) {
      this.pos = p5.constructor.Vector.random2D().mult(250);
      this.vel = p5.createVector(0, 0);
      this.acceleration = this.pos.copy().mult(p5.random(0.0001, 0.00001));
      this.w = p5.random(3, 5);
      this.color = [
        p5.random(200, 255),
        p5.random(200, 255),
        p5.random(200, 255),
      ];
    }
    update(cond) {
      this.vel.add(this.acceleration);
      this.pos.add(this.vel);
      if (cond) {
        this.pos.add(this.vel);
        this.pos.add(this.vel);
        this.pos.add(this.vel);
      }
    }
    edges(p5) {
      if (
        this.pos.x < -p5.width / 2 ||
        this.pos.x > p5.width / 2 ||
        this.pos.y < -p5.height / 2 ||
        this.pos.y > p5.height / 2
      ) {
        return true;
      } else return false;
    }
    show(p5) {
      p5.noStroke();
      p5.fill(this.color);
      p5.ellipse(this.pos.x, this.pos.y, this.w);
    }
  }
  return (
    <div className="w-full h-auto">
      <Sketch
        mouseClicked={mouseClicked}
        preload={preload}
        setup={setup}
        draw={draw}
        className="w-full h-auto"
      />
    </div>
  );
}

export default React.memo(Audio);
