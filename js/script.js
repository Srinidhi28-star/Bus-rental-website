/* ==========================================================================
   DriveEase Car Rental - Core JavaScript File
   Handles: Car Data, Dynamic Grid Rendering, Filter Engine, Booking Calculator,
   Form Validation, Active Navbar Highlighting, & Interactive UI components.
   ========================================================================== */

// 1. Vehicle Master Dataset (9+ Detailed Car Objects)
const carsData = [
  {
    id: 1,
    name: "Mercedes-Benz E-Class",
    category: "Luxury",
    price: 135,
    passenger: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    doors: 4,
    luggage: 3,
    mileage: "Unlimited",
    airConditioning: true,
    rating: 4.9,
    reviewsCount: 54,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
    description: "Experience absolute refinement and cutting-edge technology with the Mercedes-Benz E-Class. Boasting a quiet, high-tech interior, plush leather seating, and effortless power output."
  },
  {
    id: 2,
    name: "Range Rover Sport HSE",
    category: "SUV",
    price: 165,
    passenger: 7,
    transmission: "Automatic",
    fuel: "Diesel",
    doors: 5,
    luggage: 5,
    mileage: "Unlimited",
    airConditioning: true,
    rating: 4.95,
    reviewsCount: 82,
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
    description: "Command the road with ultimate confidence and luxury. The Range Rover Sport blends supreme off-road capability with executive-class interior comfort for family trips or executive travel."
  },
  {
    id: 3,
    name: "Tesla Model 3 Performance",
    category: "Electric",
    price: 110,
    passenger: 5,
    transmission: "Automatic",
    fuel: "Electric",
    doors: 4,
    luggage: 3,
    mileage: "315 miles/charge",
    airConditioning: true,
    rating: 4.85,
    reviewsCount: 96,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80",
    description: "Drive into the future with zero emissions and instant electric torque. Features Tesla's minimalist touchscreen display, premium audio system, and advanced driver assistance."
  },
  {
    id: 4,
    name: "Porsche 911 Carrera Cabriolet",
    category: "Convertible",
    price: 240,
    passenger: 2,
    transmission: "Automatic",
    fuel: "Petrol",
    doors: 2,
    luggage: 2,
    mileage: "200 miles/day",
    airConditioning: true,
    rating: 5.0,
    reviewsCount: 41,
    image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80",
    description: "Unleash exhilarating sports car performance with top-down freedom. Iconic engineering meets precise responsive handling for an unforgettable drive along coastal highways."
  },
  {
    id: 5,
    name: "BMW 7 Series Executive",
    category: "Luxury",
    price: 195,
    passenger: 5,
    transmission: "Automatic",
    fuel: "Hybrid",
    doors: 4,
    luggage: 4,
    mileage: "Unlimited",
    airConditioning: true,
    rating: 4.92,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    description: "The pinnacle of executive luxury. Offering rear-seat massagers, ambient lighting, high-fidelity sound, and smooth hybrid propulsion for VIP transportation."
  },
  {
    id: 6,
    name: "Audi Q7 Quattro",
    category: "SUV",
    price: 145,
    passenger: 7,
    transmission: "Automatic",
    fuel: "Diesel",
    doors: 5,
    luggage: 4,
    mileage: "Unlimited",
    airConditioning: true,
    rating: 4.8,
    reviewsCount: 63,
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80",
    description: "Versatile 7-seater luxury SUV equipped with Audi's legendary Quattro all-wheel drive, virtual cockpit, and comprehensive safety systems for smooth mountain or city road trips."
  },
  {
    id: 7,
    name: "Volkswagen Golf R",
    category: "Economy",
    price: 65,
    passenger: 5,
    transmission: "Manual",
    fuel: "Petrol",
    doors: 4,
    luggage: 3,
    mileage: "Unlimited",
    airConditioning: true,
    rating: 4.75,
    reviewsCount: 110,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    description: "Compact, efficient, and fun to drive. High fuel economy combined with modern smartphone integration and easy city parking."
  },
  {
    id: 8,
    name: "Ford Mustang GT V8",
    category: "Convertible",
    price: 155,
    passenger: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    doors: 2,
    luggage: 2,
    mileage: "250 miles/day",
    airConditioning: true,
    rating: 4.88,
    reviewsCount: 77,
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    description: "Classic American muscle car experience powered by a roaring 5.0L V8 engine. Premium leather interior and aggressive aerodynamic styling."
  },
  {
    id: 9,
    name: "Porsche Taycan Cross Turismo",
    category: "Electric",
    price: 220,
    passenger: 5,
    transmission: "Automatic",
    fuel: "Electric",
    doors: 4,
    luggage: 4,
    mileage: "280 miles/charge",
    airConditioning: true,
    rating: 4.98,
    reviewsCount: 29,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
    description: "All-electric performance wagon combining sports car acceleration with expanded cargo space and whisper-quiet high-speed cruising."
  }
];

