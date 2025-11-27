# Docker Quick Setup Guide

## Option 1: Run Using Docker Compose (Recommended)

The docker-compose setup automatically builds and runs both services.

### Prerequisites
- Docker Desktop must be running
- Minimum 4GB RAM available for Docker

### Start Application
```bash
cd /path/to/task-management-app
docker-compose up -d
```

### Access Services
- Frontend: http://localhost:80
- Backend API: http://localhost:2090
- Swagger UI: http://localhost:2090/swagger-ui.html

### View Logs
```bash
docker logs task-backend -f
docker logs task-frontend -f
```

### Stop Application
```bash
docker-compose down
```

---

## Option 2: Manual Docker Build (If Compose is Slow)

### Build Backend Image
```bash
docker build -f springbootbackend/backend.Dockerfile -t task-backend:latest ./springbootbackend
```

### Build Frontend Image
```bash
docker build -f reactfrontend/frontend.Dockerfile -t task-frontend:latest ./reactfrontend
```

### Create Network
```bash
docker network create task-network
```

### Run Backend Container
```bash
docker run -d --name task-backend --network task-network -p 2090:2090 \
  -e SPRING_DATASOURCE_URL=jdbc:h2:mem:projectdb \
  -e SPRING_DATASOURCE_DRIVERCLASSNAME=org.h2.Driver \
  -e SPRING_JPA_DATABASE_PLATFORM=org.hibernate.dialect.H2Dialect \
  task-backend:latest
```

### Run Frontend Container
```bash
docker run -d --name task-frontend --network task-network -p 80:80 task-frontend:latest
```

---

## Troubleshooting

### Build Takes Too Long
- Maven compilation can take 3-5 minutes
- Use `--no-cache` flag to force fresh build: `docker-compose build --no-cache`

### Port Already in Use
Change ports in docker-compose.yml:
```yaml
ports:
  - "8080:80"  # Use 8080 instead of 80
  - "3090:2090"  # Use 3090 instead of 2090
```

### Container Won't Start
Check logs:
```bash
docker logs task-backend
docker logs task-frontend
```

### Clear Everything and Start Fresh
```bash
docker-compose down
docker system prune -a
docker-compose up -d
```

---

## Performance Tips

1. **Reduce Build Time**: The first build takes 3-5 minutes due to Maven
2. **Subsequent Builds**: Much faster due to Docker layer caching
3. **Memory**: Ensure Docker has at least 4GB RAM allocated
4. **Disk Space**: Need ~2GB for images and builds

---

## Production Deployment

For production use, consider:
1. Using a real database (MySQL/PostgreSQL)
2. Implementing proper SSL/TLS
3. Using a reverse proxy (Nginx)
4. Managing secrets securely
5. Setting resource limits in docker-compose

See `DOCKER.md` for comprehensive documentation.
