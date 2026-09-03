# E-Bursary Management System

A web-based bursary management system for managing applicants, applications, and fund allocations from end to end — built for organisations that run bursary or scholarship programs and need a structured way to track applicants through the full disbursement process.

## About this project
This system was custom-built for me by a developer I hired, based on my requirements for a bursary management platform. I worked hands-on with the codebase afterward — configuring the environment, adjusting seed data, debugging deployment issues, and setting up the database.

## Features
- **Applicants** — register and manage applicant records
- **Applications** — track bursary applications through their review process
- **Programs** — manage different bursary/scholarship programs on offer
- **Allocations** — allocate approved funds to applicants
- **Documents** — upload and manage supporting documents for applications
- **Disbursements** — track fund disbursements to beneficiaries
- **Reports** — generate reports on applications, allocations, and disbursements
- **Settings** — configure organisation and system-level settings
- **Admin dashboard** — central view for managing the entire bursary cycle
- **Applicant portal** — a separate login for applicants to track their own status

## Tech Stack
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Frontend:** Angular
- **Authentication:** bcrypt password hashing, session/token-based login

## Getting Started
1. Clone the repo
2. In the backend folder, run:
   ```
   npm install
   ```
3. Create a `.env` file in the backend folder with your own MongoDB connection string:
   ```
   MONGODB_URI=your-connection-string-here
   ```
4. Seed sample data:
   ```
   node seed-naomi.js
   ```
5. Start the backend server (check `package.json` for the exact script, e.g. `npm start`)
6. In the frontend folder, run:
   ```
   npm install
   ng serve
   ```
7. Open the app in your browser at the local URL shown in the terminal

## Screenshots
<!-- Add screenshots here, e.g.: -->
<!-- ![Dashboard](screenshots/dashboard.png) -->
<!-- ![Login](screenshots/login.png) -->

## Status
This is a working demo project used to practice full-stack development, database seeding, environment setup, and deployment workflows.
