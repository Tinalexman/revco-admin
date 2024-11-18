"use client";

import React, { useState } from "react";
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
import Filters from "../../common/Filters";
import { Drawer, Loader, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AddChannel from "./AddChannel";
import StatusContainer, {
  STATE_SUCCESS,
} from "@/components/reusable/StatusContainer";

import { RiEdit2Fill } from "react-icons/ri";
import { TiCancel } from "react-icons/ti";
import EditChannel from "./EditChannel";
import ChannelAction from "./ChannelAction";
import { useGetPaymentChannels } from "@/hooks/paymentHooks";
import { useRevcoUserStore } from "@/stores/userStore";

export interface iPaymentChannel {
  name: string;
  type: string;
  total: number;
  status: string;
  statusText: string;
  success: string;
}

const PaymentChannels = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [openedAddChannel, { open: openAddChannel, close: closeAddChannel }] =
    useDisclosure(false);
  const [
    openedEditChannel,
    { open: openEditChannel, close: closeEditChannel },
  ] = useDisclosure(false);
  const [
    openedChannelAction,
    { open: openChannelAction, close: closeChannelAction },
  ] = useDisclosure(false);

  const { data, loading } = useGetPaymentChannels();

  const channels: iPaymentChannel[] = data.map((dt, i) => ({
    name: dt.channel,
    total: dt.total,
    type: "Online",
    status: STATE_SUCCESS,
    statusText: "Active",
    success: dt.percentage,
  }));

  const [currentChannel, setCurrentChannel] = useState<iPaymentChannel | null>(
    null
  );

  const isAdmin = useRevcoUserStore((state) => state.role) === "Admin";

  const openEditDrawer = (channel: iPaymentChannel) => {
    setCurrentChannel(channel);
    openEditChannel();
  };

  const closeEditDrawer = () => {
    setCurrentChannel(null);
    closeEditChannel();
  };

  const openActionModal = (channel: iPaymentChannel) => {
    setCurrentChannel(channel);
    openChannelAction();
  };

  const closeActionModal = () => {
    setCurrentChannel(null);
    closeChannelAction();
  };

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="px-8 bg-white w-full h-[4.5rem]">
          <div className="w-full flex flex-col justify-around py-2">
            <h2 className="text-monokai font-semibold text-dash-intro-header">
              Payments
            </h2>
            <h3 className="text-primary text-reg-caption">
              Manage all transactions and data on the Revco service
            </h3>
          </div>
        </div>
        <div className="py-5 px-10 w-full flex flex-col gap-2.5">
          <div className="h-14 bg-white rounded-xl w-full flex items-center justify-between px-7">
            <p className="font-semibold text-dash-header text-gray-5">
              Payment Channels
            </p>
            {isAdmin && (
              <button
                onClick={openAddChannel}
                className="bg-primary text-white rounded-lg h-9 gap-2 px-3 text-[0.825rem] flex items-center leading-[0.98rem]"
              >
                Add New Channel <IoMdAdd />
              </button>
            )}
          </div>
          <div className="w-full bg-white p-5 flex flex-col gap-3 rounded-xl">
            <div className="w-full flex justify-between items-center">
              <h2 className="text-black text-med-button">Recent Activity</h2>
              <h2
                onClick={() => setExpanded(!expanded)}
                className="cursor-pointer text-med-button text-[#007AFF]"
              >
                {expanded ? "View Less" : "View All"}
              </h2>
            </div>
            <div className="w-full justify-between items-center flex">
              <Filters />
              <button className="bg-[#F0E6FC] rounded text-primary flex gap-3 items-center px-3 h-10">
                <p className="text-[0.815rem] leading-[0.975rem]">Export</p>
                <IoIosArrowDown />
              </button>
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full">
                <thead className="w-full bg-[#F3F7FC] h-14">
                  <tr className="text-[#3A3A3A] font-medium text-[0.75rem] leading-[1.125rem]">
                    <th scope="col" className="text-start px-4">
                      Channel Name
                    </th>
                    <th scope="col" className="text-start px-4">
                      Type
                    </th>
                    <th scope="col" className="text-start px-4">
                      Status
                    </th>
                    <th scope="col" className="text-start px-4">
                      Total
                    </th>
                    <th scope="col" className="text-start px-4">
                      Success Rate
                    </th>
                    {isAdmin && (
                      <th scope="col" className="text-start px-4">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {channels.map((chn, i) => (
                    <tr
                      key={i}
                      className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around"
                    >
                      <td className="p-4">{chn.name}</td>
                      <td className="p-4">{chn.type}</td>
                      <td className="p-4">
                        <StatusContainer
                          status={chn.status}
                          text={chn.statusText}
                        />
                      </td>
                      <td className="p-4">
                        {chn.total.toLocaleString("en-US")}
                      </td>
                      <td className="p-4">{chn.success}%</td>

                      {isAdmin && (
                        <td className="flex gap-1 p-4">
                          <div
                            onClick={() => openEditDrawer(chn)}
                            className="cursor-pointer bg-[#E4ECF7] rounded size-6 grid place-content-center text-[#292D32]"
                          >
                            <RiEdit2Fill size={16} />
                          </div>
                          <div
                            onClick={() => openActionModal(chn)}
                            className="cursor-pointer bg-[#FDC6C6] rounded size-6 grid place-content-center text-[#D50000]"
                          >
                            <TiCancel size={16} />
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {loading && (
                <div className="w-full h-60 grid place-content-center">
                  <Loader color="primary.6" />
                </div>
              )}
              {!loading && data.length === 0 && (
                <div className="w-full h-60 grid place-content-center text-[#3A3A3A] font-medium text-[1rem] leading-[1.125rem]">
                  No payment channels available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {openedAddChannel && (
        <Drawer.Root
          opened={openedAddChannel}
          onClose={closeAddChannel}
          position={"right"}
          padding={0}
          radius={12}
          closeOnClickOutside={false}
          closeOnEscape={false}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Body>
              <AddChannel onClose={closeAddChannel} />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      )}
      {currentChannel !== null && openedEditChannel && (
        <Drawer.Root
          opened={openedEditChannel}
          onClose={closeEditDrawer}
          position={"right"}
          padding={0}
          radius={12}
          closeOnClickOutside={false}
          closeOnEscape={false}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Body>
              <EditChannel
                channel={{
                  apiKey: "38383232332323e23rwn",
                  channelName: currentChannel.name,
                  clientID: "Paysure Ltd",
                  email: "support@revco",
                  phone: "+234 5585 33434 ",
                  type: "Online",
                  status: true,
                }}
                onClose={closeEditDrawer}
              />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      )}
      {currentChannel !== null && openedChannelAction && (
        <Modal.Root
          opened={openedChannelAction}
          onClose={closeChannelAction}
          centered
          padding={0}
          top={0}
          size={"350px"}
          radius={"lg"}
          closeOnClickOutside={false}
          closeOnEscape={false}
        >
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Body>
              <ChannelAction
                name={currentChannel.name}
                enable={true}
                onClose={closeChannelAction}
              />
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>
      )}
    </>
  );
};

export default PaymentChannels;
