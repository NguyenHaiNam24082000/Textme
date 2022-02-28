import React, { useState, useEffect } from "react";

const Delayed = ({ children, waitBeforeShow = 1000, show }) => {
  const [isShown, setIsShown] = useState(show);
  const [isWoosh, setIsWoosh] = useState(false);

  useEffect(() => {
    setIsWoosh(true);
    const delayShowFn = setTimeout(() => {
      setIsShown(show);
    }, waitBeforeShow);
    const delayWooshFn = setTimeout(() => {
      setIsWoosh(false);
    }, 2000);
    return () => {
      clearTimeout(delayShowFn);
      clearTimeout(delayWooshFn);
    };
  }, [waitBeforeShow, show]);

  return (
    <>
      <div
        className={`${isWoosh && "woosh"} fixed inset-0 pointer-events-none`}
        style={{
          zIndex: 9999,
        }}
      ></div>
      {isShown ? children : null}
    </>
  );
};

export default Delayed;
