window.onload = function() {
    if (document.getElementById("brandName")) {
        document.getElementById("brandName").classList.add("active");
    }

    generateReport();
};

function generateReport() {
    var bookings = JSON.parse(localStorage.getItem("bookingList")) || [];
    var facilities = JSON.parse(localStorage.getItem("facilityList")) || [];

    // Create a price map for quick lookup
    var prices = {};
    for (var i = 0; i < facilities.length; i++) {
        prices[facilities[i].name] = parseFloat(facilities[i].price);
    }

    var monthlySales = {};
    var grandTotal = 0;

    for (var j = 0; j < bookings.length; j++) {
        var b = bookings[j];

        // Only count Confirmed bookings for revenue
        if (b.status === "Confirmed") {
            // Extract month and year from YYYY-MM-DD
            var dateParts = b.date.split("-");
            var year = dateParts[0];
            var monthNum = parseInt(dateParts[1]);
            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var monthLabel = monthNames[monthNum - 1] + " " + year;

            var bookingPrice = prices[b.facility] || 0;
            grandTotal += bookingPrice;

            if (!monthlySales[monthLabel]) {
                monthlySales[monthLabel] = {
                    count: 0,
                    income: 0
                };
            }

            monthlySales[monthLabel].count++;
            monthlySales[monthLabel].income += bookingPrice;
        }
    }

    // Update Grand Total display
    document.getElementById("grandTotal").innerHTML = "RM " + grandTotal.toFixed(2);

    // Update Table
    var tbody = document.querySelector("#salesTable tbody");
    tbody.innerHTML = "";

    // Convert keys to array and sort (optional, but good for display)
    var labels = Object.keys(monthlySales);

    if (labels.length === 0) {
        tbody.innerHTML = "<tr><td colspan='3' style='text-align:center;'>No confirmed sales data available.</td></tr>";
    } else {
        for (var k = 0; k < labels.length; k++) {
            var label = labels[k];
            var row = tbody.insertRow();
            row.insertCell(0).innerHTML = label;
            row.insertCell(1).innerHTML = monthlySales[label].count;
            row.insertCell(2).innerHTML = "RM " + monthlySales[label].income.toFixed(2);
        }
    }
}
