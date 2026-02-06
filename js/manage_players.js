window.onload = function() {
    if (document.getElementById("brandName")) {
        document.getElementById("brandName").classList.add("active");
    }

    loadPlayers();

    document.getElementById("playerForm").onsubmit = function(e) {
        e.preventDefault();
        
        var name = document.getElementById("playerName").value;
        var phone = document.getElementById("playerPhone").value;
        var email = document.getElementById("playerEmail").value;
        var status = document.getElementById("playerStatus").value;
        var index = document.getElementById("playerIndex").value;

        var playerList = JSON.parse(localStorage.getItem("playerList")) || [];
        
        var playerData = {
            name: name,
            phone: phone,
            email: email,
            status: status
        };

        if (index === "") {
            // Add new
            playerList.push(playerData);
        } else {
            // Update existing
            playerList[index] = playerData;
        }

        localStorage.setItem("playerList", JSON.stringify(playerList));
        
        resetForm();
        loadPlayers();
        alert("Player information saved!");
    };
};

function loadPlayers() {
    var playerList = JSON.parse(localStorage.getItem("playerList")) || [];
    
    // Default data if empty
    if (playerList.length === 0) {
        playerList = [
            { name: "John Doe", phone: "012-3456789", email: "john@example.com", status: "Active" },
            { name: "Jane Smith", phone: "019-8765432", email: "jane@test.com", status: "Inactive" }
        ];
        localStorage.setItem("playerList", JSON.stringify(playerList));
    }

    var tbody = document.querySelector("#playersTable tbody");
    tbody.innerHTML = "";

    for (var i = 0; i < playerList.length; i++) {
        var player = playerList[i];
        var row = tbody.insertRow();
        
        row.insertCell(0).innerHTML = player.name;
        row.insertCell(1).innerHTML = player.phone;
        row.insertCell(2).innerHTML = player.email;
        row.insertCell(3).innerHTML = player.status;
        
        var actionCell = row.insertCell(4);
        
        // Edit button
        var editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.className = "edit-btn";
        editBtn.onclick = (function(idx) {
            return function() {
                editPlayer(idx);
            };
        })(i);
        
        // Delete button
        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = (function(idx) {
            return function() {
                deletePlayer(idx);
            };
        })(i);
        
        actionCell.appendChild(editBtn);
        actionCell.appendChild(deleteBtn);
    }
}

function editPlayer(index) {
    var playerList = JSON.parse(localStorage.getItem("playerList"));
    var player = playerList[index];
    
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
        var playerList = JSON.parse(localStorage.getItem("playerList"));
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
