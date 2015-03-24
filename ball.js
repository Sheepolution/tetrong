Ball = baa.entity.extend("Ball");

Ball.init = function () {
	Ball.super.init(this);
	this.setImage("images/ball.png");

	this.x = 300;
	this.y = 100;

	this.bounce.x = 1;
	this.bounce.y = 1;

	this.velocity.x = -100;
	this.velocity.y = 100;

	this.seperatePriority = 0;
}

Ball.update = function () {
	Ball.super.update(this);
	if (this.bottom() > 144 || this.top() < 0) {
		this.velocity.y *= -1;
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