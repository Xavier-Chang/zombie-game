function startMusic() {
    const sound = new Audio("../src/audio/start.mp4")
    sound.volume = 0.2;
    sound.play();
}

startMusic();