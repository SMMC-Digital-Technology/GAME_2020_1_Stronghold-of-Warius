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
    player.body.gravity.y = 2000;
    player.body.collideWorldBounds = true;
    player.body.setSize(40, 64, 0.5, 0.5);
    //animate the player
    player.animations.add('right', [0, 1, 2, 3], 10, false);
    player.animations.add('left', [4, 5, 6, 7], 10, false);
    player.animations.add('rightSwing', [8, 9, 10, 11, 0], 10, false);
    player.animations.add('leftSwing', [12, 13, 14, 15, 4], 10, false);
    player.animations.add('hitL', [30, 0], 8, false);
    player.animations.add('hitR', [31, 4], 8, false);
    player.animations.add('leftBolt', [14, 4], 8, false);
    player.animations.add('rightBolt', [10, 3], 8, false);

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
    //declare facing variable
    var direction = {
      facing: "right"
    };

    var invincible = {
      nohit: "false"
    };
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
    spellselect = game.add.sprite(500, 25, "spellselect");
    spellselect.frame = 3;
    spellselect.fixedToCamera = true;

    //create mage bolt
    weapon = game.add.weapon(50, 'magebolt');
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS; //destroyed when off-screen
    weapon.bulletSpeed = 600; //pixels per second
    weapon.fireRate = 250; //delay in milliseconds
    weapon.trackSprite(player, 40, 40, true);

    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.X);

  },

  update: function(direction, invincible) {
    //physics checks
    game.physics.arcade.overlap(player, slime1, this.hitslime);

    this.movePlayer(direction);

    //x to shoot magebolt
    if (xKey.isDown && direction.facing == "left") {
      player.animations.play("leftBolt");
    } else if (xKey.isDown && direction.facing == "right") {
      player.animations.play("rightBolt");
    }

    if (fireButton.isDown)
    {
        weapon.fire();
    }

    //z to swing stick(attack)
    if (zKey.isDown && direction.facing == "left") {
      player.animations.play("leftSwing");
    } else if (zKey.isDown && direction.facing == "right") {
      player.animations.play("rightSwing");
      player.body.setSize(60, 64, 0.5, 0.5);
    }

    var distance = player.x - slime1.x;
    if (distance < 0 && distance > -300 && slime1.x > 0) {
      slime1.body.velocity.x = -70;
      slime1.animations.play("left");
    } else if (distance > 0 && distance < 300 && slime1.x < game.world.width) {
      slime1.body.velocity.x = 70;
      slime1.animations.play("right");
    } else {
      slime1.body.velocity.x = 0;
    }
  },

  // moves the player with the cursors
  movePlayer: function(direction) {
    // up-down
    if (cursors.up.isDown && player.body.blocked.down) {
      player.body.velocity.y = -850;
    } else if (cursors.down.isDown) {
      player.body.velocity.y = 500;
    }
    // left-right
    if (cursors.left.isDown) {
      player.body.velocity.x = -400;
      player.animations.play('left')
      direction.facing = "left"
    } else if (cursors.right.isDown) {
      player.body.velocity.x = 400;
      player.animations.play('right')
      direction.facing = "right"
    } else {
      player.body.velocity.x = 0;
    }

  },
  removehealth: function(lives, invincible) { //remove health
    game.global.health -= lives;
    if (game.global.health <= 0) {
      game.state.start("gameover");
    } else if (invincible.nohit == "false"){
      healthBar.width = game.global.health / game.global.healthM * 300;
    }
  },

  hitslime: function() { //if touching slime take damage
    if (player.body.touching.right) {
      player.x -= 30;
      player.animations.stop();
      player.animations.play("hitL");
    } else if (player.body.touching.left) {
      player.x += 30;
      player.animations.stop();
      player.animations.play("hitR");
    } else {
      player.body.velocity.y = -350;
    }
    level1State.removehealth(1)
  }
};
