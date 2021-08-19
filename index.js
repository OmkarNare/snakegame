let inputDir = {x:0,y:0};
let speed = 4;
let lastPaintTime = 0;

let sneakArr = [
    {
        x:13 ,y :15
    }
];

let score =0;

food ={ x:6, y:7};

// sounds are not added after logic i will add
const gameOverSound = new Audio('/beep-03.mp3');
const foodSound = new Audio('/button-20.mp3');

//Game functions

function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);


    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }

    lastPaintTime = ctime;
    
    gameEingine();
}

function isCollide(snake){
    // if collided to urself
    for (let i = 1; i < sneakArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
        
    }
    // bump to wall
        if(snake[0].x >= 18 || snake[0].x<=0 || snake[0].y >= 18 || snake[0].y<=0 ){
            return true;
        }
   

    
}



function gameEingine(){
    //part 1 : updating the snake array
    
    if(isCollide(sneakArr)){
        gameOverSound.play();
        inputDir ={x:0,y:0};
        alert("Game over press any key to play again");

        sneakArr = [ { x:13 ,y :15 } ];

        score = 0;
    }

    // if you have eaten the food increment the food and regenerete the food
    if(sneakArr[0].y === food.y && sneakArr[0].x === food.x){
        foodSound.play();
       score +=1;

       if(score>highscoreval){
           highscoreval = score;
           localStorage.setItem("highscore",JSON.stringify(highscoreval));
           highScoreBox.innerHTML ="High-Score :" + highscoreval;
        }
       scoreBox.innerHTML = "score :" + score
        sneakArr.unshift({x:sneakArr[0].x + inputDir.x , y:sneakArr[0].y+inputDir.y });
        
        let a =2;
        let b = 16;
        food = {x: Math.round(a +(b-a) * Math.random()) , y: Math.round(a +(b-a) * Math.random())};
    }
    //moving the sneak

    for (let i = sneakArr.length-2;i>= 0; i--){
             
        sneakArr[i+1] = {...sneakArr[i]};

    }

    sneakArr[0].x += inputDir.x;
    sneakArr[0].y += inputDir.y;






    //part 2 : display the snake and food
    board.innerHTML = "";
    sneakArr.forEach((e ,index)=>{
        sneakElement = document.createElement('div');
        sneakElement.style.gridRowStart = e.y ;
        sneakElement.style.gridColumnStart = e.x ; 
        
        if(index ===0){
            sneakElement.classList.add('head');
        }
        else{
            sneakElement.classList.add('snake');
        }
        board.appendChild(sneakElement);
   
    });

    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}


//main logic starts hers
let highscore = localStorage.getItem("highscore");

if(highscore === null){
    highscoreval =0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval));
}
else{
    highscoreval = JSON.parse(highscore)
    highScoreBox.innerHTML ="High-Score :" + highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown' , e=>{
    inputDir = {x:0 ,y:1}

    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0 ;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1 ;
            break;

        case "ArrowLeft":
            console.log("ArroLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x =1 ;
            inputDir.y = 0;
            break;
                     

    }
})
