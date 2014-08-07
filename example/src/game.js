var Game = {
  // This defines our grid's size and the size of each of its tiles
  map_grid: {
    width:  33,   //24,
    height: 21,   //16,
    tile: {
      width:  32,   //16,
      height: 32    //16
    }
  },

  // The total width of the game screen. Since our grid takes up the entire screen
  //  this is just the width of a tile times the width of the grid
  width: function() {
    return this.map_grid.width * this.map_grid.tile.width;
  },

  // The total height of the game screen. Since our grid takes up the entire screen
  //  this is just the height of a tile times the height of the grid
  height: function() {
    return this.map_grid.height * this.map_grid.tile.height;
  },

  // Initialize and start our game
  start: function() {
    try {
      var lobjNoGo = document.getElementById('no-go');
      
      Math.seedrandom();
      
      //----
      // remove the no-go element
      //----
      lobjNoGo.parentElement.removeChild(lobjNoGo);
      
      //----
      // display high score
      //----
      var lobjHighScore = document.getElementById('txtHighScore');
      if (typeof localStorage != 'undefined') {
        lobjHighScore.innerHTML = localStorage.dvr_checker_high_score;
      }
      
      //----
      // display 0 for current score
      //----
      var lobjCurrentScore = document.getElementById('txtCurrentScore');
      lobjCurrentScore.innerHTML = '0';
      
      //----
      // bind time update to games 'RenderScene' event
      //----
      Crafty.bind('RenderScene', UpdateTime);
      
      // Start crafty and set a background color so that we can see it's working
      Crafty.init(Game.width(), Game.height());
      //Crafty.background('rgb(249, 223, 125)');
      //Crafty.scene('Game');   // startup scene
      Crafty.background('rgb(87, 109, 20)');
      Crafty.scene('Loading');
      
    } catch (ex) {
      console&&console.log('something went wrong: ' + ex.toString());
    }
  }
};

$text_css = { 'font-size': '24px', 'font-family': 'verdana', 'color': 'white', 'text-align': 'center' };
var gdteTime = null;

function UpdateTime() {
  //----
  // set time, score etc
  //----
  if (gdteTime != null) {
    var ldteTime = new Date();
    var lintTimeDiff = (ldteTime - gdteTime)/1000;
    document.getElementById('txtCurrentScore').innerHTML = lintTimeDiff;
  }
}
