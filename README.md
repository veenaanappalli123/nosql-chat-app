# NoSQL Chat App

A messaging application using:
- MongoDB
- Neo4j
- Redis

## Run Project

npm install
node backend/server.js

## create sample data
node sampleData.js


## docker run
docker compose up

## mongodb features

# Redis Module Features — NoSQL Messaging App

## Redis Integration Overview

This module implements real-time and caching functionalities for the NoSQL Messaging App using Redis Cloud and Node.js.

Redis was used because of its high-speed in-memory storage, making it suitable for:
- online presence
- typing indicators
- caching
- session management
- counters
- temporary real-time data

---

# Technologies Used

- Node.js
- Express.js
- Redis Cloud
- Redis Client Library

---

# Redis Features Implemented

REDIS MODULE FEATURES — NOSQL MESSAGING APP

1. Online Status Tracking
- Stores whether a user is online or offline.
- Uses Redis Strings.
- Example:
  online:u1 = true
- API:
  POST /redis/online

--------------------------------------------------

2. Get Online Status
- Retrieves the online status of a user.
- Reads data from Redis Strings.
- API:
  GET /redis/online/:userId

--------------------------------------------------

3. Typing Indicator
- Tracks when one user is typing to another user.
- Uses Redis Strings with automatic expiration (TTL).
- Example:
  typing:u1:u2 = true
- Automatically expires after 10 seconds.
- API:
  POST /redis/typing

--------------------------------------------------

4. Online Users Set
- Stores all currently online users.
- Uses Redis Sets.
- Prevents duplicate users automatically.
- Example:
  onlineUsers = {u1, u2, u3}
- API:
  GET /redis/online-users

--------------------------------------------------

5. Recent Chats Cache
- Stores recent chat messages temporarily for faster loading.
- Uses Redis Lists.
- Example:
  recentChats = ["Hello", "Hi", "Redis works"]
- APIs:
  POST /redis/recent-chat
  GET /redis/recent-chats

--------------------------------------------------

6. Session Storage
- Stores active user sessions.
- Uses Redis Strings with expiration time.
- Example:
  session:u1 = active
- Automatically expires after 1 hour.
- API:
  POST /redis/session

--------------------------------------------------

7. Logout Feature
- Removes:
  - online status
  - active session
  - user from online users set
- Uses Redis key deletion and set removal.
- API:
  POST /redis/logout

--------------------------------------------------

8. Last Seen Tracking
- Stores the last active timestamp of a user.
- Uses Redis Strings.
- Example:
  lastSeen:u1 = 2026-05-07T15:30:00
- API:
  GET /redis/last-seen/:userId

--------------------------------------------------

9. Unread Message Counter
- Tracks unread message count for users.
- Uses Redis Counters with INCR operation.
- Example:
  unread:u1 = 5
- API:
  POST /redis/unread

--------------------------------------------------

REDIS DATA STRUCTURES USED

1. Strings
- online status
- typing indicator
- sessions
- last seen

2. Sets
- online users

3. Lists
- recent chats cache

4. Counters
- unread messages

--------------------------------------------------

REDIS CONCEPTS IMPLEMENTED

- Real-time presence tracking
- Typing indicators
- Session management
- Caching
- TTL expiration
- Redis counters
- Redis set operations
- Key deletion
- Fast in-memory data handling
