const products = [
  {
    name: "Wireless Headphones",
    price: 8999,
    image: "images/HEADPHONES.jpg",
    link: "headphones.html",
  },
  {
    name: "Bluetooth Speaker",
    price: 6499,
    image: "images/SPEAKER.jpg",
    link: "bluetooth-speaker.html",
  },
  { name: "4K TV", price: 84999, image: "images/TV.png", link: "4k-tv.html" },
  {
    name: "Smartphone",
    price: 15999,
    image: "images/SMARTPHONE.jpeg",
    link: "smartphone.html",
  },
  {
    name: "Laptop",
    price: 54999,
    image: "images/LAP.jpeg",
    link: "laptop.html",
  },
  {
    name: "Smartwatch",
    price: 12999,
    image: "images/smartwatch.jpeg",
    link: "smartwatch.html",
  },
  {
    name: "Gaming Console",
    price: 39999,
    image: "images/Console.jpeg",
    link: "gaming-console.html",
  },
  {
    name: "Tablet",
    price: 22999,
    image: "images/tablet.jpeg",
    link: "tablet.html",
  },
  {
    name: "Digital Camera",
    price: 45999,
    image: "images/Camera.jpeg",
    link: "digital-camera.html",
  },
  {
    name: "Drone",
    price: 64999,
    image: "images/Drone.jpeg",
    link: "drone.html",
  },
  {
    name: "Home Theater System",
    price: 34999,
    image: "images/home_theater.jpeg",
    link: "home-theater.html",
  },
  {
    name: "Fitness Tracker",
    price: 4999,
    image: "images/fit_tracker.jpeg",
    link: "fitness-tracker.html",
  },
  {
    name: "VR Headset",
    price: 29999,
    image: "images/VR.jpeg",
    link: "vr-headset.html",
  },
  {
    name: "Smart Home Assistant",
    price: 7999,
    image: "images/home_ass.jpeg",
    link: "smart-home-assistant.html",
  },
  {
    name: "Portable Charger",
    price: 1999,
    image: "images/portable.jpeg",
    link: "portable-charger.html",
  },
];

const productGrid = document.getElementById("product-grid");

// **Initialize Product Cards**
function displayProducts(productsToDisplay) {
  productGrid.innerHTML = ""; // Clear the grid

  if (productsToDisplay.length === 0) {
    productGrid.innerHTML = "<p>No products found</p>";
  } else {
    productsToDisplay.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>Price: ₹${product.price}</p>
          <a href="${product.link}">
            <button class="view-details">View Details</button>
          </a>
        `;
      productGrid.appendChild(card);
    });
  }
}

// Show all products initially
displayProducts(products);

// **Search Functionality**
document.getElementById("search-input").addEventListener("input", function () {
  const searchQuery = this.value.trim().toLowerCase(); // Get the search query

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery)
  );

  displayProducts(filteredProducts); // Display filtered products
});

// **Show Product Details**
function showProductDetails(index) {
  const product = products[index];
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-image").src = product.image;
  document.getElementById(
    "product-price"
  ).textContent = `Price: ₹${product.price}`;

  // Show Product Details Section
  document.getElementById("product-details").style.display = "block";
}

// **Close Product Details**
document.getElementById("close-details").addEventListener("click", function () {
  document.getElementById("product-details").style.display = "none";
});

// **Theme Toggle Functionality**
const themeToggleButton = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.body.classList.add(currentTheme);
  if (currentTheme === "dark-theme") {
    themeToggleButton.textContent = "Light Mode";
  }
}

themeToggleButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");

  let theme = "light-theme";
  if (document.body.classList.contains("dark-theme")) {
    themeToggleButton.textContent = "Light Mode";
    theme = "dark-theme";
  } else {
    themeToggleButton.textContent = "Dark Mode";
  }

  localStorage.setItem("theme", theme);
});

// **Category Modal Functionality**

const modal = document.getElementById("category-modal");
const categoryButton = document.getElementById("category-button-id"); // Corrected selector
const closeButton = document.querySelector(".close-button");

// Show the modal when the "Categories" button is clicked
categoryButton.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default link behavior
  modal.style.display = "flex"; // Show the modal
});

// Close the modal when the close button is clicked
closeButton.addEventListener("click", () => {
  modal.style.display = "none"; // Hide the modal
});

// Close the modal if the user clicks outside the modal content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none"; // Hide the modal
  }
});
