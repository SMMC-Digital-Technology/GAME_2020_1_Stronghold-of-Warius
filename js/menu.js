var menuState = {
  create: function() {

    game.global.mana = game.global.manaM;
    game.global.health = game.global.healthM;

    game.add.image(0, 0, 'menubg');
    //creating 4 buttons each taking to a different level
    button = game.add.button(400, 250, 'button');
    button.anchor.setTo(0.5, 0.5);
    button.onInputUp.add(this.start1);
    var text = game.add.text(button.x, button.y, 'win screen', {fill: '#ffffff'});
    text.anchor.setTo(0.5, 0.5);

    button2 = game.add.button(400, game.world.centerY, "button");
    button2.anchor.setTo(0.5, 0.5);
    button2.onInputUp.add(this.start2);
    var text2 = game.add.text(button2.x, button2.y, "Level 2", {fill: "#ffffff"});
    text2.anchor.setTo(0.5, 0.5);

    button3 = game.add.button(400, 350, "button");
    button3.anchor.setTo(0.5, 0.5);
    button3.onInputUp.add(this.start3);
    var text3 = game.add.text(button3.x, button3.y, "Level 3", {fill: "#ffffff"});
    text3.anchor.setTo(0.5, 0.5);

    if (game.global.cyclespeech == 0)  {
      game.add.text(180, 120, "'Oh Dagnabbit, the goblin king Warius has stolen my powers", {font: '20px Arial'});
      game.add.text(180, 150, "to get to his castle I need to head to the sewers, I hope", {font: '20px Arial'});
      game.add.text(180, 180, "it's safe in there.'", {font: '20px Arial'});
    } else if (game.global.cyclespeech == 1) {
      game.add.text(180, 120, "'Phew that was tough, well I'm at the castle now. I heard", {font: '20px Arial'});
      game.add.text(180, 150, "roaring coming from the inside, sounded like a dragon.'", {font: '20px Arial'});
    } else if (game.global.cyclespeech == 2) {
      game.add.text(180, 120, "'This is it, the throne room. The goblin king Warius has", {font: '20px Arial'});
      game.add.text(180, 150, "my deadliest power, necromancy. I must get it back before", {font: '20px Arial'});
      game.add.text(180, 180, "he becomes to powerful.'", {font: '20px Arial'});
    }
  },

  start1: function() {
    game.state.start("winscreen");
  },
  start2: function() {
    game.state.start("level2");
  },
  start3: function() {
    game.state.start("level3");
  },
};
