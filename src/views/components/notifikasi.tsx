import { Button, notification, Space } from "antd";

export const openNotificationWithIcon = (type, api, message, description) => {
  api[type]({
    message: message,
    description: description,
  });
};
