import axios from "axios";
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import DisplayNote from "../DisplayNote/DisplayNote";
import  { useContext } from "react";
import { UserInfoContext } from "../../UserInfoContext";
import AddNote from "../AddNote/AddNote";

export default function Home() {
  let { loginUser } = useContext(UserInfoContext); 

  let baseUrl = "https://route-egypt-api.herokuapp.com/";

   const token = localStorage.getItem("token");
  if (loginUser) {
    var userID = loginUser._id;
    console.log(userID);
  }
 
  // const userID = userToken._id;
  const [valueEditTitle, setvalueEditTitle] = useState("");
  const [valueEditDesc, setvalueEditDesc] = useState("");
  const [Notes, setNotes] = useState([]);
  const [getNoteId, setgetNoteId] = useState("");
  const [getNotes, setGetNotes] = useState([]);
  const [message, setMessage] = useState("");
  const [postNotes, setPostNotes] = useState({
    title: "",
    desc: "",
    userID,
    token,
  });

  const [updateNotes, setUpdateNotes] = useState({
    title: "",
    desc: "",
    NoteID: "",
    token,
  });

  function getId(_id) {
    setgetNoteId(_id);
  }

  function addNotes(e) {
    let myNotes = { ...postNotes };
    myNotes[e.target.name] = e.target.value;
    setPostNotes(myNotes);
  }
  async function sendNotes(e) {
    e.preventDefault();
    let { data } = await axios.post(baseUrl + "addNote", postNotes);
    if (data.message === "success") {
      getAllNotes();
    }
  }

  async function getAllNotes() {
    let { data } = await axios.get(baseUrl + `getUserNotes`, {
      headers: {
        token,
        userID,
      },
    });
    if (data.message === "no notes found") {
      setMessage(data.message);
    } else {
      setGetNotes(data.Notes);
      setNotes(data.Notes);
    }
  }

  useEffect(() => {
    getAllNotes();
  }, []);

  async function deletNote(_id) {
    let { data } = await axios.delete(baseUrl + "deleteNote", {
      data: {
        token,
        NoteID: getNoteId,
      },
    });
    if (data.message === "deleted") {
      getAllNotes();
    } 
  }

  function search({ target }) {
    var reuslt = Notes.filter((note) =>
      note.title.toLowerCase().includes(target.value.toLowerCase())
    );

    setGetNotes(reuslt);
  }
  function editNote(note) {
    setvalueEditTitle(note.title);
    setvalueEditDesc(note.desc);

    let myUpDateNotes = { ...updateNotes };
    myUpDateNotes.title = note.title;
    myUpDateNotes.desc = note.desc;
    myUpDateNotes.NoteID = note._id;

    setUpdateNotes(myUpDateNotes);
  }

  function upDateNoteItem(e) {
    if (e.target.name === "title") {
      setvalueEditTitle(e.target.value);
    } else {
      setvalueEditDesc(e.target.value);
    }
    let myUpDateNotes = { ...updateNotes };
    myUpDateNotes[e.target.name] = e.target.value;
    setUpdateNotes(myUpDateNotes);
  }

  async function Update(e) {
    e.preventDefault();

    let { data } = await axios.put(baseUrl + "updateNote", updateNotes);

    if (data.message === "updated") {
      getAllNotes();
    } 
  }

  return (
    <div className="vh-100">
      <div className="container my-5 buttonAdd">
        <div className="col-md-12 m-auto text-right">
          <button
            type="button"
            className="btn btn-secondary "
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Note
          </button>
        </div>
      </div>

      <div className="container">
        <input
          onChange={search}
          placeholder="Search with title Note"
          name="title"
          className="form-control "
          type="text"
        />
      </div>
      {/*<!-- Modal -->*/}
      {/* <div
        className="modal fade "
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form onSubmit={sendNotes}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  onChange={addNotes}
                  placeholder="Type Title"
                  name="title"
                  className="form-control "
                  type="text"
                />
                <textarea
                  onChange={addNotes}
                  className="form-control my-2"
                  placeholder="Type your note"
                  name="desc"
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-info"
                  data-bs-dismiss="modal"
                >
                  <i className="fas fa-plus-circle"></i> Add Note
                </button>
              </div>
            </div>
          </div>
        </form>
      </div> */}
      <AddNote sendNotes={sendNotes} addNotes={addNotes} />
      {/*<!-- Modal delete note -->*/}

      <div
        className="modal fade"
        id="exampleModaldelet"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body"> Are you suer ?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={() => {
                  deletNote(getNoteId);
                }}
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*<!-- notes -->*/}

      <div className="container">
        <div className="row justify-content-center">
          {getNotes.length > 0 ? (
            getNotes.map((note) => (
              <DisplayNote
                key={note._id}
                note={note}
                editNote={editNote}
                getId={getId}
              />
            ))
          ) : (
            <h3 className="text-center text-secondary my-3 ">{message.toLocaleUpperCase()}</h3>
          )}
        </div>
      </div>

      {/*<!--  modal for Edit-->*/}
      <div
        className="modal fade"
        id="exampleModalEdite"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form onSubmit={Update}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  onChange={upDateNoteItem}
                  placeholder="Type Title"
                  name="title"
                  className="form-control "
                  type="text"
                  value={valueEditTitle}
                />
                <textarea
                  onChange={upDateNoteItem}
                  type="text"
                  className="form-control my-2"
                  placeholder="Type your note edit"
                  name="desc"
                  value={valueEditDesc}
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-info"
                  data-bs-dismiss="modal"
                >
                  update now
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
