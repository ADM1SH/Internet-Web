window.onload = function() {
    if (document.getElementById("brandName")) {
        document.getElementById("brandName").classList.add("active");
    }

    loadFacilitiesDropdown();
    loadBookings();

    document.getElementById("bookingForm").onsubmit = function(e) {
        e.preventDefault();

        var facility = document.getElementById("bookFacility").value;
        var date = document.getElementById("bookDate").value;
        var time = document.getElementById("bookTime").value;
        var status = document.getElementById("bookStatus").value;
        var index = document.getElementById("bookingIndex").value;

        var bookingList = JSON.parse(localStorage.getItem("bookingList"));

        bookingList[index].facility = facility;
        bookingList[index].date = date;
        bookingList[index].time = time;
        bookingList[index].status = status;

        localStorage.setItem("bookingList", JSON.stringify(bookingList));

        hideEditForm();
        loadBookings();
        alert("Booking updated successfully!");
    };
};

function loadFacilitiesDropdown() {
    var facilities = JSON.parse(localStorage.getItem("facilityList")) || [];
    var select = document.getElementById("bookFacility");
    select.innerHTML = "";

    for (var i = 0; i < facilities.length; i++) {
        var opt = document.createElement("option");
        opt.value = facilities[i].name;
        opt.innerHTML = facilities[i].name;
        select.appendChild(opt);
    }
}

function loadBookings() {
    var bookingList = JSON.parse(localStorage.getItem("bookingList")) || [];

    if (bookingList.length === 0) {
        bookingList = [
            { customer: "John Doe", facility: "Badminton Court 1", date: "2026-02-10", time: "10:00", status: "Confirmed" },
            { customer: "Jane Smith", facility: "Futsal Court A", date: "2026-02-12", time: "20:00", status: "Pending" }
        ];
        localStorage.setItem("bookingList", JSON.stringify(bookingList));
    }

    var tbody = document.querySelector("#bookingsTable tbody");
    tbody.innerHTML = "";

    for (var i = 0; i < bookingList.length; i++) {
        var book = bookingList[i];
        var row = tbody.insertRow();

        row.insertCell(0).innerHTML = book.customer;
        row.insertCell(1).innerHTML = book.facility;
        row.insertCell(2).innerHTML = book.date;
        row.insertCell(3).innerHTML = book.time;

        var statusCell = row.insertCell(4);
        statusCell.innerHTML = book.status;
        statusCell.className = "status-" + book.status.toLowerCase();

        var actionCell = row.insertCell(5);

        var editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.className = "edit-btn";
        editBtn.onclick = (function(idx) {
            return function() {
                showEditForm(idx);
            };
        })(i);

        var cancelBtn = document.createElement("button");
        cancelBtn.innerHTML = "Cancel";
        cancelBtn.className = "cancel-btn";
        cancelBtn.onclick = (function(idx) {
            return function() {
                cancelBooking(idx);
            };
        })(i);

        actionCell.appendChild(editBtn);
        actionCell.appendChild(cancelBtn);
    }
}

function showEditForm(index) {
    var bookingList = JSON.parse(localStorage.getItem("bookingList"));
    var book = bookingList[index];

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
    document.getElementById("editFormContainer").style.display = "none";
}

function cancelBooking(index) {
    if (confirm("Are you sure you want to cancel this booking?")) {
        var bookingList = JSON.parse(localStorage.getItem("bookingList"));
        bookingList[index].status = "Cancelled";
        localStorage.setItem("bookingList", JSON.stringify(bookingList));
        loadBookings();
    }
}
