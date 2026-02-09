window.onload = function() 
{
    document.getElementById("brandName").classList.add("active");

    const stars = document.querySelectorAll('.star');
    let selectedRating = 0;

    
    stars.forEach(star => 
    {
        star.addEventListener('click', function() 
        {
            selectedRating = this.getAttribute('data-value');
            stars.forEach(s => 
            {
                s.classList.toggle('selected', s.getAttribute('data-value') <= selectedRating);
            });
        });
    });

    
    document.getElementById('submitFeedback').onclick = function() 
    {
        if (selectedRating === 0) 
        {
            alert("Please select a star rating before submitting!");
            return;
        }

        const statusMsg = document.getElementById('statusMsg');
        
        
        this.disabled = true;
        this.innerText = "Submitted!";
        this.style.backgroundColor = "#ccc";

        
        statusMsg.style.display = "block";
        statusMsg.innerText = "Thank you! Redirecting to homepage...";

       
        setTimeout(() => 
        {
            window.location.href = "index.html";
        }, 2000);
    };
};