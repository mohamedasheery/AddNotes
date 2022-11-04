import React from "react";

export default function DisplayNote({ note,getId,editNote }) {
  return (
    <>
      <div  className="col-md-4 my-4">
        <div className="note p-4">
          <h3 className="float-left">{note.title} </h3>
          <p>{note.desc}</p>
          <i
            onClick={() => {
              editNote(note);
            }}
            data-bs-toggle="modal"
            data-bs-target="#exampleModalEdite"
            className="fas fa-edit float-right edit"
          ></i>
          <i
            onClick={() => {
              getId(note._id);
            }}
            className="fas fa-trash-alt float-right px-3 del"
            data-bs-toggle="modal"
            data-bs-target="#exampleModaldelet"
          ></i>
        </div>
      </div>
    </>
  );
}
