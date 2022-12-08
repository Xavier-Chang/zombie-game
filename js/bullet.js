export default class Bullet {
    constructor(positionX, positionY, widthOfPlayer) {
        this.width = 3;
        this.height = 10;
        this.widthOfPlayer = widthOfPlayer;
        this.positionX = positionX + this.widthOfPlayer/2;
        this.positionY = positionY;
        //put it above the method or constructor will excute firstly and no domElement.
        //hold reference of each element
        this.domElement = null; 
        this.createDomElement();
    }

    createDomElement() { 
        this.domElement = document.createElement('div');
        this.domElement.className = "bullet"; //there're lots of zombies, use class but not id
        this.domElement.style.width = this.width + "vw"; //view width, need "string"!!
        this.domElement.style.height = this.height + "vh"; //view heigh
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";

        //step3: append to the dom: `parentElm.appendChild()`
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
        const sound = new Audio("../src/audio/gun.mp4")
        sound.volume = 0.05;
        sound.play();
    }
}