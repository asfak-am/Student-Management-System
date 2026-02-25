import React from 'react';

function ShowStudentModal({ show, onClose, student }) {

  if (!show || !student) return null;

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Student Details</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label fw-bold">Name:</label>
              <div className="col-sm-8">
                <p className="form-control-plaintext">{student.name}</p>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label fw-bold">Email:</label>
              <div className="col-sm-8">
                <p className="form-control-plaintext">{student.email}</p>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label fw-bold">Phone:</label>
              <div className="col-sm-8">
                <p className="form-control-plaintext">{student.phone}</p>
              </div>
            </div>

            {/* joining_date removed */}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowStudentModal;
