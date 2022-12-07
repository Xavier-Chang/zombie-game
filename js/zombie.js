export default class Zombie {
    constructor() {
        this.width = 20;
        this.height = 10;
        this.positionX = (this.randomPosition(this.width, 100) - (this.width));
        this.positionY = (this.randomPosition(this.height, 100) - (this.height * 0.5))
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
    randomPosition (min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    randomMove () {
        const movement = Math.floor(Math.random() * 5);
        switch (movement) {
            case 1:
                this.moveUp();
                break;
            case 2:
                this.moveDown();
                break;
            case 3:
                this.moveLeft();
                break;
            case 4:
                this.moveRight();
                break;
        }
    }
    

    moveDown() {
        //remove this after set detect 
        //if (this.positionY > (0-this.height)){
        this.positionY -= 0.5; //update the info of positionY
        this.domElement.style.bottom = this.positionY + "vh"; //reflect the changes
    }

    moveUp() {
        this.positionY += 0.5; 
        this.domElement.style.bottom = this.positionY + "vh"; 
    }

    moveLeft() {
        this.positionX -= 0.5; 
        this.domElement.style.left = this.positionX + "vw"; 
    }

    moveRight() {
        this.positionX += 0.5; 
        this.domElement.style.left = this.positionX + "vw"; 
    }

}