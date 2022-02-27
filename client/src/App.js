import "./App.css";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import Workspace from "./pages/Workspace";
import AccountDetail from "./pages/AccountDetail";
import VerifyEmail from "./pages/VerifyEmail";
import { Helmet } from "react-helmet";
import { SocketContext, socket } from "./sockets";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import store from "./store";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // staleTime: Infinity,
    },
  },
});

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
        <Provider store={store}>
          <QueryClientProvider client={client}>
            <ReactQueryDevtools />
            <AnimatePresence>
              <SocketContext.Provider value={socket}>
                <MantineProvider>
                  <ModalsProvider>
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
                          <Route path="/app" element={<Workspace />} />
                        </Route>
                      </Routes>
                    </RecoilRoot>
                  </ModalsProvider>
                </MantineProvider>
              </SocketContext.Provider>
            </AnimatePresence>
          </QueryClientProvider>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
