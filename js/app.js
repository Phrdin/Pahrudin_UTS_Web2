// State Management
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Pagination State
let currentPage = 1;
const itemsPerPage = 4;
let filteredProducts = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartBadge = document.getElementById('cartBadge');
const toastContainer = document.getElementById('toastContainer');

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    updateCartBadge();
});

// Fetch Products from JSON Variable
async function fetchProducts() {
    try {
        await new Promise(resolve => setTimeout(resolve, 800));
        products = productsData;
        filteredProducts = products;
        renderProducts();
    } catch (error) {
        console.error('Error fetching products:', error);
        productGrid.innerHTML = `<div class="col-span-full text-center text-red-500 py-10">Gagal memuat katalog produk.</div>`;
    }
}

const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0
    }).format(number);
};

// Generate Stars HTML based on rating
function renderStars(rating) {
    let stars = '';
    for(let i=1; i<=5; i++) {
        if(i <= Math.floor(rating)) {
            stars += `<svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
        } else {
            stars += `<svg class="w-4 h-4 text-slate-300 dark:text-slate-600 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
        }
    }
    return stars;
}

function renderProducts(append = false) {
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = `<div class="col-span-full text-center text-slate-500 py-10 font-medium">Outfit tidak ditemukan.</div>`;
        return;
    }

    const start = 0;
    const end = currentPage * itemsPerPage;
    const itemsToShow = filteredProducts.slice(start, end);

    const html = itemsToShow.map(product => {
        const isWishlisted = wishlist.includes(product.id);
        const heartColor = isWishlisted ? 'text-red-500 fill-current' : 'text-slate-400 hover:text-red-500';

        const itemsListHTML = product.items.map(item => 
            `<li class="flex items-center text-sm text-slate-600 dark:text-slate-300 mb-1">
                <svg class="w-4 h-4 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="capitalize font-medium mr-1">${item.type}:</span> ${item.name}
            </li>`
        ).join('');

        return `
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 overflow-hidden group">
            <div class="relative h-72 overflow-hidden bg-slate-100 dark:bg-slate-700">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='https://placehold.co/400x500/e2e8f0/64748b?text=No+Image'">
                <div class="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-navy-900 dark:text-white shadow-sm">
                    ${product.category}
                </div>
                <!-- Wishlist Button -->
                <button onclick="toggleWishlist('${product.id}', this)" class="absolute top-4 left-4 p-2 bg-white/90 dark:bg-slate-900/90 rounded-full shadow-sm focus:outline-none transition-colors">
                    <svg class="w-5 h-5 ${heartColor} transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </button>
            </div>
            <div class="p-5">
                <!-- Rating -->
                <div class="flex items-center mb-2">
                    <div class="flex">${renderStars(product.rating || 0)}</div>
                    <span class="text-xs text-slate-500 ml-2">(${product.reviews} ulasan)</span>
                </div>
                
                <h3 class="text-xl font-bold text-navy-900 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">${product.name}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">${product.description}</p>
                
                <div class="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-xl mb-4 border border-slate-100 dark:border-slate-600">
                    <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Isi Bundle:</p>
                    <ul class="mb-0">
                        ${itemsListHTML}
                    </ul>
                </div>
                
                <div class="flex items-center justify-between mt-auto pt-2">
                    <span class="text-xl font-extrabold text-navy-900 dark:text-white">${formatRupiah(product.price)}</span>
                    <button onclick="addToCart('${product.id}')" class="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white p-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2" title="1-Klik Beli 1 Set">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    </button>
                </div>
            </div>
        </div>
        `;
    }).join('');

    productGrid.innerHTML = html;

    // Pagination: Load More Button Logic
    let loadMoreBtn = document.getElementById('loadMoreBtn');
    if (end < filteredProducts.length) {
        if (!loadMoreBtn) {
            loadMoreBtn = document.createElement('div');
            loadMoreBtn.id = 'loadMoreBtn';
            loadMoreBtn.className = 'col-span-full flex justify-center mt-8';
            loadMoreBtn.innerHTML = `<button onclick="loadMore()" class="bg-white dark:bg-slate-800 text-navy-900 dark:text-white border-2 border-navy-900 dark:border-cyan-500 px-8 py-3 rounded-full font-bold hover:bg-navy-900 hover:text-white dark:hover:bg-cyan-500 transition-all shadow-sm">Tampilkan Lebih Banyak</button>`;
            productGrid.parentNode.insertBefore(loadMoreBtn, productGrid.nextSibling);
        } else {
            loadMoreBtn.style.display = 'flex';
        }
    } else if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    }
}

