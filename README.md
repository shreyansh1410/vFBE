# VisaFriendly

VisaFriendly is a full-stack web application that helps users find and apply to jobs that are friendly to visa holders. The project consists of a TypeScript/Express/Prisma backend and a modern React + Vite + Tailwind frontend.

---

## Features

### 🖥️ Frontend

- **Authentication:** Sign up, sign in (including Google OAuth), and protected routes using JWT.
- **Job Listings:** Browse, filter, and paginate job listings by title, company, location, salary, job type, experience, work setting, visa type, and category.
- **Job Details:** View detailed job information, and (if signed in) save or apply to jobs.
- **Profile:** View your user profile (protected route).
- **Modern UI:** Built with React, Vite, and Tailwind CSS for a fast, responsive experience.

### 🗄️ Backend

- **RESTful API:** Endpoints for authentication, job search, job details, saving, and applying.
- **Prisma ORM:** PostgreSQL database with models for users and jobs, including relations for applications and saved jobs.
- **JWT Auth:** Secure authentication and protected routes.
- **Filtering:** Advanced job filtering and pagination.
- **Error Handling:** Centralized error middleware.

---

## Project Structure

```
visaFriendly/
├── visaFriendlyBE/   # Backend (Express, TypeScript, Prisma)
│   ├── src/
│   ├── prisma/
│   └── package.json
└── visaFriendlyFE/   # Frontend (React, Vite, Tailwind)
    ├── src/
    └── package.json
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repo-url>
cd visaFriendly
```

---

### 2. Backend Setup

```bash
cd visaFriendlyBE
npm install
# or
yarn install
```

- **Configure Environment:**  
  Create a `.env` file with your PostgreSQL connection string and JWT secret:

  ```
  DATABASE_URL=postgresql://user:password@localhost:5432/visafriendly
  JWT_SECRET=your_jwt_secret
  ```

- **Migrate Database:**

  ```bash
  npx prisma migrate dev --name init
  npx prisma generate
  ```

- **Build and Start Backend:**
  ```bash
  npm run build
  npm run dev
  ```
  The backend will run on `http://localhost:3000/` by default.

---

### 3. Frontend Setup

```bash
cd ../visaFriendlyFE
npm install
# or
yarn install
```

- **Configure Environment:**  
  Create a `.env` file and set the backend URL:

  ```
  VITE_BACKEND_URL=http://localhost:3000
  ```

- **Start Frontend:**
  ```bash
  npm run dev
  ```
  The frontend will run on `http://localhost:5173/` by default.

---

## Usage

- **Sign Up / Sign In:**  
  Create an account or log in to access job listings and features.
- **Browse Jobs:**  
  Use filters to find jobs by various criteria.
- **View Details:**  
  Click on a job to see more information.
- **Save or Apply:**  
  If signed in, you can save jobs or apply directly from the job details page.
- **Profile:**  
  View your profile and saved/applied jobs (future enhancement).

---

## API Overview

### Auth

- `POST /api/auth/signup` — Register
- `POST /api/auth/signin` — Login
- `POST /api/auth/logout` — Logout (JWT required)
- `GET /api/auth/me` — Get profile (JWT required)

### Jobs

- `GET /api/jobs` — List jobs (with filters)
- `GET /api/jobs/:id` — Job details
- `POST /api/jobs/:id/save` — Save job (JWT required)
- `POST /api/jobs/:id/apply` — Apply to job (JWT required)

---

## Google OAuth Integration

VisaFriendly supports sign up and sign in with Google using OAuth 2.0.

### Google OAuth Setup

1. **Create Google Cloud OAuth Credentials:**

   - Go to the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
   - Create a new OAuth 2.0 Client ID (type: Web application).
   - Add the following to **Authorized JavaScript origins**:
     - `http://localhost:5173`
     - `http://localhost:3000`
     - Your deployed frontend URLs (e.g., `https://v-ffe.vercel.app`)
   - Add the same URLs to **Authorized redirect URIs**.
   - Copy your **Client ID**.

2. **Frontend Environment:**

   - In `visaFriendlyFE/.env`, add:
     ```
     VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
     ```
   - The frontend uses [`@react-oauth/google`](https://www.npmjs.com/package/@react-oauth/google`) for the Google sign-in button.

3. **Backend Environment:**

   - In `visaFriendlyBE/.env`, add:
     ```
     GOOGLE_CLIENT_ID=your-google-client-id-here
     ```
   - The backend uses [`google-auth-library`](https://www.npmjs.com/package/google-auth-library) to verify Google ID tokens.

4. **Install Dependencies:**
   - Frontend:
     ```bash
     npm install @react-oauth/google
     ```
   - Backend:
     ```bash
     npm install google-auth-library
     ```

---

## Usage: Google Sign In/Sign Up

- On the Sign In and Sign Up pages, you will see a "Sign in with Google" button.
- Clicking the button will open a Google login popup. On success, your Google account's name and email are used to create or log in to your account.
- If you sign up with Google, you can only log in with Google (no password).
- If you sign up with email/password, you can only log in with email/password.

---

## What I Did

- Built a full-stack app with a modern React frontend and a robust Express/Prisma backend.
- Implemented authentication, job search, filtering, saving, and applying features.
- Used best practices for code structure, error handling, and security (JWT).
- Designed a clean, responsive UI with Tailwind CSS.

---

## What I'd Do With More Time

- **Testing:** Add unit and integration tests for both frontend and backend.
- **Admin Tools:** Allow admins to post/edit/delete jobs.
- **Job Scraping:** Automate job import from external sources.
- **User Profiles:** Add resume upload, application tracking, and richer profiles.
- **Notifications:** Email or in-app notifications for job matches or application status.
- **CI/CD:** Set up automated deployment pipelines.
- **Accessibility & UX:** Further polish the UI/UX and ensure accessibility.

---

## License

MIT (or your preferred license)

Let me know if you want this saved as a README.md file or want to tweak any section!
