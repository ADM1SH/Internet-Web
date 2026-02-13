initDB();

document.addEventListener('DOMContentLoaded', () => {
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

    console.log("First time setup: Loading default data...");

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

    localStorage.setItem("facilityList", JSON.stringify(defaultFacilities));
    localStorage.setItem("staffList", JSON.stringify(defaultStaff));
    localStorage.setItem("playerList", JSON.stringify(defaultPlayers));
    localStorage.setItem("bookingList", JSON.stringify([]));

    localStorage.setItem("db_initialized", "true");
}