// Pagination action
window.loadMore = () => {
    currentPage++;
    renderProducts();
};

// Wishlist Action
window.toggleWishlist = (id, btnElement) => {
    const index = wishlist.indexOf(id);
    const svg = btnElement.querySelector('svg');
    
    if (index > -1) {
        wishlist.splice(index, 1);
        svg.classList.remove('text-red-500', 'fill-current');
        svg.classList.add('text-slate-400');
        showToast('Info', 'Produk dihapus dari wishlist.', 'error');
    } else {
        wishlist.push(id);
        svg.classList.add('text-red-500', 'fill-current');
        svg.classList.remove('text-slate-400');
        showToast('Berhasil!', 'Produk ditambahkan ke wishlist.', 'success');
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistBadge(); // Call to auth.js global UI
};

window.addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    showToast(`Berhasil!`, `<b>${product.name}</b> ditambahkan ke keranjang.`, 'success');
};

function updateCartBadge() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (totalItems > 0 && cartBadge) {
        cartBadge.textContent = totalItems;
        cartBadge.classList.remove('opacity-0');
        cartBadge.classList.add('opacity-100');
    } else if (cartBadge) {
        cartBadge.classList.add('opacity-0');
        cartBadge.classList.remove('opacity-100');
    }
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        
        filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm));
        if (activeFilter !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === activeFilter);
        }
        currentPage = 1;
        renderProducts();
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => {
            b.classList.remove('active', 'bg-navy-900', 'text-white', 'dark:bg-cyan-500');
            b.classList.add('bg-white', 'text-slate-600', 'dark:bg-slate-800', 'dark:text-slate-300');
        });
        e.target.classList.add('active', 'bg-navy-900', 'text-white', 'dark:bg-cyan-500');
        e.target.classList.remove('bg-white', 'text-slate-600', 'dark:bg-slate-800', 'dark:text-slate-300');

        const filter = e.target.dataset.filter;
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        
        filteredProducts = products;
        if (filter !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === filter);
        }
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchTerm));
        }
        currentPage = 1;
        renderProducts();
    });
});

function showToast(title, message, type = 'success') {
    const toast = document.createElement('div');
    const bgClass = type === 'success' ? 'border-cyan-500' : 'border-red-500';
    const iconClass = type === 'success' ? 'text-cyan-500' : 'text-red-500';
    const iconPath = type === 'success' 
        ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>'
        : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>';

    toast.className = `glass dark:bg-slate-800/90 border-l-4 ${bgClass} rounded-r-lg shadow-lg p-4 w-80 flex items-start toast-enter`;
    toast.innerHTML = `
        <div class="flex-shrink-0">
            <svg class="h-6 w-6 ${iconClass}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                ${iconPath}
            </svg>
        </div>
        <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-bold text-navy-900 dark:text-white">${title}</p>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">${message}</p>
        </div>
        <div class="ml-4 flex-shrink-0 flex">
            <button class="bg-transparent rounded-md inline-flex text-slate-400 hover:text-slate-500 focus:outline-none" onclick="this.parentElement.parentElement.remove()">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
            </button>
        </div>
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.classList.remove('toast-enter');
        toast.classList.add('toast-leave');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
