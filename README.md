<div align="center">

# ⚙️ Toys Paradise — API Server

### The Express + MongoDB backend powering [Toys Paradise](https://toys-paradise.web.app/).

[![API](https://img.shields.io/badge/🔗%20Deployed%20API-toys--paradise--server.vercel.app-7C3AED?style=for-the-badge&labelColor=1E293B)](https://toys-paradise-server.vercel.app/)

---

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white&style=for-the-badge)
![Express](https://img.shields.io/badge/Express%204-000000?logo=express&logoColor=white&style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=for-the-badge)
![Vercel](https://img.shields.io/badge/Deployed%20on%20Vercel-000000?logo=vercel&logoColor=white&style=for-the-badge)

</div>

---

## ✨ Overview

A lightweight REST API built with **Express** and the **MongoDB Node driver**. It manages the toy marketplace's data — listing, searching, adding, updating, deleting and sorting toys — and is deployed as a serverless function on **Vercel**.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `GET` | `/allToys` | Fetch all toys |
| `GET` | `/toySearch/:text` | Case-insensitive regex search by toy name |
| `GET` | `/toy/:id` | Fetch a single toy by `_id` |
| `GET` | `/myToys` | Toys by seller (`?email=…`), sorted by price (`?sort=asc\|desc`) |
| `GET` | `/myToys/:id` | Fetch a single toy by `_id` |
| `POST` | `/allToys` | Insert a new toy |
| `PATCH` | `/myToys/:id` | Update price, quantity & description |
| `DELETE` | `/allToys/:id` | Delete a toy |

---

## 🛠️ Getting Started

### Prerequisites

- Node.js **16+**
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (or any MongoDB instance)

### Installation

```bash
cd toys-paradise-server
npm install
```

### Environment Variables

Create a `.env` file:

```env
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
PORT=5000
```

The connection string is built as:

```js
mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.tujztw6.mongodb.net/?retryWrites=true&w=majority
```

### Run

```bash
npm start        # runs node index.js → http://localhost:5000
```

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm start` | Start the server |
| `npm test` | Placeholder test runner |

---

## 🗂️ Project Structure

```
toys-paradise-server/
├── index.js        # Express app, routes, MongoDB client
├── vercel.json     # Vercel serverless build & routing config
├── .env            # environment variables (git-ignored)
└── package.json
```

---

## ☁️ Deployment (Vercel)

1. Push the repo to GitHub.
2. Import it in [Vercel](https://vercel.com) (framework: **Other**).
3. Add the `DB_USER` and `DB_PASS` environment variables.
4. Deploy — `vercel.json` routes all requests to `index.js` as a serverless function.

> **CORS note:** the API only allows requests with `Origin: https://toys-paradise.web.app` (or `http://localhost:5173` for development).

---

## 📄 License

Distributed under the **ISC License**.

<div align="center">

---

Made with ❤️ for little adventurers.

</div>