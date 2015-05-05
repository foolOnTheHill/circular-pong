(function() {

	// 650 x 650
	var width = Math.min(window.innerWidth, 650);

	var game = new Phaser.Game(width, width, Phaser.AUTO, 'game_div', {
		preload: function() {
			this.game.stage.backgroundColor = 0xccffcc;
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
	game.state.add('end', end);
})();