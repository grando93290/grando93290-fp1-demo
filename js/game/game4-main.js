var gameSharedAssetLibrary;
var gameUILibrary;
var gameUIState;
var gamePopupAudio;
var gamePressAudio;
var gameTrueAudio;
var gameLoadingBar, gameLoadingBarNail;
var gameQuestionBallon, gameScoreBallon;
var gameLoadSceneAction;

var gameAssetLibrary;
var gameObjectLibrary;
var gameTimeBuffer1, gameTimeBuffer2, gameTimeBuffer3;

function InitializeGame(_data) {
    gameSharedAssetLibrary = new AssetLibrary({
        "game-popup-audio": {audio:"audio/game/popup.wav"},
        "game-press-audio": {audio:"audio/game/press.mp3"},
        "game-true-audio": {audio:"audio/game/true.wav"},
    }, null, InitializeGameScene);
    gamePopupAudio = gameSharedAssetLibrary.data["game-popup-audio"].audio;
    gamePressAudio = gameSharedAssetLibrary.data["game-press-audio"].audio;
    gameTrueAudio = gameSharedAssetLibrary.data["game-true-audio"].audio;
    InitializeGameUI();
    ShowLoadingUI();
}

function InitializeGameUI() {
    gameUILibrary = new UILibrary({});
    gameUILibrary.AddUIElements({
        "ui-loading-bg": {transform:{left:'0%', top:'0%', width:'100%', height:'100%'}, image:{imgSrc:"img/gameCommon/loading-bg-min.png"}},
        "ui-loading-title": {transform:{top:'15.4%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:52, letterSpacing:4, color:'#00693E', text:'「樂」於助人'}},
        "ui-loading-img-main": {transform:{left:'40.16%', top:'25.5%', width:'19.68%', height:'30.11%'}, image:{imgSrc:"img/game4ui/loading-main-min.png"}},
        "ui-loading-img-compass": {transform:{left:'53.2%', top:'43.4%', width:'9.03%', height:'16.33%'}, image:{imgSrc:"img/gameCommon/loading-compass-min.png"}},
        "ui-loading-loadingbar": {transform:{left:'30%', top:'64%', width:'40%', height:'1.8%'}, loadingBar:{color1: '#fff', color2: '#F97930', round: 10}},
        "ui-loading-img-nail": {transform:{left:'28%', top:'60%', width:'4%', height:'7.22%'}, image:{imgSrc:"img/gameCommon/loading-nail-min.png"}},
        "ui-loading-img-sound": {transform:{left:'17.5%', top:'77.5%', width:'3.47%', height:'6.67%'}, image:{imgSrc:"img/gameCommon/loading-sound.gif"}},
        "ui-loading-desc1": {transform:{left: '12%', top:'79.5%', width: '40%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'#F97930', text:'請打開聲音玩遊戲'}},
        "ui-loading-img-rotate": {transform:{left:'55.89%', top:'76.42%', width:'4.98%', height:'9.55%'}, image:{imgSrc:"img/gameCommon/loading-rotate.gif"}},
        "ui-loading-desc2": {transform:{left: '52.6%', top:'79.5%', width: '40%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'#F97930', text:'將你的裝置轉成橫向'}},

        "ui-question-count-ballon": {transform:{left:'79.16%', width:'7.52%', height:'9.59%'}, ballon:{imgSrc:"img/gameCommon/greenBallon-min.png", fontFamily:'CustomFont', fontSize:30, letterSpacing:4, color:'white', text:'1/3'}},
        "ui-score-count-ballon": {transform:{left:'86.68%', width:'7.52%', height:'9.59%'}, ballon:{imgSrc:"img/gameCommon/heartBallon-min.png", fontFamily:'CustomFont', fontSize:25, letterSpacing:4, color:'white', text:'0'}},

        "ui-button-left": {transform:{left:'55.89%', top:'76.42%', width:'4.98%', height:'9.55%'}, image:{imgSrc:"img/gameCommon/loading-rotate.gif"}},

        "ui-main-bg": {transform:{left:'15.28%', top:'11.11%', width:'69.44%', height:'77.78%'}, roundRect:{color:'white', round:150}},
        "ui-main-title": {transform:{top:'27.5%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:40, letterSpacing:4, color:'#00693E', text:'完成遊戲', lineHeight: 70}},
        "ui-main-image": {transform:{left:'37.7%', top:'40%', width:'27.25%', height:'12.44%'}, image:{imgSrc:"img/game4ui/elder-min.png"}},
        "ui-main-button1": {transform:{left:'33.1%', top:'61.5%', width:'16%', height:'9.36%'}, button:{imgSrc:"img/gameCommon/button-min.png", round:10, fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'white', text:'再玩一次', onclick:()=>{OnClickUIButton(1);}}},
        "ui-main-button2": {transform:{left:'50.9%', top:'61.5%', width:'16%', height:'9.36%'}, button:{imgSrc:"img/gameCommon/button-min.png", round:10, fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'white', text:'離開遊戲', onclick:()=>{OnClickUIButton(2);}}},

        "ui-test": {transform:{left:'0', top:'0', width:'100%', height:'100%'}, image:{imgSrc:"img/game4ui/2.png"}},
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

    gameUIMainBox = gameUILibrary.data["ui-main-bg"];
    gameUIMainTitle = gameUILibrary.data["ui-main-title"];
    gameUIMainDesc = gameUILibrary.data["ui-main-desc"];
    gameUIMainImage = gameUILibrary.data["ui-main-image"];
    gameUIMainButton1 = gameUILibrary.data["ui-main-button1"];
    gameUIMainButton2 = gameUILibrary.data["ui-main-button2"];

    // gameUILibrary.data["ui-test"].SetEnabled(true);
    // gameUILibrary.data["ui-test"].dom.style.opacity = '50%';
}

function ShowLoadingUI() {
    gameUILibrary.data["ui-loading-bg"].SetEnabled(true);
    gameUILibrary.data["ui-loading-title"].SetEnabled(true);
    gameUILibrary.data["ui-loading-img-main"].SetEnabled(true);
    gameUILibrary.data["ui-loading-img-compass"].SetEnabled(true);
    gameUILibrary.data["ui-loading-loadingbar"].SetEnabled(true);
    gameUILibrary.data["ui-loading-img-nail"].SetEnabled(true);
    gameUILibrary.data["ui-loading-img-sound"].SetEnabled(true);
    gameUILibrary.data["ui-loading-desc1"].SetEnabled(true);
    gameUILibrary.data["ui-loading-img-rotate"].SetEnabled(true);
    gameUILibrary.data["ui-loading-desc2"].SetEnabled(true);
}

function UpdateLoadingBar(_progress) {
    gameLoadingBar.UpdateLoadingBar(_progress);
    gameLoadingBarNail.Update({left: (27+((_progress/100)*44))+'%'});
}

function HideLoadingUI() {
    gameUILibrary.data["ui-loading-bg"].SetEnabled(false);
    gameUILibrary.data["ui-loading-title"].SetEnabled(false);
    gameUILibrary.data["ui-loading-img-main"].SetEnabled(false);
    gameUILibrary.data["ui-loading-img-compass"].SetEnabled(false);
    gameUILibrary.data["ui-loading-loadingbar"].SetEnabled(false);
    gameUILibrary.data["ui-loading-img-nail"].SetEnabled(false);
    gameUILibrary.data["ui-loading-img-sound"].SetEnabled(false);
    gameUILibrary.data["ui-loading-desc1"].SetEnabled(false);
    gameUILibrary.data["ui-loading-img-rotate"].SetEnabled(false);
    gameUILibrary.data["ui-loading-desc2"].SetEnabled(false);
    UpdateLoadingBar(0);
}

function InitializeGameScene() {
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
        "game4-woman": {image:"img/game4/game4-woman-min.png"},
        "game4-grand": {image:"img/game4/game4-grand-min.png"},
    }, UpdateLoadingBar, StartGame);
}

var game_wave, game_bridge, game_vegetation;
var game_enemy, game_char;

function StartGame() {
    HideLoadingUI();
    gameUIState = 1;
    gameScore = 0;
    SetUIState();

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

    let womanSpriteSheet = new createjs.SpriteSheet({ 
        images: [gameAssetLibrary.data["game4-woman"].image], 
        frames: {width:108, height:165},
        animations: {'a0':0,'a1':1,'a2':2,'a3':3,}
    });

    let grandSpriteSheet = new createjs.SpriteSheet({ 
        images: [gameAssetLibrary.data["game4-grand"].image], 
        frames: {width:87, height:145},
        animations: {'a0':0,'a1':1,'a2':2,'a3':3,'a4':4,'a5':5,}
    });

    gameObjectLibrary = new GameObjectLibrary({
        "bg": {transform:{posX:0, posY:0, sizeX:1728, sizeY:900},bitmap:gameAssetLibrary.data["game4-bg"]},
        "vegetation1": {transform:{posX:58, posY:58, sizeX:172, sizeY:69, anchorX:0.5, anchorY:1},bitmap:gameAssetLibrary.data["game4-vegetation1"]},
        "vegetation4": {transform:{posX:435, posY:98, sizeX:493, sizeY:94, anchorX:0.5, anchorY:1},bitmap:gameAssetLibrary.data["game4-vegetation4"]},
        "vegetation5": {transform:{posX:1313, posY:78, sizeX:301, sizeY:93, anchorX:0.5, anchorY:1},bitmap:gameAssetLibrary.data["game4-vegetation5"]},
        "wave1": {transform:{posX:1474, posY:425, sizeX:380, sizeY:74, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game4-wave"]},
        "wave2": {transform:{posX:617, posY:442, sizeX:500, sizeY:97, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game4-wave"]},
        "wave3": {transform:{posX:21, posY:430, sizeX:426, sizeY:83, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game4-wave"]},
        "bridge": {transform:{posX:112 + 188 * Math.floor(Math.random()*8.99), posY:424, sizeX:188, sizeY:166, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game4-bridge"]},
        "vegetation3": {transform:{posX:333, posY:873, sizeX:483, sizeY:156, anchorX:0.5, anchorY:1},bitmap:gameAssetLibrary.data["game4-vegetation3"]},
        "vegetation2": {transform:{posX:55, posY:898, sizeX:149, sizeY:106, anchorX:0.5, anchorY:1},bitmap:gameAssetLibrary.data["game4-vegetation2"]},
        "vegetation1_1": {transform:{posX:1549, posY:803, sizeX:172, sizeY:69, anchorX:0.5, anchorY:1},bitmap:gameAssetLibrary.data["game4-vegetation1"]},
        "vegetation1_2": {transform:{posX:1660, posY:861, sizeX:172, sizeY:69, anchorX:0.5, anchorY:1},bitmap:gameAssetLibrary.data["game4-vegetation1"]},
    });
    game_wave = [gameObjectLibrary.data["wave1"], gameObjectLibrary.data["wave2"], gameObjectLibrary.data["wave3"]];
    game_bridge = gameObjectLibrary.data["bridge"];
    game_vegetation = [gameObjectLibrary.data["vegetation1"], gameObjectLibrary.data["vegetation4"], gameObjectLibrary.data["vegetation5"], gameObjectLibrary.data["vegetation3"], gameObjectLibrary.data["vegetation2"], gameObjectLibrary.data["vegetation1_1"], gameObjectLibrary.data["vegetation1_1"]];

    game_enemy = [[],[],[],[]];
    for (let i = 0; i < 3; i++) { // row0: 3 tortoise
        game_enemy[0].push(gameObjectLibrary.AddGameObject("enemy_row0_tortoise"+i, {transform:{posX:200 + i * 400, posY:690, sizeX:128, sizeY:87, anchorX: 0.5, anchorY: 0.5, flip:true}, sprite:{spriteSheet:tortoiseSpriteSheet, spriteIndices:[0,1,2,3,4,5,6,7]}}));
    }
    for (let i = 0; i < 6; i++) { // row1: 6 tortoise
        game_enemy[1].push(gameObjectLibrary.AddGameObject("enemy_row1_tortoise"+i, {transform:{posX:200 + i * 300, posY:550, sizeX:128, sizeY:87, anchorX: 0.5, anchorY: 0.5, flip:false}, sprite:{spriteSheet:tortoiseSpriteSheet, spriteIndices:[0,1,2,3,4,5,6,7]}}));
    }
    for (let i = 0; i < 5; i++) { // row2: 5 nail
        game_enemy[2].push(gameObjectLibrary.AddGameObject("enemy_row2_snail"+i, {transform:{posX:200 + i * 300, posY:285, sizeX:67, sizeY:54, anchorX: 0.5, anchorY: 0.5, flip:false}, bitmap:gameAssetLibrary.data["game4-snail"]}));
    }
    for (let i = 0; i < 4; i++) { // row2: 4 cat
        game_enemy[3].push(gameObjectLibrary.AddGameObject("enemy_row3_cat"+i, {transform:{posX:200 + i * 400, posY:150, sizeX:142, sizeY:140, anchorX: 0.5, anchorY: 0.5, flip:false}, sprite:{spriteSheet:catSpriteSheet, spriteIndices:[0,1,2,3,4,5]}}));
    }

    gameStage.update();

    gameTimeBuffer1 = true;
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", LoopGame);
}

function LoopGame(_evt) {
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

    // row0
    for (let i = 0; i < game_enemy[0].length; i++) {
        let row0char = game_enemy[0][i];
        row0char.transform.posX = row0char.transform.posX + 100 * deltaTime;
        if (row0char.transform.posX > 1728 + 68) row0char.transform.posX = -68;
        row0char.SetAnimationIndex(Math.floor(row0char.transform.posX/10%8));
        row0char.UpdatePosition();
    }

    // row1
    for (let i = 0; i < game_enemy[1].length; i++) {
        let row1char = game_enemy[1][i];
        row1char.transform.posX = row1char.transform.posX - 100 * deltaTime;
        if (row1char.transform.posX < -68) row1char.transform.posX = 1728 + 68;
        row1char.SetAnimationIndex(Math.floor(row1char.transform.posX/10%8));
        row1char.UpdatePosition();
    }

    // row2
    for (let i = 0; i < game_enemy[2].length; i++) {
        let row2char = game_enemy[2][i];
        row2char.transform.posX = row2char.transform.posX + 60 * deltaTime;
        if (row2char.transform.posX > 1728 + 34) row2char.transform.posX = -34;
        row2char.renderer.skewX = sinTime * 8;
        row2char.renderer.skewY = cosTime * 2;
        row2char.UpdatePosition();
    }

    // row1
    for (let i = 0; i < game_enemy[3].length; i++) {
        let row3char = game_enemy[3][i];
        row3char.transform.posX = row3char.transform.posX - 300 * deltaTime;
        if (row3char.transform.posX < -71) row3char.transform.posX = 1728 + 71;
        row3char.SetAnimationIndex(Math.floor(row3char.transform.posX/40%4));
        row3char.UpdatePosition();
    }


    gameStage.update();
}

function SetUIState() {
    switch (gameUIState) {
        case 0:
            break;
    }
}

function OnClickUIButton(_buttonId) {
    if (_buttonId == 1) {
        StartGame();
    } else {
        ExitGameView();
    }
}

function PlayAudio(_audio) {
    _audio.currentTime = 0;
    _audio.play();
}