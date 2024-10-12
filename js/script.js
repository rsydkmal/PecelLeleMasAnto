// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");
// Ketika hamburger menu diklik
document.querySelector("#hamburger-menu").onclick = () => {
	navbarNav.classList.toggle("active");
};

// Klik di luar sidebar untuk menghilangkan sidebar
const hamburger = document.querySelector("#hamburger-menu");
document.addEventListener("click", function (event) {
	if (
		!hamburger.contains(event.target) &&
		!navbarNav.contains(event.target)
	) {
		navbarNav.classList.remove("active");
	}
});
