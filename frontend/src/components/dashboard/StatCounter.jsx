import React, { useEffect, useState } from 'react';

function StatCounter({ icon, title, value, color }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      setDisplayValue((prevCount) => {
        if (prevCount < value) {
          const increment = Math.ceil(value / 100);
          return Math.min(prevCount + increment, value);
        }
        return value;
      });
    };

    const interval = setInterval(updateCount, 20);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="card dashboard-card border-0 shadow-sm">
      <div className="card-body text-center">
        <div className="icon-wrapper mb-3">
          <i className={`bi ${icon} text-${color}`} style={{ fontSize: '2rem' }}></i>
        </div>
        <h6 className="text-muted mb-2">{title}</h6>
        <h2 className="counter fw-bold text-${color} mb-0" style={{ fontSize: '2.5rem' }}>
          {displayValue}
        </h2>
      </div>
    </div>
  );
}

export default StatCounter;
