var longlineArr = [];
var myCanvas;
var num = 150;
var twidth = 12;
var swing = 2;
var noiseStart = 0.1;
var removedLines = [];

function Longline(startX, startY, endX, endY, end2X, end2Y) {
	this.startX = startX;
	this.startY = startY;
	this.endX = endX;
	this.endY = endY;
	this.end2X = end2X;
	this.end2Y = end2Y;
	this.colour = color(random(100,255), random(0,255), random(50,255), 255);
}

Longline.prototype.paint = function() {
	fill(this.colour);
	noStroke();
	triangle(this.endX, this.endY, this.startX, this.startY, this.end2X, this.end2Y);
}

Longline.prototype.update = function() {
	var prevEndX = this.endX;
	var prevEndY = this.endY;
	var prevEnd2X = this.end2X;
	var prevEnd2Y = this.end2Y;

	noiseStart += 0.1;

	var angle = frameCount/50;
	var swingAmt = noise(noiseStart) * 10;

	this.endX = prevEndX + sin(angle) * swingAmt;
	this.endY = prevEndY + cos(angle) * swingAmt;
	this.end2X = prevEnd2X + sin(angle) * swingAmt;
	this.end2Y = prevEnd2Y + cos(angle) * swingAmt;
}

function createLineArr(newNum) {
	if (newNum !== undefined) {
		num = newNum;
	}

	//spiral logic
	var innerRadius = 50;
	var outerRadius = 700;
	var separator;
	var triangleWidth = twidth;

	for (var i = 0; i < num; i++) {
		if (num >= 48) {
			separator = num/360;
		}
		else {
			separator = num/10;
		}

		//Cone shape logic
		var startX = sin(i * separator) * innerRadius + (width/2);
		var startY = cos(i * separator) * innerRadius + (width/2) - innerRadius * 2;
		var endX = sin(i * separator) * outerRadius + height/2;
		var endY = cos(i * separator) * outerRadius + height/2;
		var end2X = sin(i * separator) * outerRadius + height/2 + triangleWidth;
		var end2Y = cos(i * separator) * outerRadius + height/2 + triangleWidth;
		var newLongline = new Longline(startX, startY, endX, endY, end2X, end2Y);
		longlineArr.push(newLongline);
	}
}

//controls
var addBtn = document.getElementById('add');
var subBtn = document.getElementById('subtract');
var amt = 20;

addBtn.addEventListener('click', function() {
	if (removedLines.length > 0) {
		longlineArr.push.apply(removedLines);
	}
	else {
		createLineArr(amt);
	}
});
subBtn.addEventListener('click', function() {
	removedLines = longlineArr.splice(0, amt);
	console.log(removedLines.length);
});

function setup() {
	myCanvas = createCanvas(1024,576);
	myCanvas.parent('canvas-container');
	background(0,0,0);
	createLineArr();
}

function draw() {
	background(0, 0, 0);
	for (var i = 0; i < longlineArr.length; i++) {
		longlineArr[i].paint();
		longlineArr[i].update();
	}
}