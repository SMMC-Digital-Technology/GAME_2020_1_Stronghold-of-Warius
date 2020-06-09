var winscreenState = {
   create: function() {
      // text
      game.stage.backgroundColor = "#290C4A";
      text = game.add.text(0, 0, "You defeated Warius", {
         fontSize: '48px',
         fill: '#fff',
         boundsAlignH: "center",
         boundsAlignV: "middle"
      });
      coffin = game.add.sprite(330, 100, "jcoffin");
      coffin.animations.add('dance', [0, 1, 2], 4, true);
   },

   update: function() {
     coffin.animations.play("dance")
   }
};
