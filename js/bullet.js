export default class Bullet {
    constructor(positionX, positionY, widthOfPlayer) {
        this.width = 3;
        this.height = 10;
        this.widthOfPlayer = widthOfPlayer;
        this.positionX = positionX + this.widthOfPlayer/2;
        this.positionY = positionY;
        this.domElement = null; 
        this.createDomElement();
    }

    createDomElement() { 
        this.domElement = document.createElement('div');
        this.domElement.className = "bullet";
        this.domElement.style.width = this.width + "vw"; 
        this.domElement.style.height = this.height + "vh"; 
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }

    moveUp() {
        this.positionY +=7;
        this.domElement.style.bottom = this.positionY + "vh";
    }

    moveDown() {
        this.positionY -=7;
        this.domElement.style.bottom = this.positionY + "vh";
    }

    moveRight() {
        this.positionX +=5;
        this.domElement.style.left = this.positionX + "vw";
    }

    moveLeft() {
        this.positionX -=5;
        this.domElement.style.left = this.positionX + "vw";
    }

    shootUp() {
        if (this.positionY<=100){
        setInterval(()=>{
            this.moveUp();
        }, 60);}   
    }

    shootDown() {
        console.log('shoot');
        if (this.positionY>=0){
        setInterval(()=>{
            this.moveDown();
        }, 60);}
    }

    shootRight() {
        console.log('shoot');
        if (this.positionX<=100){
        setInterval(()=>{
            this.moveRight();
        }, 60);}   
    }

    shootLeft() {
        console.log('shoot');
        if (this.positionX >= 0){
        setInterval(()=>{
            this.moveLeft();
        }, 60);}   
    }

    bulletSound() {
        const sound = new Audio("https://github.com/Xavier-Chang/zombie-game/raw/main/src/audio/gun.mp4")
        sound.volume = 0.05;
        sound.play();
    }
}
