
# FixItNow
#### FixItNow — Home Service Marketplace Backend API

Backend REST API for a home services marketplace — customers book verified technicians for plumbing, electrical, cleaning, painting, and more.

---

## Overview

FixItNow connects three types of users:

- **Customers** — browse services, book technicians, pay online, leave reviews
- **Technicians** — manage profile, availability, and bookings
- **Admins** — moderate users, bookings, and service categories

---

## Features

### Public
- Browse all available services and technicians
- Search and filter by service type, location, rating, and price
- View technician profiles with reviews

### Customer
- Register / Login
- Book a technician for a specific service and time slot
- Make payments via **SSLCommerz** after a booking is accepted
- View payment history and status
- Track booking status
- Leave a review after job completion
- Manage own profile

### Technician
- Register / Login
- Create and update service profile (skills, experience, pricing)
- Set availability time slots
- View, accept, or decline incoming bookings
- Mark jobs as in-progress or completed

### Admin
- View all users (customers and technicians)
- Ban / unban users
- View all bookings
- Manage service categories

---


## Database Schema

| Table | Purpose | Key Relations |
|---|---|---|
| **Users** | All accounts (customer/technician/admin) | — |
| **TechnicianProfiles** | Bio, skills, rate, availability | 1:1 with Users |
| **Categories** | Service types (Plumbing, Cleaning...) | 1:M with Services |
| **Services** | Specific offers by a technician | M:1 Technician, M:1 Category |
| **Bookings** | Job requests between customer & technician | M:1 Customer, M:1 Technician, M:1 Service |
| **Payments** | SSLCommerz transactions | 1:1 with Bookings |
| **Reviews** | Customer feedback | 1:1 with Bookings |

---

## Environment Variables

```env
PORT=5000
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=7d

SSLCOMMERZ_STORE_ID=
SSLCOMMERZ_STORE_PASSWORD=
SSLCOMMERZ_IS_LIVE=false
SSLCOMMERZ_SUCCESS_URL=
SSLCOMMERZ_FAIL_URL=
SSLCOMMERZ_CANCEL_URL=
```

---

## Setup

```bash
git clone <repo-url>
cd fixitnow-backend
npm install
cp .env.example .env   # fill in your values
npm run dev
```

---

## API Endpoints

### Auth
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Authenticated |

### Services & Technicians
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/services` | Public |
| GET | `/api/technicians` | Public |
| GET | `/api/technicians/:id` | Public |
| GET | `/api/categories` | Public |

### Bookings
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/bookings` | Customer |
| GET | `/api/bookings` | Customer |
| GET | `/api/bookings/:id` | Owner / Admin |

### Payments (SSLCommerz)
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/payments/create` | Customer |
| POST | `/api/payments/confirm` | SSLCommerz callback |
| GET | `/api/payments` | Customer |
| GET | `/api/payments/:id` | Customer |

### Technician
| Method | Endpoint | Access |
|---|---|---|
| PUT | `/api/technician/profile` | Technician |
| PUT | `/api/technician/availability` | Technician |
| GET | `/api/technician/bookings` | Technician |
| PATCH | `/api/technician/bookings/:id` | Technician |

### Reviews
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/reviews` | Customer |

### Admin
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/admin/users` | Admin |
| PATCH | `/api/admin/users/:id` | Admin |
| GET | `/api/admin/bookings` | Admin |
| GET | `/api/admin/categories` | Admin |
| POST | `/api/admin/categories` | Admin |

---

## Booking Status Flow

```
REQUESTED → ACCEPTED → PAID → IN_PROGRESS → COMPLETED
         → DECLINED
```
Customers may cancel any time before `IN_PROGRESS`.

---

## Payment Flow (SSLCommerz)

1. Booking is `accepted` by the technician
2. Customer calls `POST /payments/create` → SSLCommerz session created, `Payments` row set to `pending`
3. Customer completes payment on the SSLCommerz gateway
4. SSLCommerz calls `POST /payments/confirm` (IPN) → transaction verified via SSLCommerz Validation API
5. On success: `Payments → completed`, `Booking → paid`

---

## Develop By 

#### Siam Ahamed
