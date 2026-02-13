window.onload = function() {
    if (document.getElementById("brandName")) {
        document.getElementById("brandName").classList.add("active");
    }

    loadFacilitiesDropdown();
    loadBookings();

    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) {
        bookingForm.onsubmit = function(e) {
            e.preventDefault();

            const facility = document.getElementById("bookFacility").value;
            const date = document.getElementById("bookDate").value;
            const time = document.getElementById("bookTime").value;
            const status = document.getElementById("bookStatus").value;
            const index = document.getElementById("bookingIndex").value;

            const bookingList = JSON.parse(localStorage.getItem("bookingList")) || [];

            bookingList[index].facility = facility;
            bookingList[index].date = date;
            bookingList[index].time = time;
            bookingList[index].status = status;

            localStorage.setItem("bookingList", JSON.stringify(bookingList));

            hideEditForm();
            loadBookings();
            alert("Booking updated successfully!");
        };
    }
};

function loadFacilitiesDropdown() {
    const facilities = JSON.parse(localStorage.getItem("facilityList")) || [];
    const select = document.getElementById("bookFacility");
    if (select) {
        select.innerHTML = facilities.map(f => `<option value="${f.name}">${f.name}</option>`).join("");
    }
}

function loadBookings() {
    let bookingList = JSON.parse(localStorage.getItem("bookingList")) || [];

    if (bookingList.length === 0) {
        bookingList = [
            { customer: "John Doe", facility: "Badminton Court 1", date: "2026-02-10", time: "10:00", status: "Confirmed" },
            { customer: "Jane Smith", facility: "Futsal Court A", date: "2026-02-12", time: "20:00", status: "Pending" }
        ];
        localStorage.setItem("bookingList", JSON.stringify(bookingList));
    }

    const tbody = document.querySelector("#bookingsTable tbody");
    tbody.innerHTML = bookingList.map((book, i) => `
        <tr>
            <td>${book.customer}</td>
            <td>${book.facility}</td>
            <td>${book.date}</td>
            <td>${book.time}</td>
            <td class="status-${book.status.toLowerCase()}">${book.status}</td>
            <td>
                <button class="edit-btn" onclick="showEditForm(${i})">Edit</button>
                <button class="cancel-btn" onclick="cancelBooking(${i})">Cancel</button>
            </td>
        </tr>
    `).join("");
}

function showEditForm(index) {
    const bookingList = JSON.parse(localStorage.getItem("bookingList")) || [];
    const book = bookingList[index];

    document.getElementById("displayCustomer").innerHTML = book.customer;
    document.getElementById("bookFacility").value = book.facility;
    document.getElementById("bookDate").value = book.date;
    document.getElementById("bookTime").value = book.time;
    document.getElementById("bookStatus").value = book.status;
    document.getElementById("bookingIndex").value = index;

    document.getElementById("editFormContainer").style.display = "block";
    window.scrollTo(0,0);
}

function hideEditForm() {
    const container = document.getElementById("editFormContainer");
    if (container) container.style.display = "none";
}

function cancelBooking(index) {
    if (confirm("Are you sure you want to cancel this booking?")) {
        const bookingList = JSON.parse(localStorage.getItem("bookingList")) || [];
        bookingList[index].status = "Cancelled";
        localStorage.setItem("bookingList", JSON.stringify(bookingList));
        loadBookings();
    }
}
