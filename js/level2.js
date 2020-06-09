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

    //group to collect platforms
    platforms = game.add.group();
    //enable physics on group
    platforms.enableBody = true;
    platforms.create(1640, 440, "castleP");
    platforms.create(1810, 140, "castleP");
    platforms.create(1930, 310, "castleP");
    platforms.create(2800, 500, "castleP");
    //immovable platforms
    platforms.setAll("body.immovable", true)

    //add help text
    game.add.text(450, 90, "C = change between spells (different", {font: '20px Arial', fill: '#ffffff'});
    game.add.text(450, 130, "spells cost different amounts of mana)", {font: '20px Arial', fill: '#ffffff'});
    game.add.text(3600, 190, "'This guy has my fireballs. Time", {font: '20px Arial', fill: '#ffffff'});
    game.add.text(3600, 230, "to get them back. He is too hot", {font: '20px Arial', fill: '#ffffff'});
    game.add.text(3600, 270, "my melee attacks won't work.", {font: '20px Arial', fill: '#ffffff'});


    //add door to get to the level2bossState
    door = game.add.group();
    door.enableBody = true;
    door.create(3900, 538, "door");

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
    spikes.create(1620, 590, "spikes");
    spikes.create(1660, 590, "spikes");
    spikes.create(1700, 590, "spikes");
    spikes.create(1810, 130, "spikes");
    spikes.create(1860, 0, "Rspikes");
    spikes.create(2280, 590, "spikes");
    spikes.create(2320, 590, "spikes");
    spikes.create(2360, 590, "spikes");

    //spawn gobos
    gobo1 = game.add.sprite(400, 200, "gobo");
    game.physics.arcade.enable(gobo1);
    gobo1.body.gravity.y = 2000;
    gobo1.body.collideWorldBounds = true;
    gobo1.body.setSize(48, 48, 0.5, 0.5);
    gobo1.health = 2;
    gobo1.animations.add('left', [0, 1, 2, 3], 3, true);
    gobo1.animations.add('right', [5, 6, 7, 8], 3, true);
    gobo1.frame = 4

    gobo2 = game.add.sprite(1550, 200, "gobo");
    game.physics.arcade.enable(gobo2);
    gobo2.body.gravity.y = 2000;
    gobo2.body.collideWorldBounds = true;
    gobo2.body.setSize(48, 48, 0.5, 0.5);
    gobo2.health = 2;
    gobo2.animations.add('left', [0, 1, 2, 3], 3, true);
    gobo2.animations.add('right', [5, 6, 7, 8], 3, true);
    gobo2.frame = 4

    gobo3 = game.add.sprite(1950, 200, "gobo");
    game.physics.arcade.enable(gobo3);
    gobo3.body.gravity.y = 2000;
    gobo3.body.collideWorldBounds = true;
    gobo3.body.setSize(48, 48, 0.5, 0.5);
    gobo3.health = 2;
    gobo3.animations.add('left', [0, 1, 2, 3], 3, true);
    gobo3.animations.add('right', [5, 6, 7, 8], 3, true);
    gobo3.frame = 4

    gobo4 = game.add.sprite(2820, 200, "gobo");
    game.physics.arcade.enable(gobo4);
    gobo4.body.gravity.y = 2000;
    gobo4.body.collideWorldBounds = true;
    gobo4.body.setSize(48, 48, 0.5, 0.5);
    gobo4.health = 2;
    gobo4.animations.add('left', [0, 1, 2, 3], 3, true);
    gobo4.animations.add('right', [5, 6, 7, 8], 3, true);
    gobo4.frame = 4

    gobo5 = game.add.sprite(2880, 200, "gobo");
    game.physics.arcade.enable(gobo5);
    gobo5.body.gravity.y = 2000;
    gobo5.body.collideWorldBounds = true;
    gobo5.body.setSize(48, 48, 0.5, 0.5);
    gobo5.health = 2;
    gobo5.animations.add('left', [0, 1, 2, 3], 3, true);
    gobo5.animations.add('right', [5, 6, 7, 8], 3, true);
    gobo5.frame = 4

    //spawn skeletons
    skeleton1 = game.add.sprite(1100, 200, "skeleton");
    game.physics.arcade.enable(skeleton1);
    skeleton1.body.gravity.y = 2000;
    skeleton1.body.collideWorldBounds = true;
    skeleton1.body.setSize(36, 48, 0.5, 0.5);
    skeleton1.health = 3;
    skeleton1.animations.add('left', [0, 1, 2, 3, 4, 3], 10, true);
    skeleton1.frame = 0

    skeleton2 = game.add.sprite(2760, 200, "skeleton");
    game.physics.arcade.enable(skeleton2);
    skeleton2.body.gravity.y = 2000;
    skeleton2.body.collideWorldBounds = true;
    skeleton2.body.setSize(36, 48, 0.5, 0.5);
    skeleton2.health = 3;
    skeleton2.animations.add('left', [0, 1, 2, 3, 4, 3], 3, true);
    skeleton2.frame = 0

    //spawn bats
    bat1 = game.add.sprite(1170, 350, "bat");
    game.physics.arcade.enable(bat1);
    bat1.body.collideWorldBounds = true;
    bat1.body.setSize(20, 32, 0.5, 0.5);
    bat1.animations.add('flyR', [0, 1, 2, 3], 8, true);
    bat1.animations.add('flyL', [4, 5, 6, 7], 8, true);
    bat1.frame = 8
    //spawn Agobo
    aGobo = game.add.sprite(2000, 200, "Agobo");
    game.physics.arcade.enable(aGobo);
    aGobo.body.gravity.y = 2000;
    aGobo.body.collideWorldBounds = true;
    aGobo.body.setSize(48, 64, 0.5, 0.5);
    aGobo.health = 4;
    aGobo.animations.add('left', [4, 5], 3, true);
    aGobo.animations.add('right', [7, 8], 3, true);
    aGobo.animations.add('draw', [1, 2, 3], 3, false);
    aGobo.frame = 4

    //mana bottles
    mbottle = game.add.group();
    mbottle.enableBody = true;
    mbottle.create(1870, 100, "mbottle");

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
    game.physics.arcade.overlap(player, gobo1, this.gobo1whack);
    game.physics.arcade.overlap(weapon.bullets, gobo1, this.gobo1shot);
    game.physics.arcade.overlap(player, gobo2, this.hitgobo);
    game.physics.arcade.overlap(player, gobo2, this.gobo2whack);
    game.physics.arcade.overlap(weapon.bullets, gobo2, this.gobo2shot);
    game.physics.arcade.overlap(player, gobo3, this.hitgobo);
    game.physics.arcade.overlap(player, gobo3, this.gobo3whack);
    game.physics.arcade.overlap(weapon.bullets, gobo3, this.gobo3shot);
    game.physics.arcade.overlap(player, gobo4, this.hitgobo);
    game.physics.arcade.overlap(player, gobo4, this.gobo4whack);
    game.physics.arcade.overlap(weapon.bullets, gobo4, this.gobo4shot);
    game.physics.arcade.overlap(player, gobo5, this.hitgobo);
    game.physics.arcade.overlap(player, gobo5, this.gobo5whack);
    game.physics.arcade.overlap(weapon.bullets, gobo5, this.gobo5shot);
    game.physics.arcade.collide(gobo3, platforms);
    game.physics.arcade.overlap(player, spikes, this.touchspike);
    game.physics.arcade.overlap(player, skeleton1, this.hitskeleton);
    game.physics.arcade.overlap(player, skeleton1, this.skeleton1whack);
    game.physics.arcade.overlap(weapon.bullets, skeleton1, this.skeleton1shot);
    game.physics.arcade.overlap(player, skeleton2, this.hitskeleton);
    game.physics.arcade.overlap(player, skeleton2, this.skeleton2whack);
    game.physics.arcade.overlap(weapon.bullets, skeleton2, this.skeleton2shot);
    game.physics.arcade.overlap(player, bat1, this.hitbat);
    game.physics.arcade.overlap(player, bat1, this.batwhack);
    game.physics.arcade.overlap(weapon.bullets, bat1, this.batshot);
    game.physics.arcade.overlap(player, aGobo, this.hitaGobo);
    game.physics.arcade.overlap(player, aGobo, this.aGobowhack);
    game.physics.arcade.overlap(weapon.bullets, aGobo, this.aGoboshot);
    game.physics.arcade.overlap(player, mbottle, this.gainmana)
    game.physics.arcade.overlap(player, door, this.boss);
    //no floating through platforms
    hitPlatform = game.physics.arcade.collide(player, platforms);

    this.movePlayer(direction);

    //make it possible to jump off platforms
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
      player.body.velocity.y = -850;
    }

    //c to change spell
    if (cKey.isDown && game.time.now - game.global.timeCheck > 250) {
      this.changeSpell();
      game.global.timeCheck = game.time.now;
    }

    //x to shoot magebolt id spell selected is 1
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
    //heal the player if spell selected is 2
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
    //gobo AIs
    var distance = player.x - gobo1.x;
    if (distance < 0 && distance > -350 && gobo1.x > 0) {
      gobo1.body.velocity.x = -240;
      gobo1.animations.play("left");
    } else if (distance > 0 && distance < 350 && gobo1.x < game.world.width) {
      gobo1.body.velocity.x = 240;
      gobo1.animations.play("right");
    } else {
      gobo1.body.velocity.x = 0;
    }

    var distance = player.x - gobo2.x;
    if (distance < 0 && distance > -350 && gobo2.x > 0) {
      gobo2.body.velocity.x = -240;
      gobo2.animations.play("left");
    } else if (distance > 0 && distance < 350 && gobo2.x < game.world.width) {
      gobo2.body.velocity.x = 240;
      gobo2.animations.play("right");
    } else {
      gobo2.body.velocity.x = 0;
    }

    var distance = player.x - gobo3.x;
    if (distance < 0 && distance > -350 && gobo3.x > 0) {
      gobo3.body.velocity.x = -240;
      gobo3.animations.play("left");
    } else if (distance > 0 && distance < 350 && gobo3.x < game.world.width) {
      gobo3.body.velocity.x = 240;
      gobo3.animations.play("right");
    } else {
      gobo3.body.velocity.x = 0;
    }

    var distance = player.x - gobo4.x;
    if (distance < 0 && distance > -350 && gobo4.x > 0) {
      gobo4.body.velocity.x = -240;
      gobo4.animations.play("left");
    } else if (distance > 0 && distance < 350 && gobo4.x < game.world.width) {
      gobo4.body.velocity.x = 240;
      gobo4.animations.play("right");
    } else {
      gobo4.body.velocity.x = 0;
    }

    var distance = player.x - gobo5.x;
    if (distance < 0 && distance > -350 && gobo5.x > 0) {
      gobo5.body.velocity.x = -240;
      gobo5.animations.play("left");
    } else if (distance > 0 && distance < 350 && gobo5.x < game.world.width) {
      gobo5.body.velocity.x = 240;
      gobo5.animations.play("right");
    } else {
      gobo5.body.velocity.x = 0;
    }

    //skeleton AI
    var distance = player.x - skeleton1.x;
    if (distance < 0 && distance > -800 && skeleton1.x > 0) {
      skeleton1.body.velocity.x = -40;
      skeleton1.animations.play("left");
    } else {
      skeleton1.body.velocity.x = 0;
      skeleton1.frame = 0
    }

    var distance = player.x - skeleton2.x;
    if (distance < 0 && distance > -800 && skeleton2.x > 0) {
      skeleton2.body.velocity.x = -40;
      skeleton2.animations.play("left");
    } else {
      skeleton2.body.velocity.x = 0;
      skeleton2.frame = 0
    }
    //bat AI
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
      aGobo.frame = 0;
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
  removehealth: function(lives) { //remove health and resize healthBar
    if (!player.invincible) {
      game.global.health -= lives;
    }
    if (game.global.health <= 0) {
      game.state.start("gameover");
    } else if (!player.invincible){
      healthBar.width = game.global.health / game.global.healthM * 300;
    }
  },
  //remove mana and resize manaBar
  removemana: function(mana) {
    if (game.global.mana > 0)
    game.global.mana -= mana;
    manaBar.width = game.global.mana / game.global.manaM * 300;
  },
  //add mana and resize manaBar
  gainmana: function(player, other) {
    other.kill();
    game.global.mana = game.global.manaM
    manaBar.width = game.global.mana / game.global.manaM * 300;
  },
  //change the spell that will be used
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
  //gobo1 gets flung back and takes damage
  gobo1whack: function() {
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
  //shoot gobo
  gobo1shot: function(gobo1, other) {
    if (gobo1.health == 0) {
      gobo1.kill();
    }
    other.kill();
    gobo1.health -= 1;
  },

  //gobo2 gets flung back and takes damage
  gobo2whack: function() {
    if (gobo2.health == 0) {
      gobo2.kill();
    } else if (gobo2.body.touching.right && player.invincible == true) {
      gobo2.x -= 70;
      gobo2.body.velocity.y = -200
      gobo2.health -= 1;
    } else if (gobo2.body.touching.left && player.invincible == true) {
      gobo2.x += 70;
      gobo2.body.velocity.y = -200
      gobo2.health -= 1;
    }
  },
  //shoot gobo
  gobo2shot: function(gobo2, other) {
    if (gobo2.health == 0) {
      gobo2.kill();
    }
    other.kill();
    gobo2.health -= 1;
  },

  //gobo3 gets flung back and takes damage
  gobo3whack: function() {
    if (gobo3.health == 0) {
      gobo3.kill();
    } else if (gobo3.body.touching.right && player.invincible == true) {
      gobo3.x -= 70;
      gobo3.body.velocity.y = -200
      gobo3.health -= 1;
    } else if (gobo3.body.touching.left && player.invincible == true) {
      gobo3.x += 70;
      gobo3.body.velocity.y = -200
      gobo3.health -= 1;
    }
  },
  //shoot gobo
  gobo3shot: function(gobo3, other) {
    if (gobo3.health == 0) {
      gobo3.kill();
    }
    other.kill();
    gobo3.health -= 1;
  },

  //gobo4 gets flung back and takes damage
  gobo4whack: function() {
    if (gobo4.health == 0) {
      gobo4.kill();
    } else if (gobo4.body.touching.right && player.invincible == true) {
      gobo4.x -= 70;
      gobo4.body.velocity.y = -200
      gobo4.health -= 1;
    } else if (gobo4.body.touching.left && player.invincible == true) {
      gobo4.x += 70;
      gobo4.body.velocity.y = -200
      gobo4.health -= 1;
    }
  },
  //shoot gobo
  gobo4shot: function(gobo4, other) {
    if (gobo4.health == 0) {
      gobo4.kill();
    }
    other.kill();
    gobo4.health -= 1;
  },

  //gobo5 gets flung back and takes damage
  gobo5whack: function() {
    if (gobo5.health == 0) {
      gobo5.kill();
    } else if (gobo5.body.touching.right && player.invincible == true) {
      gobo5.x -= 70;
      gobo5.body.velocity.y = -200
      gobo5.health -= 1;
    } else if (gobo5.body.touching.left && player.invincible == true) {
      gobo5.x += 70;
      gobo5.body.velocity.y = -200
      gobo5.health -= 1;
    }
  },
  //shoot gobo
  gobo5shot: function(gobo5, other) {
    if (gobo5.health == 0) {
      gobo5.kill();
    }
    other.kill();
    gobo5.health -= 1;
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
      player.x -= 40;
      player.animations.stop();
      player.animations.play("hitL");
    } else if (player.body.touching.left && !player.invincible) {
      player.x += 40;
      player.animations.stop();
      player.animations.play("hitR");
    }
    level1State.removehealth(2)
  },
  //skeleton gets flung back and takes damage
  skeleton1whack: function() {
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
  //shoot skeleton
  skeleton1shot: function(skeleton1, other) {
    if (skeleton1.health == 0) {
      skeleton1.kill();
    }
    other.kill();
    if (player.x > skeleton1.x) {
      skeleton1.health -= 1;
    }
  },

  //skeleton gets flung back and takes damage
  skeleton2whack: function() {
    if (skeleton2.health == 0) {
      skeleton2.kill();
    } else if (skeleton2.body.touching.right && player.invincible == true) {
      skeleton2.x -= 40;
      skeleton2.body.velocity.y = -100
      skeleton2.health -= 1;
    } else if (skeleton2.body.touching.left && player.invincible == true) {
      skeleton2.x += 10;
      skeleton2.body.velocity.y = -20
      skeleton2.health -= 0;
    }
  },
  //shoot skeleton
  skeleton2shot: function(skeleton2, other) {
    if (skeleton2.health == 0) {
      skeleton2.kill();
    }
    other.kill();
    if (player.x > skeleton2.x) {
      skeleton2.health -= 1;
    }
  },

  hitbat: function() { //if touching bat take damage
    if (player.body.touching.right && !player.invincible) {
      player.x -= 30;
      player.animations.stop();
      player.animations.play("hitL");
    } else if (player.body.touching.left && !player.invincible) {
      player.x += 30;
      player.animations.stop();
      player.animations.play("hitR");
    } else if (player.body.touching.down && !player.invincible) {
      player.body.velocity.y = -800;
    }
    level1State.removehealth(1)
  },

  //bat takes damage
  batwhack: function() {
    if (bat1.body.touching.right && player.invincible == true) {
      bat1.kill();
    } else if (bat1.body.touching.left && player.invincible == true) {
      bat1.kill();
    }
  },
  //shoot bat
  batshot: function(bat, other) {
    bat1.kill();
  },

  hitaGobo: function() { //if touching aGobo take damage
    if (player.body.touching.right && !player.invincible) {
      player.x -= 50;
      player.animations.stop();
      player.animations.play("hitL");
      aGobo.frame = 6;
    } else if (player.body.touching.left && !player.invincible) {
      player.x += 50;
      player.animations.stop();
      player.animations.play("hitR");
      aGobo.frame = 9;
    }
    level1State.removehealth(3)
  },
  //gobo gets flung back and takes damage
  aGobowhack: function() {
    if (aGobo.health == 0) {
      aGobo.kill();
    } else if (aGobo.body.touching.right && player.invincible == true) {
      aGobo.x -= 70;
      aGobo.body.velocity.y = -200
      aGobo.health -= 1;
    } else if (aGobo.body.touching.left && player.invincible == true) {
      aGobo.x += 70;
      aGobo.body.velocity.y = -200
      aGobo.health -= 1;
    }
  },
  //shoot aGobo
  aGoboshot: function(aGobo, other) {
    if (aGobo.health == 0) {
      aGobo.kill();
    }
    other.kill();
    aGobo.health -= 1;
  },
  //go to boss
  boss: function() {
    game.state.start("level2boss");
  }
};
