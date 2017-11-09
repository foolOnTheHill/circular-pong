(function() {

	// 650 x 650
	var width = Math.min(window.innerWidth, 650);
	var height = window.innerHeight;

	var game = new Phaser.Game(width, height, Phaser.CANVAS, 'game_div', {
		preload: function() {
			this.game.stage.backgroundColor = "#000000";
			this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

			console.log('( ͡° ͜ʖ ͡°)');
		}
	});

	WebFontConfig = {
		active: function() { game.time.events.add(Phaser.Timer.SECOND, function createGame() {game.state.start('boot');}, this); },
		google: {
			families: ['Righteous::latin']
		}
	};

	game.state.add('boot', boot);
	game.state.add('load', load);
	game.state.add('menu', menu);
	game.state.add('main', main);
	game.state.add('next-level', nextLevel);
	game.state.add('end', end);
})();
