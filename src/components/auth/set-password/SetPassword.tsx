"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/Revco.svg";

import { Form, Formik } from "formik";
import { Loader } from "@mantine/core";

import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { ArrowLeft, ArrowRight } from "iconsax-react";
import CustomCheckbox from "@/components/reusable/CustomCheckbox";

interface iManualLoginPayload {
  confirmPassword: string;
  password: string;
}

const SetPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setConfirmShowPassword] =
    useState<boolean>(false);

  return (
    <div className="h-fit w-[27.5rem] flex flex-col items-center justify-center gap-10">
      <Image
        src={Logo}
        alt="logo"
        className="w-[8rem] h-auto"
        width={112}
        height={25}
      />
      <div className="flex flex-col gap-5 w-full px-6 py-8">
        <h1 className="text-med-h5 text-gray-2">User Registration</h1>
        <Formik
          initialValues={{
            confirmPassword: "",
            password: "",
          }}
          validate={(values) => {
            const errors: Partial<iManualLoginPayload> = {};

            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 8) {
              errors.password = "Password must be at least 8 characters long";
            } else if (!/[A-Z]/.test(values.password)) {
              errors.password =
                "Password must contain at least one uppercase letter";
            } else if (!/[a-z]/.test(values.password)) {
              errors.password =
                "Password must contain at least one lowercase letter";
            } else if (!/[0-9]/.test(values.password)) {
              errors.password = "Password must contain at least one number";
            } else if (
              !/[!@#$%^&*()_+\-=\[\]{}|;':"\\/?]/.test(values.password)
            ) {
              errors.password = "Password must contain at least one symbol";
            }

            if (!values.confirmPassword) {
              errors.confirmPassword = "Required";
            } else if (values.confirmPassword !== values.password) {
              errors.confirmPassword = "Passwords do not match";
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
          }) => (
            <Form
              onSubmit={handleSubmit}
              className="w-full flex flex-col mt-8 gap-4"
              method="POST"
            >
              <div className="flex flex-col gap-2 w-full">
                <h3 className="text-reg-caption text-gray-2">Password</h3>
                <div className="w-full relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="********"
                    value={values.password}
                    onChange={handleChange}
                    className="w-full auth-input"
                  />
                  <div
                    className="absolute text-neutral-2 top-1/2 -translate-y-1/2 right-4 flex items-center cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <MdVisibilityOff className="text-gray-3" size={20} />
                    ) : (
                      <MdVisibility className="text-gray-3" size={20} />
                    )}
                  </div>
                </div>
                {errors.password && touched.password && (
                  <p className="text-s-4 text-error">{errors.password}</p>
                )}
              </div>

              <div className="flex flex-col gap-2 w-full">
                <h3 className="text-reg-caption text-gray-2">
                  Confirm Password
                </h3>
                <div className="w-full relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="********"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    className="w-full auth-input"
                  />
                  <div
                    className="absolute text-neutral-2 top-1/2 -translate-y-1/2 right-4 flex items-center cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmShowPassword(!showConfirmPassword);
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

              <button
                disabled={isSubmitting}
                type="submit"
                className={`bg-primary rounded-lg w-full  h-10 flex justify-center items-center gap-2 text-med-button text-white `}
              >
                <p>Continue</p>
                <ArrowRight size="26" color="#FFFFFF" variant="Broken" />
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="flex gap-2 items-center">
        <ArrowLeft size="30" color="#4F4F4F" variant="Broken" />
        <p className="text-reg-caption text-gray-2">Go Back</p>
      </div>
    </div>
  );
};

export default SetPassword;
