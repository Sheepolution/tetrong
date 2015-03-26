Play = Class.extend();

Play.inst;

Play.init = function () {
	Play.inst = this;



	this.background = baa.sprite.new();
	this.background.setImage("images/background.png");
	// this.background.alpha = 0.5;
	// this.background.alpha = 0.5;
	this.solidObjects = baa.group.new();

	this.grids = baa.group.new()
 
	this.ball = Ball.new();

	this.solidObjects.add(this.ball);

	this.piecesRight = baa.group.new();
	this.piecesRight.prepare(Smallpiece);

	this.score1 = Score.new();
	this.score1.oX = 140;
	this.score2 = Score.new();
	this.score2.oX = 250;

	this.logo = baa.graphics.newImage("images/logo.png");

	// this.car = Car.new();

	this.players = baa.graphics.newImage("images/players.png");
	this.cursor = baa.graphics.newImage("images/cursor.png");
	this.selectedPlayer1 = true;
	this.singleplayer = true;
	this.inMenu = true;
	this.player1Won = false;
	this.gameover = false;
	this.showGameOver = false;
	this.imgGameOver = baa.graphics.newImage("images/gameover.png");
	this.imgGameWin = baa.graphics.newImage("images/gamewin.png");

	
	// this.piece = Piece.new();s
}

Play.update = function () {

	this.piecesRight.checkNeighbours(baa.group.others);

	if (!this.inMenu && !this.showGameOver) {
	// this.piece.update();
		this.grids.update();
	}

	this.ball.update();
	// this.car.update();
	this.solidObjects.resolveCollision(this.ball);

	if (this.inMenu) {
		if (baa.keyboard.isPressed("up") || baa.keyboard.isPressed("down")) {
			this.selectedPlayer1 = !this.selectedPlayer1;
		}

		if (baa.keyboard.isPressed("return")) {
			this.singleplayer = this.selectedPlayer1;
			this.startGame();
		}
	}

	if (this.showGameOver) {
		if (baa.keyboard.isPressed("return")) {
			Play.inst = null;
			game.state = Play.new();
			return;
		}

	}
	else if (!this.gameover) {
		if (this.score1.score >= 10) {
			this.gameover = true;
			if (this.gridLeft) {
				this.gridLeft.resetFillBoard();
				this.gridLeft.gameover = true;
			}
			this.gridRight.gameover = true;
			this.gridRight.resetFillBoard();
			this.player1Won = false;
		}
		else if (this.score2.score >= 10) {
			this.gameover = true;
			if (this.gridLeft) {
				this.gridLeft.resetFillBoard();
				this.gridLeft.gameover = true;
			}
			this.gridRight.gameover = true;
			this.gridRight.resetFillBoard();
			this.player1Won = true;
		}
	}
	else if (this.gameover) {
		if (this.gridRight.fillComplete) {
			this.showGameOver = true;
		}
	}



	// if (this.car.y < -200) {
	// 	if (baa.utils.random(1,20000) == 3) {
	// 		this.car.y = 400;
	// 	}
	// }
}

Play.draw = function () {
	this.score1.draw();
	this.score2.draw();
	// this.car.draw();
	this.drawBackground();

	if (this.showGameOver) {
		baa.graphics.rectangle("fill",313,0,78,300);
		baa.graphics.rectangle("fill",9,0,78,300);
		if (this.player1Won) {
			this.imgGameOver.draw(12,10);
			this.imgGameWin.draw(316,10);
		}
		else {
			this.imgGameOver.draw(316,10);
			this.imgGameWin.draw(12,10);
		}
	}
	else if (!this.inMenu) {
		this.grids.draw();
	}
	else{
		this.logo.draw(97,44);
		baa.graphics.rectangle("fill",313,0,78,300);
		this.players.draw(330,45);
		this.cursor.draw(320,this.selectedPlayer1 ? 45 : 80);
	}

	this.ball.draw();

	// this.solidObjects.draw();
	// this.piece.draw();
}

Play.drawBackground = function () {
	this.background.x = 0;
	this.background.draw();
	this.background.x = 304;
	this.background.draw();
	baa.graphics.setAlpha(1);
	for (var i = 0; i < 15; i++) {
		baa.graphics.rectangle("fill",200,i * 10,2,5);
	}
}

Play.newPiece = function () {
	this.piece = Piece.new();
}

Play.startGame = function () {
	this.ball.reset();
	this.gridRight = Grid.new(1);
	if (this.singleplayer) {
		this.grids.add(this.gridRight);
	}
	else {
		this.gridLeft = Grid.new(0);
		this.grids.add(this.gridLeft,this.gridRight);
	}
	this.inMenu = false;
}