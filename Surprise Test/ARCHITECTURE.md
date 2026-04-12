# Architecture & Design Documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Browser                          │
│                  (React Frontend)                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Pages:                    Components:                │  │
│  │  - Login                   - Sidebar                  │  │
│  │  - Register                - Navbar                   │  │
│  │  - Dashboard               - StatCard                 │  │
│  │                            - ApplicationTable         │  │
│  │  Services:                 - ApplicationForm          │  │
│  │  - api.js (Axios)          - AlertBanner             │  │
│  │                            - ProtectedRoute          │  │
│  │  State:                                               │  │
│  │  - AuthContext (JWT, User)                           │  │
│  │  - Component State (Applications, Stats)             │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │ HTTP + JWT
                            │ (JSON)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│               Spring Boot Backend (Java)                    │
│  Port: 8080                                                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Controllers:                                         │  │
│  │  ├─ AuthController (/auth)                           │  │
│  │  │  ├─ POST /register                                │  │
│  │  │  └─ POST /login                                   │  │
│  │  └─ ApplicationController (/applications)            │  │
│  │     ├─ GET / (all)                                   │  │
│  │     ├─ GET /?status= (filter)                        │  │
│  │     ├─ GET /?company= (search)                       │  │
│  │     ├─ GET /stats                                    │  │
│  │     ├─ POST / (create)                               │  │
│  │     ├─ PUT /{id} (update)                            │  │
│  │     └─ DELETE /{id}                                  │  │
│  │                                                       │  │
│  │  Services:                                           │  │
│  │  ├─ AuthService                                      │  │
│  │  │  ├─ register()                                    │  │
│  │  │  └─ login()                                       │  │
│  │  └─ ApplicationService                                │  │
│  │     ├─ createApplication()                           │  │
│  │     ├─ getAllApplications()                          │  │
│  │     ├─ getApplicationsByStatus()                     │  │
│  │     ├─ searchApplications()                          │  │
│  │     ├─ updateApplication()                           │  │
│  │     ├─ deleteApplication()                           │  │
│  │     └─ getStats()                                    │  │
│  │                                                       │  │
│  │  Repositories:                                       │  │
│  │  ├─ UserRepository (JpaRepository)                   │  │
│  │  └─ ApplicationRepository (JpaRepository)            │  │
│  │                                                       │  │
│  │  Security:                                           │  │
│  │  ├─ JwtUtil (Token generation & validation)         │  │
│  │  ├─ JwtFilter (Request interceptor)                  │  │
│  │  └─ SecurityConfig (CORS, CSRF)                      │  │
│  │                                                       │  │
│  │  Entities:                                           │  │
│  │  ├─ User (id, name, email, password, role)          │  │
│  │  └─ Application (id, userId, company, role,         │  │
│  │     status, appliedDate, notes)                      │  │
│  │                                                       │  │
│  │  DTOs:                                               │  │
│  │  ├─ RegisterRequest/LoginRequest                     │  │
│  │  ├─ AuthResponse                                     │  │
│  │  ├─ UserDTO                                          │  │
│  │  ├─ ApplicationRequest/ApplicationDTO                │  │
│  │  └─ StatsDTO                                         │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │ JDBC
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    MySQL Database                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Database: job_tracker_db                            │  │
│  │                                                       │  │
│  │  Tables:                                             │  │
│  │  ┌─ users                                            │  │
│  │  │  ├─ id (PK)                                       │  │
│  │  │  ├─ name                                          │  │
│  │  │  ├─ email (UNIQUE)                                │  │
│  │  │  ├─ password                                      │  │
│  │  │  ├─ role                                          │  │
│  │  │  └─ timestamps                                    │  │
│  │  │                                                   │  │
│  │  └─ applications                                     │  │
│  │     ├─ id (PK)                                       │  │
│  │     ├─ user_id (FK → users.id)                       │  │
│  │     ├─ company                                       │  │
│  │     ├─ role                                          │  │
│  │     ├─ status (ENUM)                                 │  │
│  │     ├─ applied_date                                  │  │
│  │     ├─ notes                                         │  │
│  │     └─ timestamps                                    │  │
│  │                                                       │  │
│  │  Indexes:                                            │  │
│  │  ├─ users.email (for lookups)                       │  │
│  │  ├─ applications.user_id (for filtering)             │  │
│  │  ├─ applications.status (for filtering)              │  │
│  │  └─ applications.applied_date (for sorting)          │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Authentication Flow

