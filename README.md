# Smart Leads Dashboard (GigFlow)

A full-stack Lead Management Dashboard built using the MERN stack 

## 🚀 Features

### Core Functionality
- **Authentication System:** Secure JWT-based authentication with password hashing (bcrypt) and protected routes.
- **Role-Based Access Control (RBAC):** Differentiates between `Admin` and `Sales` users. (e.g., Only Admins can export data or delete leads).
- **Lead Management (CRUD):** Create, Read, Update, and Delete leads. View comprehensive details of individual leads.
- **Advanced Filtering & Search:**
  - Filter by Lead Status (New, Contacted, Qualified, Lost).
  - Filter by Lead Source (Website, Instagram, Referral).
  - **Debounced** search by Name or Email.
  - Sort by Oldest/Latest.
  - *All filters work seamlessly together.*
- **Server-Side Pagination:** Efficient data loading limiting to 10 records per page.
- **CSV Export:** Admins can export currently filtered leads directly into a CSV file.

### UI/UX & Frontend Excellence
- **Modern Tech:** React.js, TypeScript, and TailwindCSS.
- **Responsive Design:** Works beautifully on desktop, tablet, and mobile.
- **Theme Support:** Fully implemented **Dark Mode**.
- **State & Data Management:** Utilizes React Query for server state/caching and Zustand for global UI state.
- **Polish:** Comprehensive loading states (spinners/overlays), empty states, error handling, and form validation (Zod + React Hook Form).

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- TypeScript
- TailwindCSS
- React Query (Data Fetching & Caching)
- Zustand (State Management)
- React Hook Form + Zod (Validation)

**Backend:**
- Node.js & Express.js
- TypeScript
- MongoDB & Mongoose
- JSON Web Tokens (JWT)

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally or a MongoDB Atlas URI
- Git

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and configure your variables:
     ```env
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_super_secret_jwt_key
     ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and verify the API URL points to your local backend:
     ```env
     VITE_API_URL=http://localhost:5000/api
     ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### 3. Docker Setup (Alternative)
If you prefer running the application via Docker:
1. Ensure Docker and Docker Compose are installed on your machine.
2. In the root of the project, run:
   ```bash
   docker-compose up --build
   ```
3. The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

## 📁 Project Structure

```text
gigflow/
├── Backend/                 # Express.js REST API
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Route logic and handlers
│   │   ├── middleware/      # Auth, Error, and RBAC middlewares
│   │   ├── models/          # Mongoose schemas (User, Lead)
│   │   ├── routes/          # API route definitions
│   │   ├── services/        # Business logic abstraction
│   │   └── types/           # TypeScript interfaces
├── Frontend/                # React.js SPA
│   ├── src/
│   │   ├── api/             # Axios instances and API calls
│   │   ├── components/      # Reusable UI and layout components
│   │   ├── hooks/           # Custom React hooks (React Query, Debounce)
│   │   ├── pages/           # Page level components (Dashboard, Login, Register)
│   │   ├── store/           # Zustand state stores (Auth, Theme)
│   │   ├── types/           # Shared TypeScript interfaces
│   │   └── utils/           # Helper functions (CSV generation)
└── README.md                # Project documentation
```

## 👨‍💻 API Documentation

The RESTful API adheres to standard conventions, utilizing proper HTTP verbs and standardized JSON responses.

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate and receive JWT
- `GET /api/leads` - Fetch paginated and filtered leads
- `POST /api/leads` - Create a new lead
- `PUT /api/leads/:id` - Update an existing lead
- `DELETE /api/leads/:id` - Delete a lead (Admin only)
- `GET /api/leads/export` - Export current view to CSV (Admin only)
