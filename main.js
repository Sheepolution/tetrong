baa.load = function () {
	game = Game.new();
	creditsFont = baa.graphics.setNewFont("credits",4);
	// baa.debug.set(game);

	print("If you want to screw with the game settings, let me help. \nType: \nBall.reset = function () { \nthis.x = 200; \nthis.y = 72; \nthis.velocity.x = [NUMBER HERE]; \nthis.velocity.y = [NUMBER HERE]; \n}");
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
	t.release = true;
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
"images/gameoverbar.png",
"images/logo.png",
"images/players.png",
"images/cursor.png",
"images/gameover.png",
"images/gamewin.png",
"images/types.png"
);

baa.audio.preload(
"audio/theme.ogg",
"audio/pong_beep.ogg",
"audio/pong_peep.ogg",
"audio/pong_plop.ogg",
"audio/line4.ogg",
"audio/line.mp3",
"audio/intro.mp3",
"audio/gate.mp3",
"audio/gameover.mp3"
)


baa.run();