```
1. User enters credentials (Email, Password)
   ↓
2. Frontend sends POST /auth/login
   ↓
3. Backend:
   - Find user by email
   - Verify password (BCrypt)
   ↓
4. If valid:
   - Generate JWT token (Header.Payload.Signature)
   - Return token + user data
   ↓
5. Frontend:
   - Store token in localStorage
   - Store user data
   - Set Authorization header for all requests
   ↓
6. For protected routes:
   - Extract token from Authorization header
   - Validate JWT signature
   - Extract email from payload
   - Allow/Deny request
```

---

## Data Flow - Create Application

```
Frontend:
  User fills form → Validate → Axios.post(/applications, data)
         │
         └──────────────────────────────────────────────┐
                                                        │
Backend:
    ↓
  ApplicationController.createApplication()
    │
    ├─ Extract JWT token from header
    ├─ Validate token (JwtUtil)
    ├─ Get user email from token
    │
    └──→ ApplicationService.createApplication(userEmail, data)
           │
           ├─ Validate input (company, role, date)
           ├─ Find user by email (UserRepository)
           ├─ Create Application entity
           ├─ Set status (default: APPLIED)
           ├─ Save to database (ApplicationRepository)
           │
           └──→ Convert to ApplicationDTO
                │
                └──────────────────────────────────────┐
                                                       │
Frontend:
  ↓
  Response 201 Created
  ├─ Update local state
  ├─ Show success alert
  └─ Refresh table
```

---

## Security Implementation

### JWT Token Structure

```
Header:
{
  "alg": "HS512",
  "typ": "JWT"
}

Payload:
{
  "sub": "demo@example.com",
  "iat": 1712970000,
  "exp": 1713056400
}

Signature:
HMACSHA512(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

### Token Validation Flow

```
1. Request arrives with header:
   Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...

2. JwtFilter catches request:
   - Extract token (remove "Bearer ")
   - Call JwtUtil.validateToken(token)
   
3. JwtUtil validates:
   - Signature using secret key
   - Expiration time
   - Format correctness
   
4. If valid:
   - Extract email from payload
   - Add to request attributes
   - Continue to controller
   
5. If invalid:
   - Return 401 Unauthorized
   - Reject request
```

### Password Security

```
User registers: password = "password123"
         ↓
  BCrypt hash:
  password = "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/KFm"
         ↓
  Stored in database
         ↓
  User logs in: password = "password123"
         ↓
  BCrypt compare:
  passwordEncoder.matches(input, stored)
         ↓
  Returns true/false
```

---

## API Request/Response Flow

### Create Application Flow

```
REQUEST:
POST /applications
Authorization: Bearer <token>
Content-Type: application/json

{
  "company": "Google",
  "role": "Senior SWE",
  "status": "APPLIED",
  "appliedDate": "2024-04-12",
  "notes": "Phone screen scheduled"
}

↓ Processing ↓

1. JwtFilter validates token
2. Extract user email
3. ApplicationService validates input
4. ApplicationService finds user
5. Create Application entity
6. Save to database
7. Convert to DTO

RESPONSE (201 Created):
{
  "id": 5,
  "userId": 1,
  "company": "Google",
  "role": "Senior SWE",
  "status": "APPLIED",
  "appliedDate": "2024-04-12",
  "notes": "Phone screen scheduled"
}
```

---

## Error Handling

```
Frontend:
  Try-Catch around API calls
    ↓
  Catch error
    ├─ 401: Unauthorized → Clear token, redirect to login
    ├─ 400: Validation error → Show error message
    ├─ 404: Not found → Show error message
    ├─ 500: Server error → Show generic error
    └─ Network error → Show connection error

