// ==========================================
// RASHTA WEBSITE — MAIN JAVASCRIPT
// ==========================================


// ==========================================
// CART VARIABLES
// ==========================================

let cartItems = [];
let currentQty = 1;
let notificationTimeout;

let currentCategory = "general";


// ==========================================
// BOUTIQUE PURCHASE POPUP
// ==========================================

function openPurchasePopup() {
    currentQty = 1;

    const quantityDisplay = document.getElementById("productQty");

    if (quantityDisplay) {
        quantityDisplay.textContent = currentQty;
    }

    const popup = document.getElementById("purchasePopup");

    if (popup) {
        popup.classList.add("active");
    }
}

function closePurchasePopup() {
    const popup = document.getElementById("purchasePopup");

    if (popup) {
        popup.classList.remove("active");
    }
}

function changeQuantity(amount) {
    currentQty = Math.max(1, currentQty + amount);

    const quantityDisplay = document.getElementById("productQty");

    if (quantityDisplay) {
        quantityDisplay.textContent = currentQty;
    }
}


// Boutique purchase button
function addToCart() {
    const selectedSize = document.getElementById("productSize").value;

    if (selectedSize === "") {
        alert("Please select a size first! ♡");
        return;
    }

    const existingItem = cartItems.find(item =>
        item.category === "boutique" &&
        item.size === selectedSize
    );

    if (existingItem) {
        existingItem.quantity += currentQty;
    } else {
        cartItems.push({
            category: "boutique",
            filename: "Rashie.jpg",
            name: "Rashta's Boutique",
            size: selectedSize,
            quantity: currentQty
        });
    }

    updateCart();
    showCartNotification("Rashta's Boutique");
    closePurchasePopup();
}


// ==========================================
// IMAGE SUPPORT CART
// ==========================================

function addToCart() {
    const selectedSize = document.getElementById("productSize").value;

    if (selectedSize === "") {
        alert("Please select a size first! ♡");
        return;
    }

    // Identify the image currently displayed in the carousel
    const currentSlide = slides[currentImage];
    const currentDisplayedImage = currentSlide?.querySelector("img");

    if (!currentDisplayedImage) return;

    const filename = currentDisplayedImage.getAttribute("src");

    // Check whether this exact image and size already exist
    const existingItem = cartItems.find(item =>
        item.category === currentCategory &&
        item.filename === filename &&
        item.size === selectedSize
    );

    if (existingItem) {
        existingItem.quantity += currentQty;
    } else {
        cartItems.push({
            category: currentCategory,
            filename: filename,
            name: filename,
            size: selectedSize,
            quantity: currentQty
        });
    }

    updateCart();
    showCartNotification(filename);
    closePurchasePopup();
}


// Update cart display
function updateCart() {
    const cartCount = document.getElementById("cartCount");
    const cartDisplay = document.getElementById("cartItems");

    const totalQuantity = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }

    if (!cartDisplay) return;

    cartDisplay.innerHTML = "";

    if (cartItems.length === 0) {
        cartDisplay.textContent =
            "Your cart is empty. Support Rashta! ♡";
        return;
    }

    cartItems.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        const image = document.createElement("img");
        image.src = item.filename;
        image.alt = item.name;

        const details = document.createElement("div");
        details.className = "cart-item-details";

        const name = document.createElement("p");
        name.textContent = item.name;

        const quantity = document.createElement("p");
        quantity.textContent = `Quantity: ${item.quantity}`;

        details.appendChild(name);
        details.appendChild(quantity);

        if (item.size) {
            const size = document.createElement("p");
            size.textContent = `Size: ${item.size}`;
            details.appendChild(size);
        }

        cartItem.appendChild(image);
        cartItem.appendChild(details);

        cartDisplay.appendChild(cartItem);
    });
}


// Open and close cart
function toggleCart() {
    const cartPanel = document.getElementById("cartPanel");

    if (cartPanel) {
        cartPanel.classList.toggle("active");
    }
}


// ==========================================
// SUPPORT NOTIFICATION
// ==========================================

function showCartNotification(itemName) {
    const notification =
        document.getElementById("supportNotification");

    const sound =
        document.getElementById("notificationSound");

    if (notification) {
        notification.textContent =
            `♡ ${itemName} has been added to your support cart! ♡`;

        notification.classList.add("show");

        clearTimeout(notificationTimeout);

        notificationTimeout = setTimeout(() => {
            notification.classList.remove("show");
        }, 3000);
    }

    if (sound) {
        sound.currentTime = 0;

        sound.play().catch(() => {
            // The browser may require prior user interaction.
        });
    }
}


