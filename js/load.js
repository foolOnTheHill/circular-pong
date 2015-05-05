var boot = {
	preload: function() {
		this.game.load.image('loading', 'assets/loading.png');
		this.game.load.image('loading2', 'assets/loading2.png');
	},
	create: function() {
		this.game.state.start('load');
	}
};

var load = {
	preload: function() {
		this.fac = this.game.world.width/650;

		preloading2 = this.game.add.sprite(this.game.world.width/2-(50*this.fac), this.game.world.height/2, 'loading2');
		preloading2.x -= (preloading2.width*this.fac)/2;
		preloading = this.game.add.sprite(this.game.world.width/2-(50*this.fac), this.game.world.height/2+(4*this.fac), 'loading');
		preloading.x -= (preloading.width*this.fac)/2;
		this.game.load.setPreloadSprite(preloading);

		this.game.load.image('pallete', 'assets/purple_brick.png');
		this.game.load.image('ball', 'assets/ball.png');

		this.game.load.audio('hit', 'assets/hit.mp3');
	},
	create: function() {
		this.game.state.start('menu');
	}
};