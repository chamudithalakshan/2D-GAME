var moveBoxesAnimationId = 0;
var score = 0;
var boxMarginLeft = 1000;
var flyDragonAnimationId = 0;
var boyRealMarginLeft = 0;
var dragonNewMarginLeft = 0;
var dragonMarginLeft = 3500;
var backgroundImagePositionX = 0;
var backgrounAnimationId = 0;
var boyIdleImageNumber = 1;
var boyIdleAnimationId = 0;
var boyRunImageNumber = 1;
var boyRunAnimationId = 0;
var boyJumpImageNumber = 1;
var boyJumpAnimationId = 0;
var boyHighJump = 340;
var boyDeadAnimationId = 0;
var boyDeadImageNumber = 0;
var deadPosition = 340;
var newMarginLeft = 0;
var homeMarginLeft = 0;
var newHomeMarginLeft = 7800;
var newHomeAnimationId = 0;
var boyRealimageNumber = 0;
var boyRealRunAnimationId = 0;
var boySlideImageNumber = 0;
var boySlideAnimationId = 0;
var GameControllPageNumber = 0;
var ScoreNumber = 0;
var runAudio = new Audio("Resources/run.mp3");
runAudio.loop = true;
var deadAudio = new Audio("Resources/dead.mp3");
var jumpAudio = new Audio("Resources/jump.mp3");
var winAudio = new Audio("Resources/winGame1.wav");
var victoryAudio = new Audio("Resources/victorySound.wav");
var openAudio = new Audio("Resources/startGame.mp3");
openAudio.loop = true;




function onloadAnimation() {
    boyIdleAnimationId = setInterval(boyIdleAnimation, 100);
    createBoxes();
    boyHome();
    flyDragon();

}

function keyCheck(event) {
    var keyCode = event.which;
    // alert(keyCode);
    if (keyCode == 13) {
        //Enter
        if (boyRunAnimationId == 0) {
            if (backgrounAnimationId == 0) {
                backgrounAnimationId = setInterval(moveBackground, 100);
            }

            if (moveBoxesAnimationId == 0) {
                moveBoxesAnimationId = setInterval(moveBoxes, 100);
            }
            GameControllPage();
            clearInterval(boyIdleAnimationId);
            boyRunAnimationId = setInterval(boyRunAnimation, 100);
            runAudio.play();
        }
        if (flyDragonAnimationId == 0) {
            flyDragonAnimationId = setInterval(flyDragonAnimation, 100);
        }
        if (newHomeAnimationId == 0) {
            newHomeAnimationId = setInterval(boyHomeAnimation, 100);
        }
    }
    if (keyCode == 32) {
        //Space

        if (boyJumpAnimationId == 0) {
            clearInterval(boyIdleAnimationId);
            clearInterval(boyRunAnimationId);
            GameControllPage();
            boyJumpAnimationId = setInterval(boyJumpAnimation, 100);
            runAudio.pause();
            jumpAudio.play();
            jumpAudio.currentTime = 0;
        }

    }
    if (boyRunAnimationId !== 0) {
        if (keyCode == 16) {
            //Left Shift
            if (boySlideAnimationId == 0) {
                clearInterval(boyIdleAnimationId);
                clearInterval(boyRunAnimationId);
                clearInterval(boyJumpAnimationId);
                GameControllPage();
                boySlideAnimationId = setInterval(boySlideAnimation, 100);
                runAudio.pause();
                jumpAudio.play();
                jumpAudio.currentTime = 0;

            }
        }
    }
}

function moveBackground() {
    backgroundImagePositionX -= 10;
    document.getElementById("background").style.backgroundPositionX = backgroundImagePositionX + "px";

    ScoreNumber = document.getElementById("score");
    score = score + 1;
    if (score == 150) {
        ScoreNumber.className = "score1"
    }
    if (score == 250) {
        ScoreNumber.className = "score2"
    }
    if (score == 350) {
        ScoreNumber.className = "score3"
    }
    ScoreNumber.innerHTML = score;

}

function boyIdleAnimation() {

    boyIdleImageNumber += 1;
    if (boyIdleImageNumber == 11) {
        boyIdleImageNumber = 1;
    }
    document.getElementById("boy").src = "Resources/Idle (" + boyIdleImageNumber + ").png";
}

function boyRunAnimation() {
    boyRunImageNumber += 1;

    if (boyRunImageNumber == 9) {
        boyRunImageNumber = 1;

    }
    document.getElementById("boy").src = "Resources/Run (" + boyRunImageNumber + ").png";
    runAudio.play();
}

