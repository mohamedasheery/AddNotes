import axios from "axios";
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export default function Home() {
  let baseUrl = "https://route-egypt-api.herokuapp.com/";

  const token = localStorage.getItem("token");
  if (token) {
    var userToken = jwt_decode(token);
  }

  const userID = userToken._id;
  const [valueEditTitle, setvalueEditTitle] = useState("");
  const [valueEditDesc, setvalueEditDesc] = useState("");
  const [searchNotes, setSearchNotes] = useState(null);
  const [getNoteId, setgetNoteId] = useState("");

  const [getNotes, setGetNotes] = useState([]);
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
    } else {
      console.log(data.message);
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
     
      setGetNotes([
        {
          title: "for test",
          desc: "this is note for test please add  new notes ",
        },
      ]);
    } else {
      setGetNotes(data.Notes);
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
    } else {
      console.log(data.message);
    }
  }

  function search({ target }) {
    let valuesearch = target.value;

    var reusltSearch = getNotes.filter((note) =>
      note.title.toLowerCase().includes(valuesearch.toLowerCase())
    );

    setSearchNotes(reusltSearch);

  }
  function editNote(note) {
    setvalueEditTitle(note.title);
    setvalueEditDesc(note.desc);

    let myUpDateNotes = { ...updateNotes };
    myUpDateNotes.title = note.title;
    myUpDateNotes.desc = note.desc;
    myUpDateNotes.NoteID = note._id;

    setUpdateNotes(myUpDateNotes);
    console.log(updateNotes);
  }
  function upDateValueTitle(e) {
   setvalueEditTitle(e.target.value);

    let myUpDateNotes = { ...updateNotes };
    myUpDateNotes.title = e.target.value;
    setUpdateNotes(myUpDateNotes);

    console.log(updateNotes);
  }
  function upDateValueDesc(e) {
   setvalueEditDesc(e.target.value); 
    let myUpDateNotes = { ...updateNotes };
    myUpDateNotes.desc = e.target.value;
    setUpdateNotes(myUpDateNotes);
    console.log(updateNotes);
  }
  async function Update(e) {
    e.preventDefault();

    let { data } = await axios.put(baseUrl + "updateNote", updateNotes);

    console.log(data);
    console.log(updateNotes);
    if (data.message === "updated") {
      getAllNotes();
    } else {
      console.log(data);
    }
  }

  return (
    <>
      <div className="container my-5">
        <div className="col-md-12 m-auto text-right">
          <button
            type="button"
            className="btn btn-primary"
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
      <div
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
      </div>
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
      {searchNotes ? (
        <>
          <div className="container">
            <div className="row">
              {searchNotes.map((note) => {
                return (
                  <div key={note._id} className="col-md-4 my-4">
                    <div className="note p-4">
                      <h3 className="float-left">{note.title} </h3>

                      // <span className="clearfix">{note._id}</span>
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
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <div className="row">
              {getNotes.map((note) => {
                return (
                  <div key={note._id} className="col-md-4 my-4">
                    <div className="note p-4">
                      <h3 className="float-left">{note.title} </h3>

                      // <span className="clearfix">{note._id}</span>
                      <p>{note.desc}</p>
                      <i
                        onClick={() => {
                          editNote(note);
                        }}
                        className="fas fa-edit float-right edit"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalEdite"
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
                );
              })}
            </div>
          </div>
        </>
      )}
      {/*<!--  modal for Edit-->*/}
      <div
        className="modal fade "
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
                  onChange={upDateValueTitle}
                  placeholder="Type Title"
                  name="title"
                  className="form-control "
                  type="text"
                  value={valueEditTitle}
                />
                <textarea
                  onChange={upDateValueDesc}
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
    </>
  );
}
