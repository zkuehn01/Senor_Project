import React, { useState } from 'react';
import BtnScript from './BtnScript';

const SidePanel = ({ data, selectedData, onToggleLine }) => {
  const [waveformSelected, setWaveformSelected] = useState(false);
  const [importedData, setImportedData] = useState([]);

  const handleToggleWaveform = () => {
    setWaveformSelected(!waveformSelected);

    if (!waveformSelected) {
      onToggleLine(true);
    } else {
      onToggleLine(false);
    }
  };

  const handleSelectWaveform = (checked) => {
    if (checked) {
      onToggleLine(true);
    } else {
      onToggleLine(false);
    }
  };

  const handleExport = () => {
    console.log('Export button clicked');
  };

  const handleImport = (fileName, fileContent) => {
    setImportedData(prevData => [...prevData, { name: fileName, content: fileContent }]);
  };

  return (
    <div className="SidePanel">
      <h3>Side Panel</h3>
      <div className="row-container">
        <div className="row">
          <label>
            <input
              type="checkbox"
              checked={selectedData === data.waveform}
              onChange={(e) => handleSelectWaveform(e.target.checked)}
            />
            Waveform Data
          </label>
        </div>
        <div className="row">
        </div>
        {importedData.map((file, index) => (
          <div className="row" key={index}>
            <label>
              <input
                type="checkbox"
                checked={selectedData === file.content}
                onChange={(e) => console.log('Checkbox clicked')}
              />
              {file.name}
            </label>
          </div>
        ))}
      </div>
      {selectedData === data.waveform && (
        <div>
          <h4>Waveform Data</h4>
          <pre>{JSON.stringify(data.waveform, null, 2)}</pre>
        </div>
      )}
      <BtnScript onExport={handleExport} onImport={handleImport} />
    </div>
  );
};

export default SidePanel;
