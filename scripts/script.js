import elements from "./HTMLElements.js";
import { ProductCard } from "./ProductCard.js";
import { tvsList, phonesList, laptopsList } from "./ProductsInfo.js";
import {
  addClass,
  animateScroll,
  convertDayInfo,
  removeClass,
  upScroll,
} from "./helpers.js";

const initProducts = (productsList, productContainer) => {
  productsList.forEach(({ imgLink, name, date }) => {
    const newCard = new ProductCard(imgLink, name, convertDayInfo(date));
    newCard.createElement(productContainer);
  });
};

initProducts(tvsList, elements.tvs);
initProducts(phonesList, elements.phones);
initProducts(laptopsList, elements.laptops);

const buttons = document.querySelectorAll(".main .product-container .button");

const changeModalVisibility = () => {
  const visible = elements.formContainer.classList.length < 2;
  const className = "form-container_visible";
  visible
    ? addClass(elements.formContainer, className)
    : removeClass(elements.formContainer, className);
};

buttons.forEach((el) => el.addEventListener("click", changeModalVisibility));

elements.formContainer.addEventListener("click", changeModalVisibility);
elements.form.addEventListener("click", (e) => e.stopPropagation());
elements.modalCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  changeModalVisibility();
});

animateScroll(elements.anchors);

const colorThemeSwitch = () => {
  const isLight = elements.body.classList.length === 0;
  isLight
    ? addClass(elements.body, "dark")
    : removeClass(elements.body, "dark");
};

const formInfo = {
  productQty: 0,
  color: null,
  comment: null,
};

const buyProduct = (event) => {
  event.preventDefault();
  formInfo.comment = event.target[6].value;
  alert(
    `Вы купили товар. Количество: ${formInfo.productQty}. Цвет: ${formInfo.color}`
  );
  elements.form.reset();
  changeModalVisibility();
};

const changeUpButtonVisibility = () => {
  const html = document.documentElement;
  window.scrollY > 300 && window.scrollY < html.scrollHeight - 1400
    ? removeClass(elements.upButton, "hidden")
    : addClass(elements.upButton, "hidden");
};

const changeNavBarMenuVisible = () => {
  elements.navBarMenu.classList.length > 1
    ? removeClass(elements.navBarMenu, "nav-bar__menu_hidden")
    : addClass(elements.navBarMenu, "nav-bar__menu_hidden");
};

elements.radioButtons.forEach((el) =>
  el.addEventListener("change", (e) => {
    formInfo.color = e.target.value;
    if (formInfo.productQty && formInfo.color) {
      elements.formButton.removeAttribute("disabled");
    }
  })
);

elements.formInput.addEventListener("input", (e) => {
  if (e.target.value.length > 2) e.target.value = e.target.value.slice(0, -1);

  if (e.target.value) {
    formInfo.productQty = e.target.value;
  } else {
    formInfo.productQty = 0;
  }

  if (e.target.value && formInfo.color) {
    elements.formButton.removeAttribute("disabled");
  } else {
    if (elements.formButton.attributes.length < 2) {
      elements.formButton.setAttribute("disabled", "");
    }
  }
});
elements.formInput.addEventListener("change", (e) => {});
elements.form.addEventListener("submit", buyProduct);
elements.colorThemeToggle.addEventListener("click", colorThemeSwitch);
elements.navBarButton.addEventListener("click", changeNavBarMenuVisible);
elements.footerButton.addEventListener("click", upScroll);

window.addEventListener("scroll", changeUpButtonVisibility);
elements.upButton.addEventListener("click", upScroll);
