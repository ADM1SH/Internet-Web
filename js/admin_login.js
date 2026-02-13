// This handles the staff login page. It checks the username and password and sends admins to the dashboard.
window.onload = function() 
{
    const loginForm = document.getElementById('loginForm');
    
    loginForm.onsubmit = function(e) 
    {
        e.preventDefault();

        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        const error = document.getElementById('errorMsg');
        const submitBtn = document.querySelector('button[type="submit"]');

        if (user === "admin" && pass === "iwp123") 
        {
            error.style.display = "none";
            submitBtn.innerText = "Login Successful! Redirecting...";
            submitBtn.style.backgroundColor = "#2ecc71";
            submitBtn.disabled = true;
            
            setTimeout(() => 
            {
                window.location.href = "admin_dashboard.html";
            }, 1500);
        } 
        else 
        {
            error.style.display = "block";
            error.innerText = "Invalid credentials. Please try again.";
            error.style.color = "#e74c3c";
            
            const card = document.querySelector('.card');
            card.style.animation = 'none';
            card.offsetHeight;
            card.style.animation = "shake 0.4s ease-in-out";
            
            document.getElementById('password').value = "";
        }
    };
};
