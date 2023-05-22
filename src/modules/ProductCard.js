class ProductCard extends Object {
  constructor(image, name, date) {
    super();
    this.image = image;
    this.name = name;
    this.date = date;
  }

  createElement(parent) {
    const productCard = document.createElement("li");
    const image = document.createElement("img");
    const name = document.createElement("p");
    const addedAt = document.createElement("p");
    const date = document.createElement("p");
    const button = document.createElement("button");
    const buttonImage = document.createElement("img");

    productCard.classList.add("product-list__item");
    image.classList.add("item__image");
    name.classList.add("item__info");
    addedAt.classList.add("item__info");
    date.classList.add("item__info");
    addedAt.classList.add("item__info_added");
    button.classList.add("button");
    buttonImage.classList.add("cart");

    image.src = this.image;
    image.alt = "product-image";
    name.innerText = this.name;
    addedAt.innerText = "Добавлен:";
    date.innerText = this.date;
    button.innerText = "Купить";
    buttonImage.src = "/src/assets/icons/cart.svg";
    buttonImage.alt = "cart-logo";

    productCard.appendChild(image);
    productCard.appendChild(name);
    productCard.appendChild(addedAt);
    productCard.appendChild(date);
    button.appendChild(buttonImage);
    productCard.appendChild(button);

    parent.appendChild(productCard);
  }
}

export { ProductCard };
