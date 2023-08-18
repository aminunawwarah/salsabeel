const previousImageIcon = document.querySelector('.previous-icon');
const nextImageIcon = document.querySelector('.next-icon');
const sliderContent = document.querySelector('.slider-content');
const images = document.querySelectorAll('.images');
const imageWidth = images[0].offsetWidth;

var currentPosition;
var positionX;
var dragState = false;

const dragStart = (arg) => {
    dragState = true;
    currentPosition = sliderContent.scrollLeft;
    positionX = arg.pageX;
}

const draggingState = (arg) => {
    if (!dragState) return;
    sliderContent.scrollLeft = currentPosition - (arg.pageX - positionX);
}

const dragStop = () => {
    dragState = false;
    currentPosition = sliderContent.scrollLeft;
}

sliderContent.addEventListener('mousedown', dragStart);
sliderContent.addEventListener('mouseover', draggingState);
document.addEventListener('mouseup', dragStop);

previousImageIcon.addEventListener('click', function() {
    sliderContent.scrollLeft += -imageWidth;
});

nextImageIcon.addEventListener('click', function() {
    sliderContent.scrollLeft += imageWidth;
});