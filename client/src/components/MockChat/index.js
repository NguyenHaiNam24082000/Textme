import React from "react";
import { Skeleton } from "@mantine/core";
import "./index.css";

export default function MockChat() {
  return (
    <div id="mock-chat-container" className="flex-col">
      <div className="w-full flex justify-start items-start px-4 py-1">
        <div className="flex justify-center">
          <Skeleton height={60} circle />
        </div>
        <div className="w-full flex flex-col ml-4 gap-2">
          <div className="flex items-center gap-2">
            <Skeleton height={16} width={128} radius={2} />
            <Skeleton height={16} width={64} radius={2} />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Skeleton height={16} radius={2} width={256} />
            <Skeleton height={16} radius={2} width={360} />
            <Skeleton height={16} width={128} radius={2} />
          </div>
          <div className="flex flex-col">{/* Embed */}</div>
        </div>
      </div>
      <div className="w-full flex justify-start items-start px-4 py-1">
        <div className="flex justify-center">
          <Skeleton height={60} circle />
        </div>
        <div className="w-full flex flex-col ml-4 gap-2">
          <div className="flex items-center gap-2">
            <Skeleton height={16} width={128} radius={2} />
            <Skeleton height={16} width={64} radius={2} />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Skeleton height={16} width={128} radius={2} />
            <Skeleton height={16} width={64} radius={2} />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-start items-start pr-4 pl-3 py-1">
        <div className="flex w-full gap-3">
          <Skeleton height={16} width={72} radius={2} />
          <div className="w-full flex flex-col gap-2">
            <Skeleton height={16} width={500} radius={2} />
            <Skeleton height={16} width={256} radius={2} />
            <div className="flex gap-2">
              <Skeleton height={256} width={6} radius={2} />
              <div className="flex flex-col gap-2">
                <Skeleton height={16} width={128} radius={2} />
                <Skeleton height={232} width={320} radius={2} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-start items-start px-4 py-1">
        <div className="flex justify-center">
          <Skeleton height={60} circle />
        </div>
        <div className="w-full flex flex-col ml-4 gap-2">
          <div className="flex items-center gap-2">
            <Skeleton height={16} width={128} radius={2} />
            <Skeleton height={16} width={64} radius={2} />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Skeleton height={16} width={256} radius={2} />
            <Skeleton height={16} width={128} radius={2} />
          </div>
          <div className="flex flex-col">
            <Skeleton height={128} width={256} radius={2} />
          </div>
        </div>
      </div>
    </div>
  );
}
