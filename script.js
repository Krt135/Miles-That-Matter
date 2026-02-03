document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. INITIALIZE AOS ---
    AOS.init({
        duration: 1000,
        once: true,
        offset: 120,
    });

    // --- 2. PAGE FADE-IN ---
    document.body.classList.add("loaded");

    // --- 3. DONATION BUTTON LOGIC ---
    const buttons = document.querySelectorAll('.don-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const parentRow = this.parentElement;
            const siblings = parentRow.querySelectorAll('.don-btn');
            siblings.forEach(sibling => sibling.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // --- 4. BACK TO TOP & PROGRESS RING LOGIC ---
    const topBtn = document.getElementById("backToTop");
    const circle = document.querySelector('.progress-ring__circle');
    
    // Circle math (Circumference)
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    // Scroll Function
    window.onscroll = function() {
        // A. Slide-in from right
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            topBtn.classList.add("show");
        } else {
            topBtn.classList.remove("show");
        }

        // B. Progress Ring Math
        const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPosition = document.documentElement.scrollTop;
        const scrollPercentage = scrollPosition / scrollTotal;
        const offset = circumference - (scrollPercentage * circumference);
        circle.style.strokeDashoffset = offset;
    };

    // Click to scroll top
    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // --- 5. PAGE FADE-OUT (Link Interception) ---
    const links = document.querySelectorAll("a");
    links.forEach(link => {
        link.addEventListener("click", e => {
            if (link.hostname === window.location.hostname && link.href.includes(".html")) {
                e.preventDefault();
                const target = link.href;
                document.body.classList.add("fade-out");
                setTimeout(() => {
                    window.location.href = target;
                }, 500);
            }
        });
    });
});

// Fix for Back Button cache (Outside DOMContentLoaded)
window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        document.body.classList.remove("fade-out");
    }
});