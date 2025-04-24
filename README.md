# Baral Logistics Private Limited Web Application

## Overview
The Baral Logistics Web Application is a full-stack information system designed for Baral Logistics Pvt. Ltd. This application supports full CRUD (Create, Read, Update, Delete) operations for parcel data and implements user authentication, including separate pages for login, signup/registration, booking new parcels, tracking parcels, and an administrative dashboard for managing parcels. The system uses Node.js with Express as the backend server, SQLite as the database, and HTML/CSS/JavaScript for the frontend.

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [File Structure](#file-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Deployment](#deployment)
- [References](#references)

## Features
- **User Authentication:**  
  - **Login:** Secure login page using `localStorage` for session simulation.  
  - **Signup/Registration:** Simple registration page to create a new user account.
- **Parcel CRUD Operations:**  
  - **Create:** Add new parcel records with details: customer, destination, status, weight (kg), and booking date.
  - **Read:** View all parcels on the dashboard.
  - **Update:** Edit parcel details via inline inputs or update buttons.
  - **Delete:** Remove parcels from the database.
- **Tracking:**  
  - Search and filter parcels based on customer name or parcel ID.
- **Admin Dashboard:**  
  - A dedicated interface for administrators to manage all parcel records.

## Architecture
The application follows a decoupled architecture:
- **Frontend:** 
  - Built with HTML, CSS, and vanilla JavaScript.
  - Pages include `login.html`, `signup.html`, `booking.html`, `tracking.html`, and `index.html` (dashboard).
  - A shared navigation component (`nav.html`) is loaded across all pages.
- **Backend:**
  - Implemented using Node.js and Express.
  - Exposes RESTful API endpoints under `/api` to support CRUD operations.
  - Uses SQLite for persistent storage.
- **Testing:**
  - Unit and integration tests written using Jest and Supertest ensure that each API endpoint functions as expected.

## File Structure


## Installation

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/YourUsername/baral-logistics.git
   cd baral-logistics

2. Install Dependencies
Ensure you have Node.js installed (recommended version 16 or 18). Then, run:
   npm install

   This command installs the following packages:

      1.express

      2.cors

      3.body-parser

      4.sqlite3

      5.Dev Dependencies: jest and supertest (for testing)

**Running the Application**
  1.Start the Backend Server
    From the project root, run:
      nodemon backend/index.js

      You should see log messages similar to:
      Backend server started
      Connected to SQLite database.
      Baral Logistics web application running on http://localhost:3000

  2.Access the Application
    Open your browser and navigate to:

    Login Page: http://localhost:3000/login.html

    Dashboard: http://localhost:3000/index.html (accessible after login)

    Booking Page: http://localhost:3000/booking.html

    Tracking Page: http://localhost:3000/tracking.html

    Signup Page: http://localhost:3000/signup.html

    Note: The system is designed to redirect unauthenticated users to the login page.

  **Testing**

  Unit and integration tests are implemented using Jest and Supertest. To run the tests, execute:

    npm test

  You should see output indicating that all tests pass, similar to:

    PASS  tests/api.test.js
    Parcel CRUD API
    ✓ should create a new parcel (xxx ms)
    ✓ should retrieve all parcels
    ✓ should update a parcel
    ✓ should delete a parcel

**Deployment Using Render**
    
---

## Render Deployment Steps

### 1. Prerequisites
- GitHub account and repository containing your project
- Render account ([render.com](https://render.com))
- Working `package.json` at the project root

### 2. `package.json` Example (must be in root folder)

```json
{
  "name": "baral-logistics",
  "version": "1.0.0",
  "main": "backend/index.js",
  "scripts": {
    "start": "node backend/index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "body-parser": "^1.20.2",
    "sqlite3": "^5.1.6"
  }
}
3. Configure Express to Serve Frontend
    Inside backend/index.js, serve static files like this:
        const express = require('express');
        const path = require('path');
        const app = express();

        app.use(express.static(path.join(__dirname, '../frontend')));

        app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

4. Deploy to Render
      1. Go to render.com and log in.

      2. Click "New + → Web Service"

      3. Connect your GitHub repository

      4. Fill out:

          Name: baral-logistics

          Build Command: npm install

          Start Command: npm start

          Root Directory: / (leave blank if your files are in the root)

5. Click "Create Web Service"

5. Access the Live App
      Render will provide you with a live URL like:
      https://baral-logistics.onrender.com

  Test all pages:

  /booking.html

  /tracking.html

  /login.html

  /index.html (Dashboard)

  **References**
[1] Project_Assessment B9IS123.docx.pdf, Dublin Business School, January 2025.
[2] Express.js Documentation, Available: https://expressjs.com/
[3] SQLite Documentation, Available: https://www.sqlite.org/docs.html
[4] Jest Documentation, Available: https://jestjs.io/
[5] Supertest GitHub Repository, Available: https://github.com/visionmedia/supertest
[6] Mozilla Developer Network, "Using Fetch", MDN Web Docs, Available: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
[7] W3C Web Content Accessibility Guidelines (WCAG) 2.1, Available: https://www.w3.org/TR/WCAG21/

Render – Deploy Node.js

Express.js Documentation

SQLite Documentation

**Conclusion**
This README documentation explains the design, installation, testing, and deployment of the Baral Logistics web application. By leveraging a modular architecture and modern web development practices, the system meets the requirements for a robust, maintainable information system. The comprehensive testing strategy ensures the reliability of the CRUD operations, while deployment instructions provide a clear pathway to making the application available online.






