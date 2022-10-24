console.log('ml5 version:', ml5.version);

// building blocks:
// https://learn.ml5js.org/#/tutorials/hello-ml5
// https://editor.p5js.org/ml5/sketches/SketchRNN_basic
// https://editor.p5js.org/ml5/sketches/oi74rlMSjT

// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let img_classifier;

// Initialize the SketchRNN method with MobileNet. A callback needs to be passed.
let rnn;
let rnn_loaded = false;
// Initialize awareness of whether it's time to draw or not
let previous_pen; // = 'down';
// Current location of drawing
let x, y;
// The current "stroke" of the drawing
let strokePath;

// A variable to hold the image we want to classify
let img;
// A variable to hold the image class
let img_class;
// A variable to hold the confidence of class detection
let img_conf;

// Instance of classifier for the sketch
let sketch_classifier;
let canvas;  // TODO multiple canvases https://p5js.org/reference/#/p5/p5

function preload() {
    // options: https://github.com/ml5js/ml5-library/blob/c3123cac0b1dfa0ed8e3e2588e8dea72ccd05aa8/src/ImageClassifier/index.js#L34
    // TODO make it a user option
    img_classifier = ml5.imageClassifier('mobilenet');

    // TODO let user upload
    // img = loadImage('bird.png');
    // img = loadImage('cat.png');
    img = loadImage('butterfly.png');
}
  

function setup() {
    // left = image; right will be for sketching
    canvas = createCanvas(windowWidth, windowHeight/2);
    background('white');
    img_classifier.classify(img, gotResult);
    image(img, 0, 0, windowWidth/2, windowHeight/2);

    // Button to reset drawing
    let button = createButton('clear drawing');
    button.position(windowWidth/2, windowHeight/2);
}



// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  } else {
    // The results are in an array ordered by confidence.
    console.log(results);
    img_class = results[0].label;
    img_conf = results[0].confidence;
    let label_div = createDiv(`Label: ${img_class}`);
    label_div.style('color', 'white');
    let conf_div = createDiv(`Confidence: ${nf(img_conf, 0, 2)}`);
    conf_div.style('color', 'white');

    rnn_load(img_class);
    startDrawing();
    setTimeout(function(){classify_sketch()}, 5000);
  }
}

function classify_sketch() {
  sketch_classifier = ml5.imageClassifier('DoodleNet');
  let doodle = canvas.get(windowWidth/2, 0, windowWidth/2, windowHeight/2);
  // doodle.save('doodle', 'png');
  sketch_classifier.classify(doodle, gotSketchResult);
}

function gotSketchResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    // Show the first label and confidence
    let sketch_div = createDiv(`DoodleNet is ${nf(100*results[0].confidence, 0, 0)}% confident that this is a \'${results[0].label}\'`);
    sketch_div.position(windowWidth/2, windowHeight/2 + 50);
    sketch_div.style('color', 'white');
}

function rnn_load(img_class) {
    // supported models: https://github.com/ml5js/ml5-library/blob/master/src/SketchRNN/models.js
    let img_class_tokens = img_class.split(' ');
    console.log(img_class_tokens);
    let i = 0;
    while (!rnn_loaded && i <= img_class_tokens.length-1) {
        img_class_token = img_class_tokens[i].replace(',', '');
        console.log(img_class_token);
        rnn = ml5.sketchRNN(img_class_token);
        rnn_loaded = rnn.hasOwnProperty('model');
        i++;
    }
    if (typeof rnn !== 'undefined') {
        let rnn_div = createDiv(`SketchRNN loaded for \'${img_class_token}\'`);
        rnn_div.position(windowWidth/2, windowHeight/2 + 25);
        rnn_div.style('color', 'white');
    }
  }

// Reset the drawing
function startDrawing() {
    x = 3 * windowWidth/4;
    y = windowHeight/6;
    rnn.reset();
    // Generate the first stroke path
    rnn.generate(gotStroke);
}

function draw() {
  // If something new to draw
  if (strokePath) {
    // If the pen is down, draw a line
    if (previous_pen == 'down') {
      stroke(0);
      strokeWeight(3.0);
      line(x, y, x + strokePath.dx, y + strokePath.dy);
    }
    // Move the pen
    x += strokePath.dx;
    y += strokePath.dy;
    // The pen state actually refers to the next stroke
    previous_pen = strokePath.pen;

    // If the drawing is complete
    if (strokePath.pen !== 'end') {
      strokePath = null;
      rnn.generate(gotStroke);
    }
  }
}

// A new stroke path
function gotStroke(err, s) {
  strokePath = s;
}
