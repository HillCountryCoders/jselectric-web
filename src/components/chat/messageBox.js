import moment from "moment";
import { useEffect, useRef } from "react";
import "./style.scss";
const MessageBox = ({ message, currentUser }) => {
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [message]);
  return message.sender._id !== undefined ? (
    message.sender._id !== currentUser.id ? (
      <div className="sender">
        <span>{moment(message.createdAt).format("MM/DD/YYYY hh:mm a")}</span>
        <p>{message.text}</p>
        <span style={{ marginTop: "5px" }}>
          {message !== null && message.sender !== null
            ? message.sender.fullname
            : ""}
        </span>
        <div ref={bottomRef} />
      </div>
    ) : (
      <div className="receiver">
        <span>{moment(message.createdAt).format("MM/DD/YYYY hh:mm a")}</span>
        <p>{message.text}</p>
        <div ref={bottomRef} />
      </div>
    )
  ) : message.sender !== currentUser.id ? (
    <div className="sender">
      <span>{moment(message.createdAt).format("MM/DD/YYYY hh:mm a")}</span>
      <p>{message.text}</p>
      <span style={{ marginTop: "5px" }}>
        {message !== null && message.sender !== null
          ? message.sender.fullname
          : ""}
      </span>
      <div ref={bottomRef} />
    </div>
  ) : (
    <div className="receiver">
      <span>{moment(message.createdAt).format("MM/DD/YYYY hh:mm a")}</span>
      <p>{message.text}</p>
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageBox;
