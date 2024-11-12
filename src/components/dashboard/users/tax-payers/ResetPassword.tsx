import {
  checkForLowerCase,
  checkForNumber,
  checkForSymbol,
  checkForUpperCase,
  checkPasswordLength,
  checkPasswordPresent,
  validatePassword,
} from "@/functions/validationFunctions";
import { useResetUserPassword } from "@/hooks/userHooks";
import { Loader } from "@mantine/core";
import { useFormik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { IoCheckmarkCircle, IoClose } from "react-icons/io5";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";

const ResetPassword: FC<{ userId: number; onClose: () => void }> = ({
  userId,
  onClose,
}) => {
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [passwordLengthCheck, setPasswordLengthCheck] =
    useState<boolean>(false);

  const [uppercaseCheck, setUppercaseCheck] = useState<boolean>(false);

  const [lowercaseCheck, setLowercaseCheck] = useState<boolean>(false);

  const [numberCheck, setNumberCheck] = useState<boolean>(false);

  const [symbolCheck, setSymbolCheck] = useState<boolean>(false);

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
      userId: userId,
      newPassword: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors: any = {};

      let response = validatePassword(values.newPassword);
      if (!response.valid) {
        errors.newPassword = response.message;
      } else if (!(response = checkForSymbol(values.newPassword)).valid) {
        errors.newPassword = response.message;
      }

      if (values.newPassword !== values.confirmPassword) {
        errors.confirmNewPassword = "Passwords do not match";
      }

      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(false);
      reset(values);
    },
  });

  const { loading, success, reset } = useResetUserPassword();

  const validateChecks = (password: string) => {
    const trimmedPassword = password.trim();
    const passwordPresence = checkPasswordPresent(trimmedPassword);
    const passwordLength = checkPasswordLength(trimmedPassword);
    const uppercasePassword = checkForUpperCase(trimmedPassword);
    const lowercasePassword = checkForLowerCase(trimmedPassword);
    const numberedPassword = checkForNumber(trimmedPassword);
    const specialPassword = checkForSymbol(trimmedPassword);

    setPasswordLengthCheck(passwordLength.valid && passwordPresence.valid);
    setUppercaseCheck(uppercasePassword.valid);
    setLowercaseCheck(lowercasePassword.valid);
    setNumberCheck(numberedPassword.valid);
    setSymbolCheck(specialPassword.valid);
  };

  useEffect(() => {
    if (!loading && success) {
      onClose();
    }
  }, [loading, success]);

  return (
    <div className="w-full bg-[#FEFEFE] px-5 py-8 flex flex-col items-center gap-6 overflow-y-scroll scrollbar-custom">
      <div className="w-full py-2 flex justify-between items-center">
        <h2 className="text-black font-semibold text-[1.25rem] leading-[1.5rem]">
          Reset Password
        </h2>
        <div
          className="cursor-pointer text-black size-9 grid place-content-center rounded bg-[#F6F6F7]"
          onClick={onClose}
        >
          <IoClose size={24} />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col  gap-4"
        method="POST"
      >
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
              className={`${numberCheck ? "text-[#00C593]" : "text-[#A9A9A9]"}`}
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
          <div className="flex gap-2 items-center w-fit">
            <IoCheckmarkCircle
              className={`${symbolCheck ? "text-[#00C593]" : "text-[#A9A9A9]"}`}
              size={20}
            />
            <p className="text-[#595959] ">At least 1 symbol</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <p className="text-reg-caption text-[#111213] text-medium">
            Confirm Password
          </p>
          <div className="w-full relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="********"
              value={values.confirmPassword}
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
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-s-4 text-error">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="w-full flex justify-between items-center mt-10">
          <button
            onClick={onClose}
            className="text-[#E94410] text-reg-caption w-[48%] border-2 border-[#F6F6F7] h-10 flex justify-center gap-2 items-center rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-white text-reg-caption w-[48%] bg-primary h-10 flex justify-center gap-2 items-center rounded-lg"
          >
            {loading ? <Loader color="white.6" size={24} /> : "Reset Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
