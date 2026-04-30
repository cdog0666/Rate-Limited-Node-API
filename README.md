🚦 Rate Limited Node API

A secure and scalable REST API built with Node.js, TypeScript, and PostgreSQL, featuring authentication and rate limiting. Designed with a modular architecture for maintainability and real-world backend development.

✨ Features
⚡ Built with TypeScript for type safety
🌐 RESTful API using Express
🗄️ PostgreSQL integration via pg
🔐 Authentication with JWT and password hashing (bcrypt)
⏱️ Rate limiting middleware to prevent abuse
🧱 Modular architecture (controllers, models, middleware, routes)
🔑 Environment-based configuration using dotenv
🧪 Testing and linting support
📦 Prerequisites

Make sure you have the following installed:

Node.js (v18+ recommended)
npm
PostgreSQL
📥 Installation
git clone https://github.com/yourusername/rate-limited-node-api.git
cd rate-limited-node-api
npm install
⚙️ Environment Variables

Create a .env file in the root directory:

DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
JWT_SECRET=your_secret_key
PORT=3000
🗄️ Database Setup

This project uses PostgreSQL.

To automatically create the database and required tables (users, snippets), run:

npm run db:create

This executes:

src/scripts/createDatabase.ts

It will:

Connect to PostgreSQL
Create the database if it doesn’t exist
Create required tables
📜 Available Scripts
npm run dev        # Start development server with nodemon
npm run build      # Compile TypeScript to JavaScript
npm run start      # Run compiled app (dist/index.js)
npm run db:create  # Create database and tables
npm run lint       # Run linter
npm run lint:fix   # Fix lint issues
npm run format     # Format code
npm test           # Run tests
▶️ Running the App
Development
npm run dev

Runs the API with hot reload using nodemon and ts-node.

Production
npm run build
npm run start
🧱 Project Structure
src/
├── index.ts
├── db.ts
├── controllers/
│   ├── authController.ts
│   └── snippetsController.ts
├── models/
│   ├── authModel.ts
│   └── snippetsModel.ts
├── middleware/
│   ├── authMiddleware.ts
│   └── ratelimiter.ts
├── routes/
│   ├── authRouter.ts
│   └── snippetRouter.ts
├── router.ts
├── types/
│   ├── snippetTypes.ts
│   └── userTypes.ts
└── scripts/
    └── createDatabase.ts
🔌 API Routes
🔐 Auth
POST /auth/signup

Create a new user

{
  "email": "test@example.com",
  "password": "password123"
}
POST /auth/login

Authenticate user and receive a JWT

{
  "email": "test@example.com",
  "password": "password123"
}
📝 Snippets

⚠️ All /snippets routes require an Authorization header with a Bearer JWT

Example header:

Authorization: Bearer <your_token>
GET /snippets/

Get all accessible snippets (your own + public ones)

curl -H "Authorization: Bearer <token>" http://localhost:3000/snippets
GET /snippets/:id

Get a specific snippet by ID (must be public or owned by user)

POST /snippets/

Create a new snippet

{
  "title": "Example",
  "content": "console.log('hello world');",
  "language": "javascript",
  "is_public": true
}

Snippet fields:

title – snippet name
content – code content
language – programming language (e.g. javascript, python)
is_public – whether the snippet is publicly accessible
🧪 Testing

Run tests with:

npm test

Make sure your test environment is configured properly (e.g., separate test DB if needed).

🔒 Security Notes
Passwords are hashed using bcrypt
Authentication is handled via JWT
Rate limiting protects endpoints from abuse
Protected routes require a valid Bearer token
📄 License

MIT License
