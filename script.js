/*====================================
    SILVER ARTS & SPORTS CLUB
    ONAM COUPON 2026
====================================*/


// ===============================
// DRAW DATE
// ===============================

const targetDate = new Date("august 26, 2026 19:30:00").getTime();


// ===============================
// LOADER
// ===============================

window.addEventListener("load", function () {

    const loader = document.querySelector(".loader");

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

    }, 1000);

});


// ===============================
// COUNTDOWN
// ===============================

function updateCountdown() {

    const now = new Date().getTime();

    const distance = targetDate - now;

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    const input = document.getElementById("couponNumber");
    const button = document.getElementById("searchBtn");

    if (distance <= 0) {

        days.innerHTML = "00";
        hours.innerHTML = "00";
        minutes.innerHTML = "00";
        seconds.innerHTML = "00";

        input.disabled = false;
        button.disabled = false;

        return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));

    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const s = Math.floor((distance % (1000 * 60)) / 1000);

    days.innerHTML = String(d).padStart(2, "0");
    hours.innerHTML = String(h).padStart(2, "0");
    minutes.innerHTML = String(m).padStart(2, "0");
    seconds.innerHTML = String(s).padStart(2, "0");

    input.disabled = true;
    button.disabled = true;

}

updateCountdown();

setInterval(updateCountdown, 1000);


// ===============================
// SHOW RESULT CARD
// ===============================

function showResult(icon, title, message) {

    const card = document.getElementById("resultCard");

    card.style.display = "block";

    document.getElementById("resultIcon").innerHTML = icon;

    document.getElementById("resultTitle").innerHTML = title;

    document.getElementById("resultMessage").innerHTML = message;

    card.scrollIntoView({
        behavior: "smooth"
    });

}


// ===============================
// MOBILE MENU
// ===============================

const menu = document.querySelector(".menu");

const nav = document.querySelector("nav");

menu.addEventListener("click", () => {

    nav.classList.toggle("show");

});


// ===============================
// SMOOTH SCROLL
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({

            behavior: "smooth"

        });

    });

});
/*====================================
    SEARCH COUPON
====================================*/

async function searchCoupon() {

    const coupon = document.getElementById("couponNumber").value.trim();

    // Empty input
    if (coupon === "") {

        showResult(
            "⚠️",
            "Enter Coupon Number",
            "Please enter your coupon number."
        );

        return;
    }

    // Before draw time
    if (new Date().getTime() < targetDate) {

        showResult(
            "⏳",
            "RESULT NOT PUBLISHED",
            `Please wait until

26-08-2026
7:30 PM

The lucky draw result will be published after the official draw.`
        );

        return;
    }
     
    try {

        const response = await fetch("results.json");

        if (!response.ok) {

            throw new Error("Unable to load results.");

        }

        const winners = await response.json();

        const winner = winners.find(item => item.coupon === coupon);

        if (winner) {

            showResult(
                
                "🏆",
                "CONGRATULATIONS!",
                `Coupon Number
                

${winner.coupon}

━━━━━━━━━━━━━━━━━━

Winner

${winner.name}

━━━━━━━━━━━━━━━━━━

Prize

${winner.prize}`
            );
            launchConfetti();

        } else {

            showResult(
                "❌",
                "BETTER LUCK NEXT TIME",
                `Coupon Number

${coupon}

━━━━━━━━━━━━━━━━━━

No Prize Found

Thank you for participating
in Silver Arts & Sports Club
Onam Coupon 2026.`
            );

        }

    } catch (error) {

        showResult(
            "⚠️",
            "ERROR",
            "Unable to load results.\nPlease try again later."
        );

        console.error(error);

    }

}


/*====================================
    SEARCH BUTTON
====================================*/

document
.getElementById("searchBtn")
.addEventListener("click", searchCoupon);


/*====================================
    ENTER KEY SEARCH
====================================*/

document
.getElementById("couponNumber")
.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        searchCoupon();

    }

});


/*====================================
    HEADER EFFECT
====================================*/

window.addEventListener("scroll", function () {

    const header = document.querySelector("header");

    if (window.scrollY > 80) {

        header.style.background = "rgba(0,0,0,.70)";
        header.style.boxShadow = "0 10px 25px rgba(0,0,0,.35)";

    } else {

        header.style.background = "rgba(0,0,0,.25)";
        header.style.boxShadow = "none";

    }

});


/*====================================
    ACTIVE MENU
====================================*/

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 150;

        if (pageYOffset >= top) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});
function launchConfetti(){

    const colors=[
        "#FFD700",
        "#00C853",
        "#FF5252",
        "#448AFF",
        "#FFFFFF",
        "#FF9800"
    ];

    for(let i=0;i<150;i++){

        const confetti=document.createElement("div");

        confetti.className="confetti";

        confetti.style.left=Math.random()*100+"vw";

        confetti.style.background=
        colors[Math.floor(Math.random()*colors.length)];

        confetti.style.animationDuration=
        (Math.random()*3+2)+"s";

        confetti.style.width=
        (Math.random()*8+6)+"px";

        confetti.style.height=
        confetti.style.width;

        document.body.appendChild(confetti);

        setTimeout(()=>{

            confetti.remove();

        },5000);

    }

}
