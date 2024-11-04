import React, { FC, useEffect } from "react";
import { Drawer, Loader } from "@mantine/core";
import { IoClose } from "react-icons/io5";
import { useFormik } from "formik";
import Dropdown from "@/components/reusable/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "iconsax-react";
import { convertDateWithDayAndMonth } from "@/functions/dateFunctions";
import { useCreateReport, useGetReportTypes } from "@/hooks/reportHooks";
import toast from "react-hot-toast";

interface iCreateReport {
  name: string;
  type: string;
  startDate: string;
  endDate: string;
}

const CreateReport: FC<{ create: () => void; close: () => void }> = ({
  create,
  close,
}) => {
  const { loading: loadingTypes, data: reportTypes } = useGetReportTypes();
  const {
    loading: loadingCreateReport,
    createReport,
    success,
  } = useCreateReport();

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik<iCreateReport>({
      initialValues: {
        name: "",
        type: "",
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date().toISOString().split("T")[0],
      },
      validate: (values) => {
        const errors: Partial<iCreateReport> = {};
        if (!values.name) errors.name = "Required";
        if (!values.type) errors.type = "Required";
        return errors;
      },
      onSubmit: (values, { setSubmitting }) => {
        setSubmitting(false);
        createReport({
          from: values.startDate,
          to: values.endDate,
          reportName: values.name,
          reportTypes: values.type,
        });
      },
    });

  const handleStartDateChange = (dates: Date[] | null) => {
    if (dates) {
      const startDate = new Date(dates[0]);
      const endDate = new Date(values.endDate);

      if (startDate > endDate) {
        toast.error("Start date cannot be after the end date");
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
        toast.error("End date cannot be before the start date");
        return;
      }

      setFieldValue("endDate", endDate.toISOString().split("T")[0]);
    }
  };

  useEffect(() => {
    if (!loadingCreateReport && success) {
      create();
    }
  }, [loadingCreateReport, success]);

  return (
    <Drawer.Root
      opened={true}
      onClose={close}
      position="right"
      padding={0}
      top={0}
      radius={12}
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Body>
          <div className="w-full bg-white flex flex-col p-6 gap-6 overflow-y-auto scrollbar-custom">
            <div className="w-full py-2 flex justify-between items-center">
              <h2 className="text-black font-semibold text-[1.25rem] leading-[1.5rem]">
                Create New Report
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
                    menus={reportTypes.map((v) => ({
                      name: v,
                      onClick: () => {
                        setFieldValue("type", v);
                      },
                    }))}
                    loading={loadingTypes}
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
                  type="submit"
                  className="text-white w-[48%] bg-primary h-10 flex justify-center gap-2 items-center rounded-lg"
                >
                  {loadingCreateReport ? (
                    <Loader color="white.6" size={24} />
                  ) : (
                    "Generate"
                  )}
                </button>
              </div>
            </form>
          </div>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};

export default CreateReport;
