"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import Logo from "@/assets/Revco.svg";

import { Form, Formik } from "formik";
import { Loader } from "@mantine/core";

import { ArrowLeft, ArrowRight } from "iconsax-react";
import { LuMail } from "react-icons/lu";
import { useForgotPassword } from "@/hooks/authHooks";
import BackButton from "@/components/reusable/BackButton";

interface iManualLoginPayload {
  email: string;
}

const ResetPassword = () => {
  const { success, loading, forgot } = useForgotPassword();
  const [sent, hasSent] = useState<boolean>(false);



  useEffect(() => {
    if (!loading && success) {
      hasSent(true);
    }

  }, [loading, success])




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
            if (!sent) {
              setSubmitting(false);
              forgot(values.email)
            }

          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
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
                  <div className="w-full h-full grid place-content-center">
                    {
                      loading ? <Loader color="white.6" size={24} /> : <div className="w-fit gap-2 flex items-center"><p>Send Reset Link</p>
                        <ArrowRight size="26" color="#FFFFFF" variant="Broken" /> </div>
                    }
                  </div>
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <BackButton color="#4F4F4F" text="Go Back" />
    </div>
  );
};

export default ResetPassword;
