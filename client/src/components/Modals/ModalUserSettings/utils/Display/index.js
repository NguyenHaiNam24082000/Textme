import {
  // ColorInput, Image, Select,
  SimpleGrid,
  // Slider
} from "@mantine/core";
// import { Emoji } from "emoji-mart";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   BallSpinner,
//   BarsSpinner,
//   CircleSpinner,
//   ClapSpinner,
//   ClassicSpinner,
//   CombSpinner,
//   CubeSpinner,
//   DominoSpinner,
//   FillSpinner,
//   FireworkSpinner,
//   FlagSpinner,
//   FlapperSpinner,
//   GooSpinner,
//   GridSpinner,
//   GuardSpinner,
//   HeartSpinner,
//   HoopSpinner,
//   ImpulseSpinner,
//   JellyfishSpinner,
//   MagicSpinner,
//   MetroSpinner,
//   PongSpinner,
//   PulseSpinner,
//   PushSpinner,
//   RainbowSpinner,
//   RingSpinner,
//   RotateSpinner,
//   SequenceSpinner,
//   SphereSpinner,
//   SpiralSpinner,
//   StageSpinner,
//   SwapSpinner,
//   SwishSpinner,
//   TraceSpinner,
//   WaveSpinner,
//   WhisperSpinner,
// } from "react-spinners-kit";
import { themes } from "../../../../../configs/themes";
import { setTheme, themeSelector } from "../../../../../store/uiSlice";
import ThemeLayout from "../../../../ThemeLayout";

export default function Display() {
  // const [sidebar, setSidebar] = useState("");
  // const [activeItem, setActiveItem] = useState("");
  // const [activeItemText, setActiveItemText] = useState("");
  // const [textColor, setTextColor] = useState("");
  // const [mentionBadge, setMentionBadge] = useState("");
  const dispatch = useDispatch();
  const theme = useSelector(themeSelector);
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col w-full">
        <h3 className="text-xl font-semibold mb-3">Hiển thị</h3>
        {/* <div className="flex flex-col w-full h-64 rounded-md gap-2 relative bg-slate-300"></div>
        <Select
          label="Your favorite framework/library"
          placeholder="Pick one"
          data={[]}
        />
        <Slider
          marks={[
            { value: 20, label: "20%" },
            { value: 50, label: "50%" },
            { value: 80, label: "80%" },
          ]}
        />
        <Slider
          marks={[
            { value: 20, label: "20%" },
            { value: 50, label: "50%" },
            { value: 80, label: "80%" },
          ]}
        />
        <BallSpinner />
        <SwapSpinner />
        <BarsSpinner />
        <ClapSpinner />
        <GridSpinner />
        <WaveSpinner />
        <PushSpinner />
        <FireworkSpinner />
        <StageSpinner />
        <RingSpinner />
        <HeartSpinner />
        <GuardSpinner />
        <CircleSpinner />
        <RotateSpinner />
        <SpiralSpinner />
        <PulseSpinner />
        <SwishSpinner />
        <SequenceSpinner />
        <ImpulseSpinner />
        <CubeSpinner />
        <MagicSpinner />
        <FlagSpinner />
        <FillSpinner />
        <SphereSpinner />
        <DominoSpinner />
        <GooSpinner />
        <CombSpinner />
        <PongSpinner />
        <RainbowSpinner />
        <HoopSpinner />
        <FlapperSpinner />
        <JellyfishSpinner />
        <TraceSpinner />
        <ClassicSpinner />
        <WhisperSpinner />
        <MetroSpinner />
        <SimpleGrid cols={2}>
          <div
            className="p-3 rounded-md flex flex-col gap-2 justify-center items-center"
            style={{ border: "1px solid black" }}
          >
            <div
              style={{ fontSize: 56 }}
              className="pointer-events-none flex justify-center items-center gap-2"
            >
              <span>😃</span>
              <span>👏</span>
              <span>🎉</span>
            </div>
            <div>Native</div>
          </div>
          <div
            className="p-3 rounded-md flex flex-col justify-center items-center gap-2"
            style={{ border: "1px solid black" }}
          >
            <div className="flex justify-center items-center gap-2">
              <Emoji emoji="grinning" set="apple" size={64} />
              <Emoji emoji="clap" set="apple" size={64} />
              <Emoji emoji="tada" set="apple" size={64} />
            </div>
            <div>Apple</div>
          </div>
          <div
            className="p-3 rounded-md flex flex-col justify-center items-center gap-2"
            style={{ border: "1px solid black" }}
          >
            <div className="flex justify-center items-center gap-2">
              <Emoji emoji="grinning" set="google" size={64} />
              <Emoji emoji="clap" set="google" size={64} />
              <Emoji emoji="tada" set="google" size={64} />
            </div>
            <div>Google</div>
          </div>
          <div
            className="p-3 rounded-md flex flex-col justify-center items-center gap-2"
            style={{ border: "1px solid black" }}
          >
            <div className="flex justify-center items-center gap-2">
              <Emoji emoji="grinning" set="twitter" size={64} />
              <Emoji emoji="clap" set="twitter" size={64} />
              <Emoji emoji="tada" set="twitter" size={64} />
            </div>
            <div>Twitter</div>
          </div>
          <div
            className="p-3 rounded-md flex flex-col justify-center items-center gap-2"
            style={{ border: "1px solid black" }}
          >
            <div className="flex justify-center items-center gap-2">
              <Emoji emoji="grinning" set="facebook" size={64} />
              <Emoji emoji="clap" set="facebook" size={64} />
              <Emoji emoji="tada" set="facebook" size={64} />
            </div>
            <div>Facebook</div>
          </div>
        </SimpleGrid>
        <SimpleGrid cols={3}>
          <div className="flex flex-col h-40 gap-2">
            <Image className="full h-32">ABC</Image>
            <div className="flex w-full justify-center items-center">ABC</div>
          </div>
          <div className="flex flex-col h-40 gap-2">
            <Image className="full h-32">ABC</Image>
            <div className="flex w-full justify-center items-center">ABC</div>
          </div>
          <div className="flex flex-col h-40 gap-2">
            <Image className="full h-32">ABC</Image>
            <div className="flex w-full justify-center items-center">ABC</div>
          </div>
        </SimpleGrid>
        <SimpleGrid cols={3}>
          <div
            className="p-3 rounded-md flex flex-col gap-2"
            style={{ border: "1px solid black" }}
          >
            <span>Background</span>
            <ColorInput />
          </div>
        </SimpleGrid> */}
        <SimpleGrid cols={3}>
          {themes.map((theme, i) => (
            <div onClick={() => dispatch(setTheme(theme))}>
              <ThemeLayout
                key={i}
                sidebarColor={theme.sidebarBackground}
                activeItem={theme.activeItem}
                activeItemText={theme.activeItemText}
                textColor={theme.textColor}
                mentionBadge={theme.mentionBadge}
              />
            </div>
          ))}
        </SimpleGrid>
      </div>
    </div>
  );
}