// Helper: Generate HTML for a Car Card
function generateCarCardHTML(car) {
  return `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="car-card">
        <div class="car-card-img-wrapper">
          <img src="${car.image}" alt="${car.name}" class="car-card-img" loading="lazy">
          <span class="car-category-badge">${car.category}</span>
          <div class="car-price-badge">₹${car.price} <span>/ day</span></div>
        </div>
        <div class="car-card-body">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h3 class="car-title mb-0">${car.name}</h3>
          </div>
          <div class="mb-2 text-warning font-size-sm">
            <i class="fas fa-star"></i> <span class="fw-bold text-dark me-1">${car.rating}</span> <span class="text-muted">(${car.reviewsCount} reviews)</span>
          </div>
          <div class="car-specs-grid">
            <div class="spec-item"><i class="fas fa-user-friends"></i> ${car.passenger} Seats</div>
            <div class="spec-item"><i class="fas fa-cog"></i> ${car.transmission}</div>
            <div class="spec-item"><i class="fas fa-gas-pump"></i> ${car.fuel}</div>
          </div>
          <div class="car-card-footer mt-3 d-flex justify-content-between align-items-center">
            <span class="text-success fw-semibold font-size-sm"><i class="fas fa-check-circle me-1"></i> Available</span>
            <a href="car-details.html?id=${car.id}" class="btn btn-accent btn-sm">View Details <i class="fas fa-arrow-right ms-1"></i></a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 2. DOM Ready Initialization
document.addEventListener("DOMContentLoaded", () => {
  setupNavbarActiveLink();
  setupNavbarScrollEffect();

  // Page Specific Handlers
  if (document.getElementById("featuredCarsContainer")) {
    renderFeaturedCars();
    setupHeroSearchForm();
  }

  if (document.getElementById("carsGridContainer")) {
    initCarsPage();
  }

  if (document.getElementById("carDetailSection")) {
    initCarDetailPage();
  }

  if (document.getElementById("contactForm")) {
    setupContactForm();
  }
});

// 3. Navbar Active Link Highlighting
function setupNavbarActiveLink() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".navbar-custom .nav-link");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// 4. Navbar Sticky Scroll Effect
function setupNavbarScrollEffect() {
  const navbar = document.querySelector(".navbar-custom");
  if (!navbar) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// 5. Featured Cars Rendering (Home Page)
function renderFeaturedCars() {
  const container = document.getElementById("featuredCarsContainer");
  if (!container) return;

  const featuredList = carsData.slice(0, 6);
  container.innerHTML = featuredList.map(generateCarCardHTML).join("");
}

// 6. Home Page Quick Search Form Handler
function setupHeroSearchForm() {
  const form = document.getElementById("heroSearchForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = document.getElementById("pickupLocation")?.value || "";
    const pickupDate = document.getElementById("pickupDate")?.value || "";
    const returnDate = document.getElementById("returnDate")?.value || "";

    // Redirect to cars.html with search parameters
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (pickupDate) params.append("pickup", pickupDate);
    if (returnDate) params.append("return", returnDate);

    window.location.href = `cars.html?${params.toString()}`;
  });
}

// 7. Cars Listing Page Filter System
function initCarsPage() {
  const container = document.getElementById("carsGridContainer");
  const searchInput = document.getElementById("filterSearch");
  const categorySelect = document.getElementById("filterCategory");
  const transmissionSelect = document.getElementById("filterTransmission");
  const fuelSelect = document.getElementById("filterFuel");
  const priceRange = document.getElementById("filterPrice");
  const priceDisplay = document.getElementById("priceDisplay");
  const resetBtn = document.getElementById("resetFiltersBtn");
  const carsCountBadge = document.getElementById("carsCountBadge");

  // Read URL query param if user came from home search
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get("category");
  if (initialCategory && categorySelect) {
    categorySelect.value = initialCategory;
  }

  function applyFilters() {
    const searchVal = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const catVal = categorySelect ? categorySelect.value : "All";
    const transVal = transmissionSelect ? transmissionSelect.value : "All";
    const fuelVal = fuelSelect ? fuelSelect.value : "All";
    const maxPrice = priceRange ? parseFloat(priceRange.value) : 300;

    if (priceDisplay && priceRange) {
      priceDisplay.textContent = `₹${priceRange.value}`;
    }

    const filtered = carsData.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchVal) || car.category.toLowerCase().includes(searchVal);
      const matchesCat = catVal === "All" || car.category === catVal;
      const matchesTrans = transVal === "All" || car.transmission === transVal;
      const matchesFuel = fuelVal === "All" || car.fuel === fuelVal;
      const matchesPrice = car.price <= maxPrice;

      return matchesSearch && matchesCat && matchesTrans && matchesFuel && matchesPrice;
    });

    if (carsCountBadge) {
      carsCountBadge.textContent = `${filtered.length} Vehicles Available`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="py-4">
            <i class="fas fa-car-side fa-4x text-muted mb-3 opacity-50"></i>
            <h4 class="fw-bold">No matching vehicles found</h4>
            <p class="text-muted">Try adjusting your filters or search keywords to find available options.</p>
            <button class="btn btn-navy mt-2" onclick="resetAllFilters()">Reset All Filters</button>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = filtered.map(generateCarCardHTML).join("");
    }
  }

  window.resetAllFilters = function() {
    if (searchInput) searchInput.value = "";
    if (categorySelect) categorySelect.value = "All";
    if (transmissionSelect) transmissionSelect.value = "All";
    if (fuelSelect) fuelSelect.value = "All";
    if (priceRange) priceRange.value = 300;
    applyFilters();
  };

  // Event Listeners
  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (categorySelect) categorySelect.addEventListener("change", applyFilters);
  if (transmissionSelect) transmissionSelect.addEventListener("change", applyFilters);
  if (fuelSelect) fuelSelect.addEventListener("change", applyFilters);
  if (priceRange) priceRange.addEventListener("input", applyFilters);
  if (resetBtn) resetBtn.addEventListener("click", window.resetAllFilters);

  // Initial render
  applyFilters();
}

// 8. Car Details & Live Booking Calculator Page
function initCarDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const carId = parseInt(urlParams.get("id")) || 1;
  const car = carsData.find(c => c.id === carId) || carsData[0];

  // Render Car Info
  const nameEl = document.getElementById("detailCarName");
  const catEl = document.getElementById("detailCarCategory");
  const priceEl = document.getElementById("detailCarPrice");
  const ratingEl = document.getElementById("detailCarRating");
  const reviewsEl = document.getElementById("detailCarReviews");
  const imgEl = document.getElementById("detailCarImg");
  const descEl = document.getElementById("detailCarDescription");

  const seatsEl = document.getElementById("detailSeats");
  const transEl = document.getElementById("detailTrans");
  const fuelEl = document.getElementById("detailFuel");
  const doorsEl = document.getElementById("detailDoors");
  const luggageEl = document.getElementById("detailLuggage");
  const mileageEl = document.getElementById("detailMileage");

  if (nameEl) nameEl.textContent = car.name;
  if (catEl) catEl.textContent = car.category;
  if (priceEl) priceEl.textContent = `₹${car.price}`;
  if (ratingEl) ratingEl.textContent = car.rating;
  if (reviewsEl) reviewsEl.textContent = `(${car.reviewsCount} customer reviews)`;
  if (imgEl) {
    imgEl.src = car.image;
    imgEl.alt = car.name;
  }
  if (descEl) descEl.textContent = car.description;

  if (seatsEl) seatsEl.textContent = `${car.passenger} Seats`;
  if (transEl) transEl.textContent = car.transmission;
  if (fuelEl) fuelEl.textContent = car.fuel;
  if (doorsEl) doorsEl.textContent = `${car.doors} Doors`;
  if (luggageEl) luggageEl.textContent = `${car.luggage} Bags`;
  if (mileageEl) mileageEl.textContent = car.mileage;

  // Render Related Cars
  const relatedContainer = document.getElementById("relatedCarsContainer");
  if (relatedContainer) {
    const related = carsData.filter(c => c.id !== car.id).slice(0, 3);
    relatedContainer.innerHTML = related.map(generateCarCardHTML).join("");
  }

  // Live Price Summary Calculation
  const pickupDateInput = document.getElementById("detailPickupDate");
  const returnDateInput = document.getElementById("detailReturnDate");
  const totalDaysEl = document.getElementById("calcDays");
  const baseCostEl = document.getElementById("calcBaseCost");
  const extrasCostEl = document.getElementById("calcExtrasCost");
  const grandTotalEl = document.getElementById("calcGrandTotal");
  const extrasCheckboxes = document.querySelectorAll(".extra-checkbox");

  // Set default dates (Today and +3 days)
  const today = new Date();
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(today.getDate() + 3);

  if (pickupDateInput && !pickupDateInput.value) {
    pickupDateInput.value = today.toISOString().split("T")[0];
  }
  if (returnDateInput && !returnDateInput.value) {
    returnDateInput.value = threeDaysLater.toISOString().split("T")[0];
  }

  function calculatePrice() {
    let days = 1;
    if (pickupDateInput && returnDateInput && pickupDateInput.value && returnDateInput.value) {
      const start = new Date(pickupDateInput.value);
      const end = new Date(returnDateInput.value);
      const timeDiff = end - start;
      if (timeDiff > 0) {
        days = Math.ceil(timeDiff / (1000 * 3600 * 24));
      }
    }

    const baseCost = days * car.price;

    let extrasTotal = 0;
    extrasCheckboxes.forEach(cb => {
      if (cb.checked) {
        const extraRate = parseFloat(cb.getAttribute("data-price") || 0);
        extrasTotal += extraRate * days;
      }
    });

    const grandTotal = baseCost + extrasTotal;

    if (totalDaysEl) totalDaysEl.textContent = `${days} day${days > 1 ? 's' : ''}`;
    if (baseCostEl) baseCostEl.textContent = `₹${baseCost}`;
    if (extrasCostEl) extrasCostEl.textContent = `₹${extrasTotal}`;
    if (grandTotalEl) grandTotalEl.textContent = `₹${grandTotal}`;
  }

  if (pickupDateInput) pickupDateInput.addEventListener("change", calculatePrice);
  if (returnDateInput) returnDateInput.addEventListener("change", calculatePrice);
  extrasCheckboxes.forEach(cb => cb.addEventListener("change", calculatePrice));

  calculatePrice();

  // Booking Form Submission & Validation
  const bookingForm = document.getElementById("carBookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const fullName = document.getElementById("bookFullName")?.value;
      const email = document.getElementById("bookEmail")?.value;
      const phone = document.getElementById("bookPhone")?.value;

      if (!fullName || !email || !phone) {
        alert("Please fill in all required customer details.");
        return;
      }

      // Show Bootstrap Modal confirmation if present
      const modalEl = document.getElementById("bookingSuccessModal");
      if (modalEl && window.bootstrap) {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
      } else {
        alert(`Thank you, ${fullName}! Your reservation for the ${car.name} has been successfully submitted. We sent confirmation details to ${email}.`);
      }
    });
  }
}

// 9. Contact Form Handler
function setupContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contactName")?.value;
    const email = document.getElementById("contactEmail")?.value;
    const message = document.getElementById("contactMessage")?.value;

    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    const alertBox = document.getElementById("contactSuccessAlert");
    if (alertBox) {
      alertBox.classList.remove("d-none");
      contactForm.reset();
      setTimeout(() => {
        alertBox.classList.add("d-none");
      }, 5000);
    } else {
      alert(`Thank you ${name}! Your message has been sent. Our team will contact you shortly.`);
      contactForm.reset();
    }
  });
}
