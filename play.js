Play = Class.extend();

Play.inst;

Play.init = function () {
	Play.inst = this;
	this.background = baa.sprite.new();
	this.background.setImage("images/background.png");
	// this.background.alpha = 0.5;
	this.grid = Grid.new(0);
	this.solidObjects = baa.group.new();
	// this.piece = Piece.new();
}

Play.update = function () {
	// this.piece.update();
	this.grid.update();
	// this.solidObjects.resolveCollision(baa.group.others);
}

Play.draw = function () {
	this.drawBackground();
	this.grid.draw();
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