import React from 'react';

const LineInfo = () => {
  return (
    <div className="LineInfo-container">
      <div className="LineInfo-title">Positive Data</div>
      <hr />
      <div className="LineInfo-column">
        <div className="LineInfo-label">
          <input type="checkbox" />
          <label>IP (A)</label>
        </div>
        <div className="LineInfo-label">
          <input type="checkbox" />
          <label>Tr (sP)</label>
        </div>
        <div className="LineInfo-label">
          <input type="checkbox" />
          <label>FWHM (sP)</label>
        </div>
        <div className="LineInfo-label">
          <input type="checkbox" />
          <label>Ip2 (%)</label>
        </div>
      </div>
    </div>
  );
};

export default LineInfo;
