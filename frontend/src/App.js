import React, { useState } from "react";
import CADViewer from "./components/cadview";
import "./App.css"; 

function App() {
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const url = URL.createObjectURL(uploadedFile);
      setFileUrl(url);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Web-Based CAD Viewer</h1>
        <p>Upload and visualize your STL files in 3D</p>
      </header>
      <div className="file-upload-container">
        <label htmlFor="file-upload" className="file-upload-label">
          Choose STL File
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".stl"
          onChange={handleFileUpload}
          className="file-upload-input"
        />
      </div>
      {fileUrl ? (
        <div className="file-info">
          <p>File uploaded: <span className="file-name">{file.name}</span></p>
          <CADViewer fileUrl={fileUrl} file={file} />
        </div>
      ) : (
        <p className="no-file-message">No file uploaded yet.</p>
      )}
    </div>
  );
}

export default App;
