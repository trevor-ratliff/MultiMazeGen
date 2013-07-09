MultiMazeGen
============

Maze generation tool using multiple maze algorithms in javascript.

Currently the only complete algorythm is a modified recursive backtracker.

There is a stub for a recursive division generator.


Usage
-----

create a new maze map object passing in a height and width of your maze
```javascript
var lobjMaze = new MazeMap(height, width);
```

Initialize the maze. Passing in an optional options object with 'Walls' and/or 'Algorythm' properties.
```javascript
lobjMaze.Init([{'Walls': [true | false], 'Algorythm': ['an implemented algorythm']}]);
```
Implemented Algorythms:
 - RecursiveBackTracker

Generate the maze.
```javascript
lobjMaze.Generate();
```

To use a WallMap helper object create a new WallMap passing in a string representing the maze (currently padded with \n on first and last lines)
```javascript
var lobjWalls = new WallMap(lobjMaze.Display());
```

Then you can check for walls by calling IsWall on the WallMap object
```javascript
if ( lobjWalls.IsWall([row],[column]) ) /* process wall */;
```
