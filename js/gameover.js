var gameoverState = {
   create: function() {
      // text
      game.stage.backgroundColor = "#290C4A";
      text = game.add.text(0, 0, "You have been defeated.", {
         fontSize: '48px',
         fill: '#fff',
         boundsAlignH: "center",
         boundsAlignV: "middle"
      });
      text.setTextBounds(0, 0, 800, 600);
      // button
      button = game.add.button(400, 500, 'button');
      button.anchor.setTo(0.5, 0.5);
      button.onInputUp.add(() => {
         game.state.start("menu")
      });
      text = game.add.text(button.x, button.y, 'Return to the Menu', {fill: "#ffffff"});
      text.anchor.setTo(0.5, 0.5);
      button.width = text.width + 10;
   }
};
