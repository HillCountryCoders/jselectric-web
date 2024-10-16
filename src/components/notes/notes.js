import moment from "moment";
import { Poppins } from "next/font/google";
import { useSelector } from "react-redux";
import "./style.scss";
import React, { useState, useEffect } from "react";
import axios, { all } from "axios";
import { apiPath } from "@/utils/routes";
import NoteSubComp from "./noteSubComp";
import Swal from "sweetalert2";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
});
function Notes({ userId }) {
  const [note, setNote] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const [editFlag, setEditFlag] = useState(false);
  const [noteId, setNoteId] = useState("");
  const currentUser = useSelector((state) => state.user);
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const allUsers = await axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        return res.data.allUsers;
      });
    setAllNotes(allUsers.find((i) => i.id == userId).notes);
  };
  const handleForm = (e) => {
    e.preventDefault();
    let dataObj = {
      date: moment(new Date()).format("mm-dd-yy"),
      time: moment(new Date()).format("hh:mm A"),
      user: currentUser.user.userInfo.fullname,
      note,
    };
    let url;
    if (editFlag) {
      url = `${apiPath.prodPath}/api/users/editNotes/${userId}`;
      dataObj.id = noteId;
    } else {
      url = `${apiPath.prodPath}/api/users/addNotes/${userId}`;
    }
    axios.patch(url, dataObj).then((res) => {
      Swal.fire({
        title: editFlag ? "Save" : "Added",
        icon: "success",
        text: "Notes added successfully",
        showConfirmButton: true,
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          loadUser();
        } else {
          loadUser();
        }
      });
    });
  };
  const editNotes = (note, id) => {
    setNote(note);
    setNoteId(id);
    setEditFlag(true);
  };
  const delNote = (id) => {
    Swal.fire({
      title: "Delete",
      text: "Are you sure you want to delete the notes?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/users/delNotes/${userId}&&${id}`)
          .then((res) => {
            loadUser();
          })
          .catch((err) => console.log(err));
      }
    });
  };
  return (
    <section className="notes-module">
      <form className={poppins.className} onSubmit={handleForm}>
        <div className="input-wrap">
          <lable className={poppins.className}></lable>
          <textarea
            className={`${poppins.className} inp-cus-textarea`}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            cols={10}
            rows={5}
          />
        </div>
        <div className="input-wrap">
          <input
            className={`${poppins.className} submit-btn`}
            type="submit"
            value={editFlag ? "Save" : "Add"}
          />
        </div>
      </form>
      <section className="content-wrap-notes">
        {allNotes.length == 0 ? (
          <p className={poppins.className}>No Notes Found</p>
        ) : (
          <NoteSubComp
            allNotes={allNotes}
            editHandler={(note, id) => editNotes(note, id)}
            deleteHandler={(id) => delNote(id)}
          />
        )}
      </section>
    </section>
  );
}

export default Notes;
