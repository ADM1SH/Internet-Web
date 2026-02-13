// This handles the player login page. It makes sure the user enters their ID and password correctly.
window.onload = function()
{
    const loginForm = document.querySelector('form');
    if (!loginForm) return;

    let errorMsg = document.getElementById('errorMsg');
    if (!errorMsg) {
        errorMsg = document.createElement('p');
        errorMsg.id = 'errorMsg';
        errorMsg.style.display = 'none';
        errorMsg.style.textAlign = 'center';
        errorMsg.style.marginTop = '15px';
        errorMsg.style.fontWeight = 'bold';
        loginForm.appendChild(errorMsg);
    }

    loginForm.onsubmit = function(e)
    {
        e.preventDefault();

        const user = document.getElementById('user').value;
        const pass = document.getElementById('pass').value;
        const submitBtn = loginForm.querySelector('button');

        if (user.length >= 4 && pass.length >= 4) 
        {
            errorMsg.style.display = "none";
            submitBtn.innerText = "Login Successful!";
            submitBtn.style.backgroundColor = "#2ecc71";
            submitBtn.disabled = true;

            setTimeout(() => {
                alert("Welcome back! Redirecting to home...");
                window.location.href = "index.html";
            }, 1000);
        }
        else
        {
            errorMsg.style.display = "block";
            errorMsg.innerText = "Please enter a valid ID and Password (min 4 chars).";
            errorMsg.style.color = "#e74c3c";

            const card = document.querySelector('.login-card') || document.querySelector('.card');
            if (card) {
                card.style.animation = 'none';
                card.offsetHeight;
                card.style.animation = "shake 0.4s ease-in-out";
            }
        }
    };
};
