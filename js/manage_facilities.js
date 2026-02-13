window.onload = function() {
    if (document.getElementById("brandName")) {
        document.getElementById("brandName").classList.add("active");
    }

    loadFacilities();

    document.getElementById("facilityForm").onsubmit = function(e) {
        e.preventDefault();

        var name = document.getElementById("facName").value;
        var type = document.getElementById("facType").value;
        var price = document.getElementById("facPrice").value;
        var index = document.getElementById("facilityIndex").value;

        var facilityList = JSON.parse(localStorage.getItem("facilityList")) || [];

        var facilityData = {
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
    var facilityList = JSON.parse(localStorage.getItem("facilityList")) || [];

    if (facilityList.length === 0) {
        facilityList = [
            { name: "Badminton Court 1", type: "Badminton", price: "20.00" },
            { name: "Futsal Court A", type: "Futsal", price: "80.00" }
        ];
        localStorage.setItem("facilityList", JSON.stringify(facilityList));
    }

    var tbody = document.querySelector("#facilitiesTable tbody");
    tbody.innerHTML = "";

    for (var i = 0; i < facilityList.length; i++) {
        var fac = facilityList[i];
        var row = tbody.insertRow();

        row.insertCell(0).innerHTML = fac.name;
        row.insertCell(1).innerHTML = fac.type;
        row.insertCell(2).innerHTML = "RM " + fac.price;

        var actionCell = row.insertCell(3);

        var editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit/Update Price";
        editBtn.className = "edit-btn";
        editBtn.onclick = (function(idx) {
            return function() {
                editFacility(idx);
            };
        })(i);

        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = (function(idx) {
            return function() {
                deleteFacility(idx);
            };
        })(i);

        actionCell.appendChild(editBtn);
        actionCell.appendChild(deleteBtn);
    }
}

function editFacility(index) {
    var facilityList = JSON.parse(localStorage.getItem("facilityList"));
    var fac = facilityList[index];

    document.getElementById("facName").value = fac.name;
    document.getElementById("facType").value = fac.type;
    document.getElementById("facPrice").value = fac.price;
    document.getElementById("facilityIndex").value = index;

    document.getElementById("formTitle").innerHTML = "Update Facility: " + fac.name;
    document.getElementById("submitBtn").innerHTML = "Update Facility";
}

function deleteFacility(index) {
    if (confirm("Delete this facility?")) {
        var facilityList = JSON.parse(localStorage.getItem("facilityList"));
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
