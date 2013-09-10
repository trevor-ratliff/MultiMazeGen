//====
/// @file MultiMazeGen.js
/// @brief holds classes for generating various types of mazes
/// @author Trevor Ratliff
/// @date 2013-06-12
//
/// @verbatim
/// History:  Date  |  Programmer  |  Contact  |  Description  |
///     2013-06-12  |  Trevor Ratliff  |  trevor.w.ratliff@gmail.com  |  
///         file creation  |
///     2013-09-10  |  Trevor Ratliff  |  trevor.w.ratliff@gmail.com  |
///         added error trapping  |
/// @endverbatim
//====


//====
/// @class BitMapping
/// @brief The mapping of bits to maze cell properties
/// @author Trevor Ratliff
/// @date 2013-06-12
//
//  Properties:
//      bool N -- North bit for this property
//      bool E -- East bit for this property
//      bool W -- west bit for this property
//      bool S -- South bit for this property
//
//  Methods:
//      Swap() -- flips the bit of the passed in direction
//      toString() -- outputs a string representation of this object
//
/// @verbatim
/// History:  Date  |  Programmer  |  Contact  |  Description  |
///     2013-06-12  |  Trevor Ratliff  |  trevor.w.ratliff@gmail.com  |  
///         class creation  |
/// @endverbatim
//====
function BitMapping () {
    //----
    // check for passed in arguments
    //----
    if (arguments.length > 0) {
        this.N = true;
        this.E = true;
        this.W = true;
        this.S = true;
    } else {
        this.N = false;
        this.E = false;
        this.W = false;
        this.S = false;
    }
    
    
    //====
    /// @fn Swap(vstrDirection)
    /// @brief swaps the bit of the passed in direction
    /// @author Trevor Ratliff
    /// @date 2013-06-14
    /// @param string vstrDirection -- direction property to swap
    //  
    //  Definitions:
    //  
    /// @verbatim
    /// History:  Date  |  Programmer  |  Contact  |  Description  |
    ///     2013-06-14  |  Trevor Ratliff  |  trevor.w.ratliff@gmail.com  |  
    ///         function creation  |
    /// @endverbatim
    //====
    this.Swap = function (vstrDirection) {
        try {
            switch (vstrDirection) {
                case 'N':
                case 'n':
                    this.N = this.N == true ? false : true;
                    break;
                case 'E':
                case 'e':
                    this.E = this.E == true ? false : true;
                    break;
                case 'W':
                case 'w':
                    this.W = this.W == true ? false : true;
                    break;
                case 'S':
                case 's':
                    this.S = this.S == true ? false : true;
                    break;
            }
        } catch (err) {
            if (typeof console != "undefined") console.log(err.toString());
        }
    };
    
    
    //====
    /// @fn toString()
    /// @brief returns a string representing the BitMapping
    /// @author Trevor Ratliff
    /// @date 2013-06-12
    /// @return string
    //  
    //  Definitions:
    //  
    /// @verbatim
    /// History:  Date  |  Programmer  |  Contact  |  Description  |
    ///     2013-06-12  |  Trevor Ratliff  |  trevor.w.ratliff@gmail.com  |  
    ///         function creation  |
    /// @endverbatim
    //====
    this.toString = function () {
        var lstrReturn = "";
        
        try {
            //----
            // add data
            //----
            lstrReturn += "[N:" + (this.N == true ? 1 : 0) + ", " +
                "E:" + (this.E == true ? 1 : 0) + ", " +
                "W:" + (this.W == true ? 1 : 0) + ", " +
                "S:" + (this.S == true ? 1 : 0) + "]";
            
        } catch (err) {
            if (typeof console != "undefined") console.log(err.toString());
        }
        
        return lstrReturn;
    };
}


