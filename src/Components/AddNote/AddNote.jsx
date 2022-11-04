import React from 'react'

export default function AddNote({sendNotes,addNotes}) {
  return (
    <>
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
    </>
  )
}
