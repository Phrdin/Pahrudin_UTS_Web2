// Cart Logic
document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
});

// Format Rupiah
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};

function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cartItemsContainer');
    
    // Empty State
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-100 mb-6">
                    <svg class="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <h3 class="text-2xl font-bold text-navy-900 mb-2">Keranjang Masih Kosong</h3>
                <p class="text-slate-500 mb-8 max-w-sm mx-auto">Anda belum menambahkan setelan outfit ke dalam keranjang. Yuk temukan gaya terbaikmu sekarang!</p>
                <a href="index.html#katalog" class="inline-block bg-navy-900 hover:bg-navy-800 text-white px-8 py-3 rounded-full font-bold transition-all shadow-md">Mulai Belanja</a>
            </div>
        `;
        updateSummary(0);
        document.getElementById('checkoutBtn').classList.add('opacity-50', 'cursor-not-allowed', 'pointer-events-none');
        return;
    }

    document.getElementById('checkoutBtn').classList.remove('opacity-50', 'cursor-not-allowed', 'pointer-events-none');
    document.getElementById('checkoutBtn').addEventListener('click', () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(!currentUser) {
            alert('Silakan login terlebih dahulu untuk melanjutkan pembayaran.');
            window.location.href = 'login.html';
        } else {
            window.location.href = 'checkout.html';
        }
    });

    // Render items
    container.innerHTML = cart.map((item, index) => `
        <div class="flex flex-col sm:flex-row items-center border-b border-slate-100 pb-6 mb-6 last:border-0 last:pb-0 last:mb-0">
            <div class="w-full sm:w-32 h-32 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden mb-4 sm:mb-0">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/200x200/e2e8f0/64748b?text=Image'">
            </div>
            
            <div class="flex-1 sm:ml-6 flex flex-col justify-between w-full">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <span class="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-1 rounded mb-2 inline-block">${item.category}</span>
                        <h3 class="text-lg font-bold text-navy-900">${item.name}</h3>
                    </div>
                    <button onclick="removeItem('${item.id}')" class="text-slate-400 hover:text-red-500 transition-colors p-1" title="Hapus">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
                
                <div class="flex items-center justify-between w-full mt-4">
                    <div class="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                        <button onclick="updateQuantity('${item.id}', -1)" class="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-navy-900 transition-colors">-</button>
                        <span class="w-10 h-8 flex items-center justify-center text-sm font-bold text-navy-900 bg-white border-x border-slate-200">${item.quantity}</span>
                        <button onclick="updateQuantity('${item.id}', 1)" class="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-navy-900 transition-colors">+</button>
                    </div>
                    <span class="font-extrabold text-navy-900">${formatRupiah(item.price * item.quantity)}</span>
                </div>
            </div>
        </div>
    `).join('');

    // Calculate subtotal
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    updateSummary(subtotal);
}

window.updateQuantity = (id, change) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        
        // Remove item if quantity goes to 0
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }
};

window.removeItem = (id) => {
    if(confirm('Hapus outfit ini dari keranjang?')) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }
};

function updateSummary(subtotal) {
    const tax = subtotal * 0.11; // 11% PPN
    const total = subtotal + tax;

    document.getElementById('summarySubtotal').textContent = formatRupiah(subtotal);
    document.getElementById('summaryTax').textContent = formatRupiah(tax);
    document.getElementById('summaryTotal').textContent = formatRupiah(total);
}
