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
										 i * Piece.tileSize,this.kind);
				
				this.groupImage.add(img);
				this.shape[i][j] = img;

				this.shapeWidth = Math.max(this.shapeWidth, j + 1);
			} 
		}
	}

	this.timeManager = baa.timeManager.new(this);
	this.timerFall = this.timeManager.newTimer(0.5,true,null,"fall");
	this.timerActiveFastLeft = this.timeManager.newTimer(0.3,false,function (self) { return baa.keyboard.isDown("left"); },"activeFastLeft");
	this.timerActiveFastRight = this.timeManager.newTimer(0.3,false,function (self) { return baa.keyboard.isDown("right"); },"activeFastRight");
	this.timerFastLeft = this.timeManager.newTimer(0.05,true,function (self) { return baa.keyboard.isDown("left") && self.isFastLeft},"moveLeft");
	this.timerFastRight = this.timeManager.newTimer(0.05,true,function (self) { return baa.keyboard.isDown("right") && self.isFastRight},"moveRight");
	this.timerFastFall = this.timeManager.newTimer(0.03,true,function (self) { return baa.keyboard.isDown("down")},"fall")

	// this.x = 0;
	// this.y = 0;

	this.height = this.shapeHeight * Piece.tileSize;
	this.width = this.shapeWidth * Piece.tileSize;

	this.isFastLeft = false;
	this.isFastRight = false;

	this.row = 1;
	this.column = 1;
	// this.updateGroup();

	this.active = true;

}

Piece.update = function () {
	if (this.active) {
		this.timeManager.update();

		if (baa.keyboard.isPressed("left")) {
			this.moveLeft();
		}

		if (baa.keyboard.isPressed("right")) {
			this.moveRight();
		}

		if (!baa.keyboard.isDown("left")) {
			this.isFastLeft = false;
			this.timerActiveFastLeft.reset()
		}

		if (!baa.keyboard.isDown("right")) {
			this.isFastRight = false;
			this.timerActiveFastRight.reset()
		}

		if (baa.keyboard.isPressed("down")) {
			this.fall();
		}

		if (baa.keyboard.isPressed(" ")) {
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
		this.grid.insert();
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

		this.updateGroup();
	}
}

Piece.rotate = function () {
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

	this.updateGroup();
}