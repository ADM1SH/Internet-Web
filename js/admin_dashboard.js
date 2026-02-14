document.addEventListener('DOMContentLoaded', () => {
    const players = db.getPlayers();
    const staff = db.getStaff();
    const bookings = db.getBookings();

    document.getElementById('totalMembers').innerText = players.length;
    document.getElementById('totalStaff').innerText = staff.length;
    document.getElementById('totalBookings').innerText = bookings.length;

    const revenue = bookings.reduce((sum, b) => sum + parseFloat(b.price || 0), 0);
    document.getElementById('totalRevenue').innerText = `RM ${revenue.toFixed(2)}`;

    const tbody = document.querySelector('#recentBookingsTable tbody');
    if (tbody) {
        tbody.innerHTML = bookings.slice(-5).reverse().map(b => `
            <tr>
                <td>${b.customer}</td>
                <td>${b.facility}</td>
                <td>${b.date}</td>
                <td><span class="status-pill status-paid">${b.status}</span></td>
            </tr>
        `).join('');
    }
});