//====
/// @class MazeCell
/// @brief An object to represent a cell in a maze (one unit of maze path)
/// @author Trevor Ratliff
/// @date 2013-06-12
//
//  Properties:
//      int _x -- width origin for this cell
//      int _y -- height origin for this cell
//      int Visited -- a count of the times this cell has been visited
//      BitMapping BackTrack -- stores data about backtracks during 
//          maze generation
//      BitMapping Solution -- stores data about the maze solution
//      BitMapping Borders -- stores data about maze borders
//      BitMapping Walls -- stores data about maze walls
//
/// @verbatim
/// History:  Date  |  Programmer  |  Contact  |  Description  |
///     _  |  Trevor Ratliff  |  trevor.w.ratliff@gmail.com  |  
///         class creation  |
/// @endverbatim
//====
function MazeCell (vintRow, vintColumn) {
    this._column = vintColumn;
    this._row = vintRow;
    this.Visited = 0;
    
    this.BackTrack = new BitMapping();
    this.Solution = new BitMapping();
    this.Borders = new BitMapping();
    
    //----
    // test for a third parameter
    //----
    if (arguments.length > 2) {
        this.Walls = new BitMapping(true);
    } else {
        this.Walls = new BitMapping();
    }
    
    
    //====
    /// @fn toString()
    /// @brief returns a string representing this object
    /// @author Trevor Ratliff
    /// @date 2013-06-13
    /// @return string -- holding the object representation
    //  
    //  Definitions:
    //      lstrReturn -- string holding the object representation
    //  
    /// @verbatim
    /// History:  Date  |  Programmer  |  Contact  |  Description  |
    ///     2013-06-13  |  Trevor Ratliff  |  trevor.w.ratliff@gmail.com  |  
    ///         function creation  |
    /// @endverbatim
    //====
    this.toString = function () {
        var lstrReturn = "";
        
        try {
            //----
            // add coordinates
            //----
            lstrReturn += "row: " + this._row + ", column: " + this._column + "\n";
            
            //----
            // add borders
            //----
            lstrReturn += "Borders:   " + this.Borders.toString() + "\n";
            
            //----
            // add walls
            //----
            lstrReturn += "Walls:     " + this.Walls.toString() + "\n";
            
            //----
            // add solution
            //----
            lstrReturn += "Solution:  " + this.Solution.toString() + "\n";
            
            //----
            // add backtrack
            //----
            lstrReturn += "BackTrack: " + this.BackTrack.toString();
            
        } catch (err) {
            if (typeof console != "undefined") console.log(err.toString());
        }
        
        //----
        // return lstrReturn
        //----
        return lstrReturn;
    };
}


//====
/// @class WallMap
/// @brief holds the generated map string in an array to query walls
/// @author Trevor Ratliff
/// @date 2013-06-17
//
//  Properties:
//      _map -- original string that was passed in
//      _arrWalls -- _map split on \r\n
//
//  Methods:
//      IsWall() -- returns true if requested space is a wall/boundry
//
/// @verbatim
/// History:  Date  |  Programmer  |  Contact  |  Description  |
///     2013-06-17  |  Trevor Ratliff  |  trevor.w.ratliff@gmail.com  |  
///         class creation  |
/// @endverbatim
//====
function WallMap (vstrMaze) {
    this._map = vstrMaze;
    this._arrWalls = this._map.substr(1).split("\n");
    //----
    // remove first blank line and last blank line
    //----
    this._arrWalls.pop();
    
    this.IsWall = function (vintRow, vintColumn) {
        try {
            var lblnReturn = false;
            var lstrChar = typeof this._arrWalls[vintRow] != "undefined" ? 
                this._arrWalls[vintRow].substr(vintColumn, 1) : "";
            
            if (lstrChar == "#") {
                lblnReturn = true;
            }
        } catch (err) {
            if (typeof console != "undefined") console.log(err.toString());
        }
        
        return lblnReturn;
    };
    
    this.IsBorder = function (vintRow, vintColumn) {
        try {
            var lblnReturn = false;
            var lstrChar = typeof this._arrWalls[vintRow] != "undefined" ? 
                this._arrWalls[vintRow].substr(vintColumn, 1) : "";
            
            if (lstrChar == "@") {
                lblnReturn = true;
            }
        } catch (err) {
            if (typeof console != "undefined") console.log(err.toString());
        }
        
        return lblnReturn;
    };
}


