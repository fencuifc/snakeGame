let gameInit = () =>{
	const snakeInit = {
		length:3,
		dirct:{
			prevCode:ARROWRIGHT,
			next:'RIGHT'
		},
		x: 3,
		y: 0
	}
	//let gameSetting = new GameSetting(SCREENW,SCREENH,SPEED,snakeInit);
	const gameSetting = {
		x:SCREENW,
		y:SCREENH,
		speed:SPEED,
		snakeInit: snakeInit
	}
	let game = new Game(gameSetting);

	game.init();
	game.start();

	let btn = document.getElementById("reStartBtn");
	btn.addEventListener("click", (e)=>{
		game.restart();
	});
}


try {
  gameInit();
} catch (e) {
  console.log(e.stack);
}
