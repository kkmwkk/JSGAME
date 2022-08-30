// canvas settings
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage,spaceshipImage,bulletImage,enemyImage,gameoverImage;

// 우주선 좌표
let spaceshipX = canvas.width/2 - 32;
let spaceshipY = canvas.height-64;

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
    });
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
}





function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY);
}

// 무한render
function main(){
    update();
    render();
    requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();


// 방향키를 누르면
// 우주선의 xy좌표가 바뀌고
// 다시 render