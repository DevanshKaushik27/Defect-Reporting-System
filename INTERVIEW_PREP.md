# Defect Reporting System - Interview Preparation

## How To Position This Project

This project should be presented as an internship-assigned prototype, not as your main technical strength.

Use this explanation:

> During my internship, I was assigned to explore a simple defect reporting workflow. I worked on understanding and running a prototype where users could capture a defect image, fill defect details, and store or retrieve the report through REST APIs. My main contribution was learning the flow, testing the UI, understanding API-based CRUD operations, and making the system usable for basic defect logging.

Your main strength is data analytics, SQL, Python, and dashboards. This project gave you exposure to full-stack development and helped you understand how operational data is captured at the source before it can later be analyzed.

## What This Project Actually Uses

### Frontend

- HTML
- CSS
- JavaScript
- Browser Camera / MediaDevices API
- Basic responsive UI

### Backend

- Node.js
- Express.js
- REST API endpoints
- Local JSON file storage using `data/defects.json`
- Local image storage using `data/images/`
- UUID package for unique image filenames

Important note:

Although `package.json` mentions MongoDB, MSSQL, AWS, and other packages, the current running project mainly uses local JSON-file storage and local image storage. You can say those packages were possible future integrations, but the prototype itself used file-based storage.

## Simple Project Explanation

Say this:

> The Defect Reporting System was a web-based prototype for logging defects with image proof. A user could open the app, capture an image using the device camera, enter details like defect type, severity, location, description, assigned person, and status. The frontend sends this data to a Node.js Express backend through REST API calls. The backend validates the data, saves the image locally with a unique filename, stores the defect metadata in a JSON file, and provides APIs to view or update defect records.

## Architecture Flow

1. User opens the web page.
2. User captures an image using the browser camera.
3. The image is converted to Base64 using a canvas.
4. User fills defect details such as type, severity, location, and description.
5. Frontend sends the data to the backend using a `POST` request.
6. Express server validates the required fields.
7. Server saves the image inside `data/images/`.
8. Server stores defect details inside `data/defects.json`.
9. Defect list page fetches saved defects using `GET /api/defects`.

## Important Terms

### CRUD

CRUD means:

- Create
- Read
- Update
- Delete

In this project:

- Create: `POST /api/defects`
- Read all defects: `GET /api/defects`
- Read one defect: `GET /api/defects/:id`
- Update defect: `PUT /api/defects/:id`
- Delete: not implemented

Safe interview answer:

> The project mainly implemented create, read, and update operations. Delete was not included in the prototype, but it could be added using a `DELETE` endpoint.

### REST API Endpoints

REST API endpoints are backend URLs used by the frontend to send or receive data.

Examples from this project:

- `POST /api/defects` creates a new defect.
- `GET /api/defects` gets all defects.
- `GET /api/defects/:id` gets one defect.
- `PUT /api/defects/:id` updates defect details.
- `GET /api/images/:filename` loads stored defect images.

Safe interview answer:

> The frontend used fetch calls to communicate with the backend. The backend exposed REST endpoints for creating, retrieving, and updating defect records.

### MediaDevices / Camera API

The MediaDevices API is a browser API used to access the device camera.

In this project, the code uses:

```js
navigator.mediaDevices.getUserMedia({
  video: { facingMode: 'environment' },
  audio: false
});
```

Safe interview answer:

> The browser's MediaDevices API was used to request camera permission and stream video into a video element. When the user clicked capture, the current frame was drawn onto a canvas and converted into a Base64 image.

### UUID

UUID means Universally Unique Identifier.

In this project, UUID is used to generate unique image filenames:

```js
const filename = `${uuidv4()}.png`;
```

Safe interview answer:

> UUID was used to generate unique image names so that two uploaded defect images would not overwrite each other.

### Base64 Image

The captured image is converted into a long text string like:

```text
data:image/png;base64,...
```

Safe interview answer:

> Since the camera image was captured in the browser, it was converted into Base64 format and sent as JSON to the backend. The backend decoded it and saved it as a PNG file.

### LocalStorage

LocalStorage is browser storage. In this project, it temporarily stores the captured image while moving from `camera.html` to `defect-details.html`.

Safe interview answer:

> After capture, the image was temporarily stored in browser localStorage so the next page could access it before submitting the final defect form.

### Express.js

