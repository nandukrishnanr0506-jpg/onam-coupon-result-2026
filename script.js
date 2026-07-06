// ============================================
// SILVER ARTS AND CLUB
// ONAM COUPON RESULT 2026
// ============================================

// Draw Date
const drawDate = new Date("2026-08-26T18:30:00").getTime();

let winners = [];

// ============================================
// COUNTDOWN
// ============================================

function updateCountdown() {

    const now = new Date().getTime();

    const distance = drawDate - now;

    // Result Published
    if (distance <= 0) {

        document.getElementById("noticePage").style.display = "none";
        document.getElementById("mainWebsite").style.display = "block";

        document.getElementById("timer").innerHTML = "Result Published";

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Notice Page Countdown

    document.getElementById("noticeTimer").innerHTML = `

    <div class="time-box">
        <span>${days}</span>
        <small>Days</small>
    </div>

    <div class="time-box">
        <span>${hours}</span>
        <small>Hours</small>
    </div>

    <div class="time-box">
        <span>${minutes}</span>
        <small>Minutes</small>
    </div>

    <div class="time-box">
        <span>${seconds}</span>
        <small>Seconds</small>
    </div>

    `;

    // Main Website Countdown

    document.getElementById("timer").innerHTML =
        `${days} Days ${hours} Hrs ${minutes} Min ${seconds} Sec`;

}

updateCountdown();

setInterval(updateCountdown,1000);


// ============================================
// LOAD WINNERS
// ============================================

fetch("winners.json")

.then(response=>response.json())

.then(data=>{

    winners=data;

    let table="";

    const publicWinners = winners.filter(w=>w.public===true).slice(0,3);

    publicWinners.forEach(w=>{

        table+=`

        <tr>

        <td>${w.prize}</td>

        <td>${w.coupon}</td>

        </tr>

        `;

    });

    document.getElementById("winnerTable").innerHTML=table;

})

.catch(()=>{

    document.getElementById("winnerTable").innerHTML=`

    <tr>

    <td colspan="2">

    Winners not available.

    </td>

    </tr>

    `;

});


// ============================================
// SEARCH
// ============================================

function checkCoupon(){

    const coupon=document.getElementById("coupon").value.trim();

    const result=document.getElementById("result");

    if(coupon===""){

        result.innerHTML=`

        <div style="color:red;font-weight:bold;">

        Please enter coupon number.

        </div>

        `;

        return;

    }

    const winner=winners.find(w=>w.coupon==coupon);

    if(winner){

        result.innerHTML=`

        <div style="

        background:#d1e7dd;

        border:2px solid #198754;

        border-radius:12px;

        padding:25px;

        margin-top:20px;

        text-align:center;

        ">

        <h2 style="color:#198754;">

        🎉 Congratulations 🎉

        </h2>

        <h3>${winner.prize}</h3>

        <p><b>Coupon :</b> ${winner.coupon}</p>

        <p><b>Name :</b> ${winner.name}</p>

        </div>

        `;

        celebrate();

    }

    else{

        result.innerHTML=`

        <div style="

        background:#f8d7da;

        border:2px solid #dc3545;

        border-radius:12px;

        padding:20px;

        margin-top:20px;

        text-align:center;

        ">

        <h2 style="color:#dc3545;">

        ❌ Better Luck Next Time

        </h2>

        <p>

        Coupon Number <b>${coupon}</b>

        was not selected.

        </p>

        </div>

        `;

    }

}


// ============================================
// FIREWORKS
// ============================================

function celebrate(){

    const duration=3000;

    const animationEnd=Date.now()+duration;

    const interval=setInterval(()=>{

        if(Date.now()>animationEnd){

            clearInterval(interval);

            return;

        }

        confetti({

            particleCount:80,

            spread:100,

            origin:{y:0.6}

        });

    },300);

}


// ============================================
// ENTER KEY
// ============================================

document.getElementById("coupon").addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        checkCoupon();

    }

});
