window.onload = function() {
    if (document.getElementById("brandName")) {
        document.getElementById("brandName").classList.add("active");
    }

    loadFacilities();

    document.getElementById("facilityForm").onsubmit = function(e) {
        e.preventDefault();

        const name = document.getElementById("facName").value;
        const type = document.getElementById("facType").value;
        const price = document.getElementById("facPrice").value;
        const index = document.getElementById("facilityIndex").value;

        const facilityList = JSON.parse(localStorage.getItem("facilityList")) || [];

        const facilityData = {
            name: name,
            type: type,
            price: parseFloat(price).toFixed(2)
        };

        if (index === "") {
            facilityList.push(facilityData);
        } else {
            facilityList[index] = facilityData;
        }

        localStorage.setItem("facilityList", JSON.stringify(facilityList));

        resetForm();
        loadFacilities();
        alert("Facility information updated!");
    };
};

function loadFacilities() {
    let facilityList = JSON.parse(localStorage.getItem("facilityList")) || [];

    if (facilityList.length === 0) {
        facilityList = [
            { name: "Badminton Court 1", type: "Badminton", price: "20.00" },
            { name: "Futsal Court A", type: "Futsal", price: "80.00" }
        ];
        localStorage.setItem("facilityList", JSON.stringify(facilityList));
    }

    const tbody = document.querySelector("#facilitiesTable tbody");
    tbody.innerHTML = facilityList.map((fac, i) => `
        <tr>
            <td>${fac.name}</td>
            <td>${fac.type}</td>
            <td>RM ${fac.price}</td>
            <td>
                <button class="edit-btn" onclick="editFacility(${i})">Edit/Update Price</button>
                <button class="delete-btn" onclick="deleteFacility(${i})">Delete</button>
            </td>
        </tr>
    `).join("");
}

function editFacility(index) {
    const facilityList = JSON.parse(localStorage.getItem("facilityList"));
    const fac = facilityList[index];

    document.getElementById("facName").value = fac.name;
    document.getElementById("facType").value = fac.type;
    document.getElementById("facPrice").value = fac.price;
    document.getElementById("facilityIndex").value = index;

    document.getElementById("formTitle").innerHTML = "Update Facility: " + fac.name;
    document.getElementById("submitBtn").innerHTML = "Update Facility";
}

function deleteFacility(index) {
    if (confirm("Delete this facility?")) {
        const facilityList = JSON.parse(localStorage.getItem("facilityList"));
        facilityList.splice(index, 1);
        localStorage.setItem("facilityList", JSON.stringify(facilityList));
        loadFacilities();
    }
}

function resetForm() {
    document.getElementById("facilityForm").reset();
    document.getElementById("facilityIndex").value = "";
    document.getElementById("formTitle").innerHTML = "Add/Update Facility";
    document.getElementById("submitBtn").innerHTML = "Save Facility";
}
