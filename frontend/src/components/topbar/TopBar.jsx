import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../topbar/topbar.css';

function TopBar({ title, icon, subtitle }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { user } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const defaultTitle = title || 'Dashboard';
  const defaultIcon = icon || 'bi-grid-fill';
  const defaultSubtitle = subtitle || `Manage your ${defaultTitle.toLowerCase()}`;

  return (
    <header className="top-bar-wrapper mb-4">
      <div className="top-bar d-flex justify-content-between align-items-center">
        {/* Left Side */}
        <div className="d-flex align-items-center gap-3">
          {/* Hamburger Button for Mobile */}
          <button
            className="btn btn-hamburger d-md-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileSidebar"
            aria-label="Toggle sidebar"
          >
            <i className="bi bi-list"></i>
          </button>

          {/* Title and Icon */}
          <div className="d-flex align-items-center gap-3">
            <div className="title-icon d-none d-md-flex">
              <i className={`bi ${defaultIcon}`}></i>
            </div>
            <div>
              <h3 className="page-title mb-0">{defaultTitle}</h3>
              {!isMobile && <p className="page-subtitle mb-0">{defaultSubtitle}</p>}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="d-flex align-items-center gap-3">
          {/* Notifications */}
          <button
            className="btn btn-icon d-none d-md-flex"
            title="Notifications"
            type="button"
            aria-label="Notifications"
          >
            <i className="bi bi-bell-fill"></i>
            <span className="notification-badge">3</span>
          </button>

          {/* User Profile */}
          <div className="user-profile d-flex align-items-center gap-2">
            <div className="text-end d-none d-md-block">
              <p className="user-name mb-0">{user?.name || 'User'}</p>
              <p className="user-role mb-0">{user?.role || 'Member'}</p>
            </div>
            <div className="user-avatar">
              <img
                src="https://i.pravatar.cc/40?img=8"
                className="rounded-circle"
                alt={user?.name || 'User'}
              />
              <span className="status-indicator"></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
