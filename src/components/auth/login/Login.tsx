"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/Revco.svg";

import { Form, Formik } from "formik";
import { Loader } from "@mantine/core";

import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { ArrowRight } from "iconsax-react";
import CustomCheckbox from "@/components/reusable/CustomCheckbox";

import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/authHooks";

interface iManualLoginPayload {
  username: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);
  const { success, loading, login } = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (success && !loading) {
      router.replace("/dashboard/overview");
    }
  }, [success, loading]);

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
        <h1 className="text-med-h5 text-gray-2">Welcome Back,</h1>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validate={(values) => {
            const errors: Partial<iManualLoginPayload> = {};
            if (!values.username) {
              errors.username = "Required";
            }

            if (!values.password) {
              errors.password = "Required";
            }
            // } else if (values.password.length < 8) {
            //   errors.password = "Password must be at least 8 characters long";
            // } else if (!/[A-Z]/.test(values.password)) {
            //   errors.password =
            //     "Password must contain at least one uppercase letter";
            // } else if (!/[a-z]/.test(values.password)) {
            //   errors.password =
            //     "Password must contain at least one lowercase letter";
            // } else if (!/[0-9]/.test(values.password)) {
            //   errors.password = "Password must contain at least one number";
            // } else if (
            //   !/[!@#$%^&*()_+\-=\[\]{}|;':"\\/?]/.test(values.password)
            // ) {
            //   errors.password = "Password must contain at least one symbol";
            // }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(false);
            login(values);
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
                <h3 className="text-reg-caption text-gray-2">Username</h3>
                <input
                  type="text"
                  name="username"
                  placeholder="e.g admin"
                  value={values.username}
                  onChange={handleChange}
                  className="w-full auth-input"
                />
                {errors.username && touched.username && (
                  <p className="text-err">{errors.username}</p>
                )}
              </div>

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
              <div className="flex w-fit gap-2 items-center">
                <CustomCheckbox
                  value={remember}
                  onChange={() => setRemember(!remember)}
                />
                <h3 className="text-reg-caption text-gray-2">Remember Me</h3>
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className={`bg-primary rounded-lg w-full  h-10 flex justify-center items-center gap-2 text-med-button text-white `}
              >
                {loading ? (
                  <Loader color="white.6" size={24} />
                ) : (
                  <>
                    <p>Log in</p>
                    <ArrowRight size="26" color="#FFFFFF" variant="Broken" />
                  </>
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <Link
        href={"/auth/reset-password"}
        className="text-reg-caption text-gray-2"
      >
        Lost Password?
      </Link>
    </div>
  );
};

export default Login;
