import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import StudentTable from './StudentTable';
import CreateStudentModal from './modals/CreateStudentModal';
import EditStudentModal from './modals/EditStudentModal';
import ShowStudentModal from './modals/ShowStudentModal';
import Pagination from '../common/Pagination';
import '../students/students.css';

function Students() {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);

  

  // include fetchTrigger to force refresh after mutations
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const q = encodeURIComponent(searchTerm || '');
        const res = await fetch(`http://127.0.0.1:8000/api/students?page=${currentPage}&search=${q}`);
        const json = await res.json();

        if (json && Array.isArray(json.data)) {
          setStudents(json.data);
          const meta = json.meta || {};
          setTotalPages(meta.last_page || 1);
          setItemsPerPage(meta.per_page || 10);
        } else {
          setStudents(Array.isArray(json) ? json : []);
          setTotalPages(1);
          setItemsPerPage(10);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [currentPage, searchTerm, fetchTrigger]);

  const handleCreateStudent = async (formData) => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error('Create failed', err);
        return;
      }

      setShowCreateModal(false);
      setSuccessMessage('Student created successfully');
      setTimeout(() => setSuccessMessage(''), 5000);
      setFetchTrigger(f => f + 1);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const handleUpdateStudent = async (id, formData) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error('Update failed', err);
        return;
      }

      setShowEditModal(false);
      setEditStudent(null);
      setSuccessMessage('Student updated successfully');
      setTimeout(() => setSuccessMessage(''), 5000);
      setFetchTrigger(f => f + 1);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/students/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error('Delete failed', err);
        return;
      }

      setSuccessMessage('Student deleted successfully');
      setTimeout(() => setSuccessMessage(''), 5000);
      setFetchTrigger(f => f + 1);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleViewStudent = (student) => {
    setViewStudent(student);
    setShowStudentModal(true);
  };

  const handleEditStudent = (student) => {
    setEditStudent(student);
    setShowEditModal(true);
  };

  // students are provided by backend; use itemsPerPage and totalPages from state
  const paginatedStudents = students;

  return (
    <div className="students-container">
      {/* Success Alert */}
      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
          {successMessage}
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccessMessage('')}
            aria-label="Close"
          ></button>
        </div>
      )}

      <div className="row">
        <div className="col-md-12">
          <div className="card mb-2">
            <div className="card-body">
              {/* Header with Title and Create Button */}
              <div className="section-header mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="section-title mb-1">Student List</h5>
                    <p className="section-subtitle mb-0">Manage all students</p>
                  </div>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="btn btn-primary btn-create"
                  >
                    <i className="bi bi-plus-circle me-1"></i>
                    <span className="d-none d-sm-inline">Create Student</span>
                    <span className="d-inline d-sm-none">Add</span>
                  </button>
                </div>
              </div>

              {/* Search Form */}
              <SearchForm
                searchTerm={searchTerm}
                onSearch={handleSearch}
                onClear={handleClearSearch}
              />

              {/* Table */}
              {isLoading ? (
                <div className="text-center py-4">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <StudentTable
                  students={paginatedStudents}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  onView={handleViewStudent}
                  onEdit={handleEditStudent}
                  onDelete={handleDeleteStudent}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Modals */}
      <CreateStudentModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateStudent}
      />

      {editStudent && (
        <EditStudentModal
          show={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditStudent(null);
          }}
          student={editStudent}
          onSubmit={handleUpdateStudent}
        />
      )}

      {viewStudent && (
        <ShowStudentModal
          show={showStudentModal}
          onClose={() => {
            setShowStudentModal(false);
            setViewStudent(null);
          }}
          student={viewStudent}
        />
      )}
    </div>
  );
}

export default Students;
