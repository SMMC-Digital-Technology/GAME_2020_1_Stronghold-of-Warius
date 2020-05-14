var level1State = {
   create: function() {
     game.physics.startSystem(Phaser.Physics.ARCADE);
     // set the size of the world
     game.world.setBounds(0, 0, 4000, 600);
     game.add.image(0, 0, "sewerbg");

     player = game.add.sprite(game.world.randomX, game.world.randomY, "jendolfson");
     game.physics.arcade.enable(player);
     player.body.collideWorldBounds = true;
     cursors = game.input.keyboard.createCursorKeys();
     // focuses the player in the camera view and forces the camera to follow      // the player, except if the view would go outside the game world
     game.camera.follow(player);
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
