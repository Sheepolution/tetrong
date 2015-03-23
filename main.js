baa.load = function () {
	game = Game.new();
	// baa.debug.set(game);
}

baa.update = function () {
	dt = Math.min(dt,0.0166666667)
	game.update();
}

baa.draw = function () {
	game.draw();
}

baa.config = function (t) {
	t.height = 288;

}

baa.graphics.preload(
"images/piece_1.png",
"images/piece_2.png",
"images/piece_3.png",
"images/piece_4.png",
"images/piece_5.png",
"images/piece_6.png",
"images/piece_7.png",
"images/smallpiece_1.png",
"images/smallpiece_2.png",
"images/smallpiece_3.png",
"images/smallpiece_4.png",
"images/smallpiece_5.png",
"images/smallpiece_6.png",
"images/smallpiece_7.png",
"images/background.png"
);


baa.run();