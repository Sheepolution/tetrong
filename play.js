Play = Class.extend();

Play.inst;

Play.init = function () {
	Play.inst = this;
	this.background = baa.sprite.new();
	this.background.setImage("images/background.png");
	// this.background.alpha = 0.5;
	this.solidObjects = baa.group.new();

	this.gridLeft = Grid.new(0);
	this.gridRight = Grid.new(1);
	this.grids = baa.group.new(this.gridLeft,this.gridRight)
 
	this.ball = Ball.new();

	this.solidObjects.add(this.ball);
	
	// this.piece = Piece.new();s
}

Play.update = function () {
	// this.piece.update();
	this.grids.update();
	this.ball.update();
	this.solidObjects.resolveCollision(this.ball);
}

Play.draw = function () {
	this.drawBackground();
	this.grids.draw();
	this.ball.draw();
	// this.piece.draw();
}

Play.drawBackground = function () {
	this.background.x = 0;
	this.background.draw();
	this.background.x = 304;
	this.background.draw();
	for (var i = 0; i < 15; i++) {
		baa.graphics.rectangle("fill",200,i * 10,2,5);
	}
}

Play.newPiece = function () {
	this.piece = Piece.new();
}