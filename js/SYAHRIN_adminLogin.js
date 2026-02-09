window.onload = function() 
{
    document.getElementById("brandName").classList.add("active");

    const loginForm = document.getElementById('loginForm');
    
    loginForm.onsubmit = function(e) 
    {
        e.preventDefault();

        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        const error = document.getElementById('errorMsg');

        
        if (user === "admin" && pass === "iwp123") 
        {
            
            error.style.display = "none";
            document.querySelector('.payButton').innerText = "Authenticating...";
            
            setTimeout(() => 
            {
                window.location.href = "SYAHRIN_adminDashboard.html";
            }, 1000);
        } 
        else 
        {
           
            error.style.display = "block";
            
            
            const box = document.querySelector('.login-box');
            box.style.animation = 'none';
            box.offsetHeight;
            box.style.animation = "shake 0.2s ease-in-out 0s 2";
            
            document.getElementById('password').value = "";
        }
    };
};