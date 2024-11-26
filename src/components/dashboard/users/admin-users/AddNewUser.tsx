import React, { FC, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Form, Formik } from "formik";
import Dropdown from "@/components/reusable/Dropdown";
import {
  unformatNumberWithThreesAndFours,
  formatNumberWithThreesAndFours,
} from "@/functions/numberFunctions";
import {
  useGetAllUserRoles,
  useGetMDAOffices,
  useGetMDAs,
  useGetProjectHeads,
} from "@/hooks/otherHooks";
import { useCreateUser } from "@/hooks/userHooks";
import { Loader } from "@mantine/core";
import {
  convertRole,
  ROLE_ADMIN,
  ROLE_PROJECT_REPORT,
  ROLE_SUB_ADMIN_1,
} from "@/functions/navigationFunctions";
import { useRevcoUserStore } from "@/stores/userStore";
import { deployedBaseUrl } from "@/api/base";

const TARABA_PROJECT_ID = 1;

const AddNewUser: FC<{ onClose: () => void; onCreate: () => void }> = ({
  onClose,
  onCreate,
}) => {
  const [projectId, setProjectId] = useState<number>(TARABA_PROJECT_ID);
  const [mdaId, setMDAId] = useState<number>(-1);
  const [mdaOfficeId, setMDAOfficeId] = useState<number>(-1);

  const role = useRevcoUserStore((state) => state.role);
  const isAdmin = role === ROLE_ADMIN;

  const { loading: loadingGetMDAs, data: mdas, getMDA } = useGetMDAs();
  const { data: projectHeads, loading: loadingProjectHeads } =
    useGetProjectHeads();
  const {
    data: mdaOffices,
    loading: loadingMDAOffices,
    getMDAOffices,
  } = useGetMDAOffices();
  const { data: userRoles, loading: loadingUserRoles } = useGetAllUserRoles();

  const { loading: loadingCreateUser, createUser, success } = useCreateUser();

  useEffect(() => {
    if (!loadingCreateUser && success) {
      onCreate();
    }
  }, [loadingCreateUser, success]);

  useEffect(() => {
    if (role !== ROLE_ADMIN) getMDA(TARABA_PROJECT_ID);
  }, [role]);

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
          phone: "",
          role: "",
          project: "",
          mda: "",
          mdaOffice: "",
        }}
        validate={(values) => {
          const errors: any = {};
          if (!values.name) errors.name = "Required";
          else if (values.name.split(" ").length < 2)
            errors.name = "First Name and Last Name required";
          if (!values.email) errors.email = "Required";
          if (!values.phone) errors.phone = "Required";
          if (isAdmin && !values.project) errors.project = "Required";
          if (!values.role) {
            errors.role = "Required";
          } else {
            if (
              values.role !== ROLE_SUB_ADMIN_1 &&
              values.role !== ROLE_PROJECT_REPORT
            ) {
              if (!values.mda) errors.mda = "Required";
              if (!values.mdaOffice) errors.mdaOffice = "Required";
            }
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          const names = values.name.split(" ");
          createUser({
            firstName: names[0],
            lastName: names[1],
            email: values.email,
            phone: unformatNumberWithThreesAndFours(values.phone),
            role: values.role,
            userMda:
              values.role === ROLE_PROJECT_REPORT ||
              values.role === ROLE_SUB_ADMIN_1
                ? undefined
                : {
                    mdaId: mdaId,
                    mdaOfficeId: mdaOfficeId,
                    collectionLimit: 5000.0,
                    canCollect: true,
                    permissions: null,
                  },
            project: {
              projectId: isAdmin ? projectId : TARABA_PROJECT_ID,
            },
            forwardTo: `${deployedBaseUrl}/auth/set-password`,
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
                Phone
              </h3>
              <input
                type="tel"
                name="phone"
                value={values.phone}
                onChange={(e) => {
                  const res = unformatNumberWithThreesAndFours(e.target.value);
                  if (isNaN(Number(res))) return;
                  if (res.length > 11) return;
                  setFieldValue("phone", formatNumberWithThreesAndFours(res));
                }}
                placeholder="e.g 080 1234 5678"
                className="px-4 drawer-input "
              />
              {errors.phone && touched.phone && (
                <p className="text-err">{errors.phone}</p>
              )}
            </div>
            <div className="w-full bg-[#F6F6F7] h-10 flex items-center pl-5 mt-4 text-[#595959] text-reg-caption font-medium">
              Account Settings
            </div>

            {isAdmin && (
              <div className="flex flex-col gap-0.5 w-full px-5 mt-4">
                <h3 className="text-reg-caption font-medium text-[#111213]">
                  Project Type
                </h3>
                <div className="w-full h-10">
                  <Dropdown
                    value={values.project}
                    menus={projectHeads.map((v) => ({
                      name: v.projectName,
                      onClick: () => {
                        setFieldValue("project", v.projectName);
                        setProjectId(v.projectId);
                        getMDA(v.projectId);
                      },
                    }))}
                    loading={loadingProjectHeads}
                    hint="Select Project Type"
                  />
                </div>
                {errors.project && <p className="text-err">{errors.project}</p>}
              </div>
            )}

            {(isAdmin && projectId !== -1) ||
              (!isAdmin && (
                <>
                  <div className="flex flex-col gap-0.5 w-full px-5 mt-2">
                    <h3 className="text-reg-caption font-medium text-[#111213]">
                      User Role
                    </h3>
                    <div className="w-full h-10">
                      <Dropdown
                        value={convertRole(values.role)}
                        menus={userRoles.map((v) => ({
                          name: convertRole(v),
                          onClick: () => {
                            setFieldValue("role", v);
                          },
                        }))}
                        loading={loadingUserRoles}
                        hint="Select User Role"
                      />
                    </div>
                    {errors.role && <p className="text-err">{errors.role}</p>}
                  </div>

                  {values.role !== ROLE_SUB_ADMIN_1 &&
                    values.role !== ROLE_PROJECT_REPORT &&
                    values.role !== "" && (
                      <>
                        <div className="flex flex-col gap-0.5 w-full px-5 mt-4">
                          <h3 className="text-reg-caption font-medium text-[#111213]">
                            MDA/Organization
                          </h3>
                          <div className="w-full h-10">
                            <Dropdown
                              value={values.mda}
                              menus={mdas.map((v) => ({
                                name: v.name,
                                onClick: () => {
                                  setFieldValue("mda", v.name);
                                  setMDAId(v.id);
                                  getMDAOffices(v.id);
                                },
                              }))}
                              hint="Select MDA/Organization"
                              loading={loadingGetMDAs}
                            />
                          </div>
                          {errors.mda && (
                            <p className="text-err">{errors.mda}</p>
                          )}
                        </div>

                        <div className="flex flex-col gap-0.5 w-full px-5 mt-4">
                          <h3 className="text-reg-caption font-medium text-[#111213]">
                            Office/Branch
                          </h3>
                          <div className="w-full h-10">
                            <Dropdown
                              value={values.mdaOffice}
                              menus={mdaOffices.map((v) => ({
                                name: v.name,
                                onClick: () => {
                                  setFieldValue("mdaOffice", v.name);
                                  setMDAOfficeId(v.id);
                                },
                              }))}
                              hint="Select Office/Branch"
                              loading={loadingMDAOffices}
                            />
                          </div>
                          {errors.mdaOffice && (
                            <p className="text-err">{errors.mdaOffice}</p>
                          )}
                        </div>
                      </>
                    )}
                </>
              ))}

            <div className="w-full flex justify-between items-center px-5 mt-10 mb-24">
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
                {loadingCreateUser ? (
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

export default AddNewUser;
