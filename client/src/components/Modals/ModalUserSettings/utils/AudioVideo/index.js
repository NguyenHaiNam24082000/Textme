import React, { useEffect, useState } from "react";
import { Group, Select } from "@mantine/core";
import { Banner, Button } from "@douyinfe/semi-ui";
import { ReactMic } from "../../../../ReactMic";
import Audio from "./Audio";

export default function AudioVideo() {
  const [record, setRecord] = useState(false);

  useEffect(() => {
    if (record) {
      if (navigator.mediaDevices) {
        const constraints = (window.constraints = {
          // audio: {
          //   autoGainControl: false,
          //   channelCount: 2,
          //   echoCancellation: false,
          //   latency: 0,
          //   noiseSuppression: false,
          //   sampleRate: 48000,
          //   sampleSize: 16,
          //   volume: 1.0
          // },
          audio: true,
          video: false,
        });
        console.log("constraints", constraints);
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(handleSuccess)
          .catch(handleError);
      }
    }
  }, [record]);

  const handleSuccess = async (stream) => {
    console.log("stream", stream);
    // if (window.stream) {
    //   window.stream.getAudioTracks().forEach((track) => track.stop());
    //   window.stream = null;
    // } else {
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.autoplay = true;
    // audio.muted = true;
    // audio.volume = 0;
    window.stream = stream?.getStream();
    audio.srcObject = stream?.getStream();

    if (stream) {
      stream.oninactive = function () {
        console.log("Stream ended");
      };
    }
    // }
  };

  const handleError = (e) => {
    console.log("ruin", e.message);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col w-full">
        <div className="flex flex-col w-full gap-2 relative">
          <h3 className="text-xl font-semibold mb-3">Voice Settings</h3>
          <Banner
            closeIcon={null}
            type="danger"
            description="You need to grant permission to access audio settings."
          />
          <Group grow>
            <Select
              label="Input Device"
              placeholder="Pick one"
              data={[
                { value: "react", label: "React" },
                { value: "ng", label: "Angular" },
                { value: "svelte", label: "Svelte" },
                { value: "vue", label: "Vue" },
              ]}
            />
            <Select
              label="Output Device"
              placeholder="Pick one"
              data={[
                { value: "react", label: "React" },
                { value: "ng", label: "Angular" },
                { value: "svelte", label: "Svelte" },
                { value: "vue", label: "Vue" },
              ]}
            />
          </Group>
          <h6 className="text-xs font-medium">MIC TEST</h6>
          <ReactMic
            record={record}
            // mimeType="audio/mp3"
            className="sound-wave rounded"
            visualSetting="frequencyBars"
            onStop={(recordedBlob) => {
              console.log("recordedBlob is: ", recordedBlob);
            }}
            onData={(recordedBlob) => {
              // if (recordedBlob !== undefined) {
              //   handleSuccess(recordedBlob.stream());
              // }
              handleSuccess(recordedBlob);
              console.log("chunk of real-time data is: ", recordedBlob);
            }}
            strokeColor="#faa81a"
            backgroundColor="#DCDDDE"
          />
          <Button
            onClick={() => {
              setRecord((v) => !v);
            }}
          >
            {record ? "Stop Testing" : "Let's Check"}
          </Button>
          <div
            id="canvasDiv"
            className="w-full h-auto overflow-hidden relative cursor-pointer"
          >
            <Audio />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-3">Video Settings</h3>
      </div>
    </div>
  );
}
