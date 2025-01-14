var gameSharedAssetLibrary;
var gameUILibrary;
var gameUIState;
var gamePopupAudio;
var gamePressAudio;
var gameTrueAudio;
var gameLoadingBar, gameLoadingBarNail;
var gameQuestionBallon, gameScoreBallon, gameBackBallon;
var gameLoadSceneAction;

var gameButtonUp, gameButtonDown, gameButtonLeft, gameButtonRight;

var gameAssetLibrary;
var gameObjectLibrary;
var gameTimeBuffer1, gameTimeBuffer2, gameTimeBuffer3;

function InitializeGame4(_data) {
    gameSharedAssetLibrary = new AssetLibrary({
        "ui-back-ballon": {image:"img/gameCommon/backBallon-min.png"},
        "ui-question-count-ballon": {image:"img/gameCommon/greenBallon-min.png"},
        "ui-score-ballon": {image:"img/gameCommon/heartBallon-min.png"},
        "ui-score-ballon2": {image:"img/gameCommon/heartBallon2-min.png"},
        "ui-button": {image:"img/gameCommon/button-min.png"},
        "ui-main-image": {image:"img/game4ui/elder-min.png"},

        "game-popup-audio": {audio:"audio/game/popup.wav"},
        "game-press-audio": {audio:"audio/game/press.mp3"},
        "game-true-audio": {audio:"audio/game/true.wav"},
    }, null, InitializeGame4Scene);
    gamePopupAudio = gameSharedAssetLibrary.data["game-popup-audio"].audio;
    gamePressAudio = gameSharedAssetLibrary.data["game-press-audio"].audio;
    gameTrueAudio = gameSharedAssetLibrary.data["game-true-audio"].audio;
    InitializeGame4UI();
    ShowGame4LoadingUI();
}

