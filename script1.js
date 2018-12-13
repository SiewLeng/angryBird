var targetCreated;
var maxHeight;
var noOfTarget;
var obstacleCreated;
var totalScore = 0;

var createWrapper = function() {
    wrapperCreated = document.createElement("DIV");
    wrapperCreated.style.backgroundImage = "url('images/sky.png')";
    wrapperCreated.style.width = "1400px";
    wrapperCreated.style.height = "695px";
    wrapperCreated.style.position = "relative";
    wrapperCreated.id = "wrapper";
    document.querySelector("body").appendChild(wrapperCreated);
}

var createLine = function() {
    lineCreated = document.createElement("DIV");
    lineCreated.style.width = "10px";
    lineCreated.style.height = "70px";
    lineCreated.style.background = "black";
    lineCreated.style.position = "absolute";
    lineCreated.style.left = "215px";
    lineCreated.style.top = "450px";
    lineCreated.id = "line";
    document.querySelector("#wrapper").appendChild(lineCreated);
}

var createBlock = function () {
    blockCreated = document.createElement("DIV");
    blockCreated.style.width = "54px";
    blockCreated.style.height = "230px";
    blockCreated.style.backgroundImage = "url('images/block.png')";
    blockCreated.style.position = "absolute";
    blockCreated.style.left = "200px";
    blockCreated.style.right = "450px";
    blockCreated.id = "block";
    document.querySelector("#wrapper").appendChild(blockCreated);
}

var createDrag = function () {
    dragCreated = document.createElement("DIV");
    dragCreated.style.width = "45px";
    dragCreated.style.height = "45px";
    dragCreated.style.backgroundImage = "url('images/bird.png')";
    dragCreated.style.position = "absolute";
    dragCreated.style.left = "215px";
    dragCreated.style.right = "450px";
    dragCreated.id = "drag";
    document.querySelector("#wrapper").appendChild(dragCreated);
}

var createTargetList = function(name, leftPosition) {
    maxHeight = Math.floor(Math.random() * 351) + 170;
    noOfTarget = Math.floor((maxHeight - 20)/60) ;

    for (i = 0; i < noOfTarget; i++) {
        targetCreated = document.createElement("DIV");
        targetCreated.style.width = "60px";
        targetCreated.style.height = "60px";
        targetCreated.style.backgroundImage = "url('images/target.png')";
        targetCreated.style.position = "absolute";
        targetCreated.style.left = (560 + leftPosition * 300) + "px";
        targetCreated.style.top = (maxHeight - 60*i) + "px";
        targetCreated.style.border = "0px";
        targetCreated.className = name;
        document.querySelector("#wrapper").appendChild(targetCreated);
    }
}

var createObstacle = function (leftPosition) {
    obstacleCreated = document.createElement("DIV");
    obstacleCreated.style.width = "200px";
    obstacleCreated.style.height = "50px";
    obstacleCreated.style.backgroundImage = "url('images/obstacle.png')";
    obstacleCreated.style.position = "absolute";
    obstacleCreated.style.left = (490 + leftPosition * 300) +"px";
    obstacleCreated.style.top = (maxHeight + 62) + "px";
    obstacleCreated.style.border = "1px";
    obstacleCreated.className = "obstacle";
    document.querySelector("#wrapper").appendChild(obstacleCreated);
}

var createScoreBoard = function () {
    scoreBoardCreated = document.createElement("DIV");
    scoreBoardCreated.style.width = "500px";
    scoreBoardCreated.style.height = "100px";
    scoreBoardCreated.style.opacity = "1.0";
    scoreBoardCreated.style.position = "absolute";
    scoreBoardCreated.style.left = "30px"
    scoreBoardCreated.style.top = "30px";
    scoreBoardCreated.style.padding = "30px";
    scoreBoardCreated.id = "scoreBoard";
    scoreBoardCreated.style.fontSize = "300%";
    scoreBoardCreated.style.fontWeight = "900";
    scoreBoardCreated.style.fontFamily = "Arial";
    scoreBoardCreated.textContent = "Score: " + totalScore;
    document.querySelector("#wrapper").appendChild(scoreBoardCreated);
}