// ==========================================
// SIDEBAR
// ==========================================

function openNav() {
    const sidebar = document.getElementById("mySidenav");
    const menuButton = document.querySelector(".menu-button");

    if (sidebar) {
        sidebar.style.width = "250px";
    }

    if (menuButton) {
        menuButton.style.display = "none";
    }
}

function closeNav() {
    const sidebar = document.getElementById("mySidenav");
    const menuButton = document.querySelector(".menu-button");

    if (sidebar) {
        sidebar.style.width = "0";
    }

    if (menuButton) {
        menuButton.style.display = "flex";
    }
}


// ==========================================
// FADE-IN ANIMATIONS
// ==========================================

const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    observer.observe(element);
});


// ==========================================
// GALLERY IMAGES
// ==========================================

const galleryImages = {
    general: [
        "Tarash.jpg",
        "Tata.jpg",
        "Rashta.jpg",
        "live.jpg",
        "RASH.jpg"
    ],

    manhwa: [
        "ra.jpg",
        "sh.jpg",
        "ta.jpg",
        "rashata.jpg",
        "tatarash.jpg"
    ],

    lightNovel: [
        "Lta.jpg",
        "Lsh.jpg",
        "Ltatarash.jpg",
        "Lrashata.jpg",
        "Lra.jpg"
    ]
};


// ==========================================
// GALLERY DESCRIPTIONS
// ==========================================

const galleryDescriptions = {
    general: [
        "A moment featuring Rashta.",
        "A look at Rashta's story.",
        "Rashta, the former Empress.",
        "A memorable Rashta moment.",
        "Another glimpse of Rashta."
    ],

    manhwa: [
        "A scene from the manhwa.",
        "A moment from Rashta's journey.",
        "A manhwa illustration.",
        "A scene featuring Rashta.",
        "Another manhwa moment."
    ],

    lightNovel: [
        "A scene from the light novel.",
        "A moment from the novel.",
        "A light novel illustration.",
        "A glimpse into the novel.",
        "Another novel moment."
    ]
};


// ==========================================
// CAROUSEL VARIABLES
// ==========================================

const carousel = document.querySelector(".carousel");
const track = document.getElementById("carouselTrack");

let slides = [];
let currentImage = 1;
let isAnimating = false;


// ==========================================
// CAROUSEL POSITIONING
// ==========================================

function setSlideWidths() {
    if (!carousel) return;

    slides.forEach(slide => {
        slide.style.flex = `0 0 ${carousel.clientWidth * 0.6}px`;
    });
}


function positionTrack() {
    if (!slides.length || !carousel) return;

    const slideWidth = slides[currentImage].offsetWidth;

    const centerOffset =
        (carousel.clientWidth - slideWidth) / 2;

    const translateAmount =
        slides[currentImage].offsetLeft - centerOffset;

    track.style.transform =
        `translateX(-${translateAmount}px)`;
}


function updateSlides() {
    slides.forEach((slide, index) => {
        slide.classList.remove("is-center", "is-side");

        if (index === currentImage) {
            slide.classList.add("is-center");
        } else {
            slide.classList.add("is-side");
        }
    });
}


// ==========================================
// BUILD GALLERY
// ==========================================

function buildGallery(category) {
    if (!track || !galleryImages[category]) return;

    currentCategory = category;

    isAnimating = false;
    currentImage = 1;

    track.innerHTML = "";

    const images = galleryImages[category];

    // Create actual slides
    images.forEach(filename => {
        const slide = document.createElement("div");
        slide.className = "carousel-slide";

        const image = document.createElement("img");
        image.src = filename;
        image.alt = `Rashta - ${category}`;

        slide.appendChild(image);

        track.appendChild(slide);
    });

    // Clone last slide
    const lastClone = track.lastElementChild.cloneNode(true);
    track.insertBefore(lastClone, track.firstElementChild);

    // Clone first slide
    const firstClone = track.children[1].cloneNode(true);
    track.appendChild(firstClone);

    slides = Array.from(track.children);

    setSlideWidths();
    positionTrack();
    updateSlides();

    // Update selected gallery button
    document.querySelectorAll(".gallery-selector button")
        .forEach(button => {
            button.classList.remove("active");
        });

    const categoryButtons = {
        general: 0,
        manhwa: 1,
        lightNovel: 2
    };

    const buttons =
        document.querySelectorAll(".gallery-selector button");

    const selectedButton = buttons[categoryButtons[category]];

    if (selectedButton) {
        selectedButton.classList.add("active");
    }
}


