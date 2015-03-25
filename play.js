Play = Class.extend();

Play.inst;

Play.init = function () {
	Play.inst = this;
	this.background = baa.sprite.new();
	this.background.setImage("images/background.png");
	// this.background.alpha = 0.5;
	// this.background.alpha = 0.5;
	this.solidObjects = baa.group.new();

	this.gridLeft = Grid.new(0);
	this.gridRight = Grid.new(1);
	this.grids = baa.group.new(this.gridLeft,this.gridRight)
 
	this.ball = Ball.new();

	this.solidObjects.add(this.ball);

	this.score1 = Score.new();
	this.score1.oX = 140;
	this.score2 = Score.new();
	this.score2.oX = 250;

	// this.car = Car.new();
	
	
	// this.piece = Piece.new();s
}

Play.update = function () {
	// this.piece.update();
	this.grids.update();
	this.ball.update();
	// this.car.update();
	this.solidObjects.resolveCollision(this.ball);
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
	this.grids.draw();
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