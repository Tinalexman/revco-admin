import React, { useState, useRef, useEffect } from "react";

import Image from "next/image";
import User from "@/assets/settings/user.jpeg";
import { FaCamera } from "react-icons/fa6";

import { useFormik } from "formik";

interface iGeneralSettings {
  name: string;
  email: string;
  phone: string;
}

const GeneralSettings = () => {
  const [newImageBase64Data, setNewImageBase64Data] = useState<string>("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    setFieldValue("name", "Adebayo Femi");
    setFieldValue("email", "adminuser@mail.com");
    setFieldValue("phone", "080 1234 5678");
  }, []);

  return (
    <div className="w-full bg-white rounded-xl px-5 py-8 flex flex-col gap-2.5">
      <p className="font-semibold text-[1.25rem] leading-[1.5rem] text-black">
        Profile
      </p>
      <div className="w-full grid place-content-center">
        <div className="w-[500px] flex flex-col items-center">
          <div className="size-24 relative">
            {newImageBase64Data ? (
              <Image
                src={newImageBase64Data}
                alt="profile-picture"
                className="rounded-full size-24 object-cover"
                width={96}
                height={96}
              />
            ) : (
              <Image
                src={User}
                alt="profile-picture"
                className="rounded-full size-24 object-cover"
                width={96}
                height={96}
              />
            )}
            <FaCamera
              className="absolute right-2 bottom-0 z-1 text-[#222222] cursor-pointer"
              size={20}
              onClick={() => inputRef.current?.click()}
            />
            <input
              type="file"
              style={{ display: "none" }}
              ref={inputRef}
              accept="image/*"
              onChange={(e) => {
                const listOfFiles = e.target.files;
                if (listOfFiles !== null) {
                  setNewImageFile(listOfFiles[0]);
                  const reader = new FileReader();
                  reader.readAsDataURL(listOfFiles[0]);
                  reader.onload = () => {
                    setNewImageBase64Data(reader.result as string);
                  };
                }
              }}
            />
          </div>
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
                onChange={handleChange}
                className="w-full drawer-input px-4"
              />
              {errors.phone && touched.phone && (
                <p className="text-err">{errors.phone}</p>
              )}
            </div>
            <div className="w-full flex justify-end">
              <button
                type="submit"
                className="text-med-button text-white bg-primary rounded-lg w-[230px] h-11"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
