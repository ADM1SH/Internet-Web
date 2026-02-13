window.onload = function()
{
    const loginForm = document.querySelector('form');

    // Add error message element dynamically if it doesn't exist
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

        // Simple logic for prototype: Any non-empty input works
        if (user.length > 3 && pass.length > 3) 
        {
            // Success Feedback
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
            // Failure Feedback
            errorMsg.style.display = "block";
            errorMsg.innerText = "Please enter a valid ID and Password (min 4 chars).";
            errorMsg.style.color = "#e74c3c";

            const card = document.querySelector('.card');
            card.style.animation = "shake 0.4s ease-in-out";
            setTimeout(() => card.style.animation = "", 400);
        }
    };
};
