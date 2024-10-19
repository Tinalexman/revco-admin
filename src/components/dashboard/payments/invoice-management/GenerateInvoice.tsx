import React, { FC } from "react";
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

interface iCreateInvoice {
  customerName: string;
  mda: string;
  revenueHead: string;
  amount: number;
  dueDate: string;
}

const GenerateInvoice: FC<{ onClose: () => void }> = ({ onClose }) => {
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
      <Formik
        initialValues={{
          customerName: "",
          mda: "",
          revenueHead: "",
          amount: 0,
          dueDate: new Date().toISOString().split("T")[0],
        }}
        validate={(values) => {
          const errors: Partial<iCreateInvoice> = {};

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          // fn(values, (val: any) => {
          //   setSubmitting(false);
          //   if (val) {
          //     setTimeout(() => {
          //       window.location.replace("/dashboard/make-payment");
          //     }, 500);
          //   }
          // });
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
                Invoice Number
              </h3>
              <input
                type="text"
                value={"Autogenerated"}
                className="px-4 drawer-input"
                readOnly
              />
            </div>

            <div className="flex flex-col gap-0.5 w-full">
              <h3 className="text-reg-caption font-medium text-[#111213]">
                Services
              </h3>
              <div className="w-full h-10">
                <Dropdown
                  value={values.mda}
                  menus={[].map((v) => ({
                    name: v,
                    onClick: () => {
                      setFieldValue("mda", v);
                    },
                  }))}
                  hint="Select MDA"
                />
              </div>
              {errors.mda && <p className="text-err">{errors.mda}</p>}
              <div className="w-full h-10 mt-2">
                <Dropdown
                  value={values.revenueHead}
                  menus={[].map((v) => ({
                    name: v,
                    onClick: () => {
                      setFieldValue("revenueHead", v);
                    },
                  }))}
                  hint="Select Revenue Head"
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
                onChange={handleChange}
                readOnly
                className="px-4 drawer-input "
              />
              {errors.amount && touched.amount && (
                <p className="text-err">{errors.amount}</p>
              )}
            </div>

            <div className="flex flex-col gap-0.5 w-full">
              <h3 className="text-reg-caption font-medium text-[#111213]">
                Due Date
              </h3>
              <DatePicker
                selected={new Date(values.dueDate)}
                onChange={(dates) => {
                  if (dates) {
                    setFieldValue(
                      "dueDate",
                      dates[0].toISOString().split("T")[0]
                    );
                  }
                }}
                selectsMultiple={true}
                dateFormat="MMMM d, yyyy"
                customInput={
                  <div className="w-full h-10 relative">
                    <input
                      type="text"
                      name="amount"
                      value={convertDate(values.dueDate)}
                      onChange={handleChange}
                      readOnly
                      className="px-4 drawer-input h-full"
                    />
                    <Calendar
                      className="absolute top-1/2 -translate-y-1/2 right-2 text-gray-2"
                      size={20}
                    />
                  </div>
                }
              />

              {errors.dueDate && touched.dueDate && (
                <p className="text-err">{errors.dueDate}</p>
              )}
            </div>

            <div className="w-full flex justify-between items-center mt-10">
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
                Generate
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GenerateInvoice;
