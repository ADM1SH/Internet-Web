// This script generates the sales reports, showing monthly revenue and total booking counts.
window.onload = function() {
    if (document.getElementById("brandName")) {
        document.getElementById("brandName").classList.add("active");
    }

    generateReport();
};

let transactionDataForExport = [];

function generateReport() {
    const bookings = JSON.parse(localStorage.getItem("bookingList")) || [];
    const facilities = JSON.parse(localStorage.getItem("facilityList")) || [];

    const prices = facilities.reduce((acc, fac) => {
        acc[fac.name] = parseFloat(fac.price);
        return acc;
    }, {});

    const monthlySales = {};
    const facilitySales = {};
    const confirmedTransactions = [];
    
    let grandTotal = 0;
    let confirmedCount = 0;

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    bookings.forEach(b => {
        if (b.status === "Confirmed") {
            const dateParts = b.date.split("-");
            const year = dateParts[0];
            const monthNum = parseInt(dateParts[1]);
            const monthLabel = monthNames[monthNum - 1] + " " + year;

            const bookingPrice = prices[b.facility] || 0;
            grandTotal += bookingPrice;
            confirmedCount++;

            if (!monthlySales[monthLabel]) {
                monthlySales[monthLabel] = { count: 0, income: 0 };
            }
            monthlySales[monthLabel].count++;
            monthlySales[monthLabel].income += bookingPrice;

            if (!facilitySales[b.facility]) {
                facilitySales[b.facility] = { count: 0, income: 0 };
            }
            facilitySales[b.facility].count++;
            facilitySales[b.facility].income += bookingPrice;

            confirmedTransactions.push({
                date: b.date,
                customer: b.customer,
                facility: b.facility,
                amount: bookingPrice
            });
        }
    });

    transactionDataForExport = confirmedTransactions;

    const revenueEl = document.getElementById("monthlyRevenue");
    const bookingsEl = document.getElementById("totalBookings");
    const avgEl = document.getElementById("avgRevenue");

    if (revenueEl) revenueEl.innerText = "RM " + grandTotal.toFixed(2);
    if (bookingsEl) bookingsEl.innerText = confirmedCount;
    if (avgEl) {
        const avg = confirmedCount > 0 ? grandTotal / confirmedCount : 0;
        avgEl.innerText = "RM " + avg.toFixed(2);
    }

    confirmedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    const facTbody = document.querySelector("#facilityTable tbody");
    if (facTbody) {
        const facNames = Object.keys(facilitySales);
        facTbody.innerHTML = facNames.length === 0 
            ? "<tr><td colspan='3' style='text-align:center;'>No facility data.</td></tr>"
            : facNames.map(name => `
                <tr>
                    <td>${name}</td>
                    <td>${facilitySales[name].count}</td>
                    <td>RM ${facilitySales[name].income.toFixed(2)}</td>
                </tr>
            `).join("");
    }

    const transTbody = document.querySelector("#transactionTable tbody");
    if (transTbody) {
        transTbody.innerHTML = confirmedTransactions.length === 0
            ? "<tr><td colspan='4' style='text-align:center;'>No transactions.</td></tr>"
            : confirmedTransactions.map(t => `
                <tr>
                    <td>${t.date}</td>
                    <td>${t.customer}</td>
                    <td>${t.facility}</td>
                    <td>RM ${t.amount.toFixed(2)}</td>
                </tr>
            `).join("");
    }
}

window.downloadCSV = function() {
    if (transactionDataForExport.length === 0) {
        alert("No data available to export!");
        return;
    }

    let csvContent = "Date,Customer,Facility,Amount (RM)\n";

    transactionDataForExport.forEach(t => {
        csvContent += `${t.date},${t.customer},${t.facility},${t.amount.toFixed(2)}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Sports_Center_Sales_Report.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
