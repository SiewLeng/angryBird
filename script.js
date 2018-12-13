var elem;
var target;
var obstacle;
var scoreBoard;
var line;
var maxLengthOfRope = 220;
var time = 0;
var maxLaunchSpeed = 2000;
var orginalLengthOfRope = 70;
var posOfX;
var posOfY;
var initPosOfX;
var initPosOfY;
var lengthOfRope;
var ux;
var uy;
var vy;
var animation;
var noOfBlockOfTargetCLeared;
var result;
var scoreWithinAGame;


var initalise = function() {
    noOfBlockOfTargetCLeared = [0, 0, 0];
    result = false;
    time = 0;

    elem = document.querySelector("#drag");
    block = document.querySelector("#block");
    line = document.querySelector("#line");
    scoreBoard = document.querySelector("#scoreBoard");
}

var createElement = function () {
    createWrapper();
    createLine();
    createBlock();
    createDrag();
    createScoreBoard();
    createTargetList("target0", 0);
    createObstacle(0);
    createTargetList("target1", 1);
    createObstacle(1);
    createTargetList("target2", 2);
    createObstacle(2);


    target = [document.querySelectorAll(".target0"), document.querySelectorAll(".target1"), document.querySelectorAll(".target2")]
    obstacle = document.querySelectorAll(".obstacle");
    console.log("Length of target[0]: " + target[0].length);
    console.log("length of target0: " + document.querySelectorAll(".target0").length);
}

var removeElement = function () {
    var container = document.querySelector("#wrapper");
    container.remove("obstacle");

    container.remove("target0");
    container.remove("target1");
    container.remove("target2");

     console.log("After removal, length of target0: " + document.querySelectorAll(".target0").length);
     console.log("After removal, length of obstacle: " + document.querySelectorAll(".obstacle").length);
}

var checkAllBlockOfTargetClear = function () {
    if ((noOfBlockOfTargetCLeared[0] === noOfBlockOfTargetCLeared[1]) &&
        (noOfBlockOfTargetCLeared[1] === noOfBlockOfTargetCLeared[2]) &&
        (noOfBlockOfTargetCLeared[0] === 1)) {
        result = true;
    }

    if(result) {
        console.log("3 blocks cleared");
        scoreWithinAGame = document.querySelectorAll(".target0").length * 100;
                            + document.querySelectorAll(".target1").length * 100
                            + document.querySelectorAll(".target2").length * 100;

        console.log("length of .target0: " + document.querySelectorAll(".target0").length);
        console.log("scoreWithinAGame: " + scoreWithinAGame);
        totalScore = totalScore + scoreWithinAGame;
        console.log("totalScore: " + totalScore);
        scoreBoard.textContent = "Score: " + totalScore;
    }
    return result;
}

var updateRebound = function() {
    for(i = 0; i < obstacle.length; i++ ) {
        //hit left side of obstacle
        if(((elem.offsetLeft + elem.offsetWidth) >= obstacle[i].offsetLeft)
         && ((elem.offsetLeft + elem.offsetWidth) <= (obstacle[i].offsetLeft + 20))
            && ((elem.offsetTop + elem.offsetHeight) > obstacle[i].offsetTop)
            && ((elem.offsetTop + elem.offsetHeight) < (obstacle[i].offsetTop +obstacle[i].offsetHeight + elem.offsetHeight))
            && ux > 0) {

            initPosOfX = posOfX;
            initPosOfY = posOfY;
            ux = - ux;
            uy = vy;
            time = 0;
        }

        //hit right side of obstacle
        if((elem.offsetLeft >= (obstacle[i].offsetLeft + obstacle[i].offsetWidth -20))
            && (elem.offsetLeft <= (obstacle[i].offsetLeft + obstacle[i].offsetWidth))
            && ((elem.offsetTop + elem.offsetHeight) > obstacle[i].offsetTop)
            && ((elem.offsetTop + elem.offsetHeight) < (obstacle[i].offsetTop +obstacle[i].offsetHeight + elem.offsetHeight))
            && ux < 0 ) {

            initPosOfX = posOfX;
            initPosOfY = posOfY;
            ux = - ux;
            uy = vy;
            time = 0;
        }


    //hit top side of obstacle
        if(((elem.offsetTop + elem.offsetHeight) >= obstacle[i].offsetTop)
            && (elem.offsetTop + elem.offsetHeight <= (obstacle[i].offsetTop + 20))
            && ((elem.offsetLeft + elem.offsetWidth) > obstacle[i].offsetLeft)
            && ((elem.offsetLeft + elem.offsetWidth) < (obstacle[i].offsetLeft +obstacle[i].offsetWidth + elem.offsetWidth))
            && vy > 0) {

            initPosOfX = posOfX;
            initPosOfY = posOfY;
            uy = -vy;
            time = 0;
        }

        //hit bottom side of obstacle
        if((elem.offsetTop >= (obstacle[i].offsetTop + obstacle[i].offsetHeight  - 20))
            && (elem.offsetTop <= (obstacle[i].offsetTop + obstacle[i].offsetHeight))
            && ((elem.offsetLeft + elem.offsetWidth) > obstacle[i].offsetLeft)
            && ((elem.offsetLeft + elem.offsetWidth) < (obstacle[i].offsetLeft +obstacle[i].offsetWidth + elem.offsetWidth))
            && vy < 0) {

            initPosOfX = posOfX;
            initPosOfY = posOfY;
            uy = -vy;
            time = 0;
        }
    }
}

