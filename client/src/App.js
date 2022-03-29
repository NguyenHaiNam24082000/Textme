import "./App.css";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import AccountDetail from "./pages/AccountDetail";
import VerifyEmail from "./pages/VerifyEmail";
import { Helmet } from "react-helmet";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import store from "./store";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { library } from "@fortawesome/fontawesome-svg-core";
import { SpotlightProvider } from "@mantine/spotlight";
import {
  faUser as fasFaUser,
  faIdCard as fasFaIdCard,
  faShield as fasFaShield,
  faCircleCheck as fasFaCircleCheck,
  faPlug as fasFaPlug,
  faTv as fasFaTv,
  faTachographDigital as fasFaTachographDigital,
  faHeadset as fasFaHeadset,
  faFileImage as fasFaFileImage,
  faBell as fasFaBell,
  faKeyboard as fasFaKeyboard,
  faEarthAsia as fasFaEarthAsia,
  faFlask as fasFaFlask,
  faRobot as fasFaRobot,
  faHistory as fasFaHistory,
  faCommentAlt as fasFaCommentAlt,
  faSignOutAlt as fasFaSignOutAlt,
  faChevronDown as fasFaChevronDown,
  faMagnifyingGlass as fasFaMagnifyingGlass,
  faCircleInfo as fasFaCircleInfo,
  faPen as fasFaPen,
  faFaceLaugh as fasFaFaceLaugh,
  faEllipsis as fasFaEllipsis,
  faThumbtack as fasFaThumbtack,
  faReply as fasFaReply,
  faLink as fasFaLink,
  faTrashCan as fasFaTrashCan,
  faVideo as fasFaVideo,
  faPhoneFlip as fasFaPhoneFlip,
  faTowerBroadcast as fasFaTowerBroadcast,
  faBookmark as fasFaBookmark,
  faCopy as fasFaCopy,
  faAt as fasFaAt,
  faGear as fasFaGear,
  faFilter as fasFaFilter,
  faPhoneSlash as fasFaPhoneSlash,
  faMicrophoneSlash as fasFaMicrophoneSlash,
  faMicrophone as fasFaMicrophone,
  faInbox as fasFaInbox,
  faPowerOff as fasFaPowerOff,
  faClock as fasFaClock,
  faCircleMinus as fasFaCircleMinus,
  faExclamation as fasFaExclamation,
  faEye as fasFaEye,
  faEyeSlash as fasFaEyeSlash,
  faCircleExclamation as fasFaCircleExclamation,
  faFileArrowDown as fasFaFileArrowDown,
  faPalette as fasFaPalette,
  faCode as fasFaCode,
  faPlay as fasFaPlay,
  faPause as fasFaPause,
  faForward as fasFaForward,
  faBackward as fasFaBackward,
  faVolumeHigh as fasFaVolumeHigh,
  faVolumeXmark as fasFaVolumeXmark,
  faVolumeLow as fasFaVolumeLow,
  faDownload as fasFaDownload,
  faUserGroup as fasFaUserGroup,
  faUsers as fasFaUsers,
  faUserClock as fasFaUserClock,
  faUserPlus as fasFaUserPlus,
  faUserXmark as fasFaUserXmark,
  faComments as fasFaComments,
  faXmark as fasFaXmark,
  faCheck as fasFaCheck,
  faEllipsisVertical as fasFaEllipsisVertical,
  faPhoneVolume as fasFaPhoneVolume,
  faVideoSlash as fasFaVideoSlash,
  faPhone as fasFaPhone,
  faPodcast as fasFaPodcast,
  faHouse as fasFaHouse
} from "@fortawesome/free-solid-svg-icons";
import {
  faUser as farFaUser,
  faIdCard as farFaIdCard,
  faCircleCheck as farFaCircleCheck,
  faWindowMaximize as farFaWindowMaximize,
} from "@fortawesome/free-regular-svg-icons";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { NotificationsProvider } from "@mantine/notifications";
import Friends from "./pages/Me/Friends";
import Me from "./pages/Me";

