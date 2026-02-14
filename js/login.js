document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    if (loginForm) {
        loginForm.onsubmit = function(e) {
            e.preventDefault();
            const identifier = document.getElementById('user').value;
            const pass = document.getElementById('pass').value;

            const players = db.getPlayers();
            const user = players.find(p => (p.email === identifier || p.id === identifier) && p.password === pass);

            if (user) {
                db.setCurrentUser(user);
                window.location.href = 'user_dashboard.html';
            } else {
                alert('Invalid ID/Email or password!');
            }
        };
    }
});
