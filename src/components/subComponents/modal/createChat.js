import { Modal } from "react-rainbow-components";
import ChatContacts from "../../chat/chatContacts";
import "./style.scss";
function CreateChatModal({ modalFlag, modalClose, allUsers, currentUser }) {
  return (
    <Modal
      id="modal-create-chat"
      isOpen={modalFlag}
      onRequestClose={modalClose}
    >
      <ChatContacts
        loggedInUser={currentUser !== null ? currentUser.userInfo : ""}
        usersList={
          allUsers.length && currentUser !== null
            ? allUsers.filter(
                (i) => i.fullname !== currentUser.userInfo.fullname
              )
            : []
        }
      />
    </Modal>
  );
}

export default CreateChatModal;
