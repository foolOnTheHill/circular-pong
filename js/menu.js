var menu = {
	create: function() {
		this.fac = this.game.world.width/650;

		var size1 = 90*this.fac;
		var size2 = 40*this.fac;

		this.name_text = this.game.add.text(this.game.world.centerX, 200*this.fac, 'Circular Pong', {font: size1+"px 'Righteous'", fill: '#f6546a'});
		this.name_text.anchor.setTo(0.5, 0.5);

		this.start_text = this.game.add.text(this.game.world.centerX, 310*this.fac, 'Tap to start!', {font: size2+"px 'Righteous'", fill: '#f6546a'});
		this.start_text.anchor.setTo(0.5, 0.5);

		this.game.add.tween(this.start_text).to({ angle:1 }, 200).to({ angle:-1 }, 200).loop().start();
		this.game.add.tween(this.name_text.scale).to({ x: 1.05, y: 1.05 }, 300).to({ x: 1, y: 1 }, 300).loop().start();
	},
	update: function() {
		if (this.game.input.mousePointer.isDown || this.game.input.pointer1.isDown) this.game.state.start('main');
	}
};