var menuState = {
  create: function() {
    game.add.image(0, 0, 'menubg');
    button = game.add.button(game.world.centerX, game.world.centerY, 'button');
    button.anchor.setTo(0.5, 0.5);
    button.onInputUp.add(this.startGame);
    var text = game.add.text(button.x, button.y, 'Start Game');
    text.anchor.setTo(0.5, 0.5);
  },

  startGame: function() {
    game.state.start("level1")
  },
};
