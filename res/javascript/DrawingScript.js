var slider = document.getElementById("slider");

var canvas = new fabric.Canvas('canvas', {
    isDrawingMode: true
});

function draw() {
}

var onload = function () {
    canvas.freeDrawingColor = "rgb(255, 0, 0)"
    canvas.freeDrawingLineWidth = 50;
}


function erase() {
    canvas.freeDrawingColor = "rgb(255, 255, 255)";
}

slider.oninput = function () {
    console.log(this.value);
    console.log(colorWheel.color);
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
    console.log("HEJ");
    console.log(colorWheel.color.rgbString);
    canvas.freeDrawingColor = colorWheel.color.rgbString;
}


colorWheel.addEventListener("click", myFunction());

function myFunction() {
    alert ("Hello World!");
    console.log("test");
}












