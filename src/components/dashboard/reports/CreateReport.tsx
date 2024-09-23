import React, { FC } from "react";
import { Modal } from "@mantine/core";
import { IoClose } from "react-icons/io5";
import { useFormik } from "formik";
import Dropdown from "@/components/reusable/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "iconsax-react";
import { convertDateWithDayAndMonth } from "@/functions/dateFunctions";

interface iCreateReport {
  name: string;
  type: string;
  startDate: string;
  endDate: string;
}

const CreateReport: FC<{ close: () => void }> = ({ close }) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    isValid,
    setSubmitting,
    setFieldValue,
  } = useFormik<iCreateReport>({
    initialValues: {
      name: "",
      type: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
    },
    validate: (values) => {},
    onSubmit: (values, { setSubmitting }) => {},
  });

  const handleStartDateChange = (dates: Date[] | null) => {
    if (dates) {
      const startDate = new Date(dates[0]);
      const endDate = new Date(values.endDate);

      if (startDate > endDate) {
        // toast.error("Start date cannot be after the end date");
        return;
      }

      setFieldValue("startDate", startDate.toISOString().split("T")[0]);
    }
  };

  const handleEndDateChange = (dates: Date[] | null) => {
    if (dates) {
      const endDate = new Date(dates[0]);
      const startDate = new Date(values.startDate);

      if (endDate < startDate) {
        // toast.error("End date cannot be before the start date");
        return;
      }

      setFieldValue("endDate", endDate.toISOString().split("T")[0]);
    }
  };

  return (
    <Modal.Root
      opened={true}
      onClose={close}
      centered
      padding={0}
      top={0}
      radius={12}
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Body>
          <div className="w-full bg-white flex flex-col p-6 gap-6 overflow-y-auto scrollbar-custom">
            <div className="w-full py-2 flex justify-between items-center">
              <h2 className="text-black font-semibold text-[1.25rem] leading-[1.5rem]">
                Create New Ticket
              </h2>
              <div
                className="cursor-pointer text-black size-9 grid place-content-center rounded bg-[#F6F6F7]"
                onClick={close}
              >
                <IoClose size={24} />
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-6"
              method="POST"
            >
              <div className="flex flex-col gap-0.5 w-full">
                <h3 className="text-reg-caption font-medium text-[#111213]">
                  Report Name
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
                  Report Type
                </h3>
                <div className="w-full h-10">
                  <Dropdown
                    value={values.type}
                    menus={["Transaction", "Payment", "Refund"].map((v) => ({
                      name: v,
                      onClick: () => {
                        setFieldValue("type", v);
                      },
                    }))}
                    hint="Select Report Type"
                  />
                </div>
                {errors.type && <p className="text-err">{errors.type}</p>}
              </div>

              <div className="flex flex-col gap-0.5 w-full">
                <h3 className="text-reg-caption font-medium text-[#111213]">
                  Date Range
                </h3>
                <div className="w-full h-14 grid grid-cols-2 gap-2">
                  <DatePicker
                    selected={new Date(values.startDate)}
                    onChange={handleStartDateChange}
                    selectsMultiple={true}
                    dateFormat="MMMM d, yyyy"
                    customInput={
                      <div className="outline-none focus:ring-2 focus:ring-purple-300 border border-gray-4 rounded-lg flex items-center justify-between w-full h-10 px-4 cursor-pointer text-[0.815rem] leading-[0.975rem]">
                        <h3>From: </h3>
                        <span className="text-[#16192C] font-medium">
                          {convertDateWithDayAndMonth(values.startDate)}
                        </span>
                        <Calendar className="ml-1" size="16" color="#16192C" />
                      </div>
                    }
                  />
                  <DatePicker
                    selected={new Date(values.endDate)}
                    onChange={handleEndDateChange}
                    selectsMultiple={true}
                    dateFormat="MMMM d, yyyy"
                    customInput={
                      <div className="outline-none focus:ring-2 focus:ring-purple-300 border border-gray-4 rounded-lg flex items-center justify-between w-full h-10 px-4 cursor-pointer text-[0.815rem] leading-[0.975rem]">
                        <h3>To: </h3>
                        <span className="text-[#16192C] font-medium">
                          {convertDateWithDayAndMonth(values.endDate)}
                        </span>
                        <Calendar className="ml-1" size="16" color="#16192C" />
                      </div>
                    }
                  />
                </div>
              </div>

              <div className="w-full flex justify-between items-center">
                <button
                  onClick={close}
                  className="text-[#E94410] w-[48%] border-2 border-[#F6F6F7] h-10 flex justify-center gap-2 items-center rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={close}
                  className="text-white w-[48%] bg-primary h-10 flex justify-center gap-2 items-center rounded-lg"
                >
                  Generate
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default CreateReport;
