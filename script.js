/* =========================
   CART COUNTER & NOTIFICATION
========================= */

let cartCount = 0;
let currentQty = 1;
let notificationTimeout;

function supportRashta() {

    const notification = document.getElementById("supportNotification");
    const sound = document.getElementById("notificationSound");
    const cartDisplay = document.getElementById("cartCount");

    // ADD SELECTED QUANTITY TO CART
    cartCount += currentQty;
    cartDisplay.textContent = cartCount;

    // UPDATE NOTIFICATION
    notification.textContent =
        `♡ ${currentQty} Rashta item(s) added to cart! ♡`;

    // PLAY SOUND
    sound.currentTime = 0;
    sound.play().catch(error => {
        console.log("Sound could not play:", error);
    });

    // SHOW NOTIFICATION
    notification.classList.add("show");

    clearTimeout(notificationTimeout);

    // HIDE AFTER 3 SECONDS
    notificationTimeout = setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}


/* =========================
   QUANTITY SELECTOR
========================= */

function changeQuantity(amount) {

    currentQty += amount;

    // PREVENT QUANTITY FROM GOING BELOW 1
    if (currentQty < 1) {
        currentQty = 1;
    }

    document.getElementById("productQty").textContent = currentQty;

} // <-- THIS CLOSING BRACE WAS MISSING!

/* =========================
   SIDEBAR
========================= */

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.querySelector(".menu-button").style.display = "none";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.querySelector(".menu-button").style.display = "flex";
}


/* =========================
   FADE-IN OBSERVER
========================= */

const elements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
});

elements.forEach(element => observer.observe(element));



/* =========================
   GALLERY IMAGE COLLECTIONS
========================= */

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


/* =========================
   CAROUSEL VARIABLES
========================= */

const carousel = document.querySelector(".carousel");
const track = document.getElementById("carouselTrack");

let slides = [];

let currentImage = 1;
let isAnimating = false;


/* =========================
   SET SLIDE WIDTHS
========================= */

function setSlideWidths() {

    const slideWidth = carousel.clientWidth * 0.6;

    slides.forEach(slide => {

        slide.style.flex = `0 0 ${slideWidth}px`;
        slide.style.width = `${slideWidth}px`;

    });

}


/* =========================
   POSITION THE TRACK
========================= */

function positionTrack(animate = true) {

    if (slides.length === 0) return;

    const slideWidth = slides[0].offsetWidth;

    const offset =
        carousel.clientWidth / 2 -
        (currentImage + 0.5) * slideWidth;

    track.style.transition = animate
        ? "transform 0.6s ease-in-out"
        : "none";

    track.style.transform = `translateX(${offset}px)`;

}


/* =========================
   UPDATE IMAGE APPEARANCE
========================= */

function updateSlides() {

    slides.forEach((slide, index) => {

        slide.classList.remove("is-center", "is-side");

        if (index === currentImage) {

            slide.classList.add("is-center");

        } else if (
            index === currentImage - 1 ||
            index === currentImage + 1
        ) {

            slide.classList.add("is-side");

        }

    });

}


/* =========================
   BUILD GALLERY
========================= */

function buildGallery(category) {

    isAnimating = false;
    currentImage = 1;

    track.style.transition = "none";
    track.style.transform = "translateX(0px)";

    track.replaceChildren();

    // ADD ORIGINAL IMAGES

    galleryImages[category].forEach(filename => {

        const slide = document.createElement("div");
        slide.className = "carousel-slide";

        const image = document.createElement("img");

        image.src = filename;
        image.alt = `Rashta - ${category}`;

        slide.appendChild(image);
        track.appendChild(slide);

    });


    // CREATE CLONES FOR INFINITE LOOPING

    const originalSlides = Array.from(track.children);

    const firstClone = originalSlides[0].cloneNode(true);
    const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);

    track.insertBefore(lastClone, originalSlides[0]);
    track.appendChild(firstClone);

    slides = Array.from(track.children);


    // POSITION EVERYTHING

    setSlideWidths();
    updateSlides();
    positionTrack(false);


    // UPDATE SELECTED BUTTON

    document.querySelectorAll(".category-button").forEach(button => {

        button.classList.remove("active");

    });

    const selectedButton = document.querySelector(
        `.category-button[onclick="selectGallery('${category}')"]`
    );

    if (selectedButton) {
        selectedButton.classList.add("active");
    }

}


/* =========================
   CHANGE GALLERY CATEGORY
========================= */

function selectGallery(category) {

    if (!galleryImages[category]) return;

    buildGallery(category);

}


/* =========================
   MOVE CAROUSEL
========================= */

function moveCarousel(direction) {

    if (isAnimating) return;

    isAnimating = true;

    currentImage += direction;

    updateSlides();
    positionTrack(true);

}


/* =========================
   ARROW BUTTONS
========================= */

function nextImage() {

    moveCarousel(1);

}

function previousImage() {

    moveCarousel(-1);

}


/* =========================
   INFINITE LOOP
========================= */

track.addEventListener("transitionend", (event) => {

    if (
        event.target !== track ||
        event.propertyName !== "transform"
    ) return;


    if (currentImage === 0) {

        currentImage = slides.length - 2;

        updateSlides();
        positionTrack(false);

    }

    else if (currentImage === slides.length - 1) {

        currentImage = 1;

        updateSlides();
        positionTrack(false);

    }

    isAnimating = false;

});


/* =========================
   WINDOW RESIZE
========================= */

window.addEventListener("resize", () => {

    setSlideWidths();
    positionTrack(false);

});


/* =========================
   INITIAL GALLERY
========================= */

buildGallery("general");

/* =========================
   PROMO
========================= */
function applyPromo() {
    const code = document.getElementById("promoInput").value.trim().toUpperCase();
    const msg = document.getElementById("promoMessage");

    if (code === "WINNER" || code === "RASHTA") {
        msg.style.color = "green";
        msg.textContent = "🎉 15% Competition Discount Applied!";
    } else {
        msg.style.color = "red";
        msg.textContent = "❌ Invalid promo code";
    }
}