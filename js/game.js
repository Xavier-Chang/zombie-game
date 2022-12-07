import Player from "./player.js";
import Zombie from "./zombie.js";
import Bullet from "./bullet.js";

export default class Game { //game class hold all other class
    constructor(){
        //this.player;
        //set an array to keep the new zombies; 
        //will hold instances of the class zombie;
        //detect outside the board - remove from the dom and this array, 
        //shift() - remove the first element: 
        this.zombies = [];
        this.bullet;
        this.mark = 0;
        this.right;
        this.left;
        this.front = true;
        this.back;
        
    }
    start(){ //too long, need to break down

        this.player = new Player();
        
        //How to create more zombies? --> interval 1000ms
//Where to store them?
        setInterval(() => {
            const newzombie = new Zombie();
            this.zombies.push(newzombie);
        }, 2500)
        
        //Update zombies
        //bonus: start after 3s
        this.bullet = new Bullet(this.player.positionX, 100, 0, 0);
        this.bullet.shootUp();

        setTimeout(()=>{
            setInterval(() => {
                this.zombies.forEach((zombieInstance) => {
                    //move current zombie
                    zombieInstance.randomMove();
                    //detect if there's a collision between player and current zombie
                    //zombies.forEach
                    this.detectCollision(zombieInstance);
                    
                    this.bulletHit(zombieInstance);
                    //check if we nned to remove current zombie
                    this.removezombieIfOutside(zombieInstance);                   
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

    detectCollision(zombieInstance) { //dont
        if (
            this.player.positionX < zombieInstance.positionX + zombieInstance.width &&
            this.player.positionX + this.player.width > zombieInstance.positionX &&
            this.player.positionY < zombieInstance.positionY + zombieInstance.height &&
            this.player.height + this.player.positionY > zombieInstance.positionY
        ){
            console.log('collision detected!') //we don't expect player open console
            //alert('gameover'); //need to refresh
            
            /*setTimeout(()=>{
                location.href = "gameover.html"//redirect to another page
            },300)*/
            
        }
    }

    bulletHit(zombieInstance){
        //let mark = 0;
        if (
            this.bullet.positionX < zombieInstance.positionX + zombieInstance.width &&
            this.bullet.positionX + this.bullet.width > zombieInstance.positionX &&
            this.bullet.positionY < zombieInstance.positionY + zombieInstance.height &&
            this.bullet.height + this.bullet.positionY > zombieInstance.positionY
        ) {
            this.mark++;
            
            zombieInstance.domElement.remove();
            this.zombies.shift();
        } else {
            zombieInstance.domElement;
            this.zombies;
        }
        this.showScore(this.mark);
    }

    removezombieIfOutside(zombieInstance){ //adjust all the screen
        if(zombieInstance.positionY <= 0 - zombieInstance.height || zombieInstance.positionY >= 100 + zombieInstance.height ||
            zombieInstance.positionX <= 0 - zombieInstance.width || zombieInstance.positionX >= 100 + zombieInstance.width){
            
            zombieInstance.domElement.remove();
            this.zombies.shift();
        };
    }

    showScore(mark) {
        const score = document.querySelector(".scoreBoard span");
        score.innerHTML = mark;     
    }
}

