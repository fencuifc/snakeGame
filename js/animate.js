class Animate{
	constructor(fps, gameCallback){
		this.fps = fps;
	    this.fpsInterval = 1000 / fps;
	    this.now = Date.now();
	    this.gameCallback = gameCallback;
	}
	setGameReq(myGameReq){
		this.myGameReq = myGameReq;
	}
	getGameReq(){
		return this.myGameReq;
	}
	startAnimate(){
		let animateBind = animate.bind(this);
		animateBind();

		var fps, fpsInterval, now, then, elapsed;
		var gameCallback = this.gameCallback;//get game rule here
		now = this.now;
	    then = now;
	   	fpsInterval = this.fpsInterval;
	    
		function animate(){
			let myGameReq = requestAnimationFrame(animateBind); 
		    this.setGameReq(myGameReq);
		    now = Date.now();
		    var elapsed = now - then;// calc elapsed time since last loop 

		    if (elapsed > fpsInterval) {
		    	//if enough time has elapsed, draw the next frame
		        then = now - (elapsed % fpsInterval);		       
		        gameCallback(myGameReq);
		    }
		    return myGameReq;
		}

	}
	stopAnimate(){
		let myGameReq = this.getGameReq(); 
		cancelAnimationFrame(myGameReq);
	}
	

}