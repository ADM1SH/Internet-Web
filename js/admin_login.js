window.onload = function() {
    const loginForm = document.getElementById('loginForm');
    const errorMsg = document.getElementById('errorMsg');

    loginForm.onsubmit = function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const submitBtn = document.querySelector('.btn-login');

        const staffList = JSON.parse(localStorage.getItem("staffList")) || [];

      
        const validStaff = staffList.find(s => s.username === username && s.password === password);

        if (validStaff) {
            sessionStorage.setItem("adminUser", JSON.stringify(validStaff)); 
            errorMsg.style.display = "none";
            submitBtn.innerText = "Access Granted...";
            submitBtn.style.backgroundColor = "#2ecc71";
            
            setTimeout(() => window.location.href = "admin_dashboard.html", 1000);
        } else {
            errorMsg.style.display = "block";
            errorMsg.innerText = "Access Denied: Invalid Credentials";
            
            const card = document.querySelector('.login-card');
            card.animate([{ transform: 'translate(0)' }, { transform: 'translate(-10px)' }, { transform: 'translate(10px)' }, { transform: 'translate(0)' }], 400);
        }
    };
};