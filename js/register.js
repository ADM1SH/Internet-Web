window.onload = function() {
    const regForm = document.querySelector('form');
    
    regForm.onsubmit = function(e) {
        e.preventDefault();

        const name = document.getElementById('fname').value;
        const email = document.getElementById('email').value;
        const studentId = document.getElementById('id').value;
        const password = document.getElementById('pass').value;

        
        const playerList = JSON.parse(localStorage.getItem("playerList")) || [];

        const newPlayer = {
            name: name,
            email: email,
            phone: studentId,
            status: "Active",
            password: password
        };

        playerList.push(newPlayer);
        localStorage.setItem("playerList", JSON.stringify(playerList));

        alert("Registration successful! You can now login.");
        window.location.href = "login.html";
    };
};