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
      game.load.image("button", "assets/button.png");
      game.load.image("diamond", "assets/diamond.png");
      game.load.image("firstaid", "assets/firstaid.png");
      game.load.image("healthbar", "assets/healthbar.png");
      game.load.image("platform", "assets/platform.png");
      game.load.image("sky", "assets/sky.png");
      game.load.image("star", "assets/star.png");
      game.load.spritesheet("player", "assets/dude.png", 32, 48);
      game.load.spritesheet("baddie", "assets/baddie.png", 32, 32);
      game.load.audio("collect", "assets/chipsCollide1.ogg");
   },

   create: function() {
      game.state.start('menu');
   }

};
