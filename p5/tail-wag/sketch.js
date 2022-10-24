let frame_rate;
let wag_button;
let wag_slower_button;
let fuzz_button;
let is_fuzzy = false;
    
function setup() {
    createCanvas(400, 400);
    stroke(255, 204, 0);
    noFill();
    frame_rate = 1;
    wag_button = createButton('Wag faster!');
    wag_button.mousePressed(function(){wag_speed('faster')});
    wag_slower_button = createButton('Wag slower!');
    wag_slower_button.mousePressed(function(){wag_speed('slower')});
    fuzz_button = createButton('Make the puppy fuzzy');
    fuzz_button.mousePressed(change_fur);
}

function draw() {
    frameRate(frame_rate);
    wag_left(is_fuzzy);
    setTimeout(function(){wag_right(is_fuzzy)}, 500/frame_rate);
}

function wag_speed(speed_change) {
    if (speed_change == 'faster') {
        frame_rate++;
    } else {
        if (frame_rate > 1) {
            frame_rate--;
        }
        else {
            let happ_div = createDiv(`This is a happy pup, she can't wag any slower.`);
            happ_div.style('color', 'white');
            happ_div.style('backgroundColor', 'black');
            setTimeout(function(){happ_div.remove()}, 3000);
        }
    }
}

function change_fur() {
    is_fuzzy = !is_fuzzy;
    if (is_fuzzy) {
        fuzz_button.html('Make the puppy smooth');
    } else {
        fuzz_button.html('Make the puppy fuzzy');
    }
}

function set_background() {
    clear();
    background('#CBEFFF');
}

function wag_right(is_fuzzy) {
    set_background();
    if (is_fuzzy) {
        // tail
        strokeWeight(6);
        curve(0, 0, 200, 250, 225, 300, 200, 400);
        curve(0, 0, 225, 300, 235, 350, 200, 400);
        curve(0, 0, 235, 350, 245, 400, 200, 400);
        
        curve(50, 0, 200, 250, 205, 300, 200, 400);
        curve(50, 0, 205, 300, 215, 350, 200, 400);
        curve(50, 0, 215, 350, 220, 400, 200, 400);
        
        // motion line
        strokeWeight(1);
        curve(140, 100, 260, 280, 275, 360, 240, 400);
    } else {
        // tail
        strokeWeight(6);
        curve(0, 0, 200, 250, 225, 400, 200, 400);
        curve(50, 0, 200, 250, 210, 400, 200, 400);
        // motion line
        strokeWeight(1);
        curve(120, 100, 240, 280, 255, 360, 220, 400);
    }
}

function wag_left(is_fuzzy) {
    set_background();
    if (is_fuzzy) {
        // tail
        strokeWeight(6);
        curve(400, 0, 200, 250, 170, 300, 250, 400);
        curve(400, 0, 170, 300, 160, 350, 200, 400);
        curve(400, 0, 160, 350, 155, 400, 200, 400);
        
        curve(400, 50, 200, 250, 195, 300, 250, 400);
        curve(400, 50, 195, 300, 190, 350, 250, 400);
        curve(400, 50, 190, 350, 185, 400, 200, 400);
        
        // motion line
        strokeWeight(1);
        curve(280, 130, 140, 280, 120, 360, 180, 400);
    } else {
        // tail
        strokeWeight(6);
        curve(400, 0, 200, 250, 175, 400, 250, 400);
        curve(400, 50, 200, 250, 185, 400, 250, 400);
        // motion line
        strokeWeight(1);
        curve(280, 130, 170, 280, 150, 360, 180, 400);
    }
}
