var levelState = {
   create: function() {

      //Environment
      game.add.sprite(0, 0, 'bg');
      ground = game.add.sprite(0, game.world.height, 'ground');
      ground.y -= ground.height;
      // Background Music
      bgm = game.add.audio('bgm')
      bgm.play()

      //Meteors
      meteors = game.add.group();
      meteors.enableBody = true;

      //Tower
      tower = game.add.sprite(game.world.centerX, game.world.height - 100, 'tower');
      tower.anchor.x = 0.5;
      tower.scale.setTo(0.5);
      game.physics.enable(tower, Phaser.Physics.ARCADE);

      //Weapon
      weapon = game.add.weapon(10, 'missile');
      weapon.addBulletAnimation('shoot', [1, 2, 3, 4], 10, true);
      weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS; //destroyed when off-screen
      weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE; //destroyed after a given distance
      weapon.bulletSpeed = 200; //pixels per second
      weapon.fireRate = 500; //delay in milliseconds
      weapon.trackSprite(tower);

      //Cities & Lives
      lives = game.add.group();
      lives.enableBody = true;
      for (i = 0; i < 2; i++) {
         for (j = 0; j < 3; j++) {
            c = lives.create(70 + (i * 400) + (j * 100), game.height - 90, 'city');
            c.frame = game.rnd.integerInRange(0, 2); //Which city image to use
            c.scale.setTo(0.5);
         }
      }

      //Display
      scoreText = game.add.text(game.world.centerX - 200, 32, 'Score: ' + game.global.score, {
         fontSize: '32px',
         fill: '#ff0000'
      });
      scoreText.anchor.setTo(0.5);
      waveText = game.add.text(game.world.centerX + 200, 32, 'Wave: ' + game.global.wave, {
         fontSize: '32px',
         fill: '#ff0000'
      });
      waveText.anchor.setTo(0.5);
      livesText = game.add.text(game.world.centerX, 32, 'Lives: ' + lives.total, {
         fontSize: '32px',
         fill: '#ff0000'
      });
      livesText.anchor.setTo(0.5);
      // Sounds
      pointSound = game.add.audio('point');
      winSound = game.add.audio('win');
      lossSound = game.add.audio('loss');
      shootSound = game.add.audio('shoot');
      loseLifeSound = game.add.audio('loseLife');

      this.SpawnWave(); //Spawn the first wave
   },

   update: function() {
      //Collision detection
      game.physics.arcade.overlap(lives, weapon.bullets, this.CityStruck, null, this);
      game.physics.arcade.overlap(lives, meteors, this.CityStruck, null, this);
      game.physics.arcade.overlap(meteors, weapon.bullets, this.MeteorStruck, null, this);
      game.physics.arcade.overlap(meteors, ground, this.MeteorStruck, null, this);

      //Is the player firing a missile?
      if (game.input.activePointer.leftButton.isDown && tower.alive) {
         weapon.fireAtPointer();
         shootSound.play();
         weapon.bulletKillDistance = game.physics.arcade.distanceToPointer(tower); //Bullets are destroyed at the mouse location
      }

      //Remove any meteors that have fallen out of the bottom of the world
      meteors.forEach(function(meteor) {
         if (meteor.y > (game.world.height - 90)) {
            meteors.remove(meteor);
         }
      }, this);

      //If there are no meteors left, spawn a new wave
      if (meteors.total < 1) {
         this.SpawnWave();
         winSound.play();
      }

   },

   //Spawns a new wave of meteors (gets bigger over time)
   SpawnWave: function() {
      game.global.wave++;
      for (i = 0; i < (game.global.wave * 0.5) + 5; i++) {
         randX = game.rnd.integerInRange(0, game.width); //Spawn at a random X-coordinate
         meteor = meteors.create(randX, -64, 'meteor');
         targetX = game.rnd.integerInRange(0, game.width); //Head towards a random X-coordinate
         game.physics.arcade.moveToXY(meteor, targetX, game.world.height); //Move towards target
         meteor.body.gravity.y = game.rnd.integerInRange(6, 15);
         meteor.body.setCircle(meteor.scale);
         meteor.frame = game.rnd.integerInRange(0, 3); //Which meteor image to use
      }
      waveText.text = 'Wave: ' + game.global.wave;
   },

   //Gain a live (and create a new city)
   GainLive: function() {
      c = lives.create(game.rnd.integerInRange(70, game.world.width - 70), game.height - 90, 'city');
      c.frame = game.rnd.integerInRange(0, 2);
      c.scale.setTo(0.5);
      livesText.text = 'Lives: ' + lives.total;
   },

   //If a city is struck
   CityStruck: function(city, other) {
      other.kill();
      deadCity = game.add.image(city.x, city.y + 32, "city");
      deadCity.frame = city.frame + 3;
      deadCity.anchor.setTo(0, 1);
      deadCity.scale.setTo(0.5);
      loseLifeSound.play()
      tween = game.add.tween(deadCity).to({
         height: 0
      }, game.rnd.integerInRange(4000, 6000), Phaser.Easing.Linear.None, true);
      tween.onComplete.addOnce(() => {
         deadCity.kill()
      });
      lives.remove(city);
      livesText.text = 'Lives: ' + lives.total;
      if (lives.total < 1) { //If the last city is destroyed
         this.Lose();
      }
   },

   //If a meteor is struck
   MeteorStruck(meteor, other) {
      explosion = game.add.image(meteor.x, meteor.y, "explosion");
      tween = game.add.tween(explosion).to({
         height: 0
      }, game.rnd.integerInRange(500, 2000), Phaser.Easing.Linear.None, true);
      tween.onComplete.addOnce(() => {
         explosion.kill()
      });
      meteors.remove(meteor);
      other.kill();
      pointSound.play();
      game.global.score += 10;
      scoreText.text = 'Score: ' + game.global.score;
      if (game.global.score % 100 == 0) { //Gain a life every 100 points
         this.GainLive();
      }
   },

   //When the play loses
   Lose: function() {
      game.state.start('gameover');
   },

};