function boyRealRunAnimation() {

    boyRealimageNumber += 1;
    boyRealMarginLeft += 10;
    if (boyRealimageNumber == 9) {
        boyRealimageNumber = 1;
    }
    document.getElementById("boy").src = "Resources/Run (" + boyRealimageNumber + ").png";
    document.getElementById("boy").style.marginLeft = boyRealMarginLeft + "px";
}

function boyJumpAnimation() {
    boyJumpImageNumber += 1;
    if (backgrounAnimationId == 0) {
        backgrounAnimationId = setInterval(moveBackground, 100);
    }

    if (boyJumpImageNumber <= 7) {
        boyHighJump -= 25;
        document.getElementById("boy").style.marginTop = boyHighJump + "px";
    }

    if (boyJumpImageNumber >= 8) {
        boyHighJump += 25;
        document.getElementById("boy").style.marginTop = boyHighJump + "px";
    }

    if (boyJumpImageNumber == 13) {
        boyJumpImageNumber = 1;
        clearInterval(boyJumpAnimationId);
        boyJumpAnimationId = 0;
        boyRunAnimationId = setInterval(boyRunAnimation, 100);

    }

    document.getElementById("boy").src = "Resources/Jump (" + boyJumpImageNumber + ").png";

    if (moveBoxesAnimationId == 0) {
        moveBoxesAnimationId = setInterval(moveBoxes, 100);
    }
    if (newHomeAnimationId == 0) {
        newHomeAnimationId = setInterval(boyHomeAnimation, 100);
    }
    if (flyDragonAnimationId == 0) {
        flyDragonAnimationId = setInterval(flyDragonAnimation, 100);
    }

}

function boySlideAnimation() {

    boyHighJump = 349;

    boySlideImageNumber += 1;

    if (backgrounAnimationId == 0) {
        backgrounAnimationId = setInterval(moveBackground, 100);
    }
    if (boySlideImageNumber == 6) {

        boySlideImageNumber = 1;
        dragonNewMarginLeft += 5;
        clearInterval(boySlideAnimationId);
        boySlideAnimationId = 0;
        boyHighJump = 340;
        boyRunAnimationId = setInterval(boyRunAnimation, 100);

    }

    document.getElementById("boy").src = "Resources/Slide (" + boySlideImageNumber + ").png";

}

function boyDeadAnimation() {
    boyDeadImageNumber += 1;
    boy = document.getElementById("boy");
    if (boyDeadImageNumber == 11) {
        boyDeadImageNumber = 10;
        clearInterval(boyDeadAnimationId);
        gamelost();

    }
    document.getElementById("boy").src = "Resources/Dead (" + boyDeadImageNumber + ").png";
    document.getElementById("boy").style.marginTop = deadPosition + "px";
}


function createBoxes() {

    for (var i = 0; i < 10; i++) {
        if (i < 5) {
            boxMarginLeft = boxMarginLeft + 1000;
        }
        if (i >= 6) {
            boxMarginLeft = boxMarginLeft + 500;
        }
        var boxPolo = document.createElement("div");
        boxPolo.className = "box";
        boxPolo.id = "boxPolo" + i;
        boxPolo.style.marginLeft = boxMarginLeft + "px";
        document.getElementById("background").appendChild(boxPolo);

    }
}


function moveBoxes() {
    for (var i = 0; i < 10; i++) {
        var boxPolo = document.getElementById("boxPolo" + i);
        var currentMarginLeft = getComputedStyle(boxPolo).marginLeft;
        newMarginLeft = parseInt(currentMarginLeft) - 20;
        boxPolo.style.marginLeft = newMarginLeft + "px";
        // alert(newMarginLeft);

        if (newMarginLeft >= 80 & newMarginLeft <= 180) {
            if (boyHighJump >= 280) {
                clearInterval(backgrounAnimationId);
                backgrounAnimationId = -1;
                clearInterval(moveBoxesAnimationId);
                moveBoxesAnimationId = -1;
                clearInterval(boyIdleAnimationId);
                boyIdleAnimationId = -1;
                clearInterval(boyRunAnimationId);
                boyRunAnimationId = -1;
                clearInterval(boyJumpAnimationId);
                boyJumpAnimationId = -1;
                clearInterval(flyDragonAnimationId);
                flyDragonAnimationId = -1;
                clearInterval(newHomeAnimationId);
                newHomeAnimationId = -1;
                clearInterval(boySlideAnimationId);
                boySlideAnimationId = -1;
                boyDeadAnimationId = setInterval(boyDeadAnimation, 200);
                runAudio.pause();
                runAudio.currentTime = 0;
                jumpAudio.pause();
                jumpAudio.currentTime = 0;
                deadAudio.play();
                deadAudio.currentTime = 0;

            }
        }

        if (newMarginLeft == -7000) {
            clearInterval(backgrounAnimationId);
            clearInterval(boyRunAnimationId);
            clearInterval(boySlideAnimationId);
            clearInterval(boyJumpAnimationId);
            clearInterval(flyDragonAnimationId);
            clearInterval(newHomeAnimationId);
            if (boyRealRunAnimationId == 0) {
                boyRealRunAnimationId = setInterval(boyRealRunAnimation, 100);
                victoryAudio.play();
            }
            document.getElementById("boy").style.zIndex = 1000;
            document.getElementById("home").style.zIndex = 200;
            runAudio.pause();
            runAudio.currentTime = 0;
            jumpAudio.pause();
            jumpAudio.currentTime = 0;
            deadAudio.pause();
            deadAudio.currentTime = 0;


        }
        if (newMarginLeft == -8500) {
            clearInterval(boyRealRunAnimationId);
            clearInterval(moveBoxesAnimationId);
            document.getElementById("boy").style.zIndex = 200;
            document.getElementById("home").style.zIndex = 1000;
            gameWon();
            openAudio.play();
        }
        if (score == 440) {
            ScoreNumber.className = "Finalscore";
        }
    }
}

