Score = baa.sprite.extend("score");

Score.init = function () {
	Score.super.init(this);
	this.setImage("images/numbers.png",5,9);
	this.x = 140;
	this.y = 20;
	this.scale.x = 3;
	this.scale.y = 3;
	this.digits = [];

	this.score = 0;

	this.setScore(0);

	this.subScore = 0;
}

Score.draw = function () {
	for (var i = 0; i < this.digits.length; i++) {
		this.currentFrame = this.digits[i] + 1;
		this.scale.x = 3;
		this.scale.y = 3;
		this.x = this.oX + i * 20;
		Score.super.draw(this);
		// print(this.subScore);
		
	}
	if (!Play.inst.singleplayer) {
		this.currentFrame = this.subScore + 1;
		this.x += 40;
		this.scale.x = 1;
		this.scale.y = 1;
		Score.super.draw(this);
	}
}

Score.setScore = function (score,r) {
	if (r) {
		this.score += score;
	} else {
		this.score = score;
	}
	this.digits = [];
	var d = (""+Math.floor(this.score)).split("");
	for (var i = 0; i < d.length; i++) {
		this.digits.push(parseInt(d[i]));
	}
	this.subScore = this.score - Math.floor(this.score);
	this.subScore /= 0.25;
}