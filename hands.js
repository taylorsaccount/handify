// Hand tracking variables
let handPose;
let hands = [];

// Hand tracking with pinch detection
let leftHand = {
  thumb: { x: 0, y: 0, z: 0 },
  index: { x: 0, y: 0, z: 0 },
  index_finger_mcp: { x: 0, y: 0, z: 0 },
  index_finger_tip: { x: 0, y: 0, z: 0 },
  index_finger_pip: { x: 0, y: 0, z: 0 },
  middle_finger_mcp: { x: 0, y: 0, z: 0 },
  middle_finger_tip: { x: 0, y: 0, z: 0 },
  ring_finger_mcp: { x: 0, y: 0, z: 0 },
  ring_finger_tip: { x: 0, y: 0, z: 0 },
  midpoint: { x: 0, y: 0, z: 0 },
  isPinching: false,
  distance: 0,
  detected: false,
  wasPinching: false,
};

let rightHand = {
  thumb: { x: 0, y: 0, z: 0 },
  index: { x: 0, y: 0, z: 0 },
  index_finger_mcp: { x: 0, y: 0, z: 0 },
  index_finger_tip: { x: 0, y: 0, z: 0 },
  index_finger_pip: { x: 0, y: 0, z: 0 },
  middle_finger_mcp: { x: 0, y: 0, z: 0 },
  middle_finger_tip: { x: 0, y: 0, z: 0 },
  ring_finger_mcp: { x: 0, y: 0, z: 0 },
  ring_finger_tip: { x: 0, y: 0, z: 0 },
  midpoint: { x: 0, y: 0, z: 0 },
  isPinching: false,
  distance: 0,
  detected: false,
  wasPinching: false,
};

let pinchThreshold = 50;
// Initialize hand tracking
function preload() {
  handPose = ml5.handPose({ flipped: true });
}

// Start hand detection with video
function startHandDetection(videoElement) {
  handPose.detectStart(videoElement, gotHands);
}

// Callback for hand detection results
function gotHands(results) {
  hands = results;
  //console.log(hands);
}

function drawKeypoints() {

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j< hand.keypoints.length; j++){
      let kp = hand.keypoints[j];
      //console.log(kp);
      if(hand.handedness == "Left"){
        fill(237, 5, 245);
        
      }else{
        fill(245, 225, 5);
        
      }
      noStroke();
      circle(kp.x, kp.y, 20);
    }
  }
}

function pinchTracking() {

  leftHand.detected = false;
  rightHand.detected = false;

  for (let i = 0; i< hands.length; i++){
    let hand = hands[i];
    let thumbTip = hand.keypoints[4];
    let indexTip = hand.keypoints[8];
    let indexBot = hand.keypoints[5];
    let indexMid = hand.keypoints[6];
    let middleBot = hand.keypoints[9];
    let middleTop = hand.keypoints[12];
    let ringBot = hand.keypoints[13];
    let ringTop = hand.keypoints[16];
    let handObj;
    if (hand.handedness == "Left"){
      handObj = leftHand;
    }else {
      handObj = rightHand;
    }

    handObj.detected = true;

    handObj.thumb.x = thumbTip.x;
    handObj.thumb.y = thumbTip.y;

    handObj.index.x = indexTip.x;
    handObj.index.y = indexTip.y;

    

    handObj.middle_finger_mcp.x = middleBot.x;
    handObj.middle_finger_mcp.y = middleBot.y;

    handObj.middle_finger_tip.x = middleTop.x;
    handObj.middle_finger_tip.y = middleTop.y;

    handObj.ring_finger_mcp.x = ringBot.x;
    handObj.ring_finger_mcp.y = ringBot.y;

    handObj.ring_finger_tip.x = ringTop.x;
    handObj.ring_finger_tip.y = ringTop.y;

    handObj.index_finger_mcp.x = indexBot.x;
    handObj.index_finger_mcp.y = indexBot.y;

    handObj.index_finger_tip.x = indexTip.x;
    handObj.index_finger_tip.y = indexTip.y;

    handObj.index_finger_pip.x = indexMid.x;
    handObj.index_finger_pip.y = indexMid.y;

    

    handObj.distance = dist(handObj.thumb.x,handObj.thumb.y, handObj.index.x, handObj.index.y )
    handObj.midpoint.x = (handObj.thumb.x + handObj.index.x) /2;
    handObj.midpoint.y = (handObj.thumb.y + handObj.index.y) /2;

    handObj.wasPinching = handObj.isPinching;

    if (handObj.distance < pinchThreshold)  {
      handObj.isPinching = true;
    } else {
       handObj.isPinching = false;
    }
    

    console.log(middleBot.y)
  }

}

function drawHand(hand) {

  //Draw distance line
  if (hand.isPinching){
    
    strokeWeight(5);
    stroke(0,255,0)
  }else {
    strokeWeight(1);
    stroke(255,255,255);
  }

  line(hand.thumb.x, hand.thumb.y, hand.index.x, hand.index.y);

  //Draw thumb point
  fill(200,100,0);
  circle(hand.thumb.x, hand.thumb.y, 20);

  //Draw index point
  fill(0,100,200);
  circle(hand.index.x, hand.index.y, 20);

  //Draw midpoint 
  fill(100, 200, 0);
  circle(hand.midpoint.x, hand.midpoint.y, 20);

}



//array for y hand move
//relative distances, use z distance to work out how far from screen
//possibly train neuraln. for gestures