function boyHome() {
    var home = document.createElement("div");
    home.className = "box2";
    home.id = "home";
    home.style.marginLeft = 5200 + "px"
    document.getElementById("background").appendChild(home);
}

function boyHomeAnimation() {
    var home = document.getElementById("home");
    var currentMarginLeft = getComputedStyle(home).marginLeft;
    newHomeMarginLeft = parseInt(currentMarginLeft) - 10;
    home.style.marginLeft = newHomeMarginLeft + "px";
}




function flyDragon() {
    for (var x = 0; x < 5; x++) {
        if (x < 2) {
            dragonMarginLeft += 1200;
        }
        if (x >= 2) {
            dragonMarginLeft += 1500;
        }
        if (x >= 3) {
            dragonMarginLeft += 2000;
        }
        var dragon = document.createElement("div");
        dragon.className = "box3";
        dragon.id = "dragon" + x;
        dragon.style.marginLeft = dragonMarginLeft + "px"
        document.getElementById("background").appendChild(dragon);
    }

}

function flyDragonAnimation() {
    for (var x = 0; x < 5; x++) {
        var dragon = document.getElementById("dragon" + x);
        var currentMarginLeft = getComputedStyle(dragon).marginLeft;
        dragonNewMarginLeft = parseInt(currentMarginLeft) - 35;
        dragon.style.marginLeft = dragonNewMarginLeft + "px";

        if (dragonNewMarginLeft >= 140 & dragonNewMarginLeft <= 180) {
            if (boyHighJump <= 340) {
                clearInterval(backgrounAnimationId);
                backgrounAnimationId = -1;
                clearInterval(moveBoxesAnimationId);
                moveBoxesAnimationId = -1;
                clearInterval(boyIdleAnimationId);
                boyIdleAnimationId = -1;
                clearInterval(boyRunAnimationId);
                boyRunAnimationId = -1;
                clearInterval(boyJumpAnimationId);
                boyJumpAnimationId = -1;
                clearInterval(flyDragonAnimationId);
                flyDragonAnimationId = -1;
                clearInterval(newHomeAnimationId);
                newHomeAnimationId = -1;
                clearInterval(boySlideAnimationId);
                boySlideAnimationId = -1;
                boyDeadAnimationId = setInterval(boyDeadAnimation, 200);
                runAudio.pause();
                runAudio.currentTime = 0;
                jumpAudio.pause();
                jumpAudio.currentTime = 0;
                deadAudio.play();
                deadAudio.currentTime = 0;
            }
        }

    }

}


function Audiobutton() {}

var fboyImageNumber = 0;
var fboyAnimationId = 0;
var backSoundPlayId = 0;

function fRunBoy() {
    fboyImageNumber += 1;
    if (fboyImageNumber == 9) {
        fboyImageNumber = 1;
    }
    document.getElementById("boy1").src = "Resources/Run (" + fboyImageNumber + ").png";
    // if (backSoundPlayId == 0) {
    //     backSoundPlay();
    // }
}

function firstPage() {
    fboyAnimationId = setInterval(fRunBoy, 100);
    document.getElementById("welcomepage");
    openAudio.play();
}



function welcomeNote() {
    // alert("wade");
    document.getElementById("welcomepage").remove();
    openAudio.play();
}

function gamelost() {
    var gameDiv = document.getElementById("lostPage");
    gameDiv.className = "lostPage2";
    openAudio.play();
}


function gameWon() {
    var gameWonDiv = document.getElementById("wonPage");
    gameWonDiv.className = "wonPage2";
}

function GameControllPage() {
    GameControllPageNumber = document.getElementById("GameControll");
    GameControllPageNumber.className = "displayNone";
}