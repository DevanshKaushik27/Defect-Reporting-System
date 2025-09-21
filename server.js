const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Initialize express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json({limit: '50mb'}));  // Increased limit for image data
app.use(express.static(path.join(__dirname)));  // Serve files from project root instead of public directory

// Create data directories if they don't exist
const IMAGES_DIR = path.join(__dirname, 'data', 'images');
const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log(`Created directory: ${DATA_DIR}`);
}

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  console.log(`Created directory: ${IMAGES_DIR}`);
}

// Load all defects from the filesystem
const defectsFilePath = path.join(DATA_DIR, 'defects.json');
let defects = [];

try {
  if (fs.existsSync(defectsFilePath)) {
    const data = fs.readFileSync(defectsFilePath, 'utf8');
    defects = JSON.parse(data);
    console.log(`Loaded ${defects.length} defects from storage`);
  } else {
    fs.writeFileSync(defectsFilePath, JSON.stringify(defects));
    console.log('Created empty defects storage file');
  }
} catch (error) {
  console.error('Error loading defects data:', error);
  defects = [];
}

// Save defects to filesystem
function saveDefects() {
  try {
    fs.writeFileSync(defectsFilePath, JSON.stringify(defects, null, 2));
    console.log('Defects saved successfully');
    return true;
  } catch (error) {
    console.error('Error saving defects:', error);
    return false;
  }
}

// Helper function to save base64 image to file
function saveImage(base64Image) {
  try {
    // Check if base64Image is valid
    if (!base64Image || typeof base64Image !== 'string') {
      console.error('Invalid image data: Image data is missing or not a string');
      return null;
    }
    
    // Check if it's a valid base64 image string
    if (!base64Image.startsWith('data:image/')) {
      console.error('Invalid image data: Not a valid base64 image string');
      return null;
    }
    
    // Remove data:image/png;base64, prefix if it exists
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    
    // Additional validation - check if the remaining string is valid base64
    try {
      const buffer = Buffer.from(base64Data, 'base64');
      if (buffer.length === 0) {
        console.error('Invalid image data: Empty buffer after base64 decoding');
        return null;
      }
    } catch (err) {
      console.error('Invalid base64 encoding:', err);
      return null;
    }
    
    // Create a unique filename
    const filename = `${uuidv4()}.png`;
    const filepath = path.join(IMAGES_DIR, filename);
    
    // Write the file
    fs.writeFileSync(filepath, base64Data, 'base64');
    console.log(`Image saved to: ${filepath}`);
    
    return filename;
  } catch (error) {
    console.error('Error saving image:', error);
    return null;
  }
}

// API Routes
app.post('/api/defects', (req, res) => {
  try {
    const defectData = req.body;
    console.log(`Processing defect submission: ${defectData.defectId}`);
    
    // Validate required fields
    if (!defectData.defectType || !defectData.severity || !defectData.location || !defectData.description) {
      console.error('Missing required fields in defect submission');
      return res.status(400).json({ message: 'Missing required fields. Please fill out all required fields.' });
    }
    
    // Validate image data
    if (!defectData.imageUrl || typeof defectData.imageUrl !== 'string' || !defectData.imageUrl.startsWith('data:image/')) {
      console.error('Invalid or missing image data');
      return res.status(400).json({ message: 'No valid image data provided. Please capture an image first.' });
    }
    
    // Generate a unique ID if not provided
    if (!defectData.defectId) {
      defectData.defectId = 'DEF-' + Date.now();
    }
    
    // Save image to filesystem and store the filename
    console.log('Attempting to save image...');
    const imageFilename = saveImage(defectData.imageUrl);
    if (!imageFilename) {
      console.error('Failed to save image');
      return res.status(500).json({ message: 'Failed to save image. The image data may be corrupted.' });
    }
    
    // Create defect object
    const defect = {
      defectId: defectData.defectId,
      timestamp: new Date(),
      imageUrl: imageFilename,  // Store filename instead of base64 data
      defectType: defectData.defectType || 'Unknown',
      severity: defectData.severity || 'Low',
      location: defectData.location || 'Not specified',
      description: defectData.description || 'No description',
      status: defectData.status || 'New',
      reportedBy: defectData.reportedBy || 'Anonymous',
      assignedTo: defectData.assignedTo || null
    };
    
    // Add to collection and save
    defects.push(defect);
    console.log('Saving defect to file...');
    const saved = saveDefects();
    
    if (!saved) {
      console.error('Failed to save defect data to file');
      return res.status(500).json({ message: 'Failed to save defect data to file. Please try again.' });
    }
    
    console.log(`Defect ${defect.defectId} saved successfully`);
    res.status(201).json(defect);
  } catch (error) {
    console.error('Error in defect submission:', error);
    res.status(400).json({ message: `Failed to save defect: ${error.message}` });
  }
});

app.get('/api/defects', (req, res) => {
  try {
    // For each defect, convert imageUrl to full URL
    const defectsWithImageUrls = defects.map(defect => ({
      ...defect,
      imageUrl: `/api/images/${defect.imageUrl}`
    }));
    
    res.json(defectsWithImageUrls);
  } catch (error) {
    console.error('Error fetching defects:', error);
    res.status(500).json({ message: error.message });
  }
});

// Serve images
app.get('/api/images/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(IMAGES_DIR, filename);
    
    if (!fs.existsSync(filepath)) {
      return res.status(404).send('Image not found');
    }
    
    res.sendFile(filepath);
  } catch (error) {
    console.error('Error serving image:', error);
    res.status(500).send('Error loading image');
  }
});

app.get('/api/defects/:id', (req, res) => {
  try {
    const defect = defects.find(d => d.defectId === req.params.id);
    
    if (!defect) {
      return res.status(404).json({ message: 'Defect not found' });
    }
    
    // Convert imageUrl to full URL
    const defectWithImageUrl = {
      ...defect,
      imageUrl: `/api/images/${defect.imageUrl}`
    };
    
    res.json(defectWithImageUrl);
  } catch (error) {
    console.error('Error fetching defect by ID:', error);
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/defects/:id', (req, res) => {
  try {
    const defectId = req.params.id;
    const updateData = req.body;
    
    // Find the defect
    const index = defects.findIndex(d => d.defectId === defectId);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Defect not found' });
    }
    
    // Update the defect (excluding imageUrl which can't be changed)
    defects[index] = {
      ...defects[index],
      defectType: updateData.defectType || defects[index].defectType,
      severity: updateData.severity || defects[index].severity,
      location: updateData.location || defects[index].location,
      description: updateData.description || defects[index].description,
      status: updateData.status || defects[index].status,
      assignedTo: updateData.assignedTo
    };
    
    // Save the changes
    const saved = saveDefects();
    
    if (!saved) {
      return res.status(500).json({ message: 'Failed to update defect' });
    }
    
    // Return the updated defect with full image URL
    const updatedDefect = {
      ...defects[index],
      imageUrl: `/api/images/${defects[index].imageUrl}`
    };
    
    res.json(updatedDefect);
  } catch (error) {
    console.error('Error updating defect:', error);
    res.status(400).json({ message: error.message });
  }
});

// Serve static files - catch-all route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Open your browser and go to: http://localhost:${PORT}`);
}); 