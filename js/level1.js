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
    player.animations.add('hitL', [32, 0], 8, false);
    player.animations.add('hitR', [33, 4], 8, false);
    player.animations.add('leftBolt', [18, 19, 4], 8, false);
    player.animations.add('rightBolt', [16, 17, 0], 8, false);
    player.invincible = false;

    //group to collect platforms
    platforms = game.add.group();
    //enable physics on group
    platforms.enableBody = true;
    platforms.create(1250, 450, "sewerP");
    platforms.create(1340, 450, "sewerP");
    platforms.create(1430, 450, "sewerP");
    //immovable platforms
    platforms.setAll("body.immovable", true)


    //group to collect spikes
    spikes = game.add.group();
    //immovable spikes
    spikes.setAll("body.immovable", true)
    //enable physics on group
    spikes.enableBody = true;
    //make the spikes
    spikes.create(1200, 590, "spikes");
    spikes.create(1240, 590, "spikes");
    spikes.create(1280, 590, "spikes");
    spikes.create(1320, 590, "spikes");
    spikes.create(1360, 590, "spikes");
    spikes.create(1400, 590, "spikes");
    spikes.create(1440, 590, "spikes");
    spikes.create(1480, 590, "spikes");
    spikes.create(1520, 590, "spikes");

    //spawn slime 1
    slime1 = game.add.sprite(400, 200, "slimeg");
    game.physics.arcade.enable(slime1);
    slime1.body.gravity.y = 2000;
    slime1.body.collideWorldBounds = true;
    slime1.body.setSize(20, 32, 0.5, 0.5);
    slime1.health = 1;
    slime1.animations.add('left', [0, 1, 2], 3, true);
    slime1.animations.add('right', [3, 4, 5], 3, true);

    //spawn bat
    bat1 = game.add.sprite(1500, 100, "bat");
    game.physics.arcade.enable(bat1);
    bat1.body.collideWorldBounds = true;
    bat1.body.setSize(20, 32, 0.5, 0.5);
    bat1.animations.add('flyR', [0, 1, 2, 3], 8, true);
    bat1.animations.add('flyL', [4, 5, 6, 7], 8, true);
    bat1.frame = 8

    //mana bottles
    mbottle = game.add.group();
    mbottle.enableBody = true;
    mbottle.create(400, 500, "mbottle");

    // create keys
    cursors = game.input.keyboard.createCursorKeys();
    zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    xKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
    cKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
    //declare direction variable
    var direction = {
      facing: "right"
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

    //create mage bolt, if fired take one mana
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
    game.physics.arcade.overlap(player, slime1, this.hitslime);
    game.physics.arcade.overlap(player, bat1, this.hitslime);
    game.physics.arcade.overlap(player, spikes, this.touchspike);
    game.physics.arcade.overlap(player, slime1, this.slimewhack);
    game.physics.arcade.overlap(player, bat1, this.batwhack);
    game.physics.arcade.overlap(weapon.bullets, slime1, this.slimeshot);
    game.physics.arcade.overlap(weapon.bullets, bat1, this.batshot);
    game.physics.arcade.overlap(player, mbottle, this.gainmana)
    //no floating through platforms
    hitPlatform = game.physics.arcade.collide(player, platforms);

    this.movePlayer(direction);

    //make it possible to jump off platforms
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
      player.body.velocity.y = -850;
    }

    //x to shoot magebolt
    if (xKey.isDown && direction.facing == "left") {
      weapon.addBulletAnimation("wiggleL", [3, 4, 5], 8, true);
      weapon.bulletSpeed = -500;
      player.animations.play("leftBolt");
    } else if (xKey.isDown && direction.facing == "right") {
      weapon.addBulletAnimation("wiggleR", [0, 1, 2], 8, true);
      player.animations.play("rightBolt");
      weapon.bulletSpeed = 500;
    }

    if (fireButton.isDown && game.global.mana > 0)
    {
        weapon.fire();
    }


    //z to swing stick(attack)
    if (zKey.isDown && direction.facing == "left") {
      player.animations.play("leftSwing");
      player.invincible = true;
      game.time.events.add(600, () => {
        player.invincible = false});
    } else if (zKey.isDown && direction.facing == "right") {
      player.animations.play("rightSwing");
      player.invincible = true;
      game.time.events.add(600, () => {
        player.invincible = false});
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


  var distance = player.x - bat1.x;
  if (distance < 0 && distance > -600 && bat1.x > 0) {
    bat1.body.velocity.x = -100;
    bat1.animations.play("flyL");
  } else if (distance > 0 && distance < 600 && bat1.x) {
    bat1.body.velocity.x = 100;
    bat1.animations.play("flyR");
  } else {
    bat1.body.velocity.x = 0;
  }
  var distance = player.y - bat1.y;
  if (distance < 0 && distance > -600 && bat1.x > 0) {
    bat1.body.velocity.y = -100;
  } else if (distance > 0 && distance < 600 && bat1.y) {
    bat1.body.velocity.y = 100;
  } else {
    bat1.body.velocity.y = 0;
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
    } else if (!player.incincible){
      healthBar.width = game.global.health / game.global.healthM * 300;
    }
  },

  hitslime: function() { //if touching slime take damage
    if (player.body.touching.right && !player.invincible) {
      player.x -= 30;
      player.animations.stop();
      player.animations.play("hitL");
    } else if (player.body.touching.left && !player.invincible) {
      player.x += 30;
      player.animations.stop();
      player.animations.play("hitR");
    }
    level1State.removehealth(1)
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

  //slime gets flung back and takes damage
  slimewhack: function() {
    if (slime1.health == 0) {
      slime1.kill();
    } else if (slime1.body.touching.right && player.invincible == true) {
      slime1.x -= 70;
      slime1.body.velocity.y = -200
      slime1.health -= 1;
    } else if (slime1.body.touching.left && player.invincible == true) {
      slime1.x += 70;
      slime1.body.velocity.y = -200
      slime1.health -= 1;
    }
  },

  //bat gets flung back and takes damage
  batwhack: function() {
    if (bat1.body.touching.right && player.invincible == true) {
      bat1.kill();
    } else if (bat1.body.touching.left && player.invincible == true) {
      bat1.kill();
    }
  },

  slimeshot: function(slime1, other) {
    if (slime1.health == 0) {
      slime1.kill();
    }
    other.kill();
    slime1.health -= 1;
  },

  batshot: function(bat, other) {
      bat1.kill();
    },

  removemana: function(mana) {
    if (game.global.mana > 0)
    game.global.mana -= mana;
    manaBar.width = game.global.mana / game.global.manaM * 300;
  },

  gainmana: function(player, other) {
    other.kill();
    game.global.mana = game.global.manaM
    manaBar.width = game.global.mana / game.global.manaM * 300;
  }
};
