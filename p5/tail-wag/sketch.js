let frame_rate;
let button;
    
function setup() {
    createCanvas(400, 400);
    stroke(255, 204, 0);
    noFill();
    frame_rate = 1;
    button = createButton('Wag faster!');
    button.mousePressed(wag_faster);
}

function draw() {
    frameRate(frame_rate);
    wag_left();
    setTimeout(function(){wag_right()}, 500/frame_rate);
}

function wag_faster() {
    frame_rate++;
}

// TODO either make it possible to select dog type, or params like scruffiness, color (or some combo)

function set_background() {
    clear();
    background('#CBEFFF');
}
function wag_left() {
    set_background();
    // tail
    strokeWeight(6);
    curve(0, 0, 200, 250, 225, 400, 200, 400);
    curve(50, 0, 200, 250, 210, 400, 200, 400);
    // motion line
    strokeWeight(1);
    curve(120, 100, 240, 280, 255, 360, 220, 400);
}

function wag_right() {
    set_background();
    // tail
    strokeWeight(6);
    curve(400, 0, 200, 250, 175, 400, 250, 400);
    curve(400, 50, 200, 250, 185, 400, 250, 400);
    // motion line
    strokeWeight(1);
    curve(280, 130, 170, 280, 150, 360, 180, 400);
}