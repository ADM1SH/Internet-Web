# Internet-Web
# 🏸 Sports Court Booking System (CIT4224 Project)

**Course:** CIT4224 Internet and Web Publishing
**Term:** 2530
**Submission Deadline:** Feb 8, 2026

## 📋 Project Objective
To design and build a complete client-side website for a local sports facility. This system allows users to view courts (Futsal, Badminton, Tennis), register as members, and book slots, while administrators can manage staff, facilities, and bookings.

## 👥 Team Members

### 1. The "Front Desk" (Public Access) - **Adam**
**Focus:** Welcoming users and registration.
- **index.html**: Welcome banner, court photos, and promos.
- **about.html**: Facility info, opening hours, and rules.
- **contact.html**: Google Map location and inquiry form.
- **login.html**: Entry gate for customers.

### 2. The "Player Experience" (Booking Flow) - **Dani**
**Focus:** Customer-facing pages for finding courts.
- **user-dashboard.html**: Post-login landing page with quick actions.
- **courts.html**: List of all available facilities with prices.
- **Court Details**: Specific info and images for Futsal and Badminton courts.

### 3. The "Transaction" & "Admin Entry" - **Muaz**
**Focus:** Booking confirmation and payments.
- **booking.html**: Final summary form to verify date/time.
- **payment.html**: Mock payment form (Credit Card/QR Pay).
- **Feedback**: Form for users to rate courts after their game.

### 4. The "Facility Manager" (Admin System) - **Syahrin**
**Focus:** Managing system data and staff.
- **admin.html**: Main dashboard for facility managers with quick stats.
- **manage-staff.html**: Interface to manage receptionists and maintenance crew.
- **Manage Players/Facilities**: Tools to update member details and facility prices.
- **Manage Bookings**: Master schedule for all court rentals.

---

## 📂 File Structure (Proposed)
Please keep all HTML files in the **root** folder (main folder) so links work correctly. Do not put HTML files inside personal folders.

```text
/css/           -> Global styles (style.css)
/images/        -> All images (courts, icons, logos)
/js/            -> Global scripts (script.js)
index.html      -> Main Home Page
login.html      -> User Login
courts.html     -> List of Facilities
booking.html    -> Booking Form
admin.html      -> Admin Dashboard
... (and 15+ other pages)