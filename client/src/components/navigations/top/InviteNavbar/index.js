import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text } from "@mantine/core";
import React from "react";

export default function InviteNavbar() {
  return (
    <section
      className="h-auto w-full min-w-0 relative flex "
      style={{ flex: "0 0 auto" }}
    >
      <div
        className="flex w-full h-12 px-2"
        style={{ backgroundColor: "#f3f4f6" }}
      >
        <div
          className="flex w-full h-full items-center justify-between px-2"
          style={{ borderBottom: "2px solid #e1e1e1" }}
        >
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon="fa-solid fa-ticket" />
            <Text weight={500}>Invites</Text>
          </div>
          {/* <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon="fa-solid fa-comments" />
          </div> */}
        </div>
      </div>
    </section>
  );
}
