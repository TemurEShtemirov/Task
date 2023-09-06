const API_URL = 'https://jsonplaceholder.typicode.com/posts';

let currentPage = 1;
const productsPerPage = 20;
let products = [];

async function fetchProducts(page) {
    const response = await fetch(`${API_URL}?_page=${page}&_limit=${productsPerPage}`);
    products = await response.json();
    return products;
}

function renderProducts() {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <div class="col-sm-6 mb-3 mb-sm-0 m-5">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.body}</p>
        <button class="btn btn-primary" onclick="addToCart(${product.id}, '${product.title}')">Add to Cart</button>
      </div>
    </div>
  </div>
        `;
        productContainer.appendChild(productElement);
    });
}

function updatePagination() {
    const currentPageElement = document.getElementById('currentPage');
    currentPageElement.textContent = `Page ${currentPage}`;
}

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchAndRenderProducts();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    currentPage++;
    fetchAndRenderProducts();
});

function addToCart(productId, productName) {
    const cart = document.getElementById('cart');
    const cartItem = document.createElement('li');
    cartItem.textContent = productName;
    cart.appendChild(cartItem);
}

async function fetchAndRenderProducts() {
    products = await fetchProducts(currentPage);
    renderProducts();
    updatePagination();
}

fetchAndRenderProducts();
