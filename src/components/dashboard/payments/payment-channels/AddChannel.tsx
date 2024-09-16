import React, { FC, useState } from "react";
import Image from "next/image";
import Receipt from "@/assets/payments/Receipt.svg";
import { IoClose } from "react-icons/io5";
import { BiSolidReceipt } from "react-icons/bi";
import { HiReceiptRefund } from "react-icons/hi2";

import { Form, Formik } from "formik";
import Dropdown from "@/components/reusable/Dropdown";

interface iCreateChannel {
  channelName: string;
  type: string;
  apiKey: string;
  clientID: string;
  email: string;
  phone: string;
  status: boolean;
}

const AddChannel: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [hasApiCredentials, setHasApiCredentials] = useState<boolean>(false);
  const [activeStatus, setActiveStatus] = useState<boolean>(false);

  return (
    <div className="w-full bg-[#FEFEFE] px-5 py-8 flex flex-col items-center gap-6 overflow-y-scroll scrollbar-custom">
      <div className="w-full py-2 flex justify-between items-center">
        <h2 className="text-black font-semibold text-[1.25rem] leading-[1.5rem]">
          Add New Channel
        </h2>
        <div
          className="cursor-pointer text-black size-9 grid place-content-center rounded bg-[#F6F6F7]"
          onClick={onClose}
        >
          <IoClose size={24} />
        </div>
      </div>
      <Formik
        initialValues={{
          channelName: "",
          type: "",
          apiKey: "",
          clientID: "",
          email: "",
          phone: "",
          status: false,
        }}
        validate={(values) => {
          const errors: Partial<iCreateChannel> = {};

          if (!values.channelName) {
            errors.channelName = "Required";
          } else if (values.channelName.length < 3) {
            errors.channelName =
              "Channel name must be at least 3 characters long";
          }

          if (!values.type) {
            errors.type = "Required";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          // fn(values, (val: any) => {
          //   setSubmitting(false);
          //   if (val) {
          //     setTimeout(() => {
          //       window.location.replace("/dashboard/make-payment");
          //     }, 500);
          //   }
          // });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isInitialValid,
          isValid,
          setSubmitting,
          setFieldValue,
        }) => (
          <Form
            onSubmit={handleSubmit}
            className="w-full flex flex-col mt-8 gap-6"
            method="POST"
          >
            <div className="flex flex-col gap-0.5 w-full">
              <h3 className="text-reg-caption font-medium text-[#111213]">
                Channel Name
              </h3>
              <input
                type="text"
                name="channelName"
                value={values.channelName}
                onChange={handleChange}
                className="px-4 drawer-input "
              />
              {errors.channelName && touched.channelName && (
                <p className="text-err">{errors.channelName}</p>
              )}
            </div>

            <div className="flex flex-col gap-0.5 w-full">
              <h3 className="text-reg-caption font-medium text-[#111213]">
                Type
              </h3>
              <div className="w-full h-10">
                <Dropdown
                  value={values.type}
                  menus={["A", "B"].map((v) => ({
                    name: v,
                    onClick: () => {
                      setFieldValue("type", v);
                    },
                  }))}
                  hint="Select Type"
                />
              </div>
              {errors.type && <p className="text-err">{errors.type}</p>}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddChannel;
