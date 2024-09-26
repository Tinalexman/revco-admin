import React, { FC, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Switch } from "@mantine/core";
import { Form, Formik } from "formik";
import Dropdown from "@/components/reusable/Dropdown";
import CustomCheckbox from "@/components/reusable/CustomCheckbox";

interface iAddUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

const AddNewUser: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [permissions, setPermissions] = useState<string[]>([]);
  const allPermissions: string[] = [
    "Access Dashboard",
    "Make Payments",
    "View Reports",
  ];

  return (
    <div className="w-full bg-[#FEFEFE] pt-8 pb-12 flex flex-col items-center gap-6 overflow-y-scroll scrollbar-custom">
      <div className="w-full px-5 py-2 flex justify-between items-center">
        <h2 className="text-black font-semibold text-[1.25rem] leading-[1.5rem]">
          New User
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
          name: "",
          email: "",
          password: "",
          role: "",
        }}
        validate={(values) => {
          const errors: Partial<iAddUser> = {};

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
                  menus={[
                    "Board Chairman",
                    "Revenue Staff",
                    "Bank Staff",
                    "State Governor",
                  ].map((v) => ({
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
            <div className="w-full bg-[#F6F6F7] h-10 flex items-center pl-5 mt-4 text-[#595959] text-reg-caption font-medium">
              Permissions
            </div>
            <div className="px-5 mt-2 flex flex-col gap-2">
              {allPermissions.map((permission, i) => {
                const isSelected: boolean =
                  permissions.indexOf(permission) !== -1;

                return (
                  <div
                    key={i}
                    className="w-full flex py-1 px-2 items-center justify-between"
                  >
                    <p className="text-reg-body-2 text-[#3A3A3A]">
                      {permission}
                    </p>
                    <CustomCheckbox
                      value={isSelected}
                      onChange={() => {
                        if (isSelected) {
                          setPermissions(
                            permissions.filter((p) => p !== permission)
                          );
                        } else {
                          setPermissions([...permissions, permission]);
                        }
                      }}
                    />
                  </div>
                );
              })}
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
                Send Invite
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNewUser;
