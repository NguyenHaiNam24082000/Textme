import "./App.css";
import { useState } from "react";
import Login from "./pages/Login";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Workspace from "./pages/Workspace";
import AccountDetail from "./pages/AccountDetail";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="App">
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
        <meta property="twitter:url" content="https://textme-chat.vercel.app/" />
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
        <AnimatePresence>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/accountdetail" element={<AccountDetail />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/app" element={<Workspace />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </div>
  );
}

export default App;
