# PD Defect Reporting System

A comprehensive web-based defect reporting and management system designed for capturing, tracking, and managing product defects with image documentation. This system provides a complete workflow from defect capture to resolution tracking.

## 🚀 Features

### Core Functionality
- **Camera Integration**: Capture defect images directly from device camera
- **Defect Management**: Create, view, update, and track defects
- **Image Storage**: Secure local storage of defect images with unique identifiers
- **Real-time Updates**: Live defect status updates and tracking
- **Responsive Design**: Mobile-friendly interface for field use

### Key Components
- **User Authentication**: Simple login system for access control
- **Defect Capture**: Camera-based image capture with form data
- **Defect Listing**: Comprehensive view of all reported defects
- **Defect Details**: Detailed view with full defect information
- **Status Management**: Track defect status from New to Resolved
- **Search & Filter**: Easy navigation through defect records

## 🛠️ Technology Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **File System Storage**: JSON-based data persistence
- **Multer**: File upload handling
- **UUID**: Unique identifier generation

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with responsive design
- **JavaScript (ES6+)**: Client-side functionality
- **Bootstrap 5**: UI framework for responsive design
- **Camera API**: Native browser camera integration

### Database
- **JSON File Storage**: Lightweight data persistence
- **SQL Server Support**: Optional database integration (see `create_tables.sql`)

## 📁 Project Structure

```
PD Defect Reporting/
├── 📄 index.html              # Landing page
├── 📄 login.html              # User authentication
├── 📄 capture.html            # Main dashboard
├── 📄 camera.html             # Camera capture interface
├── 📄 defect-list.html        # Defect listing view
├── 📄 defect-details.html     # Individual defect details
├── 📄 styles.css              # Global styles
├── 📄 server.js               # Express server
├── 📄 package.json            # Dependencies and scripts
├── 📄 create_tables.sql       # Database schema
├── 📄 netlify.toml            # Deployment configuration
├── 📁 js/
│   └── 📄 main.js             # Core JavaScript functionality
├── 📁 data/
│   ├── 📄 defects.json        # Defect data storage
│   └── 📁 images/             # Stored defect images
└── 📁 backup/                 # Backup files
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser with camera support
- Git (for cloning the repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pd-defect-reporting.git
   cd pd-defect-reporting
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

### Alternative: Development Mode
```bash
npm run dev  # Uses nodemon for auto-restart
```

## 📖 Usage Guide

### 1. Login
- Navigate to the application
- Click "Go to Login"
- Enter credentials (demo: any username/password)

### 2. Capture Defects
- Click "Capture New Defect"
- Allow camera access when prompted
- Take a photo of the defect
- Fill in defect details:
  - **Defect Type**: Select from dropdown
  - **Severity**: Choose severity level
  - **Location**: Enter defect location
  - **Description**: Detailed description
  - **Reporter**: Your name
- Submit the defect

### 3. View Defects
- Click "View Logged Defects"
- Browse through all reported defects
- Click "View Details" for more information
- Use the back button to return to main menu

### 4. Manage Defects
- Update defect status
- Assign defects to team members
- Add comments and notes
- Track resolution progress

## 🔧 API Endpoints

### Defects
- `POST /api/defects` - Create new defect
- `GET /api/defects` - Get all defects
- `GET /api/defects/:id` - Get specific defect
- `PUT /api/defects/:id` - Update defect

### Images
- `GET /api/images/:filename` - Serve defect images

### Request/Response Examples

**Create Defect:**
```javascript
POST /api/defects
Content-Type: application/json

{
  "defectType": "Crack",
  "severity": "High",
  "location": "Main entrance",
  "description": "Long crack in concrete floor",
  "imageUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "reportedBy": "John Doe"
}
```

**Response:**
```javascript
{
  "defectId": "DEF-1703123456789",
  "timestamp": "2023-12-21T10:30:00.000Z",
  "imageUrl": "abc123-def456-ghi789.png",
  "defectType": "Crack",
  "severity": "High",
  "location": "Main entrance",
  "description": "Long crack in concrete floor",
  "status": "New",
  "reportedBy": "John Doe",
  "assignedTo": null
}
```

## 🗄️ Database Integration

### SQL Server Setup
1. Run the provided SQL script:
   ```sql
   -- Execute create_tables.sql in your SQL Server instance
   ```

2. Update server configuration to use database instead of JSON files

### Data Models

**Defects Table:**
- `id`: Primary key
- `defectId`: Unique defect identifier
- `timestamp`: Creation timestamp
- `imageUrl`: Image file path
- `defectType`: Type of defect
- `severity`: Severity level
- `location`: Defect location
- `description`: Detailed description
- `status`: Current status
- `reportedBy`: Reporter name
- `assignedTo`: Assigned team member

## 🚀 Deployment

### Netlify Deployment
1. Connect your GitHub repository to Netlify
2. The `netlify.toml` file is already configured
3. Deploy automatically on push to main branch

### Manual Deployment
1. Build the application: `npm run build`
2. Upload files to your web server
3. Ensure Node.js is installed on the server
4. Start the application: `npm start`

### Environment Variables
Create a `.env` file for production:
```env
PORT=3000
NODE_ENV=production
```

## 🔒 Security Considerations

- **Image Validation**: Base64 image data is validated before storage
- **File Type Restrictions**: Only image files are accepted
- **Input Sanitization**: Form inputs are validated and sanitized
- **CORS Configuration**: Cross-origin requests are properly handled
- **File Size Limits**: Large image uploads are restricted

## 🧪 Testing

### Manual Testing
1. Test camera functionality on different devices
2. Verify defect creation and retrieval
3. Test image upload and display
4. Validate form inputs and error handling

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

### Development Guidelines
- Follow existing code style
- Add comments for complex functionality
- Test on multiple devices and browsers
- Update documentation for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- Camera access requires HTTPS in production
- Large images may cause performance issues
- Mobile camera orientation may need adjustment

## 🔮 Future Enhancements

- [ ] User authentication with JWT
- [ ] Real-time notifications
- [ ] Advanced search and filtering
- [ ] Export functionality (PDF, Excel)
- [ ] Mobile app development
- [ ] Integration with external systems
- [ ] Advanced analytics and reporting
- [ ] Multi-language support

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation wiki

## 🙏 Acknowledgments

- Bootstrap team for the UI framework
- Express.js community for the web framework
- Contributors and testers

---

**Version**: 1.0.0  
**Last Updated**: December 2023  
**Maintainer**: Development Team
