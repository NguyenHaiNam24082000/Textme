import React, { useEffect } from "react";
import { Skeleton, Tooltip } from "@mantine/core";
import "./index.css";

export default function MockChat() {
  return (
    <div id="mock-chat-container" className="flex-col">
      <div className="w-full flex justify-start items-start px-4 py-1">
        <div className="flex justify-center">
          <Skeleton
            height={60}
            circle
            sx={(theme) => ({
              "&:before": {
                background: "#f20d0d",
              },
              "&:after": {
                background: "#ba5e5e",
              },
            })}
          />
        </div>
        <div className="w-full flex flex-col ml-4 gap-2">
          <div className="flex items-center gap-2">
            <Skeleton
              height={16}
              width={128}
              radius={2}
              sx={(theme) => ({
                "&:before": {
                  background: "#f20d0d",
                },
                "&:after": {
                  background: "#ba5e5e",
                },
              })}
            />
            <Tooltip
              // label={getMoreDetailsTime(message.createdAt)}
              withArrow
            >
              <Skeleton height={16} width={64} radius={2} />
            </Tooltip>
          </div>
          <div className="flex flex-col w-full gap-2">
            <Skeleton height={16} radius={2} />
            <Skeleton height={16} radius={2} />
            <Skeleton height={16} width={256} radius={2} />
          </div>
          <div className="flex flex-col">{/* Embed */}</div>
        </div>
      </div>
      <div className="w-full flex justify-start items-start px-4 py-1">
        <div className="flex justify-center">
          <Skeleton
            height={60}
            circle
            sx={(theme) => ({
              "&:before": {
                background: "#A6F20D",
              },
              "&:after": {
                background: "#9CBA5E",
              },
            })}
          />
        </div>
        <div className="w-full flex flex-col ml-4 gap-2">
          <div className="flex items-center gap-2">
            <Skeleton
              height={16}
              width={128}
              radius={2}
              sx={(theme) => ({
                "&:before": {
                  background: "#A6F20D",
                },
                "&:after": {
                  background: "#9CBA5E",
                },
              })}
            />
            <Tooltip
              // label={getMoreDetailsTime(message.createdAt)}
              withArrow
            >
              <Skeleton height={16} width={64} radius={2} />
            </Tooltip>
          </div>
          <div className="flex flex-col w-full gap-2">
            <Skeleton height={16} radius={2} />
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
          <Skeleton
            height={60}
            circle
            sx={(theme) => ({
              "&:before": {
                background: "#A60DF2",
              },
              "&:after": {
                background: "#9C5EBA",
              },
            })}
          />
        </div>
        <div className="w-full flex flex-col ml-4 gap-2">
          <div className="flex items-center gap-2">
            <Skeleton
              height={16}
              width={128}
              radius={2}
              sx={(theme) => ({
                "&:before": {
                  background: "#A60DF2",
                },
                "&:after": {
                  background: "#9C5EBA",
                },
              })}
            />
            <Tooltip
              // label={getMoreDetailsTime(message.createdAt)}
              withArrow
            >
              <Skeleton height={16} width={64} radius={2} />
            </Tooltip>
          </div>
          <div className="flex flex-col w-full gap-2">
            <Skeleton height={16} radius={2} />
            <Skeleton height={16} width="50%" radius={2} />
          </div>
          <div className="flex flex-col">
            <Skeleton height={128} width={256} radius={2} />
          </div>
        </div>
      </div>
    </div>
  );
}
