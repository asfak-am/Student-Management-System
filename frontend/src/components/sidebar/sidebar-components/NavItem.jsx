import React from 'react';

function NavItem({ text, icon, route, isActive, onClick }) {
    return (
        <a
            href="#"
            className={`nav-link ${isActive ? 'active' : ''}`}
            onClick={(e) => {
                e.preventDefault();
                onClick && onClick();
            }}
            style={{
                color: isActive ? '#fff' : '#cfd8ff',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: '10px',
                background: isActive
                    ? 'linear-gradient(135deg, #0b1d3a, #1700ea)'
                    : 'transparent',
                transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
                if (!isActive) {
                    e.currentTarget.style.background = 'rgba(102, 126, 234, 0.2)';
                }
            }}
            onMouseLeave={(e) => {
                if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                }
            }}
        >
            {icon && <i className={`bi ${icon}`}></i>}
            <span>{text}</span>
        </a>
    );
}

export default NavItem;