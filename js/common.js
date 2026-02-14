const db = {
    get: (key) => JSON.parse(localStorage.getItem(key)) || [],
    set: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
    
    getFacilities: () => db.get("facilityList"),
    saveFacilities: (data) => db.set("facilityList", data),
    
    getBookings: () => db.get("bookingList"),
    saveBookings: (data) => db.set("bookingList", data),
    addBooking: (booking) => {
        const list = db.getBookings();
        list.push(booking);
        db.saveBookings(list);
    },

    getPlayers: () => db.get("playerList"),
    savePlayers: (data) => db.set("playerList", data),
    getCurrentUser: () => JSON.parse(localStorage.getItem("currentUser")),
    setCurrentUser: (user) => localStorage.setItem("currentUser", JSON.stringify(user)),
    
    getStaff: () => db.get("staffList"),
    saveStaff: (data) => db.set("staffList", data)
};

document.addEventListener('DOMContentLoaded', () => {
    initDB();
    updateNav();
    
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a, .sidebar a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease-in-out';
    requestAnimationFrame(() => document.body.style.opacity = '1');
});

function initDB() {
    if (localStorage.getItem("db_initialized")) {
        return;
    }

    const defaultFacilities = [
        { name: "Badminton Court 1", type: "Badminton", price: "20.00" },
        { name: "Badminton Court 2", type: "Badminton", price: "20.00" },
        { name: "Futsal Pitch A", type: "Futsal", price: "80.00" }
    ];

    const defaultStaff = [
        { name: "System Admin", role: "Admin", username: "admin", password: "123", email: "admin@probook.com" },
        { name: "Reception", role: "Receptionist", username: "staff", password: "123", email: "staff@probook.com" }
    ];

    const defaultPlayers = [
        { name: "Demo Player", email: "player@test.com", phone: "0123456789", password: "123", status: "Active" }
    ];

    db.saveFacilities(defaultFacilities);
    db.saveStaff(defaultStaff);
    db.savePlayers(defaultPlayers);
    db.saveBookings([]);

    localStorage.setItem("db_initialized", "true");
}

function updateNav() {
    const currentUser = db.getCurrentUser();
    const navUl = document.querySelector('nav ul');
    
    if (navUl && currentUser) {
        const navLinks = navUl.querySelectorAll('li');
        navLinks.forEach(li => {
            const a = li.querySelector('a');
            if (a) {
                const href = a.getAttribute('href');
                if (href === 'login.html' || href === 'register.html' || href === 'join_us.html') {
                    li.remove();
                }
            }
        });

        const dashboardLi = document.createElement('li');
        dashboardLi.innerHTML = `<a href="user_dashboard.html">My Dashboard</a>`;
        
        const logoutLi = document.createElement('li');
        logoutLi.innerHTML = `<a href="#" id="logoutBtn">Logout</a>`;
        
        const staffPortal = Array.from(navUl.querySelectorAll('li')).find(li => li.innerText.includes('Staff Portal'));
        if (staffPortal) {
            navUl.insertBefore(dashboardLi, staffPortal);
            navUl.insertBefore(logoutLi, staffPortal);
        } else {
            navUl.appendChild(dashboardLi);
            navUl.appendChild(logoutLi);
        }

        document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem("currentUser");
            window.location.href = "index.html";
        });
    }
}
