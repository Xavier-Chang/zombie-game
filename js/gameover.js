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
    if (mark < 25) {
        rank.innerHTML = `Er...You're a Zombie Newbie`;
        gameoverSound1();
    } else if (mark < 50) {
        rank.innerHTML = `Aha! You're a Zombie Killer`;
        gameoverSound2()
    } else if (mark < 75) {
        rank.innerHTML = `Hurray!! You're a Zombie Expert`;
        gameoverSound3() 
    } else if (mark > 99) {
        rank.innerHTML = `Oh my Goodness!!! You're really a Zombie Master!!`;
        gameoverSound4()
    }
}

function gameoverSound1() {
    const sound = new Audio("https://github.com/Xavier-Chang/zombie-game/raw/main/src/audio/level1.mp4")
    sound.volume = 0.3;
    sound.play();
}

function gameoverSound2() {
    const sound = new Audio("https://github.com/Xavier-Chang/zombie-game/raw/main/src/audio/level2.mp4")
    sound.volume = 0.3;
    sound.play();
}

function gameoverSound3() {
    const sound = new Audio("https://github.com/Xavier-Chang/zombie-game/raw/main/src/audio/level3.mp4")
    sound.volume = 0.3;
    sound.play();
}

function gameoverSound4() {
    const sound = new Audio("https://github.com/Xavier-Chang/zombie-game/raw/main/src/audio/level4.mp4")
    sound.volume = 0.3;
    sound.play();
}

score(mark);
ranking(mark);
