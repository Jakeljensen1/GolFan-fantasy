GolFan — Fantasy Golf

Play. Predict. Compete.

GolFan is a full‑stack fantasy golf application that lets users build lineups for professional golf tournaments, track fantasy scoring, and compete on dynamic leaderboards. The platform blends clean MERN architecture with real tournament data, intuitive lineup building, and user‑specific performance tracking.

Project status: MVP (actively developed)

Table of Contents
  Overview
  Features
  Demo
  Technology Stack
  Architecture
  Getting Started
  Environment Variables
  Database Setup and Data Synchronization
  API Documentation
  Fantasy Scoring Rules
  Testing
  Known Limitations

Overview

GolFan brings fantasy sports mechanics to professional golf. Users browse tournaments, select eligible golfers, create lineups, and follow their performance as tournament results are synced into the system. Lineups are scored using total‑to‑par aggregation, and leaderboards display standings across all users.

The application uses a decoupled architecture:
  React (Vite) frontend
  Express.js REST API
  MongoDB + Mongoose for persistent storage
  JWT authentication for secure user sessions

Features

Below are only the features that are fully implemented and verified:

User registration and authentication
  JWT‑based login, signup, logout
  Protected routes in React
  Persistent sessions via cookies

Golfer and tournament browsing
  Tournament list
  Tournament detail pages
  Tournament field (eligible golfers)

Tournament‑specific golfer selection
  Users can only select golfers participating in the chosen tournament

Lineup creation and persistence
  Create lineups tied to a tournament
  Store selected golfers
  View lineup details

Fantasy scoring and standings
  Score computed using total‑to‑par values
  Leaderboards sorted ascending (lower score = better)
  Public leaderboard pages

User profiles and lineup history
  View past lineups
  Track best finish and best score
  Tournament participation history

Responsive user interface
  Mobile‑friendly layout
  Clean component structure

❗ External golf‑data synchronization
  Partially implemented
  Tournament results and fields currently imported manually or via internal scripts

Demo

Live application:  
  https://golfan-fantasy-1.onrender.com

Backend API:  
  https://golfan-fantasy.onrender.com/api

Technology Stack

  Frontend - React (Vite), React Router
  Backend - Node.js, Express.js
  Database - MongoDB, Mongoose
  Authentication - JWT + HttpOnly cookies
  External Data - GolfData API
  Testing - Jest / Supertest (planned)
  Deployment - Render (Frontend + Backend)

Architecture

GolFan follows a clean MVC + MERN architecture:

Frontend (React)
  Pages: Dashboard, TournamentPage, LineupBuilderPage, Leaderboard, Profile
  Context: AuthContext for user state
  Services: Axios + Fetch wrappers for API calls
  ProtectedRoute component for auth‑guarded pages

Backend (Express)
  Routes: /auth, /golfers, /tournaments, /lineups
  Controllers: Authentication, lineup creation, scoring, tournament data
  Models: User, Golfer, Tournament, TournamentEntry, TournamentResult, Lineup
  Middleware: JWT authentication, CORS configuration

Data Flow
  React calls REST endpoints
  Express controllers process requests
  Mongoose models interact with MongoDB
  Responses returned to frontend services
  UI updates based on user actions and tournament data
  Getting Started

Prerequisites
  Node.js (v18+)
  npm
  MongoDB Atlas or local MongoDB
  Render account (for deployment)

Installation
  Clone the repository:
  bash
  git clone https://github.com/Jakeljensen1/GolFan-fantasy.git
  cd GolFan-fantasy

Install backend dependencies
  bash
  cd Backend
  npm install

Install frontend dependencies
  bash
  cd ../Frontend
  npm install

Start backend
  bash
  npm run dev

Start frontend
  bash
  npm run dev

Environment Variables

Create .env files in both Backend and Frontend.

Backend .env
  MONGODB_URI=your_mongodb_connection_string
  PORT=3000
  JWT_SECRET=your_secret_key

Frontend .env (development)
  VITE_API_URL=http://localhost:3000/api

Frontend environment variable (production on Render)
  VITE_API_URL=https://golfan-fantasy.onrender.com/api

Database Setup and Synchronization

GolFan uses several collections:
  Golfers
  Tournaments
  TournamentEntry (field list)
  TournamentResult (scores)
  Lineups

Initial Setup
  Seed golfers
  Seed tournaments
  Populate tournament fields
  Insert tournament results

Synchronization

Tournament results can be updated manually or via scripts:
  Update TournamentResult documents
  Recompute lineup scores using /lineups/:id/compute-score
  Leaderboards update automatically

API Documentation

Auth
  POST /auth/signup
  POST /auth/login
  POST /auth/logout
  GET  /auth/user

Tournaments
  GET /tournaments
  GET /tournaments/:id
  GET /tournaments/:id/field
  GET /tournaments/:id/results

Lineups
  POST /lineups
  GET  /lineups/user/all
  GET  /lineups/:id
  POST /lineups/:id/compute-score
  GET  /lineups/tournament/:id/leaderboard

Golfers
  GET /golfers
  GET /golfers/:id

Each endpoint should include:
  Method
  Route
  Auth requirement
  Request body
  Response example
  Error cases

Fantasy Scoring Rules
 
GolFan uses a simple, intuitive scoring system:
  Each golfer’s total‑to‑par is pulled from tournament results
  A lineup’s score = sum of all golfer total‑to‑par values
  Lower scores are better (like real golf)

Testing
  
Planned testing includes:
  Authentication flow
  Lineup creation
  Ownership authorization
  Scoring logic
  Leaderboard sorting

Testing tools:
  Jest
  Supertest

Known Limitations
  External golf data is not fully automated
  Live scoring updates not yet implemented
  No social features (friends, leagues)
  No mobile app version
  No admin dashboard for tournament management
  No golfer/tournament bio page