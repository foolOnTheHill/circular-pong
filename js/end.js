var end = {
	create: function() {
		this.fac = this.game.world.width/650;

		var size1 = 70*this.fac;
		var size2 = 40*this.fac;
		var size3 = 55*this.fac;
		var size4 = 95*this.fac;

		this.name_text = this.game.add.text(this.game.world.centerX, 200*this.fac, 'Game Over\nYour score was', {font: size1+"px 'Righteous'", fill: '#d3d3d3', align: 'center'});
		this.name_text.anchor.setTo(0.5, 0.5);

		this.final_score_text = this.game.add.text(this.game.world.centerX, this.game.world.height/2, ''+this.game.current_level, {font: size4+"px 'Righteous'", fill: '#d3d3d3', align: 'center'});
		this.final_score_text.anchor.setTo(0.5, 0.5);

		this.start_text = this.game.add.text(this.game.world.centerX, this.game.world.height -200*this.fac, 'Tap to play again!', {font: size2+"px 'Righteous'", fill: '#d3d3d3'});
		this.start_text.anchor.setTo(0.5, 0.5);

		this.game.add.tween(this.start_text).to({ angle:1 }, 200).to({ angle:-1 }, 200).loop().start();
		this.game.add.tween(this.name_text.scale).to({ x: 1.05, y: 1.05 }, 300).to({ x: 1, y: 1 }, 300).loop().start();
		this.game.add.tween(this.final_score_text.scale).to({ x: 1.25, y: 1.25 }, 300).to({ x: 1, y: 1 }, 300).loop().start();
	},
	update: function() {
		if (this.game.input.mousePointer.isDown || this.game.input.pointer1.isDown) {
			this.game.current_level = 0;
			this.game.state.start('main');
		}
	}
};
