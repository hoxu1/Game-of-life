function make2DArray(rows, columns){
	var m = new Array(rows);

	for(var i = 0; i < columns; i++){
		m[i] = new Array(columns);
	}

	return m;
}

// A function for counting how many elements around matrix[x][y] are equal to 1
function countNeighbours(matrix, x, y){
	var neighbours = 0;

	switch(true){
		//cell in upper-left corner
		case (x == 0 && y == 0):
			neighbours = matrix[x+1][y] + matrix[x][y+1] + matrix[x+1][y+1];
		break;

		//cell in upper-right corner
		case (x == matrix.length - 1 && y == 0):
			neighbours = matrix[x - 1][y] + matrix[x-1][y+1] + matrix[x][y+1];
		break;

		//cell in lower-left corner
		case (x == 0 && y == matrix.length - 1):
			neighbours = matrix[x][y-1] + matrix[x+1][y-1] + matrix[x+1][y];
		break;
		
		//cell in lower-right corner
		case (x == matrix.length - 1 && y == matrix.length - 1):
			neighbours = matrix[x][y-1] + matrix[x-1][y-1] + matrix[x-1][y];
		break;

		//cell in upper border
		case (y == 0):
			neighbours = matrix[x-1][y] + matrix[x-1][y+1] + matrix[x][y+1] + matrix[x+1][y+1] + matrix[x+1][y]; 
		break;
		
		//cell in lower border
		case (y == matrix.length - 1):
			neighbours = matrix[x-1][y] + matrix[x-1][y-1] + matrix[x][y-1] + matrix[x+1][y-1] + matrix[x+1][y]; 
		break;

		//cell in left border
		case (x == 0):
			neighbours = matrix[x][y-1] + matrix[x+1][y-1] + matrix[x+1][y] + matrix[x+1][y+1] + matrix[x][y+1];
		break;

		//cell in right border
		case (x == matrix.length - 1):
			neighbours = matrix[x][y-1] + matrix[x-1][y-1] + matrix[x-1][y] + matrix[x-1][y+1] + matrix[x][y+1];
		break;

		default:
			neighbours = matrix[x-1][y] + matrix[x-1][y-1] + matrix[x][y-1] + matrix[x+1][y-1] + matrix[x+1][y] + matrix[x+1][y+1] + matrix[x][y + 1] + matrix[x-1][y+1];	
		break;
	}

	return neighbours;
}

function getNextGeneration(matrix, size){
	//RULES:
	//Any live cell with two or three live neighbours survives.
	//Any dead cell with exactly three live neighbours becomes a live cell.
	//All other live cells die in the next generation. Similarly, all other dead cells stay dead.

	var new_generation = make2DArray(size, size);

	for(var i = 0; i < size; i++){
		for(var j = 0; j < size; j++){
			if(m[i][j] == 1 && (countNeighbours(m, i, j) == 2 || countNeighbours(m, i, j) == 3)){
				new_generation[i][j] = 1;
			}else if(countNeighbours(m, i, j) == 3){
				new_generation[i][j] = 1;
			}else{
				new_generation[i][j] = 0;
			}
		}
	}

	return new_generation;
}


// SETUP
var canvas = document.getElementById("lifeCanvas");
var ctx = canvas.getContext("2d");

var matrix_size = 100;
var m = make2DArray(matrix_size, matrix_size);
var pix_size = canvas.width/matrix_size;


// Filling matrix with random 1's and 0's

for(var i = 0; i < matrix_size; i++){
	for(var j = 0; j < matrix_size; j++){
		if(Math.random() >= 0.5){
			m[i][j] = 1;
		}else{
			m[i][j] = 0;
		}
	}
}

//drawing matrix
function draw(){
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	for(var i = 0; i < matrix_size; i++){
		for(var j = 0; j < matrix_size; j++){
			if(m[i][j] == 1){
				ctx.fillStyle = "rgb(0, 0, 0)"; 
			}else{
				ctx.fillStyle = "rgb(220, 220, 220)";
			}

			ctx.fillRect(i * pix_size, j * pix_size, pix_size, pix_size);
		}
	}
}

function gameOfLife(){
	draw();
	m = getNextGeneration(m, matrix_size);
}

setInterval(gameOfLife,1000/3);