Smallpiece = baa.entity.extend();

Smallpiece.init = function (x,y,i) {
	Smallpiece.super.init(this,x,y);
	this.setImage("images/smallpiece_" + i + ".png")
	this.seperatePriority = 100;
}

Smallpiece.onOverlap = function (e) {
	if (e.is(Piece)) {
		e.onOverlap(this);
	}
	else {
		Smallpiece.super.onOverlap(this,e);
	}
}