import React, { useState, useEffect } from 'react';

function EditStudentModal({ show, onClose, student, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        phone: student.phone,
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    // phone is now optional
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      onSubmit(student.id, formData);
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  if (!show || !student) return null;

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Student</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group mb-3">
                <label htmlFor="edit_name">Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  name="name"
                  id="edit_name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="edit_email">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  name="email"
                  id="edit_email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="edit_phone">Phone</label>
                <input
                  type="text"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  name="phone"
                  id="edit_phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <small className="text-danger">{errors.phone}</small>}
              </div>

              {/* joining_date field removed */}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditStudentModal;
