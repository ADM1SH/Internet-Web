window.onload = function() {
    if (document.getElementById("brandName")) {
        document.getElementById("brandName").classList.add("active");
    }

    generateReport();
};

function generateReport() {
    const bookings = JSON.parse(localStorage.getItem("bookingList")) || [];
    const facilities = JSON.parse(localStorage.getItem("facilityList")) || [];

    const prices = facilities.reduce((acc, fac) => {
        acc[fac.name] = parseFloat(fac.price);
        return acc;
    }, {});

    const monthlySales = {};
    let grandTotal = 0;

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    bookings.forEach(b => {
        if (b.status === "Confirmed") {
            const dateParts = b.date.split("-");
            const year = dateParts[0];
            const monthNum = parseInt(dateParts[1]);
            const monthLabel = monthNames[monthNum - 1] + " " + year;

            const bookingPrice = prices[b.facility] || 0;
            grandTotal += bookingPrice;

            if (!monthlySales[monthLabel]) {
                monthlySales[monthLabel] = { count: 0, income: 0 };
            }

            monthlySales[monthLabel].count++;
            monthlySales[monthLabel].income += bookingPrice;
        }
    });

    const grandTotalEl = document.getElementById("grandTotal");
    if (grandTotalEl) grandTotalEl.innerHTML = "RM " + grandTotal.toFixed(2);

    const tbody = document.querySelector("#salesTable tbody");
    if (!tbody) return;

    const labels = Object.keys(monthlySales);

    if (labels.length === 0) {
        tbody.innerHTML = "<tr><td colspan='3' style='text-align:center;'>No confirmed sales data available.</td></tr>";
    } else {
        tbody.innerHTML = labels.map(label => `
            <tr>
                <td>${label}</td>
                <td>${monthlySales[label].count}</td>
                <td>RM ${monthlySales[label].income.toFixed(2)}</td>
            </tr>
        `).join("");
    }
}
