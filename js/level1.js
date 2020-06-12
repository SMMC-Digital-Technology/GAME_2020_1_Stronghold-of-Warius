var level1State = {
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // set the size of the world and add background
    game.world.setBounds(0, 0, 4800, 600);
    game.add.image(0, 0, "sewerbg");
    game.add.image(800, 0, "sewerbg");
    game.add.image(1600, 0, "sewerbg");
    game.add.image(2400, 0, "sewerbg");
    game.add.image(3200, 0, "sewerbg");
    game.add.image(4000, 0, "sewerbg");
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
    platforms.create(2340, 500, "sewerP");
    platforms.create(2840, 500, "sewerP");
    platforms.create(2590, 350, "sewerP");
    //immovable platforms
    platforms.setAll("body.immovable", true)
    //add help text
    game.add.text(50, 100, "Use the arrows to move", {font: '20px Arial', fill: '#ffffff'});
    game.add.text(50, 140, "Z = melee attack", {font: '20px Arial', fill: '#ffffff'});
    game.add.text(450, 90, "X = use current spell (spells use mana)", {font: '20px Arial', fill: '#ffffff'});
    game.add.text(340, 23, "< Health", {font: '18px Arial', fill: '#ffffff'});
    game.add.text(340, 50, "< Mana", {font: '20px Arial', fill: '#ffffff'});
    game.add.text(4400, 170, "'The Dark Mage is behind this door.", {font: '20px Arial', fill: '#ffffff'});
    game.add.text(4400, 210, "He has my heal spell, I need to defeat him", {font: '20px Arial', fill: '#ffffff'});
    game.add.text(4400, 250, "to get it back'", {font: '20px Arial', fill: '#ffffff'});

    //add door to get to the level1bossState
    door = game.add.group();
    door.enableBody = true;
    door.create(4700, 538, "door");

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
    spikes.create(1760, 590, "spikes");
    spikes.create(1800, 590, "spikes");
    spikes.create(2040, 590, "spikes");
    spikes.create(2080, 590, "spikes");
    spikes.create(2350, 590, "spikes");
    spikes.create(2390, 590, "spikes");
    spikes.create(2850, 590, "spikes");
    spikes.create(2890, 590, "spikes");
    spikes.create(3150, 590, "spikes");
    spikes.create(3190, 590, "spikes");
    spikes.create(3230, 590, "spikes");
    spikes.create(3650, 590, "spikes");
    spikes.create(3690, 590, "spikes");
    spikes.create(3730, 590, "spikes");

    //spawn slime1
    slime1 = game.add.sprite(400, 200, "slimeg");
    game.physics.arcade.enable(slime1);
    slime1.body.gravity.y = 2000;
    slime1.body.collideWorldBounds = true;
    slime1.body.setSize(20, 32, 0.5, 0.5);
    slime1.health = 1;
    slime1.animations.add('left', [0, 1, 2], 5, true);
    slime1.animations.add('right', [3, 4, 5], 5, true);
    //spawn slime2
    slime2 = game.add.sprite(1410, 200, "slimeg");
    game.physics.arcade.enable(slime2);
    slime2.body.gravity.y = 2000;
    slime2.body.collideWorldBounds = true;
    slime2.body.setSize(20, 32, 0.5, 0.5);
    slime2.health = 1;
    slime2.animations.add('left', [0, 1, 2], 5, true);
    slime2.animations.add('right', [3, 4, 5], 5, true);
    //spawn slime3
    slime3 = game.add.sprite(3500, 500, "slimeg");
    game.physics.arcade.enable(slime3);
    slime3.body.gravity.y = 2000;
    slime3.body.collideWorldBounds = true;
    slime3.body.setSize(20, 32, 0.5, 0.5);
    slime3.health = 1;
    slime3.animations.add('left', [0, 1, 2], 5, true);
    slime3.animations.add('right', [3, 4, 5], 5, true);

    //spawn big slime
    slimeB1 = game.add.sprite(2790, 500, "Bslime");
    game.physics.arcade.enable(slimeB1);
    slimeB1.body.gravity.y = 2000;
    slimeB1.body.collideWorldBounds = true;
    slimeB1.body.setSize(45, 64, 0.5, 0.5);
    slimeB1.health = 6;
    slimeB1.animations.add("left", [0, 1, 2, 3, 4], 3, true);
    slimeB1.animations.add("right", [5, 6, 7, 8, 9], 3, true);

    //spawn bat
    bat1 = game.add.sprite(2020, 400, "bat");
    game.physics.arcade.enable(bat1);
    bat1.body.collideWorldBounds = true;
    bat1.body.setSize(20, 32, 0.5, 0.5);
    bat1.animations.add('flyR', [0, 1, 2, 3], 8, true);
    bat1.animations.add('flyL', [4, 5, 6, 7], 8, true);
    bat1.frame = 8
    //spawn bat 2
    bat2 = game.add.sprite(3400, 400, "bat");
    game.physics.arcade.enable(bat2);
    bat2.body.collideWorldBounds = true;
    bat2.body.setSize(20, 32, 0.5, 0.5);
    bat2.animations.add('flyR', [0, 1, 2, 3], 8, true);
    bat2.animations.add('flyL', [4, 5, 6, 7], 8, true);
    bat2.frame = 8
    //spawn bat 3
    bat3 = game.add.sprite(3900, 400, "bat");
    game.physics.arcade.enable(bat3);
    bat3.body.collideWorldBounds = true;
    bat3.body.setSize(20, 32, 0.5, 0.5);
    bat3.animations.add('flyR', [0, 1, 2, 3], 8, true);
    bat3.animations.add('flyL', [4, 5, 6, 7], 8, true);
    bat3.frame = 8

    //mana bottles
    mbottle = game.add.group();
    mbottle.enableBody = true;
    mbottle.create(2800, 550, "mbottle");

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
    //creating fire button
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.X);

  },

  update: function(direction) {
    //physics checks
    game.physics.arcade.overlap(player, slime1, this.hitslime);
    game.physics.arcade.overlap(player, slime2, this.hitslime);
    game.physics.arcade.overlap(player, slime3, this.hitslime);
    game.physics.arcade.overlap(player, bat1, this.hitslime);
    game.physics.arcade.overlap(player, bat2, this.hitslime);
    game.physics.arcade.overlap(player, bat3, this.hitslime);
    game.physics.arcade.overlap(player, slimeB1, this.hitslime);
    game.physics.arcade.overlap(player, spikes, this.touchspike);
    game.physics.arcade.overlap(player, slime1, this.slimewhack);
    game.physics.arcade.overlap(player, slime2, this.slime2whack)
    game.physics.arcade.overlap(player, slime3, this.slime3whack);
    game.physics.arcade.overlap(player, slimeB1, this.slimeBwhack);
    game.physics.arcade.overlap(player, bat1, this.batwhack);
    game.physics.arcade.overlap(player, bat2, this.bat2whack);
    game.physics.arcade.overlap(player, bat3, this.bat3whack);
    game.physics.arcade.overlap(weapon.bullets, slime1, this.slimeshot);
    game.physics.arcade.overlap(weapon.bullets, slime2, this.slime2shot);
    game.physics.arcade.overlap(weapon.bullets, slime3, this.slime3shot);
    game.physics.arcade.overlap(weapon.bullets, slimeB1, this.slimeBshot);
    game.physics.arcade.overlap(weapon.bullets, bat1, this.batshot);
    game.physics.arcade.overlap(weapon.bullets, bat2, this.bat2shot);
    game.physics.arcade.overlap(weapon.bullets, bat3, this.bat3shot);
    game.physics.arcade.overlap(player, mbottle, this.gainmana)
    game.physics.arcade.collide(slime2, platforms);
    game.physics.arcade.overlap(player, door, this.boss);
    //no floating through platforms
    hitPlatform = game.physics.arcade.collide(player, platforms);
    //move player
    this.movePlayer(direction);

    //make it possible to jump off platforms
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
      player.body.velocity.y = -850;
    }

    //x to shoot change direction and animation
    if (xKey.isDown && direction.facing == "left") {
      weapon.addBulletAnimation("wiggleL", [3, 4, 5], 8, true);
      weapon.bulletSpeed = -500;
      player.animations.play("leftBolt");
    } else if (xKey.isDown && direction.facing == "right") {
      weapon.addBulletAnimation("wiggleR", [0, 1, 2], 8, true);
      player.animations.play("rightBolt");
      weapon.bulletSpeed = 500;
    }
    //x to shoot magebolt
    if (fireButton.isDown && game.global.mana > 0) {
      weapon.fire();
    }

    //z to swing stick(attack)
    if (zKey.isDown && direction.facing == "left") {
      player.animations.play("leftSwing");
      player.invincible = true;
      game.time.events.add(600, () => {
        player.invincible = false
      });
    } else if (zKey.isDown && direction.facing == "right") {
      player.animations.play("rightSwing");
      player.invincible = true;
      game.time.events.add(600, () => {
        player.invincible = false
      });
    }
    //slime 1 AI
    var distance = player.x - slime1.x;
    if (distance < 0 && distance > -300 && slime1.x > 0) {
      slime1.body.velocity.x = -110;
      slime1.animations.play("left");
    } else if (distance > 0 && distance < 300 && slime1.x < game.world.width) {
      slime1.body.velocity.x = 110;
      slime1.animations.play("right");
    } else {
      slime1.body.velocity.x = 0;
    }
    //slime 2 AI
    var distance = player.x - slime2.x;
    if (distance < 0 && distance > -300 && slime2.x > 0) {
      slime2.body.velocity.x = -110;
      slime2.animations.play("left");
    } else if (distance > 0 && distance < 300 && slime2.x < game.world.width) {
      slime2.body.velocity.x = 110;
      slime2.animations.play("right");
    } else {
      slime2.body.velocity.x = 0;
    }
    //slime 3 AI
    var distance = player.x - slime3.x;
    if (distance < 0 && distance > -300 && slime3.x > 0) {
      slime3.body.velocity.x = -110;
      slime3.animations.play("left");
    } else if (distance > 0 && distance < 300 && slime3.x < game.world.width) {
      slime3.body.velocity.x = 110;
      slime3.animations.play("right");
    } else {
      slime3.body.velocity.x = 0;
    }
    //big slime AI
    var distance = player.x - slimeB1.x;
    if (distance < 0 && distance > -300 && slimeB1.x > 0) {
      slimeB1.body.velocity.x = -50;
      slimeB1.animations.play("left");
    } else if (distance > 0 && distance < 300 && slimeB1.x < game.world.width) {
      slimeB1.body.velocity.x = 50;
      slimeB1.animations.play("right");
    } else {
      slimeB1.body.velocity.x = 0;
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
    //bat 2 AI
    var distance = player.x - bat2.x;
    if (distance < 0 && distance > -600 && bat2.x > 0) {
      bat2.body.velocity.x = -100;
      bat2.animations.play("flyL");
    } else if (distance > 0 && distance < 600 && bat2.x) {
      bat2.body.velocity.x = 100;
      bat2.animations.play("flyR");
    } else {
      bat2.body.velocity.x = 0;
    }
    var distance = player.y - bat2.y;
    if (distance < 0 && distance > -600 && bat2.x > 0) {
      bat2.body.velocity.y = -100;
    } else if (distance > 0 && distance < 600 && bat2.y) {
      bat2.body.velocity.y = 100;
    } else {
      bat2.body.velocity.y = 0;
    }
    //bat 3 AI
    var distance = player.x - bat3.x;
    if (distance < 0 && distance > -600 && bat3.x > 0) {
      bat3.body.velocity.x = -100;
      bat3.animations.play("flyL");
    } else if (distance > 0 && distance < 600 && bat3.x) {
      bat3.body.velocity.x = 100;
      bat3.animations.play("flyR");
    } else {
      bat3.body.velocity.x = 0;
    }
    var distance = player.y - bat3.y;
    if (distance < 0 && distance > -600 && bat3.x > 0) {
      bat3.body.velocity.y = -100;
    } else if (distance > 0 && distance < 600 && bat3.y) {
      bat3.body.velocity.y = 100;
    } else {
      bat3.body.velocity.y = 0;
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
  removehealth: function(lives) { //remove health unless invincible
    if (!player.invincible) {
      game.global.health -= lives;
    }
    if (game.global.health <= 0) {
      game.state.start("gameover");
    } else if (!player.invincible){
      healthBar.width = game.global.health / game.global.healthM * 300;
    }
  },
  //gain health and resize healthBar
  gainhealth: function() {
    game.global.health = game.global.healthM
    healthBar.width = game.global.health / game.global.healthM * 300;
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
    } else if (player.body.touching.down && !player.invincible) {
      player.body.velocity.y = -800;
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

  //slime gets flung back and takes damage
  slime2whack: function() {
    if (slime2.health == 0) {
      slime2.kill();
    } else if (slime2.body.touching.right && player.invincible == true) {
      slime2.x -= 70;
      slime2.body.velocity.y = -200
      slime2.health -= 1;
    } else if (slime2.body.touching.left && player.invincible == true) {
      slime2.x += 70;
      slime2.body.velocity.y = -200
      slime2.health -= 1;
    }
  },

  //slime gets flung back and takes damage
  slime3whack: function() {
    if (slime3.health == 0) {
      slime3.kill();
    } else if (slime3.body.touching.right && player.invincible == true) {
      slime3.x -= 70;
      slime3.body.velocity.y = -200
      slime3.health -= 1;
    } else if (slime3.body.touching.left && player.invincible == true) {
      slime3.x += 70;
      slime3.body.velocity.y = -200
      slime3.health -= 1;
    }
  },
  //big slime gets flung back and takes damage
  slimeBwhack: function() {
    if (slimeB1.health == 0) {
      slimeB1.kill();
    } else if (slimeB1.body.touching.right && player.invincible == true) {
      slimeB1.x -= 100;
      slimeB1.health -= 1;
    } else if (slimeB1.body.touching.left && player.invincible == true) {
      slimeB1.x += 70;
      slimeB1.health -= 1;
    }
  },

  //bat takes damage
  batwhack: function() {
    if (bat1.body.touching.right && player.invincible == true) {
      bat1.kill();
    } else if (bat1.body.touching.left && player.invincible == true) {
      bat1.kill();
    }
  },

  //bat2 takes damage
  bat2whack: function() {
    if (bat2.body.touching.right && player.invincible == true) {
      bat2.kill();
    } else if (bat2.body.touching.left && player.invincible == true) {
      bat2.kill();
    }
  },

  //bat3 takes damage
  bat3whack: function() {
    if (bat3.body.touching.right && player.invincible == true) {
      bat3.kill();
    } else if (bat3.body.touching.left && player.invincible == true) {
      bat3.kill();
    }
  },
  //shoot slime
  slimeshot: function(slime1, other) {
    if (slime1.health == 0) {
      slime1.kill();
    }
    other.kill();
    slime1.health -= 1;
  },
  //shoot slime
  slime2shot: function(slime2, other) {
    if (slime2.health == 0) {
      slime2.kill();
    }
    other.kill();
    slime2.health -= 1;
  },
  //shoot slime
  slime3shot: function(slime3, other) {
    if (slime3.health == 0) {
      slime3.kill();
    }
    other.kill();
    slime3.health -= 1;
  },
  //shoot bat
  batshot: function(bat, other) {
    bat1.kill();
  },
  //shoot bat
  bat2shot: function(bat, other) {
    bat2.kill();
  },
  //shoot bat
  bat3shot: function(bat, other) {
    bat3.kill();
  },
  //shoot big slime
  slimeBshot: function(slimeB1, other) {
    if (slimeB1.health == 0) {
      slimeB1.kill();
    }
    other.kill();
    slimeB1.health -= 1;
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
  //go to boss
  boss: function() {
    game.state.start("level1boss");
  }
};
