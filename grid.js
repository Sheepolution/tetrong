Grid = Class.extend("Grid");

Grid.init = function (n) {
	this.smallPieces = baa.group.new();
	this.data = [
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1]
	];

	if (n == 1) {
		this.x = 304;
	}
	else {
		this.x = 0;
	}

	this.piece = Piece.new();
	this.piece.setGrid(this);


	// this.collisionGroup = baa.group.new();
	// this.insert(this.piece);
}

Grid.update = function () {
	this.piece.update();
}

Grid.draw = function () {
	for (var i = 0; i < this.data.length; i++) {
		for (var j = 0; j < this.data[i].length; j++) {
			if (this.data[i][j] != 0 && this.data[i][j] != 1 && this.data[i][j] != null) {
				this.data[i][j].draw();
			}
		}
	}
	this.piece.draw();
}

Grid.checkAllowed = function (row,column) {
	for (var i = row; i < row + this.piece.shapeHeight; i++) {
		if (i != 18) {
			for (var j = column; j < column + this.piece.shapeWidth; j++) {
				if (this.piece.shape[i - row][j - column]) {
					if (this.data[i][j]) {
						return false;
					}
				}
			}
		}
		else {
			return false;
		}
	}

	return true;
}

Grid.checkGrounded = function () {
	for (var i = this.piece.row; i < this.piece.row + this.piece.shapeHeight; i++) {
		if (i != 17) {
			for (var j = this.piece.column; j < this.piece.column + this.piece.shapeWidth; j++) {
				if (this.piece.shape[i - this.piece.row][j - this.piece.column]) {
					if (this.data[i+1][j] != 0) {
						return true;
					}
				}
			}
		}
		else {
			return true;
		}
	}
}

Grid.insert = function () {
	for (var i = this.piece.row; i < this.piece.row + this.piece.shapeHeight; i++) {
		for (var j = this.piece.column; j < this.piece.column + this.piece.shapeWidth; j++) {
			if (this.piece.shape[i - this.piece.row][j - this.piece.column]) {
				var piece = this.piece.shape[i - this.piece.row][j - this.piece.column];
				this.data[i][j] = piece;
				Play.inst.solidObjects.add(piece);
			}
		}
	}
}

Grid.newPiece = function () {
	this.piece = Piece.new();
	this.piece.setGrid(this);
}

// Grid.insert = function () {
// 	for (var i = 0; i < this.piece.shape.length; i++) {
// 		for (var j = 0; j < this.piece.shape[i].length; j++) {
// 			this.data[i][j] = 1;
// 			// this.piece.shape[i][j]
// 		};
// 	}
// }

// Grid.addPieces = function (_i,_j,_shape,kind) {
// 	for (var i = 0; i < _shape.length; i++) {
// 		for (var j = 0; j < _shape[i].length; j++) {
// 			var xx = (_i + i) * Piece.smallPieceSize;
// 			var yy = (_j + j) * Piece.smallPieceSize;
// 			var obj = Smallpiece.new(xx,yy,kind);
// 			Play.inst.solidObjects.add(obj);
// 			this.data[_i + i][_j + j] = obj;
// 		}
// 	}
// }