var updateTargetVisiblity = function() {
    var i;
    var j;
    for (i = 0; i < target.length; i++ ) {
        for (j = 0; j < target[i].length; j++) {
            if (checkForHit(target[i][j])) {
                break;
            }
        }

        for (k = j; k < target[i].length; k++) {
            target[i][k].style.display = "none";
            console.log("target hit: " + i + k);
        }

        if (j === 0) {
            noOfBlockOfTargetCLeared[i] = 1;
        }
    }
}

var reDrawLine = function() {
    var x1 = 215;
    var y1 = block.offsetTop;
    var x2 = elem.offsetLeft;
    var y2 = elem.offsetTop;
    var newX = Math.round((x1 + x2)/2);
    var newY = Math.round((y1 + y2)/2 - lengthOfRope/2);
    var angle = Math.round(Math.atan(-(x2 - x1) / (y2 - y1)) / Math.PI * 180);
    lengthOfRope = Math.round(Math.sqrt((x1 - x2)*(x1 - x2) +(y1 - y2)*(y1 - y2)));
    line.style.height = lengthOfRope + "px";
    line.style.top = newY + "px";
    line.style.left = newX + "px";
    line.style.transform = "rotate(" + angle + "deg)";
}

var checkForHit = function(eachTarget) {
    var result = false;
    if ((eachTarget.offsetLeft <= elem.offsetLeft + elem.offsetWidth) && (elem.offsetLeft + elem.offsetWidth <= eachTarget.offsetLeft + elem.offsetWidth + eachTarget.offsetWidth) &&
        (eachTarget.offsetTop <= elem.offsetTop + elem.offsetHeight) && (elem.offsetTop + elem.offsetHeight <= eachTarget.offsetTop + elem.offsetHeight + eachTarget.offsetHeight)) {
        result = true;
    }

    return result;
}

var frame = function() {
    if (posOfX <= 2000 && posOfX >= -100 && posOfY >= -100 && posOfY <= 700) {
        time = time + 0.01;
        posOfX = initPosOfX + time * ux;
        posOfY = initPosOfY + uy * time + 1/2 * 1000 * time * time;
        vy = uy + 1000 * time;
        elem.style.left = posOfX + "px";
        elem.style.top = posOfY + "px";

        // console.log("t: " + time + " X: " + posOfX + " Y: " + posOfY);
        updateRebound();
        updateTargetVisiblity();

        console.log("noOfBlockOfTargetCLeared: " + noOfBlockOfTargetCLeared[0], noOfBlockOfTargetCLeared[1], noOfBlockOfTargetCLeared[2]);

        if (checkAllBlockOfTargetClear()) {
            clearInterval(animation);
            removeElement();
            createElement();
            initalise();
            dragElement(elem);
        }
    }

    else {
        elem.style.left = "215px";
        elem.style.top = "520px";
        time = 0;
        line.style.transform = "rotate(0deg)";
        line.style.height = "70px";
        line.style.left = "215px";
        line.style.top = "450px";
        time = 0;
        clearInterval(animation);
        dragElement(elem);
    }
}

function myMove() {
    initPosOfX = elem.offsetLeft;
    initPosOfY = elem.offsetTop;
    posOfX = initPosOfX;
    posOfY = initPosOfY;
    console.log("initPosOfX: " +initPosOfX + " initPosOfY: " + initPosOfY);
    var extension = lengthOfRope - orginalLengthOfRope;
    var maxExtension = maxLengthOfRope - orginalLengthOfRope;

    if (lengthOfRope > orginalLengthOfRope) {
        ux = (block.offsetLeft - elem.offsetLeft) * (extension/lengthOfRope) * (maxLaunchSpeed/maxExtension);
        uy = (block.offsetTop - elem.offsetTop) * (extension/lengthOfRope) * (maxLaunchSpeed/maxExtension);
    }

    else {
        ux = 0;
        uy = 0;
    }

    animation = setInterval(frame, 10);
}


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    var squareDistance = (elmnt.offsetTop - pos2 - block.offsetTop) *
                            (elmnt.offsetTop - pos2 - block.offsetTop) +
                            (elmnt.offsetLeft - pos1 - block.offsetLeft) * (elmnt.offsetLeft - pos1 - block.offsetLeft);
    lengthOfRope = Math.floor(Math.sqrt(squareDistance));

    if (lengthOfRope <= maxLengthOfRope) {
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        reDrawLine();
    }

    else {
        elmnt.style.left
        =(block.offsetLeft * (1 - maxLengthOfRope/lengthOfRope)
            + (maxLengthOfRope/lengthOfRope)*(elmnt.offsetLeft - pos1)) + "px";

        elmnt.offsetTop
        =(block.offsetTop * (1 - maxLengthOfRope/lengthOfRope)
            + (maxLengthOfRope/lengthOfRope)*(elmnt.offsetTop - pos2)) + "px";
        reDrawLine();
    }
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
    console.log("After mouseup, the green dot X: " + elmnt.offsetLeft + " Y: " + elmnt.offsetTop);
    myMove();
  }
}

createElement();
initalise();
dragElement(elem);