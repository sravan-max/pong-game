const starttext = document.getElementById('startgametext');
const paddle1 = document.getElementById('Paddlel');
const paddle2 = document.getElementById('Paddle2');
const ball = document.getElementById('ball');
const score1 = document.getElementById('player1score');
const score2 = document.getElementById('player2score');
const losssound = document.getElementById('losssound')
const wallsound = document.getElementById('wallsound')
const paddlesound = document.getElementById('paddlesound')


let game = false;
let keypressed = {};
let paddle1speed = 0;
let paddle1y = 95;
let paddle2speed = 0;
let paddle2y = 95;
let gameheight = 208;
let gameWidth = 240.5;
let ballx = 114;
let ballxspeed = 1;
let bally = 95;
let ballyspeed = 1;
let player1score = 0;
let player2score = 0;

const paddleAcceleration = 0.5;
const maxPaddleSpeed = 5;
const paddledeacceleration = 1; 


document.addEventListener('keydown',startgame);
document.addEventListener('keydown',holdkeydown);
document.addEventListener('keyup',holdkeyup);

function startgame(){
    game = true;
    starttext.style.display = 'none';
    document.removeEventListener('keydown',startgame);
    gameloop();
}

function gameloop(){
    if(game){
        updatepaddle1();
        updatepaddle2(); 
        updateball();
        setTimeout(gameloop,8);
    }
}

function holdkeydown(e){
    keypressed[e.key] = true;
}

function holdkeyup(e){
    keypressed[e.key] = false;
}

function updatepaddle1(){
    if(keypressed['W']){
        paddle1speed = Math.max(paddle1speed - paddleAcceleration, -maxPaddleSpeed);
    }else if(keypressed['S']){
        paddle1speed = Math.min(paddle1speed + paddleAcceleration, maxPaddleSpeed);
    }else{
        if(paddle1speed > 0){
            paddle1speed = Math.max(paddle1speed - paddledeacceleration,0);
        }else if(paddle1speed < 0){
            paddle1speed = Math.min(paddle1speed + paddledeacceleration,0);
        }
    }
    
    paddle1y += paddle1speed;

    if(paddle1y < 0){
        paddle1y = 0;
    }
    if(paddle1y > gameheight - paddle1.clientHeight){
        paddle1y = gameheight - paddle1.clientHeight;
    }
    
    paddle1.style.top = paddle1y + 'px';
}

function updatepaddle2(){ 
    if(keypressed['ArrowUp']){
        paddle2speed = Math.max(paddle2speed - paddleAcceleration, -maxPaddleSpeed);
    }else if(keypressed['ArrowDown']){
        paddle2speed = Math.min(paddle2speed + paddleAcceleration, maxPaddleSpeed);
    }else{
        if(paddle2speed > 0){
            paddle2speed = Math.max(paddle2speed - paddledeacceleration,0);
        }else if(paddle2speed < 0){
            paddle2speed = Math.min(paddle2speed + paddledeacceleration,0);
        }  
    }
    
    paddle2y += paddle2speed;
    
    if(paddle2y < 0){
        paddle2y = 0;
    }

    if(paddle2y > gameheight - paddle2.clientHeight){
        paddle2y = gameheight - paddle2.clientHeight;
    }
    
    paddle2.style.top = paddle2y + 'px';
}

function updateball(){
    ballx += ballxspeed;
    bally += ballyspeed;
     
    if(bally > gameheight - ball.clientHeight || bally <= 0){
        ballyspeed = -ballyspeed;
        playsound(wallsound);
    }
    if(ballx >= gameWidth - paddle2.clientWidth - ball.clientWidth && bally >= paddle2y && bally <= paddle2y + paddle2.clientHeight){
        ballxspeed = -ballxspeed; 
        playsound(paddlesound);
    }
    if(ballx <= paddle1.clientWidth && bally >= paddle1y && bally <= paddle1y + paddle1.clientHeight ){
        ballxspeed = -ballxspeed;
        playsound(paddlesound);
    }

    if(ballx <= 0){
        player2score++;
        playsound(losssound);
        updatescore();
        resetball();
        pausegame()
    }else if(ballx >= gameWidth - ball.clientWidth){
        player1score++;
        playsound(losssound);
        updatescore();
        resetball();
        pausegame();
    }

    ball.style.left = ballx + 'px';
    ball.style.top = bally + 'px';
 
}

function updatescore(){
    score1.textContent = player1score;
    score2.textContent = player2score;
}

function resetball(){
    ballx = gameWidth / 2 - ball.clientWidth/2 - 1 ;
    bally = gameheight/ 2 ;
    ballxspeed = Math.random() > 0.5 ? 1 : -1;
    ballyspeed = Math.random() > 0.5 ? 1 : -1;
}

function pausegame(){
    game = false;
    document.addEventListener('keydown', startgame);
}

function playsound(sound){
    sound.currentTime = 0;
    sound.play();
}