Express.js is a Node.js framework used to create backend routes and APIs.

Safe interview answer:

> Express.js was used to create the backend server, define API routes, serve static HTML files, and handle requests from the frontend.

### CORS

CORS means Cross-Origin Resource Sharing. It controls whether a frontend can call a backend from another origin.

Safe interview answer:

> CORS was enabled so the frontend and backend could communicate smoothly during local development.

## Your Role In The Project

Use this answer:

> This was not my primary analytics project. It was an internship-assigned full-stack prototype. My role was mainly to understand the existing workflow, run the system locally, test defect logging, understand how image capture and API-based storage worked, and make small improvements around usability and validation. It helped me understand how frontend forms interact with backend REST APIs.

## If They Ask: Did You Build It From Scratch?

Do not lie. Use this:

> It was based on an existing prototype/reference structure. During the internship, I worked on understanding it, running it, testing the workflow, and learning how the API, camera capture, and storage pieces connected. I would not claim it as my strongest project, but I can explain the architecture and flow.

## Resume Claims To Be Careful With

Your resume says things like:

- Improved speed by 40%
- Reduced effort by 60%
- Improved usability by 50%

If they ask for proof, say:

> Those were estimated improvements based on manual defect entry versus using a camera-based form workflow during prototype evaluation. We did not run a formal production benchmark.

Better future wording:

> Developed a prototype defect reporting system with REST APIs for defect creation, retrieval, and status updates, along with camera-based image capture and local image storage.

## Likely Interview Questions And Answers

### Q1. What problem did this project solve?

> It simplified defect reporting by allowing users to capture an image, add metadata like severity and location, and store everything in one place instead of manually documenting defects separately.

### Q2. What stack did you use?

> HTML, CSS, JavaScript on the frontend, Node.js and Express.js on the backend, REST APIs for communication, and JSON-file storage for the prototype.

### Q3. Why did you not use a database?

> Since it was a prototype, local JSON storage was enough to demonstrate the workflow. In production, I would replace it with MongoDB, PostgreSQL, or SQL Server depending on the organization's existing stack.

### Q4. How is the image stored?

> The browser captures the image as Base64, sends it to the backend, and the backend saves it as a PNG file with a UUID-based filename. The defect record stores the image filename.

### Q5. What are the limitations?

> It does not have real authentication, a production database, a delete endpoint, advanced security, or cloud image storage. It is suitable as a prototype, not as a production-ready system.

### Q6. How would you improve it?

> I would add real authentication, database storage, role-based access, delete functionality, cloud image storage like S3, input sanitization, audit logs, and dashboard analytics for defect trends.

### Q7. What did you learn?

> I learned how frontend forms communicate with backend APIs, how image capture works in the browser, how REST endpoints are structured, and how defect data can be captured digitally before being analyzed.

### Q8. How does this connect with your data analytics skills?

> This system captures operational defect data. Once stored in a proper database, the same data can be analyzed in Power BI or SQL to identify defect patterns, high-risk locations, severity trends, and team resolution performance.

## One-Minute Project Pitch

Memorize this:

> The Defect Reporting System was an internship prototype for logging and tracking defects with image evidence. The frontend was built using HTML, CSS, and JavaScript, and the backend used Node.js with Express. A user could capture an image through the browser camera, fill in details like defect type, severity, location, and description, and submit it. The frontend sent the data to REST API endpoints. The backend validated the request, saved the image locally with a unique UUID-based filename, and stored the defect metadata in a JSON file. The system also allowed users to view all logged defects and open individual defect details. Since it was a prototype, it used file-based storage instead of a production database, but the architecture could be extended to MongoDB, SQL Server, or cloud storage.

## Thirty-Second Short Version

Use this if they ask briefly:

> It was a small internship prototype for defect logging. Users could capture a defect image, enter defect details, and submit them through a web form. The frontend used HTML, CSS, and JavaScript, while the backend used Node.js and Express REST APIs. Images were saved locally with unique filenames, and metadata was stored in a JSON file. My main learning was understanding how frontend forms, camera capture, and backend APIs work together.

## Honest Closing Line

Use this to protect yourself if the interviewer goes too deep:

> My primary area is data analytics, so I would not present this as my strongest development project. But it gave me practical exposure to how data is collected through a web application before it becomes useful for reporting, dashboards, and analysis.

