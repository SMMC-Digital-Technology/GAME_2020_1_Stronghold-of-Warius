var level1State = {
   create: function() {
     game.add.image(0, 0, "sky");

     // create a group to collect the platforms
     platforms = game.add.group();
     // enables physics on whole group
     platforms.enableBody = true;
     // add the ground
     ground = platforms.create(0, game.world.height - 64, "platform");
     // make it larger
     ground.scale.setTo(2, 2,);
     // make ledges
     platforms.create(400, 400, "platform");
     platforms.create(-150, 250, "platform");
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
     for (let i = 0; i < 12; i++) {
       star = stars.create(i * 70, -22, "star");
       star.body.gravity.y = 6
       // random bounce factor
       star.body.bounce.y = 0.7 + Math.random() * 0.3;
     }


     baddie = game.add.sprite(600, 350, "baddie");
     game.physics.arcade.enable(baddie);
     baddie.body.gravity.y = 300;
     baddie.body.bounce.y = 0.2;
     baddie.body.collideWorldBounds = true;
     baddie.animations.add('left', [0, 1], 10, true);
     baddie.animations.add('right', [2, 3], 10, true);
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
      game.physics.arcade.overlap(player, stars, this.collectStar)
      game.physics.arcade.collide(baddie, platforms);
      game.physics.arcade.overlap(player, baddie, this.hitBaddie)
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
    if (distance < 0 && distance > -100 && baddie.x > 400) {
      baddie.body.velocity.x = -100;
      baddie.animations.play('left');
    } else if (distance > 0 && distance < 100 && baddie.x < game.world.width) {
      baddie.body.velocity.x = 100;
      baddie.animations.play('right');
    } else {
      baddie.body.velocity.x = 0;
    }
  },

    collectStar: function(player, star) {
      // increase the score
      game.global.score += 10;
      // display the new score
      scoreText.text = "Score: " + game.global.score;
      // remove star
      star.kill();
      collectSound.play();
      if (stars.countLiving() == 0  ) {
        //start the next level after a small delay
        game.time.events.add(1000, () => {
          game.state.start("level2")
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

    addLives: function(lives) {
      game.global.lives = Math.min(game.global.lives + lives, game.global.maxLives);
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
      level1State.removeLives(1);
    }
};
