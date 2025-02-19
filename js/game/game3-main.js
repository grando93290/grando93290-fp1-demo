var gameSharedAssetLibrary;
var gameUILibrary;
var gameUIState;
var gamePopupAudio;
var gamePressAudio;
var gameTrueAudio;
var gameLoadingBar, gameLoadingBarNail;
var gameLoadSceneAction;

var gamePopupUI;
var gameIsShowPopup, gameIsFadePopup, gameIsFirstFrame;

var gameAssetLibrary;
var gameObjectLibrary;
var gameTimeBuffer1, gameTimeBuffer2, gameTimeBuffer3;

var gameDistanceBallon, gameDistanceBallon_upperText, gameDistanceBallon_lowerText, gameDistanceBallon_arrow;
var gameScoreBallon, gameMainButton, gameBackBallon;

var gameAudioCountdown, gameAudioWin, gameAudioLose;

var gameUIMainBox, gameUIMainTitle, gameUIMainImage, gameUIMainButton1, gameUIMainButton2, gameUIMainButton3;
var game_cloud1, game_cloud2, game_cloud3, game_cloud4;
var game_island, game_island1, game_island2, game_sea;
var game_bird1, game_bird2;
var game_wave;
var game_rubbish;
var game_swim, game_swim_blur, game_swim_wave;

const gameInitialDistance = 4.0, gameBtnPressedCountInterval = 0.5, gameBtnLongPressInterval = 0.25, gameAcceleration = 0.08, gameMaxSpeed = 0.08;
const gameDivingInterval = 1.8, gameDivingCDInterval = 1.0;

var gameDistance, gameSpeed, gameTargetSpeed;
var gameBtnPressed = false, gameBtnLongPressed = false, gameBtnPressedTime = 0, gameBtnPressedCount = 0, gameBtnPressedTimeBuffer = 0;
var gameIsDiving = false, gameIsDivingCD = false, gameDivingTimeBuffer = 0;

const gameRubbishFlowInterval = 2.5, gamePenaltyTimeInterval = 2.5;
var gameRubbishFlowedCount, gameIsRubbishFlow = false, gameRubbishTimeBuffer, gameRubbishDirection, gameRubbishAttack, gameRubbishFlowAngle, gameRubbishIsCheckCollide;
var gameIsPenaltyTime = false, gamePenaltyTimeBuffer = 0;

var game_heart;
var gameIsHeartAnim = false, gameHeartAnimBuffer = 0;

var gameCrashAudio, gameDiveAudio, gameSwimAudio, gameWinAudio;
var gameSwimAudioBuffer1, gameSwimAudioBuffer2;

function InitializeGame3(_data) {
    isGameQuestionDebugging = 'forceScene' in _data;
    gameSharedAssetLibrary = new AssetLibrary({
        "ui-back-ballon": {image:"img/gameCommon/backBallon-min.png"},
        "ui-question-count-ballon": {image:"img/gameCommon/greenBallon-min.png"},
        "ui-score-ballon": {image:"img/gameCommon/heartBallon-min.png"},
        "ui-score-ballon2": {image:"img/gameCommon/heartBallon2-min.png"},
        "ui-button": {image:"img/gameCommon/button-min.png"},
        "ui-main-image": {image:"img/game3ui/swim-min.png"},

        "game-popup-audio": {audio:"audio/game/popup.wav"},
        "game-press-audio": {audio:"audio/game/press.mp3"},
        "game-true-audio": {audio:"audio/game/true.wav"},

    }, null, InitializeGame3Scene);
    gamePopupAudio = gameSharedAssetLibrary.data["game-popup-audio"].audio;
    gamePressAudio = gameSharedAssetLibrary.data["game-press-audio"].audio;
    gameTrueAudio = gameSharedAssetLibrary.data["game-true-audio"].audio;
    InitializeGame3UI();
    ShowGame3LoadingUI();
}