//====
/// @class MazeMap
/// @brief Map data for a maze
/// @author Trevor Ratliff
/// @date 2013-06-12
//
//  Properties:
//      int Width -- maze width in path units (walls not counted)
//      int Height -- maze height in path units (walls not counted)
//      int TotalCells -- width * height - 1
//      int VisitedCells -- count of visited cells
//      string MazeString -- holds a string representation of the maze it 
//          gets set with Display()
//      array CellCoords -- array of available cell coordinates [row, column]
//      array Map -- array of arrays with row being first order and column 
//          being second
//      array Stack -- a FILO stack of visited cell coordinates [row, column]
//
//  Methods:
//      Init() -- Initializes the maze map
//      Display() -- generates a string to represent the maze
//
/// @verbatim
/// History:  Date  |  Programmer  |  Contact  |  Description  |
///     2013-06-12  |  Trevor Ratliff  |  trevor.w.ratliff@gmail.com  |  
///         class creation  |
/// @endverbatim
//====
function MazeMap (vintRows, vintColumns) {
    this.Columns = typeof vintColumns !== 'number' ? 10 : Math.floor(vintColumns);  //Math.floor((vintColumns - 1)/2);
    this.Rows = typeof vintRows !== 'number' ? 5 : Math.floor(vintRows);    //Math.floor((vintRows-1)/2);
    this.TotalCells = this.Columns * this.Rows;     //vintColumns * vintRows;   //(vintColumns + 1) * (vintRows + 1);
    this.VisitedCells = 0;
    this.BackTrackPercent = arguments.length > 2 ? 
        typeof arguments[2] !== 'number' ? arguments[2] : 0.65 : 0.65;
    
    this.MazeString = "";
    this.Algorithm = "";
    
    this.CellCoords = [];
    this.Map = [];
    this.Stack = []; //FILO
    this.JunctionStack = []; //FILO
    
    
    //====
    /// @fn Init()
    /// @brief initializes the maze map
    /// @author Trevor Ratliff
    /// @date 2013-06-12
    /// @param object robjOptions -- options for initializing the maze:
    ///     bool Walls -- true: turns on all walls, false: no walls
    ///     string Algorithm -- string for the algorithm to use for maze generation
    /// @return MazeMap
    //  
    //  Definitions:
    //  
    /// @verbatim
    /// History:  Date  |  Programmer  |  Contact  |  Description  |
    ///     2013-06-12  |  Trevor Ratliff  |  trevor.w.ratliff@gmail.com  |  
    ///         function creation  |
    /// @endverbatim
    //====
    this.Init = function (robjOptions) {
        try {
            //----
            // set options
            //----
            robjOptions = typeof robjOptions !== "object" ? {} : robjOptions;
            var lblnWalls = typeof robjOptions.Walls !== "undefined" ? 
                robjOptions.Walls : true;
            this.Algorithm = typeof robjOptions.Algorithm !== "undefined" ? 
                robjOptions.Algorithm : "RecursiveBackTracker";
            
            //----
            // clear stacks
            //----
            this.Stack = [];
            this.JunctionStack = [];
            
            //----
            // loop through rows
            //----
            for (var lintII = 0; lintII < this.Rows; lintII++) {
                //---
                // create array for columns
                //---
                this.Map[lintII] = [];
                
                //----
                // loop through columns
                //----
                for (var lintNN = 0; lintNN < this.Columns; lintNN++) {
                    //----
                    // add this coordinate to this.CellCoords
                    //----
                    this.CellCoords.push([lintII,lintNN]);
                    
                    //----
                    // create a new maze cell at this coordinate
                    //----
                    if (lblnWalls) {
                        this.Map[lintII][lintNN] = new MazeCell(lintII, lintNN, true);
                    } else {
                        this.Map[lintII][lintNN] = new MazeCell(lintII, lintNN);
                    }
                    
                    //----
                    // set borders
                    //----
                    if (lintII == 0) {
                        this.Map[lintII][lintNN].Borders.N = true;
                    }
                    
                    if (lintNN == this.Columns-1) {
                        this.Map[lintII][lintNN].Borders.E = true;
                    }
                    
                    if (lintNN == 0) {
                        this.Map[lintII][lintNN].Borders.W = true;
                    }
                    
                    if (lintII == this.Rows-1) {
                        this.Map[lintII][lintNN].Borders.S = true;
                    }
                }
            }
        } catch (err) {
            if (typeof console != "undefined") console.log(err.toString());
        }
        
        return this;
    };
    
    
    //====
    /// @fn DisplayString()
    /// @brief generates a string to represent the map
    /// @author Trevor Ratliff
    /// @date 2013-06-12
    /// @return string -- holding map representation
    //  
    //  Definitions:
    //      lstrLine1 -- temp first line in output iteration
    //      lstrLine2 -- temp second line in output iteration
    //      lstrLine3 -- temp third line in output iteration
    //      lstrMaze -- string that holds generated output
    //
    /// @verbatim
    /// History:  Date  |  Programmer  |  Contact  |  Description  |
    ///     2013-06-12  |  Trevor Ratliff  |  trevor.w.ratliff@gmail.com  |  
    ///         function creation  |
    /// @endverbatim
    //====
    this.DisplayString = function () {
        var lstrLine1 = "";
        var lstrLine2 = "";
        var lstrMaze = "";
        
        try {
            //----
            // generate first row of text
            //----
            lstrLine1 = "\n@";
            for (var lintNN = 0; lintNN < this.Columns; lintNN ++) {
                //----
                // test for borders or walls
                //----
                if (this.Map[0][lintNN].Borders.N ||
                    this.Map[0][lintNN].Walls.N) 
                {
                    lstrLine1 += this.Map[0][lintNN].Borders.N ? "@@" : "##";
                } else {
                    lstrLine1 += " #";
                }
            }
            
            //----
            // append rows to lstrMaze
            //----
            lstrMaze += lstrLine1 + "\n";
            
            //----
            // loop through rows of maze
            //----
            for (var lintII = 0; lintII < this.Rows; lintII++) {
                lstrLine1 = "";
                lstrLine2 = "@";
                
                //----
                // test for borders or walls on west side
                //----
                if (this.Map[lintII][0].Borders.W ||
                    this.Map[lintII][0].Walls.W) 
                {
                    lstrLine1 += this.Map[lintII][0].Borders.W ? "@" : "#";
                } else {
                    lstrLine1 += " ";
                }
                
                //----
                // loop through columns
                //----
                for (var lintNN = 0; lintNN < this.Columns; lintNN++) {
                    //----
                    // generate next 2 lines
                    //----
                    // test for borders or walls on east side making cell space too
                    //----
                    if (this.Map[lintII][lintNN].Borders.E ||
                        this.Map[lintII][lintNN].Walls.E) 
                    {
                        lstrLine1 += this.Map[lintII][lintNN].Borders.E ? " @" : " #";
                    } else {
                        lstrLine1 += "  ";
                    }
                    
                    //----
                    // test for borders or walls on the south side
                    //----
                    if (this.Map[lintII][lintNN].Borders.S ||
                        this.Map[lintII][lintNN].Walls.S) 
                    {
                        lstrLine2 += this.Map[lintII][lintNN].Borders.S ? "@@" : 
                            lintNN == this.Columns-1 ? "#@" : "##";
                    } else {
                        lstrLine2 += lintNN == this.Columns-1 ? " @" : " #";
                    }
                }
                
                //----
                // append rows to lstrMaze
                //----
                lstrMaze += lstrLine1 + "\n" + lstrLine2 + "\n";
            }
            
            //----
            // return maze representation
            //----
            this.MazeString = lstrMaze;
            
        } catch (err) {
            if (typeof console != "undefined") console.log(err.toString());
        }
        
        return lstrMaze;
    };
    
    
    //====
    /// @fn Generate
    /// @brief Generates a maze of the passed in type
    /// @author Trevor Ratliff
    /// @date 2013-06-13
    /// @return MazeMap
    //  
    //  Definitions:
    //  
    /// @verbatim
    /// History:  Date  |  Programmer  |  Contact  |  Description  |
    ///     2013-06-13  |  Trevor Ratliff  |  trevor.w.ratliff@gmail.com  |  
    ///         function creation  |
    /// @endverbatim
    //====
    this.Generate = function () {
        try {
            //----
            // switch what to do based on this.Algorithm
            //----
            switch (this.Algorithm) {
                case "RecursiveDivision":
                    this.RecursiveDivision();
                    break;
                default:
                    this.RecursiveBackTracker();
                    break;
            }
        } catch (err) {
            if (typeof console != "undefined") console.log(err.toString());
        }
        
        return this;
    };
    
    
    //====
    /// @fn GetCell(vintRow, vintColumn)
    /// @brief Gets the MazeCell at the specified location
    /// @author Trevor Ratliff
    /// @date 2013-07-16
    /// @param vintRow -- the row of the cell to retrieve
    /// @param vintColumn -- the column of the cell to retrieve
    /// @return MazeCell
    //  
    //  Definitions:
    //      lobjCell -- MazeCell to return
    //  
    /// @verbatim
    /// History:  Date  |  Programmer  |  Contact  |  Description  |
    ///     2013-07-16  |  Trevor Ratliff  |  trevor.w.ratliff@gmail.com  |  
    ///         function creation  |
    /// @endverbatim
    //====
    this.GetCell = function (vintRow, vintColumn) {
        var lobjCell = null;
        
        try {
            if (this.Map.length > vintRow) {
                if (this.Map[vintRow].length > vintColumn) {
                    lobjCell = this.Map[lintRow][lintColumn];
                }
            }
        } catch (err) {
            if (typeof console != "undefined") console.log(err.toString());
        }
        
        return lobjCell;
    };
    
    
    //====
    /// @fn RecursiveBackTracker
    /// @brief generates maze data using recursive backtracker algorithm
    /// @author Trevor Ratliff
    /// @date 2013-06-13
    /// @return MazeMap
    //  
    //  Definitions:
    //  
    /// @verbatim
    /// History:  Date  |  Programmer  |  Contact  |  Description  |
    ///     2013-06-13  |  Trevor Ratliff  |  trevor.w.ratliff@gmail.com  |  
    ///         function creation  |
    /// @endverbatim
    //====
    this.RecursiveBackTracker = function () {
        // Math.random() * (max - min) + min;
        var lintColumn = Math.floor(Math.random() * this.Columns);
        var lintRow = Math.floor(Math.random() * this.Rows);
        this.VisitedCells = 0;
        
        //----
        // walk through all cells adding to VisitedCells when entering a new one
        //----
        while (this.VisitedCells < this.TotalCells) {
            try {
                //~ if (typeof console != "undefined") console.log("row: " + lintRow + ", column: " + lintColumn);
                var lintRandom = 0;
                var lmcCurrent = this.Map[lintRow][lintColumn];
                var lmcNext = null;
                var larrNeighbors = [];
                
                //----
                // mark cell visited and incement this.VisitedCells
                //----
                lmcCurrent.Visited += 1;
                if (lmcCurrent.Visited < 2) this.VisitedCells += 1;
                this.Stack.push(lintRow + "," + lintColumn);
                
                //----
                // get neighbor cells
                //----
                // North Cell
                //----
                if (!lmcCurrent.Borders.N && lintRow > 0) {
                    if (this.Map[lintRow-1][lintColumn].Visited < 1) {
                        larrNeighbors.push(this.Map[lintRow-1][lintColumn]);
                    }
                }
                
                //----
                // East Cell
                //----
                if (!lmcCurrent.Borders.E && lintColumn < this.Columns) {
                    if (this.Map[lintRow][lintColumn+1].Visited < 1) {
                        larrNeighbors.push(this.Map[lintRow][lintColumn+1]);
                    }
                }
                
                //----
                // West Cell
                //----
                if (!lmcCurrent.Borders.W && lintColumn > 0) {
                    if (this.Map[lintRow][lintColumn-1].Visited < 1) {
                        larrNeighbors.push(this.Map[lintRow][lintColumn-1]);
                    }
                }
                
                //----
                // South Cell
                //----
                if (!lmcCurrent.Borders.S && lintRow < this.Rows) {
                    if (this.Map[lintRow+1][lintColumn].Visited < 1) {
                        larrNeighbors.push(this.Map[lintRow+1][lintColumn]);
                    }
                }
                
                //----
                // test for availible neighbors
                //----
                if (larrNeighbors.length > 0) {
                    //----
                    // add this coordinate to the junction stack
                    //----
                    this.JunctionStack.push(lintRow + "," + lintColumn);
                    
                    //----
                    // randomly pick a neighbor
                    //----
                    lintRandom = Math.floor(Math.random() * larrNeighbors.length)
                    
                    try {
                        lmcNext = larrNeighbors[lintRandom];
                    } catch (ex) {
                        if (typeof console != "undefined") console.log(ex.toString());
                    }
                    
                    //----
                    // join current and next
                    //----
                    if (lmcCurrent._row != lmcNext._row) {
                        if (lmcCurrent._row > lmcNext._row) {
                            //----
                            // join to current's north
                            //----
                            lmcCurrent.Walls.N = false;
                            lmcNext.Walls.S = false;
                            
                        } else {
                            //----
                            // join to current's south
                            //----
                            lmcCurrent.Walls.S = false;
                            lmcNext.Walls.N = false;
                            
                        }
                    } else {
                        if (lmcCurrent._column < lmcNext._column) {
                            //----
                            // join to current's east
                            //----
                            lmcCurrent.Walls.E = false;
                            lmcNext.Walls.W = false;
                            
                        } else {
                            //----
                            // join to current's west
                            //----
                            lmcCurrent.Walls.W = false;
                            lmcNext.Walls.E = false;
                        }
                    }
                    
                    //----
                    // set lintRow and lintColumn to coordinates from lmcNext
                    //----
                    lintRow = lmcNext._row;
                    lintColumn = lmcNext._column;
                    
                } else {
                    var larrCoords = null;
                    
                    //----
                    // process dead end
                    //----
                    lmcCurrent.BackTrack.N = lmcCurrent.Walls.N;
                    lmcCurrent.BackTrack.E = lmcCurrent.Walls.E;
                    lmcCurrent.BackTrack.W = lmcCurrent.Walls.W;
                    lmcCurrent.BackTrack.S = lmcCurrent.Walls.S;
                    
                    //----
                    // randomly choose to use the newest cell in JunctionStack
                    //      or a random one using BackTrackPercent as bias
                    //----
                    if (Math.random() > this.BackTrackPercent) {
                        //----
                        // pop last junction from JunctionStack to use as next cell
                        //----
                        larrCoords = this.JunctionStack.pop().split(",");
                    } else {
                        //----
                        // make sure we have items left in our junction stack
                        //----
                        if (this.JunctionStack.length > 0) {
                            var lintRandom = Math.floor(Math.random() * 
                                this.JunctionStack.length);
                            //----
                            // pop a random junction out
                            //----
                            larrCoords = this.JunctionStack.splice(lintRandom, 1)[0].split(",");
                        } else {
                            //----
                            // find another valid cell somehow
                            //----
                            larrCoords = ["0,0"];
                        }
                    }
                    
                    //----
                    // set lintRow and lintColumn for next iteration
                    //----
                    lintRow = parseInt(larrCoords[0]);
                    lintColumn = parseInt(larrCoords[1]);
                }
                
                //----
                // check to make sure we have valid numbers for lintRow & lintColumn
                //----
                if (typeof lintRow !== "number" || typeof lintColumn !== "number") {
                    if (this.JunctionStack.length >= 0) {
                        var larrNext = this.JunctionStack.pop()[0].split(",");
                        lintRow = parseInt(larrNext[0]);
                        lintColumn = parseInt(larrNext[1]);
                    } else {
                        lintRow = 0;
                        lintColumn = 0;
                    }
                }
                
            } catch (ex) {
                var lstrMessage = "";
                
                if (lmcCurrent) {
                    lstrMessage += "\nCurrent: " + lmcCurrent.toString();
                    lstrMessage += "\nVisited: " + lmcCurrent.Visited;
                }
                
                if (larrCoords) {
                    lstrMessage += "\nCoordinates: " + larrCoords.toString();
                }
                
                if (this.Stack) {
                    lstrMessage += "\nStack: [" + this.Stack.join("], [") + "]";
                }
                
                if (this.JunctionStack) {
                    lstrMessage += "\nJunction Stack: [" + this.JunctionStack.join("], [") + "]";
                }
                
                if (typeof console != "undefined") console.log(ex.toString() + lstrMessage);
                break;
            }
        }
        
        return this;
    };
    
    
    //====
    /// @fn RecursiveDivision
    /// @brief uses a recursive backtracker algorithm for generating a maze
    /// @author Trevor Ratliff
    /// @date 2103-06-13
    /// @return MazeMap
    //  
    //  Definitions:
    //  
    /// @verbatim
    /// History:  Date  |  Programmer  |  Contact  |  Description  |
    ///     2013-06-13  |  Trevor Ratliff  |  trevor.w.ratliff@gmail.com  |  
    ///         function creation  |
    /// @endverbatim
    //====
    this.RecursiveDivision = function () {
        var lintColumn = 0;
        var lintRow = 0;
        
        try {
            for (var lintII = 0; lintII < 5; lintII++) {
                lintColumn = Math.floor(Math.random() * this.Columns);
                lintRow = Math.floor(Math.random() * this.Rows);
                
                switch (Math.floor(Math.random() * 4)) {
                    case 1:
                        this.Map[lintRow][lintColumn].Walls.N = true;
                        if (lintRow > 0) 
                            this.Map[lintRow-1][lintColumn].Walls.S = true;
                        break;
                    
                    case 2:
                        this.Map[lintRow][lintColumn].Walls.E = true;
                        if (lintColumn < this.Columns) 
                            this.Map[lintRow][lintColumn+1].Walls.W = true;
                        break;
                    
                    case 3:
                        this.Map[lintRow][lintColumn].Walls.W = true;
                        if (lintColumn > 0) 
                            this.Map[lintRow][lintColumn-1].Walls.E = true;
                        break;
                    
                    default:
                        this.Map[lintRow][lintColumn].Walls.S = true;
                        if (lintRow < this.Rows) 
                            this.Map[lintRow+1][lintColumn].Walls.N = true;
                        break;
                }
            }
        } catch (err) {
            if (typeof console != "undefined") console.log(err.toString());
        }
        
        return this;
    };
    
    //return this;
}
