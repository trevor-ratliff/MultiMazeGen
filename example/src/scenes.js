// Game scene
//-----------
// handles action of the game
Crafty.scene('Game', function() {

  // A 2D array to keep track of all occupied tiles
  this.occupied = new Array(Game.map_grid.width);
  for (var i = 0; i < Game.map_grid.width; i++) {
    this.occupied[i] = new Array(Game.map_grid.height);
    for (var y = 0; y < Game.map_grid.height; y++) {
      this.occupied[i][y] = false;
    }
  }
  
  //----
  // generate maze object
  //----
  var lobjMaze = new MazeMap(Math.floor((Game.map_grid.height-1)/2), 
    Math.floor((Game.map_grid.width-1)/2));
  //~ var lobjMaze = new MazeMap(Game.map_grid.height, Game.map_grid.width);
  
  lobjMaze.Init();
  lobjMaze.Generate();
  if (typeof console != "undefined") console.log(lobjMaze.DisplayString());
  
  //----
  // get wall map for maze
  //----
  var lobjWalls = new WallMap(lobjMaze.DisplayString());

  // Player character, placed at 1, 1 on our grid
  this.player = Crafty.e('PlayerCharacter').at(1, 1);
  this.occupied[this.player.at().x][this.player.at().y] = true;

  // Place a tree at every edge square on our grid of tiles
  for (var x = 0; x < Game.map_grid.width; x++) {
    for (var y = 0; y < Game.map_grid.height; y++) {
      if (lobjWalls.IsWall(y,x)) {
        // Place a bush entity at the current tile
        Crafty.e('Bush').at(x, y);
        this.occupied[x][y] = true;
      } else if (lobjWalls.IsBorder(y,x)) {
        // Place a tree entity at the current tile
        Crafty.e('Tree').at(x, y);
        this.occupied[x][y] = true;
      }
    }
  }

  // Generate up to max_treasures on the map in random locations
  var max_treasures = 5;
  while (Crafty('Treasure').length < max_treasures) {
    for (var x = 1; x < Game.map_grid.width-1; x++) {
      for (var y = 1; y < Game.map_grid.height-1; y++) {
        if (Math.random() < 0.01) {
          if (Crafty('Treasure').length < max_treasures && !this.occupied[x][y]) {
            Crafty.e('Treasure').at(x, y);
          }
        }
      }
    }
  }

  this.show_victory = this.bind('TreasureVisited', function() {
    if (!Crafty('Treasure').length) {
      Crafty.scene('Victory');
    }
  });
}, function() {
  this.unbind('TreasureVisited', this.show_victory);
});


// Victory scene
//--------------
// handles the game end actions
Crafty.scene('Victory', function() {
  var lstrHighScore = '';

  this.restart_game = function() {
    Crafty.scene('Game');
  };
  Crafty.bind('KeyDown', this.restart_game);
  
  //----
  // set time, score etc
  //----
  if (gdteTime != null) {
    var ldteTime = new Date();
    var lintTimeDiff = (ldteTime - gdteTime)/1000;
    
    //----
    // test for local storage
    //----
    if (typeof localStorage == 'object') {
      var lblnHasHighScore = false;
      var lintHighScore = 1000000;
      var lobjHighScore = document.getElementById('txtHighScore');
      var lobjCurrentScore = document.getElementById('txtCurrentScore');
      
      if (typeof localStorage.dvr_checker_high_score != 'undefined') {
        lintHighScore = parseInt(localStorage.dvr_checker_high_score);
        lblnHasHighScore = true
      }
      
      //----
      // check to see if this is the best time
      //----
      if (lintTimeDiff < lintHighScore) {
        localStorage.setItem('dvr_checker_high_score', lintTimeDiff);
        lstrHighScore = "You've achieved a new 'Fastest Time' of " + lintTimeDiff;
        lobjHighScore.innerHTML = lintTimeDiff;
      }
      
      //----
      // display 0 for current score
      //----
      lobjCurrentScore.innerHTML = '0';
    }
  }
  
  //----
  // display victory text
  //----
  Crafty.e('2D, DOM, Text')
    .attr({ x: Game.width()/2 - 96, 
      y: Game.height()/2 - 36, width: '325px'})
    .textFont({size: '40px', weight: 'bold'})
    .text('Victory!');
  
  //~ Crafty.e('2D, DOM, Text')
    //~ .attr({ x: Game.width()/2 - 96, 
      //~ y: Game.height()/2 + 25, width: '325px'})
    //~ .textFont({size: '20px', weight: 'bold'})
    //~ .text(lstrHighScore);
  
  Crafty.e('2D, DOM, Text, NewScore')
    .attr({ x: Game.width()/2 - 95, 
      y: Game.height()/2 + 26, width: '325px'})
    .textFont({size: '20px', weight: 'bold'})
    .text(lstrHighScore);
  
  //----
  // clear time
  //----
  gdteTime = null;
  
}, function() {
  this.unbind('KeyDown', this.restart_game);
});


// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){
  // Draw some text for the player to see in case the file
  //  takes a noticeable amount of time to load
  Crafty.e('2D, DOM, Text')
    .text('Loading...')
    .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
    .css($text_css);
  
  // Load our sprite map image
  // image retrieved from: http://opengameart.org/content/tiny-16-basic
  //    artist: Lanea Zimmerman
  Crafty.load(['assets/LaneaZimmerman/BasicTiles32x32a.png'/*, 'another_image'*/], function(){
    // Once the image is loaded...
 
    // Define the individual sprites in the image
    // Each one (spr_tree, etc.) becomes a component
    // These components' names are prefixed with "spr_"
    //  to remind us that they simply cause the entity
    //  to be drawn with a certain sprite
    Crafty.sprite(32, 'assets/LaneaZimmerman/BasicTiles32x32a.png', {
      spr_tree:    [6, 3],
      spr_bush:    [4, 2],
      spr_treasure: [4, 4],
      spr_player:  [0, 8]
    });
 
    // Now that our sprites are ready to draw, start the game
    Crafty.scene('Game');
  });  
});
