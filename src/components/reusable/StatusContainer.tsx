import React, { FC } from "react";

export const STATE_SUCCESS = "Successful";
export const STATE_PENDING = "Pending";
export const STATE_ERROR = "Failed";
export const STATE_NULL = "Null";

const SUCCESS_CONTAINER_COLOR: string = "#E9F7EF";
const SUCCESS_TEXT_COLOR: string = "#27AE60";

const ERROR_CONTAINER_COLOR: string = "#E910103D";
const ERROR_TEXT_COLOR: string = "#FF3B30";

const PENDING_CONTAINER_COLOR: string = "#E99E104D";
const PENDING_TEXT_COLOR: string = "#E99E10";

const NULL_CONTAINER_COLOR: string = "#E5E5EA";
const NULL_TEXT_COLOR: string = "#333333";

const StatusContainer: FC<{ status: string; text: string }> = ({
  status,
  text,
}) => {
  if (
    status !== STATE_SUCCESS &&
    status !== STATE_PENDING &&
    status !== STATE_ERROR &&
    status !== STATE_NULL
  ) {
    return <div>{text}</div>;
  }

  return (
    <div
      style={{
        background:
          status === STATE_SUCCESS
            ? SUCCESS_CONTAINER_COLOR
            : status === STATE_PENDING
            ? PENDING_CONTAINER_COLOR
            : status === STATE_ERROR
            ? ERROR_CONTAINER_COLOR
            : NULL_CONTAINER_COLOR,
        color:
          status === STATE_SUCCESS
            ? SUCCESS_TEXT_COLOR
            : status === STATE_PENDING
            ? PENDING_TEXT_COLOR
            : status === STATE_ERROR
            ? ERROR_TEXT_COLOR
            : NULL_TEXT_COLOR,
      }}
      className={`px-2 py-1 rounded-full grid place-content-center font-medium w-fit 
        `}
    >
      {text}
    </div>
  );
};

export default StatusContainer;
