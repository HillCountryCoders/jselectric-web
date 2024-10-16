import React, { useState, useEffect } from "react";
import TaskAttachmentForm from "../forms/taskAttachments";
function TaskAttachment({ refreshData, taskId, taskAttachments, refreshFlag }) {
  const [editFlag, setEditFlag] = useState(false);
  const [currentItem, setCurrentItem] = useState("");

  return (
    <div className="sub-task-wrapper">
      <TaskAttachmentForm taskId={taskId} />
    </div>
  );
}

export default TaskAttachment;
