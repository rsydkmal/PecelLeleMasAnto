// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// Ketika hamburger menu diklik
document.querySelector("#hamburger-menu").onclick = (event) => {
	navbarNav.classList.toggle("active");
	event.preventDefault();
};

// Toggle kelas active untuk Search Form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");
// Ketika search button diklik
document.querySelector("#search-button").onclick = (event) => {
	searchForm.classList.toggle("active");
	searchBox.focus();
	event.preventDefault();
};

// Toggle kelas active untuk Shopping Cart
const shoppingCart = document.querySelector(".shopping-cart");
// Ketika shopping cart button diklik
document.querySelector("#shopping-cart-button").onclick = (event) => {
	shoppingCart.classList.toggle("active");
	event.preventDefault();
};

// Klik di luar elemen
const hm = document.querySelector("#hamburger-menu"); // hm = hamburger menu
const sb = document.querySelector("#search-button"); // sb = search button
const sc = document.querySelector("#shopping-cart-button"); // sc = shopping cart button
document.addEventListener("click", function (event) {
	if (!hm.contains(event.target) && !navbarNav.contains(event.target)) {
		navbarNav.classList.remove("active");
	}
	if (!sb.contains(event.target) && !searchForm.contains(event.target)) {
		searchForm.classList.remove("active");
	}
	if (!sc.contains(event.target) && !shoppingCart.contains(event.target)) {
		shoppingCart.classList.remove("active");
	}
});

// Modal Box
const itemDetailModal = document.querySelector("#item-detail-modal");
const itemDetailButtons = document.querySelectorAll(".item-detail-button");

itemDetailButtons.forEach((btn) => {
	btn.onclick = (event) => {
		itemDetailModal.style.display = "flex";
		event.preventDefault();
	};
});

// Close Modal Box
document.querySelector(".modal .close-icon").onclick = (event) => {
	itemDetailModal.style.display = "none";
	event.preventDefault();
};
// Klik di luar elemen
window.onclick = (event) => {
	if (event.target === itemDetailModal) {
		itemDetailModal.style.display = "none";
	}
};
