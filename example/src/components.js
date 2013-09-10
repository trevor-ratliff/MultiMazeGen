// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    })
  },

  // Locate this entity at the given position on the grid
  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    } else {
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      return this;
    }
  }
});

// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas, Grid');
  },
});

// A Tree is just an Actor with a certain color
Crafty.c('Tree', {
  init: function() {
    this.requires('Actor, Solid, spr_tree');
  },
});

// A Bush is just an Actor with a certain color
Crafty.c('Bush', {
  init: function() {
    this.requires('Actor, Solid, spr_bush');
  },
});

// This is the player-controlled character
Crafty.c('PlayerCharacter', {
  init: function() {
    this.requires('Actor, Fourway, Collision, spr_player, SpriteAnimation')
      .fourway(4)
      .stopOnSolids()

      // Whenever the PC touches a village, respond to the event
      .onHit('Treasure', this.visitTreasure)

      // player animations
      .animate('PlayerMovingUp',    4, 8, 5)
      .animate('PlayerMovingRight', 2, 8, 3)
      .animate('PlayerMovingDown',  0, 8, 1)
      .animate('PlayerMovingLeft',  6, 8, 7);
    
    // switch animations with direction
    var animation_speed = 8;
    this.bind('NewDirection', function(data) {
      if (data.x > 0) {
        this.animate('PlayerMovingRight', animation_speed, -1);
      } else if (data.x < 0) {
        this.animate('PlayerMovingLeft', animation_speed, -1);
      } else if (data.y > 0) {
        this.animate('PlayerMovingDown', animation_speed, -1);
      } else if (data.y < 0) {
        this.animate('PlayerMovingUp', animation_speed, -1);
      } else {
        this.stop();
      }
    });
  },

  // Registers a stop-movement function to be called when
  //  this entity hits an entity with the "Solid" component
  stopOnSolids: function() {
    this.onHit('Solid', this.stopMovement);
 
    return this;
  },

  // Stops the movement
  //~ stopMovement: function() {
    //~ this._speed = 0;
    //~ if (this._movement) {
      //~ this.x -= this._movement.x;
      //~ this.y -= this._movement.y;
    //~ }
  //~ },
  stopMovement: function () {
    if (this._movement) {
      this.x -= this._movement.x;
      
      if (this.hit('Solid') != false) {
        this.x += this._movement.x;
        this.y -= this._movement.y;
        
        if (this.hit('Solid') != false) {
          this.x -= this._movement.x;
          this.y -= this._movement.y;
        }
      }
    } else {
      this._speed = 0;
    }
  },

  // Respond to this player visiting a village
  visitTreasure: function(data) {
    villlage = data[0].obj;
    villlage.collect();
  }
});

// A village is a tile on the grid that the PC must visit in order to win the game
Crafty.c('Treasure', {
  init: function() {
    this.requires('Actor, spr_treasure');
  },

  collect: function() {
    this.destroy();
    Crafty.trigger('TreasureVisited', this);
  }
});
