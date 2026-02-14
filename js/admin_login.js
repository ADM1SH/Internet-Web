document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.onsubmit = function(e) {
            e.preventDefault();
            const user = document.getElementById('user').value;
            const pass = document.getElementById('pass').value;

            const staffList = db.getStaff();
            const staff = staffList.find(s => s.username === user && s.password === pass);

            if (staff) {
                window.location.href = 'admin_dashboard.html';
            } else {
                alert('Invalid staff credentials!');
            }
        };
    }
});
