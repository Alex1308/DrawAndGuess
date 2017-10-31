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
    console.log(colorWheel.rgb);
    canvas.freeDrawingLineWidth = this.value;
}

var colorWheel = iro.ColorWheel("#colorpicker", {
    width: 250,
    height: 250,
    padding: 0,
    sliderMargin: 0,
    markerRadius: 0,
    color: "rgb(68, 255, 158)"
});

function changeColor() {
    console.log("HEJ")
    canvas.freeDrawingColor = colorWheel.color;
}

colorWheel.onChange = function () {
    console.log("HEJ");
    console.log(colorWheel.color());
    canvas.freeDrawingColor = colorWheel.value.toRgb();
}


colorWheel.addEventListener("click", myFunction());

function myFunction() {
    alert ("Hello World!");
    console.log("test");
}











