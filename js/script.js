const bannerContent = `
<span class="inline-flex items-center mx-4 font-extralight">
    ENJOY $10 DELIVERY ACROSS SYDNEY
    <svg class="w-4 h-4 ml-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
    </svg>
</span>
`;

const banner = document.getElementById('banner');
const contentWidth = 300; // Approximate width of one content piece
const screenWidth = window.innerWidth;
const repeats = Math.ceil(screenWidth / contentWidth) + 1;

// Fill the banner with repeated content
banner.innerHTML = bannerContent.repeat(repeats);

let position = 0;
const speed = 0.5; // Pixels per frame

function animate() {
position -= speed;
if (position <= -contentWidth) {
    position += contentWidth;
    banner.appendChild(banner.firstElementChild);
}
banner.style.transform = `translateX(${position}px)`;
requestAnimationFrame(animate);
}

animate();

// Responsive behavior
window.addEventListener('resize', () => {
const newScreenWidth = window.innerWidth;
const newRepeats = Math.ceil(newScreenWidth / contentWidth) + 1;
if (newRepeats > repeats) {
    banner.innerHTML += bannerContent.repeat(newRepeats - repeats);
}
});






console.clear();
  
gsap.registerPlugin("ScrollTrigger");

let wheel = document.querySelector(".wheel");
let images = gsap.utils.toArray(".wheel__card");

gsap.to(".arrow", { y: 5, ease: "power1.inOut", repeat: -1, yoyo: true });

function setup() {
  let radius = wheel.offsetWidth / 2;
  let center = wheel.offsetWidth / 2;
  let total = images.length;
  let slice = (2 * Math.PI) / total;

  images.forEach((item, i) => {
    let angle = i * slice;

    let x = center + radius * Math.sin(angle);
    let y = center - radius * Math.cos(angle);

    gsap.set(item, {
      rotation: angle + "_rad",
      xPercent: -50,
      yPercent: -50,
      x: x,
      y: y
    });
  });
}

setup();

window.addEventListener("resize", setup);

function loopScroll() {
  gsap.set(".wheel", { rotate: 0 });
  gsap.to(".wheel", {
    rotate: 360,
    duration: 1,
    ease: "none",
    onComplete: loopScroll
  });
}

gsap.to(".wheel", {
  rotate: () => -360,
  ease: "none",
  duration: images.length * 2,
  scrollTrigger: {
    start: 0,
    end: "max",
    scrub: 1,
    snap: 1 / images.length,
    invalidateOnRefresh: true,
    onReachEnd: loopScroll
  }
});

let cards = gsap.utils.toArray(".wheel__card");
let header = document.querySelector(".header");
let body = document.querySelector(".header");

let isFullScreen = false;

let lastClickedCard;

cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    if (lastClickedCard) {
      putBack(e);
    }
    flip(e);
  });
});

header.addEventListener("click", (e) => {
  if (!lastClickedCard) return;
  putBack(e);
});

function putBack(e) {
  let image = header.querySelector("img");

  let state = Flip.getState(image);

  lastClickedCard.appendChild(image);

  Flip.from(state, {
    duration: 0.6,
    ease: "sine.out",
    absolute: true
  });

  lastClickedCard = null;
}

function flip(e) {
  let image = e.target.querySelector("img");

  let state = Flip.getState(image);

  header.appendChild(image);

  Flip.from(state, {
    duration: 0.6,
    ease: "sine.out",
    absolute: true
  });

  lastClickedCard = e.target;
}

Draggable.create(".wheel", {
  type: "rotation",
  inertia: true,
  snap: {
    rotation: gsap.utils.snap(360 / images.length)
  }
});
