// Game view object
var gameId;
var gameView;
var gameCanvas;
var gameLandscapePrompt, gameLandscapePromptSub;
var gameStage;
var gameUI;
var gameColor;

// Buffer
var buffer_bodyStyleOverflow, buffer_documentElementStyleOverflow;
var buffer_bodyStyleTouchAction, buffer_documentElementStyleTouchAction;

// Resize
var gameOriginalWidth;
var gameOriginalHeight;
var gameAspectRatio;
var gameCanvasWidth = window.innerWidth;
var gameCanvasHeight = window.innerHeight;
var gameCanvasScale = 1;

// New Fix
var endGameUrl;

function OpenGameView(_data) {
    gameId = _data.gameId;
    if ('gameColor' in _data) {
        gameColor = _data.gameColor;
    } else {
        if (gameId == 1) {
            gameColor = '#DADC87';
        } else if (gameId == 2) {
            gameColor = '#3C5942';
        } else if (gameId == 3) {
            gameColor = '#9DDCD4';
        } else if (gameId == 4) {
            gameColor = '#EBC0A2';
        } else if (gameId == 5) {
            gameColor = '#F8EAC4';
        }
    }
    if ('url' in _data) {
        endGameUrl = _data.url;
    } else {
        endGameUrl = '';
    }
    gameView = document.createElement('div');
    gameView.style.position = 'fixed';
    gameView.style.top = '0';
    gameView.style.left = '0';
    gameView.style.width = '100%';
    gameView.style.height = '100%';
    gameView.style.backgroundColor = gameColor;
    gameView.style.zIndex = '1000';
    gameView.style.display = 'flex';
    gameView.style.touchAction = 'none';
    document.body.appendChild(gameView);

    gameCanvas = document.createElement('canvas');
    gameCanvas.style.position = 'fixed';
    gameCanvas.style.display = 'block';
    gameCanvas.style.backgroundColor = gameColor;
    gameView.appendChild(gameCanvas);
    gameStage = new createjs.Stage(gameCanvas);

    // gameOriginalWidth = _data.width;
    // gameOriginalHeight = _data.height;
    gameOriginalWidth = gameId == 2 ? 1920 : 1728;
    gameOriginalHeight = gameId == 2 ? 1080 : 900;
    gameAspectRatio = gameOriginalWidth / gameOriginalHeight;

    gameUI = document.createElement('div');
    gameUI.style.position = 'fixed';
    gameUI.style.display = 'block';
    gameView.appendChild(gameUI);

    gameLandscapePrompt = document.createElement('div');
    gameLandscapePrompt.style.position = 'fixed';
    gameLandscapePrompt.style.display = 'block';
    gameLandscapePrompt.style.backgroundColor = '#FBF7E9';
    gameView.appendChild(gameLandscapePrompt);

    gameLandscapePromptSub = document.createElement('div');
    gameLandscapePromptSub.style.position = 'absolute';
    gameLandscapePromptSub.style.display = 'block';
    gameLandscapePromptSub.style.backgroundColor = '#FBF7E9';
    gameLandscapePrompt.appendChild(gameLandscapePromptSub);

    let gameLandscapePromptImg = document.createElement('div');
    gameLandscapePromptImg.style.position = 'absolute';
    gameLandscapePromptImg.style.display = 'block';
    gameLandscapePromptImg.style.left = '22.11%';
    gameLandscapePromptImg.style.width = '55.78%';
    gameLandscapePromptImg.style.top = '16.11%';
    gameLandscapePromptImg.style.height = '39.6%';
    gameLandscapePromptImg.style.border = 'none';
    gameLandscapePromptImg.style.backgroundSize = 'cover';
    gameLandscapePromptImg.style.backgroundPosition = 'center';
    gameLandscapePromptImg.style.backgroundRepeat = 'no-repeat';
    gameLandscapePromptImg.style.backgroundImage = "url(img/gameCommon/LandscapePromptImg-min.png)";
    gameLandscapePromptSub.appendChild(gameLandscapePromptImg);

    let gameLandscapePromptBtn = document.createElement('div');
    gameLandscapePromptBtn.style.position = 'absolute';
    gameLandscapePromptBtn.style.display = 'block';
    gameLandscapePromptBtn.style.left = '27.78%';
    gameLandscapePromptBtn.style.width = '44.44%';
    gameLandscapePromptBtn.style.top = '72.33%';
    gameLandscapePromptBtn.style.height = '11.52%';
    gameLandscapePromptBtn.style.border = 'none';
    gameLandscapePromptBtn.style.backgroundSize = 'cover';
    gameLandscapePromptBtn.style.backgroundPosition = 'center';
    gameLandscapePromptBtn.style.backgroundRepeat = 'no-repeat';
    gameLandscapePromptBtn.style.backgroundImage = "url(img/gameCommon/LandscapePromptBtn-min.png)";
    gameLandscapePromptSub.appendChild(gameLandscapePromptBtn);
    gameLandscapePromptBtn.addEventListener('click', BackToWeb);

    buffer_bodyStyleOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    buffer_documentElementStyleOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    buffer_bodyStyleTouchAction = document.body.style.touchAction;
    document.body.style.touchAction = 'none';
    buffer_documentElementStyleTouchAction = document.documentElement.style.touchAction;
    document.documentElement.style.touchAction = 'none';

    if (gameView.requestFullscreen) {
        gameView.requestFullscreen();
    } else if (gameView.webkitRequestFullscreen) {
        gameView.webkitRequestFullscreen();
    } else if (gameView.msRequestFullscreen) {
        gameView.msRequestFullscreen();
    }

    window.addEventListener('resize', ResizeGameView);
    ResizeGameView();

    switch (gameId) {
        case 1:
            InitializeGame1(_data);
            break;
        case 2:
            InitializeGame2(_data);
            break;
        case 3:
            InitializeGame3(_data);
            break;
        case 4:
            InitializeGame4(_data);
            break;
        case 5:
            InitializeGame5(_data);
            break;
    }

}

