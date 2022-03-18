import { useEffect, useState } from "react";
import SiriWave from "siriwave";
let siriWave = null;

const handleSuccess = function (stream) {
  //context depending on browser(Chrome/Firefox)
  let context = new (window.AudioContext || window.webkitAudioContext)();
  //create source for sound input.
  let source = context.createMediaStreamSource(stream);
  //create processor node.
  let processor = context.createScriptProcessor(1024, 1, 1);
  //create analyser node.
  let analyser = context.createAnalyser();
  //set fftSize to 4096
  analyser.fftSize = 4096;
  //array for frequency data.
  let myDataArray = new Float32Array(analyser.frequencyBinCount);

  //connect source->analyser->processor->destination.
  source.connect(analyser);
  analyser.connect(processor);
  processor.connect(context.destination);

  //start siriwave
  siriWave.start();

  //event for change in audio data from source.
  processor.onaudioprocess = function (e) {
    let amplitude = 0;
    let frequency = 0;

    //copy frequency data to myDataArray from analyser.
    analyser.getFloatFrequencyData(myDataArray);

    //get max frequency which is greater than -100 dB.
    myDataArray.map((item, index) => {
      let givenFrequencyDB = item;

      if (givenFrequencyDB > -100) {
        frequency = Math.max(index, frequency);
      }
    });

    //multipy frequency by resolution and divide it to scale for setting speed.
    frequency = ((1 + frequency) * 11.7185) / 24000;
    //set the speed for siriwave
    siriWave.setSpeed(frequency);

    //find the max amplituded
    e.inputBuffer.getChannelData(0).map((item) => {
      amplitude = Math.max(amplitude, Math.abs(item));
    });

    //output buffer data.
    //console.log(e.outputBuffer.getChannelData(0));

    //scale amplituded from [-1, 1] to [0, 10].
    amplitude = Math.abs(amplitude * 10*0.8);

    //if amplitude is greater than 0 then set siriwave amplitude else set to 0.0.
    if (amplitude >= 0) {
      siriWave.setAmplitude(amplitude);
    } else {
      siriWave.setAmplitude(0.0);
    }
  };
};

export default function Sound() {
  useEffect(() => {
    siriWave = new SiriWave({
      container: document.getElementById("wave"),
      color: "#fff",
      speed: 0.0,
      amplitude: 0.0,
      autostart: true,
      style: "ios9",
    });
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: false,
      })
      .then(handleSuccess);
  }, []);

  return (
    <div className="flex flex-col w-full h-96 px-8 pt-8">
      <div className="flex flex-auto text-2xl">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
      <div className="w-full h-24" id="wave"></div>
    </div>
  );
}
