import elements from "./HTMLElements.js";
import { ProductCard } from "./ProductCard.js";
import { tvsList, phonesList, laptopsList } from "./ProductsInfo.js";
import helpers from "./helpers.js";

const initProducts = (productsList, productContainer) => {
  productsList.forEach(({ imgLink, name, date }) => {
    const newCard = new ProductCard(
      imgLink,
      name,
      helpers.convertDayInfo(date)
    );
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
    ? helpers.addClass(elements.formContainer, className)
    : helpers.removeClass(elements.formContainer, className);
};
buttons.forEach((el) => el.addEventListener("click", changeModalVisibility));

const changeNavBarMenuVisible = (e) => {
  e.stopPropagation();
  if (elements.navBarMenu.classList.length > 1) {
    helpers.removeClass(elements.navBarMenu, "nav-bar__menu_hidden");
  } else {
    helpers.addClass(elements.navBarMenu, "nav-bar__menu_closed");
    setTimeout(() => {
      helpers.addClass(elements.navBarMenu, "nav-bar__menu_hidden");
      helpers.removeClass(elements.navBarMenu, "nav-bar__menu_closed");
    }, 150);
  }
};
elements.navBarButton.onclick = changeNavBarMenuVisible;
elements.body.onclick = () => {
  helpers.addClass(elements.navBarMenu, "nav-bar__menu_closed");
  setTimeout(() => {
    helpers.addClass(elements.navBarMenu, "nav-bar__menu_hidden");
    helpers.removeClass(elements.navBarMenu, "nav-bar__menu_closed");
  }, 150);
};
elements.navBarMenu.onclick = (e) => e.stopPropagation();

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
elements.formContainer.onclick = changeModalVisibility;
elements.form.onclick = (e) => e.stopPropagation();
elements.modalCloseButton.onclick = (e) => {
  e.preventDefault();
  changeModalVisibility();
  elements.form.reset();
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
elements.form.addEventListener("submit", buyProduct);

helpers.animateScroll(elements.anchors);
const changeUpButtonVisibility = () => {
  const html = document.documentElement;
  window.scrollY > 300 && window.scrollY < html.scrollHeight - 1400
    ? helpers.removeClass(elements.upButton, "hidden")
    : helpers.addClass(elements.upButton, "hidden");
};
elements.footerButton.onclick = helpers.upScroll;
elements.upButton.onclick = helpers.upScroll;
window.onscroll = changeUpButtonVisibility;

const colorThemeSwitch = () => {
  const isLight = elements.body.classList.length === 0;
  isLight
    ? helpers.addClass(elements.body, "dark")
    : helpers.removeClass(elements.body, "dark");
};
elements.colorThemeToggle.onclick = colorThemeSwitch;
