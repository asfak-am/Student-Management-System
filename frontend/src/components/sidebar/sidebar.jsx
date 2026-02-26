import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavItem from './sidebar-components/NavItem';
import '../sidebar/sidebar.css';

function Sidebar({ onNavigate, activeRoute = 'dashboard', onLogout }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { id: 1, text: 'Dashboard', icon: 'bi-grid', route: 'dashboard' },
    { id: 2, text: 'Students', icon: 'bi-people-fill', route: 'students' },
    { id: 3, text: 'Teachers', icon: 'bi-person-badge-fill', route: 'teachers' },
    { id: 4, text: 'Courses', icon: 'bi-book-fill', route: 'courses' },
    { id: 5, text: 'Enrollments', icon: 'bi-clipboard-check-fill', route: 'enrollments' },
    { id: 6, text: 'Assignments', icon: 'bi-diagram-3-fill', route: 'assignments' },
  ];

  const handleNavClick = (route) => {
    if (onNavigate) {
      onNavigate(route);
    }
  };

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
      navigate('/login');
    }
  };

  return (
    <>
      {/* Mobile Offcanvas Sidebar */}
      <div
        className="offcanvas offcanvas-start d-md-none"
        tabIndex="-1"
        id="mobileSidebar"
        aria-labelledby="mobileSidebarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="text-dark flex-grow-1 text-left" id="mobileSidebarLabel">
            Student Management System
          </h5>
          <div style={{ width: '30px' }}></div>
        </div>
        <div className="offcanvas-body p-0 d-flex flex-column">
          <div className="sidebar p-3" style={{ position: 'relative', minHeight: 'auto', flex: 1 }}>
            <button
            type="button"
            className="btn-close-custom text-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i className="bi bi-arrow-left"></i>
          </button>
            <nav className="d-grid gap-2">
              {navItems.map((item) => (
                <NavItem
                  key={item.id}
                  text={item.text}
                  icon={item.icon}
                  route={item.route}
                  isActive={activeRoute === item.route}
                  onClick={() => handleNavClick(item.route)}
                />
              ))}
            </nav>
            <button
              className="btn position-fixed bottom-0 btn-danger py-2 px-4 mb-4 mt-auto"
              onClick={handleLogout}
              style={{ marginTop: 'auto' }}
            >
              <i className="bi bi-box-arrow-right me-2"></i>Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar (Fixed) */}
      <aside className="sidebar p-3 d-none d-md-block">
        <a href="/" className="text-decoration-none">
          <h4 className="text-white h5 p-2 mb-4">
            <i className="bi bi-buildings-fill me-2"></i>EnrollNet
          </h4>
        </a>
        <nav className="d-grid gap-2">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              text={item.text}
              icon={item.icon}
              route={item.route}
              isActive={activeRoute === item.route}
              onClick={() => handleNavClick(item.route)}
            />
          ))}
        </nav>
        <button
          className="btn position-fixed bottom-0 btn-danger py-2 px-5 mb-4 mt-3"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-2"></i>Sign Out
        </button>
      </aside>
    </>
  );
}

export default Sidebar;