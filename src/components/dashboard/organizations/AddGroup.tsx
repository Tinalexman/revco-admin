import React, { FC, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Form, Formik } from "formik";
import Dropdown from "@/components/reusable/Dropdown";
import CustomCheckbox from "@/components/reusable/CustomCheckbox";
import { useCreateOrganization } from "@/hooks/organizationHooks";
import {
  useGetOrganizationServiceTypes,
  useGetOrganizationGroups,
  useGetProjectHeads,
} from "@/hooks/otherHooks";
import { Loader } from "@mantine/core";

const AddGroup: FC<{ onClose: () => void; onCreated: () => void }> = ({
  onClose,
  onCreated,
}) => {
  const [project, setProject] = useState<string>("");
  const [projectId, setProjectId] = useState<number>(-1);

  const {
    loading: loadingCreateOrganization,
    createOrganization,
    success,
  } = useCreateOrganization();
  const { loading: loadingServiceTypes, data: serviceTypes } =
    useGetOrganizationServiceTypes();
  const { loading: loadingGroups, data: groups } = useGetOrganizationGroups();
  const { data: projectHeads, loading: loadingProjectHeads } =
    useGetProjectHeads();

  useEffect(() => {
    if (!loadingCreateOrganization && success) {
      onCreated();
    }
  }, [loadingCreateOrganization, success]);

  return (
    <div className="w-full bg-[#FEFEFE] pt-8 pb-12 flex flex-col items-center gap-6 overflow-y-scroll scrollbar-custom">
      <div className="w-full px-5 py-2 flex justify-between items-center">
        <h2 className="text-black font-semibold text-[1.25rem] leading-[1.5rem]">
          New Organization
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
          serviceType: "",
          mdaCode: "",
          abbreviation: "",
          groupType: "",
          project: "",
        }}
        validate={(values) => {
          const errors: any = {};

          if (!values.name) {
            errors.name = "Required";
          }

          if (!values.serviceType) {
            errors.serviceType = "Required";
          }

          if (!values.groupType) {
            errors.groupType = "Required";
          }

          if (!values.abbreviation) {
            errors.abbreviation = "Required";
          }

          if (projectId === -1) {
            errors.project = "Required";
          }

          if (!values.mdaCode) {
            errors.mdaCode = "Required";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          createOrganization({
            abbreviation: values.abbreviation,
            name: values.name,
            businessServiceType: values.serviceType,
            groupType: values.groupType,
            businessId: projectId,
            isRetaining: false,
            isRetainingByPercentage: false,
            mdaCode: values.mdaCode,
            retainingValue: 0,
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
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
                placeholder="e.g Bank of Nigeria"
                className="px-4 drawer-input"
              />
              {errors.name && touched.name && (
                <p className="text-err">{errors.name}</p>
              )}
            </div>
            <div className="flex flex-col gap-0.5 w-full px-5 mt-4">
              <h3 className="text-reg-caption font-medium text-[#111213]">
                Abbreviation
              </h3>
              <input
                type="text"
                name="abbreviation"
                value={values.abbreviation}
                onChange={handleChange}
                placeholder="e.g BON"
                className="px-4 drawer-input"
              />
              {errors.abbreviation && touched.abbreviation && (
                <p className="text-err">{errors.abbreviation}</p>
              )}
            </div>

            <div className="flex flex-col gap-0.5 w-full px-5 mt-4">
              <h3 className="text-reg-caption font-medium text-[#111213]">
                MDA Code
              </h3>
              <input
                type="text"
                name="mdaCode"
                value={values.mdaCode}
                onChange={handleChange}
                placeholder="e.g XXXXXXXXX"
                className="px-4 drawer-input"
              />
              {errors.mdaCode && touched.mdaCode && (
                <p className="text-err">{errors.mdaCode}</p>
              )}
            </div>

            <div className="flex flex-col gap-0.5 w-full px-5 mt-4">
              <h3 className="text-reg-caption font-medium text-[#111213]">
                Project Type
              </h3>
              <div className="w-full h-10">
                <Dropdown
                  value={project}
                  menus={projectHeads.map((v) => ({
                    name: v.projectName,
                    onClick: () => {
                      setProject(v.projectName);
                      setProjectId(v.projectId);
                    },
                  }))}
                  loading={loadingProjectHeads}
                  hint="Select Project Type"
                />
              </div>
              {errors.project && <p className="text-err">{errors.project}</p>}
            </div>

            <div className="flex flex-col gap-0.5 w-full px-5 mt-4">
              <h3 className="text-reg-caption font-medium text-[#111213]">
                Service Type
              </h3>
              <div className="w-full h-10">
                <Dropdown
                  value={values.serviceType}
                  menus={serviceTypes.map((v) => ({
                    name: v,
                    onClick: () => {
                      setFieldValue("serviceType", v);
                    },
                  }))}
                  hint="Select Service Type"
                  loading={loadingServiceTypes}
                />
              </div>
              {errors.serviceType && (
                <p className="text-err">{errors.serviceType}</p>
              )}
            </div>

            <div className="flex flex-col gap-0.5 w-full px-5 mt-4">
              <h3 className="text-reg-caption font-medium text-[#111213]">
                Group Type
              </h3>
              <div className="w-full h-10">
                <Dropdown
                  value={values.groupType}
                  menus={groups.map((v) => ({
                    name: v.groupType,
                    onClick: () => {
                      setFieldValue("groupType", v.groupType);
                    },
                  }))}
                  hint="Select Group Type"
                  loading={loadingGroups}
                />
              </div>
              {errors.groupType && (
                <p className="text-err">{errors.groupType}</p>
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
                {loadingCreateOrganization ? (
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

export default AddGroup;
