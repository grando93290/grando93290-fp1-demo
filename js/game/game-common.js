// Game view object
var gameId;
var gameView;
var gameCanvas;
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

function OpenGameView(_data) {
    gameId = _data.gameId;
    gameColor = _data.gameColor;
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

    gameOriginalWidth = _data.width;
    gameOriginalHeight = _data.height;
    gameAspectRatio = gameOriginalWidth / gameOriginalHeight;

    gameUI = document.createElement('div');
    gameUI.style.position = 'fixed';
    gameUI.style.display = 'block';
    gameView.appendChild(gameUI);

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

    InitializeGame(_data);
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
    window.location.href = "game" + gameId + "finish.html";
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
}
