import React, { useEffect, useState } from "react";

import { Form, Formik, useFormik } from "formik";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useUpdatePassword } from "@/hooks/settingsHook";
import toast from "react-hot-toast";
import {
  checkForLowerCase,
  checkForNumber,
  checkForUpperCase,
  checkPasswordLength,
  checkPasswordPresent,
  validatePassword,
} from "@/functions/validationFunctions";
import { set } from "react-datepicker/dist/date_utils";
import { Loader } from "@mantine/core";

const SecuritySettings = () => {
  const { loading, success, changePassword } = useUpdatePassword();

  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [passwordLengthCheck, setPasswordLengthCheck] =
    useState<boolean>(false);

  const [uppercaseCheck, setUppercaseCheck] = useState<boolean>(false);

  const [lowercaseCheck, setLowercaseCheck] = useState<boolean>(false);

  const [numberCheck, setNumberCheck] = useState<boolean>(false);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    setSubmitting,
  } = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validate: (values) => {
      const errors: any = {};

      if (!values.currentPassword) errors.currentPassword = "Required";

      const response = validatePassword(values.newPassword);
      if (!response.valid) {
        errors.newPassword = response.message;
      }

      if (values.newPassword !== values.confirmNewPassword) {
        errors.confirmNewPassword = "Passwords do not match";
      }

      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(false);
      changePassword(values);
    },
  });

  const validateChecks = (password: string) => {
    const trimmedPassword = password.trim();
    const passwordPresence = checkPasswordPresent(trimmedPassword);
    const passwordLength = checkPasswordLength(trimmedPassword);
    const uppercasePassword = checkForUpperCase(trimmedPassword);
    const lowercasePassword = checkForLowerCase(trimmedPassword);
    const numberedPassword = checkForNumber(trimmedPassword);

    setPasswordLengthCheck(passwordLength.valid && passwordPresence.valid);
    setUppercaseCheck(uppercasePassword.valid);
    setLowercaseCheck(lowercasePassword.valid);
    setNumberCheck(numberedPassword.valid);
  };

  useEffect(() => {
    if (!loading && success) {
      setFieldValue("currentPassword", "");
      setFieldValue("newPassword", "");
      setFieldValue("confirmPassword", "");
      toast.success("Your password has been changed successfully");
    }
  }, [loading, success]);

  return (
    <div className="w-full bg-white rounded-xl px-5 py-8 flex flex-col gap-3">
      <h2 className="font-semibold text-[1.25rem] leading-[1.5rem] text-black">
        Security Settings
      </h2>

      <div className="flex w-full gap-12 items-start">
        <div className="flex flex-col gap-3 w-[20rem]">
          <div className="flex flex-col">
            <h3 className="text-reg-caption font-semibold text-black">
              Update your personal password
            </h3>
            <p className="text-small text-[#595959]">
              Secure your account by updating your current administrator
              password.
            </p>
          </div>
          <div className="w-full py-3 px-4 bg-[#F6F6F7] text-reg-caption rounded-xl flex flex-col gap-2">
            <h3 className="text-black font-medium">Password must have:</h3>
            <div className="flex gap-2 items-center w-fit">
              <IoCheckmarkCircle
                className={`${
                  passwordLengthCheck ? "text-[#00C593]" : "text-[#A9A9A9]"
                }`}
                size={20}
              />
              <p className="text-[#595959] ">At least 8 characters</p>
            </div>
            <div className="flex gap-2 items-center w-fit">
              <IoCheckmarkCircle
                className={`${
                  numberCheck ? "text-[#00C593]" : "text-[#A9A9A9]"
                }`}
                size={20}
              />
              <p className="text-[#595959] ">At least 1 number</p>
            </div>
            <div className="flex gap-2 items-center w-fit">
              <IoCheckmarkCircle
                className={`${
                  uppercaseCheck && lowercaseCheck
                    ? "text-[#00C593]"
                    : "text-[#A9A9A9]"
                }`}
                size={20}
              />
              <p className="text-[#595959] ">
                At least 1 UPPERCASE & 1 lowercase
              </p>
            </div>
          </div>
        </div>
        <div className="w-[40%] flex flex-col gap-7 font-semibold text-gray-2 text-reg-caption">
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col  gap-4"
            method="POST"
          >
            <div className="flex flex-col gap-2 w-full">
              <p className="text-reg-caption text-[#111213] text-medium">
                Current Password
              </p>
              <div className="w-full relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  placeholder="********"
                  value={values.currentPassword}
                  onChange={handleChange}
                  className="w-full drawer-input px-4"
                />
                <div
                  className="absolute text-neutral-2 top-1/2 -translate-y-1/2 right-4 flex items-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCurrentPassword(!showCurrentPassword);
                  }}
                >
                  {showCurrentPassword ? (
                    <MdVisibilityOff className="text-gray-3" size={20} />
                  ) : (
                    <MdVisibility className="text-gray-3" size={20} />
                  )}
                </div>
              </div>
              {errors.currentPassword && touched.currentPassword && (
                <p className="text-s-4 text-error">{errors.currentPassword}</p>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <p className="text-reg-caption text-[#111213] text-medium">
                New Password
              </p>
              <div className="w-full relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="********"
                  value={values.newPassword}
                  onChange={(e) => {
                    validateChecks(e.target.value);
                    setFieldValue("newPassword", e.target.value);
                  }}
                  className="w-full drawer-input px-4"
                />
                <div
                  className="absolute text-neutral-2 top-1/2 -translate-y-1/2 right-4 flex items-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowNewPassword(!showNewPassword);
                  }}
                >
                  {showNewPassword ? (
                    <MdVisibilityOff className="text-gray-3" size={20} />
                  ) : (
                    <MdVisibility className="text-gray-3" size={20} />
                  )}
                </div>
              </div>
              {errors.newPassword && touched.newPassword && (
                <p className="text-s-4 text-error">{errors.newPassword}</p>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <p className="text-reg-caption text-[#111213] text-medium">
                Confirm Password
              </p>
              <div className="w-full relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmNewPassword"
                  placeholder="********"
                  value={values.confirmNewPassword}
                  onChange={handleChange}
                  className="w-full drawer-input px-4"
                />
                <div
                  className="absolute text-neutral-2 top-1/2 -translate-y-1/2 right-4 flex items-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                >
                  {showConfirmPassword ? (
                    <MdVisibilityOff className="text-gray-3" size={20} />
                  ) : (
                    <MdVisibility className="text-gray-3" size={20} />
                  )}
                </div>
              </div>
              {errors.confirmNewPassword && touched.confirmNewPassword && (
                <p className="text-s-4 text-error">
                  {errors.confirmNewPassword}
                </p>
              )}
            </div>

            <div className="w-full flex justify-end">
              <button
                type="submit"
                className={`bg-primary rounded-lg w-[200px] h-10 grid place-content-center text-med-button text-white`}
              >
                {loading ? (
                  <Loader color="white.6" size={24} />
                ) : (
                  "Update Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
