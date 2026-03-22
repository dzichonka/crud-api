# 🛍️ Product Catalog CRUD API

Simple CRUD API for managing products, built with **Fastify** and **Node.js**.

---

## 🚀 Installation

```bash
npm install
```

---

## ⚙️ Environment variables

1. Create `.env` file based on example:

```bash
cp .env.example .env
```

or manually create:

```env
PORT=4000
```

2. You can change the port if needed.

---

## ▶️ Run application

### Development mode

```bash
npm run start:dev
```

Uses `tsx watch` for hot reload.

---

### Production mode

```bash
npm run build
npm run start:prod
```

---

## 📦 Available scripts

```json
"start:dev": "tsx watch src/server.ts",
"build": "tsc",
"start:prod": "build && node dist/server.js"
```

---

## 📡 API Endpoints

Base URL:

```
http://localhost:PORT/api/products
```

### Get all products

```
GET /api/products
```

---

### Get product by ID

```
GET /api/products/:productId
```

---

### Create product

```
POST /api/products
```

Example body:

```json
{
  "name": "Schrödinger's Cat",
  "description": "It both exists and does not exist. Quantum vibes only.",
  "price": 4000,
  "category": "quantum-weirdness",
  "inStock": true
}
```

---

### Update product

```
PUT /api/products/:productId
```

---

### Delete product

```
DELETE /api/products/:productId
```

---

## ❗ Error handling

- `400` — invalid input / invalid UUID
- `404` — product not found
- `500` — internal server error

---

## 🧪 Testing the API

You can use:

- Postman
- Thunder Client (VS Code)

👉 Example Postman collection:
_[Product Catalog CRUD API](https://dzichonka-3696400.postman.co/workspace/Anna-Vasilevich's-Workspace~4752c36c-245c-492f-8d06-79b9e08f3075/collection/48079025-8a74a39c-186b-432d-a8f4-1c20a90b5aef?action=share&source=copy-link&creator=48079025)_

---

## 📚 Task description

Original assignment:
_[CRUD API](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments-v2/03-crud-api/assignment.md)_

---

## 👩‍💻 Author

**Anna Vasilevich**

- [LinkedIn](https://www.linkedin.com/in/anna-vasilevich-frontend/)

---

## 💡 Notes

- Data is stored in-memory (will reset after server restart)
- UUID is generated on the server side
- Built for learning purposes
