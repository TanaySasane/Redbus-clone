# 🚌 redBus Clone — Full Stack Bus Booking Platform

A full-stack clone of the [redBus](https://www.redbus.in) bus ticketing platform built with **React**, **Node.js**, **Express**, and **MongoDB**.

---

## 🔗 Live Demo

> Run locally — see setup instructions below.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 17, Redux, React Router DOM, Material UI |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Payments | Stripe |
| Styling | CSS Modules, Montserrat font |
| Auth | Google OAuth + Local email/password |

---

## ✨ Features

### 🏠 Landing Page
- Hero banner with animated search form
- City autocomplete — type a letter and matching cities appear instantly
- Date validation (DD/MM/YYYY format, no past dates, max 3 months ahead)
- Coupon section, Safety+ program, Bus Tracker, Services, Awards

### 🎫 Bus Booking Flow
- Search buses by source, destination, and date
- Filter by bus type (AC Sleeper, AC Seater, Non-AC, Sleeper)
- Sort by departure time, arrival time, ratings, price
- Seat selection with visual seat map
- Passenger details form with validation
- Payment page with Stripe integration

### 🚌 Bus Hire
- Journey type selection (Outstation / Local / Airport)
- Full booking form with city autocomplete and validation
- Dynamic vehicle listing with real-time pricing based on distance × passengers
- Filter and sort vehicles by type, price, rating, capacity
- Detailed vehicle page with tabs (Overview, Amenities, Policies, Reviews)
- Dynamic fare breakup (base fare + driver allowance + GST)

### 🏙️ Cities Page
- 12 popular routes with one-click search
- 20+ city cards — click any city to search buses

### 🔐 Authentication
- Local login (email + password)
- Google OAuth login
- Protected routes

**Demo credentials:**
- User: any email + 6+ char password
- Admin: `admin@redbus.com` / `admin123`

### 👑 Admin Panel
- Dashboard with stats (bookings, routes, users, revenue)
- Manage cities (add, search, delete)
- Quick navigation to all sections

### 📄 Static Pages
- About Us, Careers (with job listings), Blog (with full articles)
- Contact Us (working form with validation)
- Help Center (searchable topics)
- FAQ (categorized with search)
- Terms & Conditions, Privacy Policy, Cookie Policy

### 🦶 Footer
- All links working and pointing to real pages
- Scroll-to-top on every navigation
- Developer credit

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

```bash
cd back-end-redbus
npm install
```

Create a `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=3020
```

Start the server:
```bash
npm start
```

### Frontend Setup

```bash
cd front-end-redbus
npm install
```

Update `.env`:
```env
REACT_APP_BACKEND_URL=http://localhost:3020
```

Start the app:
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
redbus/
├── back-end-redbus/          # Express + MongoDB API
│   ├── controllers/          # Route handlers
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API routes
│   ├── app.js                # Entry point
│   └── seed.js               # Database seeder
│
└── front-end-redbus/         # React application
    └── src/
        ├── Components/       # All UI components
        │   ├── Auth/         # Login, Register
        │   ├── Admin/        # Admin dashboard
        │   ├── Cities/       # Cities explorer
        │   ├── LandingPage/  # Home page sections
        │   ├── BusDetails/   # Seat selection, bus cards
        │   ├── BusServiceSection/ # Bus hire flow
        │   └── StaticPages/  # About, FAQ, Blog, etc.
        ├── Redux/            # State management
        ├── Routes/           # React Router config
        └── data/             # Mock data (offline fallback)
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/v1/api/routes` | Get all routes |
| GET | `/v1/api/routes/:dep/:arr/:date` | Get buses for a route |
| POST | `/v1/api/booking` | Create a booking |
| GET | `/v1/api/customers` | Get all customers |
| POST | `/v1/api/customers` | Create a customer |
| GET | `/v1/api/busservice` | Get all hire vehicles |
| GET | `/v1/api/busservice/:id` | Get vehicle by ID |
| POST | `/v1/api/bookingHire` | Create a hire booking |

---

## 📸 Screenshots

| Page | Description |
|---|---|
| Home | Hero banner with search |
| Select Bus | Bus listing with filters |
| Bus Hire | Vehicle selection with pricing |
| Admin | Dashboard with stats |
| Cities | Route explorer |

---

## 👨‍💻 Developer

**Tanay Sasane**

Built with ❤️ as a full-stack portfolio project.

---

## 📝 License

This project is for educational purposes only. redBus is a trademark of ibibo Group.
