let video;
let showVideo = true;
let showHands = true;
let cubeGraphics;
let cubeSize = 0;
let rotationX = 0;
let rotationY = 0;
let cubeX = 0;
let cubeY = 0;
let clr;
let isCrushed = false;
let isChery = false;
let isWah = false;
let isChorus = false
let currentEffect = null;
let font;



function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  font = loadFont('/Inconsolata-Regular.ttf');
  // Setup webcam
  video = createCapture(VIDEO, { flipped: true });
  video.size(width, height);
  video.hide();

  // Start hand detection
  startHandDetection(video);
  setupUI();

  clr = color(0, 255, 200);
   w = width / 64;

}

function setupUI() {
  
  
}

function draw() {
  background(20);

  let spectrum = fft.getValue();

 
  

  pinchTracking();

  if (leftHand.isPinching && !leftHand.wasPinching) {
    if (!loaded) {
      Tone.start();
      loaded = true;
    }
    tracks.forEach(track => track.playerStart());
    
    //PUT THE FFT HERE SO THAT IT CONSTANTLY GET THE VALUES
     outputBus.connect(fft, Tone.Destination );

     
  }

  for (let i = 1; i < tracks.length; i++) {
    if (tracks[i] && tracks[i].player) {
      tracks[i].player.volume.value = -Infinity;
    }
  }

  if (leftHand) {
    if (leftHand.middle_finger_tip.y < leftHand.middle_finger_mcp.y && tracks[1] && tracks[1].player) {
      tracks[1].player.volume.value = 0;
      
      push()
      fill("white")
      textFont(font);
      textSize(20)
    text('track2', -940, -110)
     translate(0, 0)
    for (let i = 0; i < spectrum.length; i++) {
    var angle = map(i, 0, spectrum.length, 0, 360)
    let ampl = spectrum[i];
    //fill(i, 255, 255);
    let r = map(ampl, -100, -13, 200, 300*100);
    var x = r * cos(angle);
    var y = r * sin(angle);
    noFill()
    stroke(255)
    
    circle(-910,0, ampl)
  }
  
pop()
    }

    if (leftHand.index_finger_tip.y < leftHand.index_finger_mcp.y && tracks[2] && tracks[2].player) {
      tracks[2].player.volume.value = 0;
      push()
      fill("white")
      textFont(font);
      textSize(20)
    text('track3', 800, -110)
     translate(0, 0)
    for (let i = 0; i < spectrum.length; i++) {
    var angle = map(i, 0, spectrum.length, 0, 360)
    let ampl = spectrum[i];
    //fill(i, 255, 255);
    let r = map(ampl, -100, -23, 200, 300*100);
    var x = r * cos(angle);
    var y = r * sin(angle);
    noFill()
    stroke(255)
    rect(910,80, ampl)
  }
  
pop()
    }
  }

  if (rightHand && loaded) {
    if (rightHand.middle_finger_tip.y < rightHand.middle_finger_mcp.y) {
      fill("white")
      textFont(font);
      textSize(20)
      text('crusher', -30, 450)
      rect(-5, 350, 10, 50)
      if (currentEffect !== crusher) {
        if (currentEffect) {
          effectBus.disconnect(currentEffect);
        }
        effectBus.connect(crusher);
        currentEffect = crusher;
        
      }
    } else if (currentEffect === crusher) {
      effectBus.disconnect(crusher);
      currentEffect = null;
    }

    if (rightHand.index_finger_tip.y < rightHand.index_finger_pip.y) {
      fill("white")
      textFont(font);
      textSize(20)
      text('cheby', 830, 450)
      rect(845, 350, 10, 50)
      if (currentEffect !== cheby) {
        if (currentEffect) {
          effectBus.disconnect(currentEffect);
        }
        effectBus.connect(cheby);
        currentEffect = cheby;
        
      }
    } else if (currentEffect === cheby) {
      effectBus.disconnect(cheby);
      currentEffect = null;
    }

    if (rightHand.ring_finger_tip.y < rightHand.ring_finger_mcp.y) {
      fill("white")
      textFont(font);
      textSize(20)
      text('phaser', -930, 450)
      rect(-910, 350, 10, 50)
      if (currentEffect !== phaser) {
        if (currentEffect) {
          effectBus.disconnect(currentEffect);
        }
        effectBus.connect(phaser);
        currentEffect = phaser;
      }
    } else if (currentEffect === phaser) {
      effectBus.disconnect(phaser);
      currentEffect = null;
    }
  }

  

  // stroke(255);
  for (let i = 0; i < spectrum.length; i++) {
    var angle = map(i, 0, spectrum.length, 0, 360)
    let ampl = spectrum[i];
    //fill(i, 255, 255);
    let r = map(ampl, -100, -13, 20, 300*2);
    var x = r * cos(angle);
    var y = r * sin(angle);
    stroke(frameCount, i,255)
    line(0, 0, x, y)
  }
  



 //console.log(fft.getValue())


  push();
  translate(-width/2, -height/2); // Push video back in Z space

  // Draw video feed if enabled (in 2D mode)
/*   if (showVideo) {
    let videoAspect = video.width / video.height;
    let aHeight = width / videoAspect;
    image(video, 0, 0, width, aHeight);
  } */

  if (showHands){
    drawKeypoints();
  }
  


}

