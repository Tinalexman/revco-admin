import React, { useState, useRef, useEffect } from "react";

import Image from "next/image";
import User from "@/assets/settings/user.jpeg";
import { FaCamera } from "react-icons/fa6";

import { useFormik } from "formik";
import { useRevcoUserStore } from "@/stores/userStore";
import {
  formatNumberWithThreesAndFours,
  unformatNumberWithThreesAndFours,
} from "@/functions/numberFunctions";

interface iGeneralSettings {
  name: string;
  email: string;
  phone: string;
}

const GeneralSettings = () => {
  const [newImageBase64Data, setNewImageBase64Data] = useState<string>("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const firstName = useRevcoUserStore((state) => state.firstName);
  const lastName = useRevcoUserStore((state) => state.lastName);
  const email = useRevcoUserStore((state) => state.email);
  const phone = useRevcoUserStore((state) => state.phone);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
    setSubmitting,
    setFieldValue,
  } = useFormik<iGeneralSettings>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validate: (values) => {},
    onSubmit: (values, { setSubmitting }) => {},
  });

  useEffect(() => {
    setFieldValue("name", `${firstName} ${lastName}`);
    setFieldValue("email", email);
    setFieldValue("phone", formatNumberWithThreesAndFours(phone));
  }, [firstName, lastName, email, phone]);

  return (
    <div className="w-full bg-white rounded-xl px-5 py-8 flex flex-col gap-2.5">
      <p className="font-semibold text-[1.25rem] leading-[1.5rem] text-black">
        Profile
      </p>
      <div className="w-full grid place-content-center">
        <div className="w-[500px] flex flex-col items-center">
          <form
            method="POST"
            onSubmit={handleSubmit}
            className="mt-6 w-full flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <p className="text-reg-caption text-[#111213] text-medium">
                Name:
              </p>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                readOnly
                className="w-full drawer-input px-4"
              />
              {errors.name && touched.name && (
                <p className="text-err">{errors.name}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-reg-caption text-[#111213] text-medium">
                Email:
              </p>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                readOnly
                className="w-full drawer-input px-4"
              />
              {errors.email && touched.email && (
                <p className="text-err">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-reg-caption text-[#111213] text-medium">
                Phone:
              </p>
              <input
                type="tel"
                name="phone"
                value={values.phone}
                readOnly
                onChange={(e) => {
                  const res = unformatNumberWithThreesAndFours(e.target.value);

                  if (isNaN(Number(res))) return;

                  setFieldValue("phone", formatNumberWithThreesAndFours(res));
                }}
                className="w-full drawer-input px-4"
              />
              {errors.phone && touched.phone && (
                <p className="text-err">{errors.phone}</p>
              )}
            </div>
            {/* <div className="w-full flex justify-end">
              <button
                type="submit"
                className="text-med-button text-white bg-primary rounded-lg w-[230px] h-11"
              >
                Save Changes
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
