function BitMapping(){this.S=0<arguments.length?this.W=this.E=this.N=!0:this.W=this.E=this.N=!1;this.Swap=function(e){switch(e){case "N":case "n":this.N=!0==this.N?!1:!0;break;case "E":case "e":this.E=!0==this.E?!1:!0;break;case "W":case "w":this.W=!0==this.W?!1:!0;break;case "S":case "s":this.S=!0==this.S?!1:!0}};this.toString=function(){var e;return e=""+("[N:"+(!0==this.N?1:0)+", E:"+(!0==this.E?1:0)+", W:"+(!0==this.W?1:0)+", S:"+(!0==this.S?1:0)+"]")}}
function MazeCell(e,h){this._column=h;this._row=e;this.Visited=0;this.BackTrack=new BitMapping;this.Solution=new BitMapping;this.Borders=new BitMapping;this.Walls=2<arguments.length?new BitMapping(!0):new BitMapping;this.toString=function(){var a;a=""+("row: "+this._row+", column: "+this._column+"\n");a+="Borders:   "+this.Borders.toString()+"\n";a+="Walls:     "+this.Walls.toString()+"\n";a+="Solution:  "+this.Solution.toString()+"\n";return a+="BackTrack: "+this.BackTrack.toString()}}
function WallMap(e){this._map=e;this._arrWalls=this._map.substr(1).split("\n");this._arrWalls.pop();this.IsWall=function(e,a){var b=!1;"#"==("undefined"!=typeof this._arrWalls[e]?this._arrWalls[e].substr(a,1):"")&&(b=!0);return b};this.IsBorder=function(e,a){var b=!1;"@"==("undefined"!=typeof this._arrWalls[e]?this._arrWalls[e].substr(a,1):"")&&(b=!0);return b}}
function MazeMap(e,h){this.Columns="number"!==typeof h?10:Math.floor(h);this.Rows="number"!==typeof e?5:Math.floor(e);this.TotalCells=this.Columns*this.Rows;this.VisitedCells=0;this.BackTrackPercent=2<arguments.length?"number"!==typeof arguments[2]?arguments[2]:0.65:0.65;this.Algorithm=this.MazeString="";this.CellCoords=[];this.Map=[];this.Stack=[];this.JunctionStack=[];this.Init=function(a){a="object"!==typeof a?{}:a;var b="undefined"!==typeof a.Walls?a.Walls:!0;this.Algorithm="undefined"!==typeof a.Algorithm?
a.Algorithm:"RecursiveBackTracker";this.Stack=[];this.JunctionStack=[];for(a=0;a<this.Rows;a++){this.Map[a]=[];for(var d=0;d<this.Columns;d++)this.CellCoords.push([a,d]),this.Map[a][d]=b?new MazeCell(a,d,!0):new MazeCell(a,d),0==a&&(this.Map[a][d].Borders.N=!0),d==this.Columns-1&&(this.Map[a][d].Borders.E=!0),0==d&&(this.Map[a][d].Borders.W=!0),a==this.Rows-1&&(this.Map[a][d].Borders.S=!0)}return this};this.DisplayString=function(){for(var a="",b="",d,a="\n@",c=0;c<this.Columns;c++)a=this.Map[0][c].Borders.N||
this.Map[0][c].Walls.N?a+(this.Map[0][c].Borders.N?"@@":"##"):a+" #";d=""+(a+"\n");for(var f=0;f<this.Rows;f++){a="";b="@";a=this.Map[f][0].Borders.W||this.Map[f][0].Walls.W?a+(this.Map[f][0].Borders.W?"@":"#"):a+" ";for(c=0;c<this.Columns;c++)a=this.Map[f][c].Borders.E||this.Map[f][c].Walls.E?a+(this.Map[f][c].Borders.E?" @":" #"):a+"  ",b=this.Map[f][c].Borders.S||this.Map[f][c].Walls.S?b+(this.Map[f][c].Borders.S?"@@":c==this.Columns-1?"#@":"##"):b+(c==this.Columns-1?" @":" #");d+=a+"\n"+b+"\n"}return this.MazeString=
d};this.Generate=function(){switch(this.Algorithm){case "RecursiveDivision":this.RecursiveDivision();break;default:this.RecursiveBackTracker()}return this};this.GetCell=function(a,b){var d=null;this.Map.length>a&&this.Map[a].length>b&&(d=this.Map[lintRow][lintColumn]);return d};this.RecursiveBackTracker=function(){var a=Math.floor(Math.random()*this.Columns),b=Math.floor(Math.random()*this.Rows);for(this.VisitedCells=0;this.VisitedCells<this.TotalCells;)try{var d=0,c=this.Map[b][a],f=null,e=[];c.Visited+=
1;2>c.Visited&&(this.VisitedCells+=1);this.Stack.push(b+","+a);!c.Borders.N&&0<b&&1>this.Map[b-1][a].Visited&&e.push(this.Map[b-1][a]);!c.Borders.E&&a<this.Columns&&1>this.Map[b][a+1].Visited&&e.push(this.Map[b][a+1]);!c.Borders.W&&0<a&&1>this.Map[b][a-1].Visited&&e.push(this.Map[b][a-1]);!c.Borders.S&&b<this.Rows&&1>this.Map[b+1][a].Visited&&e.push(this.Map[b+1][a]);if(0<e.length){this.JunctionStack.push(b+","+a);d=Math.floor(Math.random()*e.length);try{f=e[d]}catch(h){console.log(h.toString())}c._row!=
f._row?c._row>f._row?(c.Walls.N=!1,f.Walls.S=!1):(c.Walls.S=!1,f.Walls.N=!1):c._column<f._column?(c.Walls.E=!1,f.Walls.W=!1):(c.Walls.W=!1,f.Walls.E=!1);b=f._row;a=f._column}else{var g=null;c.BackTrack.N=c.Walls.N;c.BackTrack.E=c.Walls.E;c.BackTrack.W=c.Walls.W;c.BackTrack.S=c.Walls.S;Math.random()>this.BackTrackPercent?g=this.JunctionStack.pop().split(","):0<this.JunctionStack.length?(d=Math.floor(Math.random()*this.JunctionStack.length),g=this.JunctionStack.splice(d,1)[0].split(",")):g=["0,0"];
b=parseInt(g[0]);a=parseInt(g[1])}if("number"!==typeof b||"number"!==typeof a)if(0<=this.JunctionStack.length)var k=this.JunctionStack.pop()[0].split(","),b=parseInt(k[0]),a=parseInt(k[1]);else a=b=0}catch(l){a="";c&&(a+="\nCurrent: "+c.toString(),a+="\nVisited: "+c.Visited);g&&(a+="\nCoordinates: "+g.toString());this.Stack&&(a+="\nStack: ["+this.Stack.join("], [")+"]");this.JunctionStack&&(a+="\nJunction Stack: ["+this.JunctionStack.join("], [")+"]");console.log(l.toString()+a);break}return this};
this.RecursiveDivision=function(){for(var a=0,b=0,d=0;5>d;d++)switch(a=Math.floor(Math.random()*this.Columns),b=Math.floor(Math.random()*this.Rows),Math.floor(4*Math.random())){case 1:this.Map[b][a].Walls.N=!0;0<b&&(this.Map[b-1][a].Walls.S=!0);break;case 2:this.Map[b][a].Walls.E=!0;a<this.Columns&&(this.Map[b][a+1].Walls.W=!0);break;case 2:this.Map[b][a].Walls.W=!0;0<a&&(this.Map[b][a-1].Walls.E=!0);break;default:this.Map[b][a].Walls.S=!0,b<this.Rows&&(this.Map[b+1][a].Walls.N=!0)}return this}};