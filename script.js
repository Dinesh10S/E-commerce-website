  let cart = [];

  function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty++;
      existing.total += price;
    } else {
      cart.push({ name, price, qty: 1, total: price });
    }
    updateCart();
  }

  function increaseQty(index) {
    cart[index].qty++;
    cart[index].total = cart[index].qty * cart[index].price;
    updateCart();
  }

  function decreaseQty(index) {
    if (cart[index].qty > 1) {
      cart[index].qty--;
      cart[index].total = cart[index].qty * cart[index].price;
    } else {
      // Remove item if qty is 1 and user clicks minus
      cart.splice(index, 1);
    }
    updateCart();
  }

  function updateCart() {
    const cartTable = document.getElementById("cart-items");
    cartTable.innerHTML = "";
    let grandTotal = 0;

    cart.forEach((item, index) => {
      grandTotal += item.total;

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${item.name}</td>
        <td>₹${item.price}</td>
        <td>
          <button onclick="decreaseQty(${index})">➖</button>
          ${item.qty}
          <button onclick="increaseQty(${index})">➕</button>
        </td>
        <td>₹${item.total}</td>
        <td><button onclick="removeItem(${index})">❌</button></td>
      `;

      cartTable.appendChild(row);
    });

    document.getElementById("total").textContent = grandTotal;
  }

  function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
  }
  // Search filter
  function searchProducts() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
      const title = product.querySelector('h2').textContent.toLowerCase();
      product.style.display = title.includes(input) ? 'block' : 'none';
    });
  }

  // Category filter
  function filterCategory(category) {
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
      const productCategory = product.getAttribute('data-category');

      if (category === 'all' || productCategory === category) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  }

