# Research API Specification

**Base URL:** `http://localhost:5000`

---

## Authentication

Admin endpoints require JWT token in headers:
```
bearer: YOUR_JWT_TOKEN
```

---

## Public Endpoints

### 1. Get All Research (Published)

| Property | Value |
|----------|-------|
| **Method** | `GET` |
| **URL** | `/api/v1/research` |
| **Auth** | ❌ Not Required |

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category` | string | No | Filter by category |
| `search` | string | No | Search in title (case-insensitive) |
| `page` | number | No | Page number (default: 1) |
| `limit` | number | No | Items per page (default: 10) |

**Example Request:**
```
GET /api/v1/research?category=AI&search=machine&page=1&limit=10
```

**Success Response (200):**
```json
{
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789012345",
      "title": "Machine Learning Research",
      "slug": "machine-learning-research",
      "description": "Research paper about ML algorithms",
      "category": "AI",
      "pdf_url": "https://res.cloudinary.com/.../paper.pdf",
      "status": "published",
      "createdAt": "2026-01-06T03:00:00.000Z",
      "updatedAt": "2026-01-06T03:00:00.000Z"
    }
  ],
  "pagination": {
    "totalDocuments": 25,
    "totalPages": 3,
    "currentPage": 1,
    "limit": 10
  }
}
```

---

### 2. Get Research Detail by Slug

| Property | Value |
|----------|-------|
| **Method** | `GET` |
| **URL** | `/api/v1/research/:slug` |
| **Auth** | ❌ Not Required |

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `slug` | string | URL-friendly slug of the research |

**Example Request:**
```
GET /api/v1/research/machine-learning-research
```

**Success Response (200):**
```json
{
  "_id": "64a1b2c3d4e5f6789012345",
  "title": "Machine Learning Research",
  "slug": "machine-learning-research",
  "description": "Full description with markdown/HTML content...",
  "category": "AI",
  "pdf_url": "https://res.cloudinary.com/.../paper.pdf",
  "cloudinary_public_id": "research_papers/abc123",
  "status": "published",
  "createdAt": "2026-01-06T03:00:00.000Z",
  "updatedAt": "2026-01-06T03:00:00.000Z"
}
```

**Error Response (404):**
```json
{
  "message": "Research not found"
}
```

---

### 3. Get All Categories

| Property | Value |
|----------|-------|
| **Method** | `GET` |
| **URL** | `/api/v1/categories` |
| **Auth** | ❌ Not Required |

**Example Request:**
```
GET /api/v1/categories
```

**Success Response (200):**
```json
["AI", "Data Science", "Blockchain", "IoT"]
```

---

## Admin Endpoints (Protected)

### 4. Get All Research (Admin)

| Property | Value |
|----------|-------|
| **Method** | `GET` |
| **URL** | `/api/v1/admin/research` |
| **Auth** | ✅ Required |

**Headers:**
```
bearer: YOUR_JWT_TOKEN
```

**Success Response (200):**
```json
[
  {
    "_id": "64a1b2c3d4e5f6789012345",
    "title": "Draft Research",
    "slug": "draft-research",
    "description": "...",
    "category": "AI",
    "pdf_url": "...",
    "status": "draft",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

---

### 5. Create Research

| Property | Value |
|----------|-------|
| **Method** | `POST` |
| **URL** | `/api/v1/admin/research` |
| **Auth** | ✅ Required |
| **Content-Type** | `multipart/form-data` |

**Headers:**
```
bearer: YOUR_JWT_TOKEN
```

**Form Data:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ Yes | Research title |
| `description` | string | ✅ Yes | Full description (Markdown/HTML) |
| `category` | string | ✅ Yes | Category name |
| `status` | string | No | `draft` or `published` (default: draft) |
| `file` | file | No | PDF file to upload |

**Success Response (201):**
```json
{
  "message": "Research created successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6789012345",
    "title": "New Research Paper",
    "slug": "new-research-paper",
    "description": "...",
    "category": "AI",
    "pdf_url": "https://res.cloudinary.com/.../paper.pdf",
    "cloudinary_public_id": "research_papers/abc123",
    "status": "draft",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Error Response (400):**
```json
{
  "message": "Title, description, and category are required"
}
```

---

### 6. Update Research

| Property | Value |
|----------|-------|
| **Method** | `PUT` |
| **URL** | `/api/v1/admin/research/:id` |
| **Auth** | ✅ Required |
| **Content-Type** | `multipart/form-data` |

**Headers:**
```
bearer: YOUR_JWT_TOKEN
```

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | MongoDB ObjectId |

**Form Data (all optional):**

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | New title (slug will be regenerated) |
| `description` | string | New description |
| `category` | string | New category |
| `status` | string | `draft` or `published` |
| `file` | file | New PDF file (old file will be deleted from Cloudinary) |

**Success Response (200):**
```json
{
  "message": "Research updated successfully",
  "data": { ... }
}
```

---

### 7. Delete Research

| Property | Value |
|----------|-------|
| **Method** | `DELETE` |
| **URL** | `/api/v1/admin/research/:id` |
| **Auth** | ✅ Required |

**Headers:**
```
bearer: YOUR_JWT_TOKEN
```

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | MongoDB ObjectId |

**Success Response (200):**
```json
{
  "message": "Research and associated file deleted successfully"
}
```

> [!IMPORTANT]
> Deleting a research will also remove the PDF file from Cloudinary storage.

---

## Category Management

### 8. Get All Categories (Public)

| Property | Value |
|----------|-------|
| **Method** | `GET` |
| **URL** | `/api/v1/categories` |
| **Auth** | ❌ Not Required |

**Success Response (200):**
```json
["Computer Science", "Physics", "Biology"]
```

> [!NOTE]
> This endpoint now fetches from the Category database collection.

---

### 9. Get All Categories (Admin)

| Property | Value |
|----------|-------|
| **Method** | `GET` |
| **URL** | `/api/v1/admin/categories` |
| **Auth** | ✅ Required |

**Headers:**
```
bearer: YOUR_JWT_TOKEN
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64abc123...",
      "name": "Computer Science",
      "slug": "computer-science",
      "description": "Papers related to CS topics",
      "researchCount": 12,
      "createdAt": "2026-01-01T00:00:00Z",
      "updatedAt": "2026-01-05T00:00:00Z"
    }
  ]
}
```

---

### 10. Create Category

| Property | Value |
|----------|-------|
| **Method** | `POST` |
| **URL** | `/api/v1/admin/categories` |
| **Auth** | ✅ Required |
| **Content-Type** | `application/json` |

**Headers:**
```
bearer: YOUR_JWT_TOKEN
```

**Request Body:**
```json
{
  "name": "Machine Learning",
  "description": "AI and ML research papers"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "_id": "64xyz789...",
    "name": "Machine Learning",
    "slug": "machine-learning",
    "description": "AI and ML research papers",
    "researchCount": 0,
    "createdAt": "2026-01-06T12:00:00Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Category with this name already exists"
}
```

---

### 11. Update Category

| Property | Value |
|----------|-------|
| **Method** | `PUT` |
| **URL** | `/api/v1/admin/categories/:id` |
| **Auth** | ✅ Required |

**Request Body:**
```json
{
  "name": "Machine Learning & AI",
  "description": "Updated description"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Category updated successfully",
  "data": { ... }
}
```

---

### 12. Delete Category

| Property | Value |
|----------|-------|
| **Method** | `DELETE` |
| **URL** | `/api/v1/admin/categories/:id` |
| **Auth** | ✅ Required |

**Success Response (200):**
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

**Error Response (400) - Category in use:**
```json
{
  "success": false,
  "message": "Cannot delete category. 5 research papers are using this category."
}
```

---

## Activity Logging

### 13. Get Activity Logs

| Property | Value |
|----------|-------|
| **Method** | `GET` |
| **URL** | `/api/v1/admin/activity-logs` |
| **Auth** | ✅ Required |

**Headers:**
```
bearer: YOUR_JWT_TOKEN
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | number | No | Page number (default: 1) |
| `limit` | number | No | Items per page (default: 20) |
| `action` | string | No | Filter by: create, update, delete |
| `targetType` | string | No | Filter by: research, category |
| `startDate` | ISO date | No | Filter from date |
| `endDate` | ISO date | No | Filter to date |

