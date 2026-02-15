document.addEventListener('DOMContentLoaded', () => {
    const renderFacilities = () => {
        const facilities = db.getFacilities();
        const tbody = document.querySelector("#facilitiesTable tbody");
        if (tbody) {
            tbody.innerHTML = facilities.map((f, index) => `
                <tr>
                    <td>${f.name}</td>
                    <td>${f.type}</td>
                    <td>RM ${f.price}</td>
                    <td>
                        <button class="edit-btn" onclick="editFacility(${index})">Edit</button>
                        <button class="delete-btn" onclick="deleteFacility(${index})">Delete</button>
                    </td>
                </tr>
            `).join('');
        }
    };

    const form = document.getElementById('facilityForm');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const index = document.getElementById('facilityIndex').value;
            const facilities = db.getFacilities();
            const data = {
                name: document.getElementById('facName').value,
                type: document.getElementById('facType').value,
                price: document.getElementById('facPrice').value
            };

            if (index === "") {
                facilities.push(data);
            } else {
                facilities[index] = data;
            }

            db.saveFacilities(facilities);
            form.reset();
            document.getElementById('facilityIndex').value = "";
            document.getElementById('formTitle').innerText = "Add/Update Facility";
            renderFacilities();
        };
    }

    window.editFacility = (index) => {
        const f = db.getFacilities()[index];
        document.getElementById('facilityIndex').value = index;
        document.getElementById('facName').value = f.name;
        document.getElementById('facType').value = f.type;
        document.getElementById('facPrice').value = f.price;
        document.getElementById('formTitle').innerText = "Update Facility";
    };

    window.deleteFacility = (index) => {
        if (confirm("Delete this facility?")) {
            const facilities = db.getFacilities();
            facilities.splice(index, 1);
            db.saveFacilities(facilities);
            renderFacilities();
        }
    };

    window.resetForm = () => {
        form.reset();
        document.getElementById('facilityIndex').value = "";
        document.getElementById('formTitle').innerText = "Add/Update Facility";
    };

    renderFacilities();
});
