var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game-world');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('level1', level1State);
game.state.add("level1boss", level1bossState);
game.state.add('level2', level2State);
game.state.add('level3', level3State);
game.state.add('level4', level4State);
game.state.add('gameover', gameoverState);
// save some values for the whole game
game.global = {
  health: 10,
  healthM: 10,
  mana: 20,
  manaM: 20,
  spellSelected: 1,
  timeCheck: 0,
  lvl1complete: "false",
  lvl2complete: "false",
  lvl3complete: "false",
  lvl4complete: "false", 
}
game.state.start('boot');
