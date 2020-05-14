var menuState = {
  create: function() {
    game.add.image(0, 0, 'menubg');
    //creating 4 buttons each taking to a different level
    button = game.add.button(game.world.centerX, 250, 'button');
    button.anchor.setTo(0.5, 0.5);
    button.onInputUp.add(this.start1);
    var text = game.add.text(button.x, button.y, 'Level 1', {fill: '#ffffff'});
    text.anchor.setTo(0.5, 0.5);

    button2 = game.add.button(game.world.centerX, game.world.centerY, "button");
    button2.anchor.setTo(0.5, 0.5);
    button2.onInputUp.add(this.start2);
    var text2 = game.add.text(button2.x, button2.y, "Level 2", {fill: "#ffffff"});
    text2.anchor.setTo(0.5, 0.5);

    button3 = game.add.button(game.world.centerX, 350, "button");
    button3.anchor.setTo(0.5, 0.5);
    button3.onInputUp.add(this.start3);
    var text3 = game.add.text(button3.x, button3.y, "Level 3", {fill: "#ffffff"});
    text3.anchor.setTo(0.5, 0.5);

    button4 = game.add.button(game.world.centerX, 400, "button");
    button4.anchor.setTo(0.5, 0.5);
    button4.onInputUp.add(this.start4);
    var text4 = game.add.text(button4.x, button4.y, "Level 4", {fill: "#ffffff"});
    text4.anchor.setTo(0.5, 0.5);
  },

  start1: function() {
    game.state.start("level1");
  },
  start2: function() {
    game.state.start("level2");
  },
  start3: function() {
    game.state.start("level3");
  },
  start4: function() {
    game.state.start("level4")
  }
};
