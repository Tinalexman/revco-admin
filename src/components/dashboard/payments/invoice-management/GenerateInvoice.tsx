import React, { FC, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Form, Formik } from "formik";
import Dropdown from "@/components/reusable/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  convertDate,
  convertDateWithDayAndMonth,
} from "@/functions/dateFunctions";
import { Calendar } from "iconsax-react";
import {
  useGenerateIndividualInvoice,
  useGenerateNonIndividualInvoice,
} from "@/hooks/paymentHooks";
import {
  useGetMDAs,
  useGetMDAServices,
  useGetProjectHeads,
} from "@/hooks/otherHooks";
import { Loader } from "@mantine/core";
import {
  formatAmountWithCommas,
  formatNumberWithThreesAndFours,
  unformatNumberWithThreesAndFours,
} from "@/functions/numberFunctions";
import InvoiceGenerated from "./InvoiceGenerated";

const GenerateInvoice: FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    loading: loadingGenerateIndividualInvoice,
    generate: generateIndividualInvoice,
    success: generatedIndividualInvoice,
    data: individualInvoice,
  } = useGenerateIndividualInvoice();

  const {
    loading: loadingGenerateNonIndividualInvoice,
    generate: generateNonIndividualInvoice,
    success: generatedNonIndividualInvoice,
    data: nonIndividualInvoice,
  } = useGenerateNonIndividualInvoice();

  const {
    loading: loadingGetMDAs,
    data: mdas,
    success: gottenMDAs,
    getMDA,
  } = useGetMDAs();

  const {
    loading: loadingGetRevenueHeads,
    data: revenueHeads,
    success: gottenRevenueHeads,
    getRevenueHeads,
  } = useGetMDAServices();

  const { data: projectHeads, loading: loadingProjectHeads } =
    useGetProjectHeads();

  const [project, setProject] = useState<string>("");
  const [mdaId, setMDAId] = useState<number>(-1);
  const [revenueId, setRevenueId] = useState<number>(-1);
  const [projectId, setProjectId] = useState<number>(-1);
  const [readOnlyAmount, setReadOnlyAmount] = useState<boolean>(false);

  return (
    <div className="w-full bg-[#FEFEFE] px-5 py-8 flex flex-col items-center gap-6 overflow-y-scroll scrollbar-custom">
      <div className="w-full py-2 flex justify-between items-center">
        <h2 className="text-black font-semibold text-[1.25rem] leading-[1.5rem]">
          Generate New Invoice
        </h2>
        <div
          className="cursor-pointer text-black size-9 grid place-content-center rounded bg-[#F6F6F7]"
          onClick={onClose}
        >
          <IoClose size={24} />
        </div>
      </div>
      {generatedIndividualInvoice || generatedNonIndividualInvoice ? (
        <InvoiceGenerated
          invoice={
            generatedIndividualInvoice
              ? individualInvoice!
              : nonIndividualInvoice!
          }
          onClose={onClose}
        />
      ) : (
        <Formik
          initialValues={{
            customerName: "",
            mda: "",
            email: "",
            phoneNumber: "",
            revenueHead: "",
            customerType: "",
            project: "",
            amount: "",
          }}
          validate={(values) => {
            const errors: any = {};

            if (projectId === -1) {
              errors.projectId = "Required";
            }

            if (!values.customerName) {
              errors.customerName = "Required";
            } else if (values.customerName.split(" ").length < 2) {
              errors.customerName = "First and Last Names are required";
            }

            if (mdaId === -1) {
              errors.mda = "Required";
            }

            if (revenueId === -1) {
              errors.revenueHead = "Required";
            }

            if (!values.customerType) {
              errors.customerType = "Required";
            }

            let v = Number.parseInt(values.amount.replace(/,/g, ""));
            if (isNaN(Number(v))) {
              errors.amount = "Invalid amount";
            } else if (v <= 0) {
              errors.amount = "Amount must be greater than zero";
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(false);
            const names = values.customerName.split(" ");
            if (values.customerType === "Individual") {
              generateIndividualInvoice({
                enumerate: {
                  title: "",
                  dateOfBirth: "",
                  maritalStatus: "",
                  nationality: "",
                  residenceLga: 0,
                  residenceState: 0,
                  residentialAddress: "",
                  occupation: "",
                  officeAddress: "",
                  employerName: "",
                  temporaryTin: "",
                  jtbTin: "",
                  nin: "",
                  customer: {
                    firstName: names[0],
                    lastName: names[1],
                    phone: unformatNumberWithThreesAndFours(values.phoneNumber),
                    email: values.email,
                    role: "individual",
                  },
                },
                invoice: {
                  invoiceAmount: Number.parseInt(
                    values.amount.toString().replace(/,/g, "")
                  ),
                  isAssessment: false,
                  assessmentId: 0,
                  serviceId: revenueId,
                  businessId: 0,
                  mdaId: mdaId,
                  Month: 0,
                  year: "",
                  userId: 0,
                  month: 0,
                  assessment: false,
                },
                projectId,
              });
            } else if (values.customerType === "Non Individual") {
              generateNonIndividualInvoice({
                enumerate: {
                  cacRegNo: "",
                  companyName: "",
                  companyAddress: "",
                  city: "",
                  lgaId: 0,
                  phoneNumber1: "",
                  phoneNumber2: "",
                  email: "",
                  nin: "",
                  website: "",
                  temporaryTin: "",
                  jtbTin: "",
                  companyRegistrationDate: "",
                  companyCommencementDate: "",
                  businessType: "",
                  customer: {
                    firstName: names[0] ?? "",
                    lastName: names[1] ?? "",
                    phone: unformatNumberWithThreesAndFours(values.phoneNumber),
                    email: values.email,
                    role: "non-individual",
                  },
                },
                invoice: {
                  invoiceAmount: Number.parseInt(
                    values.amount.toString().replace(/,/g, "")
                  ),
                  isAssessment: false,
                  assessmentId: 0,
                  serviceId: revenueId,
                  businessId: 0,
                  mdaId: mdaId,
                  Month: 0,
                  year: "",
                  userId: 0,
                  month: 0,
                  assessment: false,
                },
                projectId,
              });
            }
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
              className="w-full flex flex-col gap-6"
              method="POST"
            >
              <div className="flex flex-col gap-0.5 w-full">
                <h3 className="text-reg-caption font-medium text-[#111213]">
                  Customer Name
                </h3>
                <input
                  type="text"
                  name="customerName"
                  value={values.customerName}
                  onChange={handleChange}
                  className="px-4 drawer-input "
                />
                {errors.customerName && touched.customerName && (
                  <p className="text-err">{errors.customerName}</p>
                )}
              </div>

              <div className="flex flex-col gap-0.5 w-full">
                <h3 className="text-reg-caption font-medium text-[#111213]">
                  Customer Email
                </h3>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className="px-4 drawer-input "
                />
                {errors.email && touched.email && (
                  <p className="text-err">{errors.email}</p>
                )}
              </div>

              <div className="flex flex-col gap-0.5 w-full">
                <h3 className="text-reg-caption font-medium text-[#111213]">
                  Customer Phone
                </h3>
                <input
                  type="text"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={(e) => {
                    const res = unformatNumberWithThreesAndFours(
                      e.target.value
                    );
                    if (isNaN(Number(res))) return;
                    setFieldValue(
                      "phoneNumber",
                      formatNumberWithThreesAndFours(res)
                    );
                  }}
                  className="px-4 drawer-input"
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="text-err">{errors.phoneNumber}</p>
                )}
              </div>

              <div className="flex flex-col gap-0.5 w-full">
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
                        getMDA(v.projectId);
                      },
                    }))}
                    loading={loadingProjectHeads}
                    hint="Select Project Type"
                  />
                </div>
                {errors.project && <p className="text-err">{errors.project}</p>}
              </div>

              {projectId !== -1 && (
                <>
                  <div className="flex flex-col gap-0.5 w-full">
                    <h3 className="text-reg-caption font-medium text-[#111213]">
                      Customer Type
                    </h3>
                    <div className="w-full h-10">
                      <Dropdown
                        value={values.customerType}
                        menus={["Individual", "Non Individual"].map((v) => ({
                          name: v,
                          onClick: () => {
                            setFieldValue("customerType", v);
                          },
                        }))}
                        hint="Select Customer Type"
                      />
                    </div>
                    {errors.customerType && (
                      <p className="text-err">{errors.customerType}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-0.5 w-full">
                    <h3 className="text-reg-caption font-medium text-[#111213]">
                      Services
                    </h3>
                    <div className="w-full h-10">
                      <Dropdown
                        value={values.mda}
                        menus={mdas.map((v) => ({
                          name: v.name,
                          onClick: () => {
                            setFieldValue("mda", v.name);
                            getRevenueHeads(projectId, v.id);
                            setMDAId(v.id);
                          },
                        }))}
                        hint="Select MDA"
                        loading={loadingGetMDAs}
                      />
                    </div>
                    {errors.mda && <p className="text-err">{errors.mda}</p>}
                    <div className="w-full h-10 mt-2">
                      <Dropdown
                        value={values.revenueHead}
                        menus={revenueHeads.map((v) => ({
                          name: v.name,
                          onClick: () => {
                            setFieldValue("revenueHead", v.name);
                            setRevenueId(v.id);
                            setFieldValue("amount", `${v.amount}`);
                            setReadOnlyAmount(v.amount !== 0);
                          },
                        }))}
                        hint="Select Revenue Head"
                        loading={loadingGetRevenueHeads}
                      />
                    </div>
                    {errors.revenueHead && (
                      <p className="text-err">{errors.revenueHead}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-0.5 w-full">
                    <h3 className="text-reg-caption font-medium text-[#111213]">
                      Total Amount
                    </h3>
                    <input
                      type="text"
                      name="amount"
                      value={values.amount}
                      onChange={(e) => {
                        const res = e.target.value.replace(/,/g, "");
                        if (!isNaN(Number(res))) {
                          setFieldValue("amount", formatAmountWithCommas(res));
                        }
                      }}
                      readOnly={readOnlyAmount}
                      className="px-4 drawer-input "
                    />
                    {errors.amount && touched.amount && (
                      <p className="text-err">{errors.amount}</p>
                    )}
                  </div>
                </>
              )}

              <div className="w-full flex justify-between items-center mt-10">
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
                  {loadingGenerateIndividualInvoice ||
                  loadingGenerateNonIndividualInvoice ? (
                    <Loader color="white.6" size={24} />
                  ) : (
                    "Generate"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default GenerateInvoice;
