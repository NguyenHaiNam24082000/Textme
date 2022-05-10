import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: [
      "ar",
      "en_GB",
      "en_US",
      "es",
      "id_ID",
      "ja_JP",
      "ko_KR",
      "ms_MY",
      "pt_BR",
      "ru_RU",
      "th_TH",
      "tr_TR",
      "vi_VN",
      "zh_CN",
      "zh_TW",
    ],
    fallbackLng: "en",
    detection: {
      order: [
        "localStorage",
        "htmlTag",
        "path",
        "subdomain",
        "cookie",
        "querystring",
        "navigator",
        "sessionStorage",
      ],
      caches: ["localStorage", "cookie"],
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
    react: {
      useSuspense: false,
    },
  });

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(
    // <React.StrictMode>
      <App />
    // </React.StrictMode>
    ,
    rootElement
  );
} else {
  ReactDOM.render(
    // <React.StrictMode>
      <App />
    // </React.StrictMode>
    ,
    rootElement
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
