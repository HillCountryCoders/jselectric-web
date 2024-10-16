import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import SubTask from "../tabs/subTask";
import NotesTask from "../tabs/notesTask";
import TaskAttachment from "../tabs/taskAttachment";
import "./style.scss";
import axios from "axios";
import TaskTopInfo from "../../topInfo/taskTopInfo";
import { apiPath } from "@/utils/routes";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function TaskInfo({ open, onClose, item }) {
  const [activeTab, setActiveTab] = useState("Sub-Tasks");
  const [subTask, setSubTask] = useState([]);
  const [noteTask, setNoteTask] = useState([]);
  const [taskAttachments, setTaskAttachments] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    if (activeTab == "Sub-Tasks") {
      setLoader(true);
      axios
        .get(`${apiPath.prodPath}/api/task`)
        .then((res) => {
          const allSubTasks = res.data.allTasks.find((i) => i.id == item.id);
          setSubTask(allSubTasks && allSubTasks.subTasks);
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (activeTab == "Notes") {
      setLoader(true);
      axios
        .get(`${apiPath.prodPath}/api/task`)
        .then((res) => {
          const allNoteTasks = res.data.allTasks.find((i) => i.id == item.id);
          setNoteTask(allNoteTasks && allNoteTasks.notes);
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (activeTab == "Attachments") {
      setLoader(true);
      axios
        .get(`${apiPath.prodPath}/api/task`)
        .then((res) => {
          const allTaskAttachments = res.data.allTasks.find(
            (i) => i.id == item.id
          );
          setTaskAttachments(
            allTaskAttachments && allTaskAttachments.attachments
          );
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [activeTab]);
  const controlRefreshData = () => {
    setRefreshFlag(!refreshFlag);
  };
  const refreshData = () => {
    if (activeTab == "Sub-Tasks") {
      setLoader(true);
      axios
        .get(`${apiPath.prodPath}/api/task`)
        .then((res) => {
          const allSubTasks = res.data.allTasks.find((i) => i.id == item.id);
          setSubTask(allSubTasks && allSubTasks.subTasks);
          controlRefreshData();
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (activeTab == "Notes") {
      setLoader(true);
      axios
        .get(`${apiPath.prodPath}/api/task`)
        .then((res) => {
          const allNoteTasks = res.data.allTasks.find((i) => i.id == item.id);
          setNoteTask(allNoteTasks && allNoteTasks.notes);
          controlRefreshData();
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (activeTab == "Attachments") {
      setLoader(true);
      axios
        .get(`${apiPath.prodPath}/api/task`)
        .then((res) => {
          const allTaskAttachments = res.data.allTasks.find(
            (i) => i.id == item.id
          );
          setTaskAttachments(
            allTaskAttachments && allTaskAttachments.attachments
          );
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const tabHandler = (e) => {
    setActiveTab(e.target.innerText);
  };
  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      className="employeeDrawer"
    >
      <div className={`${poppins.className} info-modal`}>
        <p
          className="close"
          onClick={() => {
            onClose();
            refreshData();
          }}
        >
          x
        </p>
        <TaskTopInfo item={item} />
      </div>
      <div className={`${poppins.className} tabs-wrap`}>
        <ul className="tabs">
          <li
            onClick={tabHandler}
            className={
              activeTab == "Sub-Tasks" ? "activeTab simpleTab" : "simple Tab"
            }
          >
            Sub-Tasks
          </li>
          <li
            onClick={tabHandler}
            className={
              activeTab == "Notes" ? "activeTab simpleTab" : "simple Tab"
            }
          >
            Notes
          </li>
          <li
            onClick={tabHandler}
            className={
              activeTab == "Attachments" ? "activeTab simpleTab" : "simple Tab"
            }
          >
            Attachments
          </li>
        </ul>
      </div>
      {}
      <div className={`${poppins.className} innerTabsWrap`}>
        {activeTab == "Sub-Tasks" && loader == false ? (
          <SubTask
            refreshData={refreshData}
            taskId={item.id}
            subTasks={subTask}
            refreshFlag={refreshFlag}
            task={item}
          />
        ) : null}
        {activeTab == "Notes" && loader == false ? (
          <NotesTask
            refreshData={refreshData}
            taskId={item.id}
            noteTasks={noteTask}
            refreshFlag={refreshFlag}
            task={item}
          />
        ) : null}
        {activeTab == "Attachments" && loader == false ? (
          <TaskAttachment
            refreshData={refreshData}
            taskId={item.id}
            taskAttachments={taskAttachments}
            refreshFlag={refreshFlag}
          />
        ) : null}
      </div>
    </Drawer>
  );
}

export default TaskInfo;
