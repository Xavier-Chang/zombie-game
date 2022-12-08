export default class Player {
    constructor(){
        
        //use width and height as number, for calculation
        this.width = 8 ; //size should set here but not css, otherwise js need to get info from css
        this.height = 12;
        this.positionX = 50 - (this.width * 0.5); //centerposition
        this.positionY = 50;
        this.speed = 3;
        this.domElement = null; //put it above the method or constructor will excute firstly and no domElement.
        this.createDomElement();
        //all method can access the domelement
    }

    //set player here but not html
    createDomElement() { 
        // step1: create the element:
        //However, can't put it inside the method as other method can't access it.
        //first set it in constructor
        this.domElement = document.createElement('div');

        // step2: add content or modify (ex. innerHTML...)
            //set size here
        this.domElement.id = "player"; 
        this.domElement.style.width = this.width + "vw"; //view width, need "string"!!
        this.domElement.style.height = this.height + "vh"; //view heigh
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";

        //step3: append to the dom: `parentElm.appendChild()`
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElement);
    }


    moveLeft(){
        if (this.positionX>0) {
            this.positionX -= this.speed; //update value, no need to return     
            //update css for the player dom element   
            this.domElement.style.left = this.positionX + "vw";    
        }
        //console.log(`new position...${this.positionX}`);
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