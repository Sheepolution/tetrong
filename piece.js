Piece = baa.entity.extend("Piece");

Piece.shapes = 
[
	[
	[1,1],
	[1,1]
	],
	[
	[1,1],
	[0,1,1]
	]
]

Piece.tileSize = 8;

Piece.init = function () {
	this.shapeWidth = 0;
	this.shapeHeight = 0;

	this.kind = 2;

	this.shape = Piece.shapes[this.kind - 1];

	this.groupImage = baa.group.new();
	for (var i = 0; i < this.shape.length; i++) {

		this.shapeHeight = Math.max(this.shapeHeight, i + 1);

		for (var j = 0; j < this.shape[i].length; j++) {
			if (this.shape[i][j] == 1) {
				var img = baa.sprite.new();

				img.y = i * Piece.tileSize;
				img.x = j * Piece.tileSize;
				
				img.setImage("images/smallpiece_" + this.kind + ".png");
				this.groupImage.add(img);

				this.shapeWidth = Math.max(this.shapeWidth, j + 1);
			} 
		}
	}

	this.timeManager = baa.timeManager.new(this);
	this.timerFall = this.timeManager.newTimer(0.5,true,null,"fall");
	this.timerActiveFastFall = this.timeManager.newTimer(0.5,false,function (self) { return baa.keyboard.isDown("down"); },"activeFastFall");
	this.fallFastTimer = this.timeManager.newTimer(0.03,true,function (self) { return baa.keyboard.isDown("down") && self.fastFalling},"fall");


	this.height = this.shapeHeight * Piece.tileSize;
	this.width = this.shapeWidth * Piece.tileSize;

	this.fastFalling = false;

	this.row = 1;
	this.column = 1;

	this.updateGroup(1,1);

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

		if (baa.keyboard.isPressed("down")) {
			this.fall();
		}

		if (!baa.keyboard.isDown("down")) {
			this.timerActiveFastFall.reset();
		}
	}
}

Piece.draw = function () {
	this.groupImage.draw();
}

Piece.updateGroup = function (row,column) {
	for (var i = 0; i < this.groupImage.length; i++) {
		this.groupImage[i].y += row * Piece.tileSize;
		this.groupImage[i].x += column * Piece.tileSize;
	}
}

Piece.activeFastFall = function () {
	this.fastFalling = true;
}

Piece.setGrid = function (_grid) {
	this.grid = _grid; 
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

		this.x += Piece.tileSize * _column;
		this.y += Piece.tileSize * _row;
		
		this.updateGroup(_row, _column);
	}
}