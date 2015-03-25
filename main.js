baa.load = function () {
	game = Game.new();
	baa.debug.set(game);
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
"images/smallpiece_0.png",
"images/smallpiece_1.png",
"images/smallpiece_2.png",
"images/smallpiece_3.png",
"images/smallpiece_4.png",
"images/smallpiece_5.png",
"images/smallpiece_6.png",
"images/ball.png",
"images/background.png",
"images/numbers.png",
"images/gameoverbar.png"
);

baa.audio.preload(
"audio/theme.ogg",
"audio/pong_beep.ogg",
"audio/pong_peep.ogg",
"audio/pong_plop.ogg"
)


baa.run();