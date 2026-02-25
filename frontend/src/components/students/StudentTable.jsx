import React from 'react';

function StudentTable({ students, currentPage, itemsPerPage, onView, onEdit, onDelete }) {
  // joining_date removed

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th style={{ width: '50px' }}>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th style={{ width: '200px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={student.id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>
                  <div className="btn-group btn-group-sm gap-3" role="group">
                    <button
                      onClick={() => onView(student)}
                      className="btn btn-info btn-sm"
                      title="View"
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    <button
                      onClick={() => onEdit(student)}
                      className="btn btn-warning btn-sm"
                      title="Edit"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      onClick={() => onDelete(student.id)}
                      className="btn btn-danger btn-sm"
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted py-4">
                <i className="bi bi-inbox" style={{ fontSize: '3rem' }}></i>
                <p className="mt-2">No students found</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
