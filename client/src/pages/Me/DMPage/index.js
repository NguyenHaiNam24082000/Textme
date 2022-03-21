import React, { useEffect, useState } from "react";
import { FriendsArea } from "../../../components/Main";
import { MainBase } from "../../../components/Main";
import ChatArea from "../../../components/Main/ChatArea";
import NSFW from "../../../components/Main/NSFW";
import { DMChannelNavbar } from "../../../components/navigations";

export default function DMPage() {
  const [isGoBack, setIsGoBack] = useState(false);
  const [isContinue, setIsContinue] = useState(false);
  const [isNSFW, setIsNSFW] = useState(false);
  useEffect(() => {
    setIsNSFW(isContinue);
  }, [isContinue]);
  return (
    <MainBase>
      {isNSFW ? (
        <>
          <DMChannelNavbar />
          {/* //{" "}
          {/* <div className="flex flex-auto min-w-0 min-h-0 relative overflow-hidden "> <FriendsArea /> */}
          <ChatArea />
        </>
      ) : (
        //   {/* </div> */}
        <NSFW setIsContinue={setIsContinue} setIsGoBack={setIsGoBack} />
      )}
    </MainBase>
  );
}
