// Auth & Global UI Logic
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    checkAuthState();
    setupAuthForms();
    setupGlobalUI();
});

function initTheme() {
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('bg-slate-900', 'text-slate-100');
        document.body.classList.remove('bg-slate-50', 'text-slate-800');
    } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('bg-slate-900', 'text-slate-100');
        document.body.classList.add('bg-slate-50', 'text-slate-800');
    }
}

function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('bg-slate-900', 'text-slate-100');
        document.body.classList.add('bg-slate-50', 'text-slate-800');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        document.body.classList.add('bg-slate-900', 'text-slate-100');
        document.body.classList.remove('bg-slate-50', 'text-slate-800');
        localStorage.setItem('theme', 'dark');
    }
}

function setupGlobalUI() {
    const navbarAuthDiv = document.querySelector('nav .flex.items-center.space-x-4');
    if (!navbarAuthDiv) return;

    // Wishlist Button
    const wishlistLink = document.createElement('a');
    wishlistLink.href = 'wishlist.html';
    wishlistLink.className = 'relative group mr-2';
    wishlistLink.title = 'Wishlist';
    wishlistLink.innerHTML = `
        <svg class="w-6 h-6 text-slate-300 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
        <span id="wishlistBadge" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center opacity-0 transition-opacity">0</span>
    `;
    navbarAuthDiv.insertBefore(wishlistLink, navbarAuthDiv.firstChild);

    // Dark Mode Toggle Button
    const themeBtn = document.createElement('button');
    themeBtn.onclick = toggleTheme;
    themeBtn.className = 'mr-4 text-slate-300 hover:text-cyan-400 transition-colors focus:outline-none';
    themeBtn.title = 'Toggle Dark Mode';
    themeBtn.innerHTML = `
        <svg class="w-6 h-6 dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
        <svg class="w-6 h-6 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
    `;
    navbarAuthDiv.insertBefore(themeBtn, navbarAuthDiv.firstChild);

    // Admin Link (jika login sebagai admin)
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.email === 'admin@nurdinshop.com') {
        const adminLink = document.createElement('a');
        adminLink.href = 'admin.html';
        adminLink.className = 'text-sm font-bold text-cyan-400 hover:text-cyan-300 mr-4';
        adminLink.innerText = 'Panel Admin';
        navbarAuthDiv.insertBefore(adminLink, navbarAuthDiv.firstChild);
    }

    updateWishlistBadge();
}

window.updateWishlistBadge = function() {
    const wishlistBadge = document.getElementById('wishlistBadge');
    if (!wishlistBadge) return;
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (wishlist.length > 0) {
        wishlistBadge.textContent = wishlist.length;
        wishlistBadge.classList.remove('opacity-0');
        wishlistBadge.classList.add('opacity-100');
    } else {
        wishlistBadge.classList.add('opacity-0');
        wishlistBadge.classList.remove('opacity-100');
    }
};

function checkAuthState() {
    const authBtn = document.getElementById('authBtn');
    if (!authBtn) return;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        authBtn.innerHTML = `
            <div class="flex items-center space-x-2">
                <div class="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-800 font-bold text-xs">
                    ${currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span>Hi, ${currentUser.name.split(' ')[0]}</span>
            </div>
        `;
        authBtn.href = "orders.html"; 
        authBtn.title = "Lihat Riwayat Pesanan";
        authBtn.classList.remove('bg-gradient-to-r', 'from-blue-600', 'to-cyan-500', 'text-white');
        authBtn.classList.add('bg-white', 'text-navy-900', 'border', 'border-slate-200');
        
        const logoutBtn = document.createElement('button');
        logoutBtn.className = "text-sm text-red-500 hover:text-red-700 font-medium transition-colors border border-red-100 hover:bg-red-50 px-3 py-2 rounded-full ml-2";
        logoutBtn.innerHTML = "Logout";
        
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if(confirm('Apakah Anda yakin ingin logout?')) {
                localStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            }
        });
        
        authBtn.parentNode.insertBefore(logoutBtn, authBtn.nextSibling);
    }
}

function setupAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const errorMsg = document.getElementById('regError');

            let users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Hardcode Admin Account
            if (users.length === 0) {
                users.push({name: 'Super Admin', email: 'admin@nurdinshop.com', password: 'password123'});
            }

            if (users.find(u => u.email === email)) {
                errorMsg.classList.remove('hidden');
                return;
            }

            users.push({ name, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            
            alert('Registrasi berhasil! Silakan login.');
            window.location.href = 'login.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMsg = document.getElementById('loginError');

            let users = JSON.parse(localStorage.getItem('users')) || [];
            // Admin fallback inject
            if (!users.find(u => u.email === 'admin@nurdinshop.com')) {
                users.push({name: 'Super Admin', email: 'admin@nurdinshop.com', password: 'password123'});
                localStorage.setItem('users', JSON.stringify(users));
            }

            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email }));
                if(user.email === 'admin@nurdinshop.com') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'index.html';
                }
            } else {
                errorMsg.classList.remove('hidden');
            }
        });
    }
}
