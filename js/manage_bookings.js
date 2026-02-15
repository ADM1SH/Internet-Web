document.addEventListener('DOMContentLoaded', () => {
    const renderBookings = () => {
        const bookings = db.getBookings();
        const tbody = document.querySelector("#bookingsTable tbody");
        if (tbody) {
            tbody.innerHTML = bookings.map((b, index) => `
                <tr>
                    <td>${b.customer}</td>
                    <td>${b.facility}</td>
                    <td>${b.date}</td>
                    <td>${b.time}</td>
                    <td>${b.status}</td>
                    <td>
                        <button class="edit-btn" onclick="editBooking(${index})">Edit</button>
                        <button class="delete-btn" onclick="deleteBooking(${index})">Delete</button>
                    </td>
                </tr>
            `).join('');
        }
    };

    window.deleteBooking = (index) => {
        if (confirm("Are you sure?")) {
            const bookings = db.getBookings();
            bookings.splice(index, 1);
            db.saveBookings(bookings);
            renderBookings();
        }
    };

    window.editBooking = (index) => {
        const bookings = db.getBookings();
        const b = bookings[index];
        const facilities = db.getFacilities();
        
        const facSelect = document.getElementById('bookFacility');
        facSelect.innerHTML = facilities.map(f => `<option value="${f.name}">${f.name}</option>`).join('');

        document.getElementById('bookingIndex').value = index;
        document.getElementById('displayCustomer').innerText = b.customer;
        document.getElementById('bookFacility').value = b.facility;
        document.getElementById('bookDate').value = b.date;
        document.getElementById('bookTime').value = b.time;
        document.getElementById('bookStatus').value = b.status;
        document.getElementById('editFormContainer').style.display = 'block';
    };

    const form = document.getElementById('bookingForm');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const index = document.getElementById('bookingIndex').value;
            const bookings = db.getBookings();
            
            bookings[index].facility = document.getElementById('bookFacility').value;
            bookings[index].date = document.getElementById('bookDate').value;
            bookings[index].time = document.getElementById('bookTime').value;
            bookings[index].status = document.getElementById('bookStatus').value;

            db.saveBookings(bookings);
            document.getElementById('editFormContainer').style.display = 'none';
            renderBookings();
        };
    }

    window.hideEditForm = () => {
        document.getElementById('editFormContainer').style.display = 'none';
    };

    renderBookings();
});
