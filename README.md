# api2spec-fixture-fastify

A Fastify (TypeScript) API fixture for testing api2spec.

## Prerequisites

- Node.js 20+
- pnpm

## Installation

```bash
pnpm install
```

## Running the Server

Development mode (with hot reload):

```bash
pnpm dev
```

Production mode:

```bash
pnpm start
```

The server will start on `http://localhost:8080`.

## API Endpoints

### Health

- `GET /health` - Health check
- `GET /health/ready` - Readiness check

### Users

- `GET /users` - List all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create a new user
- `PUT /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user
- `GET /users/:userId/posts` - Get posts for a user

### Posts

- `GET /posts` - List all posts
- `GET /posts/:id` - Get post by ID
- `POST /posts` - Create a new post
