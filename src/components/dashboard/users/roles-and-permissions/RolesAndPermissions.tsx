"use client";

import React, { useState } from "react";
import { Drawer } from "@mantine/core";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import Filters from "../admin-users/Filters";

import AddRole from "./AddRole";
import EditRole from "./EditRole";

import { RiDeleteBinFill, RiEdit2Fill } from "react-icons/ri";
import DeleteRole from "./DeleteRole";
export interface iRole {
  name: string;
  description: string;
  permissions: string[];
}

const RolesAndPermissions = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [roles, setRoles] = useState<iRole[]>([
    {
      name: "Admin",
      description: "Full access to all features",
      permissions: ["All Features"],
    },
    {
      name: "Financial Officer",
      description: "Manages finanical transactions",
      permissions: ["View Transactions", "Edit Transactions"],
    },
    {
      name: "Support Staff",
      description: "Handles user support and inquiries",
      permissions: ["View Tickets", "Respond To Tickets"],
    },
    {
      name: "Auditor",
      description: "Reviews activities for compliance",
      permissions: ["View Logs", "Generate Reports"],
    },
  ]);
  const [addNewRole, shouldAddNewRole] = useState<boolean>(false);
  const [editRole, shouldEditRole] = useState<boolean>(false);
  const [deleteRole, shouldDeleteRole] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<iRole | null>(null);

  return (
    <>
      <div className="w-full flex flex-col gap-2.5">
        <div className="px-8 bg-white w-full h-[4.5rem]">
          <div className="w-full flex justify-between items-center py-2">
            <div className="flex flex-col">
              <h2 className="text-monokai font-semibold text-dash-intro-header">
                Admin Users
              </h2>
              <h3 className="text-primary text-reg-caption">
                Manage all users
              </h3>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2.5 px-8">
          <div className="w-full bg-white p-5 flex flex-col gap-3 rounded-xl">
            <div className="w-full flex justify-between items-center">
              <h2 className="text-black text-med-button">Admin User List</h2>
              <h2
                onClick={() => setExpanded(!expanded)}
                className="cursor-pointer text-med-button text-[#007AFF]"
              >
                {expanded ? "View Less" : "View All"}
              </h2>
            </div>
            <div className="w-full justify-between items-center flex">
              <Filters />
              <button
                onClick={() => shouldAddNewRole(true)}
                className="bg-primary text-white rounded-lg h-9 gap-2 px-3 text-[0.825rem] flex items-center leading-[0.98rem]"
              >
                <h3>Add New Role</h3>
                <IoIosAdd size={26} />
              </button>
            </div>
            <div className="w-full overflow-x-auto">
              <table className="w-full overflow-x-auto">
                <thead className="w-full bg-[#F3F7FC] h-14">
                  <tr className="text-[#3A3A3A] font-medium text-[0.75rem] leading-[1.125rem]">
                    <th scope="col" className="text-start px-4">
                      Role Name
                    </th>
                    <th scope="col" className="text-start px-4">
                      Description
                    </th>
                    <th scope="col" className="text-start px-4">
                      Permissions
                    </th>

                    <th scope="col" className="text-start px-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role, i) => {
                    const mergedPermissions = role.permissions.join(", ");
                    return (
                      <tr
                        key={i}
                        className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around"
                      >
                        <td className="p-4">{role.name}</td>
                        <td className="p-4">{role.description}</td>
                        <td className="p-4">{mergedPermissions}</td>

                        <td className="p-4 flex gap-1 w-fit items-center">
                          <div
                            onClick={() => {
                              shouldEditRole(true);
                              setSelectedRole(role);
                            }}
                            className="cursor-pointer bg-[#E4ECF7] rounded size-6 grid place-content-center text-[#292D32]"
                          >
                            <RiEdit2Fill size={16} />
                          </div>
                          <div
                            onClick={() => {
                              shouldDeleteRole(true);
                              setSelectedRole(role);
                            }}
                            className="cursor-pointer bg-[#FDC6C6] rounded size-6 grid place-content-center text-[#292D32]"
                          >
                            <RiDeleteBinFill size={16} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {addNewRole && (
        <Drawer.Root
          opened={addNewRole}
          onClose={() => shouldAddNewRole(false)}
          position={"right"}
          padding={0}
          radius={12}
          closeOnClickOutside={false}
          closeOnEscape={false}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Body>
              <AddRole onClose={() => shouldAddNewRole(false)} />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      )}

      {editRole && selectedRole !== null && (
        <Drawer.Root
          opened={editRole}
          onClose={() => {
            shouldEditRole(false);
            setSelectedRole(null);
          }}
          position={"right"}
          padding={0}
          radius={12}
          closeOnClickOutside={false}
          closeOnEscape={false}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Body>
              <EditRole
                role={selectedRole!}
                onClose={() => {
                  shouldEditRole(false);
                  setSelectedRole(null);
                }}
              />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      )}
      {deleteRole && selectedRole !== null && (
        <DeleteRole
          close={() => {
            shouldDeleteRole(false);
            setSelectedRole(null);
          }}
        />
      )}
    </>
  );
};

export default RolesAndPermissions;
