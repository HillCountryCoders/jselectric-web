import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import { useSelector } from "react-redux";
import TaskAttachmentTable from "../tables/taskAttachmentTable";
import moment from "moment";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import { FileUploader } from "react-drag-drop-files";
import Swal from "sweetalert2";
import "./style.scss";
import Select from "react-select";
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
const fileTypes = ["JPG", "PNG", "GIF", "PDF"];
function TaskAttachmentForm({ taskId, attachments }) {
  const [fileUpload, setFileUpload] = useState(null);
  const [allAttachments, setAllAttachments] = useState(attachments);
  const [editFlag, setEditFlag] = useState(false);
  const [attachmentId, setAttachmentId] = useState("");
  const [newFileFlag, setNewFileFlag] = useState(false);
  const currentUser = useSelector((state) => state.user.user);
  const [oldFiles, setOldFiles] = useState("");
  const [fileName, setFileNames] = useState([]);
  const [user, setUser] = useState(
    currentUser && currentUser.userInfo ? currentUser.userInfo.fullname : ""
  );
  const [note, setNote] = useState("");
  const [attachmentCategories, setAttachmentCategories] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setEditFlag(false);
    loadUser();
  }, []);
  const loadUser = async () => {
    setLoading(true);
    const allTasks = await axios
      .get(`${apiPath.prodPath}/api/task/`)
      .then((res) => {
        setLoading(false);
        return res.data.allTasks;
      });
    setAllAttachments(allTasks.find((i) => i.id == taskId).attachments);
  };
  const handleFilesData = (e) => {
    if (fileUpload.length == 0) {
      return false;
    } else {
      setLoading(true);
      e.preventDefault();
      if (editFlag && newFileFlag) {
        const formData = new FormData();
        formData.append("date", moment(new Date()).format("MM-DD-YYYY"));
        formData.append("user", user);
        formData.append("note", note);
        formData.append("attachmentCategories", attachmentCategories.value);
        formData.append("newFileFlag", newFileFlag);
        formData.append("id", attachmentId);
        formData.append("oldFiles", JSON.stringify(oldFiles));
        for (let i = 0; i < fileUpload.length; i++) {
          formData.append("files", fileUpload[i]);
        }
        axios({
          method: "patch",
          url: `${apiPath.prodPath}/api/task/editFiles/${taskId}`,
          data: formData,
          withCredentials: false,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => {
            setLoading(false);
            loadUser();
            clearInput();
            setEditFlag(false);
          })
          .catch((err) => console.log(err));
      } else if (editFlag && newFileFlag == false) {
        const formData = new FormData();
        formData.append("date", moment(new Date()).format("MM-DD-YYYY"));
        formData.append("user", user);
        formData.append("note", note);
        formData.append("attachmentCategories", attachmentCategories.value);
        formData.append("newFileFlag", newFileFlag);
        formData.append("editFlag", editFlag);
        formData.append("oldFiles", JSON.stringify(oldFiles));
        formData.append("id", attachmentId);
        axios({
          method: "patch",
          url: `${apiPath.prodPath}/api/task/editFiles/${taskId}`,
          data: formData,
          withCredentials: false,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => {
            setLoading(false);
            loadUser();
            clearInput();
            setEditFlag(false);
          })
          .catch((err) => console.log(err));
      } else {
        const formData = new FormData();
        formData.append("date", moment(new Date()).format("MM-DD-YYYY"));
        formData.append("user", currentUser && currentUser.userInfo.fullname);
        formData.append("note", note);
        formData.append("attachmentCategories", attachmentCategories.value);
        // formData.append("files", fileUpload);
        for (let i = 0; i < fileUpload.length; i++) {
          formData.append("files", fileUpload[i]);
        }
        axios({
          method: "patch",
          url: `${apiPath.prodPath}/api/task/addFiles/${taskId}`,
          data: formData,
          withCredentials: false,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => {
            setLoading(false);
            loadUser();
            clearInput();
            setEditFlag(false);
          })
          .catch((err) => console.log(err));
      }
    }
  };
  const clearInput = () => {
    setFileUpload([]);
    setFileNames([]);
    setNote("");
    setAttachmentCategories("");
  };
  const fileHandler = (newfiles) => {
    setNewFileFlag(true);
    setFileUpload(newfiles);
    Object.values(newfiles).forEach((val) => {
      setFileNames([val.name, ...fileName]);
    });
  };
  // const getBase64 = (file) => {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function () {
  //     const dataObj = {
  //       file: reader.result,
  //       fileType: file.type,
  //     };
  //     setFileUpload((state) => [dataObj, ...state]);
  //   };
  //   reader.onerror = function (error) {
  //     console.log("Error: ", error);
  //   };
  // };
  const editData = (data) => {
    setNote(data.note == undefined ? "" : data.note);
    setAttachmentCategories(
      data.attachmentCategories == undefined
        ? ""
        : { label: data.attachmentCategories, value: data.attachmentCategories }
    );
    setFileUpload(data.files);
    setOldFiles(data.files);
    setEditFlag(true);
    setAttachmentId(data.id);
    setNewFileFlag(false);
  };
  const deletePic = (data) => {
    setLoading(true);
    setOldFiles(data.files);
    Swal.fire({
      icon: "error",
      text: "Are you sure you want to delete the pic/file data",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const dataObj = {
          oldFiles: data.files,
        };
        axios({
          method: "patch",
          url: `${apiPath.prodPath}/api/task/delFiles/${taskId}&&${data.id}`,
          data: dataObj,
          withCredentials: false,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => {
            setLoading(false);
            loadUser();
          })
          .catch((err) => console.log(err));
      }
    });
  };
  return loading ? (
    <p>Loading...</p>
  ) : (
    <section>
      <form
        className="input-wraps"
        onSubmit={handleFilesData}
        encType="multipart/form-data"
      >
        <div className="single-inp">
          <label>Files</label>
          {/* <input
            type="file"
            className={`${poppins.className} single-inp`}
            onChange={fileHandler}
            multiple
            name="files"
            required={true}
          /> */}
          <FileUploader
            multiple={true}
            handleChange={fileHandler}
            name="files"
            types={fileTypes}
            required={fileUpload == null ? true : false}
            fileOrFiles={fileUpload}
          />
          {fileName.length ? fileName.map((i) => <p key={i}>{i}</p>) : null}
          {oldFiles.length && editFlag
            ? oldFiles.map((i, ind) => (
                <p key={`${i.filename}${i.ind}`} style={{ fontSize: "14px" }}>
                  {i.filename}
                </p>
              ))
            : null}
        </div>
        <div className="single-inp" style={{ width: "100%" }}>
          <label>Notes</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="single-inp">
          <label>Attachment Category</label>
          <Select
            options={[
              { label: "Pictures", value: "Pictures" },
              { label: "Blueprints", value: "Blueprints" },
              { label: "Invoices", value: "Invoices" },
              { label: "Notes", value: "Notes" },
              { label: "Ability", value: "Ability" },
            ]}
            onChange={(v) => setAttachmentCategories(v)}
            value={attachmentCategories}
          />
        </div>
        <div className="single-inp" style={{ width: "100%" }}>
          {editFlag ? (
            <input
              className={`${poppins.className} submit-btn`}
              type="submit"
              value="Edit"
            />
          ) : (
            <input
              className={`${poppins.className} submit-btn`}
              type="submit"
              value="Add"
            />
          )}
        </div>
      </form>
      {allAttachments && allAttachments.length == 0 ? (
        <p className={poppins.className} style={{ marginTop: 30 }}>
          There are no Pictures / Files not found
        </p>
      ) : (
        // <PicInfo attachments={attachments} />
        <TaskAttachmentTable
          openEdit={(data) => editData(data)}
          attachments={allAttachments}
          deleteTool={(data) => deletePic(data)}
        />
      )}
    </section>
  );
}

export default TaskAttachmentForm;
