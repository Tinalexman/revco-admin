"use client";

import React, { useState, Suspense, useEffect } from "react";
import Image from "next/image";
import Logo from "@/assets/Revco.svg";

import { Form, Formik } from "formik";
import { Loader } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { ArrowRight } from "iconsax-react";
import BackButton from "@/components/reusable/BackButton";
import { useResetPassword } from "@/hooks/authHooks";

const SetPassword = () => {
  return (
    <Suspense fallback={<Loader color="primary.6" />}>
      <SetPasswordContent />
    </Suspense>
  );
};

const SetPasswordContent = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setConfirmShowPassword] =
    useState<boolean>(false);

  const { success, loading, reset } = useResetPassword();

  useEffect(() => {
    if (success && !loading) {
      router.replace("/auth/login");
    }
  }, [success, loading]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code === null) {
      router.back();
    }
  }, [code]);

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
        <h1 className="text-med-h5 text-gray-2">Set Password</h1>
        <Formik
          initialValues={{
            confirmPassword: "",
            password: "",
          }}
          validate={(values) => {
            const errors: any = {};

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
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            reset({
              password: values.password,
              confirmPassword: values.confirmPassword,
              resetCode: code!,
            });
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
                className={`bg-[#6500E0] rounded-lg w-full h-10 flex justify-center items-center gap-2 text-med-button text-white `}
              >
                {loading ? (
                  <Loader color="white.6" size={24} />
                ) : (
                  <>
                    <p>Continue</p>
                    <ArrowRight size="26" color="#FFFFFF" variant="Broken" />
                  </>
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

export default SetPassword;
