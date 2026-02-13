// This script manages the player records, allowing admins to add or edit member information.
window.onload = function() {
    if (document.getElementById("brandName")) {
        document.getElementById("brandName").classList.add("active");
    }

    loadPlayers();

    const playerSearch = document.getElementById("playerSearch");
    if (playerSearch) {
        playerSearch.oninput = function() {
            loadPlayers(this.value.toLowerCase());
        };
    }

    document.getElementById("playerForm").onsubmit = function(e) {
        e.preventDefault();

        const name = document.getElementById("playerName").value;
        const phone = document.getElementById("playerPhone").value;
        const email = document.getElementById("playerEmail").value;
        const status = document.getElementById("playerStatus").value;
        const index = document.getElementById("playerIndex").value;

        const playerList = JSON.parse(localStorage.getItem("playerList")) || [];

        const playerData = { name, phone, email, status };

        if (index === "") {
            playerList.push(playerData);
        } else {
            playerList[index] = playerData;
        }

        localStorage.setItem("playerList", JSON.stringify(playerList));

        resetForm();
        loadPlayers();
        alert("Player information saved!");
    };
};

function loadPlayers(filter = "") {
    let playerList = JSON.parse(localStorage.getItem("playerList")) || [];

    if (playerList.length === 0) {
        playerList = [
            { name: "John Doe", phone: "012-3456789", email: "john@example.com", status: "Active" },
            { name: "Jane Smith", phone: "019-8765432", email: "jane@test.com", status: "Inactive" }
        ];
        localStorage.setItem("playerList", JSON.stringify(playerList));
    }

    if (filter) {
        playerList = playerList.filter(p => 
            p.name.toLowerCase().includes(filter) || 
            p.email.toLowerCase().includes(filter)
        );
    }

    const tbody = document.querySelector("#playersTable tbody");
    tbody.innerHTML = playerList.map((player, i) => `
        <tr>
            <td>${player.name}</td>
            <td>${player.phone}</td>
            <td>${player.email}</td>
            <td>${player.status}</td>
            <td>
                <button class="edit-btn" onclick="editPlayer(${i})">Edit</button>
                <button class="delete-btn" onclick="deletePlayer(${i})">Delete</button>
            </td>
        </tr>
    `).join("");
}

function editPlayer(index) {
    const playerList = JSON.parse(localStorage.getItem("playerList"));
    const player = playerList[index];

    document.getElementById("playerName").value = player.name;
    document.getElementById("playerPhone").value = player.phone;
    document.getElementById("playerEmail").value = player.email;
    document.getElementById("playerStatus").value = player.status;
    document.getElementById("playerIndex").value = index;

    document.getElementById("formTitle").innerHTML = "Update Player: " + player.name;
    document.getElementById("submitBtn").innerHTML = "Update Player";
}

function deletePlayer(index) {
    if (confirm("Delete this player record?")) {
        const playerList = JSON.parse(localStorage.getItem("playerList"));
        playerList.splice(index, 1);
        localStorage.setItem("playerList", JSON.stringify(playerList));
        loadPlayers();
    }
}

function resetForm() {
    document.getElementById("playerForm").reset();
    document.getElementById("playerIndex").value = "";
    document.getElementById("formTitle").innerHTML = "Add/Update Player";
    document.getElementById("submitBtn").innerHTML = "Save Player";
}
