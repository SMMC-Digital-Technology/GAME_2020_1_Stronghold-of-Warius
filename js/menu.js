var menuState = {
  create: function() {
    game.image.add(0, 0, '');
    button = game.add.button(game.world.centerX, game.world.centerY, 'button');
    button.onInputUp.add(this.startGame);
    var text = game.add.text(button.x, button.y, 'Start Game');
    text.anchor.setTo(0.5, 0.5);
  },

  startGane: function() {
    game.state.start("level1")
  }
