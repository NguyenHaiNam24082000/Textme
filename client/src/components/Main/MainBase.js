import React from "react";

export default function MainBase({ children }) {
  return (
    <div className="flex flex-col flex-auto min-w-0 min-h-0 relative">
      {children}
    </div>
  );
}
