import React, { FC } from "react";
import { Modal } from "@mantine/core";
import { IoClose } from "react-icons/io5";
import { Form, Formik } from "formik";
import Dropdown from "@/components/reusable/Dropdown";

interface iCreateTicket {
  username: string;
  description: string;
  category: string;
  priority: string;
  agent: string;
}

const CreateNewTicket: FC<{ close: () => void }> = ({ close }) => {
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
            <Formik
              initialValues={{
                username: "",
                description: "",
                category: "",
                priority: "",
                agent: "",
              }}
              validate={(values) => {
                const errors: Partial<iCreateTicket> = {};

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
                      User Name
                    </h3>
                    <input
                      type="text"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      className="px-4 drawer-input "
                    />
                    {errors.username && touched.username && (
                      <p className="text-err">{errors.username}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-0.5 w-full">
                    <h3 className="text-reg-caption font-medium text-[#111213]">
                      Issue Description
                    </h3>
                    <textarea
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      className="p-4 drawer-textarea"
                    />
                    {errors.description && touched.description && (
                      <p className="text-err">{errors.description}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-0.5 w-full">
                    <h3 className="text-reg-caption font-medium text-[#111213]">
                      Category
                    </h3>
                    <div className="w-full h-10">
                      <Dropdown
                        value={values.category}
                        menus={[
                          "Payment Issue",
                          "Account Issue",
                          "Technical Issue",
                        ].map((v) => ({
                          name: v,
                          onClick: () => {
                            setFieldValue("category", v);
                          },
                        }))}
                        hint="Select Category"
                      />
                    </div>
                    {errors.category && (
                      <p className="text-err">{errors.category}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-0.5 w-full">
                    <h3 className="text-reg-caption font-medium text-[#111213]">
                      Priority
                    </h3>
                    <div className="w-full h-10">
                      <Dropdown
                        value={values.priority}
                        menus={["Low", "Medium", "High"].map((v) => ({
                          name: v,
                          onClick: () => {
                            setFieldValue("priority", v);
                          },
                        }))}
                        hint="Select Priority"
                      />
                    </div>
                    {errors.priority && (
                      <p className="text-err">{errors.priority}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-0.5 w-full">
                    <h3 className="text-reg-caption font-medium text-[#111213]">
                      Assign to Agent
                    </h3>
                    <div className="w-full h-10">
                      <Dropdown
                        value={values.agent}
                        menus={[].map((v) => ({
                          name: v,
                          onClick: () => {
                            setFieldValue("agent", v);
                          },
                        }))}
                        hint="List of available agents"
                      />
                    </div>
                    {errors.agent && <p className="text-err">{errors.agent}</p>}
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
                      Save
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default CreateNewTicket;
