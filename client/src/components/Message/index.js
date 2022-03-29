import { Text } from "@mantine/core";
import React from "react";
import { chatMainTime, getTime, isSameTime } from "../../commons/dateUtils";
import { GetMe } from "../../store/userSlice";
import "./index.css";
import MessageInlineEditor from "./MessageInlineEditor";

const patterns = {
  boldItalic: /\*\*\*(.*?)\*\*\*/gs,
  bold: /\*\*(.*?)\*\*/gs,
  italic: /\*(.*?)\*|_(.*?)_/gs,
  underline: /__(.*?)__/gs,
  underlineItalics: /__\*(.*?)\*__/gs,
  underlineBold: /__\*\*(.*?)\*\*__/gs,
  underlineBoldItalics: /__\*\*\*(.*?)\*\*\*__/gs,
  strikethrough: /~~(.*?)~~/gs,
  codeMultiline: /```(.*)```/gm,
  codeLine: /`(.*?)`/gs,
  blockQuoteMultiline: />>> (.*)/gs,
  blockQuoteLine: /^> (.*)$/gm,
  kbd: /\[\[(.*)\]\]/gm,
  hashtag: /(\#[a-zA-Z0-9_%]*)/gm,
  warning: /\!\!(.*)\!\!/gm,
  highlight: />>(.*)<</gm,
  bracket: /\[_(.*)_\]/gm,
  circle: /\(\(_(.*)_\)\)/gs,
  map: /\[map\:\{lat\:\"[0-9]+.[0-9]+",lng:"[0-9]+.[0-9]+\"\}\]/g,
};

const format = (content) =>
  content
    .replace(patterns.boldItalic, "<strong><em>$1</em></strong>")
    .replace(patterns.bold, "<strong>$1</strong>")
    .replace(patterns.italic, "<em>$1$2</em>")
    .replace(
      patterns.underlineItalics,
      "<pre class='underline'><em>$1</em></pre>"
    )
    .replace(patterns.underlineBold, "<u><strong>$1</strong></u>")
    .replace(
      patterns.underlineBoldItalics,
      "<u><strong><em>$1</strong></em></u>"
    )
    .replace(patterns.strikethrough, "<del>$1</del>")
    // FIXME: don't add message formatting in a code block
    .replace(
      patterns.codeLine,
      // '<div class="mockup-code bg-primary text-primary-content mt-3 w-full"><pre data-prefix=">"><code class="facade">$1</code></pre></div>'
      "<Code block>$1</Code>"
    )
    .replace(
      patterns.blockQuoteLine,
      '<span class="border-l-4 border-primary pl-1">$1</span>'
    )
    .replace(
      patterns.blockQuoteMultiline,
      '<div class="border-l-4 border-primary pl-1">$1</div>'
    )
    .replace(patterns.kbd, '<kbd class="kbd">$1</kbd>')
    .replace(patterns.hashtag, '<span class="text-blue-300">$1</span>')
    .replace(patterns.warning, '<span class="text-warning">$1</span>');

export default function Message({
  message,
  messages,
  setCurrentEditMessageId,
  currentEditMessageId,
  currentMessageSelected,
  setCurrentMessageSelected,
}) {
  const me = GetMe();

  const isMyMessage = message.sender.id === me.user.id;

  const ShowEditedLabel = (message) => {
    if (isSameTime(message.createdAt, message.updatedAt)) {
      return null;
    }
    return (
      <Text size="xs" color="dimmed" className="align-baseline">
        (edited)
      </Text>
    );
  };

  const isSameTimePrev = false;

  const isSameTimeNext = false;

  return (
    <div
      id={`${message.id}`}
      className={`w-full flex hover:bg-slate-50 justify-between relative ${
        currentEditMessageId === message.id ? "bg-slate-50" : ""
      } ${currentMessageSelected === message.id ? "message-selected" : ""}`}
    >
      {isSameTimePrev ? (
        <div className="w-full flex justify-start items-center px-4 mt-1">
          <div className="flex w-full">
            <p className="w-12 flex flex-shrink-0 justify-center mt-1 text-gray-300 text-[10px]">
              {getTime(message?.createdAt)}
            </p>
            {currentEditMessageId === message.id ? (
              <MessageInlineEditor
                content={message.content}
                finish={() => setCurrentEditMessageId(null)}
              />
            ) : (
              <pre className="text-discord-100 break-all text-sm font-light ml-2 text-left">
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${format(message.content)}`,
                  }}
                ></div>
                {ShowEditedLabel(message)}
              </pre>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`w-full flex justify-start items-start px-4
        ${isSameTimeNext ? "mt-4" : "my-4"}`}
        >
          <div className="flex justify-center">
            <a
              href="#"
              className={`flex items-center mx-auto w-10 h-10 bg-slate-500 text-white rounded-full inline-block`}
            >
              <svg
                className="w-6 h-6 text-center mx-auto"
                aria-hidden="false"
                width="28"
                height="20"
                viewBox="0 0 28 20"
              >
                <path
                  fill="currentColor"
                  d="M20.6644 20C20.6644 20 19.8014 18.9762 19.0822 18.0714C22.2226 17.1905 23.4212 15.2381 23.4212 15.2381C22.4384 15.881 21.5034 16.3334 20.6644 16.6429C19.4658 17.1429 18.3151 17.4762 17.1884 17.6667C14.887 18.0953 12.7774 17.9762 10.9795 17.6429C9.61301 17.381 8.43836 17 7.45548 16.6191C6.90411 16.4048 6.30479 16.1429 5.70548 15.8096C5.63356 15.7619 5.56164 15.7381 5.48973 15.6905C5.44178 15.6667 5.41781 15.6429 5.39384 15.6191C4.96233 15.381 4.7226 15.2143 4.7226 15.2143C4.7226 15.2143 5.87329 17.1191 8.91781 18.0238C8.19863 18.9286 7.31164 20 7.31164 20C2.0137 19.8333 0 16.381 0 16.381C0 8.7144 3.45205 2.50017 3.45205 2.50017C6.90411 -0.07123 10.1884 0.000197861 10.1884 0.000197861L10.4281 0.285909C6.11301 1.52399 4.12329 3.40493 4.12329 3.40493C4.12329 3.40493 4.65068 3.11921 5.53767 2.71446C8.10274 1.59542 10.1404 1.2859 10.9795 1.21447C11.1233 1.19066 11.2432 1.16685 11.387 1.16685C12.8493 0.976379 14.5034 0.92876 16.2295 1.11923C18.5068 1.38114 20.9521 2.0478 23.4452 3.40493C23.4452 3.40493 21.5514 1.61923 17.476 0.381146L17.8116 0.000197861C17.8116 0.000197861 21.0959 -0.07123 24.5479 2.50017C24.5479 2.50017 28 8.7144 28 16.381C28 16.381 25.9623 19.8333 20.6644 20ZM9.51712 8.88106C8.15068 8.88106 7.07192 10.0715 7.07192 11.5239C7.07192 12.9763 8.17466 14.1667 9.51712 14.1667C10.8836 14.1667 11.9623 12.9763 11.9623 11.5239C11.9863 10.0715 10.8836 8.88106 9.51712 8.88106ZM18.2671 8.88106C16.9007 8.88106 15.8219 10.0715 15.8219 11.5239C15.8219 12.9763 16.9247 14.1667 18.2671 14.1667C19.6336 14.1667 20.7123 12.9763 20.7123 11.5239C20.7123 10.0715 19.6336 8.88106 18.2671 8.88106Z"
                ></path>
              </svg>
            </a>
          </div>
          <div className="w-full flex flex-col ml-4">
            <div className="flex items-center">
            {/* <Link  to="about" spy={true} smooth={true}> */}
              <a
                // href="#62380034d4b2be0e54a64da8"
                className="text-black hover:underline text-sm"
                onClick={(e) => {setCurrentMessageSelected(message.id);}}
              >
                {message.sender.username}
              </a>
              {/* </Link> */}
              <span className="text-discord-sideBarChannels ml-2 text-[10px]">
                {chatMainTime(message.createdAt)}
              </span>
            </div>
            {currentEditMessageId === message.id ? (
              <MessageInlineEditor
                content={message.content}
                finish={() => setCurrentEditMessageId(null)}
              />
            ) : (
              <div className="flex  w-full ">
                <pre className="break-all text-discord-100 text-sm font-light text-left">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${format(message.content)}`,
                    }}
                  ></div>
                  {ShowEditedLabel(message)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
