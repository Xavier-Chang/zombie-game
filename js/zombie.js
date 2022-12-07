export default class Zombie {
    constructor() {
        this.width = 20;
        this.height = 10;
        
        this.randomPosition();
        //put it above the method or constructor will excute firstly and no domElement.
        //hold reference of each element
        this.domElement = null; 
        this.createDomElement();
    }

    createDomElement() { 
        this.domElement = document.createElement('div');

        this.domElement.className = "zombie"; 
        this.domElement.style.width = this.width + "vw"; //view width, need "string"!!
        this.domElement.style.height = this.height + "vh"; //view heigh
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";
        

        //step3: append to the dom: `parentElm.appendChild()`
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }
    //Generate random number between two numbers
    randomRange (min, max) { // min and max included 
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

    randomMove () {
        const movement = this.randomNum();
        switch (movement) {
            case 0:
                this.moveUp();
                break;
            case 1:
                this.moveDown();
                break;
            case 2:
                this.moveLeft();
                break;
            case 3:
                this.moveRight();
                break;
        }
    }
    

    moveDown() {
        //remove this after set detect 
        //if (this.positionY > (0-this.height)){
        this.positionY -= 1; //update the info of positionY
        this.domElement.style.bottom = this.positionY + "vh"; //reflect the changes
    }

    moveUp() {
        this.positionY += 1; 
        this.domElement.style.bottom = this.positionY + "vh"; 
    }

    moveLeft() {
        this.positionX -= 1; 
        this.domElement.style.left = this.positionX + "vw"; 
    }

    moveRight() {
        this.positionX += 1; 
        this.domElement.style.left = this.positionX + "vw"; 
    }

}