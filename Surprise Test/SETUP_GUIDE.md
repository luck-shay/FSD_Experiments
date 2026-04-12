# Complete Setup & Deployment Guide

## Quick Start (5 minutes)

### 1. Database
```bash
mysql -u root -p < database_schema.sql
```

### 2. Backend
```bash
cd backend
# Update application.properties with your MySQL credentials
mvn spring-boot:run
```

### 3. Frontend
```bash
cd frontend
npm install
npm start
```

### 4. Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Demo Login: demo@example.com / password123

---

## Detailed Installation

### Windows Setup

#### Prerequisites:
1. **Install Java 17**
   - Download from: https://www.oracle.com/java/technologies/downloads/
   - Set JAVA_HOME environment variable

2. **Install Maven**
   - Download from: https://maven.apache.org/download.cgi
   - Add Maven to PATH

3. **Install Node.js**
   - Download from: https://nodejs.org/
   - Verify: `node --version` and `npm --version`

4. **Install MySQL**
   - Download from: https://www.mysql.com/downloads/
   - Create root user during installation

5. **MySQL Setup**
   - Open Command Prompt as Administrator
   - Connect to MySQL:
     ```
     mysql -u root -p
     ```
   - Create database:
     ```sql
     CREATE DATABASE job_tracker_db;
     USE job_tracker_db;
     -- Paste SQL from database_schema.sql
     ```

#### Backend Setup:
```bash
cd backend

# Edit application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/job_tracker_db
spring.datasource.username=root
spring.datasource.password=<your_password>
jwt.secret=<use-strong-random-secret>

# Run backend
mvn clean install
mvn spring-boot:run
```

#### Frontend Setup:
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

---

### macOS Setup

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Java
brew install openjdk@17
sudo ln -sfn /opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk

# Install Maven
brew install maven

# Install Node.js
brew install node

# Install MySQL
brew install mysql
brew services start mysql

# Setup Database
mysql -u root
# Run SQL from database_schema.sql

# Backend
cd backend
mvn spring-boot:run

# Frontend (in new terminal)
cd frontend
npm install
npm start
```

---

### Linux Setup (Ubuntu)

```bash
# Update package manager
sudo apt update

# Install Java 17
sudo apt install openjdk-17-jdk

# Install Maven
sudo apt install maven

# Install Node.js
sudo apt install nodejs npm

# Install MySQL
sudo apt install mysql-server
sudo mysql_secure_installation

# Setup Database
mysql -u root -p
# Run SQL from database_schema.sql

# Backend
cd backend
mvn spring-boot:run

# Frontend (in new terminal)
cd frontend
npm install
npm start
```

---

## Environment Configuration

### Backend (application.properties)

```properties
# Server
server.port=8080
server.servlet.encoding.charset=UTF-8
spring.application.name=job-application-tracker

# MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/job_tracker_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true

# JWT
jwt.secret=your-super-secret-key-min-256-bits-for-production
jwt.expiration=86400000

# Logging
logging.level.root=INFO
logging.level.com.jobtracker=DEBUG
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8080
```

---

## Building for Production

### Backend

```bash
# Build JAR file
cd backend
mvn clean package

# Run JAR
java -jar target/job-application-tracker-1.0.0.jar

# Or with custom properties
java -Dspring.datasource.url=jdbc:mysql://prod-db:3306/job_tracker_db \
     -Dspring.datasource.username=produser \
     -Dspring.datasource.password=prodpass \
     -Djwt.secret=production-secret-key \
     -jar target/job-application-tracker-1.0.0.jar
```

### Frontend

```bash
cd frontend

# Create optimized production build
npm run build

# Output: build/ folder
# Deploy to hosting service (Netlify, Vercel, GitHub Pages, etc.)
```

---

## Docker Deployment (Optional)

### Backend Dockerfile

```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/job-application-tracker-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Frontend Dockerfile

```dockerfile
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: job_tracker_db
    ports:
      - "3306:3306"
    volumes:
      - ./database_schema.sql:/docker-entrypoint-initdb.d/init.sql

  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/job_tracker_db
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: password
    depends_on:
      - mysql

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
```

---

## Testing

### Backend Testing

```bash
# Test specific endpoint
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"password123"}'

# Test with Authorization header
curl -X GET http://localhost:8080/applications \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Frontend Testing

```bash
cd frontend

# Run tests
npm test

# Build for testing
npm run build
```

---

## Common Issues & Solutions

### Issue: Port 8080 in use
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:8080 | xargs kill -9
```

### Issue: MySQL connection refused
```bash
# Check if MySQL is running
mysql -u root -p -e "SELECT 1"

# Start MySQL
# Windows: Search "Services", find MySQL, start it
# macOS: brew services start mysql
# Linux: sudo service mysql start
```

### Issue: npm install fails
```bash
# Clear cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: CORS errors
- Check SecurityConfig.java
- Ensure frontend URL is whitelisted
- Verify API calls use correct endpoint

---

## Performance Optimization

### Backend
- Enable query caching
- Add database indexes
- Use connection pooling
- Implement pagination

### Frontend
- Code splitting with React.lazy
- Image optimization
- Minify CSS/JS
- Enable gzip compression

---

## Security Checklist

- [ ] Change default JWT secret
- [ ] Update MySQL password
- [ ] Enable HTTPS in production
- [ ] Set CORS origins carefully
- [ ] Validate all inputs
- [ ] Keep dependencies updated
- [ ] Use environment variables
- [ ] Enable logging and monitoring

---

## Monitoring & Logging

### View Backend Logs
```bash
# In production
tail -f application.log

# With specific level
grep "ERROR" application.log
```

### Monitor Database
```bash
# Connection check
mysql -u root -p -e "SHOW PROCESSLIST;"

# Table size
SELECT table_name, ROUND(((data_length + index_length) / 1024 / 1024), 2) AS size_mb
FROM information_schema.TABLES
WHERE table_schema = 'job_tracker_db';
```

---

## Scaling for Production

1. **Database**
   - Use managed MySQL service (AWS RDS, Azure SQL)
   - Enable backups
   - Set up replication

2. **Backend**
   - Deploy multiple instances
   - Use load balancer
   - Implement caching (Redis)
   - Use CDN for static assets

3. **Frontend**
   - Deploy to CDN
   - Enable caching headers
   - Use service workers

---

## Support Resources

- **Spring Boot Documentation:** https://spring.io/projects/spring-boot
- **React Documentation:** https://react.dev
- **MySQL Documentation:** https://mysql.com/doc/
- **JWT.io:** https://jwt.io

---

## Version Info

- Java: 17+
- Spring Boot: 3.2.0
- React: 18.2.0
- Node.js: 16+
- MySQL: 8.0+
- Maven: 3.8+
