let carts = document.querySelectorAll(".add-cart");

let products = [
  {
    name: "NIKE Tshirt",
    tag: "T-shirt",
    price: 25,
    inCart: 0,
  },
  {
    name: "NIKE Casquette",
    tag: "Casquette",
    price: 20,
    inCart: 0,
  },
  {
    name: "NIKE Crampon",
    tag: "Crampon",
    price: 60,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  console.log("My cartCost is", cartCost);
  console.log(typeof cartCost);

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
        <div class="product">
          <div>
            <button class='button'>Remove</button>
          </div>
          <img src="./Image/${item.tag}.jpg" width ="10%">
          <span>${item.name}</span>
          <div class="price">$${item.price},00</div>
          <div class="quantity">
             <ion-icon name="arrow-dropleft-circle"></ion-icon>
             <span>${item.inCart}</span>
             <ion-icon name="arrow-dropright-circle"></ion-icon>
          </div>
          <div class="total">
          $${item.inCart * item.price},00
          </div>
        </div>
        
      `;
    });

    productContainer.innerHTML += `
      <div class="NikeTotalContainer">
        <h4 class="NikeTotalTitle">
            NIKE Total
        </h4>
        <h4 class="NikeTotal">
          $${cartCost},00
        </h4>
    `;
  }
}
var removeCartItemsButtons = document.getElementsByClassName("button");
console.log(removeCartItemsButtons);
for (let i = 0; i < removeCartItemsButtons.length; i++) {
  var button = removeCartItemsButtons[i];
  button.addEventListener("click", function () {
    console.log("clicked");
  });
}
onLoadCartNumbers();
displayCart();
