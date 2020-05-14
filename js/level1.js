var level1State = {
   create: function() {
     game.physics.startSystem(Phaser.Physics.ARCADE);
     // set the size of the world
     game.world.setBounds(0, 0, 4000, 600);
     game.add.image(0, 0, "sewerbg");
     game.add.image(800, 0, "sewerbg");
     game.add.image(1600, 0, "sewerbg");
     game.add.image(2400, 0, "sewerbg");
     game.add.image(3200, 0, "sewerbg");

     player = game.add.sprite(game.world.randomX, game.world.randomY, "jendolfson");
     game.physics.arcade.enable(player);
     player.body.collideWorldBounds = true;
     cursors = game.input.keyboard.createCursorKeys();
     // focuses the player in the camera view and forces the camera to follow      // the player, except if the view would go outside the game world
     game.camera.follow(player);

     //health bar
     healthBar = game.add.image(300, 300, "healthbar");
     healthBar.anchor.setTo(1, 0);
     healthBar.width = game.global.health / game.global.healthM * 200;
   },

   update: function() {
   this.moveAvatar();
 },

  // moves the avatar with the cursors
  moveAvatar: function() {
   // up-down
   if (cursors.up.isDown) {
      player.body.velocity.y = -500;
   } else if (cursors.down.isDown) {
      player.body.velocity.y = 500;
   } else {
      player.body.velocity.y = 0;
   }
   // left-right
   if (cursors.left.isDown) {
      player.body.velocity.x = -500;
   } else if (cursors.right.isDown) {
      player.body.velocity.x = 500;
   } else {
      player.body.velocity.x = 0;
   }
}
};