**Example Request:**
```
GET /api/v1/admin/activity-logs?page=1&limit=20&action=create&targetType=research
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64log001...",
      "action": "create",
      "targetType": "research",
      "targetId": "64abc123...",
      "targetTitle": "Machine Learning in Healthcare",
      "userName": "Admin",
      "details": {
        "category": "Computer Science",
        "status": "published"
      },
      "ipAddress": "192.168.1.1",
      "createdAt": "2026-01-06T12:30:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalDocuments": 100,
    "limit": 20
  }
}
```

---

## Error Responses

All error responses follow this format:
```json
{
  "message": "Error description",
  "error": "Detailed error message (optional)"
}
```

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request - Missing required fields |
| 401 | Unauthorized - Invalid or missing token |
| 404 | Not Found - Research doesn't exist |
| 500 | Internal Server Error |

---

## Data Types

### Research Object

```typescript
interface Research {
  _id: string;            // MongoDB ObjectId
  title: string;          // Research title
  slug: string;           // URL-friendly slug (auto-generated)
  description: string;    // Full description (Markdown/HTML)
  category: string;       // Category name
  pdf_url: string;        // Cloudinary PDF URL
  cloudinary_public_id: string;  // For file management
  status: "draft" | "published";
  createdAt: string;      // ISO date string
  updatedAt: string;      // ISO date string
}
```

### Category Object

```typescript
interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  researchCount: number;
  createdAt: string;
  updatedAt: string;
}
```

### ActivityLog Object

```typescript
interface ActivityLog {
  _id: string;
  action: "create" | "update" | "delete" | "login" | "logout";
  targetType: "research" | "category" | "user" | "auth";
  targetId: string | null;
  targetTitle: string;
  userId: string;
  userName: string;
  details: object;
  ipAddress: string;
  createdAt: string;
}
```
