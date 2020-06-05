    var level4State = {
      create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // set the size of the world
        game.world.setBounds(0, 0, 800, 600);
        game.add.image(0, 0, "castlebg");

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

        boss = game.add.sprite(708, 550, "warius");
        game.physics.arcade.enable(boss);
        boss.body.gravity.y = 2000;
        boss.body.collideWorldBounds = true;
        boss.health = 100;
        boss.animations.add("idle", [0, 1, 2, 3], 12, true);
        boss.animations.add("staff", [7, 8, 9, 10, 11], 13, false);
        boss.animations.add("chair", [4, 5, 6], 9, false);
        game.time.events.repeat(Phaser.Timer.SECOND * 5, 100, this.fire, this);
        game.time.events.repeat(Phaser.Timer.SECOND * 15, 100, this.raisedead, this);

        //spawn undead
        zgoblin = game.add.sprite(400, 200, "zgoblin");
        game.physics.arcade.enable(zgoblin);
        zgoblin.body.gravity.y = 2000;
        zgoblin.body.collideWorldBounds = true;
        zgoblin.health = 7;
        zgoblin.animations.add('left', [0, 1, 2, 3, 4], 6, true);
        zgoblin.animations.add('right', [6, 7, 8, 9, 10], 6, true);

        //group to collect platforms
        platforms = game.add.group();
        //enable physics on group
        platforms.enableBody = true;
        //immovable platforms
        platforms.setAll("body.immovable", true)


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
        mbottle.create(90, 200, "mbottle");
        mbottle.create(710, 200, "mbottle");

        // create keys
        cursors = game.input.keyboard.createCursorKeys();
        zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        xKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
        cKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
        //declare direction variable
        direction = {
          facing: "right"
        };
        //boss direction
        bossdirection = {
          facing: "left"
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
        weapon.bulletKillDistance = 700;
        weapon.bulletSpeed = 400; //pixels per second
        weapon.fireRate = 250; //delay in milliseconds
        weapon.trackSprite(player, 40, 40, true);
        weapon.onFire.add(function() {
          level1State.removemana(1)
        });

        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.X);

        bossW = game.add.weapon(5, "lazer");
        bossW.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS; //destroyed when off-screen
        bossW.bulletKillType = Phaser.Weapon.KILL_DISTANCE; //destroyed after a given distance
        //would be animated but the fps dropped a lot when they were animated (not animated for performance)
        bossW.autofire = false;
        bossW.bulletKillDistance = 800;
        bossW.bulletSpeed = 300; //pixels per second
        bossW.fireRate = 1000; //delay in milliseconds
        bossW.trackSprite(boss, 50, 70, true);
      },

      update: function() {
        //physics checks
        game.physics.arcade.overlap(player, zgoblin, this.hitboss);
        game.physics.arcade.overlap(player, zgoblin, this.zgoblinwhack);
        game.physics.arcade.overlap(player, spikes, this.touchspike);
        game.physics.arcade.overlap(player, mbottle, this.gainmana)
        game.physics.arcade.overlap(player, boss, this.hitboss);
        game.physics.arcade.overlap(player, boss, this.bosswhack);
        game.physics.arcade.overlap(weapon.bullets, boss, this.bossshot);
        game.physics.arcade.overlap(bossW.bullets, player, this.jenshot);
        game.physics.arcade.overlap(weapon.bullets, zgoblin, this.zgoblinshot);
        //no floating through platforms
        hitPlatform = game.physics.arcade.collide(player, platforms);

        this.movePlayer(direction);

        //heal the player
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

        //zgoblin AI
        var distance = player.x - zgoblin.x;
        if (distance < 0 && distance > -300 && zgoblin.x > 0) {
          zgoblin.body.velocity.x = -80;
          zgoblin.animations.play("left");
        } else if (distance > 0 && distance < 300 && zgoblin.x < game.world.width) {
          zgoblin.body.velocity.x = 80;
          zgoblin.animations.play("right");
        } else {
          zgoblin.body.velocity.x = 0;
        }


        //make it possible to jump off platforms
        if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
          player.body.velocity.y = -850;
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

        //c to change spell
        if (cKey.isDown && game.time.now - game.global.timeCheck > 250) {
          this.changeSpell();
          game.global.timeCheck = game.time.now;
        }

        var distance = player.y - boss.y;
        if (distance < 0 && distance > -800 && boss.x > 0) {
          boss.body.velocity.y = -110;
          if (!boss.animations.currentAnim.isPlaying) {
          boss.animations.play("idle");
          bossdirection.facing = "idle";}
        } else if (distance > 0 && distance < 800 && boss.y < game.world.width) {
          boss.body.velocity.y = 110;
          if (!boss.animations.currentAnim.isPlaying)
          boss.animations.play("idle");
          bossdirection.facing = "idle";
        } else {
          boss.body.velocity.x = 0;
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
        level1bossState.removehealth(1)
      },

      bosswhack: function() {
        if (boss.health == 0) {
          boss.kill();
        } else if (boss.body.touching.right && player.invincible == true) {
          boss.x -= 200;
          boss.body.velocity.y = -200
          boss.health -= 1;
        } else if (boss.body.touching.left && player.invincible == true) {
          boss.x += 200;
          boss.body.velocity.y = -200
          boss.health -= 1;
        }
      },

      bossshot: function(boss, other) {
        if (boss.health == 0) {
          boss.kill();
        }
        other.kill();
        boss.health -= 1;
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
        level1bossState.removehealth(1)
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

      fire: function() {
        if (boss.alive == true) {
          boss.animations.play("staff")
          bossW.fireAtSprite(player);
        }
      },

      raisedead: function() {
        if (zgoblin.alive == false) {
          if (boss.alive == true) {
            boss.animations.play("staff")
            zgoblin.reset(300, 300)}
            zgoblin.health = 7;
          }
      },

      jenshot: function(player, other) {
        if (game.global.health == 0) {
          player.kill();
        }
        other.kill();
        level1bossState.removehealth(2)
      },
      //zgoblin gets flung back and takes damage
      zgoblinwhack: function() {
        if (zgoblin.health == 0) {
          mbottle.create(zgoblin.x, zgoblin.y, "mbottle");
          zgoblin.kill();
        } else if (zgoblin.body.touching.right && player.invincible == true) {
          zgoblin.x -= 70;
          zgoblin.body.velocity.y = -200
          zgoblin.health -= 1;
        } else if (zgoblin.body.touching.left && player.invincible == true) {
          zgoblin.x += 70;
          zgoblin.body.velocity.y = -200
          zgoblin.health -= 1;
        }
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

      zgoblinshot: function(zgoblin, other) {
        if (zgoblin.health == 0) {
          mbottle.create(zgoblin.x, zgoblin.y, "mbottle");
          zgoblin.kill();
        }
        other.kill();
        zgoblin.health -= 1;
      },

};
