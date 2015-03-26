Piece = Class.extend("Piece");

Piece.shapes = 
[
	[
		[1,1],
		[1,1]
	],
	[
		[1,1],
		[0,1,1]
	],
	[
		[1,1,1],
		[0,0,1]
	],
	[
		[0,1,1],
		[1,1]
	],
	[
		[1,1,1],
		[1]
	],
	[
		[0,1],
		[1,1,1]
	],
	[
		[1,1,1,1]
	]
]

Piece.tileSize = 8;

Piece.init = function () {
	this.shapeWidth = 0;
	this.shapeHeight = 0;

	this.kind = baa.utils.random(0,6);

	this.shape = [[],[],[],[]];

	this.groupImage = baa.group.new();
	for (var i = 0; i < Piece.shapes[this.kind].length; i++) {

		this.shapeHeight = Math.max(this.shapeHeight, i + 1);

		for (var j = 0; j < Piece.shapes[this.kind][i].length; j++) {
			if (Piece.shapes[this.kind][i][j] == 1) {
				var img = Smallpiece.new(j * Piece.tileSize,
										 i * Piece.tileSize,this.kind,this,i,j);
				
				this.groupImage.add(img);
				this.shape[i][j] = img;

				this.shapeWidth = Math.max(this.shapeWidth, j + 1);
			} 
		}
	}



	this.timeManager = baa.timeManager.new(this);
	this.timerFall = this.timeManager.newTimer(0.6,true,null,"fall");
	this.timerActiveFastLeft = this.timeManager.newTimer(0.3,false,function (self) { return baa.keyboard.isDown(self.keys.left); },"activeFastLeft");
	this.timerActiveFastRight = this.timeManager.newTimer(0.3,false,function (self) { return baa.keyboard.isDown(self.keys.right); },"activeFastRight");
	this.timerFastLeft = this.timeManager.newTimer(0.05,true,function (self) { return baa.keyboard.isDown(self.keys.left) && self.isFastLeft},"moveLeft");
	this.timerFastRight = this.timeManager.newTimer(0.05,true,function (self) { return baa.keyboard.isDown(self.keys.right) && self.isFastRight},"moveRight");
	this.timerFastFall = this.timeManager.newTimer(0.07,true,function (self) { return baa.keyboard.isDown(self.keys.down)},"fall")

	// this.x = 0;
	// this.y = 0;

	this.height = this.shapeHeight * Piece.tileSize;
	this.width = this.shapeWidth * Piece.tileSize;

	this.isFastLeft = false;
	this.isFastRight = false;

	this.row = 0;
	this.column = 4;
	// this.updateGroup();

	this.active = true;

	this.keys = {
		up : "up",
		down : "down",
		left : "left",
		right :"right",
	}


}

Piece.update = function () {
	if (this.active) {
		this.timeManager.update();

		if (baa.keyboard.isPressed(this.keys.left)) {
			this.moveLeft();
		}

		if (baa.keyboard.isPressed(this.keys.right)) {
			this.moveRight();
		}

		if (!baa.keyboard.isDown(this.keys.left)) {
			this.isFastLeft = false;
			this.timerActiveFastLeft.reset()
		}

		if (!baa.keyboard.isDown(this.keys.right)) {
			this.isFastRight = false;
			this.timerActiveFastRight.reset()
		}

		if (baa.keyboard.isPressed(this.keys.down)) {
			this.fall();
		}

		if (baa.keyboard.isPressed(this.keys.up)) {
			this.rotate();
			if (!this.grid.checkAllowed(this.row,this.column)) {
				this.rotate();
				this.rotate();
				this.rotate();
			}
		}
	}
}

Piece.draw = function () {
	this.groupImage.draw();
}

Piece.updateGroup = function () {
	this.groupImage.setGlobalPosition(this.x + this.column * Piece.tileSize, this.row * Piece.tileSize);
}

Piece.activeFastLeft = function () {
	this.isFastLeft = true;
}

Piece.activeFastRight = function () {
	this.isFastRight = true;
}

Piece.setGrid = function (_grid) {
	this.grid = _grid;
	this.x = this.grid.x;
	this.updateGroup();
}

Piece.fall = function () {
	if (!this.grid.checkGrounded()) {
		this.move(1,0);
	}
	else {
		// print("huh?");
		this.active = false;
		this.grid.insert();
		this.groupImage.do(function (self) {self.last.clone(self);});
		this.grid.newPiece();
	}
}

Piece.moveLeft = function () {
	this.move(0,-1);
}

Piece.moveRight = function () {
	this.move(0,1);
}

Piece.move = function (_row, _column) {
	if (this.grid.checkAllowed(this.row + _row, this.column + _column)) {
		this.row += _row;
		this.column += _column;

		// this.x += _column * Smallpiece.tileSize;
		// this.y += _row * Smallpiece.tileSize;

		this.updateGroup();
	}
}

Piece.rotate = function () {
	if (this.shapeWidth == 4 && this.row == 0) { return; }
	var newShape = [[],[],[],[]];

	for (var i = 0; i < this.shapeHeight; i++) {
		for (var j = 0; j < this.shapeWidth; j++) {
			k = (this.shapeHeight - 1) - i;

			newShape[j][k] = this.shape[i][j];

			if (this.shape[i][j]) {
				this.shape[i][j].local.x = ((this.shapeHeight-1) - i) * Piece.tileSize;
				this.shape[i][j].local.y = j * Piece.tileSize;
			}
		}
	}

	this.shape = newShape;


	var oldWidth = this.shapeWidth;
	this.shapeWidth = this.shapeHeight;
	this.shapeHeight = oldWidth;

	if (this.shapeWidth == 4) {
		this.column -= 1;
		this.row += 1;
	}
	else if (this.shapeHeight == 4) {
		this.column += 1;
		this.row -= 1;
	}
	// this.row -= Math.floor(this.shapeHeight/2);

	this.height = this.shapeHeight * Piece.tileSize;
	this.width = this.shapeWidth * Piece.tileSize;

	this.updateGroup();
}

// Piece.remove = function (obj) {
// 	this.groupImage.remove(obj);
// 	Play.inst.solidObjects.remove(obj);
// 	print(obj.localRow,obj.localColumn,this.shape[obj.localRow][obj.localColumn] == obj);
// 	this.shape[obj.localRow][obj.localColumn] = 0;
// 	if (this.x < 200) {
// 		Play.inst.gridLeft.data[this.row + obj.localRow, this.column + obj.localColumn] = 0;
// 	}
// 	else {
// 		Play.inst.gridRight.data[this.row + obj.localRow, this.column + obj.localColumn] = 0;
// 	}
// }