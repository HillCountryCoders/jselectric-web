import { Modal } from "react-rainbow-components";
import ChatContacts from "../../chat/chatContacts";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import { useDispatch } from "react-redux";
import { storeUser } from "@/store/slices/userSlice";
function TaskNotificationModal({ open, onClose, user }) {
  const dispatch = useDispatch();
  const handleTaskNotification = (flag) => {
    axios
      .patch(
        `${apiPath.prodPath}/api/users/setTaskNotification/${user.userInfo.id}`,
        { taskNotification: flag }
      )
      .then((res) => {
        if (res.data.error == false && user !== null) {
          dispatch(
            storeUser({
              userInfo: { ...user.userInfo, taskNotification: flag },
            })
          );
        }
      })
      .catch((err) => console.log(err));
  };
  const handleTaskEmailNotification = (flag) => {
    axios
      .patch(
        `${apiPath.prodPath}/api/users/setTaskEmailNotification/${user.userInfo.id}`,
        { taskEmailNotification: flag }
      )
      .then((res) => {
        if (res.data.error == false && user !== null) {
          dispatch(
            storeUser({
              userInfo: { ...user.userInfo, taskEmailNotification: flag },
            })
          );
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Modal id="modal-create-chat" isOpen={open} onRequestClose={onClose}>
      <p className="flex-row">
        Turn{" "}
        {user !== null
          ? user.userInfo.taskNotification == false
            ? "on"
            : "off"
          : "on"}{" "}
        Task Notifications
        {user !== null ? (
          user.userInfo.taskNotification == false ? (
            <span
              onClick={() => handleTaskNotification(true)}
              className="notification-btn"
            >
              Turn Off
            </span>
          ) : (
            <span
              onClick={() => handleTaskNotification(false)}
              className="notification-btn"
            >
              Turn On
            </span>
          )
        ) : (
          <span
            onClick={() => handleTaskNotification(true)}
            className="notification-btn"
          >
            On
          </span>
        )}
      </p>
      <p className="flex-row">
        Turn{" "}
        {user !== null
          ? user.userInfo.taskEmailNotification == false
            ? "on"
            : "off"
          : "on"}{" "}
        Task Email Notifications
        {user !== null ? (
          user.userInfo.taskEmailNotification == false ? (
            <span
              onClick={() => handleTaskEmailNotification(true)}
              className="notification-btn"
            >
              On
            </span>
          ) : (
            <span
              onClick={() => handleTaskEmailNotification(false)}
              className="notification-btn"
            >
              Off
            </span>
          )
        ) : (
          <span
            onClick={() => handleTaskEmailNotification(true)}
            className="notification-btn"
          >
            On
          </span>
        )}
      </p>
    </Modal>
  );
}

export default TaskNotificationModal;
