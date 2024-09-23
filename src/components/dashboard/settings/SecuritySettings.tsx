import React, { useState } from "react";
import { Switch } from "@mantine/core";

import { Form, Formik } from "formik";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { IoCheckmarkCircle } from "react-icons/io5";

interface iChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const SecuritySettings = () => {
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
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
              <IoCheckmarkCircle className="text-[#00C593]" size={20} />
              <p className="text-[#595959] ">At least 8 characters</p>
            </div>
            <div className="flex gap-2 items-center w-fit">
              <IoCheckmarkCircle className="text-[#00C593]" size={20} />
              <p className="text-[#595959] ">At least 1 number</p>
            </div>
            <div className="flex gap-2 items-center w-fit">
              <IoCheckmarkCircle className="text-[#A9A9A9]" size={20} />
              <p className="text-[#595959] ">
                At least 1 UPPERCASE & 1 lowercase
              </p>
            </div>
          </div>
        </div>
        <div className="w-[40%] flex flex-col gap-7 font-semibold text-gray-2 text-reg-caption">
          <Formik
            initialValues={{
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validate={(values) => {
              const errors: Partial<iChangePassword> = {};

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {}}
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
            }) => (
              <Form
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
                    <p className="text-s-4 text-error">
                      {errors.currentPassword}
                    </p>
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
                      onChange={handleChange}
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
                    <p className="text-s-4 text-error">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="w-full flex justify-end">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className={`bg-primary rounded-lg w-[200px] h-10 flex justify-center items-center gap-2 text-med-button text-white `}
                  >
                    <p>Update Password</p>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
