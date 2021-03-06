MultiMazeGen
============

Maze generation tool using multiple maze algorithms in javascript.

Currently the only complete algorithm is a modified recursive backtracker.

There is a stub for a recursive division generator.


Usage
-----

Create a new maze map object passing in a height and width of your maze.
if you use the WallMap helper object the resultant dimensions are 2x+1 of what you entered.
So a height of 20 would end up being 41 units tall in the WallMap object as corridors and walls have the same dimensions.
```javascript
var lintHeight = 20;
var lintWidth = 35;
var lobjMaze = new MazeMap(lintHeight, lintWidth);
```


Initialize the maze. Passing in an optional options object with 'Walls' and/or 'Algorithm' properties.
The Walls property specifies weather walls should default to up or down [true | false].
The Algorithm property indicates the type of algorithm to use in the maze generation.
```javascript
lobjMaze.Init({'Walls': true, 'Algorithm': 'RecursiveBackTracker'});
```
Implemented Algorithms:
 - RecursiveBackTracker (default)


Generate the maze.
```javascript
lobjMaze.Generate();
```


To use a WallMap helper object create a new WallMap passing in a string representing the maze (currently padded with \n on first and last lines)
```javascript
var lobjWalls = new WallMap(lobjMaze.DisplayString());
```


Then you can check for walls by calling IsWall on the WallMap object
```javascript
if ( lobjWalls.IsWall([row],[column]) ) /* process wall */;
```


Minimized With
--------------

```
java -jar c:\Programs\closure\compiler.jar .\MultiMazeGen.js > .\MultiMazeGen_min.js
```
