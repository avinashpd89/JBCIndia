# JBC India API Documentation

This guide explains how to test the server routes using Postman and how to connect the client to the backend.

## **Server Base URL**
`http://localhost:5001/api`

---

## **Postman Testing Guide**

### **1. Authentication (Login)**
- **URL**: `http://localhost:5000/api/auth/login`
- **Method**: `POST`
- **Body** (JSON):
  ```json
  {
    "email": "admin@jbcindia.in",
    "password": "your_password"
  }
  ```
- **Response**: You will receive an `accessToken`. Copy this token for subsequent requests.

### **2. Signup (Register New Admin)**
- **URL**: `http://localhost:5000/api/auth/signup`
- **Method**: `POST`
- **Body** (JSON):
  ```json
  {
    "email": "new_admin@jbcindia.in",
    "password": "strong_password"
  }
  ```
- **Response**: `201 Created`. User will need to be confirmed in AWS Cognito console.

### **3. Managing Leaders**
- **Get All**: `GET` `http://localhost:5000/api/leaders`
- **Add New**: `POST` `http://localhost:5000/api/leaders`
  - **Headers**: `Authorization: Bearer <your_token>`
  - **Body**:
    ```json
    {
      "name": "CA Name",
      "role": "Partner",
      "year": "2024",
      "quals": "FCA",
      "experience": "Description",
      "image": "image_url"
    }
    ```

### **4. Managing Branches**
- **Get All**: `GET` `http://localhost:5000/api/branches`
- **Add New**: `POST` `http://localhost:5000/api/branches`
  - **Body**:
    ```json
    {
      "city": "City Name",
      "address": "Full Address",
      "email": "branch@jbcindia.in"
    }
    ```

### **5. Managing Blogs**
- **Get All**: `GET` `http://localhost:5000/api/blogs`
- **Add New**: `POST` `http://localhost:5000/api/blogs`
  - **Body**:
    ```json
    {
      "title": "Blog Title",
      "date": "2024-05-13",
      "content": "Full content here",
      "image": "image_url"
    }
    ```

### **6. Information Gallery**
- **Get All**: `GET` `http://localhost:5000/api/gallery`
- **Add New**: `POST` `http://localhost:5000/api/gallery`
  - **Body**:
    ```json
    {
      "image": "image_url",
      "title": "Optional Title"
    }
    ```

---

## **How to Connect Client with Server**

### **1. Environment Variable**
In the `client` folder, ensure your `.env` file (or `api.js`) points to the correct server URL:
- File: `client/src/services/api.js`
- Value: `const API_BASE_URL = 'http://localhost:5000/api';`

### **2. Authentication Flow**
- When the admin logs in via the UI, the `accessToken` is stored in `localStorage`.
- The `api.js` service automatically adds the `Authorization: Bearer <token>` header to all outgoing requests.

### **3. CORS**
The server is already configured with `cors()` to allow requests from the client (typically `http://localhost:5173`).

---

## **Troubleshooting**
- **Port 5000 Error**: If the server fails to start, ensure no other process is using port 5000.
- **DynamoDB Error**: Ensure your AWS credentials in `server/.env` are correct and the tables exist in your AWS account.
