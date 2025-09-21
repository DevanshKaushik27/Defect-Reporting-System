# Defect Reporting System

A comprehensive web-based defect reporting and management system designed for capturing, tracking, and managing product defects with image documentation. This system provides a complete workflow from defect capture to resolution tracking with a modern, responsive interface.

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#️-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Usage Guide](#-usage-guide)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Features

### ✨ Core Functionality
- **📸 Camera Integration**: Capture defect images directly from device camera
- **📝 Defect Management**: Create, view, update, and track defects
- **🖼️ Image Storage**: Secure local storage of defect images with unique identifiers
- **🔄 Real-time Updates**: Live defect status updates and tracking
- **📱 Responsive Design**: Mobile-friendly interface for field use
- **🔍 Defect Tracking**: Complete lifecycle management from New to Resolved

### 🎯 Key Components
- **🔐 User Authentication**: Simple login system for access control
- **📷 Defect Capture**: Camera-based image capture with form data
- **📋 Defect Listing**: Comprehensive view of all reported defects
- **📄 Defect Details**: Detailed view with full defect information
- **📊 Status Management**: Track defect status from New to Resolved
- **🔍 Search & Filter**: Easy navigation through defect records

### 🎨 User Interface
- **Modern Design**: Clean, intuitive interface with Bootstrap 5
- **Mobile Optimized**: Touch-friendly design for mobile devices
- **Accessibility**: WCAG compliant design elements
- **Cross-browser Support**: Works on all modern browsers

## 🛠️ Technology Stack

### Backend
- **Node.js** (v14+) - Runtime environment
- **Express.js** (v4.x) - Web application framework
- **JSON File Storage** - Lightweight data persistence
- **Multer** - File upload handling
- **UUID** - Unique identifier generation
- **CORS** - Cross-origin resource sharing

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with responsive design
- **JavaScript (ES6+)** - Client-side functionality
- **Bootstrap 5** - UI framework for responsive design
- **Camera API** - Native browser camera integration

### Development Tools
- **Nodemon** - Development server with auto-restart
- **Git** - Version control
- **npm** - Package management

## 📁 Project Structure

```
Defect-Reporting-System/
├── 📄 index.html              # Landing page
├── 📄 login.html              # User authentication
├── 📄 capture.html            # Main dashboard
├── 📄 camera.html             # Camera capture interface
├── 📄 defect-list.html        # Defect listing view
├── 📄 defect-details.html     # Individual defect details
├── 📄 styles.css              # Global styles
├── 📄 server.js               # Express server
├── 📄 package.json            # Dependencies and scripts
├── 📄 package-lock.json       # Dependency lock file
├── 📄 README.md               # Project documentation
├── 📁 js/
│   └── 📄 main.js             # Core JavaScript functionality
├── 📁 data/
│   ├── 📄 defects.json        # Defect data storage
│   └── 📁 images/             # Stored defect images
└── 📁 node_modules/           # Dependencies
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Modern web browser** with camera support
- **Git** (for cloning the repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DevanshKaushik27/Defect-Reporting-System.git
   cd Defect-Reporting-System
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

### 1. 🔐 Login
- Navigate to the application at `http://localhost:3000`
- Click "Go to Login"
- Enter any credentials (demo mode - no authentication required)

### 2. 📸 Capture Defects
- Click "Capture New Defect"
- Allow camera access when prompted
- Take a photo of the defect
- Fill in defect details:
  - **Defect Type**: Select from dropdown (Crack, Corrosion, Deformation, Other)
  - **Severity**: Choose severity level (Low, Medium, High, Critical)
  - **Location**: Enter defect location
  - **Description**: Detailed description
  - **Assigned To**: Assign to team member
- Submit the defect

### 3. 📋 View Defects
- Click "View Logged Defects"
- Browse through all reported defects
- Click "View Details" for more information
- Use navigation buttons to return to main menu

### 4. 📊 Manage Defects
- Update defect status (New → In Progress → Resolved → Closed)
- Assign defects to team members
- Track resolution progress
- View defect history and timestamps

## 🔧 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### Defects
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/defects` | Create new defect |
| `GET` | `/defects` | Get all defects |
| `GET` | `/defects/:id` | Get specific defect |
| `PUT` | `/defects/:id` | Update defect |

#### Images
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/images/:filename` | Serve defect images |

### Request/Response Examples

#### Create Defect
```javascript
POST /api/defects
Content-Type: application/json

{
  "defectType": "Crack",
  "severity": "High",
  "location": "Main entrance",
  "description": "Long crack in concrete floor",
  "imageUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "reportedBy": "John Doe",
  "assignedTo": "Jane Smith"
}
```

#### Response
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
  "assignedTo": "Jane Smith"
}
```

## 🚀 Deployment

### Local Development
```bash
npm start
```

### Production Deployment

#### Option 1: Traditional Server
1. Upload files to your web server
2. Install Node.js on the server
3. Run `npm install` to install dependencies
4. Start the application: `npm start`

#### Option 2: Cloud Platforms
- **Heroku**: Connect GitHub repository and deploy
- **Vercel**: Import project and deploy
- **Railway**: Connect repository and deploy

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

### Manual Testing Checklist
- [ ] Test camera functionality on different devices
- [ ] Verify defect creation and retrieval
- [ ] Test image upload and display
- [ ] Validate form inputs and error handling
- [ ] Test responsive design on mobile devices

### Browser Compatibility
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style
- Add comments for complex functionality
- Test on multiple devices and browsers
- Update documentation for new features
- Write meaningful commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- Camera access requires HTTPS in production
- Large images may cause performance issues
- Mobile camera orientation may need adjustment

## 🔮 Future Enhancements

- [ ] **JWT Authentication**: Secure user authentication
- [ ] **Real-time Notifications**: Live updates for defect status changes
- [ ] **Advanced Search**: Filter by date, severity, location, etc.
- [ ] **Export Functionality**: PDF and Excel report generation
- [ ] **Mobile App**: Native iOS/Android applications
- [ ] **Database Integration**: PostgreSQL/MongoDB support
- [ ] **Analytics Dashboard**: Defect trends and statistics
- [ ] **Multi-language Support**: Internationalization
- [ ] **Email Notifications**: Automated status change alerts
- [ ] **API Rate Limiting**: Enhanced security and performance

## 📞 Support

For support and questions:
- 🐛 **Report Issues**: [GitHub Issues](https://github.com/DevanshKaushik27/Defect-Reporting-System/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/DevanshKaushik27/Defect-Reporting-System/discussions)
- 📧 **Contact**: Create an issue for direct contact

## 🙏 Acknowledgments

- **Bootstrap** team for the UI framework
- **Express.js** community for the web framework
- **Node.js** community for the runtime environment
- All contributors and testers

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/DevanshKaushik27/Defect-Reporting-System)
![GitHub language count](https://img.shields.io/github/languages/count/DevanshKaushik27/Defect-Reporting-System)
![GitHub top language](https://img.shields.io/github/languages/top/DevanshKaushik27/Defect-Reporting-System)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**


</div>