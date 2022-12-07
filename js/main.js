class Game { //game class hold all other class
    constructor(){
        //this.player;
        //set an array to keep the new obstacles; 
        //will hold instances of the class Obstacle;
        //detect outside the board - remove from the dom and this array, 
        //shift() - remove the first element: 
        this.obstacles = [];
        this.bullet;
        this.mark = 0;
        this.right;
        this.left;
        this.front = true;
        this.back;
        
    }
    start(){ //too long, need to break down

        this.player = new Player();
        
        //How to create more obstacles? --> interval 1000ms
//Where to store them?
        setInterval(() => {
            const newObstacle = new Obstacle();
            this.obstacles.push(newObstacle);
        }, 2500)
        
        //Update obstacles
        //bonus: start after 3s
        this.bullet = new Bullet(this.player.positionX, 100, 0, 0);
        this.bullet.shootUp();

        setTimeout(()=>{
            setInterval(() => {
                this.obstacles.forEach((obstacleInstance) => {
                    //move current obstacle
                    obstacleInstance.randomMove();
                    //detect if there's a collision between player and current obstacle
                    //obstacles.forEach
                    this.detectCollision(obstacleInstance);
                    
                    this.bulletHit(obstacleInstance);
                    //check if we nned to remove current obstacle
                    this.removeObstacleIfOutside(obstacleInstance);                   
                });
                //don't detect outside the loop as just one time collision is ok               
            }, 100);
        },2000)

        
        
    }

    attachEventListeners() {
        //Attach event listeners
        document.addEventListener('keydown', (e) => {
            //const key = e.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
            //console.log(e.key); //log what keyboard enter
            
            
            if (e.key === "d") {
                this.player.moveRight();
            } else if (e.key === "a") {
                this.player.moveLeft();
            } else if (e.key === "w") {
                this.player.moveUp();
            } else if (e.key === "s") {
                this.player.moveDown();
            } else if (e.code === "Space") {
                this.bullet = new Bullet(this.player.positionX, this.player.positionY, this.player.width, this.player.height);
                if (this.front){
                    this.bullet.shootUp(); 
                } else if (this.right) {
                    this.bullet.shootRight();
                } else if (this.left) {
                    this.bullet.shootLeft();
                } else if (this.back) {
                    this.bullet.shootDown();
                }             
                //this.bullet.shootRight();    
            } else if (e.code === "ArrowRight") {       
                this.player.rotateToRight();
                this.front = false;
                this.back = false;
                this.right = true;
                this.left = false;
            } else if (e.code === "ArrowLeft") {
                this.player.rotateToLeft();
                this.front = false;
                this.back = false;
                this.right = false;
                this.left = true;
            } else if (e.code === "ArrowUp") {               
                this.player.rotateToFront();
                this.front = true;
                this.back = false;
                this.right = false;
                this.left = false;
            } else if (e.code === "ArrowDown") {
                this.player.rotateToBack();
                this.front = false;
                this.back = true;
                this.right = false;
                this.left = false;
            }
        });
    }

    detectCollision(obstacleInstance) { //dont
        if (
            this.player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            this.player.positionX + this.player.width > obstacleInstance.positionX &&
            this.player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            this.player.height + this.player.positionY > obstacleInstance.positionY
        ){
            console.log('collision detected!') //we don't expect player open console
            //alert('gameover'); //need to refresh
            
            /*setTimeout(()=>{
                location.href = "gameover.html"//redirect to another page
            },300)*/
            
        }
    }

    bulletHit(obstacleInstance){
        //let mark = 0;
        if (
            this.bullet.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            this.bullet.positionX + this.bullet.width > obstacleInstance.positionX &&
            this.bullet.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            this.bullet.height + this.bullet.positionY > obstacleInstance.positionY
        ) {
            this.mark++;
            
            obstacleInstance.domElement.remove();
            this.obstacles.shift();
        } else {
            obstacleInstance.domElement;
            this.obstacles;
        }
        this.showScore(this.mark);
    }

    removeObstacleIfOutside(obstacleInstance){
        if(obstacleInstance.positionY <= 0 - obstacleInstance.height){
            //console.log("reove obstables with position", obstacleInstance.positionY);
            //obstacleInstance.domElement.style.backgroundColor = "orange";
            
            //obstacleInstance.shift();
            //console.log(this.obstacles.length);
            obstacleInstance.domElement.remove();
            this.obstacles.shift();//remove from the array;
        };
    }

    showScore(mark) {
        const score = document.querySelector(".scoreBoard span");
        score.innerHTML = mark;     
    }
}

class Player {
    constructor(){
        
        //use width and height as number, for calculation
        this.width = 8 ; //size should set here but not css, otherwise js need to get info from css
        this.height = 8;
        this.positionX = 50 - (this.width * 0.5); //centerposition
        this.positionY = 50;
       
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
            this.positionX -= 2; //update value, no need to return     
            //update css for the player dom element   
            this.domElement.style.left = this.positionX + "vw";    
        }
        //console.log(`new position...${this.positionX}`);
    }

    moveRight(){
        if (this.positionX<(100-this.width)) {
            this.positionX += 2;
            this.domElement.style.left = this.positionX + "vw";
        }
        //console.log(`new position...${this.positionX}`);
    }

    
    moveUp() {
        if (this.positionY<100) {
            this.positionY += 3;
            this.domElement.style.bottom = this.positionY + "vh";
        }
    }

    moveDown() {
        if (this.positionY>0) {
            this.positionY -= 3;
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
        this.domElement.style.transform = "rotate(270deg)";
    }

    rotateToBack() {
        this.domElement.style.transform = "rotate(180deg)";
    }
}



//console.log(player.positionX); It's not work as it just excutes one time.

class Obstacle {
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

        this.domElement.className = "obstacle"; //there're lots of obstacles, use class but not id
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

class Bullet {
    constructor(positionX, positionY, widthOfPlayer, heightOfPlayer) {
        this.width = 2;
        this.height = 4;
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
        this.domElement.className = "bullet"; //there're lots of obstacles, use class but not id
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
}


/* set game class can also set start , restart and game over */
const game = new Game();
game.start();
game.attachEventListeners();





