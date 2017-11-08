var nextLevel = {
	create: function() {
		this.fac = this.game.world.width/650;

		var size1 = 90*this.fac;
		var size2 = 40*this.fac;
    var size3 = 120*this.fac;

    if (this.game.current_level < LEVELS.length-1) {
  		this.name_text = this.game.add.text(this.game.world.centerX, 200*this.fac, 'Next Level!', {font: size1+"px 'Righteous'", fill: '#d3d3d3'});
  		this.name_text.anchor.setTo(0.5, 0.5);

      this.next_level_text = this.game.add.text(this.game.world.centerX, this.game.world.height/2, ''+(this.game.current_level+2), {font: size3+"px 'Righteous'", fill: '#d3d3d3', align: 'center'});
  		this.next_level_text.anchor.setTo(0.5, 0.5);

  		this.start_text = this.game.add.text(this.game.world.centerX, this.game.world.height -200*this.fac, 'Tap to play!', {font: size2+"px 'Righteous'", fill: '#d3d3d3'});
  		this.start_text.anchor.setTo(0.5, 0.5);

      this.game.add.tween(this.start_text).to({ angle:1 }, 200).to({ angle:-1 }, 200).loop().start();
  		this.game.add.tween(this.name_text.scale).to({ x: 1.05, y: 1.05 }, 300).to({ x: 1, y: 1 }, 300).loop().start();
      this.game.add.tween(this.next_level_text.scale).to({ x: 1.95, y: 1.95 }, 500).to({ x: 1, y: 1 }, 300).loop().start();
    } else {
      this.name_text = this.game.add.text(this.game.world.centerX, 200*this.fac, 'Congratulations!', {font: size2+"px 'Righteous'", fill: '#d3d3d3'});
  		this.name_text.anchor.setTo(0.5, 0.5);

      this.next_level_text = this.game.add.text(this.game.world.centerX, this.game.world.height/2, 'All\nlevels\ncompleted!', {font: size1+"px 'Righteous'", fill: '#d3d3d3', align: 'center'});
  		this.next_level_text.anchor.setTo(0.5, 0.5);

  		this.start_text = this.game.add.text(this.game.world.centerX, this.game.world.height -200*this.fac, 'Tap to play again!', {font: size2+"px 'Righteous'", fill: '#d3d3d3'});
  		this.start_text.anchor.setTo(0.5, 0.5);

      this.game.add.tween(this.start_text).to({ angle:1 }, 200).to({ angle:-1 }, 200).loop().start();
  		this.game.add.tween(this.name_text.scale).to({ x: 1.05, y: 1.05 }, 300).to({ x: 1, y: 1 }, 300).loop().start();
      this.game.add.tween(this.next_level_text.scale).to({ x: 1.25, y: 1.25 }, 500).to({ x: 1, y: 1 }, 300).loop().start();
    }

	},
	update: function() {
		if (this.game.input.mousePointer.isDown || this.game.input.pointer1.isDown) {
      if (this.game.current_level < LEVELS.length-1) {
        this.game.current_level += 1;
        this.game.state.start('main');
      } else {
        this.game.state.start('menu');
      }
    }
	}
};
