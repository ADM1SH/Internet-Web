window.onload = function() {
    const loginForm = document.querySelector('form');
    const errorMsg = document.createElement('p');
    errorMsg.style.color = "#e74c3c";
    errorMsg.style.textAlign = "center";
    errorMsg.style.display = "none";
    loginForm.appendChild(errorMsg);

    loginForm.onsubmit = function(e) {
        e.preventDefault();

        const inputID = document.getElementById('user').value; 
        const inputPass = document.getElementById('pass').value;
        const submitBtn = loginForm.querySelector('button');

        const playerList = JSON.parse(localStorage.getItem("playerList")) || [];

        
        const validUser = playerList.find(player => 
            player.phone === inputID && player.password === inputPass
        );

        if (validUser) {
            if (validUser.status === "Banned") {
                errorMsg.innerText = "This account has been suspended.";
                errorMsg.style.display = "block";
                return;
            }

            
            localStorage.setItem("currentUser", JSON.stringify(validUser)); 
            errorMsg.style.display = "none";
            submitBtn.innerText = "Success! Redirecting...";
            submitBtn.style.backgroundColor = "#2ecc71";
            
            setTimeout(() => window.location.href = "user_dashboard.html", 1000);
        } else {
            errorMsg.innerText = "Invalid ID or Password.";
            errorMsg.style.display = "block";
            
            
            const card = document.querySelector('.login-card');
            card.animate([
                { transform: 'translateX(0)' }, 
                { transform: 'translateX(-10px)' }, 
                { transform: 'translateX(10px)' }, 
                { transform: 'translateX(0)' }
            ], { duration: 400 });
        }
    };
};