var level2State = {
  create: function() {
    game.add.image(0, 0, "sky");

    // create a group to collect the platforms
    platforms = game.add.group();
    // enables physics on whole group
    platforms.enableBody = true;
    // add the ground
    ground = platforms.create(0, game.world.height - 64, "platform");
    // make it larger
    ground.scale.setTo(2, 2, );
    // make ledges
    platforms.create(200, 450, "platform");
    platforms.create(-100, 300, "platform");
    platforms.create(750, 225, "platform");
    platforms.create(200, 100, "platform");
    // make all platforms stationary during collisions
    platforms.setAll("body.immovable", true);

    // make the player
    player = game.add.sprite(32, game.world.height - 150, "player");
    // enable physics for the player
    game.physics.arcade.enable(player);
    // set physics properties
    player.body.gravity.y = 300;
    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;

    // animate the player
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //health bar
    healthBar = game.add.image(game.world.width - 20, 20, "healthbar");
    healthBar.anchor.setTo(1, 0);
    healthBar.width = game.global.lives / game.global.maxLives * 200;

    // create some stars
    stars = game.add.group();
    stars.enableBody = true;
    //create 12 stars
    for (let i = 0; i < 14; i++) {
      star = stars.create(i * 60, -22, "star");
      star.body.gravity.y = 6
      // random bounce factor
      star.body.bounce.y = 0.7 + Math.random() * 0.3;
    }

    diamonds = game.add.group();
    diamonds.enableBody = true;
    diamonds.create(760, 195, "diamond");
    diamonds.create(10, 270, "diamond");

    firstaids = game.add.group();
    firstaids.enableBody = true;
    firstaids.create(380, 65, "firstaid");

    baddie = game.add.sprite(600, 350, "baddie");
    game.physics.arcade.enable(baddie);
    baddie.body.gravity.y = 300;
    baddie.body.bounce.y = 0.2;
    baddie.body.collideWorldBounds = true;
    baddie.animations.add('left', [0, 1], 10, true);
    baddie.animations.add('right', [2, 3], 10, true);

    baddie2 = game.add.sprite(200, 150, "baddie");
    game.physics.arcade.enable(baddie2);
    baddie2.body.gravity.y = 300;
    baddie2.body.bounce.y = 0.2;
    baddie2.body.collideWorldBounds = true;
    baddie2.animations.add('left', [0, 1], 10, true);
    baddie2.animations.add('right', [2, 3], 10, true);

    baddie3 = game.add.sprite(50, 150, "baddie");
    game.physics.arcade.enable(baddie3);
    baddie3.body.gravity.y = 300;
    baddie3.body.bounce.y = 0.2;
    baddie3.body.collideWorldBounds = true;
    baddie3.animations.add('left', [0, 1], 10, true);
    baddie3.animations.add('right', [2, 3], 10, true);

    collectSound = game.add.audio("collect");

    // add a text block to the games
    scoreText = game.add.text(16, 16, "Score: " + game.global.score, {
      fontSize: '32px',
      fill: '#000'
    });

    //create the cursor keys
    cursors = game.input.keyboard.createCursorKeys();
  },

  update: function() {
    // physics Checks
    hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.overlap(player, stars, this.collectStar);
    game.physics.arcade.overlap(player, diamonds, this.collectDiamond);
    game.physics.arcade.collide(baddie, platforms);
    game.physics.arcade.collide(baddie2, platforms);
    game.physics.arcade.collide(baddie3, platforms);
    game.physics.arcade.overlap(player, firstaids, this.addLives)
    game.physics.arcade.overlap(player, baddie, this.hitBaddie)
    game.physics.arcade.overlap(player, baddie2, this.hitBaddie)
    game.physics.arcade.overlap(player, baddie3, this.hitBaddie)
    //move player
    if (cursors.left.isDown) {
      // move left with left animation
      player.body.velocity.x = -150;
      player.animations.play('left');
    } else if (cursors.right.isDown) {
      // move right with right animation
      player.body.velocity.x = 150;
      player.animations.play('right');
    } else {
      // stop and stop animations, show a single frame
      player.body.velocity.x = 0;
      player.animations.stop();
      player.frame = 4;
    }
    // jump is the up key is down and the player
    // is touching the top of a platform
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
      player.body.velocity.y = -350;
    }

    var distance = player.x - baddie.x;
    if (distance < 0 && distance > -100 && baddie.x > 0) {
      baddie.body.velocity.x = -150;
      baddie.animations.play('left');
    } else if (distance > 0 && distance < 100 && baddie.x < game.world.width) {
      baddie.body.velocity.x = 150;
      baddie.animations.play('right');
    } else {
      baddie.body.velocity.x = 0;
    }

    var distance = player.x - baddie2.x;
    if (distance < 0 && distance > -100 && baddie2.x > 0) {
      baddie2.body.velocity.x = -100;
      baddie2.animations.play('left');
    } else if (distance > 0 && distance < 100 && baddie2.x < game.world.width) {
      baddie2.body.velocity.x = 100;
      baddie2.animations.play('right');
    } else {
      baddie2.body.velocity.x = 0;
    }

    var distance = player.x - baddie3.x;
    if (distance < 0 && distance > -100 && baddie3.x > 0) {
      baddie3.body.velocity.x = -80;
      baddie3.animations.play('left');
    } else if (distance > 0 && distance < 100 && baddie3.x < 250) {
      baddie3.body.velocity.x = 80;
      baddie3.animations.play('right');
    } else {
      baddie3.body.velocity.x = 0;
    }

  },

  collectDiamond: function(player, diamond) {
    game.global.score += 100;
    scoreText.text = "Score: " + game.global.score;
    diamond.kill();
    collectSound.play();
  },

  collectStar: function(player, star) {
    // increase the score
    game.global.score += 10;
    // display the new score
    scoreText.text = "Score: " + game.global.score;
    // remove star
    star.kill();
    collectSound.play();
    if (stars.countLiving() == 0 && diamonds.countLiving() == 0) {
      //start the next level after a small delay
      game.time.events.add(1000, () => {
        game.state.start("menu")
      });
    }
  },

  removeLives: function(lives) {
    game.global.lives -= lives;
    if (game.global.lives <= 0) {
      game.state.start("gameover");
    } else {
      healthBar.width = game.global.lives / game.global.maxLives * 200;
    }
  },

  addLives: function() {
    firstaids.kill()
    //The code below has been changes from "lives" to "+1" because lives was undefined, changing it to +1 fixed a problem which would cause the health bar to chang3 locations
    //game.global.lives = Math.min(game.global.lives + lives, game.global.maxLives);
    game.global.lives = Math.min(game.global.lives + 1, game.global.maxLives);
    healthBar.width = game.global.lives / game.global.maxLives * 200;
  },

  hitBaddie: function(player, baddie) {
    if (player.body.touching.right) {
      player.x -= 32;
    } else if (player.body.touching.left) {
      player.x += 32;
    } else {
      player.body.velocity.y = -350;
    }
    level2State.removeLives(1);
  }
};
