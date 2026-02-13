window.onload = function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.onsubmit = function(e) {
        e.preventDefault();

        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        const staffList = JSON.parse(localStorage.getItem("staffList")) || [];

        
        const isMaster = (user === "admin" && pass === "iwp123");
        const isStaff = staffList.find(s => s.email === user && s.pass === pass);

        if (isMaster || isStaff) {
            window.location.href = "admin_dashboard.html";
        } else {
            const error = document.getElementById('errorMsg');
            error.style.display = "block";
            const card = document.querySelector('.login-card');
            card.style.animation = "shake 0.4s ease-in-out";
        }
    };
};