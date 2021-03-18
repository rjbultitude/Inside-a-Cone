const longlineArr = [];
let myCanvas;
let num = 150;
let twidth = 12;
let swing = 2;
let noiseStart = 0.1;
let removedLines = [];

class Longline {
  constructor(startX, startY, endX, endY, end2X, end2Y) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.end2X = end2X;
    this.end2Y = end2Y;
    this.colour = color(random(100,255), random(0,255), random(50,255), 255);
  }

  paint() {
    fill(this.colour);
    noStroke();
    triangle(this.endX, this.endY, this.startX, this.startY, this.end2X, this.end2Y);
  }

  update() {
    const prevEndX = this.endX;
    const prevEndY = this.endY;
    const prevEnd2X = this.end2X;
    const prevEnd2Y = this.end2Y;

    noiseStart += 0.1;

    const angle = frameCount/50;
    const swingAmt = noise(noiseStart) * 10;

    this.endX = prevEndX + sin(angle) * swingAmt;
    this.endY = prevEndY + cos(angle) * swingAmt;
    this.end2X = prevEnd2X + sin(angle) * swingAmt;
    this.end2Y = prevEnd2Y + cos(angle) * swingAmt;
  }
}


function createLineArr(newNum) {
	if (newNum !== undefined) {
		num = newNum;
	}

	//spiral logic
	const innerRadius = 50;
	const outerRadius = 700;
	let separator;
	const triangleWidth = twidth;

	for (let i = 0; i < num; i++) {
		if (num >= 48) {
			separator = num/360;
		}
		else {
			separator = num/10;
		}

		//Cone shape logic
		const startX = sin(i * separator) * innerRadius + (width/2);
		const startY = cos(i * separator) * innerRadius + (width/2) - innerRadius * 2;
		const endX = sin(i * separator) * outerRadius + height/2;
		const endY = cos(i * separator) * outerRadius + height/2;
		const end2X = sin(i * separator) * outerRadius + height/2 + triangleWidth;
		const end2Y = cos(i * separator) * outerRadius + height/2 + triangleWidth;
		const newLongline = new Longline(startX, startY, endX, endY, end2X, end2Y);
		longlineArr.push(newLongline);
	}
}

//controls
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('subtract');
const amt = 20;

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
	myCanvas = createCanvas(800,600);
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
