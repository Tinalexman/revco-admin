import React, { useState } from "react";
import { Switch } from "@mantine/core";

const NotificationSettings = () => {
  const [notifyForEmail, setNotifyForEmail] = useState<boolean>(false);
  const [notifyForSMSNotifications, setNotifyForSMSNotifications] =
    useState<boolean>(false);
  const [notifyForPushNotifications, setNotifyForPushNotifications] =
    useState<boolean>(false);
  const [notifyForSecurityAlerts, setNotifyForSecurityAlerts] =
    useState<boolean>(false);
  const [notifyForSystemUpdates, setNotifyForSystemUpdates] =
    useState<boolean>(false);
  const [notifyForMaintainanceReminders, setNotifyForMaintainaceReminders] =
    useState<boolean>(false);
  return (
    <div className="w-full bg-white rounded-xl px-5 py-8 flex flex-col gap-3">
      <h2 className="font-semibold text-[1.25rem] leading-[1.5rem] text-black">
        Notification Settings
      </h2>

      <div className="flex w-full gap-12">
        <div className="flex flex-col gap-3 w-[20rem]">
          <div className="flex flex-col text-gray-2">
            <h3 className="text-reg-caption font-semibold ">Notifications</h3>
            <p className="text-small">
              Get email notifications on what is going on when you are not
              online. You can turn this off.
            </p>
          </div>
        </div>
        <div className="w-[35%] flex flex-col gap-7 font-semibold text-gray-2 text-reg-caption">
          <div className="w-full flex items-center justify-between">
            <h4>Email</h4>
            <Switch
              checked={notifyForEmail}
              color="primary.6"
              onChange={(event) => {
                setNotifyForEmail(!notifyForEmail);
              }}
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <h4>SMS Notifications</h4>
            <Switch
              checked={notifyForSMSNotifications}
              color="primary.6"
              onChange={(event) => {
                setNotifyForSMSNotifications(!notifyForSMSNotifications);
              }}
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <h4>Push Notifications</h4>
            <Switch
              checked={notifyForPushNotifications}
              color="primary.6"
              onChange={(event) => {
                setNotifyForPushNotifications(!notifyForPushNotifications);
              }}
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <h4>Security Alerts</h4>
            <Switch
              checked={notifyForSecurityAlerts}
              color="primary.6"
              onChange={(event) => {
                setNotifyForSecurityAlerts(!notifyForSecurityAlerts);
              }}
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <h4>System Updates</h4>
            <Switch
              checked={notifyForSystemUpdates}
              color="primary.6"
              onChange={(event) => {
                setNotifyForSystemUpdates(!notifyForSystemUpdates);
              }}
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <h4>Maintainance Reminders</h4>
            <Switch
              checked={notifyForMaintainanceReminders}
              color="primary.6"
              onChange={(event) => {
                setNotifyForMaintainaceReminders(
                  !notifyForMaintainanceReminders
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
