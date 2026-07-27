# DevCollab
[![DevCollab CI](https://github.com/Rushyendra25/DevCollab/actions/workflows/ci.yml/badge.svg)](https://github.com/Rushyendra25/DevCollab/actions/workflows/ci.yml)
[![CodeQL](https://github.com/Rushyendra25/DevCollab/actions/workflows/codeql.yml/badge.svg)](https://github.com/Rushyendra25/DevCollab/actions/workflows/codeql.yml)

A full-stack developer collaboration platform that enables developers to create projects, discover opportunities, apply for collaborations, and manage project applications through a modern and responsive web interface.

---

## Screenshots
![Home Page](<screenshots/Home Page.png>)
![Dashboard](<screenshots/Dashboard.png>)
![User Profile](<screenshots/User Profile.png>)
![Explore Projects](<screenshots/Explore Projects.png>)
![My Applications](<screenshots/My Applications.png>)


### Frontend
https://dev-collab-frontend-pi.vercel.app

### Backend API
https://dev-collab-backend-theta.vercel.app

---

## Features

### Authentication
- User Registration
- Secure Login using JWT Authentication
- Protected Routes
- Persistent Login Session

### Project Management
- Create Projects
- Edit Existing Projects
- Delete Projects
- View Project Details
- View My Projects Dashboard

### Project Discovery
- Browse All Projects
- Search Projects
- Filter Projects by Skills
- Filter Projects by Status

### Applications
- Apply to Projects
- Prevent Duplicate Applications
- Withdraw Applications
- View My Applications
- Project Owners can Accept or Reject Applications

### User Profile
- Update Professional Profile
- Profile Completion Indicator
- Skills Management
- GitHub, LinkedIn and Portfolio Links

### Dashboard
- Project Statistics
- Application Statistics
- Personalized Dashboard

### Responsive UI
- Mobile Friendly
- Modern Tailwind CSS Design
- Clean User Experience

---

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router
- React Hook Form
- Axios
- Sonner Toast Notifications

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

### DevOps
- GitHub Actions CI
- CodeQL Security Analysis
- Dependabot
- Vercel Deployment

---

## Architecture

```
React + Vite
       │
       ▼
Axios REST API
       │
       ▼
Express.js Server
       │
       ▼
Controllers
       │
       ▼
MongoDB Atlas
```

---

## CI/CD Pipeline

This project includes a complete GitHub Actions CI pipeline.

Every Push / Pull Request automatically performs:

- Install Frontend Dependencies
- Install Backend Dependencies
- Frontend Linting
- Frontend Production Build
- npm Audit
- CodeQL Security Scan
- Dependabot Dependency Monitoring

Successful builds are automatically deployed to Vercel.

---

## Security

- JWT Authentication
- Password Hashing using bcryptjs
- Protected API Routes
- MongoDB Atlas
- GitHub CodeQL Security Analysis
- Dependabot Dependency Updates

---

## Project Structure

```
DevCollab
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.js
│
├── .github
│   └── workflows
│       ├── ci.yml
│       └── codeql.yml
│
└── README.md
```

---

## Getting Started

### Clone Repository

```bash
git clone https://github.com/Rushyendra25/DevCollab.git

cd DevCollab
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

## Backend Setup

```bash
cd server

npm install

npm run dev
```

---

## Environment Variables

### Backend (.env)

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## API Modules

### Authentication

- Register
- Login

### Users

- Get Profile
- Update Profile

### Projects

- Create Project
- Get All Projects
- Get Project Details
- Update Project
- Delete Project
- My Projects

### Applications

- Apply to Project
- Withdraw Application
- View Applications
- Update Application Status

### Dashboard

- Dashboard Statistics

---

## Deployment

### Frontend

- Vercel

### Backend

- Vercel Serverless Functions

### Database

- MongoDB Atlas

---

## Future Improvements

- Real-time Chat
- Team Invitations
- Email Verification
- Password Reset
- Notifications
- AI Project Recommendations
- Profile Picture Upload
- Project Bookmarking
- Admin Dashboard

---

## Developer

**Baltha Rushyendra Varma**

GitHub

https://github.com/Rushyendra25

LinkedIn

https://www.linkedin.com/in/baltha-rushyendra-varma-28a183224/

---

## License

This project was developed as part of a Software Developer technical assessment and is intended for educational and demonstration purposes.