function InitializeGame4UI() {
    gameUILibrary = new UILibrary({});
    gameUILibrary.AddUIElements({
        "ui-loading-bg": {transform:{left:'0%', top:'0%', width:'100%', height:'100%'}, image:{imgSrc:"img/gameCommon/loading-bg-min.png"}},
        // "ui-loading-title": {transform:{top:'15.4%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:52, letterSpacing:4, color:'#00693E', text:'「樂」於助人'}},
        "ui-loading-title": {transform:{left:'39.35%', top:'13.66%', width:'21.75%', height:'8.88%'}, image:{imgSrc:"img/game4ui/title-4-min.png"}},
        "ui-loading-img-main": {transform:{left:'40.79%', top:'25.88%', width:'19.68%', height:'30.11%'}, image:{imgSrc:"img/game4ui/loading-main-min.png"}},
        // "ui-loading-img-compass": {transform:{left:'53.2%', top:'43.4%', width:'9.03%', height:'16.33%'}, image:{imgSrc:"img/gameCommon/loading-compass-min.png"}},
        "ui-loading-loadingbar": {transform:{left:'30%', top:'64%', width:'40%', height:'1.8%'}, loadingBar:{color1: '#fff', color2: '#F97930', round: 10}},
        "ui-loading-img-nail": {transform:{left:'28%', top:'60%', width:'4%', height:'7.22%'}, image:{imgSrc:"img/gameCommon/loading-nail-min.png"}},
        "ui-loading-img-sound": {transform:{left:'17.5%', top:'77.5%', width:'3.47%', height:'6.67%'}, image:{imgSrc:"img/gameCommon/loading-sound.gif"}},
        "ui-loading-desc1": {transform:{left: '12%', top:'79.5%', width: '40%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'#F97930', text:'請打開聲音玩遊戲'}},
        "ui-loading-img-rotate": {transform:{left:'55.89%', top:'76.42%', width:'4.98%', height:'9.55%'}, image:{imgSrc:"img/gameCommon/loading-rotate.gif"}},
        "ui-loading-desc2": {transform:{left: '52.6%', top:'79.5%', width: '40%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'#F97930', text:'將你的裝置轉成橫向'}},

        "ui-back-ballon": {transform:{left:'5.613%', width:'7.52%', height:'9.59%'}, image:{imgSrc:"img/gameCommon/backBallon-min.png"}},
        "ui-question-count-ballon": {transform:{left:'79.16%', width:'7.52%', height:'9.59%'}, ballon:{imgSrc:"img/gameCommon/greenBallon-min.png", fontFamily:'CustomFont', fontSize:30, letterSpacing:4, color:'white', text:'1/3'}},
        "ui-score-count-ballon": {transform:{left:'86.68%', width:'7.52%', height:'9.59%'}, ballon:{imgSrc:"img/gameCommon/heartBallon-min.png", fontFamily:'CustomFont', fontSize:25, letterSpacing:4, color:'white', text:'0'}},

        "ui-button-up": {transform:{left:'85.01%', top:'60.33%', width:'5.79%', height:'11.11%'}, image:{imgSrc:"img/game4ui/button-up-min.png"}},
        "ui-button-down": {transform:{left:'85.01%', top:'82.22%', width:'5.79%', height:'11.11%'}, image:{imgSrc:"img/game4ui/button-down-min.png"}},
        "ui-button-left": {transform:{left:'79.45%', top:'71.33%', width:'5.79%', height:'11.11%'}, image:{imgSrc:"img/game4ui/button-left-min.png"}},
        "ui-button-right": {transform:{left:'90.74%', top:'71.33%', width:'5.79%', height:'11.11%'}, image:{imgSrc:"img/game4ui/button-right-min.png"}},

        "ui-main-bg": {transform:{left:'15.28%', top:'11.11%', width:'69.44%', height:'77.78%'}, roundRect:{color:'white', round:150}},
        "ui-main-title": {transform:{top:'27.5%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:40, letterSpacing:4, color:'#00693E', text:'完成遊戲', lineHeight: 70}},
        "ui-main-image": {transform:{left:'40.45%', top:'38.89%', width:'19.09%', height:'12.89%'}, image:{imgSrc:"img/game4ui/elder-min.png"}},
        "ui-main-button1": {transform:{left:'33.1%', top:'61.5%', width:'16%', height:'9.36%'}, button:{imgSrc:"img/gameCommon/button-min.png", round:10, fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'white', text:'再玩一次', onclick:()=>{OnClickGame4UIButton(1);}}},
        "ui-main-button2": {transform:{left:'50.9%', top:'61.5%', width:'16%', height:'9.36%'}, button:{imgSrc:"img/gameCommon/button-min.png", round:10, fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'white', text:'離開遊戲', onclick:()=>{OnClickGame4UIButton(2);}}},

        // "ui-test": {transform:{left:'0', top:'0', width:'100%', height:'100%'}, image:{imgSrc:"img/game4ui/3.png"}},
    });

    gameUILibrary.AddUIResizeEvent();
    gameUIState = 0;

    gameLoadingBar = gameUILibrary.data["ui-loading-loadingbar"];
    gameLoadingBarNail = gameUILibrary.data["ui-loading-img-nail"];

    gameQuestionBallon = gameUILibrary.data["ui-question-count-ballon"];
    gameQuestionBallon.SetEnabled(true);
    gameScoreBallon = gameUILibrary.data["ui-score-count-ballon"];
    gameScoreBallon.AddCoveredBallon({imgSrc2:"img/gameCommon/heartBallon2-min.png"});
    gameScoreBallon.SetEnabled(true);
    gameBackBallon = gameUILibrary.data["ui-back-ballon"];
    gameBackBallon.dom.addEventListener('click', BackToWeb);

    gameUIMainBox = gameUILibrary.data["ui-main-bg"];
    gameUIMainTitle = gameUILibrary.data["ui-main-title"];
    gameUIMainDesc = gameUILibrary.data["ui-main-desc"];
    gameUIMainImage = gameUILibrary.data["ui-main-image"];
    gameUIMainButton1 = gameUILibrary.data["ui-main-button1"];
    gameUIMainButton2 = gameUILibrary.data["ui-main-button2"];

    gameButtonUp = gameUILibrary.data["ui-button-up"];
    gameButtonDown = gameUILibrary.data["ui-button-down"];
    gameButtonLeft = gameUILibrary.data["ui-button-left"];
    gameButtonRight = gameUILibrary.data["ui-button-right"];

    // gameUILibrary.data["ui-test"].SetEnabled(true);
    // gameUILibrary.data["ui-test"].dom.style.opacity = '50%';

    document.addEventListener("keydown", OnKeydownKeyboardArrow);
    gameButtonUp.dom.addEventListener("pointerdown", (e) => {
        if (game_move == -1) {
            game_move = 0;
            gameMoveBuffer = true;
        }
    });
    gameButtonDown.dom.addEventListener("pointerdown", (e) => {
        if (game_move == -1) {
            game_move = 1;
            gameMoveBuffer = true;
        }
    });
    gameButtonLeft.dom.addEventListener("pointerdown", (e) => {
        if (game_move == -1) {
            game_move = 2;
            gameMoveBuffer = true;
        }
    });
    gameButtonRight.dom.addEventListener("pointerdown", (e) => {
        if (game_move == -1) {
            game_move = 3;
            gameMoveBuffer = true;
        }
    });
}

function OnKeydownKeyboardArrow(_evt) {
    if (_evt.code === "ArrowUp") {
        _evt.preventDefault();
        if (game_move == -1) {
            game_move = 0;
            gameMoveBuffer = true;
        }
    }
    if (_evt.code === "ArrowDown") {
        _evt.preventDefault();
        if (game_move == -1) {
            game_move = 1;
            gameMoveBuffer = true;
        }
    }
    if (_evt.code === "ArrowLeft") {
        _evt.preventDefault();
        if (game_move == -1) {
            game_move = 2;
            gameMoveBuffer = true;
        }
    }
    if (_evt.code === "ArrowRight") {
        _evt.preventDefault();
        if (game_move == -1) {
            game_move = 3;
            gameMoveBuffer = true;
        }
    }
}

function ShowGame4LoadingUI() {
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

function UpdateGame4LoadingBar(_progress) {
    gameLoadingBar.UpdateLoadingBar(_progress);
    gameLoadingBarNail.Update({left: (27+((_progress/100)*44))+'%'});
}

function HideGame4LoadingUI() {
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
    UpdateGame4LoadingBar(0);
}

function InitializeGame4Scene() {
    gameAssetLibrary = new AssetLibrary({
        "game4-bg": {image:"img/game4/game4-bg-min.png"},
        "game4-vegetation1": {image:"img/game4/game4-vegetation1-min.png"},
        "game4-vegetation2": {image:"img/game4/game4-vegetation2-min.png"},
        "game4-vegetation3": {image:"img/game4/game4-vegetation3-min.png"},
        "game4-vegetation4": {image:"img/game4/game4-vegetation4-min.png"},
        "game4-vegetation5": {image:"img/game4/game4-vegetation5-min.png"},
        "game4-wave": {image:"img/game4/game4-wave-min.png"},
        "game4-bridge": {image:"img/game4/game4-bridge-min.png"},

        "game4-cat": {image:"img/game4/game4-cat-min.png"},
        "game4-tortoise": {image:"img/game4/game4-tortoise-min.png"},
        "game4-snail": {image:"img/game4/game4-snail-min.png"},

        "game4-woman1": {image:"img/game4/game4-woman1-min.png"},
        "game4-woman2": {image:"img/game4/game4-woman2-min.png"},

        "game4-grand1": {image:"img/game4/game4-grand1-min.png"},
        "game4-grand2": {image:"img/game4/game4-grand2-min.png"},
        "game4-grand3": {image:"img/game4/game4-grand3-min.png"},
        "game4-grand4": {image:"img/game4/game4-grand4-min.png"},
        "game4-grand5": {image:"img/game4/game4-grand5-min.png"},
        "game4-grand6": {image:"img/game4/game4-grand6-min.png"},
    }, UpdateGame4LoadingBar, StartGame4);
}

var game_wave, game_bridge, game_vegetation;
var game_enemy, game_char;
var game_grand, gameGrandIndex, gameIsGrandComing, gameGrandComingTimeBuffer;
var gameMoveBuffer, gameMoveTimeBuffer, gameGridX, gameGridY, gameGrid;

function StartGame4() {
    HideGame4LoadingUI();
    gameUIState = 1;
    gameScore = 0;
    game_move = -1;
    gameIsGrandComing = false;
    gameMoveBuffer = false;
    SetGame4UIState();
    gameBackBallon.SetEnabled(true);

    let womanSpriteSheet = [
        new createjs.SpriteSheet({ 
            images: [gameAssetLibrary.data["game4-woman1"].image], 
            frames: {width:78, height:165},
            animations: {'a0':0,'a1':1,}
        }), 
        new createjs.SpriteSheet({ 
            images: [gameAssetLibrary.data["game4-woman2"].image], 
            frames: {width:108, height:147},
            animations: {'a0':0,'a1':1,}
        })
    ];
    womanSpriteSheet[0].width = 78;
    womanSpriteSheet[0].height = 165;
    womanSpriteSheet[1].width = 108;
    womanSpriteSheet[1].height = 147;

    let catSpriteSheet = new createjs.SpriteSheet({ 
        images: [gameAssetLibrary.data["game4-cat"].image], 
        frames: {width:142, height:140},
        animations: {'a0':0,'a1':1,'a2':2,'a3':3,'a4':4,'a5':5,}
    });

    let tortoiseSpriteSheet = new createjs.SpriteSheet({ 
        images: [gameAssetLibrary.data["game4-tortoise"].image], 
        frames: {width:128, height:87},
        animations: {'a0':0,'a1':1,'a2':2,'a3':3,'a4':4,'a5':5,'a6':6,'a7':7,}
    });

    let bridgeNumber = Math.floor(Math.random()*8.99);
    gameObjectLibrary = new GameObjectLibrary({
        "bg": {transform:{posX:0, posY:0, sizeX:1728, sizeY:900},bitmap:gameAssetLibrary.data["game4-bg"]},
        "vegetation1": {transform:{posX:58, posY:58, sizeX:172, sizeY:69, anchorX:0.5, anchorY:1},bitmap:gameAssetLibrary.data["game4-vegetation1"]},
        "vegetation4": {transform:{posX:435, posY:98, sizeX:493, sizeY:94, anchorX:0.5, anchorY:1},bitmap:gameAssetLibrary.data["game4-vegetation4"]},
        "vegetation5": {transform:{posX:1313, posY:78, sizeX:301, sizeY:93, anchorX:0.5, anchorY:1},bitmap:gameAssetLibrary.data["game4-vegetation5"]},
        "wave1": {transform:{posX:1474, posY:425, sizeX:380, sizeY:74, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game4-wave"]},
        "wave2": {transform:{posX:617, posY:442, sizeX:500, sizeY:97, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game4-wave"]},
        "wave3": {transform:{posX:21, posY:430, sizeX:426, sizeY:83, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game4-wave"]},
        "bridge": {transform:{posX:112 + 188 * bridgeNumber, posY:424, sizeX:188, sizeY:166, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game4-bridge"]},
    });
    game_wave = [gameObjectLibrary.data["wave1"], gameObjectLibrary.data["wave2"], gameObjectLibrary.data["wave3"]];
    game_bridge = gameObjectLibrary.data["bridge"];

    // GRID
    gameGridX = [122, 206, 300, 394, 488, 582, 676, 770, 864, 958, 1052, 1146, 1240, 1334, 1428, 1522, 1616];
    gameGridY = [100, 141.67, 183.33, 225, 266.67, 308.33, 350, 425, 500, 550, 600, 650, 700, 800, 895];
    gameGrid = [
        [0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0]
    ];
    for (let i = 6; i <= 8; i++) {
        gameGrid[i][bridgeNumber*2] = 1;
    }


    // CHARACTER

    game_char = {};
    game_char.target = true;
    game_char.posX = 864; game_char.posY = 895;
    game_char.gridX = 8; game_char.gridY = 14;
    let charScale = 0.65 + (game_char.posY / 900) * 0.35;

    game_grand = [];
    let gameGrandIndices = GetRandomNumbers(1, 6, 6);
    for (let i = 0; i < 6; i++) {
        let grandImage = gameAssetLibrary.data["game4-grand"+gameGrandIndices[i]];
        let grandWidth = grandImage.width, grandHeight = grandImage.height;
        let grand = gameObjectLibrary.AddGameObject("grand", {transform:{posX:-200, posY:-200, sizeX:grandWidth * charScale, sizeY:grandHeight * charScale, anchorX: 0, anchorY: 1, flip:false}, bitmap: grandImage});
        grand.w = grandWidth; grand.h = grandHeight; grand.dx = -10;
        grand.renderer.alpha = 0;
        game_grand.push(grand);
    }
    gameGrandIndex = 0;
    game_char.grand = game_grand[gameGrandIndex];
    game_char.grand.renderer.alpha = 1;

    game_char.womanIndex = Math.random() > 0.5 ? 0 : 1;
    let womanWidth = womanSpriteSheet[game_char.womanIndex].width * 0.9, womanHeight = womanSpriteSheet[game_char.womanIndex].height * 0.9;
    game_char.woman = gameObjectLibrary.AddGameObject("woman", {transform:{posX:864+10, posY:895, sizeX:womanWidth * charScale, sizeY:womanHeight * charScale, anchorX: 0, anchorY: 1, flip:true}, sprite:{spriteSheet:womanSpriteSheet[game_char.womanIndex], spriteIndices:[0,1]}});
    game_char.woman.w = womanWidth; game_char.woman.h = womanHeight; game_char.woman.dx = 10;

    game_char.SetPosition = function(_posX, _posY) {
        game_char.posX = _posX; game_char.posY = _posY;
        let charScale = 0.65 + (game_char.posY / 900) * 0.35;
        let grand = game_char.grand;
        grand.transform.posX = game_char.posX + grand.dx;
        grand.transform.posY = game_char.posY;
        grand.transform.sizeX = grand.w * charScale;
        grand.transform.sizeY = grand.h * charScale;
        grand.UpdatePosition();
        let woman = game_char.woman;
        woman.transform.posX = game_char.posX + woman.dx;
        woman.transform.posY = game_char.posY;
        woman.transform.sizeX = woman.w * charScale;
        woman.transform.sizeY = woman.h * charScale;
        woman.UpdatePosition();
        UpdateLayer(game_char.posY > gameGridY[12] ? 0 : (game_char.posY > gameGridY[10] ? 1 : (game_char.posY > gameGridY[4] ? 2 : (game_char.posY > gameGridY[2] ? 3 : 4))));
    };

    // ENEMY

    game_enemy = [[],[],[],[]];
    for (let i = 0; i < 4; i++) { // row3: 4 cat
        game_enemy[3].push(gameObjectLibrary.AddGameObject("enemy_row3_cat"+i, {transform:{posX:0, posY:gameGridY[2], sizeX:142*0.9, sizeY:140*0.9, anchorX: 0.5, anchorY: 0.95, flip:false}, sprite:{spriteSheet:catSpriteSheet, spriteIndices:[0,1,2,3,4,5]}}));
    }
    for (let i = 0; i < 5; i++) { // row2: 5 nail
        game_enemy[2].push(gameObjectLibrary.AddGameObject("enemy_row2_snail"+i, {transform:{posX:0, posY:gameGridY[4], sizeX:67, sizeY:54, anchorX: 0.5, anchorY: 1, flip:false}, bitmap:gameAssetLibrary.data["game4-snail"]}));
    }
    for (let i = 0; i < 5; i++) { // row1: 5 tortoise
        game_enemy[1].push(gameObjectLibrary.AddGameObject("enemy_row1_tortoise"+i, {transform:{posX:0, posY:gameGridY[10], sizeX:128*0.9, sizeY:87*0.9, anchorX: 0.5, anchorY: 1, flip:false}, sprite:{spriteSheet:tortoiseSpriteSheet, spriteIndices:[0,1,2,3,4,5,6,7]}}));
    }
    for (let i = 0; i < 3; i++) { // row0: 3 tortoise
        game_enemy[0].push(gameObjectLibrary.AddGameObject("enemy_row0_tortoise"+i, {transform:{posX:0, posY:gameGridY[12], sizeX:128, sizeY:87, anchorX: 0.5, anchorY: 1, flip:true}, sprite:{spriteSheet:tortoiseSpriteSheet, spriteIndices:[0,1,2,3,4,5,6,7]}}));
    }

    game_char.layer = -1;
    game_char.SetPosition(864, 895);

    gameObjectLibrary.AddGameObjects({
        "vegetation3": {transform:{posX:333, posY:873, sizeX:483, sizeY:156, anchorX:0.5, anchorY:1},bitmap:gameAssetLibrary.data["game4-vegetation3"]},
        "vegetation2": {transform:{posX:55, posY:898, sizeX:149, sizeY:106, anchorX:0.5, anchorY:1},bitmap:gameAssetLibrary.data["game4-vegetation2"]},
        "vegetation1_1": {transform:{posX:1549, posY:803, sizeX:172, sizeY:69, anchorX:0.5, anchorY:1},bitmap:gameAssetLibrary.data["game4-vegetation1"]},
        "vegetation1_2": {transform:{posX:1660, posY:861, sizeX:172, sizeY:69, anchorX:0.5, anchorY:1},bitmap:gameAssetLibrary.data["game4-vegetation1"]},
    });
    game_vegetation = [gameObjectLibrary.data["vegetation1"], gameObjectLibrary.data["vegetation4"], gameObjectLibrary.data["vegetation5"], gameObjectLibrary.data["vegetation3"], gameObjectLibrary.data["vegetation2"], gameObjectLibrary.data["vegetation1_1"], gameObjectLibrary.data["vegetation1_1"]];

    gameStage.update();

    gameTimeBuffer1 = true;
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", LoopGame4);
}

function LoopGame4(_evt) {
    let runTime = _evt.runTime / 1000;
    if (gameTimeBuffer1) {
        gameTimeBuffer2 = runTime;
        gameTimeBuffer1 = false;
        gameTimeBuffer3 = 0;
    }
    let time = runTime - gameTimeBuffer2;
    let deltaTime = time - gameTimeBuffer3;
    gameTimeBuffer3 = time;

    // environment
    let sinTime = Math.sin(time * 6);
    let cosTime = Math.cos(time * 3);
    for (let i = 0; i < game_wave.length; i++) {
        let wave = game_wave[i];
        wave.renderer.skewX = sinTime * 8;
        wave.renderer.skewY = cosTime * 0.5;
        wave.transform.posX = wave.transform.posX + 18 * deltaTime;
        if (wave.transform.posX > 1728 + 230) wave.transform.posX = -230;
        wave.UpdatePosition();
    }
    for (let i = 0; i < game_vegetation.length; i++) {
        let sinTime2 = Math.sin(time * 0.5 + i);
        game_vegetation[i].renderer.skewX = sinTime2 * 10 + i * 2;
    }

    // row3
    for (let i = 0; i < game_enemy[3].length; i++) {
        let row3char = game_enemy[3][i];
        row3char.transform.posX = (400 * i - time * 250) % (1728 + 200) - 100;
        if (row3char.transform.posX < -100) row3char.transform.posX = 1728 + 200 + row3char.transform.posX;
        row3char.SetAnimationIndex(Math.floor(row3char.transform.posX/40%4));
        row3char.UpdatePosition();
    }

    // row2
    for (let i = 0; i < game_enemy[2].length; i++) {
        let row2char = game_enemy[2][i];
        row2char.transform.posX = (321.33 * i + time * 120) % (1728 + 200) - 100;
        row2char.renderer.skewX = sinTime * 8;
        row2char.renderer.skewY = cosTime * 2;
        row2char.UpdatePosition();
    }

    // row1
    for (let i = 0; i < game_enemy[1].length; i++) {
        let row1char = game_enemy[1][i];
        row1char.transform.posX = (321.33 * i - time * 60) % (1728 + 200) - 100;
        if (row1char.transform.posX < -100) row1char.transform.posX = 1728 + 200 + row1char.transform.posX;
        row1char.SetAnimationIndex(Math.floor(row1char.transform.posX/10%8));
        row1char.UpdatePosition();
    }

    // row0
    for (let i = 0; i < game_enemy[0].length; i++) {
        let row0char = game_enemy[0][i];
        row0char.transform.posX = (350 * i + time * 60) % (1728 + 200) - 100;
        row0char.SetAnimationIndex(Math.floor(row0char.transform.posX/10%8));
        row0char.UpdatePosition();
    }

    if (game_char.isGrandReleasing) {
        game_move = -1;
        let grandReleaseTime = (time - game_char.grandReleasingTimeBuffer) / 2;
        let grand = game_char.grand;
        grand.transform.posY = gameGridY[0] * (1 - grandReleaseTime);
        grand.UpdatePosition();
        if (grandReleaseTime >= 1) {
            grand.renderer.alpha = 0;
            game_char.isGrandReleasing = false;
            game_char.target = false;
            gameIsGrandComing = true;
            gameGrandComingTimeBuffer = time;
            gameGrandIndex=(gameGrandIndex+1)%6;
            gameScore++;
            SetGame4UIState();
            if (gameScore == 3) {
                gameUIState = 2;
                SetGame4UIState();
                createjs.Ticker.removeEventListener("tick", LoopGame4);
            }
        }
    }

    if (gameIsGrandComing) {
        let grandComingTime = (time - gameGrandComingTimeBuffer) / 2;
        let grand = game_grand[gameGrandIndex];
        grand.transform.posX = 864 + grand.dx;
        grand.transform.posY = 895 + grand.h * (1 - grandComingTime);
        grand.UpdatePosition();
        grand.renderer.alpha = 1;
        if (grandComingTime >= 1) {
            gameIsGrandComing = false;
        }
    }

    if (game_char.isHit) {
        if (game_char.hitCheckBuffer) {
            game_char.hitTimeBuffer = time;
            let targetGridX = game_char.gridX, targetGridY = -1;
            if (game_char.hitRow == 3) {
                if (game_char.target) targetGridY = 3; else targetGridY = 1;
            }
            if (game_char.hitRow == 2) {
                if (game_char.target) targetGridY = 5; else targetGridY = 3;
            }
            if (game_char.hitRow == 1) {
                if (game_char.target) targetGridY = 11; else targetGridY = 9;
            }
            if (game_char.hitRow == 0) {
                if (game_char.target) targetGridY = 13; else targetGridY = 11;
            }
            game_char.hitOldPosX = game_char.posX;
            game_char.hitOldPosY = game_char.posY;
            game_char.hitBackGridX = targetGridX;
            game_char.hitBackGridY = targetGridY;
            game_char.hitCheckBuffer = false;
        }
        game_move = -1;
        let hitTime = (time - game_char.hitTimeBuffer) / 2;
        let hitBackPosX = gameGridX[game_char.hitBackGridX], hitBackPosY = gameGridY[game_char.hitBackGridY];
        game_char.SetPosition(
            game_char.hitOldPosX + (hitBackPosX - game_char.hitOldPosX) * hitTime, 
            game_char.hitOldPosY + (hitBackPosY - game_char.hitOldPosY) * hitTime
        );
        let blinkTime = Math.floor(hitTime * 12);
        game_char.woman.renderer.alpha = blinkTime % 2;
        if (game_char.target) game_char.grand.renderer.alpha = blinkTime % 2;
        if (hitTime > 1) {
            game_char.SetPosition(hitBackPosX,hitBackPosY);
            game_char.woman.renderer.alpha = 1;
            if (game_char.target) game_char.grand.renderer.alpha = 1;
            game_char.isHit = false;
            game_char.gridX = game_char.hitBackGridX;
            game_char.gridY = game_char.hitBackGridY;
        }
    } else {
        let gy = game_char.gridY, px = game_char.posX, py = game_char.posY;
        if (gy == 1 || gy == 2 || gy == 3) {
            if (py >= gameGridY[2] - 25 && py <= gameGridY[2] + 25) {
                for (let i = 0; i < game_enemy[3].length; i++) {
                    let enemy = game_enemy[3][i];
                    if (px >= enemy.transform.posX - 100 && px <= enemy.transform.posX + 100) {
                        game_char.isHit = true;
                        game_char.hitCheckBuffer = true;
                        game_char.hitRow = 3;
                    }
                }
            }
        }
        if (gy == 3 || gy == 4 || gy == 5) {
            if (py >= gameGridY[4] - 25 && py <= gameGridY[4] + 25) {
                for (let i = 0; i < game_enemy[2].length; i++) {
                    let enemy = game_enemy[2][i];
                    if (px >= enemy.transform.posX - 50 && px <= enemy.transform.posX + 50) {
                        game_char.isHit = true;
                        game_char.hitCheckBuffer = true;
                        game_char.hitRow = 2;
                    }
                }
            }
        }
        if (gy == 9 || gy == 10 || gy == 11) {
            if (py >= gameGridY[10] - 25 && py <= gameGridY[10] + 25) {
                for (let i = 0; i < game_enemy[1].length; i++) {
                    let enemy = game_enemy[1][i];
                    if (px >= enemy.transform.posX - 70 && px <= enemy.transform.posX + 70) {
                        game_char.isHit = true;
                        game_char.hitCheckBuffer = true;
                        game_char.hitRow = 1;
                    }
                }
            }
        }
        if (gy == 11 || gy == 12 || gy == 13) {
            if (py >= gameGridY[12] - 25 && py <= gameGridY[12] + 25) {
                for (let i = 0; i < game_enemy[0].length; i++) {
                    let enemy = game_enemy[0][i];
                    if (px >= enemy.transform.posX - 90 && px <= enemy.transform.posX + 90) {
                        game_char.isHit = true;
                        game_char.hitCheckBuffer = true;
                        game_char.hitRow = 0;
                    }
                }
            }
        }
    }

    if (game_move != -1) {
        if (gameMoveBuffer) {
            gameMoveTimeBuffer = time;
            gameMoveBuffer = false;
        }
        let gridX = game_char.gridX, gridY = game_char.gridY;
        if (game_move == 0) gridY-=1;
        if (game_move == 1) gridY+=1;
        if (game_move == 2) gridX-=1;
        if (game_move == 3) gridX+=1;
        if (gridY < 0 || gridY >= gameGridY.length || gridX < 0 || gridX >= gameGridX.length) {
            game_move = -1;
        } else if (!gameGrid[gridY][gridX]) {
            game_move = -1;
        } else {
            let moveTime = (time - gameMoveTimeBuffer) * 1;
            let oldPosX = gameGridX[game_char.gridX], oldPosY = gameGridY[game_char.gridY];
            let newPosX = gameGridX[gridX], newPosY = gameGridY[gridY];
            game_char.SetPosition(oldPosX + (newPosX - oldPosX) * moveTime, oldPosY + (newPosY - oldPosY) * moveTime);
            if (moveTime > 1) {
                game_char.SetPosition(newPosX, newPosY);
                game_move = -1;
                game_char.gridX = gridX;
                game_char.gridY = gridY;
                // Handle Attach End Point
                if (gridY == 0 && game_char.target) { // success and grand is releasing
                    game_char.isGrandReleasing = true;
                    game_char.grandReleasingTimeBuffer = time;
                }
                if (gridX == 8 && gridY == 14 && !game_char.target) {
                    game_char.grand = game_grand[gameGrandIndex];
                    game_char.target = true;
                    UpdateLayer(0,true);
                }
            }
        }
    }

    gameStage.update();
}

function UpdateLayer(_layer, _forceUpdate = false) {
    if (_forceUpdate) game_char.layer = -10;
    if (game_char.layer == _layer) return;
    game_char.layer = _layer;
    let l = 7;
    switch (game_char.layer) {
    case 0:
        for (let i = 0; i < game_enemy[3].length; i++) gameStage.setChildIndex(game_enemy[3][i].renderer,++l);
        for (let i = 0; i < game_enemy[2].length; i++) gameStage.setChildIndex(game_enemy[2][i].renderer,++l);
        for (let i = 0; i < game_enemy[1].length; i++) gameStage.setChildIndex(game_enemy[1][i].renderer,++l);
        for (let i = 0; i < game_enemy[0].length; i++) gameStage.setChildIndex(game_enemy[0][i].renderer,++l);
        gameStage.setChildIndex(game_char.grand.renderer,++l); gameStage.setChildIndex(game_char.woman.renderer,++l);
        break;
    case 1:
        for (let i = 0; i < game_enemy[3].length; i++) gameStage.setChildIndex(game_enemy[3][i].renderer,++l);
        for (let i = 0; i < game_enemy[2].length; i++) gameStage.setChildIndex(game_enemy[2][i].renderer,++l);
        for (let i = 0; i < game_enemy[1].length; i++) gameStage.setChildIndex(game_enemy[1][i].renderer,++l);
        gameStage.setChildIndex(game_char.grand.renderer,++l); gameStage.setChildIndex(game_char.woman.renderer,++l);
        for (let i = 0; i < game_enemy[0].length; i++) gameStage.setChildIndex(game_enemy[0][i].renderer,++l);
        break;
    case 2:
        for (let i = 0; i < game_enemy[3].length; i++) gameStage.setChildIndex(game_enemy[3][i].renderer,++l);
        for (let i = 0; i < game_enemy[2].length; i++) gameStage.setChildIndex(game_enemy[2][i].renderer,++l);
        gameStage.setChildIndex(game_char.grand.renderer,++l); gameStage.setChildIndex(game_char.woman.renderer,++l);
        for (let i = 0; i < game_enemy[1].length; i++) gameStage.setChildIndex(game_enemy[1][i].renderer,++l);
        for (let i = 0; i < game_enemy[0].length; i++) gameStage.setChildIndex(game_enemy[0][i].renderer,++l);
        break;
    case 3:
        for (let i = 0; i < game_enemy[3].length; i++) gameStage.setChildIndex(game_enemy[3][i].renderer,++l);
        gameStage.setChildIndex(game_char.grand.renderer,++l); gameStage.setChildIndex(game_char.woman.renderer,++l);
        for (let i = 0; i < game_enemy[2].length; i++) gameStage.setChildIndex(game_enemy[2][i].renderer,++l);
        for (let i = 0; i < game_enemy[1].length; i++) gameStage.setChildIndex(game_enemy[1][i].renderer,++l);
        for (let i = 0; i < game_enemy[0].length; i++) gameStage.setChildIndex(game_enemy[0][i].renderer,++l);
        break;
    case 4:
        gameStage.setChildIndex(game_char.grand.renderer,++l); gameStage.setChildIndex(game_char.woman.renderer,++l);
        for (let i = 0; i < game_enemy[3].length; i++) gameStage.setChildIndex(game_enemy[3][i].renderer,++l);
        for (let i = 0; i < game_enemy[2].length; i++) gameStage.setChildIndex(game_enemy[2][i].renderer,++l);
        for (let i = 0; i < game_enemy[1].length; i++) gameStage.setChildIndex(game_enemy[1][i].renderer,++l);
        for (let i = 0; i < game_enemy[0].length; i++) gameStage.setChildIndex(game_enemy[0][i].renderer,++l);
        break;
    }
}

function SetGame4UIState() {
    switch (gameUIState) {
        case 0:
            gameQuestionBallon.SetEnabled(false);
            gameScoreBallon.SetEnabled(false);
            gameUIMainBox.SetEnabled(false);
            gameUIMainTitle.SetEnabled(false);
            gameUIMainImage.SetEnabled(false);
            gameUIMainButton1.SetEnabled(false);
            gameUIMainButton2.SetEnabled(false);
            gameButtonUp.SetEnabled(false);
            gameButtonDown.SetEnabled(false);
            gameButtonLeft.SetEnabled(false);
            gameButtonRight.SetEnabled(false);
            break;
        case 1:
            gameQuestionBallon.SetEnabled(true);
            gameScoreBallon.SetEnabled(true);
            gameScoreBallon.Update({text:gameScore});
            gameQuestionBallon.Update({text:gameScore+"/3"});
            gameUIMainBox.SetEnabled(false);
            gameUIMainTitle.SetEnabled(false);
            gameUIMainImage.SetEnabled(false);
            gameUIMainButton1.SetEnabled(false);
            gameUIMainButton2.SetEnabled(false);
            gameButtonUp.SetEnabled(true);
            gameButtonDown.SetEnabled(true);
            gameButtonLeft.SetEnabled(true);
            gameButtonRight.SetEnabled(true);
            break;
        case 2:
            gameQuestionBallon.SetEnabled(true);
            gameScoreBallon.SetEnabled(true);
            gameUIMainBox.SetEnabled(true);
            gameUIMainTitle.SetEnabled(true);
            gameUIMainImage.SetEnabled(true);
            gameUIMainButton1.SetEnabled(true);
            gameUIMainButton2.SetEnabled(true);
            gameButtonUp.SetEnabled(true);
            gameButtonDown.SetEnabled(true);
            gameButtonLeft.SetEnabled(true);
            gameButtonRight.SetEnabled(true);
            break;
    }
}

function OnClickGame4UIButton(_buttonId) {
    if (_buttonId == 1) {
        gameStage.removeAllChildren();
        gameStage.clear();
        StartGame4();
    } else {
        document.removeEventListener("keydown", OnKeydownKeyboardArrow);
        ExitGameView();
    }
}
