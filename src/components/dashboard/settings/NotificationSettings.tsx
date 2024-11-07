import React, { useEffect, useState } from "react";
import { Loader, Switch } from "@mantine/core";
import {
  useGetNotificationSettings,
  useUpdateNotificationSettings,
} from "@/hooks/settingsHook";
import toast from "react-hot-toast";

const NotificationSettings = () => {
  const {
    loading: loadingGetNotifications,
    success: gottenNotificationSettings,
    data,
  } = useGetNotificationSettings();

  const {
    loading: loadingUpdateNotification,
    success: updatedNotifications,
    updateNotificationSettings,
  } = useUpdateNotificationSettings();

  const [email, setNotifyForEmail] = useState<boolean>(false);
  const [sms, setNotifyForSMSNotifications] = useState<boolean>(false);
  const [pushNotification, setNotifyForPushNotifications] =
    useState<boolean>(false);
  const [security, setNotifyForSecurityAlerts] = useState<boolean>(false);
  const [updates, setNotifyForSystemUpdates] = useState<boolean>(false);
  const [maintenance, setNotifyForMaintainaceReminders] =
    useState<boolean>(false);

  useEffect(() => {
    if (!loadingGetNotifications && gottenNotificationSettings) {
      setNotifyForEmail(data.email);
      setNotifyForSMSNotifications(data.sms);
      setNotifyForPushNotifications(data.pushNotification);
      setNotifyForSecurityAlerts(data.security);
      setNotifyForSystemUpdates(data.updates);
      setNotifyForMaintainaceReminders(data.maintenance);
    }
  }, [loadingGetNotifications, gottenNotificationSettings, data]);

  useEffect(() => {
    if (!loadingUpdateNotification && updatedNotifications) {
      toast.success("Notification settings updated successfully");
    }
  }, [loadingUpdateNotification, updatedNotifications]);

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
          {loadingGetNotifications ? (
            <div className="w-full h-60 grid place-content-center">
              <Loader color="primary.6" />
            </div>
          ) : (
            <>
              <div className="w-full flex items-center justify-between">
                <h4>Email</h4>
                <Switch
                  checked={email}
                  color="primary.6"
                  onChange={(event) => {
                    setNotifyForEmail(!email);
                  }}
                />
              </div>
              <div className="w-full flex items-center justify-between">
                <h4>SMS Notifications</h4>
                <Switch
                  checked={sms}
                  color="primary.6"
                  onChange={(event) => {
                    setNotifyForSMSNotifications(!sms);
                  }}
                />
              </div>
              <div className="w-full flex items-center justify-between">
                <h4>Push Notifications</h4>
                <Switch
                  checked={pushNotification}
                  color="primary.6"
                  onChange={(event) => {
                    setNotifyForPushNotifications(!pushNotification);
                  }}
                />
              </div>
              <div className="w-full flex items-center justify-between">
                <h4>Security Alerts</h4>
                <Switch
                  checked={security}
                  color="primary.6"
                  onChange={(event) => {
                    setNotifyForSecurityAlerts(!security);
                  }}
                />
              </div>
              <div className="w-full flex items-center justify-between">
                <h4>System Updates</h4>
                <Switch
                  checked={updates}
                  color="primary.6"
                  onChange={(event) => {
                    setNotifyForSystemUpdates(!updates);
                  }}
                />
              </div>
              <div className="w-full flex items-center justify-between">
                <h4>Maintainance Reminders</h4>
                <Switch
                  checked={maintenance}
                  color="primary.6"
                  onChange={(event) => {
                    setNotifyForMaintainaceReminders(!maintenance);
                  }}
                />
              </div>
              <button
                onClick={() => {
                  updateNotificationSettings({
                    email,
                    sms,
                    pushNotification,
                    security,
                    updates,
                    maintenance,
                  });
                }}
                className="text-med-button grid place-content-center text-white bg-primary rounded-lg w-[230px] h-11 mt-10"
              >
                {loadingUpdateNotification ? (
                  <Loader color="white.6" size={24} />
                ) : (
                  "Save Changes"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
