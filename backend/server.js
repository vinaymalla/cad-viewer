const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.static('uploads'));

// Configure file storage
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

app.get('/', (req, res) => {
    res.send('Backend is running! 🚀');
  });
  

const upload = multer({ storage });

app.post('/upload-obj', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No OBJ file uploaded' });
  }
  res.json({ message: 'OBJ file uploaded successfully', filePath: `/uploads/${req.file.filename}` });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
