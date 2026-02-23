# Task Manager API

Node.js + Express + PostgreSQL + JWT

--------------------------------------

FEATURES

- Auth: register / login (JWT)
- Tasks CRUD: create / list / update / delete
- Per-user task isolation
- Health endpoints

--------------------------------------

TECH STACK

- Node.js
- Express
- PostgreSQL (pg)
- JWT (jsonwebtoken)
- Password hashing (bcrypt)
- dotenv

--------------------------------------

SETUP

1) Install dependencies

npm install

--------------------------------------

2) Environment variables

Create file .env based on .env.example

Example:

PORT=3000
DATABASE_URL=postgresql://postgres:password@localhost:5432/task_manager
JWT_SECRET=change_me
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10

--------------------------------------

3) Database setup

Create database:

CREATE DATABASE task_manager;

Create tables:

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo','in_progress','done')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

--------------------------------------

4) Run server

npm run dev

Server runs on:

http://localhost:3000

--------------------------------------

API ENDPOINTS

Auth
POST /auth/register
POST /auth/login

Tasks (JWT required)
GET /tasks
POST /tasks
PUT /tasks/:id
DELETE /tasks/:id

Health
GET /health
GET /health/db

--------------------------------------

Authentication

Use header:

Authorization: Bearer <your_token>

--------------------------------------

Backend practice project.