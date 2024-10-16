import React, { useState, useEffect } from "react";
import ClientAttachmentForm from "../forms/clientAttachmentForm";
function ClientAttachments({
  refreshData,
  clientId,
  clientAttachments,
  refreshFlag,
}) {
  const [editFlag, setEditFlag] = useState(false);
  const [currentItem, setCurrentItem] = useState("");

  return (
    <div className="sub-task-wrapper">
      <ClientAttachmentForm clientId={clientId} />
    </div>
  );
}

export default ClientAttachments;
