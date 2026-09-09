// ===============================
// Product Data
// ===============================

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 10,
        image: "img/headphone.jpg",
        category: "audio",
        description: "Enjoy clear sound with comfortable wireless headphones."
    },
    {
        id: 2,
        name: "Laptop Bag",
        price: 20,
        image: "img/laptopbag.jpg",
        category: "accessories",
        description: "Protect and carry your laptop safely and comfortably."
    },
    {
        id: 3,
        name: "Smart Watch",
        price: 23,
        image: "img/watch.jpg",
        category: "wearables",
        description: "Track your daily activities with this smart watch."
    }
];


// ===============================
// Dynamic Product Details
// ===============================

const detailSection = document.querySelector("#product-details");

if (detailSection) {
    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get("id"));

    const selectedProduct = products.find(
        product => product.id === productId
    );

    if (selectedProduct) {
        const detailImage = document.querySelector("#detail-image");
        const detailName = document.querySelector("#detail-name");
        const detailPrice = document.querySelector("#detail-price");
        const detailDescription =
            document.querySelector("#detail-description");
        const addToCartButton =
            document.querySelector("#add-to-cart");

        detailImage.src = selectedProduct.image;
        detailImage.alt = selectedProduct.name;

        detailName.textContent = selectedProduct.name;

        detailPrice.textContent =
            `Price: $${selectedProduct.price.toFixed(2)}`;

        detailDescription.textContent =
            selectedProduct.description;

        addToCartButton.addEventListener("click", function () {
            let cart =
                JSON.parse(localStorage.getItem("cart")) || [];

            const existingProduct = cart.find(
                product => product.id === selectedProduct.id
            );

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({
                    ...selectedProduct,
                    quantity: 1
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            alert("Product added to cart successfully!");
        });

    } else {
        detailSection.innerHTML = `
            <h2>Product Not Found</h2>
            <p>The selected product does not exist.</p>

            <a href="product.html" class="btn">
                Back to Products
            </a>
        `;
    }
}


// ===============================
// Cart Page
// ===============================

const cartSection = document.querySelector("#shopping-cart");

if (cartSection) {
    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    function displayCart() {
        if (cart.length === 0) {
            cartSection.innerHTML = `
                <h2>Shopping Cart</h2>

                <p>Your cart is empty.</p>

                <a href="product.html" class="btn">
                    Continue Shopping
                </a>
            `;

            return;
        }

        let total = 0;

        let cartHTML = `
            <h2>Shopping Cart</h2>

            <div class="cart-items">
        `;

        cart.forEach(function (product) {
            const productTotal =
                product.price * product.quantity;

            total += productTotal;

            cartHTML += `
                <article class="cart-item">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <div class="cart-item-details">

                        <h3>${product.name}</h3>

                        <p>
                            Price:
                            $${product.price.toFixed(2)}
                        </p>

                        <div class="quantity-controls">

                            <button
                                type="button"
                                class="quantity-btn decrease-btn"
                                data-id="${product.id}"
                                aria-label="Decrease quantity"
                            >
                                −
                            </button>

                            <span>${product.quantity}</span>

                            <button
                                type="button"
                                class="quantity-btn increase-btn"
                                data-id="${product.id}"
                                aria-label="Increase quantity"
                            >
                                +
                            </button>

                        </div>

                        <p>
                            Subtotal:
                            $${productTotal.toFixed(2)}
                        </p>

                        <button
                            type="button"
                            class="btn remove-btn"
                            data-id="${product.id}"
                        >
                            Remove
                        </button>

                    </div>

                </article>
            `;
        });

        cartHTML += `
            </div>

            <div class="cart-summary">

                <h3>
                    Total: $${total.toFixed(2)}
                </h3>

                <button
                    type="button"
                    class="btn"
                    id="checkout-btn"
                >
                    Checkout
                </button>

                <button
                    type="button"
                    class="btn clear-cart-btn"
                    id="clear-cart-btn"
                >
                    Clear Cart
                </button>

            </div>
        `;

        cartSection.innerHTML = cartHTML;


        // ===============================
        // Increase Quantity
        // ===============================

        document.querySelectorAll(".increase-btn")
            .forEach(function (button) {
                button.addEventListener("click", function () {
                    const productId =
                        Number(this.dataset.id);

                    const product = cart.find(
                        item => item.id === productId
                    );

                    if (product) {
                        product.quantity++;
                        saveAndDisplayCart();
                    }
                });
            });


        // ===============================
        // Decrease Quantity
        // ===============================

        document.querySelectorAll(".decrease-btn")
            .forEach(function (button) {
                button.addEventListener("click", function () {
                    const productId =
                        Number(this.dataset.id);

                    const product = cart.find(
                        item => item.id === productId
                    );

                    if (product) {
                        product.quantity--;

                        if (product.quantity <= 0) {
                            cart = cart.filter(
                                item => item.id !== productId
                            );
                        }

                        saveAndDisplayCart();
                    }
                });
            });


        // ===============================
        // Remove Product
        // ===============================

        document.querySelectorAll(".remove-btn")
            .forEach(function (button) {
                button.addEventListener("click", function () {
                    const productId =
                        Number(this.dataset.id);

                    cart = cart.filter(
                        item => item.id !== productId
                    );

                    saveAndDisplayCart();
                });
            });


        // ===============================
        // Clear Cart
        // ===============================

        document.querySelector("#clear-cart-btn")
            .addEventListener("click", function () {
                cart = [];
                saveAndDisplayCart();
            });


        // ===============================
        // Checkout
        // ===============================

        document.querySelector("#checkout-btn")
            .addEventListener("click", function () {
                alert("Checkout feature will be added soon!");
            });
    }


    // ===============================
    // Save Cart and Refresh UI
    // ===============================

    function saveAndDisplayCart() {
        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        displayCart();
    }

    displayCart();
}


// ===============================
// Product Search and Category Filter
// ===============================

const searchInput =
    document.querySelector("#search-input");

const categoryFilter =
    document.querySelector("#category-filter");

const productCards =
    document.querySelectorAll(".product-card");

const noProducts =
    document.querySelector("#no-products");


function filterProducts() {
    const searchText = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const selectedCategory = categoryFilter
        ? categoryFilter.value
        : "all";

    let visibleProducts = 0;

    productCards.forEach(function (card) {
        const productName = card
            .querySelector("h3")
            .textContent
            .toLowerCase();

        const productCategory =
            card.dataset.category;

        const matchesSearch =
            productName.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            productCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "block";
            visibleProducts++;
        } else {
            card.style.display = "none";
        }
    });

    if (noProducts) {
        noProducts.hidden = visibleProducts !== 0;
    }
}


if (searchInput) {
    searchInput.addEventListener(
        "input",
        filterProducts
    );
}

if (categoryFilter) {
    categoryFilter.addEventListener(
        "change",
        filterProducts
    );
}