import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import "./style.scss";
import Select from "react-select";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
const poppins = Poppins({
  weight: ["300", "500"],
  subsets: ["latin"],
  style: ["normal"],
});
const ChatContacts = ({ usersList, loggedInUser }) => {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [groupName, setGroupName] = useState("");
  const handleContacts = (value) => {
    setContacts(value);
  };
  const handleAddContact = async () => {
    if (contacts.length == 0) {
      Swal.fire({
        icon: "error",
        text: "Select a contact to start chating",
      });
    } else {
      const dataObj = {
        currentUserId: loggedInUser.id,
        members: contacts.map((i) => i.id),
        isGroup: contacts.length <= 1 ? false : true,
        name: contacts.length <= 1 ? "" : groupName,
      };
      if (contacts.length > 1) {
        if (dataObj.name == "") {
          Swal.fire({
            icon: "error",
            text: "Please add a group name",
          });
        } else {
          await axios
            .post(`${apiPath.prodPath}/api/chat/addChat`, dataObj)
            .then((res) => {
              if (res.data.error == false) {
                router.push(`/chat/${res.data.chat._id}`);
              } else if (res.data.error) {
                Swal.fire({
                  icon: "error",
                  text: "Cannot Add Chat",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        await axios
          .post(`${apiPath.prodPath}/api/chat/addChat`, dataObj)
          .then((res) => {
            if (res.data.error == false) {
              router.push(`/chat/${res.data.chat._id}`);
            } else if (res.data.error) {
              Swal.fire({
                icon: "error",
                text: "Cannot Add Chat",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      // await axios
      //   .post(`${apiPath.prodPath}/api/chat/addChat`, dataObj)
      //   .then((res) => {
      //     if (res.data.error == false) {
      //       router.push(`/chat/${res.data.chat._id}`);
      //     } else if (res.data.error) {
      //       Swal.fire({
      //         icon: "error",
      //         text: "Cannot Add Chat",
      //       });
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  };
  return (
    <div className={`${poppins.className} main-contact-list-con`}>
      <h1
        style={{ marginBottom: "10px", fontSize: "22px", fontWeight: "bold" }}
      >
        Contacts
      </h1>
      <Select
        options={usersList.map((i) => {
          return {
            label: i.fullname,
            value: i.fullname,
            id: i._id,
            chats: i.chats,
          };
        })}
        value={contacts}
        onChange={handleContacts}
        isMulti={true}
        placeholder="Select Contacts"
      />
      {contacts.length <= 1 ? null : (
        <div className="group-name-wrap">
          <input
            className={`${poppins.className} group-name`}
            type="text"
            value={groupName}
            placeholder="Group Name"
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
      )}
      <div>
        <button
          onClick={handleAddContact}
          disabled={contacts.length == 0 ? true : false}
          className={`${poppins.className} create-chat-btn`}
        >
          Start {contacts.length <= 1 ? "Single Chat" : "Group Chat"}
        </button>
      </div>
    </div>
  );
};
export default ChatContacts;
