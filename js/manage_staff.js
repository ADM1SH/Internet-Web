// This script is used to manage staff members and their roles in the system.
window.onload = function() {
    if (document.getElementById("brandName")) {
        document.getElementById("brandName").classList.add("active");
    }

    loadStaff();

    const staffForm = document.getElementById("addStaffForm");
    if (staffForm) {
        staffForm.onsubmit = function(e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const role = document.getElementById("role").value;
            const email = document.getElementById("email").value;

            const staffList = JSON.parse(localStorage.getItem("staffList")) || [];

            staffList.push({ name, role, email });
            localStorage.setItem("staffList", JSON.stringify(staffList));

            this.reset();
            loadStaff();
            alert("Staff member added successfully!");
        };
    }
};

function loadStaff() {
    let staffList = JSON.parse(localStorage.getItem("staffList")) || [];

    if (staffList.length === 0) {
        staffList = [
            { name: "Ali Hassan", role: "Receptionist", email: "ali@probook.com" },
            { name: "Siti Aminah", role: "Maintenance Crew", email: "siti@probook.com" }
        ];
        localStorage.setItem("staffList", JSON.stringify(staffList));
    }

    const tbody = document.querySelector("#staffTable tbody");
    tbody.innerHTML = staffList.map((staff, i) => `
        <tr>
            <td>${staff.name}</td>
            <td>${staff.role}</td>
            <td>${staff.email}</td>
            <td>
                <button class="delete-btn" onclick="deleteStaff(${i})">Delete</button>
            </td>
        </tr>
    `).join("");
}

function deleteStaff(index) {
    if (confirm("Are you sure you want to delete this staff member?")) {
        const staffList = JSON.parse(localStorage.getItem("staffList"));
        staffList.splice(index, 1);
        localStorage.setItem("staffList", JSON.stringify(staffList));
        loadStaff();
    }
}
