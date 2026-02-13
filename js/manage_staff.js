window.onload = function() {
    if (document.getElementById("brandName")) {
        document.getElementById("brandName").classList.add("active");
    }

    loadStaff();

    document.getElementById("addStaffForm").onsubmit = function(e) {
        e.preventDefault();

        var name = document.getElementById("name").value;
        var role = document.getElementById("role").value;
        var email = document.getElementById("email").value;

        var staffList = JSON.parse(localStorage.getItem("staffList")) || [];

        var newStaff = {
            name: name,
            role: role,
            email: email
        };

        staffList.push(newStaff);
        localStorage.setItem("staffList", JSON.stringify(staffList));

        this.reset();
        loadStaff();
        alert("Staff member added successfully!");
    };
};

function loadStaff() {
    var staffList = JSON.parse(localStorage.getItem("staffList")) || [];

    if (staffList.length === 0) {
        staffList = [
            { name: "Ali Hassan", role: "Receptionist", email: "ali@probook.com" },
            { name: "Siti Aminah", role: "Maintenance Crew", email: "siti@probook.com" }
        ];
        localStorage.setItem("staffList", JSON.stringify(staffList));
    }

    var tbody = document.querySelector("#staffTable tbody");
    tbody.innerHTML = "";

    for (var i = 0; i < staffList.length; i++) {
        var staff = staffList[i];
        var row = tbody.insertRow();

        row.insertCell(0).innerHTML = staff.name;
        row.insertCell(1).innerHTML = staff.role;
        row.insertCell(2).innerHTML = staff.email;

        var actionCell = row.insertCell(3);
        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = (function(index) {
            return function() {
                deleteStaff(index);
            };
        })(i);

        actionCell.appendChild(deleteBtn);
    }
}

function deleteStaff(index) {
    if (confirm("Are you sure you want to delete this staff member?")) {
        var staffList = JSON.parse(localStorage.getItem("staffList"));
        staffList.splice(index, 1);
        localStorage.setItem("staffList", JSON.stringify(staffList));
        loadStaff();
    }
}
