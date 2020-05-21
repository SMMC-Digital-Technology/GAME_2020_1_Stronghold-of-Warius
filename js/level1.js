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

    player = game.add.sprite(50, 550, "jendolfson");
    game.physics.arcade.enable(player);
    player.body.gravity.y = 9000;
    player.body.collideWorldBounds = true;
    //animate the player
    player.animations.add('right', [0, 1, 2, 3], 10, true);
    player.animations.add('left', [4, 5, 6, 7], 10, true);
    player.animations.add('rightSwing', [5, 6, 7, 8], 10, true);

    //spawn slime 1
    slime1 = game.add.sprite(100, 200, "slimeg");
    game.physics.arcade.enable(slime1);
    slime1.body.gravity.y = 9000;
    slime1.body.collideWorldBounds = true;
    slime1.animations.add('left', [0, 1, 2], 3, true);
    slime1.animations.add('right', [3, 4, 5], 3, true);
    // create keys
    cursors = game.input.keyboard.createCursorKeys();
    zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    xKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
    cKey = game.input.keyboard.addKey(Phaser.Keyboard.C);

    // focuses the player in the camera view and forces the camera to follow
    // the player, except if the view would go outside the game world
    game.camera.follow(player);

    //health bar
    healthBar = game.add.image(325, 25, "healthbar");
    healthBar.anchor.setTo(1, 0);
    healthBar.width = game.global.health / game.global.healthM * 300;
    healthBar.fixedToCamera = true;
    //mana bar
    manaBar = game.add.image(325, 50, "manabar");
    manaBar.anchor.setTo(1, 0);
    manaBar.width = game.global.mana / game.global.manaM * 300;
    manaBar.fixedToCamera = true;

    spellselect = game.add.image(650, 25, "spellselect");
    spellselect.fixedToCamera = true;
  },

  update: function() {
    this.movePlayer();

    var distance = player.x - slime1.x;
    if (distance < 0 && distance > -300 && slime1.x > 0) {
      slime1.body.velocity.x = -70;
      slime1.animations.play("left");
    } else if (distance > 0 && distance < 300 && slime1.x < 600) {
      slime1.body.velocity.x = 70;
      slime1.animations.play("right");
    } else {
      slime1.body.velocity.x = 0;
    }

  },

  // moves the player with the cursors
  movePlayer: function() {
    // up-down
    if (cursors.up.isDown && player.body.touching.down) {
      player.body.velocity.y = -1000;
    } else if (cursors.down.isDown) {
      player.body.velocity.y = 500;
    } else {
      player.body.velocity.y = 0;
    }
    // left-right
    if (cursors.left.isDown) {
      player.body.velocity.x = -400;
      player.animations.play('left')
    } else if (cursors.right.isDown) {
      player.body.velocity.x = 400;
      player.animations.play('right')
    } else {
      player.body.velocity.x = 0;
      player.animations.stop();
      player.frame = 0;
    }

  }
};
