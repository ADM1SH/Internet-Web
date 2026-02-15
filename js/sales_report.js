document.addEventListener('DOMContentLoaded', () => {
    const bookings = db.getBookings();
    const confirmedBookings = bookings.filter(b => b.status === 'Confirmed');
    
    const transBody = document.querySelector("#transactionTable tbody");
    const facBody = document.querySelector("#facilityTable tbody");
    
    let totalRevenue = 0;
    const facilityStats = {};

    confirmedBookings.forEach(b => {
        const price = parseFloat(b.price || 0);
        totalRevenue += price;

        if (!facilityStats[b.facility]) {
            facilityStats[b.facility] = { count: 0, revenue: 0 };
        }
        facilityStats[b.facility].count++;
        facilityStats[b.facility].revenue += price;
    });

    if (transBody) {
        transBody.innerHTML = confirmedBookings.map(b => `
            <tr>
                <td>${b.date}</td>
                <td>${b.customer}</td>
                <td>${b.facility}</td>
                <td>RM ${parseFloat(b.price || 0).toFixed(2)}</td>
            </tr>
        `).join('');
    }

    if (facBody) {
        facBody.innerHTML = Object.keys(facilityStats).map(facName => `
            <tr>
                <td>${facName}</td>
                <td>${facilityStats[facName].count}</td>
                <td>RM ${facilityStats[facName].revenue.toFixed(2)}</td>
            </tr>
        `).join('');
    }

    document.getElementById('monthlyRevenue').innerText = `RM ${totalRevenue.toFixed(2)}`;
    document.getElementById('totalBookings').innerText = confirmedBookings.length;
    document.getElementById('avgRevenue').innerText = `RM ${(confirmedBookings.length ? totalRevenue / confirmedBookings.length : 0).toFixed(2)}`;
});

window.downloadCSV = () => {
    const bookings = db.getBookings();
    let csv = "Date,Customer,Facility,Amount\n";
    bookings.forEach(b => {
        csv += `${b.date},${b.customer},${b.facility},${b.price}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'sales_report.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};
