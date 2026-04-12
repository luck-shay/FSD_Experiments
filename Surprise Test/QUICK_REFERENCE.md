# Quick Reference Guide

## 🚀 Quick Start (TL;DR)

```bash
# Terminal 1: Database
mysql -u root -p < database_schema.sql

# Terminal 2: Backend
cd backend
# Edit application.properties with MySQL credentials
mvn spring-boot:run

# Terminal 3: Frontend
cd frontend
npm install
npm start

# Access: http://localhost:3000
# Demo: demo@example.com / password123
```

---

## 📱 Frontend Quick Commands

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Build for production
npm run build

# Run tests
npm test

# Clear cache
npm cache clean --force
```

---

## ⚙️ Backend Quick Commands

```bash
# Build project
mvn clean install

# Run dev server
mvn spring-boot:run

# Run tests
mvn test

# Build production JAR
mvn clean package

# Run JAR
java -jar target/job-application-tracker-1.0.0.jar
```

---

## 📊 Database Quick Commands

```bash
# Connect to MySQL
mysql -u root -p

# Use database
USE job_tracker_db;

# View tables
SHOW TABLES;

# View users
SELECT * FROM users;

# View applications
SELECT * FROM applications;

# Check table structure
DESCRIBE applications;

# Row count
SELECT COUNT(*) FROM applications;

# View last 5 applications
SELECT * FROM applications ORDER BY created_at DESC LIMIT 5;
```

---

## 🔑 Common Credentials

| Field | Value |
|-------|-------|
| Email | demo@example.com |
| Password | password123 |
| MySQL User | root |
| Database | job_tracker_db |

---

## 🔗 Important URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8080 |
| MySQL | localhost:3306 |

---

## 📝 File Locations

### Backend
- **Main App:** `backend/src/main/java/com/jobtracker/JobApplicationTrackerApplication.java`
- **Controllers:** `backend/src/main/java/com/jobtracker/controller/`
- **Services:** `backend/src/main/java/com/jobtracker/service/`
- **Entities:** `backend/src/main/java/com/jobtracker/entity/`
- **Config:** `backend/src/main/resources/application.properties`

### Frontend
- **Main App:** `frontend/src/App.js`
- **Pages:** `frontend/src/pages/`
- **Components:** `frontend/src/components/`
- **API:** `frontend/src/services/api.js`
- **Auth Context:** `frontend/src/context/AuthContext.js`
- **Styles:** `frontend/src/styles/global.css`

---

## 🐛 Troubleshooting Cheat Sheet

| Problem | Solution |
|---------|----------|
| Port 8080 in use | `lsof -ti:8080 \| xargs kill -9` |
| Port 3000 in use | `lsof -ti:3000 \| xargs kill -9` |
| MySQL not running | `brew services start mysql` |
| npm install fails | `npm cache clean --force && rm -rf node_modules` |
| CORS error | Check SecurityConfig.java line ~20 |
| Token expired | Login again to get new token |
| 401 Unauthorized | Verify token in Authorization header |
| Database connection error | Check database URL and credentials |

---

## 🔐 JWT Token Format

```
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZW1vQGV4YW1wbGUuY29tIn0.xxx

Parts:
1. Header: Algorithm (HS512)
2. Payload: Subject (email)
3. Signature: HMAC SHA-512
```

---

## 📤 Common API Calls

### Login
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"password123"}'
```

### Get Applications
```bash
curl -X GET http://localhost:8080/applications \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Application
```bash
curl -X POST http://localhost:8080/applications \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"company":"Google","role":"SWE","status":"APPLIED","appliedDate":"2024-04-12"}'
```

### Get Stats
```bash
curl -X GET http://localhost:8080/applications/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🎨 Color Palette

```css
Primary Background: #0f172a
Secondary Background: #1a2943
Text Primary: #ffffff
Text Secondary: #cbd5e1
Accent (Blue): #6366f1
Accent (Purple): #8b5cf6
Success: #10b981
Error: #ef4444
```

---

## 📦 Key Dependencies

### Backend
- `spring-boot-starter-web` - Web framework
- `spring-boot-starter-data-jpa` - Database access
- `spring-boot-starter-security` - Security
- `jjwt` - JWT handling
- `mysql-connector-java` - MySQL driver
- `lombok` - Code generation

### Frontend
- `react` - UI framework
- `react-router-dom` - Client routing
- `axios` - HTTP client
- `lucide-react` - Icons

---

## 💾 Environment Variables

### Backend (.env / application.properties)
```
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/job_tracker_db
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=password
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8080
```

---

## 📋 Checklist Before Deployment

### Database
- [ ] MySQL is running
- [ ] Database created: `job_tracker_db`
- [ ] Tables created (users, applications)
- [ ] Demo data inserted
- [ ] Backups configured

### Backend
- [ ] application.properties updated
- [ ] JWT secret changed
- [ ] CORS origins verified
- [ ] Database connection tested
- [ ] Maven build successful
- [ ] All tests pass

### Frontend
- [ ] API URL correct
- [ ] npm dependencies installed
- [ ] No console errors
- [ ] Responsive design verified
- [ ] Production build tested

---

## 🔄 Common Workflows

### Add New Feature
1. Create component in `frontend/src/components/`
2. Create API endpoint in backend controller
3. Create service method in backend service
4. Add routing in `App.js`
5. Test with Postman/curl
6. Test frontend flow

### Debug Issue
1. Check browser console (F12)
2. Check backend logs (terminal)
3. Check database state
4. Check network tab (API calls)
5. Use curl to test API directly
6. Add console.logs strategically

### Update Database Schema
1. Update `database_schema.sql`
2. Create new migration script
3. Apply migration to existing database
4. Update entity classes
5. Test with existing data

---

## 📊 Performance Tips

### Frontend
- Minimize re-renders (React.memo)
- Lazy load routes
- Optimize images
- Enable compression

### Backend
- Add database indexes
- Use pagination for large datasets
- Cache frequently accessed data
- Monitor query performance

### Database
- Regular VACUUM/OPTIMIZE
- Monitor table sizes
- Archive old data
- Backup regularly

---

## 🧪 Testing Checklist

- [ ] Login works
- [ ] Register works
- [ ] Create application
- [ ] Read applications
- [ ] Update application
- [ ] Delete application
- [ ] Search applications
- [ ] Filter by status
- [ ] View stats
- [ ] Logout
- [ ] Protected routes work
- [ ] Invalid token rejected
- [ ] Mobile responsive
- [ ] Error messages show

---

## 📖 Documentation Files

1. **README.md** - Project overview & setup
2. **SETUP_GUIDE.md** - Detailed installation instructions
3. **API_TESTING.md** - API endpoints & curl examples
4. **ARCHITECTURE.md** - System design & flow diagrams
5. **This file** - Quick reference

---

## 🆘 Support Resources

- Spring Boot Docs: https://spring.io/projects/spring-boot
- React Docs: https://react.dev
- MySQL Docs: https://dev.mysql.com/doc/
- JWT: https://jwt.io
- Axios: https://axios-http.com

---

## 🎯 Next Steps

1. Run all three services
2. Access frontend at http://localhost:3000
3. Login with demo credentials
4. Explore the UI
5. Test all features
6. Review code
7. Deploy when ready

---

**Happy coding! 🚀**
