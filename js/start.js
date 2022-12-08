function startMusic() {
    const sound = new Audio("https://github.com/Xavier-Chang/zombie-game/raw/main/src/audio/start.mp4")
    sound.volume = 0.2;
    sound.play();
}

startMusic();