Backend:
  Controller catches exception
    ↓
  Check exception type
    ├─ IllegalArgumentException → 400 Bad Request
    ├─ EntityNotFoundException → 404 Not Found
    ├─ AuthenticationException → 401 Unauthorized
    └─ Exception → 500 Internal Server Error
       ↓
    Return JSON error response
```

---

## Performance Optimizations

### Database
- **Indexes:** Added on email, user_id, status, applied_date
- **Query:** Only fetch needed columns
- **Pagination:** Can be added for large datasets

### Backend
- **Caching:** JWT validation cached for request duration
- **Connection Pool:** Handles multiple concurrent requests
- **Lazy Loading:** Avoid N+1 queries

### Frontend
- **Lazy Loading:** Components loaded on demand
- **Memoization:** Prevent unnecessary re-renders
- **Debouncing:** Search requests debounced
- **Code Splitting:** Router-based splitting

---

## Scalability Considerations

### Current Architecture (Single Server)
- Good for development and small-scale deployment
- All components on one machine
- Suitable for ≤ 1000 concurrent users

### For Production (High Traffic)

```
1. Database:
   - Move to managed service (AWS RDS)
   - Enable replication
   - Set up backups
   - Add read replicas

2. Backend:
   - Deploy multiple instances
   - Load balancer (Nginx, HAProxy)
   - Caching layer (Redis)
   - Message queue (RabbitMQ)

3. Frontend:
   - CDN for static assets
   - Geographic distribution
   - Compression enabled
   - Service workers

4. Monitoring:
   - Application Performance Monitoring (New Relic)
   - Error tracking (Sentry)
   - Log aggregation (ELK stack)
```

---

## Design Patterns Used

1. **MVC (Model-View-Controller)**
   - Separation of concerns
   - Frontend = View, Backend = Model + Controller

2. **DTO (Data Transfer Object)**
   - Serialize/deserialize data
   - Protects entity structure
   - API contract versioning

3. **Repository Pattern**
   - Abstracts data access
   - Testable business logic
   - Easy database switching

4. **JWT (JSON Web Token)**
   - Stateless authentication
   - Scalable across servers
   - Self-contained security

5. **Context API**
   - Global state management
   - Authentication state
   - User information

---

## Technology Choices Rationale

| Component | Choice | Why |
|-----------|--------|-----|
| Backend | Spring Boot | Enterprise-grade, robust ecosystem |
| Frontend | React | Component-based, large ecosystem |
| Database | MySQL | Relational, widely used, reliable |
| Auth | JWT | Stateless, scalable, standard |
| Hashing | BCrypt | Industry standard, slow by design |
| HTTP Client | Axios | Simple, consistent API |
| State Mgmt | Context API | Built-in, no external dependency |

---

## Testing Strategy

### Unit Testing
- Service methods
- Utility functions
- Components (shallow)

### Integration Testing
- API endpoint tests
- Database operations
- Authentication flow

### E2E Testing
- Login flow
- Create application
- Update/delete operations
- Search/filter

### Test Tools
- JUnit 5 (Backend)
- Jest (Frontend)
- MockMvc (API testing)
- React Testing Library

---

## Future Enhancements

1. **Features**
   - Email notifications
   - Interview reminders
   - Analytics dashboard
   - Resume builder
   - Salary tracker

2. **Technical**
   - WebSocket for real-time updates
   - GraphQL API
   - Microservices architecture
   - Mobile app (React Native)

3. **DevOps**
   - CI/CD pipeline (GitHub Actions)
   - Docker containerization
   - Kubernetes orchestration
   - terraform IaC

---

This architecture is designed to be:
- **Scalable:** Can handle growth
- **Maintainable:** Clear separation of concerns
- **Secure:** JWT + BCrypt + Input validation
- **Testable:** Layered architecture
- **Production-ready:** Error handling, logging, monitoring
