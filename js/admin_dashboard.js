window.onload = function() 
{
    function updateClock() 
    {
        const now = new Date();
        document.getElementById('currentTime').innerText = now.toLocaleString();
    }

    setInterval(updateClock, 1000);
    updateClock();

    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => 
    {
        link.onclick = function(e) 
        {
            if(this.innerText !== "Logout") 
            {
                console.log("Navigating to: " + this.innerText);
            }
        }
    });
};