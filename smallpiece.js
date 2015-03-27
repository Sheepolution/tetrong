Smallpiece = baa.entity.extend();

Smallpiece.init = function (x,y,i,p,row,column) {
	Smallpiece.super.init(this,x,y);
	Play.inst.solidObjects.add(this);
	this.setImage("images/smallpiece_" + i + ".png")
	this.seperatePriority = 100;
	this.local = baa.point.new(x,y);

	this.localRow = row;
	this.localColumn = column;

	this.row = 0;
	this.column = 0;

	this.parent = p;

	// Play.inst.piecesRight.add(this);
	// print(Play.inst.piecesRight.length);

	this.neighbours = {
		left : false,
		right : false,
		up : false,
		down : false
	}
}

Smallpiece.setGlobalPosition = function (_x, _y) {
	this.last.clone(this);
	this.x = this.local.x + _x;
	this.y = this.local.y + _y;
}

Smallpiece.onOverlap = function (ball) {
	// ball.velocity.y = baa.utils.choose([0,100,200]) * baa.utils.sign(ball.velocity.y);
	// if (this.last.overlapsX(ball.last) && !this.last.overlapsY(ball.last)) {
	ball.beep.play();
	// if (this.parent.active) {
	// 	if (this.parent.grid.x < 200) {
	// 		ball.beep.play();
	// 		if (ball.last.x > (this.parent.column * Piece.tileSize) + this.parent.width) {
	// 			ball.velocity.x = Math.abs(ball.velocity.x);
	// 			ball.x = (this.parent.column * Piece.tileSize) + this.parent.width;
	// 		}
	// 		else {
	// 			if (ball.last.x > this.last.right() && ball.last.overlapsY(this)) {
	// 				ball.velocity.x = Math.abs(ball.velocity.x);
	// 				// ball.x = (this.parent.column * Piece.tileSize) + this.parent.width;
	// 				ball.x = this.right();
	// 			}
	// 			else {
	// 				if (ball.y > ball.last.y) {
	// 					ball.velocity.y *= -1;
	// 					ball.bottom(this.parent.row * Piece.tileSize);
	// 				}
	// 				else {
	// 					ball.velocity.y *= -1;
	// 					ball.top( (this.parent.row * Piece.tileSize) + this.parent.height);
	// 				}
	// 			}
	// 		}
	// 	}
	// 	else {

	// 		if (ball.last.x < (this.parent.x + this.parent.column * Piece.tileSize) ) {
	// 			ball.velocity.x = -Math.abs(ball.velocity.x);
	// 			ball.right(this.parent.x + this.parent.column * Piece.tileSize);
	// 		}
	// 		else {
	// 			if (ball.last.right() < this.last.x && ball.last.overlapsY(this)) {
	// 				ball.velocity.x = Math.abs(ball.velocity.x);
	// 				// ball.x = (this.parent.column * Piece.tileSize) + this.parent.width;
	// 				ball.x = this.left();
	// 			}
	// 			else {
	// 				if (ball.velocity.y > 0) {
	// 					ball.velocity.y *= -1;
	// 					ball.bottom(this.parent.row * Piece.tileSize);
	// 				}
	// 				else {
	// 					ball.velocity.y *= -1;
	// 					ball.top( (this.parent.row * Piece.tileSize) + this.parent.height);
	// 				}
	// 			}
	// 		}
	// 	}
	// }
	// else {
	// }
	Smallpiece.super.onOverlap(this,ball);

	if (!Play.inst.typeA && !this.parent.active) {
		Play.inst.solidObjects.remove(this);
		if (this.parent.grid.x < 200) {
			Play.inst.gridLeft.data[this.row][this.column] = 0;
		}
		else {
			Play.inst.gridRight.data[this.row][this.column] = 0;
		}

	}
	

}

Smallpiece.checkNeighbours = function (e) {
	this.neighbours.left = false;
	this.neighbours.right = false;
	this.neighbours.up = false;
	this.neighbours.down = false;

	if (!this.overlaps(e)) {
		this.x+=1;
		this.neighbours.right = this.overlaps(e);
		this.x-=2;
		this.neighbours.left = this.overlaps(e);
		this.x+=1;
		this.y+=1;
		this.neighbours.down = this.overlaps(e);
		this.y-=2;
		this.neighbours.up = this.overlaps(e);
		this.y+=1;
	}

	if (this.neighbours.right == true) {
		this.alpha = 0.5;
	}
	else {
		this.alpha = 1;
	}

}





// if (this.last.y < ball.last.y) {
// 			ball.velocity.y *= -1;
// 		}
// 		else {
// 			if (ball.x < 200) {
// 				ball.left(this.parent.x + this.parent.column * Piece.tileSize + this.parent.width);
// 				ball.velocity.x = Math.abs(ball.velocity.x);
// 			}
// 			else {
// 				ball.right(this.parent.x + this.parent.column * Piece.tileSize);
// 				ball.velocity.x = -Math.abs(ball.velocity.x);
// 			}
// 		}







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