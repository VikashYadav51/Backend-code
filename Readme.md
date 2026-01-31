# 02backend — Node/Express/Mongo API

A feature-rich backend built with Node.js, Express.js, and MongoDB using Mongoose. It implements authentication (JWT access/refresh tokens), file uploads via Multer to Cloudinary, robust error handling, and modular routing for users, videos, and channels.

## Features
- User registration, login, logout, profile fetch and updates
- JWT-based authentication with access and refresh tokens
- Secure cookies and CORS configuration
- Cloudinary image uploads for avatar, cover, and profile pictures
- Video metadata endpoints (title, description, tags, likes, views, dislikes)
- Channel endpoints (name, description, subscribers)
- Centralized error handling and consistent API responses

## Tech Stack
- Node.js, Express.js
- MongoDB, Mongoose
- JWT (jsonwebtoken), bcryptjs
- Multer for uploads, Cloudinary for storage
- CORS, cookie-parser

## Project Structure
```
src/
  app.js                # Express app, middlewares, routers, global error handler
  index.js              # Server bootstrap and DB connection
  database/
    user.database.js    # Mongoose connection
  middlewares/
    auth.middlewares.js
    channel.middleware.js
    middlewares.js      # Multer config
    video.middlewares.js
  models/               # Mongoose models (user, video, channel, subscription)
  controllers/          # Route handlers
  routes/
    user.routes.js
    video.router.js
    channel.router.js
  utils/
    ApiError.js
    ApiResponse.js
    asyncHandler.js
    cloudinary.js
public/
  temp/                 # Upload temp dir
```

## Getting Started
### Prerequisites
- Node.js 18+
- MongoDB instance (local or Atlas)
- Cloudinary account (for image storage)

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` file in the project root:
```
PORT=8000
CORS_ORIGIN=http://localhost:3000
COOKIE_SECRET=your-cookie-secret

# MongoDB
MONOGODB_URL=mongodb+srv://<user>:<pass>@cluster.mongodb.net
DB_NAME=your-db-name

# JWT
ACCESS_TOKEN_SECRET=your-access-token-secret
REFRESH_TOKEN_SECRET_KEY=your-refresh-token-secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Run
```bash
npm start
```
Starts the server with nodemon at `src/index.js`. Default port is `8000`.

## API Overview
Base path: `/api/v1`

- Users (`/user`)
  - POST `/register` — multipart/form-data (profilePicture, coverImage?, avatar?)
  - POST `/login`
  - POST `/logout` — requires auth
  - PATCH `/password` — requires auth
  - PATCH `/profile-picture` — requires auth, single file `profilePicture`
  - PATCH `/cover-picture` — requires auth, single file `coverImage`
  - PATCH `/avatar` — requires auth, single file `avatar`
  - PATCH `/email` — requires auth
  - GET `/profile` — requires auth
  - POST `/refresh` — refresh access token using refresh token

- Videos (`/video`) — requires auth for all
  - PATCH `/title`
  - PATCH `/description`
  - PATCH `/tags`
  - PATCH `/likes`
  - PATCH `/views`
  - PATCH `/dislikes`

- Channels (`/channel`) — requires auth and ownership
  - PATCH `/name`
  - PATCH `/description`
  - GET `/subscribers`

## Conventions
- Use `ApiResponse` for successful responses and `ApiError` for errors.
- Wrap async route handlers with `asyncHandler`.
- Set secure, httpOnly cookies for tokens.
- Keep uploads in `public/temp` and forward to Cloudinary.

## Scripts
```json
{
  "start": "nodemon src/index.js"
}
```

## Notes
- Ensure CORS and cookie settings match your frontend origin.
- The MongoDB env variable key is `MONOGODB_URL` (as used in the code).
