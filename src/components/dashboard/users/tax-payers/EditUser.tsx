import React, { FC, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Switch } from "@mantine/core";
import { Form, Formik } from "formik";
import Dropdown from "@/components/reusable/Dropdown";
import CustomCheckbox from "@/components/reusable/CustomCheckbox";
import { iUserData } from "./UserList";

const EditUser: FC<{ user: iUserData; onClose: () => void }> = ({
  user,
  onClose,
}) => {
  return (
    <div className="w-full bg-[#FEFEFE] pt-8 pb-12 flex flex-col items-center gap-6 overflow-y-scroll scrollbar-custom">
      <div className="w-full px-5 py-2 flex justify-between items-center">
        <h2 className="text-black font-semibold text-[1.25rem] leading-[1.5rem]">
          Edit Tax Payer
        </h2>
        <div
          className="cursor-pointer text-black size-9 grid place-content-center rounded bg-[#F6F6F7]"
          onClick={onClose}
        >
          <IoClose size={24} />
        </div>
      </div>
      <Formik
        initialValues={{
          name: user.name,
          email: user.email,
          phone: user.phoneNumber,
          address: "",
          password: "",
          role: user.userType,
        }}
        validate={(values) => {
          const errors: any = {};

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => { }}
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
          setFieldValue,
        }) => (
          <Form
            onSubmit={handleSubmit}
            className="w-full flex flex-col"
            method="POST"
          >
            <div className="w-full bg-[#F6F6F7] h-10 flex items-center pl-5 text-[#595959] text-reg-caption font-medium">
              Personal Information
            </div>
            <div className="flex flex-col gap-0.5 w-full px-5 mt-2">
              <h3 className="text-reg-caption font-medium text-[#111213]">
                Name
              </h3>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="e.g John Doe"
                className="px-4 drawer-input"
              />
              {errors.name && touched.name && (
                <p className="text-err">{errors.name}</p>
              )}
            </div>
            <div className="flex flex-col gap-0.5 w-full px-5 mt-4">
              <h3 className="text-reg-caption font-medium text-[#111213]">
                Email
              </h3>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="e.g johndoe@mail.com"
                className="px-4 drawer-input "
              />
              {errors.email && touched.email && (
                <p className="text-err">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-col gap-0.5 w-full px-5 mt-4">
              <h3 className="text-reg-caption font-medium text-[#111213]">
                Phone Number
              </h3>
              <input
                type="tel"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                placeholder="e.g 09012345678"
                className="px-4 drawer-input "
              />
              {errors.phone && touched.phone && (
                <p className="text-err">{errors.phone}</p>
              )}
            </div>
            <div className="w-full bg-[#F6F6F7] h-10 flex items-center pl-5 mt-4 text-[#595959] text-reg-caption font-medium">
              Account Settings
            </div>

            <div className="flex flex-col gap-0.5 w-full px-5 mt-4">
              <h3 className="text-reg-caption font-medium text-[#111213]">
                Password
              </h3>
              <div className="w-full flex gap-1">
                <div className="flex flex-col gap-0.5 w-full">
                  <input
                    type="text"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="*********"
                    className="px-4 drawer-input "
                  />
                  {errors.password && touched.password && (
                    <p className="text-err">{errors.password}</p>
                  )}
                </div>
                <button className="text-white w-[250px] text-reg-caption bg-[#EB5757] h-10 flex justify-center gap-2 items-center rounded-lg">
                  Generate Password
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-0.5 w-full px-5 mt-2">
              <h3 className="text-reg-caption font-medium text-[#111213]">
                User Role
              </h3>
              <div className="w-full h-10">
                <Dropdown
                  value={values.role}
                  menus={["Individual", "Corporate"].map((v) => ({
                    name: v,
                    onClick: () => {
                      setFieldValue("role", v);
                    },
                  }))}
                  hint="Select User Role"
                />
              </div>
              {errors.role && <p className="text-err">{errors.role}</p>}
            </div>

            <div className="w-full flex justify-between items-center px-5 mt-10">
              <button
                onClick={onClose}
                className="text-[#E94410] w-[48%] border-2 border-[#F6F6F7] h-10 flex justify-center gap-2 items-center rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="text-white w-[48%] bg-primary h-10 flex justify-center gap-2 items-center rounded-lg"
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditUser;
