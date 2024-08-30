var incrementLeft = -1;
var incrementRight = 1;
var colorLeft = 1;
var colorRight = 128;

const changeColor = async() => {
    colorLeft = (colorLeft + incrementLeft);
    colorRight = (colorRight + incrementRight);
    // console.log(colorLeft, colorRight);
    if (colorLeft >= 128) {
        incrementLeft = -2;
    } else if (colorLeft <= 0) {
        incrementLeft = 2;
        colorLeft = 0;
    }
    if (colorRight >= 128) {
        incrementRight = -2;
    } else if (colorRight <= 0) {
        incrementRight = 2;
        colorRight = 0;
    }
    const body = document.getElementsByTagName("body")[0];
    body.setAttribute("style", `background-image: linear-gradient(to left, rgb(0,${colorLeft},64), rgb(0,${colorRight},64))`);
}

var progress = setInterval(changeColor, 500);