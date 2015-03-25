Game = Class.extend();

Game.init = function () {
	this.theme = baa.audio.newSource("audio/theme.ogg");
	this.theme.play();
	this.theme.setVolume(0.3);
	this.theme.setLooping(true);

	this.state = Play.new(true);
	this.paused = false;
	this.timeManager = baa.timeManager.new(this);
}

Game.update = function () {
	if (baa.keyboard.isPressed("p")) {
		this.paused = !this.paused;
		if (this.paused) {
			this.theme.pause();
		}
		else {
			this.theme.play();
		}
	}
	if (baa.keyboard.isPressed("m")) {
		if (this.theme.isPlaying()) {
			this.theme.pause();
		}
		else {
			this.theme.play();
		}
	}

	if (!this.paused) {
		this.state.update();
	}
}

Game.draw = function () {
	baa.graphics.scale(2);
	this.state.draw();
}