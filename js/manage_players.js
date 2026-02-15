document.addEventListener('DOMContentLoaded', () => {
    const renderPlayers = () => {
        const players = db.getPlayers();
        const tbody = document.querySelector("#playersTable tbody");
        if (tbody) {
            tbody.innerHTML = players.map((p, index) => `
                <tr>
                    <td>${p.name}</td>
                    <td>${p.email}</td>
                    <td>${p.phone}</td>
                    <td>${p.status}</td>
                    <td>
                        <button class="edit-btn" onclick="editPlayer(${index})">Edit</button>
                        <button class="delete-btn" onclick="deletePlayer(${index})">Delete</button>
                    </td>
                </tr>
            `).join('');
        }
    };

    const form = document.getElementById('playerForm');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const index = document.getElementById('playerIndex').value;
            const players = db.getPlayers();
            const data = {
                name: document.getElementById('playerName').value,
                email: document.getElementById('playerEmail').value,
                phone: document.getElementById('playerPhone').value,
                status: document.getElementById('playerStatus').value,
                password: players[index]?.password || "123"
            };

            if (index === "") {
                players.push(data);
            } else {
                players[index] = data;
            }

            db.savePlayers(players);
            form.reset();
            document.getElementById('playerIndex').value = "";
            renderPlayers();
        };
    }

    window.editPlayer = (index) => {
        const p = db.getPlayers()[index];
        document.getElementById('playerIndex').value = index;
        document.getElementById('playerName').value = p.name;
        document.getElementById('playerEmail').value = p.email;
        document.getElementById('playerPhone').value = p.phone;
        document.getElementById('playerStatus').value = p.status;
    };

    window.deletePlayer = (index) => {
        if (confirm("Delete player?")) {
            const players = db.getPlayers();
            players.splice(index, 1);
            db.savePlayers(players);
            renderPlayers();
        }
    };

    window.resetForm = () => {
        form.reset();
        document.getElementById('playerIndex').value = "";
    };

    renderPlayers();
});
