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
import { LuMail } from "react-icons/lu";
interface iManualLoginPayload {
  email: string;
}

const ResetPassword = () => {
  const [sent, hasSent] = useState<boolean>(false);

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
        <h1 className="text-med-h5 text-gray-2">
          {sent ? "Reset Link Sent" : "Reset Password"}
        </h1>
        <Formik
          initialValues={{
            email: "",
          }}
          validate={(values) => {
            const errors: Partial<iManualLoginPayload> = {};

            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
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
            hasSent(true);
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
                <h3 className="text-reg-caption text-gray-2">Email</h3>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g test@mail.com"
                  value={values.email}
                  onChange={handleChange}
                  readOnly={sent}
                  className="w-full auth-input"
                />
                {errors.email && touched.email && (
                  <p className="text-err">{errors.email}</p>
                )}
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                className={`bg-primary rounded-lg w-full  h-10 flex justify-center items-center gap-2 text-med-button text-white `}
              >
                {sent ? (
                  <>
                    <p>Check Mailbox</p>
                    <LuMail size="26" color="#FFFFFF" />
                  </>
                ) : (
                  <>
                    <p>Send Reset Link</p>
                    <ArrowRight size="26" color="#FFFFFF" variant="Broken" />
                  </>
                )}
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

export default ResetPassword;
