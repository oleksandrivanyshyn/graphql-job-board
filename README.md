# GraphQL Job Board

A full-stack job board application built while working through a GraphQL course. It has a React (Vite) client backed by an Apollo Server GraphQL API, with SQLite for storage.

Users can browse job postings, view job and company details, and (after logging in) create, update, and delete jobs for their own company.

## Project structure

```
graphql-job-board/
├── client/   # React + Vite frontend (Apollo Client)
└── server/   # Apollo Server GraphQL API (Express + Knex + SQLite)
```

## Tech stack

**Client**
- React 19 + React Router 7
- Apollo Client (GraphQL)
- Vite
- Bulma (CSS)

**Server**
- Apollo Server 4 + Express
- GraphQL
- Knex + better-sqlite3
- JWT authentication (`jsonwebtoken`, `express-jwt`)
- DataLoader (batches `Company` lookups per request)

## Getting started

### Prerequisites
- Node.js
- npm

### 1. Install dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 2. Set up the database

The server uses a SQLite file at `server/data/db.sqlite3`. Create/reset it and seed some sample data:

```bash
cd server
node scripts/create-db.js
```

This creates `company`, `job`, and `user` tables and seeds two companies, three jobs, and two users:

| Email | Password | Company |
| --- | --- | --- |
| alice@facegle.io | alice123 | Facegle |
| bob@goobook.co | bob123 | Goobook |

Optionally, seed 50 additional random jobs (useful for testing pagination):

```bash
node scripts/insert-50-jobs.js
```

### 3. Run the server

```bash
cd server
npm start
```

The GraphQL API runs at `http://localhost:9000/graphql`, and the login endpoint is `POST http://localhost:9000/login`.

### 4. Run the client

```bash
cd client
npm start
```

The app runs at `http://localhost:3000` and talks to the API at `http://localhost:9000`.

## GraphQL API

Schema: [`server/schema.graphql`](server/schema.graphql)

```graphql
type Query {
  job(id: ID!): Job
  jobs(limit: Int, offset: Int): JobSubList
  company(id: ID!): Company
}

type Mutation {
  createJob(input: CreateJobInput!): Job
  updateJob(input: UpdateJobInput!): Job
  deleteJob(id: ID!): Job
}
```

- `jobs` supports pagination via `limit`/`offset` and returns a `JobSubList` (`items` + `totalCount`).
- `createJob`, `updateJob`, and `deleteJob` require authentication and only operate on jobs belonging to the authenticated user's company.
- Jobs are sorted by creation date, newest first.

## Authentication

Login is handled by a REST endpoint (`POST /login`) that returns a JWT. The client stores the token in `localStorage` and attaches it as an `Authorization` header on GraphQL requests. The server verifies the token (`express-jwt`) and resolves the current user in the GraphQL context for use in mutation resolvers.

## Available scripts

**client** (`client/package.json`)
- `npm start` / `npm run dev` — start the Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the production build

**server** (`server/package.json`)
- `npm start` — start the API with nodemon (restarts on `.js`/`.graphql` changes)
