import React, { FC } from "react";
import { Modal } from "@mantine/core";
import { GiCancel } from "react-icons/gi";

const DeleteReport: FC<{ close: () => void }> = ({ close }) => {
  return (
    <Modal.Root
      opened={true}
      onClose={close}
      centered
      padding={0}
      top={0}
      radius={12}
      size={"350px"}
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Body>
          <div className="flex flex-col bg-white items-center p-6">
            <div
              className={`p-3 ${"bg-[#FFEAE9] text-[#D32F2F]"} rounded-full`}
            >
              <GiCancel size={32} />
            </div>
            <div className="mt-6 flex flex-col gap-2 items-center w-full text-center">
              <h2 className="text-black font-semibold text-[1rem] leading-[1.5rem]">
                Delete Report?
              </h2>
              <p className="font-medium text-reg-caption text-[#595959]">
                Are you sure you want to continue?
              </p>
            </div>
            <div className="w-full flex justify-between items-center mt-6">
              <button
                onClick={close}
                className="text-[#111213] w-[48%] focus:outline-none text-reg-caption border-2 border-[#F6F6F7] h-10 grid place-content-center rounded"
              >
                No, keep
              </button>
              <button
                onClick={close}
                className={`text-white w-[48%] ${"bg-[#D32F2F]"} text-reg-caption h-10 grid place-content-center rounded`}
              >
                Yes, close
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default DeleteReport;
