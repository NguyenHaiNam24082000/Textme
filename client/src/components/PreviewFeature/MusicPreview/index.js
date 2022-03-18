import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Paper, Slider } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import music from "../../../assets/sounds/Scratch_song.mp3";
const proxyUrl = "https://cors-anywhere.herokuapp.com/";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#cdedff",
  progressColor: "#1AAFFF",
  cursorColor: "#1AAFFF",
  barWidth: 2,
  barRadius: 3,
  responsive: true,
  height: 32,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
  scrollParent: true,
  hideScrollbar: true,
  fillParent: true,
});

export default function MusicPreview({ url }) {
  const [playing, setPlaying] = useState(false);
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const durationTime = useRef(null);
  const currentTime = useRef(null);
  const [volume, setVolume] = useState(0.5);
  useEffect(() => {
    setPlaying(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    const URL_PROXY = proxyUrl + url;
    
    
    wavesurfer.current.load(url);
    // wavesurfer.current.load(music);

    wavesurfer.current.on("ready", function () {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);
      durationTime.current.textContent = timeCalculator(
        wavesurfer.current.getDuration()
      );

      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });
    wavesurfer.current.on("audioprocess", function (e) {
      currentTime.current.textContent = timeCalculator(
        wavesurfer.current.getCurrentTime()
      );
    });

    wavesurfer.current.on("play", function () {
      setPlaying(true);
    });

    wavesurfer.current.on("pause", function () {
      setPlaying(false);
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    // return () => {
    //   wavesurfer.current.destroy();
    //   durationTime.current.destroy();
    //   currentTime.current.destroy();
    // };
  }, [url]);

  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.setVolume(volume);
    }
  }, [volume]);

  var timeCalculator = (value) => {
    let second = Math.floor(value % 60);
    let minute = Math.floor((value / 60) % 60);

    if (second < 10) {
      second = "0" + second;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }

    return minute + ":" + second;
  };

  const handlePlayPause = () => {
    wavesurfer.current.playPause();
  };

  const handlePlayBack = () => {
    wavesurfer.current.skip(-10);
  };

  const handlePlayForward = () => {
    wavesurfer.current.skip(10);
  };

  return (
    <Paper
      withBorder
      className="relative rounded-md flex flex-col"
      style={{ width: 500 }}
    >
      <div className="px-4 pt-4 pb-4 flex items-center z-50">
        <img
          className="w-20 h-20 rounded-md mr-4"
          src="https://521dimensions.com/img/open-source/amplitudejs/album-art/soon-it-will-be-cold-enough.jpg"
        />
        <div className="flex flex-col">
          <span className="text-lg font-medium leading-7 text-slate-900">
            First Snow
          </span>
          <span className="text-base font-medium leading-6 text-gray-500">
            Emancation
          </span>
          <span className="text-base font-medium leading-6 text-gray-500">
            Soon It Will Be Cold Enough
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col px-4 pb-4 z-50">
        <div className="flex w-full justify-between items-center gap-2">
          <span
            ref={currentTime}
            className="text-xs font-sans tracking-wide font-medium text-sky-500 dark:text-sky-300"
          >
            00:00
          </span>
          <div ref={waveformRef} className="flex-auto"></div>
          <span
            ref={durationTime}
            className="text-xs font-sans tracking-wide font-medium text-gray-500"
          >
            00:00
          </span>
        </div>
      </div>
      <div
        style={{
          border: "1px solid rgba(15, 23, 42, 0.06)",
          borderLeft: "none",
          borderRight: "none",
          borderBottom: "none",
        }}
        className="h-16 px-10 rounded-b-xl flex items-center justify-around z-50 text-2xl"
      >
        <div className="cursor-pointer relative">
          {volume > 0.5 ? (
            <FontAwesomeIcon icon="fa-solid fa-volume-high" />
          ) : volume > 0 ? (
            <FontAwesomeIcon icon="fa-solid fa-volume-low" />
          ) : (
            <FontAwesomeIcon icon="fa-solid fa-volume-mute" />
          )}
          {/* <Slider
            showLabelOnHover={false}
            label={null}
            min={0}
            max={1}
            step={0.1}
            className="w-60"
            value={volume}
            onChange={setVolume}
          /> */}
        </div>
        <div onClick={handlePlayBack} className="cursor-pointer">
          <FontAwesomeIcon icon="fa-solid fa-backward" className="text-2xl" />
        </div>
        <div
          onClick={handlePlayPause}
          className="cursor-pointer amplitude-play-pause w-20 h-20 rounded-full bg-white border shadow-xl flex items-center justify-center dark:bg-play-pause-dark-background dark:border-play-pause-dark-border amplitude-paused"
          style={{ border: "1px solid rgba(15, 23, 42, 0.06)" }}
        >
          {!playing ? (
            <FontAwesomeIcon
              icon="fa-solid fa-play"
              className="text-4xl ml-2"
            />
          ) : (
            <FontAwesomeIcon icon="fa-solid fa-pause" className="text-4xl" />
          )}
        </div>
        <div onClick={handlePlayForward} className="cursor-pointer">
          <FontAwesomeIcon icon="fa-solid fa-forward" className="text-2xl" />
        </div>
        <div className="cursor-pointer">
          <FontAwesomeIcon icon="fa-solid fa-download" />
        </div>
      </div>
    </Paper>
  );
}
