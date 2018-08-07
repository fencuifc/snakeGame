

class Game{
	constructor(gameSetting){
		this.gameSetting = gameSetting;
		this.scoreN = 0;
	}
	init(){
		this.food = new Food(this.gameSetting);
		this.snake = new Snake(this.gameSetting);

		const gameCallback = this.gameRule.bind(this);
		this.animate = new Animate(this.gameSetting.speed,gameCallback);
	}
	start(){
		this.food.dropFood();
		this.snakeMove();
		this.setGameScore(this.scoreN);
		document.getElementById("reStartBtn").disabled = true;
	}
	restart(){
		let snakeBody = [];
		this.scoreN = 0;
		this.snake.snakeClear()
		this.start();
	}

	stop(){
		this.animate.stopAnimate();
		document.getElementById("reStartBtn").disabled = false;
		alert("GAME OVER");
	}

	snakeMove(){
	   this.animate.startAnimate();
	}

	gameRule(myGameReq){
		 let snakeLayer = this.snake.getSnakeCanvas();
		 snakeLayer.clearRect(0,0,SCREENW,SCREENH);//clear layer First
		 let snakeBody = this.snake.getSnakeBody();
		 
		 //get new head data to check collide and food condition
		 let dirct = this.snake.getSnakeDirct();
		 let newHead = this.snake.getNewHead(dirct);

		 if(!this.checkCollide() && !!newHead){
			snakeBody.unshift(newHead); //add new head to snake body
	
			if(!!this.snakeGotFood()){ 
				//if got food, add head, keep tail = snake grow
               this.food.dropFood(); //drop new food to snake
               this.scoreN++;//set game score
               this.setGameScore(this.scoreN);
			}else{
				//if no food, remove last tail coordinate data
				snakeBody.pop();
			}
			this.snake.setSnakeBody(snakeBody);
			this.snake.drawSnake();
		}else{
			this.stop();
		}
	}

	setGameScore(score){
 		document.getElementById("score").innerHTML=score;
	}

	snakeGotFood(){
		let head = this.snake.snakeBody[0];
		let food = this.food.getCoordinates();
		if(head.x == food.x && head.y == food.y){
			return true;
		} 
		return false;
	}

	checkCollide(){	
		let head = this.snake.snakeBody[0];
		if(!head){
			return false;
		}
		//collide with Wall
		if(head.x < 0 || head.y < 0 || head.x*SNAKESIZE > SCREENW || head.y*SNAKESIZE > SCREENW){
			return true;
		}
        //collide with snake tail
        for (let i = 1; i < this.snake.snakeBody.length; i++){
            if (head.x == this.snake.snakeBody[i].x && head.y == this.snake.snakeBody[i].y){
                return true;
            }
        }
        return false
	}


}

