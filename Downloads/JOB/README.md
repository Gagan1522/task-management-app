# Task Management Application

A full-stack web application for managing tasks with a React frontend and Spring Boot backend.

## Project Structure

```
├── reactfrontend/          # React + Vite frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── springbootbackend/      # Spring Boot REST API
│   ├── src/
│   ├── pom.xml
│   └── mvnw
└── README.md
```

## Prerequisites

- **Java 17+** (for Spring Boot backend)
- **Node.js 20+** (for React frontend)
- **Git**

## Running the Application

### 1. Start the Backend (Spring Boot)

```bash
cd springbootbackend
./mvnw spring-boot:run
```

The backend will start on **http://localhost:2090**

**API Endpoints:**
- Swagger UI: http://localhost:2090/swagger-ui.html
- H2 Console: http://localhost:2090/h2-console

### 2. Start the Frontend (React)

In a new terminal:

```bash
cd reactfrontend
npm install
npm run dev
```

The frontend will start on **http://localhost:5173** (or the next available port)

## Features

- ✅ Full-stack task management application
- ✅ React with Vite for fast development
- ✅ Spring Boot REST API
- ✅ H2 in-memory database
- ✅ Swagger API documentation
- ✅ Responsive UI

## Technology Stack

**Frontend:**
- React 19
- Vite
- Axios (HTTP client)
- React Router

**Backend:**
- Spring Boot 3.5.6
- Spring Data JPA
- H2 Database
- Swagger/OpenAPI 3.0

## API Documentation

Once the backend is running, visit: **http://localhost:2090/swagger-ui.html**

## Building for Production

### Frontend Build
```bash
cd reactfrontend
npm run build
```

### Backend Build
```bash
cd springbootbackend
./mvnw clean package
```

## Docker Support

Dockerfiles are included for both frontend and backend:
- `reactfrontend/frontend.Dockerfile`
- `springbootbackend/backend.Dockerfile`

## Author

Gagan1522

## License

MIT
