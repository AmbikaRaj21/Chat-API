# 💬 Chat API

A RESTful Chat API built with **Node.js**, **Express.js**, **MongoDB**, **Mongoose**, and **Socket.IO**. This project supports user management, real-time messaging, conversation retrieval, and interactive API documentation using Swagger.

## 🚀 Features

* 👤 Create new users
* 👥 Get all registered users
* 💬 Send messages between users
* 📜 Retrieve conversation history between two users
* ⚡ Real-time message delivery using Socket.IO
* 📖 Interactive API documentation with Swagger UI
* ✅ Input validation and proper error handling
* 🌐 RESTful API architecture

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Socket.IO
* Swagger (swagger-jsdoc & swagger-ui-express)
* CORS
* Dotenv

---

## 📁 Project Structure

```text
chat-api/
│── config/
│   ├── db.js
│   └── swagger.js
│
│── controllers/
│   ├── userController.js
│   └── messageController.js
│
│── models/
│   ├── User.js
│   └── Message.js
│
│── routes/
│   ├── userRoutes.js
│   └── messageRoutes.js
│
│── socket.js
│── server.js
│── package.json
│── .env
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <https://github.com/AmbikaRaj21/Chat-API.git>
```

### 2. Navigate to the project

```bash
cd chat-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 5. Run the server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

## 📌 API Endpoints

### 👤 Users

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| POST   | `/api/users` | Create a new user |
| GET    | `/api/users` | Get all users     |

---

### 💬 Messages

| Method | Endpoint                          | Description                        |
| ------ | --------------------------------- | ---------------------------------- |
| POST   | `/api/messages`                   | Send a message                     |
| GET    | `/api/messages/:sender/:receiver` | Get conversation between two users |

---

## ⚡ Real-Time Messaging

This project uses **Socket.IO** to deliver messages instantly.

### Events

**Client → Server**

* `user-connected`

Registers a user as online.

**Server → Client**

* `receive-message`

Delivers a new message instantly to the receiver if they are online.

---

## 📖 Swagger Documentation

After starting the server, open:

### Local

```
http://localhost:5000/api-docs
```

### Production

```
https://chat-api-5jrx.onrender.com/api-docs
```

Swagger allows you to:

* View all available APIs
* Test endpoints directly from the browser
* Inspect request and response formats

---

## 🌍 Deployment

The API can be deployed on platforms such as Render.

Update the server URL in `config/swagger.js` after deployment to display the production API inside Swagger.

---

## 📬 Sample Request

### Create User

```http
POST /api/users
```

```json
{
  "username": "Ambika"
}
```

---

### Send Message

```http
POST /api/messages
```

```json
{
  "text": "Hello!",
  "sender": "<sender_id>",
  "receiver": "<receiver_id>"
}
```

---

## ✨ Future Improvements

* JWT Authentication
* User Login
* Online/Offline Status API
* Read Receipts
* Typing Indicators
* Group Chat Support
* Message Deletion
* File and Image Sharing

---

## 👩‍💻 Author

**Ambika Raj**

Built as part of a Backend Internship Assignment to demonstrate REST API development, MongoDB integration, real-time communication using Socket.IO, and API documentation with Swagger.
