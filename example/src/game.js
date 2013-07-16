//====
/// @file game.js
/// @brief modifed from tutorial files from http://buildnewgames.com/introduction-to-crafty/
/// @author Trevor Ratliff
/// @date 2013-06-07
//
/// @verbatim
/// History:  Date  |  Programmer  |  Contact  |  Description  |
///     2013-06-07  |  Trevor Ratliff  |  trevor.w.ratliff@gmail.com  |  
///         file creation  |
/// @endverbatim
//====

Game = {
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
    // try loading the seedrandom library
    try {
      Math.seedrandom();
    } catch (ex) {
      // it's okay if this didn't work;
    }
    
    // Start crafty and set a background color so that we can see it's working
    Crafty.init(Game.width(), Game.height());
    Crafty.background('rgb(87, 109, 20)');
    Crafty.scene('Loading');
  }
}

$text_css = { 'font-size': '24px', 'font-family': 'verdana', 'color': 'white', 'text-align': 'center' };
