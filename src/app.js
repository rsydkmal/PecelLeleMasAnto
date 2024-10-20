document.addEventListener("alpine:init", () => {
	// Alpine.data("navbar", () => ({
	// 	isActiveNavbar: false,
	// 	isActiveSearch: false,
	// 	isActiveCart: false,
	// 	inactive() {
	// 		this.isActiveNavbar = false;
	// 		this.isActiveSearch = false;
	// 		this.isActiveCart = false;
	// 	},
	// }));

	// Alpine.store("modal", {
	// 	isActive: false,
	// });

	Alpine.data("orders", () => ({
		items: [
			{ id: 1, name: "Pecel Ayam", img: "1.jpg", price: 20000 },
			{ id: 2, name: "Pecel Lele", img: "2.jpg", price: 20000 },
		],
	}));

	Alpine.store("cart", {
		items: [],
		total: 0,
		quantity: 0,
		add(newItem) {
			// Cek apakah ada barang yang sama di cart
			const cartItem = this.items.find((item) => item.id === newItem.id);

			// Jika belum ada / cart masih kosong
			if (!cartItem) {
				this.items.push({
					...newItem,
					quantity: 1,
					total: newItem.price,
				});
				this.quantity++;
				this.total += newItem.price;
			} else {
				// Jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
				this.items = this.items.map((item) => {
					// Jika barang berbeda
					if (item.id !== newItem.id) {
						return item;
					} else {
						// Jika barang sudah ada, tambah quantity dan totalnya
						item.quantity++;
						item.total = item.price * item.quantity;
						this.quantity++;
						this.total += item.price;
						return item;
					}
				});
			}
		},
		remove(id) {
			// Ambil item yang mau diremove berdasarkan id
			const cartItem = this.items.find((item) => item.id === id);

			// Jika item lebih dari 1
			if (cartItem.quantity > 1) {
				// telusuri satu persatu
				this.items = this.items.map((item) => {
					// Jika bukan barang yang diklik
					if (item.id !== id) {
						return item;
					} else {
						// Jika barang yang diklik
						item.quantity--;
						item.total = item.price * item.quantity;
						this.quantity--;
						this.total -= item.price;
						return item;
					}
				});
			} else if (cartItem.quantity === 1) {
				// Jika barangnya sisa 1
				this.items = this.items.filter((item) => item.id !== id);
				this.quantity--;
				this.total -= cartItem.price;
			}
		},
	});
});

// Form Validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
	for (let i = 0; i < form.elements.length; i++) {
		if (form.elements[i].value.length !== 0) {
			checkoutButton.classList.remove("disabled");
			checkoutButton.classList.add("disabled");
		} else {
			return false;
		}
	}
	checkoutButton.disabled = false;
	checkoutButton.classList.remove("disabled");
});

// Kirim data ketika tombol checkout diklik
checkoutButton.addEventListener("click", async function (event) {
	event.preventDefault();
	const formData = new FormData(form);
	const data = new URLSearchParams(formData);
	const objData = Object.fromEntries(data);
	// const message = formatMessage(objData);
	// window.open(
	// 	"http://wa.me/6282299128855?text=" + encodeURIComponent(message)
	// );

	// Minta transaction token menggunakan fetch / ajax
	try {
		const response = await fetch("php/placeOrder.php", {
			method: "POST",
			body: data,
		});
		const token = await response.text();
		// console.log(token);
		window.snap.pay(token);
	} catch (error) {
		console.log(error.message);
	}
});

// Format pesan Whatsapp
const formatMessage = (obj) => {
	return `DATA CUSTOMER
	Nama: ${obj.name}
	Email: ${obj.email}
	No. HP: ${obj.phone}
DATA PESANAN
	${JSON.parse(obj.items).map(
		(item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`
	)}
TOTAL: ${rupiah(obj.total)}
TERIMA KASIH...`;
};

// Konversi ke Rupiah
const rupiah = (number) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(number);
};
