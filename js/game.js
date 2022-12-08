import Player from "./player.js";
import Zombie from "./zombie.js";
import Bullet from "./bullet.js";
import fatZombie from "./fatZombie.js";

export default class Game { 
    constructor(){
        this.zombies = [];
        this.bullet;
        this.mark = 0;
        //use to distinguish the direction of player
        this.right = true;
        this.left;
        this.front;
        this.back;
        this.hit = 0;  
    }

    start(){
        this.player = new Player();
        //Different zombie and more zombies will appear by the time pass. More challenging.
        setInterval(() => {
            const newzombie = new Zombie();
            this.zombies.push(newzombie);
        }, 2500)

        setTimeout(() => {
            setInterval(() => {
                const newzombie = new fatZombie();
                this.zombies.push(newzombie);
            }, 5000)
        }, 7500)

        setTimeout(() => {
            setInterval(() => {
                const newzombie = new Zombie();
                this.zombies.push(newzombie);
            }, 8000)
        }, 15500)

        setTimeout(() => {
            setInterval(() => {
                const newzombie = new fatZombie();
                this.zombies.push(newzombie);
            }, 10000)
        }, 25500)

        this.bullet = new Bullet(this.player.positionX, 100, 0, 0);
        this.bullet.shootUp();

        setTimeout(()=>{
            this.backgorundMusic();
            this.zombieSound();
            //make the zombie sount at random time
            setInterval(() => {
                this.zombieSound();
            }, 7000 + this.randomSec())

            setInterval(() => {
                this.zombies.forEach((zombieInstance, zombieIndex) => {
                    zombieInstance.zombieMove(this.player.positionX, this.player.positionY);                  
                    this.detectCollision(zombieInstance);                   
                    this.bulletHit(zombieInstance, zombieIndex);            
                });            
            }, 50);
        },2000)
    }

    attachEventListeners() {
        document.addEventListener('keydown', (e) => {            
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
                this.bullet.bulletSound();
                if (this.front){
                    this.bullet.shootUp(); 
                } else if (this.right) {
                    this.bullet.shootRight();
                } else if (this.left) {
                    this.bullet.shootLeft();
                } else if (this.back) {
                    this.bullet.shootDown();
                }             
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

    detectCollision(zombieInstance) {
        if (
            this.player.positionX < zombieInstance.positionX + zombieInstance.width &&
            this.player.positionX + this.player.width > zombieInstance.positionX &&
            this.player.positionY < zombieInstance.positionY + zombieInstance.height &&
            this.player.height + this.player.positionY > zombieInstance.positionY
        ){            
            setTimeout(()=>{
                this.hit ++;
                window.localStorage.setItem('mark', this.mark);
            }, 500)
            
            
            setTimeout(()=>{
                if (this.hit === 1){
                    this.deadSound();
                    setTimeout(() =>{
                        location.href = "gameover.html"
                    },2000)
                }                 
            },500)
            
        }
    }

    bulletHit(zombieInstance, zombieIndex){
        if (
            this.bullet.positionX < zombieInstance.positionX + zombieInstance.width &&
            this.bullet.positionX + this.bullet.width > zombieInstance.positionX &&
            this.bullet.positionY < zombieInstance.positionY + zombieInstance.height &&
            this.bullet.height + this.bullet.positionY > zombieInstance.positionY
        ) {
            if (this.mark >= 0 && this.mark < 15) {
                this.mark ++;
            } else if (this.mark >= 15 && this.mark < 35){
                this.mark += 2 ;
            } else if (this.mark >= 35 && this.mark < 50) {
                this.mark += 3;
            } else if (this.mark >=50) {
                this.mark += 4;
            }
            
            zombieInstance.domElement.remove();
            this.zombies.splice(zombieIndex, 1);            
        } 
        this.showScore(this.mark);
    }

    showScore(mark) {
        const score = document.querySelector(".scoreBoard span");
        score.innerHTML = mark;     
    }

    backgorundMusic() {
        const sound = new Audio("../src/audio/background.mp4")
        sound.volume = 0.05;
        sound.loop = true;
        sound.play();
    }

    randomSec() {
        const delay = Math.floor(Math.random() * 5000);
        return delay;
    }

    zombieSound() {
        const sound = new Audio("../src/audio/zombieSound.mp4")
        sound.volume = 0.1;
        sound.play();
    }

    deadSound() {
        const sound = new Audio("../src/audio/scream.mp4")
        sound.volume = 0.3;
        sound.play();
    }
}

