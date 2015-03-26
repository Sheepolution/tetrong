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

	this.piece = Piece.new();
	
	if (n == 1) {
		this.x = 304;
	}
	else {
		this.x = 0;

		this.piece.keys = {
			up : "w",
			down : "s",
			left : "a",
			right :"d",
		}

	}

	this.totalLines = 0;


	this.timerManager = baa.timeManager.new(this);

	this.timerGameOverfill = this.timerManager.newTimer(0.02,true,function (self) {return self.gameover},"fillBoard");

	this.gameover = false;
	this.fillComplete = false;
	
	this.fillingLine = 17;
	this.fillGroup = baa.group.new();
	this.fillGroup.prepare(baa.sprite.new());

	this.piece.setGrid(this);



	// this.collisionGroup = baa.group.new();
	// this.insert(this.piece);
}

Grid.update = function () {
	if (!this.gameover) {
		this.piece.update();
	}

	this.timerManager.update();
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
	this.fillGroup.draw();
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
	var grounded = false;
	for (var i = this.piece.row; i < this.piece.row + this.piece.shapeHeight; i++) {
		if (i != 17) {
			for (var j = this.piece.column; j < this.piece.column + this.piece.shapeWidth; j++) {
				if (this.piece.shape[i - this.piece.row][j - this.piece.column]) {
					if (this.data[i][j] != 0) {
						this.gameover = true;
					}
					if (this.data[i+1][j] != 0) {
						grounded = true;
					}
				}
			}
		}
		else {
			return true;
		}
	}

	if (this.gameover) {
		this.startGameOver();
		grounded = false;
	}

	return grounded;
}

Grid.insert = function () {
	for (var i = this.piece.row; i < this.piece.row + this.piece.shapeHeight; i++) {
		for (var j = this.piece.column; j < this.piece.column + this.piece.shapeWidth; j++) {
			if (this.piece.shape[i - this.piece.row][j - this.piece.column]) {
				var piece = this.piece.shape[i - this.piece.row][j - this.piece.column];
				this.data[i][j] = piece;
			}
		}
	}

	this.checkForCompleteLines();
}

Grid.newPiece = function () {
	this.piece = Piece.new();
	this.piece.setGrid(this);

	if (this.x < 200) {
		this.piece.keys = {
			up : "w",
			down : "s",
			left : "a",
			right :"d",
		}
	}
}

Grid.checkForCompleteLines = function () {
	var completeLines = [];
	for (var i = 0; i < this.data.length; i++) {
		if (this.checkLine(i)) {
			completeLines.push(i);
		}
	}


	for (var i = 0; i < completeLines.length; i++) {
		for (var j = 1; j < this.data[completeLines[i]].length-1; j++) {
			var obj = this.data[completeLines[i]][j];
			Play.inst.solidObjects.remove(obj);
			this.data[completeLines[i]][j] = 0;
		}
		for (var j = completeLines[i]; j > 1 ; j--) {
			for (var k = 1; k < this.data[j].length-1; k++) {
				var obj = this.data[j-1][k];
				if (obj) {
					// print(obj,obj.y);
					obj.y += Piece.tileSize;
					obj.last.y += Piece.tileSize;
				}
				this.data[j][k] = this.data[j-1][k];
			}
		}
	}

	var score = completeLines.length == 4 ? 2 : completeLines.length > 0 ? 0.25 : 0;
	if (this.x < 200) {
		Play.inst.score1.setScore(score,true);
	}
	else {
		Play.inst.score2.setScore(score,true);
	}

}

Grid.checkLine = function (row) {
	for (var i = 0; i < this.data[row].length; i++) {
		if (!this.data[row][i]) {
			return false;
		}
	}
	return true;
}

Grid.fillBoard = function () {
	if (!this.fillComplete) {
		var spr = baa.sprite.new();
		spr.setImage("images/gameoverbar.png");
		spr.x = this.x + Piece.tileSize;
		spr.y = this.fillingLine * Piece.tileSize;
		this.fillGroup.add(spr);
	}
	else {
		this.fillGroup.remove(this.fillGroup[this.fillingLine]);
	}

	this.fillingLine--;
	if (this.fillingLine < 0) {
		if (!this.fillComplete) {
			this.refresh();
			this.fillComplete = true;
			this.fillingLine = 17;
		}
		else {
			this.gameover = false;
			this.fillComplete = false;
			this.fillingLine = 17;
		}
	}
}

Grid.resetFillBoard = function () {
	this.fillGroup = baa.group.new();
	this.fillGroup.prepare(baa.sprite.new());
	this.fillingLine = 17;
	this.fillingComplete = false;
}

Grid.refresh = function () {
	for (var i = 0; i < this.data.length; i++) {
		for (var j = 1; j < this.data[i].length-1; j++) {
			var obj = this.data[i][j];
			if (obj != 0) {
				// obj.destroy();
				Play.inst.solidObjects.remove(this.data[i][j]);
				this.data[i][j] = 0;
			}
				// this.data[i][j].draw();
		}
	}
}

Grid.startGameOver = function () {
	if (this.x < 200) {
		Play.inst.score2.setScore(2,true);
	}
	else {
		Play.inst.score1.setScore(2,true);
	}
}