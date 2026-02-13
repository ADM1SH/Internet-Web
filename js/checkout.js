window.onload = function() 
{
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
        alert("Please login before proceeding to checkout.");
        window.location.href = "login.html";
        return;
    }

    const selectedCourt = localStorage.getItem("selectedCourt") || "No Court Selected";
    const selectedPrice = localStorage.getItem("selectedPrice") || "0.00";
    const today = new Date().toISOString().split('T')[0]; 

    const summaryCard = document.querySelector('.summary-card');
    if (summaryCard) {
        summaryCard.innerHTML = `
            <h3>Booking Summary</h3>
            <p><strong>Court:</strong> ${selectedCourt}</p>
            <p><strong>Date:</strong> ${today}</p>
            <hr>
            <div class="total-line">
                <span>Total Amount:</span> 
                <span style="font-size: 1.5rem; color: #0A6C74; font-weight: bold;">RM ${selectedPrice}</span>
            </div>
            <button type="submit" form="paymentForm" class="payButton">Confirm & Pay</button>
        `;
    }

    const form = document.getElementById('paymentForm');
    form.onsubmit = function(e) {
        e.preventDefault();

        const bookingList = JSON.parse(localStorage.getItem("bookingList")) || [];
        const user = JSON.parse(localStorage.getItem("loggedInUser")) || { name: "Guest" };

        const newBooking = {
            customer: user.name,
            facility: selectedCourt,
            date: today,
            time: "Scheduled",
            price: parseFloat(selectedPrice),
            status: "Confirmed"
        };

        bookingList.push(newBooking);
        localStorage.setItem("bookingList", JSON.stringify(bookingList));
        
        alert("Payment Successful!");
        window.location.href = "feedback.html";
    };
};