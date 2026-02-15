document.addEventListener('DOMContentLoaded', () => {
    const renderStaff = () => {
        const staff = db.getStaff();
        const tbody = document.querySelector("#staffTable tbody");
        if (tbody) {
            tbody.innerHTML = staff.map((s, index) => `
                <tr>
                    <td>${s.name}</td>
                    <td>${s.role}</td>
                    <td>${s.username}</td>
                    <td>
                        <button class="edit-btn" onclick="editStaff(${index})">Edit</button>
                        <button class="delete-btn" onclick="deleteStaff(${index})">Delete</button>
                    </td>
                </tr>
            `).join('');
        }
    };

    const form = document.getElementById('staffForm');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const index = document.getElementById('staffIndex').value;
            const staff = db.getStaff();
            const data = {
                name: document.getElementById('staffName').value,
                role: document.getElementById('staffRole').value,
                username: document.getElementById('staffUser').value,
                email: "",
                password: document.getElementById('staffPass').value
            };

            if (index === "") {
                staff.push(data);
            } else {
                staff[index] = data;
            }

            db.saveStaff(staff);
            form.reset();
            document.getElementById('staffIndex').value = "";
            renderStaff();
        };
    }

    window.editStaff = (index) => {
        const s = db.getStaff()[index];
        document.getElementById('staffIndex').value = index;
        document.getElementById('staffName').value = s.name;
        document.getElementById('staffRole').value = s.role;
        document.getElementById('staffUser').value = s.username;
        document.getElementById('staffPass').value = s.password;
    };

    window.deleteStaff = (index) => {
        if (confirm("Delete staff member?")) {
            const staff = db.getStaff();
            staff.splice(index, 1);
            db.saveStaff(staff);
            renderStaff();
        }
    };

    window.resetForm = () => {
        form.reset();
        document.getElementById('staffIndex').value = "";
    };

    renderStaff();
});
