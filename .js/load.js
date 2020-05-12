var loadState = {
  preload: function() {
    loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});

    /* Some values might need to be adjusted */
    game.load.image('sewerbg', 'assets/sewerBackground.png');
    game.load.image('ground', 'assets/ground.png');
    game.load.image('tower', 'assets/tower.png');
    game.load.spritesheet('blueSlime', 'assets/slime_blue.png', 8, 8);
    game.load.spritesheet('greenSlime', 'assets/slime_green.png', 8, 8);
    game.load.spritesheet('redSlime', 'assets/slime_red.png', 8, 8);
    game.load.spritesheet('jendolfson', 'assets/jendolfson.png', 16, 16);
    game.load.spritesheet('mageBolt', 'assets/Mage bolt.png', 8, 8);
    game.load.spritesheet('fireball', 'assets/Fireball.png', 10, 10);
    game.load.spritesheet('bat', 'assets/bat.png', 10, 10);
    game.load.spritesheet('', 'assets/.png', , );
    game.load.image('button', 'assets/button.png');
    game.load.image('explosion', 'assets/explosion.png')

    game.load.audio('point', 'assets/point.mp3');
    game.load.audio('win', 'assets/win.mp3');
    game.load.audio('loss', 'assets/loss.mp3');
    game.load.audio('bgm', 'assets/bgm.mp3')
    game.load.audio('shoot', 'assets/shoot.mp3')
    game.load.audio('loseLife', 'assets/loseLife.mp3')
  },

  create: function() {
    game.state.start('menu');
  }

};
