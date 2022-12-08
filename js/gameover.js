const mark = window.localStorage.getItem('mark');
console.log(mark);

function score(count) {
    const score = document.querySelector(".score span");
    score.id = "mark";
    score.innerHTML = count;     
}

function ranking(mark) {
    const rank = document.querySelector(".rank span");
    rank.id = "rank";
    if (mark < 20) {
        rank.innerHTML = `Er...You're a Zombie Newbie`;
    } else if (mark < 40) {
        rank.innerHTML = `Aha! You're a Zombie Killer`;
    } else if (mark < 60) {
        rank.innerHTML = `Hurray!! You're a Zombie Expert`;
    } else if (mark > 79) {
        rank.innerHTML = `Oh my Goodness!!! You're really a Zombie Master!!`;
    }

    
}

score(mark);
ranking(mark);