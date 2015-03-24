Smallpiece = baa.entity.extend();

Smallpiece.init = function (x,y,i) {
	Smallpiece.super.init(this,x,y);
	Play.inst.solidObjects.add(this);
	this.setImage("images/smallpiece_" + i + ".png")
	this.seperatePriority = 100;
	this.local = baa.point.new(x,y);
}

Smallpiece.setGlobalPosition = function (_x, _y) {
	this.last.clone(this);
	this.x = this.local.x + _x;
	this.y = this.local.y + _y;
}

// Smallpiece.onOverlap  = function (e) {
// 	e.onOverlap(this);
// }
// Smallpiece.onOverlap = function (e) {
// 	if (e.is(Piece)) {
// 		e.onOverlap(this);
// 	}
// 	else {
// 		Smallpiece.super.onOverlap(this,e);
// 	}
// }