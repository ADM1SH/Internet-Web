document.addEventListener('DOMContentLoaded', () => {
    const regForm = document.querySelector('form');
    if (regForm) {
        regForm.onsubmit = function(e) {
            e.preventDefault();
            const newUser = {
                name: document.getElementById('fname').value,
                email: document.getElementById('email').value,
                id: document.getElementById('id').value,
                sport: document.querySelector('select[name="sport"]').value,
                password: document.getElementById('pass').value,
                phone: "",
                status: "Active"
            };

            const players = db.getPlayers();
            if (players.find(p => p.email === newUser.email)) {
                alert("Email already registered!");
                return;
            }

            players.push(newUser);
            db.savePlayers(players);
            alert("Registration successful! Please login.");
            window.location.href = 'login.html';
        };
    }
});
