import React from "react";
import axios from "axios";
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Bounds } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter";
import "./cadview.css"; // Updated CSS for cadview.js

// Model component that loads and displays an STL file
function Model({ fileUrl }) {
  const geometry = useLoader(STLLoader, fileUrl);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#ff9f1c" /> {/* Accent orange */}
    </mesh>
  );
}

function CADViewer({ fileUrl, file }) {
  const handleConvertToObj = async () => {
    if (!file) return;

    try {
      const loader = new STLLoader();
      loader.load(fileUrl, (geometry) => {
        const mesh = new THREE.Mesh(geometry);
        const exporter = new OBJExporter();
        const objData = exporter.parse(mesh);

        const blob = new Blob([objData], { type: "text/plain" });
        const formData = new FormData();
        formData.append("file", blob, file.name.replace(".stl", ".obj"));

        axios
          .post("http://localhost:4000/upload-obj", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            alert("OBJ file uploaded successfully: " + response.data.filePath);
          })
          .catch((error) => {
            console.error("Failed to upload OBJ:", error);
          });
      });
    } catch (error) {
      console.error("Failed to convert or upload OBJ:", error);
    }
  };

  return (
    <div className="cad-viewer-container">
      <div className="canvas-wrapper">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />
          <OrbitControls />

          {/* Automatically fit the model */}
          <Bounds fit clip observe margin={1.2}>
            {file ? (
              <Model fileUrl={fileUrl} />
            ) : (
              <mesh rotation={[0.5, 0.5, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#495057" /> {/* Dark gray */}
              </mesh>
            )}
          </Bounds>
        </Canvas>
      </div>

      {file && (
        <button className="convert-button" onClick={handleConvertToObj}>
          Convert to OBJ and Upload
        </button>
      )}
    </div>
  );
}

export default CADViewer;