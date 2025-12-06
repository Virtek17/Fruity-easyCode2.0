const burger = document.querySelector(".burger-menu");
const burgerMenu = document.querySelector(".of");

// Получили кнопку открытия модалки
const btnProfile = document.getElementById("profile");

// Получили саму модалку (для авторизации/регистрации)
const modalAuth = document.getElementById("modalAuth");

// Получаем кнопку закрытия модалки
const closeBtnAuth = document.getElementById("closeBtnAuth");

const modalProduct = document.getElementById("modalProduct");
const productBtnClose = document.getElementById("productBtnClose");

const btnsBuy = document.querySelectorAll(".btn-buy");
console.log(btnsBuy);

const modalName = modalProduct.querySelector("h3");
const modlaPrice = modalProduct.querySelector(".price");
const modalWeight = modalProduct.querySelector("h4");

btnsBuy.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".card");
    const name = card.querySelector(".card-name").textContent;
    const price = card.querySelector(".coast").textContent;
    const weight = card.querySelector(".weight").textContent;

    modalName.textContent = name;
    modlaPrice.textContent = price;
    modalWeight.textContent = weight;

    addToCart({
      name,
      price,
      weight,
    });

    modalProduct.classList.add("modalOpen");
  });
});

productBtnClose.addEventListener("click", () => {
  modalProduct.classList.remove("modalOpen");
});

closeBtnAuth.addEventListener("click", () => {
  modalAuth.classList.remove("modalOpen");
});

btnProfile.addEventListener("click", () => {
  modalAuth.classList.add("modalOpen");
});

burger.addEventListener("click", function (e) {
  burgerMenu.classList.toggle("of");
  burgerMenu.classList.toggle("burger-navigation-on");
  burger.classList.toggle("on");
});

// Корзина
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  // Проверяем, есть ли уже такой товар
  const existing = cart.find((item) => item.name === product.name);

  if (existing) {
    existing.count += 1;
  } else {
    cart.push({ ...product, count: 1 });
  }

  saveCart();
  updateCartCounter();
}
// корзина
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const cartBtnClose = document.getElementById("cartBtnClose");
const openCart = document.getElementById("openCart");
const cartCount = document.getElementById("cartCount");

function updateCartCounter() {
  const total = cart.reduce((sum, item) => sum + item.count, 0);
  cartCount.textContent = total;
}

updateCartCounter();

openCart.addEventListener("click", () => {
  renderCart();
  cartModal.classList.add("modalOpen");
});

cartBtnClose.addEventListener("click", () => {
  cartModal.classList.remove("modalOpen");
});

function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Корзина пустая</p>";
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item">
      <b>${item.name}</b> — ${item.price} (${item.weight}) × ${item.count}
    </div>
  `
    )
    .join("");
}
