var level2State = {
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // set the size of the world
    game.world.setBounds(0, 0, 4000, 600);
    game.add.image(0, 0, "castlebg");
    game.add.image(800, 0, "castlebg");
    game.add.image(1600, 0, "castlebg");
    game.add.image(2400, 0, "castlebg");
    game.add.image(3200, 0, "castlebg");
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
    player.animations.add('hitL', [32, 0], 8, false);
    player.animations.add('hitR', [33, 4], 8, false);
    player.animations.add('leftBolt', [18, 19, 4], 8, false);
    player.animations.add('rightBolt', [16, 17, 0], 8, false);
    player.animations.add('leftHeal', [34, 35, 36, 4], 8, false);
    player.animations.add('rightHeal', [20, 21, 22, 0], 8, false);
    player.invincible = false;

    //group to collect spikes
    spikes = game.add.group();
    //immovable spikes
    spikes.setAll("body.immovable", true)
    //enable physics on group
    spikes.enableBody = true;
    //make the spikes
    spikes.create(0, 590, "spikes");
    spikes.create(700, 590, "spikes");
    spikes.create(1200, 590, "spikes");
    spikes.create(1220, 590, "spikes");

    //spawn gobo 1
    gobo1 = game.add.sprite(400, 200, "gobo");
    game.physics.arcade.enable(gobo1);
    gobo1.body.gravity.y = 2000;
    gobo1.body.collideWorldBounds = true;
    gobo1.body.setSize(48, 48, 0.5, 0.5);
    gobo1.health = 2;
    gobo1.animations.add('left', [0, 1, 2, 3], 3, true);
    gobo1.animations.add('right', [5, 6, 7, 8], 3, true);
    gobo1.frame = 4
    //spawn skeleton 1
    skeleton1 = game.add.sprite(1100, 200, "skeleton");
    game.physics.arcade.enable(skeleton1);
    skeleton1.body.gravity.y = 2000;
    skeleton1.body.collideWorldBounds = true;
    skeleton1.body.setSize(36, 48, 0.5, 0.5);
    skeleton1.health = 4;
    skeleton1.animations.add('left', [0, 1, 2, 3, 4, 3], 3, true);
    skeleton1.frame = 0
    //spawn Agobo
    aGobo = game.add.sprite(2000, 200, "Agobo");
    game.physics.arcade.enable(aGobo);
    aGobo.body.gravity.y = 2000;
    aGobo.body.collideWorldBounds = true;
    aGobo.body.setSize(48, 64, 0.5, 0.5);
    aGobo.health = 4;
    aGobo.animations.add('left', [4, 5,], 3, true);
    aGobo.animations.add('right', [7, 8,], 3, true);
    aGobo.animations.add('draw', [1, 2, 3], 3, true);
    aGobo.frame = 4

    // create keys
    cursors = game.input.keyboard.createCursorKeys();
    zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    xKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
    cKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
    //declare direction variable
    var direction = {
      facing: "right"
    };
    //Set selected spell to 1
    game.global.spellSelected = 1

    //set delay variables to 0
    game.global.timeCheck = 0;
    game.global.timeCheck2 = 0;

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
    weapon = game.add.weapon(10, 'magebolt');
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS; //destroyed when off-screen
    weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE; //destroyed after a given distance
    weapon.bulletKillDistance = 500;
    weapon.bulletSpeed = 500; //pixels per second
    weapon.fireRate = 250; //delay in milliseconds
    weapon.trackSprite(player, 40, 40, true);
    weapon.onFire.add(function() {
      level1State.removemana(1)
    });

    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.X);


  },

  update: function(direction) {
    //physics checks
    game.physics.arcade.overlap(player, gobo1, this.hitgobo);
    game.physics.arcade.overlap(player, gobo1, this.gobowhack);
    game.physics.arcade.overlap(weapon.bullets, gobo1, this.goboshot);
    game.physics.arcade.overlap(player, spikes, this.touchspike);
    game.physics.arcade.overlap(player, skeleton1, this.hitskeleton);
    game.physics.arcade.overlap(player, skeleton1, this.skeletonwhack);
    game.physics.arcade.overlap(weapon.bullets, skeleton1, this.skeletonshot);
    game.physics.arcade.overlap(player, aGobo, this.hitaGobo);
    game.physics.arcade.overlap(player, aGobo, this.aGobowhack);
    game.physics.arcade.overlap(weapon.bullets, aGobo, this.aGoboshot);

    this.movePlayer(direction);

    //c to change spell
    if (cKey.isDown && game.time.now - game.global.timeCheck > 250) {
      this.changeSpell();
      game.global.timeCheck = game.time.now;
    }

    //x to shoot magebolt
    if (game.global.spellSelected == 1 && xKey.isDown && direction.facing == "left") {
      weapon.addBulletAnimation("wiggleL", [3, 4, 5], 8, true);
      weapon.bulletSpeed = -500;
      player.animations.play("leftBolt");
    } else if (game.global.spellSelected == 1 && xKey.isDown && direction.facing == "right") {
      weapon.addBulletAnimation("wiggleR", [0, 1, 2], 8, true);
      player.animations.play("rightBolt");
      weapon.bulletSpeed = 500;
    }
    if (game.global.spellSelected == 1 && fireButton.isDown && game.global.mana > 0)
    {
        weapon.fire();
    }

    if (game.global.spellSelected == 2 && xKey.isDown && direction.facing == "left" && game.global.mana >= 10 && game.time.now - game.global.timeCheck2 > 250) {
      level1State.removemana(10)
      level1State.gainhealth()
      player.animations.play("leftHeal");
      game.global.timeCheck2 = game.time.now
    } else if (game.global.spellSelected == 2 && xKey.isDown && direction.facing == "right" && game.global.mana >= 10 && game.time.now - game.global.timeCheck2 > 250) {
      level1State.removemana(10)
      level1State.gainhealth()
      player.animations.play("rightHeal");
      game.global.timeCheck2 = game.time.now
    }



    //z to swing stick(attack)
    if (zKey.isDown && direction.facing == "left") {
      player.animations.play("leftSwing");
      player.invincible = true;
      game.time.events.add(800, () => {
        player.invincible = false});
    } else if (zKey.isDown && direction.facing == "right") {
      player.animations.play("rightSwing");
      player.invincible = true;
      game.time.events.add(800, () => {
        player.invincible = false});
    }
    //gobo AI
    var distance = player.x - gobo1.x;
    if (distance < 0 && distance > -300 && gobo1.x > 0) {
      gobo1.body.velocity.x = -240;
      gobo1.animations.play("left");
    } else if (distance > 0 && distance < 300 && gobo1.x < game.world.width) {
      gobo1.body.velocity.x = 240;
      gobo1.animations.play("right");
    } else {
      gobo1.body.velocity.x = 0;
    }
    //skeleton AI
    var distance = player.x - skeleton1.x;
    if (distance < 0 && distance > -300 && skeleton1.x > 0) {
      skeleton1.body.velocity.x = -40;
      skeleton1.animations.play("left");
    } else {
      skeleton1.body.velocity.x = 0;
      skeleton1.frame = 0
    }
    //aGobo AI
    var distance = player.x - aGobo.x;
    if (distance < 0 && distance > -300 && aGobo.x > 0) {
      aGobo.body.velocity.x = -150;
      aGobo.animations.play("left");
    } else if (distance > 0 && distance < 300 && aGobo.x < game.world.width) {
      aGobo.body.velocity.x = 150;
      aGobo.animations.play("right");
    } else {
      aGobo.body.velocity.x = 0;
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
  removehealth: function(lives) { //remove health
    if (!player.invincible) {
      game.global.health -= lives;
    }
    if (game.global.health <= 0) {
      game.state.start("gameover");
    } else if (!player.invincible){
      healthBar.width = game.global.health / game.global.healthM * 300;
    }
  },

  hitgobo: function() { //if touching gobo take damage
    if (player.body.touching.right && !player.invincible) {
      player.x -= 30;
      player.animations.stop();
      player.animations.play("hitL");
    } else if (player.body.touching.left && !player.invincible) {
      player.x += 30;
      player.animations.stop();
      player.animations.play("hitR");
    }
    level1State.removehealth(2)
  },
  //gobo gets flung back and takes damage
  gobowhack: function() {
    if (gobo1.health == 0) {
      gobo1.kill();
    } else if (gobo1.body.touching.right && player.invincible == true) {
      gobo1.x -= 70;
      gobo1.body.velocity.y = -200
      gobo1.health -= 1;
    } else if (gobo1.body.touching.left && player.invincible == true) {
      gobo1.x += 70;
      gobo1.body.velocity.y = -200
      gobo1.health -= 1;
    }
  },

  goboshot: function(gobo1, other) {
    if (gobo1.health == 0) {
      gobo1.kill();
    }
    other.kill();
    gobo1.health -= 1;
  },

  removemana: function(mana) {
    if (game.global.mana > 0)
    game.global.mana -= mana;
    manaBar.width = game.global.mana / game.global.manaM * 300;
  },

  changeSpell: function() {
    if (game.global.spellSelected == 1) {
      game.global.spellSelected = 2
    } else if (game.global.spellSelected == 2) {
      game.global.spellSelected = 1
    }
    if (game.global.spellSelected == 1) {
      spellselect.frame = 3
    } else if (game.global.spellSelected == 2) {
      spellselect.frame = 0
    } else if (game.global.spellSelected == 3) {
      spellselect.frame = 1
    } else if (game.global.spellSelected == 4) {
      spellselect.frame = 2
    }
  },

  touchspike: function() { //if touching spikes take damage
    if (player.body.touching.right && !player.invincible) {
      player.x -= 30;
      player.animations.stop();
      player.animations.play("hitL");
    } else if (player.body.touching.left && !player.invincible) {
      player.x += 30;
      player.animations.stop();
      player.animations.play("hitR");
    }
    player.body.velocity.y = -600;
    level1State.removehealth(1)
  },

  hitskeleton: function() { //if touching skeleton take damage
    if (player.body.touching.right && !player.invincible) {
      player.x -= 30;
      player.animations.stop();
      player.animations.play("hitL");
    } else if (player.body.touching.left && !player.invincible) {
      player.x += 30;
      player.animations.stop();
      player.animations.play("hitR");
    }
    level1State.removehealth(2)
  },
  //skeleton gets flung back and takes damage
  skeletonwhack: function() {
    if (skeleton1.health == 0) {
      skeleton1.kill();
    } else if (skeleton1.body.touching.right && player.invincible == true) {
      skeleton1.x -= 40;
      skeleton1.body.velocity.y = -100
      skeleton1.health -= 1;
    } else if (skeleton1.body.touching.left && player.invincible == true) {
      skeleton1.x += 10;
      skeleton1.body.velocity.y = -20
      skeleton1.health -= 0;
    }
  },

  skeletonshot: function(skeleton1, other) {
    if (skeleton1.health == 0) {
      skeleton1.kill();
    }
    other.kill();
    if (player.x > skeleton1.x) {
      skeleton1.health -= 1;
    }
  },

  hitaGobo: function() { //if touching gobo take damage
    if (player.body.touching.right && !player.invincible) {
      player.x -= 30;
      player.animations.stop();
      player.animations.play("hitL");
      aGobo.frame = 6;
    } else if (player.body.touching.left && !player.invincible) {
      player.x += 30;
      player.animations.stop();
      player.animations.play("hitR");
      aGobo.frame = 9;
    }
    level1State.removehealth(3)
  },
  //gobo gets flung back and takes damage
  aGobowhack: function() {
    if (gobo1.health == 0) {
      gobo1.kill();
    } else if (gobo1.body.touching.right && player.invincible == true) {
      gobo1.x -= 70;
      gobo1.body.velocity.y = -200
      gobo1.health -= 1;
    } else if (gobo1.body.touching.left && player.invincible == true) {
      gobo1.x += 70;
      gobo1.body.velocity.y = -200
      gobo1.health -= 1;
    }
  },

  aGoboshot: function(gobo1, other) {
    if (gobo1.health == 0) {
      gobo1.kill();
    }
    other.kill();
    gobo1.health -= 1;
  },
};
