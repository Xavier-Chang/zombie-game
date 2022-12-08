export default class fatZombie {
    constructor() {
        this.width = 5;
        this.height = 18;
        this.randomPosition();
        this.domElement = null; 
        this.createDomElement();
        this.speed = 0.3;
        setTimeout(()=>{
            this.speed = 0.4;
        },4000)
        setTimeout(()=>{
            this.speed = 1.2;
        },7000)
    }

    createDomElement() { 
        this.domElement = document.createElement('div');

        this.domElement.className = "fatZombie"; 
        this.domElement.style.width = this.width + "vw"; 
        this.domElement.style.height = this.height + "vh"; 
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";
   
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }
    
    randomRange (min, max) { 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    randomNum () {
        return Math.floor(Math.random() * 4)
    }

    randomPosition () {
        const position = this.randomNum ();
        switch (position) {
            case 0:
                this.positionX = (this.randomRange(this.width, 100) - (this.width));
                this.positionY = 0;
                break;
            case 1:
                this.positionX = (this.randomRange(this.width, 100) - (this.width));
                this.positionY = 100;
                break;
            case 2:
                this.positionX = 0;
                this.positionY = (this.randomRange(this.height, 90) - (this.height));
                break;
            case 3:
                this.positionX = 100 - this.width;
                this.positionY = (this.randomRange(this.height, 90) - (this.height));
                break;
        }
    }

    zombieMove(playerPositionX, playerPositionY) {
        if (this.positionY >= playerPositionY && this.positionX >= playerPositionX) {
            this.moveDown();
            this.moveLeft();
        } else if (this.positionY <= playerPositionY && this.positionX >= playerPositionX){
            this.moveUp();
            this.moveLeft();
        } else if (this.positionX <= playerPositionX && this.positionY >= playerPositionY) {
            this.moveRight();
            this.moveDown();
        } else if (this.positionX <= playerPositionX && this.positionY <= playerPositionY) {
            this.moveRight();
            this.moveUp();
        }
    }

    moveDown() {
        this.positionY -= this.speed; 
        this.domElement.style.bottom = this.positionY + "vh"; 
    }

    moveUp() {
        this.positionY += this.speed; 
        this.domElement.style.bottom = this.positionY + "vh"; 
    }

    moveLeft() {
        this.positionX -= this.speed; 
        this.domElement.style.left = this.positionX + "vw"; 
    }

    moveRight() {
        this.positionX += this.speed; 
        this.domElement.style.left = this.positionX + "vw"; 
    }
}