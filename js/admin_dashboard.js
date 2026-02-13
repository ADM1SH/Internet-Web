window.onload = function()
{
    const updateClock = () => {
        const now = new Date();
        const clockEl = document.getElementById('currentTime');
        if (clockEl) clockEl.innerText = now.toLocaleString();
    };

    setInterval(updateClock, 1000);
    updateClock();

    const bookings = JSON.parse(localStorage.getItem('bookingList')) || [];
    const facilities = JSON.parse(localStorage.getItem('facilityList')) || [];

    const prices = {};
    facilities.forEach(f => prices[f.name] = parseFloat(f.price));

    const activeBookings = bookings.filter(b => b.status === "Confirmed");
    const totalRevenue = activeBookings.reduce((sum, b) => sum + (prices[b.facility] || 0), 0);

    const statCards = document.querySelectorAll('.stat-number');
    if (statCards.length >= 2) {
        statCards[0].innerText = activeBookings.length;
        statCards[1].innerText = "RM " + totalRevenue.toFixed(2);
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.onclick = function() {
            if (this.innerText !== "Logout") {
                console.log("Navigating to: " + this.innerText);
            }
        };
    });
};
