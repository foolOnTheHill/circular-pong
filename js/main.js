var LEVELS = [
	{
		hits: 2,
		accelerate: 0
	},
	{
		hits: 3,
		accelerate: 0
	},
	{
		hits: 4,
		accelerate: 0
	},
	{
		hits: 5,
		accelerate: 0
	},
	{
		hits: 7,
		accelerate: 0
	},
	{
		hits: 8,
		accelerate: 0
	},
	{
		hits: 9,
		accelerate: 0
	},
	{
		hits: 10,
		accelerate: 0
	},
	{
		hits: 12,
		accelerate: 0
	},
	{
		hits: 13,
		accelerate: 0
	},
	{
		hits: 15,
		accelerate: 0
	},
	{
		hits: 17,
		accelerate: 0
	},
	{
		hits: 18,
		accelerate: 0
	},
	{
		hits: 19,
		accelerate: 0
	},
	{
		hits: 20,
		accelerate: 1
	},
	{
		hits: 22,
		accelerate: 1
	},
	{
		hits: 25,
		accelerate: 1
	},
	{
		hits: 30,
		accelerate: 2
	},
];

var main = {
	preload: function() {
		this.game.advancedTiming = true;
	},

	create: function() {
		this.resize = this.game.world.width/650;

		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// Game Stage
		this.graphics = this.game.add.graphics(this.game.world.centerX, this.game.world.centerY);
		this.graphics.lineStyle(0);
		this.graphics.beginFill(0xd3d3d3, 1);
		this.graphics.drawCircle(325/128, 325/128, 490*this.resize);
		this.graphics.endFill();

		// Game Constants
		this.direction = 1;
		this.radius = 250*this.resize;
		this.period = 0.5*Math.PI;
		this.hitTime = 0;
		this.mouseTime = 0;
		this.ballMoving = false;
		this.enablePad = false;

		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		 	this.mouseDelta = 200;
		} else {
			this.mouseDelta = 250;
		}

		this.scoreY = 40;

		// Game Objects
		this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + this.radius, 'pallete');
		this.player.scale.setTo(this.resize, this.resize);
		this.game.physics.arcade.enable(this.player);
		this.player.body.collideWorldBounds = true;
		this.player.anchor.setTo(0.5, 0.5);

		this.ball = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ball');
		this.ball.scale.setTo(this.resize, this.resize);
		this.game.physics.arcade.enable(this.ball);
		this.ball.body.bounce.setTo(1, 1);
		this.ball.anchor.setTo(0.5, 0.5);
		this.ball.visible = false;

		this.hit_sound = this.game.add.sound('hit');
		this.hit_sound.volume = 0.2;

		//Level
		this.game.level = LEVELS[this.game.current_level];

		// Hits
		this.game.score = this.game.level.hits;

		var size = 6*this.resize;
		this.score_text = this.game.add.text(this.game.world.centerX, this.scoreY, ''+this.game.score, {font: size+'em "Righteous"', fill: '#d3d3d3'});
		this.score_text.anchor.setTo(0.5, 0.5);

		this.level_text = this.game.add.text(this.game.world.centerX, this.game.world.height-40, 'Level: '+(this.game.current_level+1)+'/'+LEVELS.length, {font: size+'em "Righteous"', fill: '#d3d3d3'});
		this.level_text.anchor.setTo(0.5, 0.5);

		this.cursors = this.game.input.keyboard.createCursorKeys();

		// Instructions

		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			size = 40*this.resize;
			this.instructions = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Tap to control the pad.', {font: size+'px "Righteous"', fill: '#000000'});
		} else {
			size = 30*this.resize;
			this.instructions = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Press \'left\' and \'right\' or tap\nto control the pad', {font: size+'px "Righteous"', fill: '#000000', align: 'center'});
		}
		this.instructions.anchor.setTo(0.5, 0.5);
	},

	update: function() {

		if (!this.ballMoving && (this.cursors.left.isDown || this.cursors.right.isDown || this.game.input.mousePointer.isDown || this.game.input.pointer1.isDown)) {
			this.instructions.destroy();
			this.ball.visible = true;
			this.ball.body.velocity.x = 315*this.resize;
			this.ball.body.velocity.y = -115*this.resize;
			this.ballMoving = true;
			this.enablePad = true;
		}

		if (this.cursors.left.isDown && this.direction === -1) {
			this.direction = 1;
		} else if (this.cursors.right.isDown && this.direction === 1) {
			this.direction = -1;
		} else if ((this.game.input.mousePointer.isDown || this.game.input.pointer1.isDown) && this.game.time.now > this.mouseTime ) {
			this.direction *= -1;
			this.mouseTime = this.game.time.now + this.mouseDelta;
		}

		this.handleCollisions();
	},

	handleCollisions: function() {
		var check = this.checkBall();
		var threshold = 2*this.ball.width+this.player.height;

		if (!check) {
			var playerX = this.player.x;
			var playerY = this.player.y;
			var angle = this.player.rotation > 180 ? this.player.rotation%180 : this.player.rotation;

			var a = Math.tan(angle);
			var b = playerY - a*playerX;

			var diff1 = Math.abs( (a*this.ball.x + b) - this.ball.y );
			var diff2 = Math.abs( (a*(this.ball.x-10) + b) - this.ball.y );
			var diff3 = Math.abs( (a*(this.ball.x+10) + b) - this.ball.y );

			if (diff1 <= threshold || diff2 <= threshold || diff3 <= threshold) {
				this.hitBall();
			} else {
				this.handleGameOver();
			}
		} else if (this.enablePad){
			this.circularMotion();
		}
	},

	handleGameOver: function() {
		this.player.kill();
		this.game.state.start('end');
	},

	checkBall: function() {
		var r = this.radius;
		var dx = (this.ball.x - this.game.world.centerX)*(this.ball.x - this.game.world.centerX);
		var dy = (this.ball.y - this.game.world.centerY)*(this.ball.y - this.game.world.centerY);
		return (dx + dy) <= r*r;
	},

	circularMotion: function () {
		if (this.direction === -1) {
			this.period = (this.period - 0.08)%360;
		} else {
			this.period = (this.period + 0.08)%360;
		}

		this.player.x = this.game.world.centerX + Math.cos(this.period)*this.radius;
		this.player.y = this.game.world.centerY + Math.sin(this.period)*this.radius;

		this.player.rotation = this.period - 0.5*Math.PI;
	},

	hitBall: function() {
		if (this.game.time.now < this.hitTime) return;

		var fac = 0.85;
		var velX = this.game.world.centerX - this.player.x;
		var velY = this.game.world.centerY - this.player.y;

		this.ball.body.velocity.x *= -1;
		this.ball.body.velocity.y *= -1;

		if (this.game.level.accelerate >= 1) {
			this.ball.body.velocity.x = (this.ball.body.velocity.x)*(1-fac) + velX*fac;
			this.ball.body.velocity.y = (this.ball.body.velocity.y)*(1-fac) + velY*fac;
		}

		if (this.game.level.accelerate == 2) {
			this.ball.body.velocity.x *= 1 + Math.random();
			this.ball.body.velocity.y *= 1 + Math.random();
		}

		this.game.add.tween(this.ball.scale).to({x:1.3*this.resize, y:1.3*this.resize}, 200).to({x:0.9*this.resize, y:0.9*this.resize}, 200).start();

		this.hit_sound.play();
		this.updateScore();

		this.hitTime = this.game.time.now+150;
	},

	updateScore: function() {
		this.game.score -= 1;
		this.score_text.text = this.game.score;
		this.score_text.anchor.setTo(0.5, 0.5);

		if (this.game.score == 0) {
			this.game.state.start('next-level');
		}
	}
};
