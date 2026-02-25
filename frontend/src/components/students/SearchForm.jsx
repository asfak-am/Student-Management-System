import React, { useState, useEffect } from 'react';

function SearchForm({ searchTerm, onSearch, onClear }) {
  const [input, setInput] = useState(searchTerm);

  // keep local input in sync when parent searchTerm changes (e.g. cleared externally)
  useEffect(() => {
    setInput(searchTerm || '');
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSearch === 'function') onSearch(input);
  };

  const handleClear = () => {
    setInput('');
    if (typeof onClear === 'function') onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="search-section mb-4">
      <div className="row g-2 align-items-center">
        <div className="col-md-8 col-lg-9">
          <div className="search-input-wrapper">
            <i className="bi bi-search search-icon"></i>
            <input
              type="text"
              name="search"
              className="form-control search-input-field"
              placeholder="Search by name, email or phone"
              value={input}
              onChange={handleInputChange}
              style={{paddingLeft:'40px'}}
            />
            {input && (
              <button
                type="button"
                className="clear-search"
                onClick={handleClear}
                title="Clear search"
              >
                <i className="bi bi-x-circle-fill"></i>
              </button>
            )}
          </div>
        </div>
        <div className="col-md-4 col-lg-3">
          <button className="btn btn-search w-100" type="submit">
            <i className="bi bi-search me-1"></i>
            <span>Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;
