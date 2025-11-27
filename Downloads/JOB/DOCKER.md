# Docker Setup Guide

This project includes Docker support for both the frontend and backend services.

## Prerequisites

- Docker Desktop installed ([Download](https://www.docker.com/products/docker-desktop))
- Docker Compose (comes with Docker Desktop)

## Quick Start

### Build and Run with Docker Compose

```bash
cd /path/to/task-management-app
docker-compose up -d
```

This will:
1. Build the Spring Boot backend image
2. Build the React frontend image
3. Start both services in containers
4. Create a shared network for communication

### Access the Application

- **Frontend:** http://localhost:80
- **Backend API:** http://localhost:2090
- **Swagger UI:** http://localhost:2090/swagger-ui.html
- **H2 Console:** http://localhost:2090/h2-console

## Individual Docker Commands

### Build Images

```bash
# Build backend
docker build -f springbootbackend/backend.Dockerfile -t task-backend:latest ./springbootbackend

# Build frontend
docker build -f reactfrontend/frontend.Dockerfile -t task-frontend:latest ./reactfrontend
```

### Run Containers

```bash
# Run backend
docker run -d -p 2090:2090 --name task-backend task-backend:latest

# Run frontend
docker run -d -p 80:80 --name task-frontend task-frontend:latest
```

### View Logs

```bash
# Backend logs
docker logs task-backend -f

# Frontend logs
docker logs task-frontend -f
```

### Stop Containers

```bash
# Using docker-compose
docker-compose down

# Using individual commands
docker stop task-backend task-frontend
docker rm task-backend task-frontend
```

## Services Configuration

### Backend Service
- **Java Version:** OpenJDK 17
- **Framework:** Spring Boot 3.5.6
- **Database:** H2 (in-memory)
- **Port:** 2090
- **Health Check:** Enabled

### Frontend Service
- **Node Version:** 20-alpine
- **Framework:** React 19 + Vite
- **Server:** Nginx
- **Port:** 80

## Network Configuration

Services communicate through a custom Docker network named `task-network`. This allows:
- Frontend to connect to backend via service name
- Automatic service discovery
- Isolated network environment

## Environment Variables

You can customize behavior by setting environment variables:

```bash
docker-compose up -d -e SPRING_DATASOURCE_URL=jdbc:h2:mem:projectdb
```

## Troubleshooting

### Port Already in Use

If ports 80 or 2090 are already in use:

```bash
# Change ports in docker-compose.yml
# Or use:
docker-compose -p custom_app up -d
```

### Container Won't Start

Check logs:
```bash
docker logs task-backend
docker logs task-frontend
```

### Rebuild Images

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Production Deployment

For production use:

1. Use environment-specific application.properties
2. Configure proper database (MySQL/PostgreSQL)
3. Use a reverse proxy (Nginx/Apache)
4. Implement proper SSL/TLS
5. Set resource limits in docker-compose.yml
6. Use secrets management for credentials
