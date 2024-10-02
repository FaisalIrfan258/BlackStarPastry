const bannerContent = `
<span class="inline-flex items-center mx-4">
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