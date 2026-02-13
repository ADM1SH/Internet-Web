window.onload = function() {
    const loginForm = document.querySelector('form');
    
    loginForm.onsubmit = function(e) {
        e.preventDefault();

        const userId = document.getElementById('user').value;
        const userPass = document.getElementById('pass').value;

        const playerList = JSON.parse(localStorage.getItem("playerList")) || [];

       
        const user = playerList.find(p => p.phone === userId && p.password === userPass);

        if (user) {
            alert("Welcome back, " + user.name + "!");
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            window.location.href = "user_dashboard.html";
        } else {
            alert("Invalid ID or Password. Please try again.");
        }
    };
};