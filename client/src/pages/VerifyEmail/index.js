import React from "react";
import Confetti from "react-confetti";

export default function VerifyEmail() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="text-5xl font-bold">🎉 Congratulation 🥳</div>
      <Confetti className="w-full h-full" />
    </div>
  );
}
