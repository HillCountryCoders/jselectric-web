import "./style.scss";
function NoteSubComp({ allNotes, editHandler, deleteHandler }) {
  return (
    <section>
      {allNotes.map((i) => {
        return (
          <div key={i.id} className="notes-wrap">
            <p>{i.note}</p>
            <div className="date-time-wrap">
              <span>{i.user}</span>
              <span>{i.date}</span>
              <span>{i.time}</span>
              <span className="green" onClick={() => editHandler(i.note, i.id)}>
                Edit
              </span>
              <span className="red" onClick={() => deleteHandler(i.id)}>
                Delete
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default NoteSubComp;
