# website-hotel

Hotel Management System - Modern Web Frontend built with React, Vite, and Tailwind CSS.

## Features
- **Dashboard & Analytics:** Overview of bookings, revenues, occupancy rates, and recent activities.
- **Reservation & Booking Management:** Room availability checking, new reservation creation, and check-in/check-out flows.
- **Room & Housekeeping Management:** Real-time room status tracking, room type administration, and housekeeping schedule.
- **Billing & Invoicing:** Detailed invoices, payment tracking, and receipt generation.
- **Inventory & Maintenance:** Asset monitoring, maintenance ticketing, and stock level controls.
- **Role-Based Access Control:** Secure portal with JWT authentication for Admins, Managers, Receptionists, and Staff.

## Tech Stack
- **Framework:** React 19 + Vite
- **Routing:** React Router v7
- **UI & Icons:** Lucide React, Tailwind CSS
- **Data Visualization:** Recharts
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/krushisathiai/website-hotel.git
   cd website-hotel
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Ensure `VITE_API_URL` points to your backend API (default: `http://localhost:5000/api`).

4. Start development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```
