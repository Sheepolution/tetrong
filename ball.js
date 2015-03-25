Ball = baa.entity.extend("Ball");

Ball.init = function () {
	Ball.super.init(this);
	this.setImage("images/ball.png");

	this.x = 200;
	this.y = 72;

	this.bounce.x = 1;
	this.bounce.y = 1;

	this.velocity.x = -100;
	this.velocity.y = 100;

	this.beep = baa.audio.newSource("audio/pong_beep.ogg");
	this.peep = baa.audio.newSource("audio/pong_peep.ogg");
	this.plop = baa.audio.newSource("audio/pong_plop.ogg");

	this.beep.setPitch(1.4);


	this.seperatePriority = 0;
	this.timerManager = baa.timeManager.new(this);
	this.pauseTimer = this.timerManager.newTimer(3,false);
	// this.angles = []
}

Ball.update = function () {
	Ball.super.update(this);

	if (this.x < -10) {
		this.peep.play();
		this.x = 200;
		this.y = 72;
		this.velocity.x = -100;
		this.velocity.y = 100;

		this.pauseTimer.reset();
		Play.inst.score2.setScore(1,true);
	}
	else if (this.x > 400) {
		this.peep.play();
		this.x = 200;
		this.y = 72;
		this.velocity.x = 100;
		this.velocity.y = 100;

		this.pauseTimer.reset();
		Play.inst.score1.setScore(1,true);

	}

	if (this.bottom() > 144) {
		this.velocity.y = -Math.abs(this.velocity.y);
		this.bottom(144);
		this.plop.play();
	}

	if (this.top() < 0) {
		this.velocity.y = Math.abs(this.velocity.y);
		this.top(0);
		this.plop.play();
	}


	if (Play.inst.gridLeft.gameover) {
		if (this.x < 88) {
			this.x = 88;
			this.velocity.x = Math.abs(this.velocity.x);
		}
	}

	if (Play.inst.gridRight.gameover) {
		if (this.x > 308 ) {
			this.x = 308 ;
			this.velocity.x = -Math.abs(this.velocity.x);
		}
	}


}

// Ball.onOverlap = function (e) {
// 	if (this.velocity.x > 0) {
// 		this.right(e.left());
// 		this.velocity.x *= -1;
// 	}
// 	if (this.velocity.x < 0) {
// 		this.left(e.right());
// 		this.velocity.x *= -1;
// 	}
// }