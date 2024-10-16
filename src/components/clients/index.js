import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import ClientTable from "../subComponents/tables/clientTable";
import ClientsDrawer from "../subComponents/drawers/clientDrawer";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
const poppins = Poppins({
  weight: ["300", "400", "600", "800"],
  style: ["normal"],
  subsets: ["latin"],
});
import { pusherClient } from "@/utils/pusher";

function Clients() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allClients, setAllClients] = useState([]);
  const [search, setSearch] = useState("");
  const currentUser = useSelector((state) => state.user.user);
  const router = useRouter();
  useEffect(() => {
    if (
      currentUser !== undefined &&
      currentUser !== null &&
      currentUser.userInfo !== undefined
    ) {
      pusherClient.subscribe(currentUser.userInfo.id);
      const handleUpdatedChat = (updatedChat) => {
        console.log("updatedChat clients", updatedChat);
        // setAllChats((allChats) =>
        //   allChats.map((chat) => {
        //     if (chat._id === updatedChat.id) {
        //       return { ...chat, messages: updatedChat.messages };
        //     } else {
        //       return chat;
        //     }
        //   })
        // );
      };
      pusherClient.bind("update-chat", handleUpdatedChat);
      return () => {
        if (currentUser !== undefined && currentUser !== null) {
          pusherClient.unsubscribe(currentUser.userInfo.id);
          pusherClient.unbind("update-chat", handleUpdatedChat);
        }
      };
    } else {
      router.push("/login");
    }
  }, [currentUser]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        setAllClients(res.data.clients);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const handleSearch = (e) => {
    setLoading(true);
    e.preventDefault();
    if (search == "") {
      return false;
    }
    axios
      .get(`${apiPath.prodPath}/api/clients/${search}`)
      .then((res) => {
        setAllClients(res.data.clients);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const addClient = (data) => {
    axios
      .post(`${apiPath.prodPath}/api/clients/addClient`, data)
      .then((res) => {
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        setAllClients(res.data.clients);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleClear = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        setAllClients(res.data.clients);
        setLoading(false);
        setSearch("");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <section className="client-wrap">
      <section className="inner-client">
        <div className="add-btn-wrap">
          <h2>Clients</h2>
          <button onClick={() => setDrawer(true)} className={poppins.className}>
            Add Client
          </button>
        </div>
        <div className="search-wrap">
          <form onSubmit={handleSearch}>
            <input
              className={poppins.className}
              type="text"
              placeholder="Search by Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              className={`${poppins.className} search-btn`}
              type="submit"
              value={"Search"}
            />
            {search == "" ? null : (
              <p
                onClick={handleClear}
                className={`${poppins.className} clear-btn`}
                style={{ color: "red" }}
              >
                Clear
              </p>
            )}
          </form>
        </div>
        {loading ? (
          <p>Loading....</p>
        ) : (
          <section className="table-wrap">
            <ClientTable
              refreshData={refreshData}
              allClients={allClients}
              loading={false}
            />
          </section>
        )}
      </section>
      <ClientsDrawer
        addClient={addClient}
        open={drawer}
        onClose={handleCloseDrawer}
      />
    </section>
  );
}

export default Clients;
