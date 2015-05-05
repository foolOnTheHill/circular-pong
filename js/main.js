
var main = {
	preload: function() {
		this.game.advancedTiming = true;
	},

	create: function() {

		this.resize = this.game.world.width/650;

		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// Game Stage
		var graphics = this.game.add.graphics(this.game.world.centerX, this.game.world.centerY);
		graphics.lineStyle(0);
	    graphics.beginFill(0x4099ff, 0.7);
	    graphics.drawCircle(325/128, 325/128, 490*this.resize);
	    graphics.endFill();
	
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

		if (this.game.world.width < 650) {
			this.scoreY = 110;
		} else {
			this.scoreY = 40;
		}

	    // Game Objects
		this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + this.radius, 'pallete');
		this.game.physics.arcade.enable(this.player);
		this.player.body.collideWorldBounds = true;
		this.player.anchor.setTo(0.5, 0.5);

		this.ball = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ball');
		this.game.physics.arcade.enable(this.ball);
		this.ball.body.collideWorldBounds = true;
		this.ball.body.bounce.setTo(1, 1);
		this.ball.anchor.setTo(0.5, 0.5);

		this.hit_sound = this.game.add.sound('hit');
		this.hit_sound.volume = 0.2;

		// Scores
		this.highScore = window.localStorage.getItem('pong') || 0;
		this.higher = false;

		this.game.score = 0;
		this.score_text = this.game.add.text(this.game.world.centerX, this.scoreY, '0', {font: '6em "Righteous"', fill: '#f6546a'});
		this.score_text.anchor.setTo(0.5, 0.5);

		this.cursors = this.game.input.keyboard.createCursorKeys();

		// Instructions
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) { 	
			this.instructions = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Tap to control the pad.', {font: '3em "Righteous"', fill: '#f6546a'});
		} else {
			this.instructions = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Press \'left\' and \'right\' or tap\nto control the pad', {font: '3em "Righteous"', fill: '#f6546a', align: 'center'});
		}
		this.instructions.anchor.setTo(0.5, 0.5);
	},

	update: function() {

		if ((this.cursors.left.isDown || this.cursors.right.isDown || this.game.input.mousePointer.isDown || this.game.input.pointer1.isDown) && !this.ballMoving) {
			this.ball.body.velocity.x = 300;
			this.ball.body.velocity.y = -100;
			this.ballMoving = true;
			this.enablePad = true;
			this.instructions.destroy();
		}
		
		if (!this.checkBall()) {
			if (this.higher) window.localStorage.setItem('pong', this.game.score);
			this.game.higher = this.higher;
			this.game.state.start('end');
		}

		if (this.enablePad) this.circularMotion();

		if (this.cursors.left.isDown && this.direction === -1) {
			this.direction = 1; 
		} else if (this.cursors.right.isDown && this.direction === 1) {
			this.direction = -1;
		} else if ((this.game.input.mousePointer.isDown || this.game.input.pointer1.isDown) && this.game.time.now > this.mouseTime ) {
			this.direction *= -1;
			this.mouseTime = this.game.time.now + this.mouseDelta;
		}

		this.game.physics.arcade.overlap(this.player, this.ball, null, this.hitBall, this);
	},

	checkBall: function() {
		var dx = (this.ball.x - this.game.world.centerX)*(this.ball.x - this.game.world.centerX);
		var dy = (this.ball.y - this.game.world.centerY)*(this.ball.y - this.game.world.centerY);
		return (dx + dy) <= (this.radius*this.radius);
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

	hitBall: function(player, ball) {
		if (this.game.time.now < this.hitTime) return;

		var fac = 0.85;
		var velX = this.game.world.centerX - this.player.x;
		var velY = this.game.world.centerY - this.player.y;

		ball.body.velocity.x = (-ball.body.velocity.x)*(1-fac) + velX*fac;
		ball.body.velocity.y = (-ball.body.velocity.y)*(1-fac) + velY*fac;

		ball.body.velocity.x *= 1 + Math.random();
		ball.body.velocity.y *= 1 + Math.random();		

		this.game.add.tween(ball.scale).to({x:1.3, y:1.3}, 200).to({x:0.9, y:0.9}, 200).start();
		
		this.hit_sound.play();
		this.updateScore();

		this.hitTime = this.game.time.now+150;
	},

	updateScore: function() {
		this.game.score += 1;

		if (this.game.score > this.highScore && !this.higher) {
			this.higher = true;
			this.highScore_text = this.game.add.text(this.game.world.centerX, this.scoreY + 32, 'highscore!', {font: '2em "Righteous"', fill: '#f6546a'});
			this.highScore_text.anchor.setTo(0.5, 0.5)		
			this.game.add.tween(this.highScore_text).to({ angle:1 }, 200).to({ angle:-1 }, 200).loop().start();
		}

		this.score_text.text = this.game.score;
		this.score_text.anchor.setTo(0.5, 0.5);
	}
};
