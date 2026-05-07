# NoSQL Chat App




# NoSQL Chat Application

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


## Project Overview

This project is a real-time NoSQL-based messaging application developed using three different NoSQL databases:

- MongoDB
- Neo4j
- Redis

Each database was used for a specific purpose based on its strengths.

The application demonstrates:
- document storage
- graph relationships
- real-time caching
- session handling
- aggregation pipelines
- graph traversal
- Docker containerization

---

# Technologies Used

- Node.js
- Express.js
- MongoDB
- Neo4j
- Redis
- Docker Compose
- Postman

---

# Database Architecture

| Database | Purpose |
|---|---|
| MongoDB | Store users, messages, and group chats |
| Neo4j | Manage friendships and graph relationships |
| Redis | Handle real-time presence, caching, sessions, and counters |

---
_______________________________________________________________________________________________
# MongoDB Features

MongoDB was used to manage document-oriented chat data.

## Features Implemented

### 1. User Registration
Stores new users inside the `users` collection.

### 2. User Login
Authenticates users using email and password.

### 3. Send Messages
Stores chat messages inside the `messages` collection.

### 4. Get Messages
Retrieves all stored chat messages.

### 5. Create Group Chats
Stores group chat information inside the `groups` collection.

### 6. Get Group Chats
Retrieves all group chats.

---

# MongoDB Collections Used

- users
- messages
- groups

---

# MongoDB Aggregation Pipelines

## 1. Recent Chats Aggregation

This aggregation:
- sorts messages by latest creation date
- groups conversations by sender and receiver
- returns the latest message of each conversation

### Purpose
Used to display recent conversations efficiently.

---

## 2. Most Active Users Aggregation

This aggregation:
- counts how many messages each user sent
- sorts users by message count

### Purpose
Used to identify the most active users in the chat application.

---

# Why MongoDB Was Used

MongoDB is suitable for:
- flexible document storage
- chat messages
- user profiles
- dynamic schemas
- fast CRUD operations

---
_______________________________________________________________________________________________
# Neo4j Features

Neo4j was used to manage friendship relationships using graph structures.

---

## Features Implemented

### 1. Add Friend
Creates friendship relationships between users.

### 2. Check Friendship
Checks whether two users are connected as friends.

### 3. Mutual Friends
Finds common friends between two users using graph traversal.

### 4. Remove Friend
Deletes friendship relationships.

### 5. Get All Friends
Retrieves all friends connected to a user.

---

# Neo4j Concepts Used

- Nodes
- Relationships
- Cypher Queries
- Graph Traversal

---

Neo4j is ideal for:

relationship-based data
social network structures
friendship graphs
mutual connections
graph traversal queries

______________________________________________________________________________________________
# Redis Module Features 
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
_____________________________________________________________________________________________





## API s were tested using postman/thunderclinet

example:
POST /redis/online
POST /redis/typing
GET /redis/online-users

POST /mongo/register
POST /mongo/message

POST /neo/add-friend
POST /neo/mutual-friends




## Project Objectives Achieved
Real-time messaging features
Document-based storage
Graph relationship management
Aggregation pipelines
Caching system
Session management
Dockerized database environment
Multi-database NoSQL architecture


## This project successfully demonstrates the integration of multiple NoSQL databases inside a single messaging application.

Each database was selected according to its strengths:

MongoDB for document storage
Neo4j for graph relationships
Redis for caching and real-time operations

The project also demonstrates:

aggregation pipelines
graph traversal
Redis data structures
Docker containerization
REST API development
