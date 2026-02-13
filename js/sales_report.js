function generateReport() {
    const bookings = JSON.parse(localStorage.getItem("bookingList")) || [];
    const monthlySales = {};
    let grandTotal = 0;

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    bookings.forEach(b => {
        if (b.status === "Confirmed") {
            const dateParts = b.date.split("-");
            const monthLabel = monthNames[parseInt(dateParts[1]) - 1] + " " + dateParts[0];

            
            const income = b.price || 0; 
            grandTotal += income;

            if (!monthlySales[monthLabel]) {
                monthlySales[monthLabel] = { count: 0, income: 0 };
            }

            monthlySales[monthLabel].count++;
            monthlySales[monthLabel].income += income;
        }
    });

    document.getElementById("monthlyRevenue").innerText = "RM " + grandTotal.toFixed(2);
    document.getElementById("totalBookings").innerText = bookings.length;
    
    const tbody = document.querySelector("#salesTable tbody");
    tbody.innerHTML = Object.keys(monthlySales).map(label => `
        <tr>
            <td>${label}</td>
            <td>${monthlySales[label].count}</td>
            <td>RM ${monthlySales[label].income.toFixed(2)}</td>
        </tr>
    `).join("");
}