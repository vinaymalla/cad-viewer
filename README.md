
# 3D CAD Viewer and Converter

# Description

A web application to visualize and convert 3D CAD models. It loads STL files, renders them in a 3D view, and allows conversion to OBJ format with file upload support.

# Tech Stack

Frontend: React, Three.js, @react-three/fiber, @react-three/drei

Backend: Node.js, Express, Multer

Deployment: Render (backend), Firebase (frontend)

# Features

3D model rendering with STL support

Orbit controls for model manipulation

STL to OBJ conversion and upload

# Installation

Clone the repository:

git clone https://github.com/vinaymalla/cad-viewer.git
 

Navigate to the project directory:

cd cad-viewer

# Install dependencies:

# For the backend:

cd backend
npm install express multer path cors


# For the frontend:

cd frontend
npm install react react-dom @react-three/fiber @react-three/drei three axios


# Running the Application

Start the Backend Server:

npm run start

Start the Frontend:

npm start

The frontend will run on http://localhost:3000, and the backend on http://localhost:4000.

# File Upload and Conversion

Upload STL files via the frontend.

Convert STL to OBJ with the "Convert to OBJ and Upload" button.
