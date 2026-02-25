import React, { useState, useEffect } from 'react';
import StatCounter from './StatCounter';
import EnrollmentChart from './EnrollmentChart';
import TeacherChart from './TeacherChart';
import EnrollmentTrendChart from './EnrollmentTrendChart';
import '../dashboard/dashboard.css';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    courseNames: [],
    enrollmentsCount: [],
    teacherNames: [],
    coursesPerTeacher: [],
    months: [],
    enrollmentsPerMonth: [],
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch dashboard data from API
    const fetchDashboardData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('http://127.0.0.1:8000/api/dashboard/');
        const data = await response.json();        
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();

    // Check for success message (from session or props)
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('success')) {
      setSuccessMessage(queryParams.get('success'));
      setTimeout(() => setSuccessMessage(''), 5000);
    }
  }, []);

  return (
    <>
      {/* Success Alert */}
      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {successMessage}
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccessMessage('')}
            aria-label="Close"
          ></button>
        </div>
      )}

      <div>
        {/* Counters Section */}
      <section className="row g-4 mb-4" style={{ marginBottom: '2rem' }}>
        <div className="col-md-4">
          <StatCounter
            icon="bi-people-fill"
            title="Total Students"
            value={dashboardData.totalStudents}
            color="primary"
          />
        </div>
        <div className="col-md-4">
          <StatCounter
            icon="bi-book-fill"
            title="Total Courses"
            value={dashboardData.totalCourses}
            color="warning"
          />
        </div>
        <div className="col-md-4">
          <StatCounter
            icon="bi-clipboard-check-fill"
            title="Total Enrollments"
            value={dashboardData.totalEnrollments}
            color="danger"
          />
        </div>
      </section>

      {/* Charts Section */}
      <section className="row g-4 mb-4" style={{ marginBottom: '2rem' }}>
        <div className="col-md-6">
          <div className="card border-0 shadow-sm dashboard-card" style={{ minHeight: '400px' }}>
            <div className="card-header bg-white border-0 pt-4 pb-3">
              <div className="d-flex align-items-center">
                <i className="bi bi-graph-up text-success me-2" style={{ fontSize: '1.25rem' }}></i>
                <h6 className="mb-0 fw-semibold">Enrollments Trend (Last 12 Months)</h6>
              </div>
            </div>
            <div className="card-body" style={{ position: 'relative', height: '300px' }}>
              <EnrollmentTrendChart
                months={dashboardData.months}
                enrollmentsPerMonth={dashboardData.enrollmentsPerMonth}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-0 shadow-sm dashboard-card" style={{ minHeight: '400px' }}>
            <div className="card-header bg-white border-0 pt-4 pb-3">
              <div className="d-flex align-items-center">
                <i className="bi bi-bar-chart-fill text-primary me-2" style={{ fontSize: '1.25rem' }}></i>
                <h6 className="mb-0 fw-semibold">Enrollments per Course</h6>
              </div>
            </div>
            <div className="card-body" style={{ position: 'relative', height: '300px' }}>
              <EnrollmentChart
                courseNames={dashboardData.courseNames}
                enrollmentsCount={dashboardData.enrollmentsCount}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="row g-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm dashboard-card" style={{ minHeight: '400px' }}>
            <div className="card-header bg-white border-0 pt-4 pb-3">
              <div className="d-flex align-items-center">
                <i className="bi bi-person-badge-fill text-danger me-2" style={{ fontSize: '1.25rem' }}></i>
                <h6 className="mb-0 fw-semibold">Courses per Teacher</h6>
              </div>
            </div>
            <div className="card-body" style={{ position: 'relative', height: '300px' }}>
              <TeacherChart
                teacherNames={dashboardData.teacherNames}
                coursesPerTeacher={dashboardData.coursesPerTeacher}
              />
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default Dashboard;
