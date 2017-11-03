var slider = document.getElementById("slider");

var canvas = new fabric.Canvas('canvas', {
    isDrawingMode: true
});

function draw() {
}

var onload = function () {
    canvas.freeDrawingColor = "rgb(255, 0, 0)"
    canvas.freeDrawingLineWidth = 10;
}


function erase() {
    canvas.freeDrawingColor = "rgb(255, 255, 255)";
}

slider.oninput = function () {
    canvas.freeDrawingLineWidth = this.value;
}

var colorWheel = iro.ColorWheel("#colorpicker", {
    width: 250,
    height: 250,
    padding: 0,
    sliderMargin: 0,
    markerRadius: 0,
    color: "rgb(255, 0, 0)"
});

function changeColor() {
    canvas.freeDrawingColor = colorWheel.color.rgbString;
}













