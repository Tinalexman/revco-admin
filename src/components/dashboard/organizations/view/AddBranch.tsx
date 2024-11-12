import React, { FC, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Form, Formik } from "formik";
import { useCreateOrganizationBranch } from "@/hooks/organizationHooks";
import { Loader } from "@mantine/core";

const AddBranch: FC<{
  mdaId: number;
  onClose: () => void;
  onCreated: () => void;
}> = ({ onClose, onCreated, mdaId }) => {
  const {
    loading: loadingCreateBranch,
    createBranch,
    success,
  } = useCreateOrganizationBranch();

  useEffect(() => {
    if (!loadingCreateBranch && success) {
      onCreated();
    }
  }, [loadingCreateBranch, success]);

  return (
    <div className="w-full bg-[#FEFEFE] pt-8 pb-12 flex flex-col items-center gap-6 overflow-y-scroll scrollbar-custom">
      <div className="w-full px-5 py-2 flex justify-between items-center">
        <h2 className="text-black font-semibold text-[1.25rem] leading-[1.5rem]">
          New Branch
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
          officeCode: "",
        }}
        validate={(values) => {
          const errors: any = {};

          if (!values.name) {
            errors.name = "Required";
          }

          if (!values.officeCode) {
            errors.officeCode = "Required";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          createBranch({
            isHq: false,
            name: values.name,
            officeCode: values.officeCode,
            mdaId,
          });
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="w-full flex flex-col"
            method="POST"
          >
            <div className="flex flex-col gap-0.5 w-full px-5 mt-2">
              <h3 className="text-reg-caption font-medium text-[#111213]">
                Name
              </h3>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="e.g Bank of Nigeria Branch"
                className="px-4 drawer-input"
              />
              {errors.name && touched.name && (
                <p className="text-err">{errors.name}</p>
              )}
            </div>

            <div className="flex flex-col gap-0.5 w-full px-5 mt-4">
              <h3 className="text-reg-caption font-medium text-[#111213]">
                Office Code
              </h3>
              <input
                type="text"
                name="officeCode"
                value={values.officeCode}
                onChange={handleChange}
                placeholder="e.g XXXXXXXXX"
                className="px-4 drawer-input"
              />
              {errors.officeCode && touched.officeCode && (
                <p className="text-err">{errors.officeCode}</p>
              )}
            </div>

            <div className="w-full flex justify-between items-center px-5 mt-10">
              <button
                onClick={onClose}
                className="text-[#E94410] w-[48%] border-2 border-[#F6F6F7] h-10 flex justify-center gap-2 items-center rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-white w-[48%] bg-primary h-10 flex justify-center gap-2 items-center rounded-lg"
              >
                {loadingCreateBranch ? (
                  <Loader color="white.6" size={24} />
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBranch;
