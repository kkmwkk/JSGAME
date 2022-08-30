// canvas settings
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage,spaceshipImage,bulletImage,enemyImage,gameoverImage;

let gameOver = false // true이면 게임이 끝남, false이면 게임이 끝남.

// 우주선 좌표
let spaceshipX = canvas.width/2 - 32;
let spaceshipY = canvas.height-64;
let bulletlist = [] // 총알을 저장하는 리스트
let score = 0;




function Bullet(){
    this.x = 0;
    this.y = 0;
    this.init = function(){
        this.x = spaceshipX + 16;
        this.y = spaceshipY;
        this.alive = true // true면 살아있는 총알 false면 죽은 총알

        bulletlist.push(this);
    };
    this.update = function(){
        this.y -= 7;
    };

    this.checkHit = function(){
        for(let i = 0; i < enemylist.length; i++){
            if(this.y <= enemylist[i].y && this.x >= enemylist[i].x && this.x <= enemylist[i].x + 32){
                score ++;
                this.alive = false; // 죽은 총알
                enemylist.splice(i, 1);

            }
        }
    }
}

function generateRandomValue(min,max){
    let randomNum = Math.floor(Math.random()*(max-min+1))+min
    return randomNum
}
let enemylist =[];
function Enemy(){
    this.x = 0;
    this.y = 0;
    this.init = function(){
        this.y = 0;
        this.x = generateRandomValue(0, canvas.width - 64);
        enemylist.push(this);
    }
    this.update = function(){
        this.y += 4;

        if(this.y >= canvas.height - 64){
            gameOver = true;
        }
    }
}
function loadImage(){
    backgroundImage = new Image();
    backgroundImage.src = "images/background.jpg";

    spaceshipImage = new Image();
    spaceshipImage.src = "images/spaceship.png";

    bulletImage = new Image();
    bulletImage.src = "images/bullet.png";

    enemyImage = new Image();
    enemyImage.src = "images/enemy.png";

    gameoverImage = new Image();
    gameoverImage.src = "images/gameover.png";
}

let keysDown = {};

function setupKeyboardListener(){
    document.addEventListener("keydown", function(event){



        keysDown[event.keyCode] = true;
        console.log("키다운객체에 들어간 값은?", keysDown);

                
    });
    document.addEventListener("keyup", function(){
        delete keysDown[event.keyCode];
        console.log("버튼 클릭 후", keysDown);

        if(event.keyCode == 32){
            createBullet(); // 총알 생성하는 함수
        }
    });

}

function createBullet(){
    let b = new Bullet(); // 총알 하나 생성
    b.init();
}

function createEnemy(){
    const interval = setInterval(function(){
        let e = new Enemy()
        e.init()
    }, 1000)
}

function update(){
    //right 
    if(39 in keysDown){
        spaceshipX += 5; // 우주선의 속도를 설정

    } 
    //left
    if(37 in keysDown){
        spaceshipX -= 5;
    }
    // 우주선의 좌표값을 경기장 안에서만 있게 하려면?
    if(spaceshipX <= 0){
        spaceshipX = 0;
    }
    if(spaceshipX >= canvas.width-64){
        spaceshipX = canvas.width-64;
    }

    //총알의 y 좌표 업데이트    
    for(let i = 0; i<bulletlist.length; i++){
        if(bulletlist[i].alive){
            bulletlist[i].update();
            bulletlist[i].checkHit();
        }
        
    }

    //적군의 y 좌표 업데이트 
    for(let i =0; i < enemylist.length; i++){
        enemylist[i].update();
    }
}





function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY);
    ctx.fillText(`Score:${score}`, 20, 20);
    ctx.fillStyle ="white";
    ctx.font = "20px Arial";
    
    for(let i = 0; i < bulletlist.length;i++){ 
        if(bulletlist[i].alive){
            ctx.drawImage(bulletImage, bulletlist[i].x,bulletlist[i].y);
        }
    }
    
    for(let i = 0; i < enemylist.length; i++){
        ctx.drawImage(enemyImage, enemylist[i].x, enemylist[i].y);
    }

}

// 무한render
function main(){
    if(!gameOver){
        update();
        render();
        requestAnimationFrame(main);
    }else{
        ctx.drawImage(gameoverImage, 10, 100, 380, 380);
    }
    
}


loadImage();
setupKeyboardListener();
createEnemy();
main();


// 방향키를 누르면
// 우주선의 xy좌표가 바뀌고
// 다시 render

//총알만들기
//1. 스페이스바를 누르면 총알 발사
//2. 총알이 발사 = 총알의 y값이 -- , 총알의 x값은? 스페이스를 누른 순간의 우주선의 x좌표
//3. 발사된 총알들은 총알 배열에 저장을 한다.
//4. 총알들은 x,y 좌표값이 있어야 한다.
//5. 총알 배열을 가지고 render 그려준다.
