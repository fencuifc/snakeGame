//init random food
	
class Food {
    constructor (gameSetting) {
    	this.gameSetting = gameSetting;
    	this.coordinate = {x:0,y:0}
    }
    
    setCoordinates () {
    	this.coordinate = {
    		x:parseInt(Math.random() * (SCREENW/ FOODSIZE - 1)),
    		y:parseInt(Math.random() * (SCREENH/ FOODSIZE - 1))
    	};
    }
    getCoordinates(){
    	return this.coordinate;
    }

    getFoodCanvas(){
    	//setup food canvas
		let foodCanvas = document.getElementById("food");
		foodCanvas.width = this.gameSetting.x;
		foodCanvas.height = this.gameSetting.y;
		let foodLayer = foodCanvas.getContext("2d");
		return foodLayer;
    }

    drawFood(layer,coordinate){
    	layer.fillStyle='rgba(255,0,0,0.5)';
		layer.fillRect(coordinate.x * FOODSIZE, coordinate.y * FOODSIZE ,FOODSIZE,FOODSIZE);
    }

    dropFood(){
    	let foodLayer = this.getFoodCanvas();
    	foodLayer.clearRect(0, 0, SCREENW, SCREENH);
    	this.setCoordinates();
    	this.drawFood(foodLayer, this.coordinate);
    }
}





