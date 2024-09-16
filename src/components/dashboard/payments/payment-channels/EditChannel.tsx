import React, { FC, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Switch } from "@mantine/core";
import { Form, Formik } from "formik";
import Dropdown from "@/components/reusable/Dropdown";

interface iEditChannel {
  channelName: string;
  type: string;
  apiKey: string;
  clientID: string;
  email: string;
  phone: string;
  status: boolean;
}

const EditChannel: FC<{ channel: iEditChannel; onClose: () => void }> = ({
  channel,
  onClose,
}) => {
  const [hasApiCredentials, setHasApiCredentials] = useState<boolean>(
    channel.apiKey.length > 0 || channel.clientID.length > 0
  );
  const [activeStatus, setActiveStatus] = useState<boolean>(channel.status);

  return (
    <div className="w-full bg-[#FEFEFE] px-5 pt-8 pb-12 flex flex-col items-center gap-6 overflow-y-scroll scrollbar-custom">
      <div className="w-full py-2 flex justify-between items-center">
        <h2 className="text-black font-semibold text-[1.25rem] leading-[1.5rem]">
          Edit - {channel.channelName}
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
          channelName: channel.channelName,
          type: channel.type,
          apiKey: channel.apiKey,
          clientID: channel.clientID,
          email: channel.email,
          phone: channel.phone,
          status: false,
        }}
        validate={(values) => {
          const errors: Partial<iEditChannel> = {};

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
            className="w-full flex flex-col gap-6"
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
                  menus={["Online", "Offline"].map((v) => ({
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

            <div className="w-full flex justify-between items-center">
              <h3 className="text-reg-caption font-medium text-[#8E8E93]">
                API Credentials (If applicable)
              </h3>
              <Switch
                checked={hasApiCredentials}
                color="primary.6"
                onChange={(event) => {
                  event.stopPropagation();
                  setHasApiCredentials(event.currentTarget.checked);
                }}
              />
            </div>

            {hasApiCredentials && (
              <div className="flex flex-col w-full gap-6">
                <div className="flex flex-col gap-0.5 w-full">
                  <h3 className="text-reg-caption font-medium text-[#111213]">
                    API Keys
                  </h3>
                  <input
                    type="text"
                    name="apiKey"
                    value={values.apiKey}
                    onChange={handleChange}
                    className="px-4 drawer-input"
                  />
                  {errors.apiKey && touched.apiKey && (
                    <p className="text-err">{errors.apiKey}</p>
                  )}
                </div>
                <div className="flex flex-col gap-0.5 w-full">
                  <h3 className="text-reg-caption font-medium text-[#111213]">
                    Client ID
                  </h3>
                  <input
                    type="text"
                    name="clientID"
                    value={values.clientID}
                    onChange={handleChange}
                    className="px-4 drawer-input"
                  />
                  {errors.clientID && touched.clientID && (
                    <p className="text-err">{errors.clientID}</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-col w-full gap-3">
              <h3 className="text-reg-caption font-medium text-[#8E8E93]">
                Contact Information
              </h3>
              <div className="flex flex-col gap-0.5 w-full mt-3">
                <h3 className="text-reg-caption font-medium text-[#111213]">
                  Email
                </h3>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className="px-4 drawer-input"
                />
                {errors.email && touched.email && (
                  <p className="text-err">{errors.email}</p>
                )}
              </div>
              <div className="flex flex-col gap-0.5 w-full mt-3">
                <h3 className="text-reg-caption font-medium text-[#111213]">
                  Phone Number
                </h3>
                <input
                  type="tel"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  className="px-4 drawer-input"
                />
                {errors.phone && touched.phone && (
                  <p className="text-err">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="w-full flex gap-3 items-center">
              <h3 className="text-reg-caption font-medium text-[#111213]">
                Status
              </h3>
              <Switch
                checked={activeStatus}
                color="primary.6"
                onChange={(event) => {
                  event.stopPropagation();
                  setActiveStatus(event.currentTarget.checked);
                }}
              />
            </div>

            <div className="w-full flex justify-between items-center">
              <button
                onClick={onClose}
                className="text-[#E94410] w-[48%] border-2 border-[#F6F6F7] h-10 flex justify-center gap-2 items-center rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="text-white w-[48%] bg-primary h-10 flex justify-center gap-2 items-center rounded-lg"
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditChannel;
