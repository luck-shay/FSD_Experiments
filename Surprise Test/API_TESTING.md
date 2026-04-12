# API Testing Commands (cURL)

## 1. User Registration

### Register New User
```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "message": "Registration successful",
  "user": {
    "id": 2,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

---

## 2. User Login

### Login with Demo Credentials
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "Demo User",
    "email": "demo@example.com",
    "role": "USER"
  }
}
```

**Save the token for authenticated requests:**
```bash
TOKEN="eyJhbGciOiJIUzUxMiJ9..."
```

---

## 3. Get All Applications

### Fetch All Applications (Protected)
```bash
curl -X GET http://localhost:8080/applications \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "userId": 1,
    "company": "Amazon",
    "role": "SDE-2",
    "status": "APPLIED",
    "appliedDate": "2024-04-02",
    "notes": "Strong company, good learning opportunity"
  },
  {
    "id": 2,
    "userId": 1,
    "company": "Google",
    "role": "Senior Software Engineer",
    "status": "INTERVIEW",
    "appliedDate": "2024-04-07",
    "notes": "Phone screen passed, next round scheduled"
  }
]
```

---

## 4. Create New Application

### Add Job Application
```bash
curl -X POST http://localhost:8080/applications \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Netflix",
    "role": "Senior Backend Engineer",
    "status": "APPLIED",
    "appliedDate": "2024-04-12",
    "notes": "Exciting opportunity in streaming technology"
  }'
```

**Expected Response:**
```json
{
  "id": 5,
  "userId": 1,
  "company": "Netflix",
  "role": "Senior Backend Engineer",
  "status": "APPLIED",
  "appliedDate": "2024-04-12",
  "notes": "Exciting opportunity in streaming technology"
}
```

---

## 5. Get Applications by Status

### Filter by Status (INTERVIEW)
```bash
curl -X GET "http://localhost:8080/applications?status=INTERVIEW" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

### Status Values:
- `APPLIED`
- `INTERVIEW`
- `OFFER`
- `REJECTED`

---

## 6. Search Applications by Company

### Search by Company Name
```bash
curl -X GET "http://localhost:8080/applications?company=Google" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

---

## 7. Update Application

### Update Application Status
```bash
curl -X PUT http://localhost:8080/applications/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Amazon",
    "role": "SDE-2",
    "status": "INTERVIEW",
    "appliedDate": "2024-04-02",
    "notes": "First round scheduled for April 20"
  }'
```

**Expected Response:**
```json
{
  "id": 1,
  "userId": 1,
  "company": "Amazon",
  "role": "SDE-2",
  "status": "INTERVIEW",
  "appliedDate": "2024-04-02",
  "notes": "First round scheduled for April 20"
}
```

---

## 8. Delete Application

### Delete an Application
```bash
curl -X DELETE http://localhost:8080/applications/5 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

**Expected Response:**
```json
{
  "message": "Application deleted successfully"
}
```

---

## 9. Get Dashboard Statistics

### Fetch Stats
```bash
curl -X GET http://localhost:8080/applications/stats \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

**Expected Response:**
```json
{
  "totalApplications": 4,
  "interviews": 1,
  "offers": 1,
  "rejections": 1
}
```

---

## Error Responses

### 401 Unauthorized (Invalid/Missing Token)
```json
{
  "message": "Invalid or expired token"
}
```

### 400 Bad Request (Validation Error)
```json
{
  "message": "Company name is required"
}
```

### 404 Not Found
```json
{
  "message": "Application not found or unauthorized"
}
```

---

## Quick Test Script

Save this as `test_api.sh`:

```bash
#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "=== Job Application Tracker API Tests ==="

# Login
echo -e "\n${GREEN}1. Testing Login...${NC}"
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "password123"
  }')

echo $LOGIN_RESPONSE | jq .

TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
echo -e "\n${GREEN}Token: $TOKEN${NC}"

# Get Applications
echo -e "\n${GREEN}2. Testing Get All Applications...${NC}"
curl -s -X GET http://localhost:8080/applications \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" | jq .

# Get Stats
echo -e "\n${GREEN}3. Testing Get Stats...${NC}"
curl -s -X GET http://localhost:8080/applications/stats \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" | jq .

# Create Application
echo -e "\n${GREEN}4. Testing Create Application...${NC}"
curl -s -X POST http://localhost:8080/applications \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Test Company",
    "role": "Test Role",
    "status": "APPLIED",
    "appliedDate": "2024-04-12",
    "notes": "Test notes"
  }' | jq .

echo -e "\n${GREEN}Tests completed!${NC}"
```

Run with:
```bash
chmod +x test_api.sh
./test_api.sh
```

---

## Testing with Postman

1. Import collection or create manually:
   - Base URL: `http://localhost:8080`
   - Add Authorization header: `Bearer {token}`

2. Create requests for each endpoint

3. Save response tokens for subsequent requests

---

## Testing with Insomnia

1. Create new workspace
2. Add environment variable: `base_url = http://localhost:8080`
3. Create requests using template syntax: `{{ base_url }}/auth/login`
4. Store token in environment from response

---

## Performance Testing

### Load test with Apache Bench
```bash
ab -n 1000 -c 10 -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/applications
```

### Load test with wrk
```bash
wrk -t4 -c100 -d30s \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/applications
```

---

## Notes

- Replace `$TOKEN` with actual token from login response
- All endpoints require valid JWT token (except /auth/register and /auth/login)
- Dates must be in YYYY-MM-DD format
- Status must be one of: APPLIED, INTERVIEW, OFFER, REJECTED
- Modify IDs (1, 2, 5 etc.) based on actual data in your database
