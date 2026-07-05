// =====================================
// SILVER ARTS AND CLUB
// ONAM COUPON RESULT 2026
// =====================================

// ---------------- COUNTDOWN ----------------

const drawDate = new Date("August 26, 2026 19:30:00").getTime();

const timer = setInterval(() => {

    const now = new Date().getTime();

    const distance = drawDate - now;

    if (distance <= 0) {
        clearInterval(timer);
        document.getElementById("timer").innerHTML = "🎉 Draw Started";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML =
        `${days} Days ${hours} Hrs ${minutes} Min ${seconds} Sec`;

},1000);


// ---------------- LOAD WINNERS ----------------

let winners=[];

fetch("winners.json")
.then(response=>response.json())
.then(data=>{

    winners=data;

    let table="";

    winners
    .filter(w=>w.public===true)
    .forEach(w=>{

        table += `
        <tr>
            <td>${w.prize}</td>
            <td>${w.coupon}</td>
        </tr>
        `;

    });

    document.getElementById("winnerTable").innerHTML=table;

});


// ---------------- SEARCH ----------------

function checkCoupon(){

    const coupon=document.getElementById("coupon").value.trim();

    const result=document.getElementById("result");

    if(coupon===""){

        result.innerHTML=`
        <div style="color:red;font-weight:bold;">
        Please enter a coupon number.
        </div>
        `;

        return;

    }

    const winner=winners.find(w=>w.coupon===coupon);

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

        <h2 style="color:#198754;">🎉 Congratulations! 🎉</h2>

        <h3>${winner.prize}</h3>

        <p><strong>Coupon:</strong> ${winner.coupon}</p>

        <p><strong>Winner:</strong> ${winner.name}</p>

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

        <h2 style="color:#dc3545;">❌ Better Luck Next Time</h2>

        <p>This coupon number was not selected.</p>

        </div>

        `;

    }

}


// ---------------- FIREWORKS ----------------

function celebrate(){

    const duration=3500;

    const animationEnd=Date.now()+duration;

    const defaults={
        startVelocity:35,
        spread:360,
        ticks:80,
        zIndex:9999
    };

    function randomInRange(min,max){
        return Math.random()*(max-min)+min;
    }

    const interval=setInterval(function(){

        const timeLeft=animationEnd-Date.now();

        if(timeLeft<=0){

            clearInterval(interval);

            return;

        }

        const particleCount=50*(timeLeft/duration);

        confetti(Object.assign({},defaults,{
            particleCount,
            origin:{
                x:randomInRange(0.1,0.3),
                y:Math.random()-0.2
            }
        }));

        confetti(Object.assign({},defaults,{
            particleCount,
            origin:{
                x:randomInRange(0.7,0.9),
                y:Math.random()-0.2
            }
        }));

    },250);

}


// ---------------- ENTER KEY ----------------

document.getElementById("coupon").addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        checkCoupon();

    }

});
