import moment from "moment";

function TaskTopInfo({ item }) {
  console.log("this is item", item);
  return (
    <div className="employeeInfo">
      <div className="singleInfo">
        <label>Current Date</label>
        <p>{moment(item.currentDate).format("MM/DD/YYYY")}</p>
      </div>
      <div className="singleInfo">
        <label>User</label>
        <p>{item.user}</p>
      </div>
      <div className="singleInfo">
        <label>Task Priority</label>
        <p>{item.taskPriority}</p>
      </div>
      <div className="singleInfo">
        <label>Task Category</label>
        <p>{item.taskCategory}</p>
      </div>
      <div className="singleInfo">
        <label>Task Status</label>
        <p>{item.taskStatus}</p>
      </div>
      <div className="singleInfo">
        <label>Due Date</label>
        <p>{moment(item.dueDate).format("MM/DD/YYYY")}</p>
      </div>
      <div className="singleInfo">
        <label>Modules</label>
        <p>
          {item.selectedModule !== null &&
            item.selectedModule &&
            item.selectedModule.map((inner, ind) => {
              return item.selectedModule.length - 1 == ind
                ? `${inner}`
                : `${inner}, `;
            })}
        </p>
      </div>
      <div className="singleInfo">
        <label>Assigned To</label>
        <p>
          {item.assignedTo &&
            item.assignedTo.map((inner, ind) => {
              return item.assignedTo.length - 1 == ind
                ? `${inner.fullname}`
                : `${inner.fullname}, `;
            })}
        </p>
      </div>
      {item.moduleArr.map((i, index) => {
        return i == null ? null : (
          <div key={`${index}`} className="singleInfo">
            <label>{i.selectedModule}</label>
            <p>{i.selectedModule}</p>
          </div>
        );
      })}
      <div className="singleInfo">
        <label>Description</label>
        <p>{item.description}</p>
      </div>
    </div>
  );
}

export default TaskTopInfo;