function InitializeGame3UI() {
    gameUILibrary = new UILibrary({});
    gameUILibrary.AddUIElements({
        "ui-loading-bg": {transform:{left:'0%', top:'0%', width:'100%', height:'100%'}, image:{imgSrc:"img/gameCommon/loading-bg-min.png"}},
        // "ui-loading-title": {transform:{top:'15.4%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:52, letterSpacing:4, color:'#00693E', text:'「動」破激流'}},
        "ui-loading-title": {transform:{left:'37.61%', top:'13.66%', width:'25.01%', height:'8.88%'}, image:{imgSrc:"img/game3ui/title-3-min.png"}},
        "ui-loading-img-main": {transform:{left:'40.68%', top:'25.88%', width:'19.68%', height:'30.11%'}, image:{imgSrc:"img/game3ui/loading-main-min.png"}},
        // "ui-loading-img-compass": {transform:{left:'53.2%', top:'43.4%', width:'9.03%', height:'16.33%'}, image:{imgSrc:"img/gameCommon/loading-compass-min.png"}},
        "ui-loading-loadingbar": {transform:{left:'30%', top:'64%', width:'40%', height:'1.8%'}, loadingBar:{color1: '#fff', color2: '#F97930', round: 10}},
        "ui-loading-img-nail": {transform:{left:'28%', top:'60%', width:'4%', height:'7.22%'}, image:{imgSrc:"img/gameCommon/loading-nail-min.png"}},
        "ui-loading-img-sound": {transform:{left:'17.5%', top:'77.5%', width:'3.47%', height:'6.67%'}, image:{imgSrc:"img/gameCommon/loading-sound.gif"}},
        "ui-loading-desc1": {transform:{left: '12%', top:'79.5%', width: '40%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'#F97930', text:'請打開聲音玩遊戲'}},
        "ui-loading-img-rotate": {transform:{left:'55.89%', top:'76.42%', width:'4.98%', height:'9.55%'}, image:{imgSrc:"img/gameCommon/loading-rotate.gif"}},
        "ui-loading-desc2": {transform:{left: '52.6%', top:'79.5%', width: '40%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'#F97930', text:'將你的裝置轉成橫向'}},

        "ui-back-ballon": {transform:{left:'5.613%', width:'7.52%', height:'9.59%'}, image:{imgSrc:"img/gameCommon/backBallon-min.png"}},
        "ui-score-count-ballon": {transform:{left:'86.68%', width:'7.52%', height:'9.59%'}, ballon:{imgSrc:"img/gameCommon/heartBallon-min.png", fontFamily:'CustomFont', fontSize:25, letterSpacing:4, color:'white', text:'0'}},
        
        "ui-distance-ballon": {transform:{left:'42.77%', top:'7.89%', width:'14.47%', height:'14.78%'}, image:{imgSrc:"img/game3ui/ballon-min.png"}},
        "ui-distance-ballon-uppertext": {transform:{left:'0%', top:'11.33%', width:'100%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:24, letterSpacing:2, color:'#636363', text:'距離小島'}},
        "ui-distance-ballon-lowertext": {transform:{left:'0%', top:'14.77%', width:'100%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:40, letterSpacing:2, color:'#F97930', text:'12公里'}},
        "ui-distance-ballon-arrow": {transform:{left:'49.02%', top:'20.78%', width:'1.97%', height:'3.78%'}, image:{imgSrc:"img/game3ui/arrow-min.png"}},

        "ui-button-main": {transform:{left:'89.58%', top:'80%', width:'6.94%', height:'13.33%'}, image:{imgSrc:"img/game3ui/button-min.png"}},

        "ui-main-bg": {transform:{left:'15.28%', top:'11.11%', width:'69.44%', height:'77.78%'}, roundRect:{color:'white', round:150}},
        "ui-main-title": {transform:{top:'27.5%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:40, letterSpacing:4, color:'#00693E', text:'完成遊戲', lineHeight: 70}},
        "ui-main-image": {transform:{left:'37.7%', top:'40%', width:'27.25%', height:'12.44%'}, image:{imgSrc:"img/game3ui/swim-min.png"}},
        "ui-main-button1": {transform:{left:'33.1%', top:'61.5%', width:'16%', height:'9.36%'}, button:{imgSrc:"img/gameCommon/button-min.png", round:10, fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'white', text:'再玩一次', onclick:()=>{OnClickGame3UIButton(1);}}},
        "ui-main-button2": {transform:{left:'50.9%', top:'61.5%', width:'16%', height:'9.36%'}, button:{imgSrc:"img/gameCommon/button-min.png", round:10, fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'white', text:'離開遊戲', onclick:()=>{OnClickGame3UIButton(2);}}},

        "ui-popup": {transform:{left:'30%', top:'28.66%', width:'40%', height:'33%'}, image:{imgSrc:"img/game3ui/popup-min.png"}},

        // "ui-test": {transform:{left:'0', top:'0', width:'100%', height:'100%'}, image:{imgSrc:"img/game3ui/2.jpg"}},
    });

    gameUILibrary.AddUIResizeEvent();
    gameUIState = 0;

    gameLoadingBar = gameUILibrary.data["ui-loading-loadingbar"];
    gameLoadingBarNail = gameUILibrary.data["ui-loading-img-nail"];

    gameScoreBallon = gameUILibrary.data["ui-score-count-ballon"];
    gameScoreBallon.AddCoveredBallon({imgSrc2:"img/gameCommon/heartBallon2-min.png"});

    gameDistanceBallon = gameUILibrary.data["ui-distance-ballon"];
    gameDistanceBallon_upperText = gameUILibrary.data["ui-distance-ballon-uppertext"];
    gameDistanceBallon_lowerText = gameUILibrary.data["ui-distance-ballon-lowertext"];
    gameDistanceBallon_arrow = gameUILibrary.data["ui-distance-ballon-arrow"];

    gameBackBallon = gameUILibrary.data["ui-back-ballon"];
    gameBackBallon.dom.addEventListener('click', BackToWeb);

    gameUIMainBox = gameUILibrary.data["ui-main-bg"];
    gameUIMainTitle = gameUILibrary.data["ui-main-title"];
    gameUIMainDesc = gameUILibrary.data["ui-main-desc"];
    gameUIMainImage = gameUILibrary.data["ui-main-image"];
    gameUIMainButton1 = gameUILibrary.data["ui-main-button1"];
    gameUIMainButton2 = gameUILibrary.data["ui-main-button2"];

    gamePopupUI = gameUILibrary.data["ui-popup"];

    gameMainButton = gameUILibrary.data["ui-button-main"];
    gameMainButton.dom.addEventListener("pointerdown", OnKeyDownGameBtn);
    document.addEventListener("pointerup", OnKeyUpGameBtn);
    document.addEventListener("keydown", OnKeyDownSpace);
    document.addEventListener("keyup", OnKeyUpSpace);

    // gameUILibrary.data["ui-test"].SetEnabled(true);
    // gameUILibrary.data["ui-test"].dom.style.opacity = '50%';
}

function OnKeyDownGameBtn(_evt) {
    if (gameBtnPressed) return;
    gameBtnPressed = true;
    gameBtnPressedTime = 0;
}

function OnKeyDownSpace(_evt) {
    if (_evt.code === "Space") {
        _evt.preventDefault();
        OnKeyDownGameBtn(_evt);
    }
}

function OnKeyUpGameBtn(_evt) {
    if (gameBtnPressed) {
        gameBtnPressedCount++;
    }
    gameBtnPressed = false;
    gameBtnLongPressed = false;
}

function OnKeyUpSpace(_evt) {
    if (_evt.code === "Space") {
        _evt.preventDefault();
        OnKeyUpGameBtn(_evt);
    }
}

function ShowGame3LoadingUI() {
    gameUILibrary.data["ui-loading-bg"].SetEnabled(true);
    gameUILibrary.data["ui-loading-title"].SetEnabled(true);
    gameUILibrary.data["ui-loading-img-main"].SetEnabled(true);
    // gameUILibrary.data["ui-loading-img-compass"].SetEnabled(true);
    gameUILibrary.data["ui-loading-loadingbar"].SetEnabled(true);
    gameUILibrary.data["ui-loading-img-nail"].SetEnabled(true);
    gameUILibrary.data["ui-loading-img-sound"].SetEnabled(true);
    gameUILibrary.data["ui-loading-desc1"].SetEnabled(true);
    gameUILibrary.data["ui-loading-img-rotate"].SetEnabled(true);
    gameUILibrary.data["ui-loading-desc2"].SetEnabled(true);
}

function UpdateGame3LoadingBar(_progress) {
    gameLoadingBar.UpdateLoadingBar(_progress);
    gameLoadingBarNail.Update({left: (27+((_progress/100)*44))+'%'});
}

function HideGame3LoadingUI() {
    gameUILibrary.data["ui-loading-bg"].SetEnabled(false);
    gameUILibrary.data["ui-loading-title"].SetEnabled(false);
    gameUILibrary.data["ui-loading-img-main"].SetEnabled(false);
    // gameUILibrary.data["ui-loading-img-compass"].SetEnabled(false);
    gameUILibrary.data["ui-loading-loadingbar"].SetEnabled(false);
    gameUILibrary.data["ui-loading-img-nail"].SetEnabled(false);
    gameUILibrary.data["ui-loading-img-sound"].SetEnabled(false);
    gameUILibrary.data["ui-loading-desc1"].SetEnabled(false);
    gameUILibrary.data["ui-loading-img-rotate"].SetEnabled(false);
    gameUILibrary.data["ui-loading-desc2"].SetEnabled(false);
    UpdateGame3LoadingBar(0);
}

function InitializeGame3Scene() {
    gameAssetLibrary = new AssetLibrary({
        "ui-heart-ballon": {image:"img/gameCommon/heartBallon-min.png"},
        "ui-distance-ballon": {image:"img/game3ui/ballon-min.png"},
        "ui-distance-ballon-arrow": {image:"img/game3ui/arrow-min.png"},
        "ui-main-button": {image:"img/game3ui/button-min.png"},
        "ui-popui": {image:"img/game3ui/popup-min.png"},

        "game3-sky": {image:"img/game3/game3-sky-min.png"},
        "game3-cloud1": {image:"img/game3/game3-cloud1-min.png"},
        "game3-cloud2": {image:"img/game3/game3-cloud2-min.png"},
        "game3-cloud3": {image:"img/game3/game3-cloud3-min.png"},
        "game3-cloud4": {image:"img/game3/game3-cloud4-min.png"},
        "game3-island": {image:"img/game3/game3-island-min.png"},
        "game3-island1": {image:"img/game3/game3-island1-min.png"},
        "game3-island2": {image:"img/game3/game3-island2-min.png"},
        "game3-sea": {image:"img/game3/game3-sea-min.png"},
        "game3-swim": {image:"img/game3/game3-swim-min.png"},
        "game3-swim-blur": {image:"img/game3/game3-swim-blur-min.png"},
        "game3-swim-wave": {image:"img/game3/game3-swim-wave-min.png"},
        "game3-bird": {image:"img/game3/game3-bird-min.png"},
        "game3-wave1": {image:"img/game3/game3-wave1-min.png"},
        "game3-wave2": {image:"img/game3/game3-wave2-min.png"},
        "game3-rubbish1": {image:"img/game3/game3-rubbish1-min.png"},
        "game3-rubbish2": {image:"img/game3/game3-rubbish2-min.png"},
        "game3-rubbish3": {image:"img/game3/game3-rubbish3-min.png"},
        "game3-rubbish4": {image:"img/game3/game3-rubbish4-min.png"},
        "game3-rubbish5": {image:"img/game3/game3-rubbish5-min.png"},

        "game3-heart": {image:"img/game3/game3-heart-min.png"},

        "game3-bg-audio": {audio:"audio/game/game3bg.mp3"},
        "game3-crash-audio": {audio:"audio/game/game3crash.mp3"},
        "game3-dive-audio": {audio:"audio/game/game3dive.mp3"},
        "game3-swim-audio": {audio:"audio/game/game3swim.mp3"},
        "game3-win-audio": {audio:"audio/game/game3win.mp3"},
    }, UpdateGame3LoadingBar, StartGame3);
    gameCrashAudio = gameAssetLibrary.data["game3-crash-audio"].audio;
    gameDiveAudio = gameAssetLibrary.data["game3-dive-audio"].audio;
    gameSwimAudio = gameAssetLibrary.data["game3-swim-audio"].audio;
    gameWinAudio = gameAssetLibrary.data["game3-win-audio"].audio;
}

function StartGame3() {
    gameUIState = 1;
    gameScore = 0;
    gameTestIndex = 0;
    gameDistance = gameInitialDistance;
    gameSpeed = 0;
    gameTargetSpeed = 0;
    gameIsRubbishFlow = false;
    gameRubbishFlowedCount = 0;
    gameBtnPressedCount = 0
    gameSwimAudioBuffer1 = false;
    gameSwimAudioBuffer2 = 0;

    gameIsFirstFrame = true;
    gameIsShowPopup = false;
    gameIsFadePopup = false;

    gameIsDiving = false;
    gameIsDivingCD = false;
    gameDivingTimeBuffer = 0;
    gameIsPenaltyTime = false;
    gamePenaltyTimeBuffer = 0;

    gameIsHeartAnim = false;
    gameHeartAnimBuffer = 0;

    HideGame3LoadingUI();
    SetGame3UIState();
    gameBackBallon.SetEnabled(true);

    let swimSpriteSheet = new createjs.SpriteSheet({ 
        images: [gameAssetLibrary.data["game3-swim"].image], 
        frames: {width:340, height:421},
        animations: {'a0':0,'a1':1,'a2':2}
    });

    gameObjectLibrary = new GameObjectLibrary({
        "sky": {transform:{posX:864, posY:322, sizeX:1728, sizeY:322, anchorX:0.5, anchorY:1},bitmap:gameAssetLibrary.data["game3-sky"]},
        "cloud1": {transform:{posX:30, posY:50, sizeX:215, sizeY:88,},bitmap:gameAssetLibrary.data["game3-cloud1"]},
        "cloud2": {transform:{posX:400, posY:180, sizeX:364, sizeY:141},bitmap:gameAssetLibrary.data["game3-cloud2"]},
        "cloud3": {transform:{posX:1500, posY:150, sizeX:160, sizeY:57},bitmap:gameAssetLibrary.data["game3-cloud3"]},
        "cloud4": {transform:{posX:1100, posY:30, sizeX:119, sizeY:58},bitmap:gameAssetLibrary.data["game3-cloud4"]},

        "island": {transform:{posX:864, posY:322, sizeX:407, sizeY:91, anchorX:0.5, anchorY:1},bitmap:gameAssetLibrary.data["game3-island"]},
        "island1": {transform:{posX:864, posY:322, sizeX:100, sizeY:24, anchorX:-4.8, anchorY:1},bitmap:gameAssetLibrary.data["game3-island1"]},
        "island2": {transform:{posX:864, posY:322, sizeX:176, sizeY:48, anchorX:-3.2, anchorY:1},bitmap:gameAssetLibrary.data["game3-island2"]},
        "sea": {transform:{posX:0, posY:322, sizeX:1920, sizeY:578},bitmap:gameAssetLibrary.data["game3-sea"]},

        "bird1": {transform:{posX:-100, posY:143, sizeX:72, sizeY:30, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game3-bird"]},
        "bird2": {transform:{posX:-100, posY:143, sizeX:72, sizeY:30, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game3-bird"]},

        "wave1_1": {transform:{posX:500, posY:400, sizeX:1000, sizeY:235, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game3-wave1"]},
        "wave1_2": {transform:{posX:500, posY:400, sizeX:1000, sizeY:235, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game3-wave1"]},
        "wave1_3": {transform:{posX:500, posY:400, sizeX:1000, sizeY:235, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game3-wave1"]},
        "wave2_1": {transform:{posX:1300, posY:450, sizeX:1000, sizeY:317, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game3-wave2"]},
        "wave2_2": {transform:{posX:1300, posY:450, sizeX:1000, sizeY:317, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game3-wave2"]},
        "wave2_3": {transform:{posX:1300, posY:450, sizeX:1000, sizeY:317, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game3-wave2"]},

        "rubbish1": {transform:{posX:-1500, posY:-1000, sizeX:300, sizeY:139, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game3-rubbish1"]},
        "rubbish2": {transform:{posX:-1500, posY:1000, sizeX:60, sizeY:75, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game3-rubbish2"]},
        "rubbish3": {transform:{posX:-1500, posY:1000, sizeX:300, sizeY:130, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game3-rubbish3"]},
        "rubbish4": {transform:{posX:-1500, posY:1000, sizeX:300, sizeY:129, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game3-rubbish4"]},
        "rubbish5": {transform:{posX:-1500, posY:1000, sizeX:180, sizeY:86, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game3-rubbish5"]},
        "rubbish6": {transform:{posX:-1500, posY:1000, sizeX:300, sizeY:139, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game3-rubbish1"]},
        "rubbish7": {transform:{posX:-1500, posY:1000, sizeX:60, sizeY:75, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game3-rubbish2"]},
        "rubbish8": {transform:{posX:-1500, posY:1000, sizeX:300, sizeY:130, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game3-rubbish3"]},

        "swim": {transform:{posX:864, posY:840, sizeX:340, sizeY:421, anchorX:0.5, anchorY:0.5},sprite:{spriteSheet:swimSpriteSheet, spriteIndices:[0,1,2]}},
        "swim_blur": {transform:{posX:864, posY:850, sizeX:360, sizeY:441, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game3-swim-blur"]},
        "swim_wave": {transform:{posX:864, posY:850, sizeX:440, sizeY:200, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game3-swim-wave"]},

        "heart": {transform:{posX:-1000, posY:-1000, sizeX:57, sizeY:46, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game3-heart"]},
    });

    game_swim = gameObjectLibrary.data["swim"];
    game_swim.SetAnimationIndex(0);
    game_swim_blur = gameObjectLibrary.data["swim_blur"];
    game_swim_blur.renderer.alpha = 0;
    game_swim_wave = gameObjectLibrary.data["swim_wave"];
    game_swim_wave.renderer.alpha = 0.65;

    game_cloud1 = gameObjectLibrary.data["cloud1"];
    game_cloud2 = gameObjectLibrary.data["cloud2"];
    game_cloud3 = gameObjectLibrary.data["cloud3"];
    game_cloud4 = gameObjectLibrary.data["cloud4"];

    game_island = gameObjectLibrary.data["island"];
    game_island1 = gameObjectLibrary.data["island1"];
    game_island2 = gameObjectLibrary.data["island2"];
    game_sea = gameObjectLibrary.data["sea"];

    game_bird1 = gameObjectLibrary.data["bird1"];
    game_bird2 = gameObjectLibrary.data["bird2"];

    game_wave = [gameObjectLibrary.data["wave1_1"], gameObjectLibrary.data["wave1_2"], gameObjectLibrary.data["wave1_3"], gameObjectLibrary.data["wave2_1"], gameObjectLibrary.data["wave2_2"], gameObjectLibrary.data["wave2_3"]];
    for (let i = 0; i < game_wave.length; i++) {
        let wave = game_wave[i];
        wave.wavePos = gameInitialDistance - 0.5 * (i+1.0) / game_wave.length;
        wave.waveSpd = Math.random() - 0.5;
        wave.waveSpd = wave.waveSpd > 0 ? (50 + 100 * wave.waveSpd) : (-50 + 100 * wave.waveSpd);
        wave.transform.posX = 432 + Math.random() * 864;
    }

    game_rubbish = [gameObjectLibrary.data["rubbish1"], gameObjectLibrary.data["rubbish2"], gameObjectLibrary.data["rubbish3"], gameObjectLibrary.data["rubbish4"], gameObjectLibrary.data["rubbish5"], gameObjectLibrary.data["rubbish6"], gameObjectLibrary.data["rubbish7"], gameObjectLibrary.data["rubbish8"]];
    for (let i = 0; i < game_rubbish.length; i++) {
        let rubbish = game_rubbish[i];
        let randomValue = (Math.random() - 0.5) * 400;
        rubbish.time = 0;
        rubbish.enabled = true;
        rubbish.collider = true;
        rubbish.rubbishPosX = 864 + Math.max(Math.abs(randomValue),100) * Math.sign(randomValue);
        rubbish.rubbishPosY = gameInitialDistance - 0.1 - (0.4 * (i + 1.0));
        rubbish.rubbishSpd = Math.max(Math.abs(randomValue * 0.35),25) * Math.sign(-randomValue);
        rubbish.transform.posX = 864;
    }

    game_heart = gameObjectLibrary.data["heart"];
    game_heart.renderer.alpha = 0;

    // const colorFilter = new createjs.ColorFilter(1, 0, 0, 1); // Red channel boosted
    // game_cloud4.renderer.filters = [colorFilter];
    // game_cloud4.renderer.cache(0, 0, 100, 100);

    // redColorFilter = new createjs.ColorFilter(1, 1, 1, 1);
    // blueColorFilter = new createjs.ColorFilter(1, 1, 1, 1);
    // game_swim.renderer.filters = [redColorFilter, blueColorFilter];
    // game_swim.renderer.cache(0, 0, game_swim.transform.sizeX, game_swim.transform.sizeY);

    gameStage.update();

    gameTimeBuffer1 = true;
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", LoopGame3);

    gameAssetLibrary.data["game3-bg-audio"].audio.loop = true;
    PlayAudio(gameAssetLibrary.data["game3-bg-audio"].audio);
}

function LoopGame3(_evt) {
    let runTime = _evt.runTime / 1000;
    if (gameTimeBuffer1) {
        gameTimeBuffer2 = runTime;
        gameTimeBuffer1 = false;
        gameTimeBuffer3 = 0;
    }
    let time = runTime - gameTimeBuffer2;
    let deltaTime = time - gameTimeBuffer3;
    gameTimeBuffer3 = time;

    if (!gameIsShowPopup && !gameIsFirstFrame) {
        if (!gameIsFadePopup) {
            gamePopupUI.SetEnabled(true);
        }
        if (time > 2.7 && !gameIsFadePopup) {
            gamePopupUI.FadeOut();
            gameIsFadePopup = true;
        }
        if (time > 3) {
            gameTimeBuffer1 = true;
            gameIsShowPopup = true;
        }
        return;
    }

    if (gameIsPenaltyTime) {
        let penaltyTime = (time - gamePenaltyTimeBuffer) / gamePenaltyTimeInterval;
        // penalty effect
        let blinkTime = Math.floor(penaltyTime * 12);
        game_swim.renderer.alpha = blinkTime % 2;
        if (penaltyTime > 1) {
            gameIsPenaltyTime = false;
            game_swim.renderer.alpha = 1;
        }
    }

    if (gameIsHeartAnim) {
        let heartTime = (time - gameHeartAnimBuffer) / 2.5;
        // heart anim effect
        if (heartTime < 0.75) {
            let ht = heartTime / 0.75;
            ht = 3 * ht * ht - 2 * ht * ht * ht;
            game_heart.renderer.alpha = 1;
            game_heart.transform.posX = 864;
            game_heart.transform.posY = 850 - ht * 400;
        } else {
            let ht = (heartTime - 0.75) / 0.25;
            ht = ht * ht;
            game_heart.transform.posX = 864 + 800 * ht;
            game_heart.transform.posY = 450 - 420 * ht;
            game_heart.renderer.alpha = 1 - ht;
        }
        game_heart.UpdatePosition();
        if (heartTime > 1) {
            gameIsHeartAnim = false;
            game_heart.renderer.alpha = 0;
            gameScore++;
            gameScoreBallon.Update({text: gameScore});
        }
    }

    // Btn handler
    if (gameBtnPressed) {
        gameBtnPressedTime += deltaTime;
        if (gameBtnPressedTime > gameBtnLongPressInterval && !gameBtnLongPressed) {
            gameBtnLongPressed = true;
            if (!gameIsDiving && !gameIsDivingCD && !gameIsPenaltyTime) {
                gameIsDiving = true;
                gameDivingTimeBuffer = 0;
                PlayAudio(gameDiveAudio);
            }
        } else {
            if (!gameSwimAudioBuffer1 || time > gameSwimAudioBuffer2 + 1.75) {
                gameSwimAudioBuffer1 = true;
                gameSwimAudioBuffer2 = time;
                PlayAudio(gameSwimAudio);
            }
        }
    }
    gameBtnPressedTimeBuffer += deltaTime;
    if (gameBtnPressedTimeBuffer > gameBtnPressedCountInterval) {
        {
            gameTargetSpeed = Math.min(gameBtnPressedCount * gameAcceleration, gameMaxSpeed);
            // if (gameTargetSpeed > gameSpeed + gameAcceleration * 0.2) gameTargetSpeed = gameSpeed + gameAcceleration * 0.2;
            // if (gameTargetSpeed < gameSpeed - gameAcceleration * 1) gameTargetSpeed = gameSpeed - gameAcceleration * 1;
        }
        if (gameIsDiving) {
            gameTargetSpeed = Math.max(gameSpeed, 0.08);
        }
        gameBtnPressedTimeBuffer = 0;
        gameBtnPressedCount = 0;
    }

    if (gameIsDiving) {
        gameDivingTimeBuffer += deltaTime;
        let diveTime = gameDivingTimeBuffer / gameDivingInterval;
        let diveScale = Math.sin(diveTime*Math.PI);
        let diveBlurValue = diveScale * 0.5;
        let divePosY = 840 - diveScale * diveScale * 75;
        let diveAlpha = 1 - diveScale;
        diveScale = (2.5 - diveScale * diveScale) / 2.5;
        game_swim.transform.posY = divePosY;
        game_swim.transform.sizeX = game_swim.transform.width * diveScale;
        game_swim.transform.sizeY = game_swim.transform.height * diveScale;
        game_swim.UpdatePosition();
        game_swim.renderer.alpha = diveAlpha;
        game_swim_blur.transform.posY = divePosY;
        game_swim_blur.transform.sizeX = game_swim_blur.transform.width * diveScale;
        game_swim_blur.transform.sizeY = game_swim_blur.transform.height * diveScale;
        game_swim_blur.UpdatePosition();
        game_swim_blur.renderer.alpha = diveBlurValue;
        if (gameDivingTimeBuffer > gameDivingInterval) {
            gameIsDiving = false;
            gameIsDivingCD = true;
            gameDivingTimeBuffer = 0;
        }
    }
    if (gameIsDivingCD) {
        gameDivingTimeBuffer += deltaTime;
        if (gameDivingTimeBuffer > gameDivingCDInterval) {
            gameIsDivingCD = false;
            gameDivingTimeBuffer = 0;
        }
    }

    if (gameIsPenaltyTime) gameTargetSpeed = 0;
    gameSpeed = gameSpeed * 0.9 + gameTargetSpeed * 0.1;
    gameDistance -= deltaTime * gameSpeed;
    gameDistanceBallon_lowerText.Update({text:Math.max(0,gameDistance*100/0.4).toFixed(0)+"米"});
    if (gameSpeed < 0.001 || gameIsDiving) {
        game_swim.SetAnimationIndex(0);
    } else {
        game_swim.SetAnimationIndex( Math.floor(gameDistance * 20 % 2) + 1 );
    }

    // island;
    let islandScale = (gameInitialDistance - gameDistance) / gameInitialDistance;
    // islandScale = islandScale * islandScale;
    islandScale = 1 + 9 * islandScale;
    game_island1.SetPosition({sizeX:100*islandScale, sizeY:24*islandScale});
    game_island2.SetPosition({sizeX:176*islandScale, sizeY:48*islandScale});
    if (gameDistance < 1) {
        let islandPosY = 322 + 378 * (1 - gameDistance) * (1 - gameDistance);
        game_island.SetPosition({posY: islandPosY, sizeX:407*islandScale, sizeY:91*islandScale});
        game_sea.SetPosition({posY: islandPosY});
    } else {
        game_island.SetPosition({sizeX:407*islandScale, sizeY:91*islandScale});
    }

    // cloud
    game_cloud1.SetPosition({posX:(30 + 215 + time * 7)%(1728 + 215)-215});
    game_cloud2.SetPosition({posX:(400 + 364 + time * 5)%(1728 + 364)-364});
    game_cloud3.SetPosition({posX:(1500 + 160 + time * 4)%(1728 + 160)-160});
    game_cloud4.SetPosition({posX:(1100 + 119 + time * 6)%(1728 + 119)-119});

    // bird
    if (time % 10 < 3) {
        let birdTime = time % 40;
        if (birdTime < 10) {
            birdTime = time % 5;
            game_bird1.transform.posX = -100 + Math.sin(birdTime / 3 * Math.PI) * 400;
            game_bird1.transform.posY = -100 + birdTime * 80;
            game_bird1.transform.sizeX = birdTime * 27;
            game_bird1.transform.sizeY = birdTime * 11.25;
            game_bird1.UpdatePosition();
        } else if (birdTime < 20) {
            birdTime = time % 5;
            game_bird1.transform.posX = 1850 - Math.sin(birdTime / 3 * Math.PI) * 500;
            game_bird1.transform.posY = -100 + birdTime * 100;
            game_bird1.transform.sizeX = birdTime * 27;
            game_bird1.transform.sizeY = birdTime * 11.25;
            game_bird1.UpdatePosition();
            game_bird2.transform.posX = 1950 - Math.sin((birdTime-0.2) / 3 * Math.PI) * 500;
            game_bird2.transform.posY = -100 + (birdTime-0.2) * 120;
            game_bird2.transform.sizeX = (birdTime-0.2) * 27;
            game_bird2.transform.sizeY = (birdTime-0.2) * 11.25;
            game_bird2.UpdatePosition();
        } else if (birdTime < 30) {
            birdTime = time % 10;
            game_bird1.transform.posX = -100 + Math.sin(birdTime / 3 * Math.PI) * 400;
            game_bird1.transform.posY = -100 + birdTime * 80;
            game_bird1.transform.sizeX = birdTime * 27;
            game_bird1.transform.sizeY = birdTime * 11.25;
            game_bird1.UpdatePosition();
        } else {
            birdTime = time % 10;
            game_bird1.transform.posX = 1850 - Math.sin(birdTime / 3 * Math.PI) * 500;
            game_bird1.transform.posY = -100 + birdTime * 100;
            game_bird1.transform.sizeX = birdTime * 27;
            game_bird1.transform.sizeY = birdTime * 11.25;
            game_bird1.UpdatePosition();
        }
    }

    // wave
    let sinTime = Math.sin(time * 6);
    let cosTime = Math.cos(time * 3);
    for (let i = 0; i < game_wave.length; i++) {
        let wave = game_wave[i];
        let distance = (gameDistance - wave.wavePos);
        if (distance > 0.5) {
            wave.renderer.alpha = 0;
            continue;
        } else if (distance < -0.1) {
            wave.wavePos -= 0.56 - Math.random() * 0.01;
            wave.waveSpd = Math.random() - 0.5;
            wave.waveSpd = wave.waveSpd > 0 ? (25 + 50 * wave.waveSpd) : (-25 + 50 * wave.waveSpd);
            wave.transform.posX = 648 + Math.random() * 432;
        }
        if (wave.wavePos < 0.4) {
            wave.renderer.alpha = 0;
            continue;
        }
        wave.renderer.skewX = sinTime * 5;
        wave.renderer.skewY = cosTime;
        let posY = 1 - distance * 2;
        posY = 1 - posY * posY;
        wave.transform.posY = 900 - posY * 578;
        let scale = 1 - distance * 2;
        scale = scale * scale * 1.4;
        wave.transform.posX = wave.transform.posX + wave.waveSpd * deltaTime;
        if (wave.transform.posX > 1728 + wave.transform.sizeX) wave.transform.posX = -wave.transform.sizeX;
        else if (wave.transform.posX < -wave.transform.sizeX) wave.transform.posX = 1728 + wave.transform.sizeX;
        wave.transform.sizeX = wave.transform.width * scale;
        wave.transform.sizeY = wave.transform.height * scale;
        wave.UpdatePosition();
    }
    game_swim_wave.renderer.skewX = sinTime * (15 + gameSpeed * 20);
    game_swim_wave.renderer.skewY = cosTime * (1 + gameSpeed * 20);

    // rubbish
    for (let i = 0; i < game_rubbish.length; i++) {
        let rubbish = game_rubbish[i];
        let distance = (gameDistance - rubbish.rubbishPosY);
        if (distance > 0.5 || !rubbish.enabled) {
            rubbish.renderer.alpha = 0;
            rubbish.time = time;
            continue;
        }
        rubbish.renderer.alpha = 1;
        let posY = 1 - distance * 2;
        posY = 1 - posY * posY;
        let scale = 1 - distance * 2;
        scale = scale * scale * 1.4;
        rubbish.transform.sizeX = rubbish.transform.width * scale
        rubbish.transform.sizeY = rubbish.transform.height * scale;
        rubbish.transform.posX = rubbish.rubbishPosX + rubbish.rubbishSpd * (time - rubbish.time);
        rubbish.transform.posY = 900 - posY * 578;
        rubbish.UpdatePosition();
        if (rubbish.collider && gameIsDiving && rubbish.transform.posY > 800 && (rubbish.transform.posX > 864 - rubbish.transform.width * 0.5 - 160 && rubbish.transform.posX < 864 + rubbish.transform.width * 0.5 + 160)) {
            // Dodge
            rubbish.collider = false;
            gameIsHeartAnim = true;
            gameHeartAnimBuffer = time;
        } else if (
            (rubbish.collider && rubbish.transform.posY > 800) && 
            ((rubbish.transform.posX > 864 - rubbish.transform.width * 0.5 - 80) && (rubbish.transform.posX < 864 + rubbish.transform.width * 0.5 + 80))) {
            if (!gameIsDiving) {
                // Hit
                gameTargetSpeed = 0;
                gameIsPenaltyTime = true;
                gamePenaltyTimeBuffer = time;
                rubbish.enabled = false;
                PlayAudio(gameCrashAudio);
            }
        }
    }

    gameStage.update();

    if (gameDistance < 0) {
        PlayAudio(gameWinAudio);
        gameUIState = 2;
        SetGame3UIState();
        createjs.Ticker.removeEventListener("tick", LoopGame3);
    }

    gameIsFirstFrame = false;

}

function SetGame3UIState() {
    switch (gameUIState) {
        case 0:
            gameScoreBallon.SetEnabled(false);
            gameMainButton.SetEnabled(false);
            gameDistanceBallon.SetEnabled(false);
            gameDistanceBallon_upperText.SetEnabled(false);
            gameDistanceBallon_lowerText.SetEnabled(false);
            gameDistanceBallon_arrow.SetEnabled(false);
            gameUIMainBox.SetEnabled(false);
            gameUIMainTitle.SetEnabled(false);
            gameUIMainImage.SetEnabled(false);
            gameUIMainButton1.SetEnabled(false);
            gameUIMainButton2.SetEnabled(false);
            break;
        case 1:
            gameScoreBallon.SetEnabled(true);
            gameScoreBallon.Update({text:gameScore+""});
            gameMainButton.SetEnabled(true);
            gameDistanceBallon.SetEnabled(true);
            gameDistanceBallon_upperText.SetEnabled(true);
            gameDistanceBallon_lowerText.SetEnabled(true);
            gameDistanceBallon_arrow.SetEnabled(true);
            gameUIMainBox.SetEnabled(false);
            gameUIMainTitle.SetEnabled(false);
            gameUIMainImage.SetEnabled(false);
            gameUIMainButton1.SetEnabled(false);
            gameUIMainButton2.SetEnabled(false);
            break;
        case 2:
            gameScoreBallon.SetEnabled(true);
            gameScoreBallon.Update({text:gameScore+""});
            gameMainButton.SetEnabled(true);
            gameDistanceBallon.SetEnabled(true);
            gameDistanceBallon_upperText.SetEnabled(true);
            gameDistanceBallon_lowerText.SetEnabled(true);
            gameDistanceBallon_arrow.SetEnabled(true);
            gameUIMainBox.SetEnabled(true);
            gameUIMainTitle.SetEnabled(true);
            gameUIMainImage.SetEnabled(true);
            gameUIMainButton1.SetEnabled(true);
            gameUIMainButton2.SetEnabled(true);
            break;
    }
}

function OnClickGame3UIButton(_buttonId) {
    if (_buttonId == 1) {
        gameStage.removeAllChildren();
        gameStage.clear();
        StartGame3();
    } else {
        document.removeEventListener("pointerup", OnKeyUpGameBtn);
        document.removeEventListener("keydown", OnKeyDownSpace);
        document.removeEventListener("keyup", OnKeyUpSpace);
        ExitGameView();
    }
}