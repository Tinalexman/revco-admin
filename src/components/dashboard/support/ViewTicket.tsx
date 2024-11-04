import StatusContainer, {
  STATE_ERROR,
  STATE_NULL,
  STATE_PENDING,
  STATE_SUCCESS,
} from "@/components/reusable/StatusContainer";
import { convertDateWithDashesAndTime } from "@/functions/dateFunctions";
import { toLeadingCase } from "@/functions/stringFunctions";
import { changeDisputeStatus, iDispute } from "@/hooks/supportHooks";
import { Drawer, Loader } from "@mantine/core";
import React, { FC, useEffect, useState } from "react";
import { set } from "react-datepicker/dist/date_utils";
import { IoClose } from "react-icons/io5";

export function canClose(ticket: iDispute) {
  return ticket.status !== "CLOSED" && ticket.status !== "RESOLVED";
}

export function canOpen(ticket: iDispute) {
  return ticket.status !== "OPEN" && ticket.status !== "IN_PROGRESS";
}

export function canResolve(ticket: iDispute) {
  return ticket.status !== "RESOLVED" && ticket.status !== "CLOSED";
}

export function canProgress(ticket: iDispute) {
  return ticket.status === "OPEN";
}

const ViewTicket: FC<{
  ticket: iDispute;
  onClose: () => void;
  onChange: () => void;
}> = ({ ticket, onClose, onChange }) => {
  const { changeStatus, loading, success } = changeDisputeStatus();
  const [closing, setClosing] = useState<boolean>(false);
  const [opening, setOpening] = useState<boolean>(false);
  const [resolving, setResolving] = useState<boolean>(false);
  const [progressing, setProgressing] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && success) {
      onChange();
    } else if (!loading && !success) {
      setClosing(false);
      setOpening(false);
      setResolving(false);
      setProgressing(false);
    }
  }, [loading, success]);

  return (
    <Drawer.Root
      opened={true}
      onClose={close}
      position="right"
      padding={0}
      top={0}
      radius={12}
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Body>
          <div className="w-full bg-[#FEFEFE] px-5 py-8 flex flex-col items-center gap-6 overflow-y-scroll scrollbar-custom">
            <div className="w-full py-2 flex justify-between items-center">
              <h2 className="text-black font-semibold text-[1.25rem] leading-[1.5rem]">
                View Ticket
              </h2>
              <div
                className="cursor-pointer text-black size-9 grid place-content-center rounded bg-[#F6F6F7]"
                onClick={onClose}
              >
                <IoClose size={24} />
              </div>
            </div>

            <div className="w-full flex flex-col text-black text-[0.875rem] leading-[1.06rem]">
              <div className="flex justify-between items-center w-full h-10">
                <h2>Ticket Number:</h2>
                <h2 className="font-medium">{ticket.ticketNumber}</h2>
              </div>
              <div className="flex justify-between items-center w-full h-10">
                <h2>Username:</h2>
                <h2 className="font-medium">{ticket.username}</h2>
              </div>
              <div className="flex justify-between items-center w-full h-10">
                <h2>Description:</h2>
                <h2 className="font-medium w-[60%] text-end">
                  {ticket.description}
                </h2>
              </div>
              <div className="flex justify-between items-center w-full h-10">
                <h2>Category:</h2>
                <h2 className="font-medium">
                  {toLeadingCase(ticket.category.replaceAll("_", " "))}
                </h2>
              </div>
              <div className="flex justify-between items-center w-full h-10">
                <h2>Priority:</h2>
                <h2 className="font-medium">
                  {toLeadingCase(ticket.priority.replaceAll("_", " "))}
                </h2>
              </div>
              <div className="flex justify-between items-center w-full h-10">
                <h2>Status:</h2>
                <h2 className="font-medium">
                  <StatusContainer
                    status={
                      ticket.status === "IN_PROGRESS"
                        ? STATE_PENDING
                        : ticket.status === "RESOLVED"
                        ? STATE_SUCCESS
                        : ticket.status === "CLOSED"
                        ? STATE_NULL
                        : STATE_ERROR
                    }
                    text={toLeadingCase(ticket.status.replaceAll("_", " "))}
                  />
                </h2>
              </div>
              <div className="flex justify-between items-center w-full h-10">
                <h2>Date Opened:</h2>
                <h2 className="font-medium">
                  {convertDateWithDashesAndTime(ticket.createdAt)}
                </h2>
              </div>
              <div className="flex justify-between items-center w-full h-10">
                <h2>Agent Assigned To:</h2>
                <h2 className="font-medium">{ticket.agentName}</h2>
              </div>
            </div>

            <div className="flex flex-col w-full gap-3">
              {canOpen(ticket) && (
                <button
                  className="w-full h-10 bg-green-500 text-white rounded grid place-content-center"
                  onClick={() => {
                    setOpening(true);
                    changeStatus(ticket.ticketNumber, "OPEN");
                  }}
                >
                  {opening ? <Loader color="white" size={24} /> : "Open Ticket"}
                </button>
              )}

              {canClose(ticket) && (
                <button
                  className="w-full h-10 bg-[#D32F2F] text-white rounded grid place-content-center"
                  onClick={() => {
                    setClosing(true);
                    changeStatus(ticket.ticketNumber, "CLOSED");
                  }}
                >
                  {closing ? (
                    <Loader color="white" size={24} />
                  ) : (
                    "Close Ticket"
                  )}
                </button>
              )}

              {canResolve(ticket) && (
                <button
                  className="w-full h-10 bg-primary text-white rounded grid place-content-center"
                  onClick={() => {
                    setResolving(true);
                    changeStatus(ticket.ticketNumber, "RESOLVED");
                  }}
                >
                  {resolving ? (
                    <Loader color="white" size={24} />
                  ) : (
                    "Resolve Ticket"
                  )}
                </button>
              )}

              {canProgress(ticket) && (
                <button
                  className="w-full h-10 bg-orange-400 text-white rounded grid place-content-center"
                  onClick={() => {
                    setProgressing(true);
                    changeStatus(ticket.ticketNumber, "IN_PROGRESS");
                  }}
                >
                  {progressing ? (
                    <Loader color="white" size={24} />
                  ) : (
                    "Progress Ticket"
                  )}
                </button>
              )}
            </div>
          </div>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};

export default ViewTicket;
