class Snake{
	constructor(gameSetting){
		this.gameSetting = gameSetting;
		this.layer = this.getSnakeCanvas();
		this.snakeBody = this.initSnakeBody();
		this.dirct = Object.assign({}, this.gameSetting.snakeInit.dirct);
		this.initSnakeTurnEvent();
	}
	getSnakeCanvas(){
		//setup myCanvas
		let snakeCanvas = document.getElementById("myCanvas");
		snakeCanvas.width = this.gameSetting.x;
		snakeCanvas.height = this.gameSetting.y;
		let layer = snakeCanvas.getContext("2d");
		return layer;
	}

	initSnakeBody(){
		let snakeBodyInit = []
		for (var i = 0; i < this.gameSetting.snakeInit.length; i++){
            var node = {
                x : this.gameSetting.snakeInit.x - i,
                y : this.gameSetting.snakeInit.y,
            };
            snakeBodyInit.push(node);
        }
        return snakeBodyInit;
	}

	getSnakeBody(){
		return this.snakeBody;
	}

	setSnakeBody(snakeBody){
		this.snakeBody = snakeBody;
	}

	getSnakeDirct(){
		return this.dirct;
	}

	setSnakeDirt(dirct){
		this.dirct = dirct;
	}

	initSnakeTurnEvent(){
		//arrow key control snake move
		document.addEventListener("keydown", (function(e) {
			let dirct = this.getSnakeDirct();
			if(Math.abs(e.keyCode - dirct.prevCode) == 2){
				return; //prevent opposite move direction
			}
			switch (e.keyCode) {
			      case ARROWRIGHT:
			      		dirct.next = 'RIGHT';
			      		dirct.prevCode = ARROWRIGHT;
			        break;
			      case ARROWLEFT:
			        	dirct.next = 'LEFT';
			        	dirct.prevCode = ARROWLEFT;
			        break;
			      case ARROWUP:
			         	dirct.next = 'UP';
			         	dirct.prevCode = ARROWUP;
			        break;
			      case ARROWDOWN:
			      		dirct.next = 'DOWN';
			      		dirct.prevCode = ARROWDOWN;
			      break;
			}
			this.setSnakeDirt(dirct);

		 }).bind(this), false);
	}

	getNewHead(dirct){
		let head = this.snakeBody[0];
		let newHead;
		//head coordinate change with arrow direction
		switch (dirct.next) {
	      case 'RIGHT':
	        newHead = {
	        	x : head.x + 1,
                y : head.y
	        };
	        break;
	      case 'LEFT':
	        newHead = {
                x : head.x - 1,
                y : head.y
            };
	        break;
	      case 'UP':
	        newHead = {
                x : head.x,
                y : head.y - 1
            };
	        break;
	      case 'DOWN':
	        newHead = {
                x : head.x,
                y : head.y + 1
            };
	        break;
	    }
	    return newHead;
	}

	drawSnake(){
		this.layer.fillStyle='rgba(0,0,255,0.5)';
		 for (var i = this.snakeBody.length - 1; i > 0; i--){
	            var x = this.snakeBody[i].x * SNAKESIZE;
	            var y = this.snakeBody[i].y * SNAKESIZE;
	            this.layer.fillRect(x, y, SNAKESIZE, SNAKESIZE);
	    }
	}

	snakeClear(){
		//clear direction and body coordinate data
		this.dirct = Object.assign({}, this.gameSetting.snakeInit.dirct);
		this.snakeBody = this.initSnakeBody()
	}


}









