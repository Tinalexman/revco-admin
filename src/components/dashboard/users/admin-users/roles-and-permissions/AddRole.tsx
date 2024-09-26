import React, { FC, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Form, Formik } from "formik";
import CustomCheckbox from "@/components/reusable/CustomCheckbox";

interface iAddRole {
  name: string;
  description: string;
}

const AddRole: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [permissions, setPermissions] = useState<string[]>([]);
  const allPermissions: string[] = [
    "Access Dashboard",
    "Make Payments",
    "View Reports",
    "View Transactions",
    "Edit Transactions",
    "View Tickets",
    "Respond To Tickets",
    "View Logs",
    "Generate Reports",
  ];

  return (
    <div className="w-full h-[100vh] bg-[#FEFEFE] px-5 pt-8 pb-12 flex flex-col items-center gap-6 overflow-y-scroll scrollbar-custom">
      <div className="w-full py-2 flex justify-between items-center">
        <h2 className="text-black font-semibold text-[1.25rem] leading-[1.5rem]">
          Add New Role
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
          description: "",
        }}
        validate={(values) => {
          const errors: Partial<iAddRole> = {};

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
            className="w-full flex flex-col gap-6"
            method="POST"
          >
            <div className="flex flex-col gap-0.5 w-full">
              <h3 className="text-reg-caption font-medium text-[#111213]">
                Role Name
              </h3>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                className="px-4 drawer-input"
              />
              {errors.name && touched.name && (
                <p className="text-err">{errors.name}</p>
              )}
            </div>
            <div className="flex flex-col gap-0.5 w-full">
              <h3 className="text-reg-caption font-medium text-[#111213]">
                Description
              </h3>
              <input
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
                className="px-4 drawer-input "
              />
              {errors.description && touched.description && (
                <p className="text-err">{errors.description}</p>
              )}
            </div>

            <div className="w-full flex flex-col gap-2">
              <div className="flex w-full justify-between items-center">
                <h3 className="text-reg-caption font-medium text-[#111213]">
                  Permissions
                </h3>
                <div className="flex w-fit gap-1 items-center">
                  <h4 className="text-reg-body-2 text-[#3A3A3A]">Select All</h4>
                  <CustomCheckbox
                    value={permissions.length === allPermissions.length}
                    onChange={() => {
                      if (permissions.length === allPermissions.length) {
                        setPermissions([]);
                      } else {
                        setPermissions(allPermissions);
                      }
                    }}
                  />
                </div>
              </div>
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
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRole;
