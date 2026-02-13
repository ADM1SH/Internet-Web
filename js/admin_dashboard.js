window.onload = function() 
{
    const updateClock = () => {
        const now = new Date();
        const clockEl = document.getElementById('currentTime');
        if (clockEl) clockEl.innerText = now.toLocaleString();
    };

    setInterval(updateClock, 1000);
    updateClock();

    document.querySelectorAll('.nav-link').forEach(link => {
        link.onclick = function() {
            if (this.innerText !== "Logout") {
                console.log("Navigating to: " + this.innerText);
            }
        };
    });
};
