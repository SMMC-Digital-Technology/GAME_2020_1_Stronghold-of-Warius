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
      game.load.spritesheet("bat", "assets/bat.png", 20, 20);
      game.load.image("button", "assets/Button.png");
      game.load.spritesheet("fireball", "assets/Fireball.png", 10, 10);
      game.load.spritesheet("darkbolt", "assets/darkbolt.png", 30, 30);
      game.load.spritesheet("rumble", "assets/rumble.png", 100, 25);
      game.load.image("healthbar", "assets/Health bar.png");
      game.load.spritesheet("jendolfson", "assets/jendolfson.png", 64, 64);
      game.load.spritesheet("gobo", "assets/goblin.png", 48, 48);
      game.load.spritesheet("Agobo", "assets/Agoblin.png", 64, 64);
      game.load.spritesheet("darkMage", "assets/darkMage.png", 80, 80);
      game.load.spritesheet("warius", "assets/warius.png", 128, 128);
      game.load.spritesheet("magebolt", "assets/Mage bolt.png", 8, 8);
      game.load.spritesheet("skeleton", "assets/Skeleton.png", 48, 48);
      game.load.image("manabar", "assets/Mana bar.png");
      game.load.image("menubg", "assets/Menu background.png");
      game.load.image("sewerbg", "assets/sewerBackground.png");
      game.load.image("castlebg", "assets/castleBackground.png");
      game.load.spritesheet("slimeb", "assets/slime_blue.png", 16, 16);
      game.load.spritesheet("slimeg", "assets/slime_green.png", 32, 32);
      game.load.spritesheet("lazer", "assets/lazer.png", 48, 48);
      game.load.spritesheet("slimer", "assets/slime_red.png", 16, 16);
      game.load.spritesheet("Bslime", "assets/bigSlime.png", 64, 64);
      game.load.image("spikes", "assets/spikes.png");
      game.load.image("sewerP", "assets/sewerPlatform.png");
      game.load.spritesheet("spellselect", "assets/Spell Select.png", 48, 48);
      game.load.image("mbottle", "assets/mana bottle.png");
      game.load.image("door", "assets/Door.png");
   },

   create: function() {
      game.state.start('menu');
   }

};
