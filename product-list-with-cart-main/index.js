import { product } from './data.js';
console.log(product);
let cart = [];

function totalamount(cart) {
  let total = cart.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  let totall = document.querySelector('.totalamount h3');
  if (totall) {
    totall.textContent = `$ ${total.toFixed(2)}`;
  }
  let totalll = document.querySelector('.ordertotal h2');
  if (totalll) {
    totalll.textContent = `$ ${total.toFixed(2)}`;
  }
}
function removeFromCart(itemName, cartItemDOM) {
  // Remove from cart array
  cart = cart.filter(item => item.name !== itemName);

  // Remove DOM element
  cartItemDOM.remove();

  // Update total
  totalamount(cart);
}



product.map((item, index) => {
  let quantity = 1;

  let cartContainer = document.getElementsByClassName('product-list')[0];
  let productCard = document.createElement("div");
  productCard.classList.add('product-card');

  productCard.innerHTML = `  
    <div class="product-image"><img src=${item.image.desktop}  alt=""></div>
    <button class="cart-button" data-index=${index}>
      <i class="fa-solid fa-cart-plus hover-icon"></i> 
      <i class="fa-solid fa-minus quantity-decrease"></i>
      <span class="cart-label">Add to Cart</span> 
      <i class="fa-solid fa-plus quantity-increase"></i>
    </button>
    <div class="product-details">
      <p>${item.category}</p>
      <h3>${item.name}</h3>
      <h3 class="price-text">$${item.price}</h3>
    </div>
  `;

  cartContainer.appendChild(productCard);

  let cartButton = productCard.querySelector('.cart-button');
  let cartLabel = productCard.querySelector('.cart-label');

  cartButton.addEventListener('mouseenter', (e) => {
    e.stopPropagation();
    let productimg=productCard.querySelector('.product-image img')
    if(productimg){
    productimg.classList.add('outline')
    }
    cartLabel.textContent = `${quantity}`;
  });

  cartButton.addEventListener('mouseleave', (e) => {
     let productimg=productCard.querySelector('.product-image img')
    e.stopPropagation();
    cartLabel.textContent = 'Add to Cart';
    if(productimg){
productimg.classList.remove('outline')
    }
     
  });

  let increaseBtn = productCard.querySelector('.quantity-increase');
  let decreaseBtn = productCard.querySelector('.quantity-decrease');

  increaseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log("increase")
    quantity++;
    cartLabel.textContent = `${quantity}`;
    let emptyCartNotice = document.querySelector('.popup1');
    emptyCartNotice.classList.add('none');

    let cartContentSection = document.querySelector('.popup2');
    cartContentSection.classList.add('block');
    addProductToCart(item, quantity, "increase");

  });

  decreaseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log("decrease")
    if (quantity > 1) quantity--;
    cartLabel.textContent = `${quantity}`;
    let emptyCartNotice = document.querySelector('.popup1');
    emptyCartNotice.classList.add('none');

    let cartContentSection = document.querySelector('.popup2');
    cartContentSection.classList.add('block');
    addProductToCart(item, quantity, "decrease");

  });

  cartButton.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault()
    console.log("button")

    cartLabel.textContent = `${quantity}`;
    let emptyCartNotice = document.querySelector('.popup1');
    emptyCartNotice.classList.add('none');

    let cartContentSection = document.querySelector('.popup2');
    cartContentSection.classList.add('block');
    addProductToCart(item, quantity);
    totalamount(cart)

  });
  


});

function addProductToCart(item, quantity, action) {

  let cartItemContainer = document.querySelector('.only-detail');
  let existingcart = cart.find((value) => {
    return value.name == item.name;
  })
  // console.log(existingcart);
  if (existingcart) {
    if (action == "increase") {
      existingcart.quantity++;

    }
    else if (action == "decrease") {
      if (existingcart.quantity > 1)
        existingcart.quantity--;

    }
    else if (!action) {
      existingcart.quantity = quantity;

    }

    let cartItemsDOM = cartItemContainer.querySelectorAll('.detail1');
    totalamount(cart)

    cartItemsDOM.forEach(cartItemDOM => {
      let itemName = cartItemDOM.querySelector('h5').textContent;
      if (itemName === item.name) {
        const qtySpan = cartItemDOM.querySelector('.four');
        const totalPriceSpan = cartItemDOM.querySelector('h6').lastChild;

        qtySpan.textContent = ` $ ${existingcart.quantity}`;
        totalPriceSpan.textContent = `$ ${existingcart.quantity * item.price}`;
      }
    }

    )
  }
  else {
    cart.push({
      ...item, quantity
    })
    let cartItem = document.createElement("div");
    cartItem.classList.add('detail1');

    cartItem.innerHTML = `
    <div class="detailleft">
      <h5>${item.name}</h5>
      <div class="detailleft1">
        <h6>
          <span class="four">$ ${quantity}</span>&nbsp;&nbsp;&nbsp;
          <span class="amount">@$ ${item.price}</span>&nbsp;&nbsp;
          $ ${item.price * quantity}
        </h6>
      </div>
    </div>
    <div class="detailright">
      <i class="fa-solid fa-circle-xmark"></i>
    </div>
  `;
    cartItem.querySelector('.detailright').addEventListener('click', () => {
      removeFromCart(item.name, cartItem);
    });
    totalamount(cart)
    cartItemContainer.append(cartItem);
    update()
  }
  
}
function removeitem(cart) {

}
  let confirmorder=document.querySelector('.confirm-order')
let Totalbillpopup=document.querySelector('.total-bill-popup')
confirmorder.addEventListener('click',()=>{
  
  Totalbillpopup.classList.add('translate');
cart.forEach((cart)=>{
let realamountimage=document.querySelector('.real-amount-image');
  let Realamount=document.createElement("div")
  Realamount.classList.add('realamount')
  Realamount.innerHTML=` <div class="realamount-1">
      <div class="real-left">
<div class="real-amount-image"><img src=${cart.image.thumbnail} alt=""></div>
<div class="real-amount-left-content">
  <h6>${cart.category}</h6>
  <p>${cart.quantity}x <span>@${cart.price}</span></p>

</div>
      </div>
      <div class="real-right">
         $${(cart.price * cart.quantity).toFixed(2)}
      </div>
    </div>`
    let bg=document.querySelector('.bg');
    bg.appendChild(Realamount);


})
  totalamount(cart)
  
})
function update() {
  let startnew = document.querySelector('.star-new');
  let cartItemContainer = document.querySelector('.only-detail');
  let bg = document.querySelector('.bg');

  startnew.addEventListener('click', () => {
    console.log("Resetting cart...");
    cart = [];
    
    // Clear cart items from DOM
    if (cartItemContainer) {
      cartItemContainer.innerHTML = "";
    }

    // Clear order summary popup
    if (bg) {
      bg.innerHTML = "";
    }

    // Reset total
    totalamount(cart);

    // Close the popup
    Totalbillpopup.classList.remove('translate');
  });
}

