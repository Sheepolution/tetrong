Game = Class.extend();

Game.init = function () {
	
	this.state = Play.new(true);
	this.paused = false;
}

Game.update = function () {
	if (baa.keyboard.isPressed("p")) {
		this.paused = !this.paused;
	}
	if (!this.paused) {
		this.state.update();
	}
}

Game.draw = function () {
	baa.graphics.scale(2);
	this.state.draw();
}