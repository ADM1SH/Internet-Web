window.onload = function() {
    const tempBooking = JSON.parse(localStorage.getItem('tempBooking'));

    const summaryCard = document.querySelector('.summary-card');
    if(summaryCard) {
        const paragraphs = summaryCard.querySelectorAll('p');
        paragraphs.forEach(p => {
            if(p.innerHTML.includes("Court:")) p.innerHTML = `<strong>Court:</strong> ${tempBooking.facility}`;
            if(p.innerHTML.includes("Date:")) p.innerHTML = `<strong>Date:</strong> ${tempBooking.date} (${tempBooking.time})`;
        });
        const totalSpan = summaryCard.querySelector('.total-line span:last-child');
        if(totalSpan) totalSpan.innerText = "RM " + parseFloat(tempBooking.price).toFixed(2);
    }

    const form = document.getElementById('paymentForm');
    document.querySelectorAll('input[name="pay"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.getElementById('cardDetails').style.display = (this.id === 'radioCard') ? 'block' : 'none';
            document.getElementById('bankDetails').style.display = (this.id === 'radioBank') ? 'block' : 'none';
            document.getElementById('qrDetails').style.display = (this.id === 'radioQR') ? 'block' : 'none';
            
            const isCard = (this.id === 'radioCard');
            document.getElementById('cardNumber').required = isCard;
            document.getElementById('cardExpiry').required = isCard;
            document.getElementById('cardCVV').required = isCard;
        });
    });

    form.onsubmit = function(e) {
        e.preventDefault();

        const currentUser = db.getCurrentUser();
        const customerName = currentUser ? currentUser.name : "Guest User";

        const finalBooking = {
            id: Date.now(), 
            customer: customerName,
            facility: tempBooking.facility,
            date: tempBooking.date,
            time: tempBooking.time,
            price: tempBooking.price,
            status: "Confirmed", 
            paymentMethod: document.querySelector('input[name="pay"]:checked').nextSibling.textContent.trim()
        };

        db.addBooking(finalBooking);
        localStorage.removeItem("tempBooking"); 
        window.location.href = "feedback.html";
    };
};
