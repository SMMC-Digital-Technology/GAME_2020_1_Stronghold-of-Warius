var level2bossState = {
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // set the size of the world
    game.world.setBounds(0, 0, 800, 600);
    game.add.image(0, 0, "castlebg");

    //declare direction variable
    direction = {
      facing: "right"
    };
    //boss direction
    bossdirection = {
      facing: "left"
    };
    //fire animation wether dragon plays right or left fire animation
    fireanim = 1;

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
    //create boss
    boss = game.add.sprite(700, 150, "dragon");
    game.physics.arcade.enable(boss);
    boss.body.gravity.y = 0;
    boss.body.collideWorldBounds = true;
    boss.health = 29;
    //animate boss
    boss.animations.add("left", [1, 2, 3, 4, 5, 0], 12, false);
    boss.animations.add("right", [6, 7, 8, 9, 10, 11], 12, false);
    boss.animations.add("fireL", [12, 12, 2], 8, false);
    boss.animations.add("fireR", [13, 13, 7], 8, false);
    boss.animations.add("crawlL", [16, 17], 8, false);
    boss.animations.add("crawlR", [18, 19], 8, false);
    boss.animations.add("cfireL", [20, 16], 8, false);
    boss.animations.add("cfireR", [21, 18], 8, false);
    boss.frame = 0;

    //group to collect platforms
    platforms = game.add.group();
    //enable physics on group
    platforms.enableBody = true;
    platforms.create(50, 450, "castleP");
    platforms.create(230, 516, "castleP");
    platforms.create(490, 516, "castleP");
    platforms.create(650, 450, "castleP");
    //immovable platforms
    platforms.setAll("body.immovable", true)

    splatform = game.add.sprite(650, 450, "castleP") //special platform that can't be destroyed by boss
    game.physics.arcade.enable(splatform);
    splatform.body.immovable = true;


    //group to collect spikes
    spikes = game.add.group();
    //immovable spikes
    spikes.setAll("body.immovable", true)
    //enable physics on group
    spikes.enableBody = true;
    //make the spikes

    //mana bottles
    mbottle = game.add.group();
    mbottle.enableBody = true;
    game.time.events.repeat(Phaser.Timer.SECOND * 20, 100, this.manaspawn, this);
    //add fire but kill it right after
    fire = game.add.sprite(0, 552, "fire");
    game.physics.arcade.enable(fire);
    fire.animations.add("blaze", [0, 1, 2], 8, true);
    fire.animations.play("blaze");
    fire.kill();

    // create keys
    cursors = game.input.keyboard.createCursorKeys();
    zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    xKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
    cKey = game.input.keyboard.addKey(Phaser.Keyboard.C);

    // focuses the player in the camera view and forces the camera to follow
    // the player, except if the view would go outside the game world
    game.camera.follow(player);

    //Set selected spell to 1
    game.global.spellSelected = 1;

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
    weapon.bulletKillDistance = 800;
    weapon.bulletSpeed = 500; //pixels per second
    weapon.fireRate = 250; //delay in milliseconds
    weapon.trackSprite(player, 40, 40, true);
    weapon.onFire.add(function() {
      level1State.removemana(1)
    });
    //add fire button
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.X);
    //boss weapon
    bossW = game.add.weapon(5, "fireball");
    bossW.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS; //destroyed when off-screen
    bossW.bulletKillType = Phaser.Weapon.KILL_DISTANCE; //destroyed after a given distance
    bossW.addBulletAnimation("fireball", [0, 1, 2], 8, true);
    bossW.autofire = false;
    bossW.bulletKillDistance = 500;
    bossW.bulletSpeed = 300; //pixels per second
    bossW.fireRate = 250; //delay in milliseconds
    bossW.trackSprite(boss, 40, 40, true);
    game.time.events.repeat(Phaser.Timer.SECOND * 5, 100, this.fire, this);
  },

  update: function() {
    //physics checks
    game.physics.arcade.overlap(player, mbottle, this.gainmana)
    game.physics.arcade.overlap(player, boss, this.hitboss);
    game.physics.arcade.overlap(weapon.bullets, boss, this.bossshot);
    game.physics.arcade.overlap(bossW.bullets, player, this.jenshot);
    game.physics.arcade.overlap(player, fire, this.hitboss);
    game.physics.arcade.overlap(boss, platforms, this.destroyplatform)
    //no floating through platforms
    hitPlatform = game.physics.arcade.collide(player, platforms);
    hitsPlatform = game.physics.arcade.collide(player, splatform);
    //move player
    this.movePlayer(direction);

    //make it possible to jump off platforms
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
      player.body.velocity.y = -850;
    }
    //jump on special platform
    if (cursors.up.isDown && player.body.touching.down && hitsPlatform) {
      player.body.velocity.y = -850;
    }

    //c to change spell
    if (cKey.isDown && game.time.now - game.global.timeCheck > 250) {
      this.changeSpell();
      game.global.timeCheck = game.time.now;
    }

    //x to change bullet direction and animation
    if (game.global.spellSelected == 1 && xKey.isDown && direction.facing == "left") {
      weapon.addBulletAnimation("wiggleL", [3], 0);
      weapon.bulletSpeed = -500;
      player.animations.play("leftBolt");
    } else if (game.global.spellSelected == 1 && xKey.isDown && direction.facing == "right") {
      weapon.addBulletAnimation("wiggleR", [0], 0); //one frame to reduce fps drop (so small hard to see anyway)
      player.animations.play("rightBolt");
      weapon.bulletSpeed = 500;
    }
    //x to shoot magebolt
    if (game.global.spellSelected == 1 && fireButton.isDown && game.global.mana > 0)
    {
        weapon.fire();
    }
    //x to heal if spell selected is 2
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
      game.time.events.add(600, () => {
        player.invincible = false});
    } else if (zKey.isDown && direction.facing == "right") {
      player.animations.play("rightSwing");
      player.invincible = true;
      game.time.events.add(600, () => {
        player.invincible = false});
    }

    if (boss.health == 19) {
      boss.x = 650;
      boss.y = 460;
      game.time.events.add(2000, () => {
        boss.frame = 12});
      game.time.events.add(2500, () => {
        fire.reset(0, 552);
        boss.y = 150;
        if (boss.health == 19) {
          boss.health -= 1;
        }
        });
    } else if (boss.health < 8) {
      fire.kill();
      if (fireanim == 1) {
        boss.frame = 14;
      } else if (fireanim == 0) {
        boss.frame = 15;
      }
      boss.body.velocity.y = 150;
      if (boss.body.collideWorldBounds) {
        var distance = player.x - boss.x;
        if (distance < 0 && distance > -800 && boss.x > 0) {
          boss.body.velocity.x = -80;
          fireanim = 3;
          if (!boss.animations.currentAnim.isPlaying) {
            boss.animations.play("crawlL");
            bossdirection.facing = "left";}
          } else if (distance > 0 && distance < 800 && boss.x < game.world.width) {
            boss.body.velocity.x = 80;
            fireanim = 4;
            if (!boss.animations.currentAnim.isPlaying)
            boss.animations.play("crawlR");
            bossdirection.facing = "right";
          } else {
            boss.body.velocity.x = 0;
          }
        }
    } else {
      var distance = player.x - boss.x;
      if (distance < 0 && distance > -800 && boss.x > 0) {
        boss.body.velocity.x = -110;
        fireanim = 1;
        if (!boss.animations.currentAnim.isPlaying) {
        boss.animations.play("left");
        bossdirection.facing = "left";}
      } else if (distance > 0 && distance < 800 && boss.x < game.world.width) {
        boss.body.velocity.x = 110;
        fireanim = 0;
        if (!boss.animations.currentAnim.isPlaying)
        boss.animations.play("right");
        bossdirection.facing = "right";
      } else {
        boss.body.velocity.x = 0;
      }
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

  hitboss: function() { //if touching boss take damage
    if (player.body.touching.right && !player.invincible) {
      player.x -= 30;
      player.animations.stop();
      player.animations.play("hitL");
    } else if (player.body.touching.left && !player.invincible) {
      player.x += 30;
      player.animations.stop();
      player.animations.play("hitR");
    }
    level2bossState.removehealth(1)
  },

  destroyplatform: function(boss, other) {
    other.kill()
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


  bossshot: function(boss, other) {
    if (boss.health == 0) {
      boss.kill();
      game.global.lvl1complete = "true";
      game.global.cyclespeech += 1;
      game.time.events.add(1000, () => {
        game.state.start("menu")});
    }
    other.kill();
    boss.health -= 1;
  },

  touchfire: function() { //if touching fire take damage
    player.body.velocity.y = -600;
    level2bossState.removehealth(1)
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
  },


  fire: function(bossdirection) {
    bossW.fireAtSprite(player);
    if (fireanim == 1) {
      boss.animations.play("fireL")
    } else if (fireanim == 0) {
      boss.animations.play("fireR")
    } else if (fireanim == 3) {
      boss.animations.play("cfireL")
    } else if (fireanim == 4) {
      boss.animations.play("cfireR")
    }
  },

  manaspawn: function() {
    mbottle.create(260, 480, "mbottle");
  },

  jenshot: function(player, other) {
    if (game.global.health == 0) {
      player.kill();
    }
    other.kill();
    level2bossState.removehealth(2)
  },
};
