let canvas;
let shape_selector;
let shape = 'circle';
let size_slider;
let shape_size = 25;
let start_button;
let like_button;
let line_color = 'white';
let fill_color = 'black';

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    noLoop();

    shape_selector = createSelect();
    shape_selector.option('circle');
    shape_selector.option('square');
    shape_selector.selected(shape);

    size_slider = createSlider(0, 100, shape_size);
    size_slider.style('width', '80px');

    lineColorPicker = createColorPicker(line_color);
    fillColorPicker = createColorPicker(fill_color);

    start_button = createButton('Let\'s do this');
    start_button.mousePressed(start);
}

function draw() {
    shape = shape_selector.value();
    shape_size = size_slider.value();
    strokeWeight(2);
    stroke(lineColorPicker.color());
    fill(fillColorPicker.color());
    if (shape == 'circle') {
        circle(random(windowWidth), random(windowHeight), shape_size);
    } else if (shape == 'square') {
        square(random(windowWidth), random(windowHeight), shape_size);
    } else if (shape == 'triangle') {
        // TODO need some geometry to use shape_size
        triangle(x1, y1, x2, y2, x3, y3);
    }else if (shape == 'star') {
        // TODO need some geometry to use shape_size
        // https://p5js.org/examples/form-star.html
        star(0, 0, 30, 70, 5);
    }
}

function start() {
    loop();
    start_button.remove();
    like_button = createButton('I like it!');
    like_button.mousePressed(like);
}

function like() {
    noLoop();
    canvas.get(0, 0, windowWidth, windowHeight).save('canvas', 'png');
}