library.add(
  fasFaUser,
  farFaUser,
  fasFaIdCard,
  farFaIdCard,
  fasFaShield,
  fasFaCircleCheck,
  farFaCircleCheck,
  fasFaPlug,
  fasFaTv,
  fasFaTachographDigital,
  fasFaHeadset,
  fasFaFileImage,
  fasFaBell,
  fasFaKeyboard,
  fasFaEarthAsia,
  fasFaFlask,
  fasFaRobot,
  fasFaHistory,
  fasFaCommentAlt,
  fasFaSignOutAlt,
  fasFaChevronDown,
  fasFaMagnifyingGlass,
  fasFaCircleInfo,
  fasFaPen,
  fasFaFaceLaugh,
  fasFaEllipsis,
  fasFaThumbtack,
  fasFaReply,
  fasFaLink,
  fasFaTrashCan,
  fasFaVideo,
  fasFaPhoneFlip,
  fasFaTowerBroadcast,
  fasFaBookmark,
  fasFaCopy,
  fasFaAt,
  fasFaGear,
  farFaWindowMaximize,
  fasFaFilter,
  fasFaPhoneSlash,
  fasFaMicrophoneSlash,
  fasFaMicrophone,
  fasFaInbox,
  fasFaPowerOff,
  fasFaClock,
  fasFaCircleMinus,
  fasFaExclamation,
  fasFaEye,
  fasFaEyeSlash,
  fasFaCircleExclamation,
  fasFaFileArrowDown,
  fasFaPalette,
  fasFaCode,
  fasFaPlay,
  fasFaPause,
  fasFaForward,
  fasFaBackward,
  fasFaVolumeHigh,
  fasFaVolumeXmark,
  fasFaVolumeLow,
  fasFaDownload,
  fasFaUserGroup,
  fasFaUsers,
  fasFaUserClock,
  fasFaUserPlus,
  fasFaUserXmark,
  fasFaComments,
  fasFaXmark,
  fasFaCheck,
  fasFaEllipsisVertical,
  fasFaPhoneVolume,
  fasFaVideoSlash,
  fasFaPhone,
  fasFaPodcast,
  fasFaHouse,
);

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // staleTime: Infinity,
    },
  },
});

const actions = [
  { title: "Home", group: "main" },
  { title: "Docs", group: "main" },
  { title: "Dashboard", group: "main" },
  { title: "Component: Tabs", group: "search" },
  { title: "Component: SegmentedControl", group: "search" },
  { title: "Component: Button", group: "search" },
];

function App() {
  return (
    <div className="App overflow-hidden">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Textme</title>
        <meta
          name="description"
          content="Log into Textme to start sharing and connecting with your friends, family, and people you know."
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://textme-chat.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Textme" />
        <meta
          property="og:description"
          content="Log into Textme to start sharing and connecting with your friends, family, and people you know."
        />
        <meta
          property="og:image"
          content="https://textme-chat.vercel.app/logo512.png"
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="textme-chat.vercel.app" />
        <meta
          property="twitter:url"
          content="https://textme-chat.vercel.app/"
        />
        <meta name="twitter:title" content="Textme" />
        <meta
          name="twitter:description"
          content="Log into Textme to start sharing and connecting with your friends, family, and people you know."
        />
        <meta
          name="twitter:image"
          content="https://textme-chat.vercel.app/logo512.png"
        ></meta>
      </Helmet>
      <BrowserRouter>
        <DndProvider backend={HTML5Backend}>
          <Provider store={store}>
            <QueryClientProvider client={client}>
              <ReactQueryDevtools />
              <AnimatePresence>
                <MantineProvider>
                  <SpotlightProvider actions={actions}>
                    <ModalsProvider>
                      <NotificationsProvider>
                        <RecoilRoot>
                          <Routes>
                            <Route path="/" element={<Home />} />

                            <Route element={<PublicRoutes />}>
                              <Route path="/login" element={<Login />} />
                              <Route path="/register" element={<Register />} />
                              <Route
                                path="/verify-email"
                                element={<VerifyEmail />}
                              />
                            </Route>
                            <Route
                              path="/account-detail"
                              element={<AccountDetail />}
                            />
                            <Route element={<ProtectedRoutes />}>
                              <Route
                                exact
                                path="/channel/@me"
                                element={<Me />}
                              />
                              <Route
                                path="/channel/:channel/:message"
                                element={<Me />}
                              />
                              <Route
                                path="/server/:server/channel/:channel/:message"
                                element={<Me />}
                              />
                              <Route
                                path="/server/:server/channel/:channel"
                                element={<Me />}
                              />
                              <Route path="/server/:server" element={<Me />} />
                              <Route
                                path="/channel/:channel"
                                element={<Me />}
                              />
                              <Route
                                path="/channel/@me/:channel"
                                element={<Me />}
                              />
                              <Route path="/friends" element={<Me />} />
                              {/* <Route path="/app" element={<Workspace />} />
                            <Route path="/app" element={<Workspace />} />
                            <Route path="/app" element={<Workspace />} />
                            <Route path="/app" element={<Workspace />} />
                            <Route path="/app" element={<Workspace />} />
                            <Route path="/app" element={<Workspace />} />
                            <Route path="/app" element={<Workspace />} />
                            <Route path="/app" element={<Workspace />} />
                            <Route path="/app" element={<Workspace />} /> */}
                            </Route>
                          </Routes>
                        </RecoilRoot>
                      </NotificationsProvider>
                    </ModalsProvider>
                  </SpotlightProvider>
                </MantineProvider>
              </AnimatePresence>
            </QueryClientProvider>
          </Provider>
        </DndProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
