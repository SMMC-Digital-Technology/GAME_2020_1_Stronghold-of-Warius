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
    //create player
    player = game.add.sprite(50, 550, "jendolfson");
    game.physics.arcade.enable(player);
    player.body.gravity.y = 9000;
    player.body.collideWorldBounds = true;
    player.body.setSize(40, 64, 0.5, 0.5);
    //animate the player
    player.animations.add('right', [0, 1, 2, 3], 10, false);
    player.animations.add('left', [4, 5, 6, 7], 10, false);
    player.animations.add('rightSwing', [8, 9, 10, 11, 0], 10, false);
    player.animations.add('hit', [29, 0], 8, false);

    //spawn slime 1
    slime1 = game.add.sprite(400, 200, "slimeg");
    game.physics.arcade.enable(slime1);
    slime1.body.gravity.y = 9000;
    slime1.body.collideWorldBounds = true;
    slime1.body.setSize(20, 32, 0.5, 0.5);
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

    //create health bar
    healthBar = game.add.image(325, 25, "healthbar");
    healthBar.anchor.setTo(1, 0);
    healthBar.width = game.global.health / game.global.healthM * 300;
    healthBar.fixedToCamera = true;
    //create mana bar
    manaBar = game.add.image(325, 50, "manabar");
    manaBar.anchor.setTo(1, 0);
    manaBar.width = game.global.mana / game.global.manaM * 300;
    manaBar.fixedToCamera = true;
    //create spell select
    spellselect = game.add.image(650, 25, "spellselect");
    spellselect.fixedToCamera = true;
  },

  update: function() {
    //physics checks
    game.physics.arcade.overlap(player, slime1, this.hitslime);

    this.movePlayer();

    zKey.onDown.add(function() {
       if (cursors.left.isDown) {
         player.animations.play("leftSwing");
       } else {
         player.animations.stop(null, true);
         player.animations.play("rightSwing");
       }
     })

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
   if (player.body.blocked.down && cursors.up.isDown) {
      player.body.velocity.y = -6000;
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
    }

  },
  removehealth: function(lives) {
    game.global.health -= lives;
    if (game.global.health <= 0) {
      game.state.start("gameover");
    } else {
      healthBar.width = game.global.health / game.global.healthM * 300;
      player.animations.stop();
      player.animations.play("hit");
    }
  },

  hitslime: function(){
    if (player.body.touching.right) {
      player.x -= 30;
    } else if (player.body.touching.left) {
      player.x += 30;
    } else {
      player.body.velocity.y = -350;
    }
    level1State.removehealth(1)
  }
};