function ExitGameView() {
    if (!gameView) {
        return;
    }
    window.removeEventListener("resize", ResizeGameView);
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    document.body.removeChild(gameView);
    document.body.style.overflow = buffer_bodyStyleOverflow;
    document.documentElement.style.overflow = buffer_documentElementStyleOverflow;
    document.body.style.touchAction = buffer_bodyStyleTouchAction;
    document.documentElement.style.touchAction = buffer_documentElementStyleTouchAction;
    gameView = null;
    if (endGameUrl == '') {
        window.location.href = '/線上遊戲?game=' + gameId;
    } else {
        window.location.href = endGameUrl;
    }
}

function BackToWeb() {
    if (!gameView) {
        return;
    }
    window.removeEventListener("resize", ResizeGameView);
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    document.body.removeChild(gameView);
    document.body.style.overflow = buffer_bodyStyleOverflow;
    document.documentElement.style.overflow = buffer_documentElementStyleOverflow;
    document.body.style.touchAction = buffer_bodyStyleTouchAction;
    document.documentElement.style.touchAction = buffer_documentElementStyleTouchAction;
    gameView = null;
    window.location.href = '/線上遊戲?return=' + gameId;
}

function ResizeGameView() {
    const gameInnerWidth = window.innerWidth;
    const gameInnerHeight = window.innerHeight;
    const windowAspectRatio = gameInnerWidth / gameInnerHeight;
    let borderW = 0, borderH = 0;
    if (windowAspectRatio > gameAspectRatio) {
        gameCanvasHeight = gameInnerHeight;
        gameCanvasWidth = gameCanvasHeight * gameAspectRatio;
        borderW = (gameInnerWidth - gameCanvasWidth) * 0.5;
    } else {
        gameCanvasWidth = gameInnerWidth;
        gameCanvasHeight = gameCanvasWidth / gameAspectRatio;
        borderH = (gameInnerHeight - gameCanvasHeight) * 0.5;
    }
    gameCanvasScale = gameCanvasWidth / gameOriginalWidth;
    gameCanvas.width = gameCanvasWidth;
    gameCanvas.height = gameCanvasHeight;
    gameCanvas.style.width = gameUI.style.width = `${gameCanvasWidth}px`;
    gameCanvas.style.height = gameUI.style.height = `${gameCanvasHeight}px`;
    gameCanvas.style.left = gameUI.style.left = `${borderW}px`;
    gameCanvas.style.top = gameUI.style.top = `${borderH}px`;
    gameStage.scaleX = gameCanvasScale;
    gameStage.scaleY = gameCanvasScale;
    gameStage.update();
    window.scrollTo(0, 1);

    if (gameInnerHeight > gameInnerWidth) {
        gameLandscapePrompt.style.width = `${gameInnerWidth}px`;
        gameLandscapePrompt.style.height = `${gameInnerHeight}px`;
        gameLandscapePromptSub.style.top = `${(gameInnerHeight - gameInnerWidth) * 0.5}px`;
        gameLandscapePromptSub.style.width = `${gameInnerWidth}px`;
        gameLandscapePromptSub.style.height = `${gameInnerWidth}px`;
        gameLandscapePrompt.style.display = "block";
    } else {
        gameLandscapePrompt.style.display = "none";
    }

}

function PlayAudio(_audio) {
    _audio.currentTime = 0;
    _audio.play();
}

function GetRandomNumbers(min, max, count) {
    const range = Array.from({ length: max - min + 1 }, (_, i) => min + i); // Create array [min, ..., max]
    for (let i = range.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index
        [range[i], range[j]] = [range[j], range[i]]; // Swap elements
    }
    return range.slice(0, count); // Take the first `count` elements
}