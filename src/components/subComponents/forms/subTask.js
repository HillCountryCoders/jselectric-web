import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
import "react-datepicker/dist/react-datepicker.css";
function SubTaskForm({
  handleForm,
  editFlag,
  currentItem,
  editSubTaskData,
  task,
}) {
  const currentUser = useSelector((state) => state.user.user);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dueDate, setDueDate] = useState("");
  const [taskCategoryOpt, setTaskCategoryOpt] = useState([]);
  const [taskCategory, setTaskCategory] = useState("");
  const [taskStatusOpt, setTaskStatusOpt] = useState([]);
  const [taskStatus, setTaskStatus] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState([]);
  const [assignedToOpt, setAssignedToOpt] = useState([]);
  const [user, setUser] = useState(
    currentUser && currentUser.userInfo ? currentUser.userInfo.fullname : ""
  );
  useEffect(() => {
    if (editFlag == false) {
      dataEntryRefresh();
    }
    axios
      .get(`${apiPath.prodPath}/api/taskCategory`)
      .then((res) => {
        const resdata = res.data.taskCategory.map((i) => {
          return { label: i.name, value: i.name };
        });
        const sortedTasks = resdata.sort((a, b) =>
          a.label.localeCompare(b.label)
        );
        setTaskCategoryOpt(sortedTasks);
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/taskStatus`)
      .then((res) => {
        const resdata = res.data.taskStatus.map((i) => {
          return { label: i.name, value: i.name };
        });
        const sortedTasks = resdata.sort((a, b) =>
          a.label.localeCompare(b.label)
        );
        setTaskStatusOpt(sortedTasks);
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/users`)
      .then((res) => {
        const resdata = res.data.allUsers.map((i) => {
          return { label: i.fullname, value: i.fullname, email: i.email };
        });
        const sortedTasks = resdata.sort((a, b) =>
          a.label.localeCompare(b.label)
        );
        setAssignedToOpt(sortedTasks);
      })
      .catch((err) => console.log(err));
    if (editFlag) {
      setCurrentDate(new Date(currentItem.currentDate));
      setDueDate(new Date(currentItem.dueDate));
      setUser(currentItem.user);
      setDescription(currentItem.description);
      setTaskCategory({
        label: currentItem.taskCategory,
        value: currentItem.taskCategory,
      });
      setTaskStatus({
        label: currentItem.taskStatus,
        value: currentItem.taskStatus,
      });
      setAssignedTo(
        currentItem.assignedTo.map((i) => {
          return { label: i.fullname, value: i.fullname };
        })
      );
    }
  }, [editFlag]);
  const handleFormInner = (e) => {
    e.preventDefault();
    const dataObj = {
      currentDate,
      user,
      taskCategory: taskCategory.value,
      dueDate,
      description,
      taskStatus: taskStatus.value,
      assignedTo: assignedTo.map((i) => {
        return { fullname: i.label };
      }),
      updated: editFlag
        ? taskStatus.value == "Completed"
          ? false
          : true
        : false,
    };
    if (editFlag) {
      var assignedToUsers = [];
      assignedToOpt.forEach((item) => {
        task.assignedTo.forEach((el) => {
          if (el.fullname == item.label) {
            assignedToUsers = [
              ...assignedToUsers,
              { fullname: item.label, email: item.email },
            ];
          }
        });
      });
      editSubTaskData(dataObj, currentItem.id, assignedToUsers);
      dataEntryRefresh();
    } else {
      var assignedToUsers = [];
      assignedToOpt.forEach((item) => {
        task.assignedTo.forEach((el) => {
          if (el.fullname == item.label) {
            assignedToUsers = [
              ...assignedToUsers,
              { fullname: item.label, email: item.email },
            ];
          }
        });
      });
      handleForm(dataObj, assignedToUsers);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setTaskCategory("");
    setDueDate("");
    setDescription("");
    setTaskStatus("");
    setAssignedTo([]);
  };
  return (
    <form className="input-wraps" onSubmit={handleFormInner}>
      <div className="single-inp">
        <label>Current Date</label>
        <DatePicker disabled selected={currentDate} />
      </div>
      <div className="single-inp">
        <label>User</label>
        <input
          className={poppins.className}
          type="text"
          value={user}
          disabled
        />
      </div>
      <div className="single-inp">
        <label>Task Category</label>
        <Select
          className={`${poppins.className} select-cus1`}
          options={taskCategoryOpt}
          value={taskCategory}
          onChange={(value) => setTaskCategory(value)}
          isDisabled={
            editFlag
              ? currentItem.taskStatus == "Completed"
                ? true
                : false
              : false
          }
        />
      </div>
      <div className="single-inp">
        <label>Due Date</label>
        <DatePicker
          id="date-cus"
          selected={dueDate}
          onChange={(value) => setDueDate(value)}
          disabled={
            editFlag
              ? currentItem.taskStatus == "Completed"
                ? true
                : false
              : false
          }
        />

        {dueDate !== "" ? (
          <p onClick={() => setDueDate("")} className="clear-value">
            Clear
          </p>
        ) : null}
      </div>
      <div className="single-inp">
        <label>Description</label>
        <input
          type="text"
          className={poppins.className}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={
            editFlag
              ? currentItem.taskStatus == "Completed"
                ? true
                : false
              : false
          }
        />
      </div>
      <div className="single-inp">
        <label>Task Status</label>
        <Select
          className={`${poppins.className} select-cus`}
          options={taskStatusOpt}
          value={taskStatus}
          onChange={(value) => setTaskStatus(value)}
          isDisabled={
            editFlag
              ? currentItem.taskStatus == "Completed"
                ? true
                : false
              : false
          }
        />
      </div>
      <div className="single-inp">
        <label>Assigned To</label>
        <Select
          isMulti
          value={assignedTo}
          className={`${poppins.className} select-cus`}
          options={assignedToOpt}
          onChange={(v) => setAssignedTo(v)}
          isDisabled={
            editFlag
              ? currentItem.taskStatus == "Completed"
                ? true
                : false
              : false
          }
        />
      </div>
      <div className="sub-btn-wrap">
        <input
          className={`${poppins.className} add-task`}
          type="submit"
          value={editFlag ? "Edit Task" : "Add Task"}
          disabled={
            editFlag
              ? currentItem.taskStatus == "Completed"
                ? true
                : false
              : false
          }
        />
      </div>
    </form>
  );
}

export default SubTaskForm;