// ==========================================
// SELECT GALLERY CATEGORY
// ==========================================

function selectGallery(category) {
    if (!galleryImages[category]) return;

    buildGallery(category);
}


// ==========================================
// MOVE CAROUSEL
// ==========================================

function moveCarousel(direction) {
    if (isAnimating || !slides.length) return;

    isAnimating = true;

    currentImage += direction;

    track.style.transition = "transform 0.6s ease-in-out";

    positionTrack();
    updateSlides();
}


function nextImage() {
    moveCarousel(1);
}


function previousImage() {
    moveCarousel(-1);
}


// Infinite carousel loop
if (track) {
    track.addEventListener("transitionend", () => {
        if (currentImage === slides.length - 1) {
            track.style.transition = "none";
            currentImage = 1;
            positionTrack();
            updateSlides();
        }

        if (currentImage === 0) {
            track.style.transition = "none";
            currentImage = slides.length - 2;
            positionTrack();
            updateSlides();
        }

        isAnimating = false;
    });
}


if (track) {
    track.addEventListener("click", event => {

        const clickedImage =
            event.target.closest(".carousel-slide img");

        if (!clickedImage) return;

        const index = galleryImages[currentCategory]
            .indexOf(clickedImage.getAttribute("src"));

        if (index !== -1) {
            openLightbox(currentCategory, index);
        }
    });
}


// ==========================================
// RESIZE CAROUSEL
// ==========================================

window.addEventListener("resize", () => {
    if (!slides.length) return;

    setSlideWidths();
    positionTrack();
});


// ==========================================
// LIGHTBOX
// ==========================================

let lightboxCategory = "general";
let lightboxIndex = 0;


function openLightbox(category, index) {
    lightboxCategory = category;
    lightboxIndex = index;

    updateLightbox();

    const lightbox = document.getElementById("imageLightbox");

    if (lightbox) {
        lightbox.classList.add("active");
    }
}


function updateLightbox() {
    const image = document.getElementById("lightboxImage");
    const title = document.getElementById("lightboxTitle");
    const text = document.getElementById("lightboxText");

    const filename = galleryImages[lightboxCategory]?.[lightboxIndex];

    if (!filename) return;

    if (image) {
        image.src = filename;
        image.alt = `Rashta - ${lightboxCategory}`;
    }

    if (title) {
        title.textContent = filename;
    }

    if (text) {
        text.textContent =
            galleryDescriptions[lightboxCategory]?.[lightboxIndex] || "";
    }
}


function changeLightboxImage(direction) {
    const images = galleryImages[lightboxCategory];

    if (!images) return;

    lightboxIndex += direction;

    if (lightboxIndex >= images.length) {
        lightboxIndex = 0;
    }

    if (lightboxIndex < 0) {
        lightboxIndex = images.length - 1;
    }

    updateLightbox();
}


function closeLightbox() {
    const lightbox = document.getElementById("imageLightbox");

    if (lightbox) {
        lightbox.classList.remove("active");
    }
}


// ==========================================
// PROMO CODE
// ==========================================

function applyPromo() {
    const promoInput = document.getElementById("promoInput");
    const promoMessage = document.getElementById("promoMessage");

    if (!promoInput || !promoMessage) return;

    const code = promoInput.value.trim().toLowerCase();

    const validCodes = ["avery", "rashta", "winner"];

    if (code === "") {
        promoMessage.textContent = "Please enter a promo code!";
        return;
    }

    if (validCodes.includes(code)) {
        promoMessage.textContent = `♡ Promo code "${code}" accepted! ♡`;
        promoMessage.style.color = "#612234";
    } else {
        promoMessage.textContent = "Invalid promo code. Try again! ♡";
        promoMessage.style.color = "#c03955";
    }
}


// ==========================================
// INITIALIZE WEBSITE
// ==========================================

buildGallery("general");
updateCart();