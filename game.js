Game = Class.extend();

Game.init = function () {
	this.state = Play.new();
}

Game.update = function () {
	this.state.update();
}

Game.draw = function () {
	baa.graphics.scale(2);
	this.state.draw();
}