# DriveEase Car Rental Website

DriveEase is a complete, modern, and fully responsive Car Rental Web Application built with HTML5, CSS3, JavaScript (ES6+), and Bootstrap 5.

## 🚀 Key Features

- **Modern Dark-Navy & Amber Design**: High contrast, glassmorphic accents, custom typography, subtle micro-animations, and polished card hover effects.
- **Responsive Layout**: Optimized for Mobile, Tablet, Laptop, and Desktop screens using Bootstrap 5 Grid System.
- **Home Page (`index.html`)**:
  - Sticky responsive navigation with active link highlighting.
  - Hero banner with quick vehicle search overlay form.
  - Featured fleet cards grid (6 vehicles).
  - Why Choose Us (4 benefit cards).
  - 3-step How It Works guide.
  - Real-time achievement statistics counter.
  - Testimonial reviews cards.
  - Call to Action banner & detailed footer.
- **Fleet Catalog (`cars.html`)**:
  - Sidebar filter panel: Search keyword, Category selector, Maximum daily rate slider, Transmission, and Fuel type.
  - Live JavaScript filtering engine with dynamic count badge and fallback "no vehicles found" state.
  - Reset filters button.
- **Vehicle Reservation (`car-details.html`)**:
  - Dynamic vehicle rendering based on URL parameters (`?id=X`).
  - High-res image gallery, rating, daily rate, and specification grid.
  - Interactive live price calculator (calculates rental duration in days and optional extras such as GPS, child seat, additional driver, and collision waiver).
  - Validation booking form with Bootstrap Modal confirmation pop-up.
  - Related vehicle recommendations.
- **About Us Page (`about.html`)**:
  - Story & company history, core mission & values, achievements, leadership team cards with photos.
- **Contact Us Page (`contact.html`)**:
  - Contact details cards, interactive contact form with success alert feedback, interactive Google Map location frame, and Bootstrap 5 FAQ accordion.

---

## 🛠️ Technology Stack

- **HTML5**: Semantic tags, accessible structure.
- **CSS3**: CSS Custom Variables (`--navy-dark`, `--accent-yellow`, etc.), custom animations, glassmorphic overlays.
- **JavaScript (Vanilla ES6)**: Object arrays, event listeners, array filtering, live math calculation, URL param handling, form validation.
- **Bootstrap 5.3**: Layout container grid, navbar, card utilities, modal dialogs, and accordion components.
- **Font Awesome 6**: Vector icons for specs and features.
- **Google Fonts**: *Plus Jakarta Sans* font family.

---

## 💻 How to Run Locally

1. Clone or download the repository files to your computer.
2. Ensure the directory structure matches:
   ```text
   driveease-car-rental/
   ├── index.html
   ├── cars.html
   ├── car-details.html
   ├── about.html
   ├── contact.html
   ├── css/
   │   └── style.css
   ├── js/
   │   └── script.js
   └── README.md
   ```
3. Double click on `index.html` (or right click -> Open with Google Chrome / Microsoft Edge / Firefox / Safari).
4. No Node.js, npm install, PHP, database, or local server build step is required!

---

&copy; 2026 DriveEase Car Rental. All rights reserved.
