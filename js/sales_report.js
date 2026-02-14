document.addEventListener('DOMContentLoaded', () => {
    const bookings = db.getBookings();
    const tbody = document.querySelector("#salesTable tbody");
    let total = 0;

    if (tbody) {
        tbody.innerHTML = bookings.map(b => {
            const price = parseFloat(b.price || 0);
            total += price;
            return `
                <tr>
                    <td>${b.date}</td>
                    <td>${b.customer}</td>
                    <td>${b.facility}</td>
                    <td>${b.paymentMethod || 'Card'}</td>
                    <td>RM ${price.toFixed(2)}</td>
                </tr>
            `;
        }).join('');
        document.getElementById('totalRevenue').innerText = `RM ${total.toFixed(2)}`;
    }
});

window.downloadCSV = () => {
    const bookings = db.getBookings();
    let csv = "Date,Customer,Facility,Payment,Amount\n";
    bookings.forEach(b => {
        csv += `${b.date},${b.customer},${b.facility},${b.paymentMethod || 'Card'},${b.price}\n`;
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
