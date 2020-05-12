/**
 * Use this state to load all of your assets
 */
var loadState = {
   preload: function() {
      loadingLabel = game.add.text(80, 150, 'loading...', {
         font: '30px Courier',
         fill: '#ffffff'
      });

      // load all assets
      game.load.spritesheet("bat", "assets/bat.png", 10, 10);
      game.load.image("button", "assets/Button.png");
      game.load.spritesheet("fireball", "assets/Fireball.png", 10, 10);
      game.load.image("healthbar", "assets/Health bar.png");
      game.load.spritesheet("jendolfson", "assets/jendolfson.png", 16, 16);
      game.load.spritesheet("magebolt", "assets/Mage bolt.png", 8, 8);
      game.load.image("manabar", "assets/Mana bar.png");
      game.load.image("menubg", "assets/Menu background.png");
      game.load.image("sewerbg", "assets/sewerBackground.png");
      game.load.spritesheet("slimeb", "assets/slime_blue.png", 16, 16);
      game.load.spritesheet("slimeg", "assets/slime_green.png", 16, 16);
      game.load.spritesheet("slimer", "assets/slime_red.png", 16, 16);
      game.load.image("spikes", "assets/spikes.png");
   },

   create: function() {
      game.state.start('menu');
   }

};
