export default class Player {
    constructor(){
        this.width = 8;
        this.height = 12;
        this.positionX = 50 - (this.width * 0.5); 
        this.positionY = 50;
        this.speed = 3;
        this.domElement = null;        
        this.createDomElement();
    }

    createDomElement() { 
        this.domElement = document.createElement('div');

        this.domElement.id = "player"; 
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh"; 
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.transform = "rotate(90deg)";

        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }


    moveLeft(){
        if (this.positionX>0) {
            this.positionX -= this.speed;   
            this.domElement.style.left = this.positionX + "vw";    
        }
    }

    moveRight(){
        if (this.positionX<(100-this.width)) {
            this.positionX += this.speed;
            this.domElement.style.left = this.positionX + "vw";
        }
        //console.log(`new position...${this.positionX}`);
    }

    
    moveUp() {
        if (this.positionY<100) {
            this.positionY += this.speed;
            this.domElement.style.bottom = this.positionY + "vh";
        }
    }

    moveDown() {
        if (this.positionY>0) {
            this.positionY -= this.speed;
            this.domElement.style.bottom = this.positionY + "vh";
        }
    }
    
    rotateToFront() {
        this.domElement.style.transform = "rotate(0deg)";
    }

    rotateToRight() {
        this.domElement.style.transform = "rotate(90deg)";
    }

    rotateToLeft() {
        this.domElement.style.transform = "rotate(90deg) scaleY(-1)";
    }

    rotateToBack() {
        this.domElement.style.transform = "rotate(180deg)";
    }
}