var gameSharedAssetLibrary;
var gameUILibrary;
var gameUIState;
var gamePopupAudio;
var gamePressAudio;
var gameTrueAudio;
var gameLoadingBar, gameLoadingBarNail;

var debugLog = [];

function InitializeGame() {
    gameSharedAssetLibrary = new AssetLibrary({
        "game-popup-audio": {audio:"audio/game/popup.wav"},
        "game-press-audio": {audio:"audio/game/press.mp3"},
        "game-true-audio": {audio:"audio/game/true.wav"},
    }, null, LoadRandomScene);
    gamePopupAudio = gameSharedAssetLibrary.data["game-popup-audio"].audio;
    gamePressAudio = gameSharedAssetLibrary.data["game-press-audio"].audio;
    gameTrueAudio = gameSharedAssetLibrary.data["game-true-audio"].audio;
    InitializeGameUI();
    ShowLoadingUI();

    // gameUI.addEventListener("click", function(evt) {
    //     var windowAspectRatio = window.innerWidth / window.innerHeight;
    //     var pointerPosX = 0, pointerPosY = 0;
    //     if (windowAspectRatio > gameAspectRatio) {
    //         canvasH = window.innerHeight;
    //         canvasW = canvasH * gameAspectRatio;
    //         canvasScale = canvasW / gameOriginalWidth;
    //         pointerPosX = Math.floor((evt.x - (window.innerWidth - canvasW) * 0.5) / canvasScale);
    //         pointerPosY = Math.floor(evt.y / canvasScale);
    //     } else {
    //         canvasW = window.innerWidth;
    //         canvasH = canvasW / gameAspectRatio;
    //         canvasScale = canvasW / gameOriginalWidth;
    //         pointerPosX = Math.floor(evt.x / canvasScale);
    //         pointerPosY = Math.floor((evt.y - (window.innerHeight - canvasH) * 0.5) / canvasScale);
    //     }
    //     debugLog.push("{ time: "+(debugLog.length+1)+", x: "+pointerPosX+", y: "+pointerPosY+" },");
    //     let debugLogText = "";
    //     for (var i = 0 ;i < debugLog.length; i++) debugLogText += debugLog[i] + "\n";
    //     console.log(debugLogText); 
    // });
}

function InitializeGameUI() {
    gameUILibrary = new UILibrary({});
    gameUILibrary.AddUIElements({
        "ui-loading-bg": {transform:{left:'0%', top:'0%', width:'100%', height:'100%'}, image:{imgSrc:"img/gameCommon/loading-bg.png"}},
        "ui-loading-title": {transform:{top:'17.5%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:46, letterSpacing:4, color:'#00693E', text:'「觀」官相識'}},
        "ui-loading-img-main": {transform:{left:'37.375%', top:'24.5%', width:'25.25%', height:'35.89%'}, image:{imgSrc:"img/game2ui/loading-main.png"}},
        "ui-loading-img-compass": {transform:{left:'55.7%', top:'48.2%', width:'9.75%', height:'16.33%'}, image:{imgSrc:"img/gameCommon/loading-compass.png"}},
        "ui-loading-loadingbar": {transform:{left:'28%', top:'70.5%', width:'44%', height:'1.8%'}, loadingBar:{color1: '#fff', color2: '#F97930', round: 10}},
        "ui-loading-img-nail": {transform:{left:'27%', top:'66.5%', width:'4%', height:'7.22%'}, image:{imgSrc:"img/gameCommon/loading-nail.png"}},
        "ui-loading-img-sound": {transform:{left:'39.3%', top:'77.5%', width:'2.75%', height:'5%'}, image:{imgSrc:"img/gameCommon/loading-sound.png"}},
        "ui-loading-desc": {transform:{left: '1.9%', top:'78.5%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'#F97930', text:'請打開聲音玩遊戲'}},

        "ui-question-count-ballon": {transform:{left:'81.5%', width:'8%', height:'9.5%'}, ballon:{imgSrc:"img/gameCommon/greenBallon.png", fontFamily:'CustomFont', fontSize:34, letterSpacing:4, color:'white', text:'0/5'}},
        "ui-score-count-ballon": {transform:{left:'89.5%', width:'8%', height:'9.5%'}, ballon:{imgSrc:"img/gameCommon/heartBallon.png", fontFamily:'CustomFont', fontSize:27, letterSpacing:4, color:'white', text:'0'}},
        "ui-main-bg": {transform:{left:'20.93%', top:'17.78%', width:'58.12%', height:'64.44%'}, roundRect:{color:'white', round:150}},
        "ui-main-title": {transform:{top:'25.2%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:37, letterSpacing:4, color:'#00693E', text:''}},
        "ui-main-desc": {transform:{top:'56%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:20, letterSpacing:4, color:'#161616', text:''}},
        "ui-main-button1": {transform:{left:'33.1%', top:'34.78%', width:'33.8%', height:'7.8%'}, button:{imgSrc:"img/gameCommon/button.png", round:10, fontFamily:'CustomFont', fontSize:34, letterSpacing:4, color:'white', text:'', onclick:()=>{OnClickUIButton(1);}}},
        "ui-main-button2": {transform:{left:'33.1%', top:'45.25%', width:'33.8%', height:'7.8%'}, button:{imgSrc:"img/gameCommon/button.png", round:10, fontFamily:'CustomFont', fontSize:34, letterSpacing:4, color:'white', text:'', onclick:()=>{OnClickUIButton(2);}}},
        "ui-main-button3": {transform:{left:'33.1%', top:'55.72%', width:'33.8%', height:'7.8%'}, button:{imgSrc:"img/gameCommon/button.png", round:10, fontFamily:'CustomFont', fontSize:34, letterSpacing:4, color:'white', text:'', onclick:()=>{OnClickUIButton(3);}}},
        "ui-main-button4": {transform:{left:'33.1%', top:'66.19%', width:'33.8%', height:'7.8%'}, button:{imgSrc:"img/gameCommon/button.png", round:10, fontFamily:'CustomFont', fontSize:34, letterSpacing:4, color:'white', text:'', onclick:()=>{OnClickUIButton(4);}}},
        "ui-main-image-correct": {transform:{left:'45.31%', top:'29%', width:'9.375%', height:'16.67%'}, image:{imgSrc:"img/gameCommon/correct.png"}},
        "ui-main-image-wrong": {transform:{left:'45.31%', top:'29%', width:'9.375%', height:'16.67%'}, image:{imgSrc:"img/gameCommon/wrong.png"}},
        "ui-main-image-bird": {transform:{left:'42.53%', top:'29%', width:'14.94%', height:'19.83%'}, image:{imgSrc:"img/game2ui/bird.png"}},
    });
    gameUILibrary.AddUIResizeEvent();
    gameUIState = 0;
    gameLoadingBar = gameUILibrary.data["ui-loading-loadingbar"];
    gameLoadingBarNail = gameUILibrary.data["ui-loading-img-nail"];
}

function ShowLoadingUI() {
    gameUILibrary.data["ui-question-count-ballon"].SetEnabled(false);
    gameUILibrary.data["ui-score-count-ballon"].SetEnabled(false);
    gameUILibrary.data["ui-loading-bg"].SetEnabled(true);
    gameUILibrary.data["ui-loading-title"].SetEnabled(true);
    gameUILibrary.data["ui-loading-img-main"].SetEnabled(true);
    gameUILibrary.data["ui-loading-img-compass"].SetEnabled(true);
    gameUILibrary.data["ui-loading-loadingbar"].SetEnabled(true);
    gameUILibrary.data["ui-loading-img-nail"].SetEnabled(true);
    gameUILibrary.data["ui-loading-img-sound"].SetEnabled(true);
    gameUILibrary.data["ui-loading-desc"].SetEnabled(true);
}

function UpdateLoadingBar(_progress) {
    gameLoadingBar.UpdateLoadingBar(_progress);
    gameLoadingBarNail.Update({left: (27+((_progress/100)*44))+'%'});
}

function HideLoadingUI() {
    gameUILibrary.data["ui-question-count-ballon"].SetEnabled(true);
    gameUILibrary.data["ui-score-count-ballon"].SetEnabled(true);
    gameUILibrary.data["ui-loading-bg"].SetEnabled(false);
    gameUILibrary.data["ui-loading-title"].SetEnabled(false);
    gameUILibrary.data["ui-loading-img-main"].SetEnabled(false);
    gameUILibrary.data["ui-loading-img-compass"].SetEnabled(false);
    gameUILibrary.data["ui-loading-loadingbar"].SetEnabled(false);
    gameUILibrary.data["ui-loading-img-nail"].SetEnabled(false);
    gameUILibrary.data["ui-loading-img-sound"].SetEnabled(false);
    gameUILibrary.data["ui-loading-desc"].SetEnabled(false);
    UpdateLoadingBar(0);
}

function LoadRandomScene() {
    gameSceneIndex = Math.floor(Math.random() * 4) + 1;
    switch (gameSceneIndex) {
        case 1:
            InitializeGameScene1();
            break;
        case 2:
            InitializeGameScene2();
            break;
        case 3:
            InitializeGameScene3();
            break;
        case 4:
            InitializeGameScene4();
            break;
    }
}

var gameAssetLibrary;
var gameObjectLibrary;
var gameTimeBuffer1, gameTimeBuffer2;
var gameSceneIndex;

var gameQuestionLibrary;
var gameQuestionSelected;
var gameQuestionIndex;
var gameQuestionScore;
var gameQuestionCorrect;

// quick access / buffer
var s1_grass, s1_flower1, s1_flower2, s1_flower3, s1_flower4, s1_flower5, s1_cloud1, s1_cloud2, s1_cloud3;
var s1_bird1, s1_bird2, s1_bird3, s1_bird4, s1_bird5, s1_bird6;
var s1_butterfly1, s1_butterfly2, s1_butterfly3, s1_butterfly4, s1_butterfly5, s1_butterfly6;
var s1_tortoiseBody, s1_tortoiseLeg1, s1_tortoiseLeg2;
var s1_tortoisePosX, s1_tortoisePosY;

function InitializeGameScene1() {
    gameAssetLibrary = new AssetLibrary({
        "game2-scene1-bird": {image:"img/game2/game2-scene1-bird-min.png"},
        "game2-scene1-brush": {image:"img/game2/game2-scene1-brush-min.png"},
        "game2-scene1-butterfly": {image:"img/game2/game2-scene1-butterfly-min.png"},
        "game2-scene1-cloud1": {image:"img/game2/game2-scene1-cloud1-min.png"},
        "game2-scene1-cloud2": {image:"img/game2/game2-scene1-cloud2-min.png"},
        "game2-scene1-cloud3": {image:"img/game2/game2-scene1-cloud3-min.png"},
        "game2-scene1-flower1": {image:"img/game2/game2-scene1-flower1-min.png"},
        "game2-scene1-flower2": {image:"img/game2/game2-scene1-flower2-min.png"},
        "game2-scene1-flower3": {image:"img/game2/game2-scene1-flower3-min.png"},
        "game2-scene1-flower4": {image:"img/game2/game2-scene1-flower4-min.png"},
        "game2-scene1-flower5": {image:"img/game2/game2-scene1-flower5-min.png"},
        "game2-scene1-grass": {image:"img/game2/game2-scene1-grass-min.png"},
        "game2-scene1-hill": {image:"img/game2/game2-scene1-hill-min.png"},
        "game2-scene1-man": {image:"img/game2/game2-scene1-man-min.png"},
        "game2-scene1-sky": {image:"img/game2/game2-scene1-sky-min.png"},
        "game2-scene1-tortoise-body": {image:"img/game2/game2-scene1-tortoise-body-min.png"},
        "game2-scene1-tortoise-leg1": {image:"img/game2/game2-scene1-tortoise-leg1-min.png"},
        "game2-scene1-tortoise-leg2": {image:"img/game2/game2-scene1-tortoise-leg2-min.png"},
        "game2-scene1-audio": {audio:"audio/game/game2scene1.mp3"},
    }, UpdateLoadingBar, StartGameScene1);
}

function StartGameScene1() {

    //console.log(JSON.stringify());
    HideLoadingUI();
    InitializeGameScene1Question();

    gameObjectLibrary = new GameObjectLibrary({
        "s1_sky": {transform:{posX:0, posY:0, sizeX:1920, sizeY:1080},bitmap:gameAssetLibrary.data["game2-scene1-sky"]},
        "s1_cloud1": {transform:{posX:-50, posY:60, sizeX:486, sizeY:180},bitmap:gameAssetLibrary.data["game2-scene1-cloud1"]},
        "s1_cloud2": {transform:{posX:1200, posY:40, sizeX:506, sizeY:186},bitmap:gameAssetLibrary.data["game2-scene1-cloud2"]},
        "s1_cloud3": {transform:{posX:250, posY:240, sizeX:736, sizeY:334},bitmap:gameAssetLibrary.data["game2-scene1-cloud3"]},
        "s1_hill": {transform:{posX:0, posY:350, sizeX:1920, sizeY:730},bitmap:gameAssetLibrary.data["game2-scene1-hill"]},
        "s1_grass": {transform:{posX:0, posY:640+440, sizeX:1920, sizeY:440, anchorX: 0, anchorY: 1},bitmap:gameAssetLibrary.data["game2-scene1-grass"]},
        "s1_flower1": {transform:{posX:142, posY:728+110, sizeX:480, sizeY:110, anchorX: 0, anchorY: 1},bitmap:gameAssetLibrary.data["game2-scene1-flower1"]},
        "s1_flower2": {transform:{posX:1250, posY:728+122, sizeX:560, sizeY:122, anchorX: 0, anchorY: 1},bitmap:gameAssetLibrary.data["game2-scene1-flower2"]},
        "s1_tortoise-leg2": {transform:{posX:300, posY:900, sizeX:128, sizeY:87, anchorX: 0, anchorY: 1},bitmap:gameAssetLibrary.data["game2-scene1-tortoise-leg2"]},
        "s1_tortoise-leg1": {transform:{posX:300, posY:900, sizeX:128, sizeY:87, anchorX: 0, anchorY: 1},bitmap:gameAssetLibrary.data["game2-scene1-tortoise-leg1"]},
        "s1_tortoise-body": {transform:{posX:300, posY:900, sizeX:128, sizeY:87, anchorX: 0, anchorY: 1},bitmap:gameAssetLibrary.data["game2-scene1-tortoise-body"]},
        "s1_brush": {transform:{posX:0, posY:0, sizeX:1920, sizeY:1080},bitmap:gameAssetLibrary.data["game2-scene1-brush"]},
        "s1_flower3": {transform:{posX:570, posY:818+72, sizeX:170, sizeY:72, anchorX: 0, anchorY: 1},bitmap:gameAssetLibrary.data["game2-scene1-flower3"]},
        "s1_flower4": {transform:{posX:1300, posY:808+190, sizeX:545, sizeY:190, anchorX: 0, anchorY: 1},bitmap:gameAssetLibrary.data["game2-scene1-flower4"]},
        "s1_flower5": {transform:{posX:30, posY:878+168, sizeX:650, sizeY:168, anchorX: 0, anchorY: 1},bitmap:gameAssetLibrary.data["game2-scene1-flower5"]},
    });
    s1_grass = gameObjectLibrary.data["s1_grass"];
    s1_flower1 = gameObjectLibrary.data["s1_flower1"];
    s1_flower2 = gameObjectLibrary.data["s1_flower2"];
    s1_flower3 = gameObjectLibrary.data["s1_flower3"];
    s1_flower4 = gameObjectLibrary.data["s1_flower4"];
    s1_flower5 = gameObjectLibrary.data["s1_flower5"];
    s1_cloud1 = gameObjectLibrary.data["s1_cloud1"];
    s1_cloud2 = gameObjectLibrary.data["s1_cloud2"];
    s1_cloud3 = gameObjectLibrary.data["s1_cloud3"];
    s1_tortoiseBody = gameObjectLibrary.data["s1_tortoise-body"];
    s1_tortoiseLeg1 = gameObjectLibrary.data["s1_tortoise-leg1"];
    s1_tortoiseLeg2 = gameObjectLibrary.data["s1_tortoise-leg2"];
    s1_tortoisePosX = 300;
    s1_tortoisePosY = 910;
    var birdSpriteSheet = new createjs.SpriteSheet({ 
        images: [gameAssetLibrary.data["game2-scene1-bird"].image], 
        frames: {width:100, height:79},
        animations: {'a0':0,'a1':1,'a2':2,'a3':3,'a4':4,'a5':5,'a6':6,'a7':7,'a8':8,'a9':9,'a10':10,'a11':11,}
    });
    var butterflySpriteSheet = new createjs.SpriteSheet({ 
        images: [gameAssetLibrary.data["game2-scene1-butterfly"].image], 
        frames: {width:40, height:38},
        animations: {'a0':0,'a1':1,'a2':2,'a3':3,}
    });
    s1_bird1 = gameObjectLibrary.AddGameObject("s1_bird1", {transform:{posX:-50, posY:500, sizeX:100, sizeY:79, anchorX: 0.5, anchorY: 1, flip:true}, sprite:{spriteSheet:birdSpriteSheet, spriteIndices:[0,1]}});
    s1_bird2 = gameObjectLibrary.AddGameObject("s1_bird2", {transform:{posX:-50, posY:500, sizeX:100, sizeY:79, anchorX: 0.5, anchorY: 1, flip:true}, sprite:{spriteSheet:birdSpriteSheet, spriteIndices:[2,3]}});
    s1_bird3 = gameObjectLibrary.AddGameObject("s1_bird3", {transform:{posX:-50, posY:500, sizeX:100, sizeY:79, anchorX: 0.5, anchorY: 1, flip:true}, sprite:{spriteSheet:birdSpriteSheet, spriteIndices:[4,5]}});
    s1_bird4 = gameObjectLibrary.AddGameObject("s1_bird4", {transform:{posX:-50, posY:500, sizeX:100, sizeY:79, anchorX: 0.5, anchorY: 1, flip:true}, sprite:{spriteSheet:birdSpriteSheet, spriteIndices:[6,7]}});
    s1_bird5 = gameObjectLibrary.AddGameObject("s1_bird5", {transform:{posX:-50, posY:500, sizeX:100, sizeY:79, anchorX: 0.5, anchorY: 1, flip:true}, sprite:{spriteSheet:birdSpriteSheet, spriteIndices:[8,9]}});
    s1_bird6 = gameObjectLibrary.AddGameObject("s1_bird6", {transform:{posX:-50, posY:500, sizeX:100, sizeY:79, anchorX: 0.5, anchorY: 1, flip:true}, sprite:{spriteSheet:birdSpriteSheet, spriteIndices:[10,11]}});

    s1_bird1.SetupAnimation([
        { time: 1.1, x: -100, y: 266 },
        { time: 2.2, x: 832, y: 164 },
        { time: 3.1, x: 1707, y: 312 },
        { time: 12, x: 1707, y: 312 },
        { time: 13, x: 2000, y: 63 },
    ]);

    s1_bird2.SetupAnimation([
        { time: 1, x: -100, y: 275 },
        { time: 1.9, x: 512, y: 155 },
        { time: 2.8, x: 1276, y: 312 },
        { time: 3.7, x: 2000, y: 101 },
    ]);

    s1_bird3.SetupAnimation([
        { time: 5, x: -100, y: 290 },
        { time: 6, x: 502, y: 183 },
        { time: 7, x: 1187, y: 330 },
        { time: 8, x: 2000, y: 162 },
    ]);

    s1_bird4.SetupAnimation([
        { time: 5.15, x: -100, y: 290 },
        { time: 6.15, x: 462, y: 163 },
        { time: 7.15, x: 1200, y: 330 },
        { time: 8.15, x: 2000, y: 162 },
    ]);

    s1_bird5.SetupAnimation([
        { time: 5.3, x: -100, y: 290 },
        { time: 6.3, x: 482, y: 173 },
        { time: 7.3, x: 1167, y: 330 },
        { time: 8.3, x: 2000, y: 162 },
    ]);

    s1_bird6.SetupAnimation([
        { time: 9, x: -100, y: 100 },
        { time: 10, x: 395, y: 360 },
        { time: 11, x: 1000, y: 188 },
        { time: 13, x: 2000, y: 300 },
    ]);

    s1_butterfly1 = gameObjectLibrary.AddGameObject("s1_butterfly1", {transform:{posX:-50, posY:500, sizeX:40, sizeY:38, anchorX: 0.5, anchorY: 1, flip:false}, sprite:{spriteSheet:butterflySpriteSheet, spriteIndices:[0,1]}});
    s1_butterfly2 = gameObjectLibrary.AddGameObject("s1_butterfly2", {transform:{posX:-50, posY:500, sizeX:40, sizeY:38, anchorX: 0.5, anchorY: 1, flip:true}, sprite:{spriteSheet:butterflySpriteSheet, spriteIndices:[2,3]}});
    s1_butterfly3 = gameObjectLibrary.AddGameObject("s1_butterfly3", {transform:{posX:-50, posY:500, sizeX:40, sizeY:38, anchorX: 0.5, anchorY: 1, flip:false}, sprite:{spriteSheet:butterflySpriteSheet, spriteIndices:[0,1]}});
    s1_butterfly4 = gameObjectLibrary.AddGameObject("s1_butterfly4", {transform:{posX:-50, posY:500, sizeX:40, sizeY:38, anchorX: 0.5, anchorY: 1, flip:false}, sprite:{spriteSheet:butterflySpriteSheet, spriteIndices:[2,3]}});
    s1_butterfly5 = gameObjectLibrary.AddGameObject("s1_butterfly5", {transform:{posX:-50, posY:500, sizeX:40, sizeY:38, anchorX: 0.5, anchorY: 1, flip:true}, sprite:{spriteSheet:butterflySpriteSheet, spriteIndices:[0,1]}});
    s1_butterfly6 = gameObjectLibrary.AddGameObject("s1_butterfly6", {transform:{posX:-50, posY:500, sizeX:40, sizeY:38, anchorX: 0.5, anchorY: 1, flip:true}, sprite:{spriteSheet:butterflySpriteSheet, spriteIndices:[2,3]}});

    s1_butterfly1.SetupAnimation([
        { time: 1, x: 1950, y: 767 },
        { time: 2, x: 1816, y: 799 },
        { time: 3, x: 1728, y: 854 },
        { time: 4, x: 1630, y: 917 },
        { time: 5, x: 1492, y: 906 },
        { time: 6, x: 1364, y: 854 },
        { time: 7, x: 1226, y: 789 },
        { time: 8, x: 1062, y: 771 },
        { time: 9, x: 883, y: 799 },
        { time: 10, x: 741, y: 865 },
        { time: 11, x: 647, y: 944 },
        { time: 12, x: 496, y: 1000 },
    ]);

    s1_butterfly2.SetupAnimation([
        { time: 1, x: -30, y: 684 },
        { time: 2, x: 129, y: 716 },
        { time: 3, x: 236, y: 771 },
        { time: 4, x: 324, y: 869 },
        { time: 5, x: 431, y: 957 },
        { time: 6, x: 547, y: 1005 },
        { time: 7, x: 741, y: 1000 },
        { time: 8, x: 900, y: 939 },
        { time: 9, x: 1014, y: 878 },
        { time: 10, x: 1195, y: 850 },
        { time: 11, x: 1364, y: 850 },
        { time: 12, x: 1505, y: 817 },
        { time: 13, x: 1639, y: 880 },
        { time: 14, x: 1794, y: 935 },
        { time: 15, x: 1950, y: 889 },
    ]);

    s1_butterfly3.SetupAnimation([
        { time: 2.5, x: 1658, y: 788 },
        { time: 3.5, x: 1552, y: 727 },
        { time: 4.5, x: 1471, y: 692 },
        { time: 5.5, x: 1353, y: 708 },
        { time: 6.5, x: 1208, y: 749 },
        { time: 7.5, x: 1088, y: 826 },
        { time: 8.5, x: 1032, y: 933 },
        { time: 9.5, x: 995, y: 1011 },
        { time: 10.5, x: 859, y: 1040 },
        { time: 11.5, x: 737, y: 996 },
        { time: 12.5, x: 682, y: 939 },
        { time: 13.5, x: 634, y: 887 },
    ]);

    s1_butterfly4.SetupAnimation([
        { time: 3.5, x: 1445, y: 919 },
        { time: 4.5, x: 1298, y: 891 },
        { time: 5.5, x: 1228, y: 812 },
        { time: 6.5, x: 1125, y: 741 },
        { time: 7.5, x: 1023, y: 703 },
        { time: 8.5, x: 900, y: 732 },
        { time: 9.5, x: 737, y: 791 },
        { time: 10.5, x: 617, y: 813 },
        { time: 11.5, x: 505, y: 764 },
    ]);

    s1_butterfly5.SetupAnimation([
        { time: 2, x: 217, y: 747 },
        { time: 3, x: 320, y: 699 },
        { time: 4, x: 407, y: 725 },
        { time: 5, x: 490, y: 830 },
        { time: 6, x: 551, y: 955 },
        { time: 7, x: 623, y: 1013 },
        { time: 8, x: 798, y: 1040 },
        { time: 9, x: 918, y: 1025 },
        { time: 10, x: 1038, y: 1000 },
        { time: 11, x: 1152, y: 1020 },
        { time: 12, x: 1278, y: 1025 },
        { time: 13, x: 1394, y: 1011 },
        { time: 14, x: 1486, y: 981 },
    ]);

    s1_butterfly6.SetupAnimation([
        { time: 1, x: 306, y: 861 },
        { time: 2, x: 389, y: 819 },
        { time: 3, x: 516, y: 769 },
        { time: 4, x: 680, y: 727 },
        { time: 5, x: 817, y: 727 },
        { time: 6, x: 960, y: 765 },
        { time: 7, x: 1075, y: 832 },
        { time: 8, x: 1139, y: 854 },
        { time: 9, x: 1276, y: 869 },
        { time: 10, x: 1372, y: 843 },
        { time: 11, x: 1449, y: 830 },
        { time: 12, x: 1595, y: 784 },
        { time: 13, x: 1691, y: 795 },
    ]);

    gameObjectLibrary.AddGameObject("man", {transform:{posX:960, posY:1130, sizeX:360, sizeY:410, anchorX: 0.5, anchorY: 1}, bitmap:gameAssetLibrary.data["game2-scene1-man"]});

    gameStage.update();

    gameTimeBuffer1 = true;
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", LoopGameScene1);

    PlayAudio(gameAssetLibrary.data["game2-scene1-audio"].audio);
}

function LoopGameScene1(_evt) {
    let runTime = _evt.runTime / 1000 * 0.8;
    if (gameTimeBuffer1) {
        gameTimeBuffer2 = runTime;
        gameTimeBuffer1 = false;
    }
    let time = runTime - gameTimeBuffer2;

    s1_grass.renderer.skewX = Math.sin(time * 0.5) * 3;
    s1_flower1.renderer.skewX = Math.sin(time * 0.6 + 1) * 9;
    s1_flower2.renderer.skewX = Math.sin(time * 0.8 + 2) * 10.5;
    s1_flower3.renderer.skewX = Math.sin(time * 0.3 + 3) * 7.5;
    s1_flower4.renderer.skewX = Math.sin(time * 0.5 + 4) * 12;
    s1_flower5.renderer.skewX = Math.sin(time * 0.7 + 5) * 6;
    s1_cloud1.SetPosition({posX:-50+runTime*10});
    s1_cloud2.SetPosition({posX:1200+runTime*4});
    s1_cloud3.SetPosition({posX:250+runTime*22});

    s1_bird1.PlayAnimation(time);
    s1_bird1.SetAnimationIndex(Math.floor((Math.abs(s1_bird1.transform.posY) * 0.1) % 2));
    s1_bird2.PlayAnimation(time);
    s1_bird2.SetAnimationIndex(Math.floor((Math.abs(s1_bird2.transform.posY) * 0.1) % 2));
    s1_bird3.PlayAnimation(time);
    s1_bird3.SetAnimationIndex(Math.floor((Math.abs(s1_bird3.transform.posY) * 0.1) % 2));
    s1_bird4.PlayAnimation(time);
    s1_bird4.SetAnimationIndex(Math.floor((Math.abs(s1_bird4.transform.posY) * 0.1) % 2));
    s1_bird5.PlayAnimation(time);
    s1_bird5.SetAnimationIndex(Math.floor((Math.abs(s1_bird5.transform.posY) * 0.1) % 2));
    s1_bird6.PlayAnimation(time);
    s1_bird6.SetAnimationIndex(Math.floor((Math.abs(s1_bird6.transform.posY) * 0.1) % 2));

    let butterflyFrame = Math.floor((Math.abs(time) * 20) % 2);
    s1_butterfly1.PlayAnimation(time);
    s1_butterfly1.SetAnimationIndex(butterflyFrame);
    s1_butterfly2.PlayAnimation(time);
    s1_butterfly2.SetAnimationIndex(butterflyFrame);
    s1_butterfly3.PlayAnimation(time);
    s1_butterfly3.SetAnimationIndex(butterflyFrame);
    s1_butterfly4.PlayAnimation(time);
    s1_butterfly4.SetAnimationIndex(butterflyFrame);
    s1_butterfly5.PlayAnimation(time);
    s1_butterfly5.SetAnimationIndex(butterflyFrame);
    s1_butterfly6.PlayAnimation(time);
    s1_butterfly6.SetAnimationIndex(butterflyFrame);

    s1_tortoisePosX = 300 - time * 23.5;
    s1_tortoiseBody.SetPosition({posX: s1_tortoisePosX, posY: s1_tortoisePosY});
    s1_tortoiseLeg1.SetPosition({posX: (s1_tortoisePosX + (Math.sin(time * 6)+1) * 3), posY: s1_tortoisePosY});
    s1_tortoiseLeg2.SetPosition({posX: (s1_tortoisePosX + (Math.sin(time * 6 + Math.PI)+1) * 3), posY: s1_tortoisePosY});

    gameStage.update();
    if (time > 15) {
        StopGameScene1();
    }
}

function StopGameScene1() {
    createjs.Ticker.removeEventListener("tick", LoopGameScene1);
    ShowQuestionPanel();
    gameAssetLibrary.data["game2-scene1-audio"].audio.pause();
}

function InitializeGameScene1Question() {
    gameQuestionLibrary = new Game2QuestionLibrary({
        "q1": {"question": "天空中有太陽出現嗎？", "ans1": "有", "ans2": "沒有", "ans3": "", "ans4": "", "correct":[2], "isEmotional":false, "layout":2},
        "q2": {"question": "天空中有幾朵雲？", "ans1": "0朵", "ans2": "3朵", "ans3": "5朵", "ans4": "", "correct":[2], "isEmotional":false, "layout":3},
        "q3": {"question": "天空中有幾隻鳥飛過？", "ans1": "3隻", "ans2": "6隻", "ans3": "8隻", "ans4": "", "correct":[2], "isEmotional":false, "layout":3},
        "q4": {"question": "鳥兒飛向甚麼方向？", "ans1": "往左", "ans2": "往右", "ans3": "向上", "ans4": "", "correct":[2], "isEmotional":false, "layout":3},
        "q5": {"question": "地面上有甚麼？", "ans1": "水", "ans2": "沙", "ans3": "草", "ans4": "以上皆有", "correct":[3], "isEmotional":false, "layout":4},
        "q6": {"question": "草地上出現了甚麼動物？", "ans1": "鳥兒", "ans2": "魚", "ans3": "烏龜", "ans4": "以上皆有", "correct":[3], "isEmotional":false, "layout":4},
        "q7": {"question": "草地上有蝸牛在悠閒地移動嗎？", "ans1": "有", "ans2": "沒有", "ans3": "", "ans4": "", "correct":[2], "isEmotional":false, "layout":2},
        "q8": {"question": "草地上的花是甚麼顏色？", "ans1": "紅色", "ans2": "黃色", "ans3": "白色", "ans4": "以上皆有", "correct":[4], "isEmotional":false, "layout":4},
        "q9": {"question": "花朵周圍有蝴蝶飛舞嗎？", "ans1": "有", "ans2": "沒有", "ans3": "", "ans4": "", "correct":[1], "isEmotional":false, "layout":2},
        "q10": {"question": "樹葉有隨風搖曳嗎？", "ans1": "有", "ans2": "沒有", "ans3": "", "ans4": "", "correct":[2], "isEmotional":false, "layout":2},
        "q11": {"question": "您在場景中聽到甚麼聲音？", "ans1": "鳥鳴聲", "ans2": "水流聲", "ans3": "昆蟲聲", "ans4": "以上皆有", "correct":[1], "isEmotional":false, "layout":4},
        "q12": {"question": "聆聽大自然聲音時，您感覺最突出的是？", "ans1": "鳥鳴", "ans2": "風聲", "ans3": "樹葉聲", "ans4": "以上皆是", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q13": {"question": "這個場景讓您想起哪個季節？", "ans1": "春天", "ans2": "夏天", "ans3": "秋天", "ans4": "冬天", "correct":[1,2], "isEmotional":true, "layout":1},
        "q14": {"question": "觀察藍天時，您聯想到甚麼？", "ans1": "自由", "ans2": "廣闊", "ans3": "希望", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q15": {"question": "觀察草地時，您聯想到甚麼？", "ans1": "清新", "ans2": "舒適", "ans3": "自然", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q16": {"question": "場景中的色彩為您帶來甚麼感覺？", "ans1": "生機勃勃", "ans2": "寧靜祥和", "ans3": "充滿活力", "ans4": "其他/沒有特別感覺", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q17": {"question": "觀察場景時，您最想觸摸的是甚麼？", "ans1": "柔軟的草地", "ans2": "粗糙的樹皮", "ans3": "清新的微風", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q18": {"question": "如果置身此場景中，您最想做的事是甚麼？", "ans1": "躺在草地上", "ans2": "依靠在樹下", "ans3": "仰望天空", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q19": {"question": "觀察場景時，您注意到自己的身體有甚麼變化嗎？", "ans1": "更放鬆", "ans2": "更專注", "ans3": "更緊張", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q20": {"question": "觀察場景時，您注意到自己的表情有甚麼變化嗎？", "ans1": "放鬆", "ans2": "愉悅", "ans3": "專注", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q21": {"question": "您覺得場景中最能代表「生命力」的是甚麼？", "ans1": "綠草", "ans2": "大樹", "ans3": "藍天", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q22": {"question": "您覺得場景中最能代表「寧靜」的是甚麼？", "ans1": "微風吹拂的草地", "ans2": "靜立的大樹", "ans3": "蔚藍的天空", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q23": {"question": "這個場景為您帶來甚麼情緒？", "ans1": "平和", "ans2": "愉悅", "ans3": "感恩", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
    });
    gameQuestionSelected = GetRandomNumbers(1, 11, 3).concat(GetRandomNumbers(12, 23, 2));
    gameQuestionIndex = 0;
    gameQuestionScore = 0;
    gameQuestionCorrect = false;
}










// quick access / buffer
var s2_cloud1, s2_cloud2, s2_cloud3, s2_cloud4, s2_tree;
var s2_boat, s2_boat_wave;
// s2_crab_body, s2_crab_leg1, s2_crab_leg2, s2_crab_leg3, s2_crab_shadow;
// var s2_crab_animationCurve, s2_crab_leg1_deltaPosX, s2_crab_leg1_deltaPosY, s2_crab_leg2_deltaPosX, s2_crab_leg2_deltaPosY;
// var s2_crab_leg3_deltaPosX, s2_crab_leg3_deltaPosY, s2_crab_shadow_deltaPosX, s2_crab_shadow_deltaPosY, s2_crab_scale;
var s2_seagull1, s2_seagull2, s2_crab, s2_crab_scale;

function InitializeGameScene2() {
    gameAssetLibrary = new AssetLibrary({
        "game2-scene2-sky": {image:"img/game2/game2-scene2-sky-min.png"},
        "game2-scene2-bg": {image:"img/game2/game2-scene2-bg-min.png"},
        "game2-scene2-tree": {image:"img/game2/game2-scene2-tree-min.png"},
        "game2-scene2-cloud1": {image:"img/game2/game2-scene2-cloud1-min.png"},
        "game2-scene2-cloud2": {image:"img/game2/game2-scene2-cloud2-min.png"},
        "game2-scene2-cloud3": {image:"img/game2/game2-scene2-cloud3-min.png"},
        "game2-scene2-cloud4": {image:"img/game2/game2-scene2-cloud4-min.png"},
        "game2-scene2-sea": {image:"img/game2/game2-scene2-sea-min.png"},
        "game2-scene2-crab": {image:"img/game2/game2-scene2-crab-min.png"},
        "game2-scene2-boat": {image:"img/game2/game2-scene2-boat-min.png"},
        "game2-scene2-boat-wave": {image:"img/game2/game2-scene2-boat-wave-min.png"},
        "game2-scene2-seagull1": {image:"img/game2/game2-scene2-seagull1-min.png"},
        "game2-scene2-seagull2": {image:"img/game2/game2-scene2-seagull2-min.png"},
        "game2-scene2-audio": {audio:"audio/game/game2scene2.mp3"},
    }, UpdateLoadingBar, StartGameScene2);
}

function StartGameScene2() {
    HideLoadingUI();
    InitializeGameScene2Question();

    gameObjectLibrary = new GameObjectLibrary({
        "s2_sky": {transform:{posX:0, posY:0, sizeX:1920, sizeY:1080},bitmap:gameAssetLibrary.data["game2-scene2-sky"]},
        "s2_cloud1": {transform:{posX:0, posY:163, sizeX:528, sizeY:292},bitmap:gameAssetLibrary.data["game2-scene2-cloud1"]},
        "s2_cloud2": {transform:{posX:470, posY:-66, sizeX:452, sizeY:241},bitmap:gameAssetLibrary.data["game2-scene2-cloud2"]},
        "s2_cloud3": {transform:{posX:630, posY:300, sizeX:1004, sizeY:364},bitmap:gameAssetLibrary.data["game2-scene2-cloud3"]},
        "s2_cloud4": {transform:{posX:1300, posY:54, sizeX:656, sizeY:237},bitmap:gameAssetLibrary.data["game2-scene2-cloud4"]},
        "s2_bg": {transform:{posX:0, posY:488, sizeX:1920, sizeY:592},bitmap:gameAssetLibrary.data["game2-scene2-bg"]},
        "s2_sea": {transform:{posX:0, posY:530, sizeX:1710, sizeY:550},bitmap:gameAssetLibrary.data["game2-scene2-sea"]},
        // "s2_crab_shadow": {transform:{posX:1218+72, posY:940, sizeX:145, sizeY:53, anchorX: 0.5},bitmap:gameAssetLibrary.data["game2-scene2-crab-shadow"]},
        // "s2_crab_leg1": {transform:{posX:1338+12, posY:931, sizeX:25, sizeY:42, anchorX: 0.5},bitmap:gameAssetLibrary.data["game2-scene2-crab-leg1"]},
        // "s2_crab_leg3": {transform:{posX:1233+35, posY:935, sizeX:70, sizeY:35, anchorX: 0.5},bitmap:gameAssetLibrary.data["game2-scene2-crab-leg3"]},
        // "s2_crab_body": {transform:{posX:1200+81, posY:924, sizeX:163, sizeY:137, anchorX: 0.5, anchorY: 0.5},bitmap:gameAssetLibrary.data["game2-scene2-crab-body"]},
        // "s2_crab_leg2": {transform:{posX:1300+21, posY:941, sizeX:42, sizeY:52, anchorX: 0.5},bitmap:gameAssetLibrary.data["game2-scene2-crab-leg2"]},
        "s2_boat": {transform:{posX:26, posY:163, sizeX:465, sizeY:530},bitmap:gameAssetLibrary.data["game2-scene2-boat"]},
        "s2_boat_wave": {transform:{posX:69, posY:665, sizeX:401, sizeY:52},bitmap:gameAssetLibrary.data["game2-scene2-boat-wave"]},
    });
    s2_cloud1 = gameObjectLibrary.data["s2_cloud1"];
    s2_cloud2 = gameObjectLibrary.data["s2_cloud2"];
    s2_cloud3 = gameObjectLibrary.data["s2_cloud3"];
    s2_cloud4 = gameObjectLibrary.data["s2_cloud4"];

    // s2_crab = gameObjectLibrary.data["s2_crab_body"];
    // s2_crab_leg1 = gameObjectLibrary.data["s2_crab_leg1"];
    // s2_crab_leg2 = gameObjectLibrary.data["s2_crab_leg2"];
    // s2_crab_leg3 = gameObjectLibrary.data["s2_crab_leg3"];
    // s2_crab_shadow = gameObjectLibrary.data["s2_crab_shadow"];
    // s2_crab_animationCurve = new AnimationCurve([
    //     { time: 3, x: 1200, y: 924 },
    //     { time: 7, x: 1413, y: 1018 },
    //     { time: 9, x: 1413, y: 1018 },
    //     { time: 14, x: 1250, y: 1168 },
    // ])
    // let crabPosX = s2_crab_body.transform.posX, crabPosY = s2_crab_body.transform.posY;
    // s2_crab_leg1_deltaPosX = s2_crab_leg1.transform.posX - crabPosX;
    // s2_crab_leg1_deltaPosY = s2_crab_leg1.transform.posY - crabPosY;
    // s2_crab_leg2_deltaPosX = s2_crab_leg2.transform.posX - crabPosX;
    // s2_crab_leg2_deltaPosY = s2_crab_leg2.transform.posY - crabPosY;
    // s2_crab_leg3_deltaPosX = s2_crab_leg3.transform.posX - crabPosX;
    // s2_crab_leg3_deltaPosY = s2_crab_leg3.transform.posY - crabPosY;
    // s2_crab_shadow_deltaPosX = s2_crab_shadow.transform.posX - crabPosX;
    // s2_crab_shadow_deltaPosY = s2_crab_shadow.transform.posY - crabPosY;
    // s2_crab_scale = 1;

    s2_boat = gameObjectLibrary.data["s2_boat"];
    s2_boat_wave = gameObjectLibrary.data["s2_boat_wave"];

    var crabSpriteSheet = new createjs.SpriteSheet({ 
        images: [gameAssetLibrary.data["game2-scene2-crab"].image], 
        frames: {width:180, height:150},
        animations: {'a0':0,'a1':1,'a2':2,}
    });
    s2_crab = gameObjectLibrary.AddGameObject("s2_crab", {transform:{posX:1200, posY:924, sizeX:180*0.8, sizeY:150*0.8, anchorX: 0.5, anchorY:0.5}, sprite:{spriteSheet:crabSpriteSheet, spriteIndices:[0,1,2,1]}});
    s2_crab.SetupAnimation([
        { time: 3, x: 1200, y: 924 },
        { time: 7, x: 1413, y: 1018 },
        { time: 9, x: 1413, y: 1018 },
        { time: 14, x: 1250, y: 1200 },
    ]);
    s2_crab_scale = 0.8;

    var seagull1SpriteSheet = new createjs.SpriteSheet({ 
        images: [gameAssetLibrary.data["game2-scene2-seagull1"].image], 
        frames: {width:200, height:125},
        animations: {'a0':0,'a1':1,'a2':2,}
    });
    s2_seagull1 = gameObjectLibrary.AddGameObject("s2_seagull1", {transform:{posX:-200, posY:-200, sizeX:200, sizeY:125, anchorX: 0.5, anchorY:0.5}, sprite:{spriteSheet:seagull1SpriteSheet, spriteIndices:[0,1,2,1]}});

    var seagull2SpriteSheet = new createjs.SpriteSheet({ 
        images: [gameAssetLibrary.data["game2-scene2-seagull2"].image], 
        frames: {width:194, height:200},
        animations: {'a0':0,'a1':1}
    });
    s2_seagull2 = gameObjectLibrary.AddGameObject("s2_seagull2", {transform:{posX:2120, posY:-100, sizeX:194, sizeY:200, anchorX: 0.5, anchorY:0.5}, sprite:{spriteSheet:seagull2SpriteSheet, spriteIndices:[0,1]}});

    s2_tree = gameObjectLibrary.AddGameObject("s2_tree", {transform:{posX:2100, posY:880, sizeX:886, sizeY:1129, anchorX: 0.5, anchorY: 1},bitmap:gameAssetLibrary.data["game2-scene2-tree"]});
    s2_tree.renderer.rotation = -45;

    gameStage.update();

    gameTimeBuffer1 = true;
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", LoopGameScene2);

    PlayAudio(gameAssetLibrary.data["game2-scene2-audio"].audio);
}

function LoopGameScene2(_evt) {
    let runTime = _evt.runTime / 1000 * 0.8;
    if (gameTimeBuffer1) {
        gameTimeBuffer2 = runTime;
        gameTimeBuffer1 = false;
    }
    let time = runTime - gameTimeBuffer2;

    s2_tree.renderer.skewX = Math.sin(time * 0.6 + 1) * 2;
    s2_cloud1.SetPosition({posX: 0 - time*12});
    s2_cloud2.SetPosition({posX: 470 - time*4});
    s2_cloud3.SetPosition({posX: 630 - time*8});
    s2_cloud4.SetPosition({posX: 1300 - time*12});
    s2_boat.SetPosition({posX: 26 - time*40});
    s2_boat_wave.SetPosition({posX: 69 - time*40});

    s2_crab_scale = 0.8 + ((s2_crab.transform.posY - 924) / (1200 - 924)) * 0.4;
    s2_crab.transform.sizeX = 180 * s2_crab_scale;
    s2_crab.transform.sizeY = 150 * s2_crab_scale;
    if (time >= 9 && !s2_crab.transform.flip) {
        s2_crab.transform.flip = true;
    }
    if ((time >= 3 && time <= 7) || (time >= 9)) {
        s2_crab.SetAnimationIndex(Math.floor((Math.abs(runTime * 25)) % 4));
        s2_crab.PlayAnimation(time);
    }

    if (runTime < 3) {
        s2_seagull1.transform.posX = -300 + Math.sin(time / 3 * Math.PI) * 700;
        s2_seagull1.transform.posY = -300 + time * 400;
        s2_seagull1.transform.sizeX = time * 200;
        s2_seagull1.transform.sizeY = time * 125;
        s2_seagull1.UpdatePosition();
        s2_seagull1.SetAnimationIndex(Math.floor((Math.abs(time * 10)) % 4));
    }

    if (runTime > 5 && runTime < 9) {
        s2_seagull2.transform.posX = 2000 - (time - 5) * 550;
        s2_seagull2.transform.posY = -50 + (time - 5) * 80;
        s2_seagull2.transform.sizeX = (1+(time - 5) / 8) * 194;
        s2_seagull2.transform.sizeY = (1+(time - 5) / 8) * 200;
        s2_seagull2.UpdatePosition();
        s2_seagull2.SetAnimationIndex(Math.floor((Math.abs(time * 2)) % 2));
    }

    gameStage.update();
    if (time > 15) {
        StopGameScene2();
    }
}

function StopGameScene2() {
    createjs.Ticker.removeEventListener("tick", LoopGameScene2);
    ShowQuestionPanel();
    gameAssetLibrary.data["game2-scene2-audio"].audio.pause();
}

function InitializeGameScene2Question() {
    gameQuestionLibrary = new Game2QuestionLibrary({
      "q1": {"question": "水面上有海鷗飛翔嗎？", "ans1": "有", "ans2": "沒有", "ans3": "", "ans4": "", "correct":[1], "isEmotional":false, "layout":2},
      "q2": {"question": "海上有海藻飄浮嗎？", "ans1": "有", "ans2": "沒有", "ans3": "", "ans4": "", "correct":[2], "isEmotional":false, "layout":2},
      "q3": {"question": "沙灘上有散落著貝殼嗎？", "ans1": "有", "ans2": "沒有", "ans3": "", "ans4": "", "correct":[1], "isEmotional":false, "layout":2},
      "q4": {"question": "沙灘上有寄生蟹在活動嗎？", "ans1": "有", "ans2": "沒有", "ans3": "", "ans4": "", "correct":[1], "isEmotional":false, "layout":2},
      "q5": {"question": "海灘上的椰子樹有幾棵？", "ans1": "1棵", "ans2": "2棵", "ans3": "3棵", "ans4": "4棵", "correct":[2], "isEmotional":false, "layout":4},
      "q6": {"question": "椰子樹上共有多少個椰子？", "ans1": "2個", "ans2": "3個", "ans3": "5個", "ans4": "6個", "correct":[4], "isEmotional":false, "layout":4},
      "q7": {"question": "沙灘上有多少個帳篷？", "ans1": "1個", "ans2": "2個", "ans3": "3個", "ans4": "沒有", "correct":[4], "isEmotional":false, "layout":4},
      "q8": {"question": "海面上有多少艘帆船？", "ans1": "1艘", "ans2": "2艘", "ans3": "3艘", "ans4": "沒有", "correct":[1], "isEmotional":false, "layout":4},
      "q9": {"question": "沙灘上有人在日光浴嗎？", "ans1": "有", "ans2": "沒有", "ans3": "", "ans4": "", "correct":[2], "isEmotional":false, "layout":2},
      "q10": {"question": "您在場景中聽到海鷗的聲音嗎？", "ans1": "有", "ans2": "沒有", "ans3": "", "ans4": "", "correct":[1], "isEmotional":false, "layout":2},
      "q11": {"question": "您在場景中聽到甚麼聲音？", "ans1": "鳥鳴聲", "ans2": "海浪聲", "ans3": "風聲", "ans4": "以上皆有", "correct":[2], "isEmotional":false, "layout":4},
      "q12": {"question": "您覺得海浪撞擊沙灘的聲音如何？", "ans1": "輕快柔和", "ans2": "平穩厚重", "ans3": "劇烈激昂", "ans4": "其他/沒有特別感覺", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
      "q13": {"question": "看到海灘時，您的感覺是甚麼？", "ans1": "寧靜", "ans2": "興奮", "ans3": "放鬆", "ans4": "其他/沒有特別感覺", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
      "q14": {"question": "聽到海浪聲時，您的心情如何？", "ans1": "平靜", "ans2": "愉悅", "ans3": "感慨", "ans4": "其他/沒有特別感覺", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
      "q15": {"question": "如果置身此場景中，您最想做的事是甚麼？", "ans1": "沿著海邊散步", "ans2": "坐在沙灘欣賞海景", "ans3": "收集貝殼", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
      "q16": {"question": "觀察場景時，您最想觸摸的是甚麼？", "ans1": "細軟的沙子", "ans2": "清涼的海水", "ans3": "溫暖的陽光", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
      "q17": {"question": "這個場景讓您聯想到甚麼？", "ans1": "自由", "ans2": "度假", "ans3": "冒險", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
      "q18": {"question": "觀察場景時，您注意到自己的身體有甚麼變化嗎？", "ans1": "更放鬆", "ans2": "更專注", "ans3": "更緊張", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
      "q19": {"question": "您覺得場景中最能代表「變化」的是甚麼？", "ans1": "起伏的海浪", "ans2": "飄動的雲彩", "ans3": "流動的沙粒", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
      "q20": {"question": "您覺得場景中最能代表「永恆」的是甚麼？", "ans1": "無邊的大海", "ans2": "廣闊的天空", "ans3": "溫柔的清風", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
      "q21": {"question": "觀察場景時，您注意到自己的表情有甚麼變化嗎？", "ans1": "放鬆", "ans2": "愉悅", "ans3": "專注", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
      "q22": {"question": "您最想到訪此場景的時間是甚麼？", "ans1": "日出時分", "ans2": "正午時分", "ans3": "黃昏時分", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
      "q23": {"question": "觀察場景後，您對時間流逝的感覺如何？", "ans1": "時間似乎停止了", "ans2": "時間過得很慢", "ans3": "時間過得很快", "ans4": "其他/沒有特別感覺", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
      "q24": {"question": "這個場景為您帶來甚麼情緒？", "ans1": "平和", "ans2": "愉悅", "ans3": "感恩", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
    });
    gameQuestionSelected = GetRandomNumbers(1, 11, 3).concat(GetRandomNumbers(12, 24, 2));
    gameQuestionIndex = 0;
    gameQuestionScore = 0;
    gameQuestionCorrect = false;
}









// quick access / buffer
var s3_cloud1, s3_cloud2, s3_cloud3, s3_cloud4;
var s3_grass, s3_mushroom1, s3_mushroom2;
var s3_duck1, s3_duck2, s3_rabbit1, s3_rabbit2;
// var s3_rabbitPosX, s3_rabbitPosY;

function InitializeGameScene3() {
    gameAssetLibrary = new AssetLibrary({
        "game2-scene3-sky": {image:"img/game2/game2-scene3-sky-min.png"},
        "game2-scene3-bg": {image:"img/game2/game2-scene3-bg-min.png"},
        "game2-scene3-cloud1": {image:"img/game2/game2-scene3-cloud1-min.png"},
        "game2-scene3-cloud2": {image:"img/game2/game2-scene3-cloud2-min.png"},
        "game2-scene3-cloud3": {image:"img/game2/game2-scene3-cloud3-min.png"},
        "game2-scene3-cloud4": {image:"img/game2/game2-scene3-cloud4-min.png"},
        "game2-scene3-grass": {image:"img/game2/game2-scene3-grass-min.png"},
        "game2-scene3-mushroom1": {image:"img/game2/game2-scene3-mushroom1-min.png"},
        "game2-scene3-mushroom2": {image:"img/game2/game2-scene3-mushroom2-min.png"},
        "game2-scene3-duck": {image:"img/game2/game2-scene3-duck-min.png"},
        "game2-scene3-rabbit": {image:"img/game2/game2-scene3-rabbit-min.png"},
        "game2-scene3-audio": {audio:"audio/game/game2scene3.mp3"},
    }, UpdateLoadingBar, StartGameScene3);
}

function StartGameScene3() {
    HideLoadingUI();
    InitializeGameScene3Question();

    gameObjectLibrary = new GameObjectLibrary({
        "s3_sky": {transform:{posX:0, posY:0, sizeX:1920, sizeY:1080},bitmap:gameAssetLibrary.data["game2-scene3-sky"]},
        "s3_cloud1": {transform:{posX:60, posY:75, sizeX:617, sizeY:254},bitmap:gameAssetLibrary.data["game2-scene3-cloud1"]},
        "s3_cloud2": {transform:{posX:737, posY:0, sizeX:504, sizeY:88},bitmap:gameAssetLibrary.data["game2-scene3-cloud2"]},
        "s3_cloud3": {transform:{posX:710, posY:232, sizeX:728, sizeY:263},bitmap:gameAssetLibrary.data["game2-scene3-cloud3"]},
        "s3_cloud4": {transform:{posX:1350, posY:60, sizeX:501, sizeY:193},bitmap:gameAssetLibrary.data["game2-scene3-cloud4"]},
        "s3_bg": {transform:{posX:0, posY:22, sizeX:1920, sizeY:1058},bitmap:gameAssetLibrary.data["game2-scene3-bg"]},
        "s3_grass": {transform:{posX:0, posY:1080, sizeX:1920, sizeY:448, anchorX:0, anchorY:1},bitmap:gameAssetLibrary.data["game2-scene3-grass"]},
        "s3_duck1": {transform:{posX:600, posY:830, sizeX:288, sizeY:140, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game2-scene3-duck"]},
        "s3_duck2": {transform:{posX:1000, posY:830, sizeX:288, sizeY:140, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game2-scene3-duck"]},
    });
    s3_cloud1 = gameObjectLibrary.data["s3_cloud1"];
    s3_cloud2 = gameObjectLibrary.data["s3_cloud2"];
    s3_cloud3 = gameObjectLibrary.data["s3_cloud3"];
    s3_cloud4 = gameObjectLibrary.data["s3_cloud4"];
    s3_grass = gameObjectLibrary.data["s3_grass"];
    s3_mushroom1 = gameObjectLibrary.data["s3_mushroom1"];
    s3_mushroom2 = gameObjectLibrary.data["s3_mushroom2"];
    s3_duck1 = gameObjectLibrary.data["s3_duck1"];
    s3_duck2 = gameObjectLibrary.data["s3_duck2"];
    s3_duck2.SetupAnimation([
        { time: 0, x: 1251, y: 747 },
        { time: 4, x: 1053, y: 832 },
        { time: 9, x: 694, y: 850 },
        { time: 15, x: 325, y: 899 },
    ]);

    var rabbitSpriteSheet = new createjs.SpriteSheet({ 
        images: [gameAssetLibrary.data["game2-scene3-rabbit"].image], 
        frames: {width:263, height:180},
        animations: {'a0':0,'a1':1}
    });

    s3_mushroom1 = gameObjectLibrary.AddGameObject("s3_mushroom1", {transform:{posX:1492, posY:783, sizeX:140, sizeY:63, anchorX:0, anchorY:1},bitmap:gameAssetLibrary.data["game2-scene3-mushroom1"]});

    s3_rabbit2 = gameObjectLibrary.AddGameObject("s3_rabbit1", {transform:{posX:1654, posY:768, sizeX:263, sizeY:180, anchorX: 0.5, anchorY:0.5, flip:true}, sprite:{spriteSheet:rabbitSpriteSheet, spriteIndices:[0,1]}});
    s3_rabbit2.SetupAnimation([
        { time: 1, x: 1654, y: 768 },
        { time: 3, x: 1840, y: 781 },
        { time: 7, x: 1840, y: 781 },
        { time: 9, x: 1582, y: 818 },
        { time: 13.5, x: 1582, y: 818 },
        { time: 15, x: 1417, y: 827 },
    ]);

    s3_mushroom2 = gameObjectLibrary.AddGameObject("s3_mushroom2", {transform:{posX:1621, posY:916, sizeX:133, sizeY:98, anchorX:0, anchorY:1},bitmap:gameAssetLibrary.data["game2-scene3-mushroom2"]});

    s3_rabbit1 = gameObjectLibrary.AddGameObject("s3_rabbit1", {transform:{posX:2100, posY:780, sizeX:263, sizeY:180, anchorX: 0.5, anchorY:0.5}, sprite:{spriteSheet:rabbitSpriteSheet, spriteIndices:[0,1]}});
    s3_rabbit1.SetupAnimation([
        { time: 3, x: 2100, y: 880 },
        { time: 5, x: 1400, y: 940 },
        { time: 9, x: 1400, y: 940 },
        { time: 11, x: 1750, y: 1010 },
        { time: 13, x: 1750, y: 1010 },
        { time: 14.5, x: 2100, y: 810 },
    ]);

    gameStage.update();

    gameTimeBuffer1 = true;
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", LoopGameScene3);

    PlayAudio(gameAssetLibrary.data["game2-scene3-audio"].audio);
}

function LoopGameScene3(_evt) {
    let runTime = _evt.runTime / 1000 * 0.8;
    if (gameTimeBuffer1) {
        gameTimeBuffer2 = runTime;
        gameTimeBuffer1 = false;
    }
    let time = runTime - gameTimeBuffer2;

    s3_grass.renderer.skewX = Math.sin(time * 0.8) * 3;
    s3_mushroom1.renderer.skewX = Math.sin(time * 0.6 + 1) * 8;
    s3_mushroom2.renderer.skewX = Math.sin(time * 0.8 + 2) * 4;
    s3_cloud1.SetPosition({posX:60-time*7});
    s3_cloud2.SetPosition({posX:737-time*3});
    s3_cloud3.SetPosition({posX:710-time*5});
    s3_cloud4.SetPosition({posX:1350-time*12});

    let s3_duck1_scale = (s3_duck1.transform.posY - 747) / (962 - 747);
    s3_duck1_scale = 0.5 + s3_duck1_scale * s3_duck1_scale * 0.5;
    s3_duck1.SetPosition({posX:600-time*60, posY:830+time*15, sizeX:288*s3_duck1_scale, sizeY:140*s3_duck1_scale});

    let s3_duck2_scale = (s3_duck2.transform.posY - 747) / (962 - 747);
    s3_duck2_scale = 0.5 + s3_duck2_scale * s3_duck2_scale * 0.5;
    s3_duck2.transform.sizeX = 288*s3_duck2_scale;
    s3_duck2.transform.sizeY = 140*s3_duck2_scale;
    s3_duck2.PlayAnimation(time);

    let s3_rabbit1_scale = (s3_rabbit1.transform.posY - 700) / (1000 - 700);
    s3_rabbit1_scale = 0.5 + s3_rabbit1_scale * s3_rabbit1_scale * 0.5;
    s3_rabbit1.transform.sizeX = 263*s3_rabbit1_scale;
    s3_rabbit1.transform.sizeY = 180*s3_rabbit1_scale;
    s3_rabbit1.PlayAnimation(time);
    if ((time >= 3 && time <= 5) || (time >= 9 && time <= 11) || (time >= 13)) {
        s3_rabbit1.SetAnimationIndex(Math.floor((Math.abs(time * 5)) % 2));
    }
    if (time >= 9 && !s3_rabbit1.transform.flip) {
        s3_rabbit1.SetPosition({flip:true});
    }

    let s3_rabbit2_scale = (s3_rabbit2.transform.posY - 700) / (1000 - 700);
    s3_rabbit2_scale = 0.5 + s3_rabbit2_scale * s3_rabbit2_scale * 0.5;
    s3_rabbit2.transform.sizeX = 263*s3_rabbit2_scale;
    s3_rabbit2.transform.sizeY = 180*s3_rabbit2_scale;
    s3_rabbit2.PlayAnimation(time);
    if ((time >= 1 && time <= 3) || (time >= 7 && time <= 9) || (time >= 13.5)) {
        s3_rabbit2.SetAnimationIndex(Math.floor((Math.abs(time * 5)) % 2));
    }
    if (time >= 7 && s3_rabbit2.transform.flip) {
        s3_rabbit2.SetPosition({flip:false});
    }

    gameStage.update();
    if (time > 15) {
        StopGameScene3();
    }
}

function StopGameScene3() {
    createjs.Ticker.removeEventListener("tick", LoopGameScene3);
    ShowQuestionPanel();
    gameAssetLibrary.data["game2-scene3-audio"].audio.pause();
}

function InitializeGameScene3Question() {
    gameQuestionLibrary = new Game2QuestionLibrary({
        "q1": {"question": "河邊有野鴨在戲水嗎？", "ans1": "有", "ans2": "沒有", "ans3": "", "ans4": "", "correct":[1], "isEmotional":false, "layout":2},
        "q2": {"question": "河邊有小徑嗎？", "ans1": "有", "ans2": "沒有", "ans3": "", "ans4": "", "correct":[1], "isEmotional":false, "layout":2},
        "q3": {"question": "河邊有苔蘚生長嗎？", "ans1": "有", "ans2": "沒有", "ans3": "", "ans4": "", "correct":[2], "isEmotional":false, "layout":2},
        "q4": {"question": "場景中有多少種動物？", "ans1": "1種", "ans2": "2種", "ans3": "3種", "ans4": "沒有", "correct":[2], "isEmotional":false, "layout":4},
        "q5": {"question": "河邊的野花有幾種顏色？", "ans1": "1種", "ans2": "2種", "ans3": "3種", "ans4": "沒有", "correct":[1], "isEmotional":false, "layout":4},
        "q6": {"question": "河水流動的速度是怎樣的？", "ans1": "快", "ans2": "慢", "ans3": "", "ans4": "", "correct":[1,2], "isEmotional":false, "layout":2},
        "q7": {"question": "場景中有野兔在奔跑嗎？", "ans1": "有", "ans2": "沒有", "ans3": "", "ans4": "", "correct":[1], "isEmotional":false, "layout":2},
        "q8": {"question": "草地是甚麼顏色？", "ans1": "綠色", "ans2": "黃色", "ans3": "紅色", "ans4": "", "correct":[1], "isEmotional":false, "layout":3},
        "q9": {"question": "草地上有蘑菇嗎？", "ans1": "有", "ans2": "沒有", "ans3": "", "ans4": "", "correct":[1], "isEmotional":false, "layout":2},
        "q10": {"question": "楓樹的葉子是什麼顏色？", "ans1": "紅色", "ans2": "黃色", "ans3": "綠色", "ans4": "以上皆有", "correct":[1], "isEmotional":false, "layout":4},
        "q11": {"question": "您在場景中聽到蟬發出的聲音嗎？", "ans1": "有", "ans2": "沒有", "ans3": "", "ans4": "", "correct":[1], "isEmotional":false, "layout":2},
        "q12": {"question": "您在場景中聽到甚麼聲音？", "ans1": "河水流動聲", "ans2": "蟬鳴的聲音", "ans3": "微風吹拂聲", "ans4": "以上皆有", "correct":[1], "isEmotional":false, "layout":4},
        "q13": {"question": "聽到河流的聲音時，您的心情如何？", "ans1": "平靜", "ans2": "愉悅", "ans3": "放鬆", "ans4": "其他/沒有特別感覺", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q14": {"question": "看到楓葉時，您的心情如何？", "ans1": "平靜", "ans2": "愉悅", "ans3": "感嘆", "ans4": "其他/沒有特別感覺", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q15": {"question": "秋天的氛圍為您帶來甚麼感覺？", "ans1": "溫馨", "ans2": "感慨", "ans3": "期待", "ans4": "其他/沒有特別感覺", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q16": {"question": "如果置身此場景中，您最想做的事是甚麼？", "ans1": "撿拾楓葉", "ans2": "沿著河邊散步", "ans3": "坐下來欣賞風景", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q17": {"question": "觀察場景時，您最想觸摸的是甚麼？", "ans1": "楓葉", "ans2": "河水", "ans3": "草地", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q18": {"question": "這個場景讓您聯想到甚麼？", "ans1": "豐收", "ans2": "變遷", "ans3": "美麗", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q19": {"question": "觀察場景時，您注意到自己的身體有甚麼變化嗎？", "ans1": "更放鬆", "ans2": "更專注", "ans3": "更緊張", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q20": {"question": "您覺得場景中最能代表「生命週期」的是甚麼？", "ans1": "變色的楓葉", "ans2": "流動的河水", "ans3": "行走的動物", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q21": {"question": "觀察場景後，您對時間流逝的感覺如何？", "ans1": "時間似乎停止了", "ans2": "時間過得很慢", "ans3": "時間過得很快", "ans4": "其他/沒有特別感覺", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q22": {"question": "觀察場景時，您注意到自己的表情有甚麼變化嗎？", "ans1": "放鬆", "ans2": "愉悅", "ans3": "專注", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q23": {"question": "這個場景為您帶來甚麼情緒？", "ans1": "平和", "ans2": "愉悅", "ans3": "感恩", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q24": {"question": "您認為這個場景最能表達什麼主題？", "ans1": "生命的變遷", "ans2": "自然的美麗", "ans3": "時間的流逝", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
    });
    gameQuestionSelected = GetRandomNumbers(1, 11, 3).concat(GetRandomNumbers(12, 24, 2));
    gameQuestionIndex = 0;
    gameQuestionScore = 0;
    gameQuestionCorrect = false;
}










// quick access / buffer
var s4_car1, s4_car2, s4_bicycle;
var s4_car1_audio_hasPlay;

function InitializeGameScene4() {
    gameAssetLibrary = new AssetLibrary({
        "game2-scene4-bg": {image:"img/game2/game2-scene4-bg-min.png"},
        "game2-scene4-props": {image:"img/game2/game2-scene4-props-min.png"},
        "game2-scene4-car1": {image:"img/game2/game2-scene4-car1-min.png"},
        "game2-scene4-car2": {image:"img/game2/game2-scene4-car2-min.png"},
        "game2-scene4-bicycle": {image:"img/game2/game2-scene4-bicycle-min.png"},
        "game2-scene4-audio": {audio:"audio/game/game2scene4.mp3"},
        "game2-scene4-car-audio": {audio:"audio/game/game2scene4_car.mp3"},
    }, UpdateLoadingBar, StartGameScene4);
}

function StartGameScene4() {
    HideLoadingUI();
    InitializeGameScene4Question();

    gameObjectLibrary = new GameObjectLibrary({
        "s4_sky": {transform:{posX:0, posY:0, sizeX:1920, sizeY:1080},bitmap:gameAssetLibrary.data["game2-scene4-bg"]},
        "s4_car1": {transform:{posX:0, posY:640, sizeX:108, sizeY:40, flip:true},bitmap:gameAssetLibrary.data["game2-scene4-car1"]},
    });
    s4_car1 = gameObjectLibrary.data["s4_car1"];
    s4_car1_audio_hasPlay = false;
    var bicycleSpriteSheet = new createjs.SpriteSheet({ 
        images: [gameAssetLibrary.data["game2-scene4-bicycle"].image], 
        frames: {width:201, height:210},
        animations: {'a0':0,'a1':1,}
    });
    gameObjectLibrary.AddGameObject("s4_props", {transform:{posX:0, posY:0, sizeX:1920, sizeY:1080},bitmap:gameAssetLibrary.data["game2-scene4-props"]});
    s4_bicycle = gameObjectLibrary.AddGameObject("s4_bicycle", {transform:{posX:2400, posY:808, sizeX:201, sizeY:210, flip:true}, sprite:{spriteSheet:bicycleSpriteSheet, spriteIndices:[0,1]}});
    s4_car2 = gameObjectLibrary.AddGameObject("s4_car2", {transform:{posX:2100, posY:750, sizeX:689, sizeY:290},bitmap:gameAssetLibrary.data["game2-scene4-car2"]});

    gameStage.update();

    gameTimeBuffer1 = true;
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", LoopGameScene4);

    PlayAudio(gameAssetLibrary.data["game2-scene4-audio"].audio);
}

function LoopGameScene4(_evt) {
    let runTime = _evt.runTime / 1000 * 0.8;
    if (gameTimeBuffer1) {
        gameTimeBuffer2 = runTime;
        gameTimeBuffer1 = false;
    }
    let time = runTime - gameTimeBuffer2;

    s4_car1.SetPosition({posX:240*time});
    s4_bicycle.SetPosition({posX:2400-240*time});
    s4_bicycle.SetAnimationIndex(Math.floor((Math.abs(runTime * 4)) % 2));
    s4_car2.SetPosition({posX:2100-time*720});

    if (time > 1 && !s4_car1_audio_hasPlay) {
        PlayAudio(gameAssetLibrary.data["game2-scene4-car-audio"].audio);
        s4_car1_audio_hasPlay = true;
    }

    gameStage.update();
    if (time > 15) {
        StopGameScene4();
    }
}

function StopGameScene4() {
    createjs.Ticker.removeEventListener("tick", LoopGameScene4);
    ShowQuestionPanel();
    gameAssetLibrary.data["game2-scene4-audio"].audio.pause();
}

function InitializeGameScene4Question() {
    gameQuestionLibrary = new Game2QuestionLibrary({
        "q1": {"question": "街道上有行人嗎？", "ans1": "有", "ans2": "沒有", "ans3": "", "ans4": "", "correct":[1], "isEmotional":false, "layout":2},
        "q2": {"question": "大樓上有廣告招牌嗎？", "ans1": "有", "ans2": "沒有", "ans3": "", "ans4": "", "correct":[1], "isEmotional":false, "layout":2},
        "q3": {"question": "場景中有噴泉嗎？", "ans1": "有", "ans2": "沒有", "ans3": "", "ans4": "", "correct":[2], "isEmotional":false, "layout":2},
        "q4": {"question": "場景中有藝術裝置或雕塑嗎？", "ans1": "有", "ans2": "沒有", "ans3": "", "ans4": "", "correct":[2], "isEmotional":false, "layout":2},
        "q5": {"question": "您在場景中看到什麼車輛？", "ans1": "汽車", "ans2": "單車", "ans3": "巴士", "ans4": "以上皆有", "correct":[4], "isEmotional":false, "layout":4},
        "q6": {"question": "車輛有遵守交通規則嗎？", "ans1": "有", "ans2": "沒有", "ans3": "", "ans4": "", "correct":[1], "isEmotional":false, "layout":2},
        "q7": {"question": "街道上有多少張長椅？", "ans1": "1張", "ans2": "2張", "ans3": "3張", "ans4": "沒有", "correct":[4], "isEmotional":false, "layout":4},
        "q8": {"question": "街道上有多少個垃圾桶？", "ans1": "1個", "ans2": "2個", "ans3": "3個", "ans4": "沒有", "correct":[1], "isEmotional":false, "layout":4},
        "q9": {"question": "道路上有多少根燈柱？", "ans1": "1根", "ans2": "2根", "ans3": "3根", "ans4": "沒有", "correct":[2], "isEmotional":false, "layout":4},
        "q10": {"question": "道路上的交通標誌是什麼形狀？", "ans1": "圓形", "ans2": "三角形", "ans3": "正方形", "ans4": "沒有", "correct":[1], "isEmotional":false, "layout":4},
        "q11": {"question": "您在場景中聽到甚麼聲音？", "ans1": "車輛聲", "ans2": "風吹聲", "ans3": "鳥鳴聲", "ans4": "以上皆是", "correct":[1], "isEmotional":false, "layout":4},
        "q12": {"question": "您在場景中聽到警車或救護車的聲音嗎？", "ans1": "有", "ans2": "沒有", "ans3": "", "ans4": "", "correct":[2], "isEmotional":false, "layout":2},
        "q13": {"question": "聽到城市的聲音時，您的心情如何？", "ans1": "熟悉", "ans2": "充滿活力", "ans3": "緊張", "ans4": "其他/沒有特別感覺", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q14": {"question": "你覺得道路的清潔狀況如何？", "ans1": "乾淨", "ans2": "一般", "ans3": "骯髒", "ans4": "其他", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q15": {"question": "看到繁忙的街道時，您的感覺是甚麼？", "ans1": "興奮", "ans2": "緊張", "ans3": "好奇", "ans4": "其他/沒有特別感覺", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q16": {"question": "看到高樓大廈時，您的感覺是甚麼？", "ans1": "人類的創造力", "ans2": "現代化的進程", "ans3": "城市的發展", "ans4": "其他/沒有特別感覺", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q17": {"question": "如果置身此場景中，您最想做的事是甚麼？", "ans1": "在咖啡店坐下", "ans2": "漫步街頭", "ans3": "觀察人群、車輛", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q18": {"question": "這個場景讓您聯想到甚麼？", "ans1": "繁華", "ans2": "忙碌", "ans3": "現代", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q19": {"question": "您覺得場景中最能代表「變化」的是甚麼？", "ans1": "川流不息的車輛", "ans2": "變換的交通信號", "ans3": "行走往來的行人", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q20": {"question": "您覺得場景中最能代表「秩序」的是甚麼？", "ans1": "整齊的道路", "ans2": "有序的交通", "ans3": "具規劃的建築群", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q21": {"question": "觀察場景時，您注意到自己的身體有甚麼變化嗎？", "ans1": "更放鬆", "ans2": "更專注", "ans3": "更緊張", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q22": {"question": "觀察場景時，您注意到自己的表情有甚麼變化嗎？", "ans1": "放鬆", "ans2": "愉悅", "ans3": "專注", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q23": {"question": "觀察場景後，您對時間流逝的感覺如何？", "ans1": "時間似乎停止了", "ans2": "時間過得很慢", "ans3": "時間過得很快", "ans4": "其他/沒有特別感覺", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
        "q24": {"question": "您認為這個場景最能表達什麼主題？", "ans1": "現代生活", "ans2": "人類文明", "ans3": "社會發展", "ans4": "其他/沒有", "correct":[1,2,3,4], "isEmotional":true, "layout":1},
    });
    gameQuestionSelected = GetRandomNumbers(1, 12, 3).concat(GetRandomNumbers(13, 24, 2));
    gameQuestionIndex = 0;
    gameQuestionScore = 0;
    gameQuestionCorrect = false;
}










function ShowPanel(_layout) {
    let question = gameQuestionLibrary.data['q'+gameQuestionSelected[gameQuestionIndex]];
    let bg = gameUILibrary.data["ui-main-bg"], title = gameUILibrary.data["ui-main-title"], desc = gameUILibrary.data["ui-main-desc"];
    let imgC = gameUILibrary.data["ui-main-image-correct"], imgW = gameUILibrary.data["ui-main-image-wrong"], imgB = gameUILibrary.data["ui-main-image-bird"];
    let btn1 = gameUILibrary.data["ui-main-button1"], btn2 = gameUILibrary.data["ui-main-button2"], btn3 = gameUILibrary.data["ui-main-button3"], btn4 = gameUILibrary.data["ui-main-button4"];
    switch(_layout) {
        case 0:
            bg.SetEnabled(false); title.SetEnabled(false); desc.SetEnabled(false);
            imgC.SetEnabled(false); imgW.SetEnabled(false); imgB.SetEnabled(false);
            btn1.SetEnabled(false); btn2.SetEnabled(false); btn3.SetEnabled(false); btn4.SetEnabled(false);   
            break;
        case 1: // emotional question
            bg.SetEnabled(true); title.SetEnabled(true); desc.SetEnabled(false);
            imgC.SetEnabled(false); imgW.SetEnabled(false); imgB.SetEnabled(false);
            btn1.SetEnabled(true); btn2.SetEnabled(true); btn3.SetEnabled(true); btn4.SetEnabled(true);
            title.Update({text: question.question, left:'0', top:'25.2%', width:'100%', height:'10%'});
            btn1.Update({text: question.ans1, left:'33.1%', top:'34.78%', width:'33.8%', height:'7.8%'});
            btn2.Update({text: question.ans2, left:'33.1%', top:'45.25%', width:'33.8%', height:'7.8%'});
            btn3.Update({text: question.ans3, left:'33.1%', top:'55.72%', width:'33.8%', height:'7.8%'});
            btn4.Update({text: question.ans4, left:'33.1%', top:'66.19%', width:'33.8%', height:'7.8%'});
            break;
        case 2: // normal question with 2 answers
            bg.SetEnabled(true); title.SetEnabled(true); desc.SetEnabled(false);
            imgC.SetEnabled(false); imgW.SetEnabled(false); imgB.SetEnabled(true);
            btn1.SetEnabled(true); btn2.SetEnabled(true); btn3.SetEnabled(false); btn4.SetEnabled(false);
            title.Update({text: question.question, left:'0', top:'50%', width:'100%', height:'10%'});
            imgB.Update({left:'42.53%', top:'29%', width:'14.94%', height:'19.83%'});
            btn1.Update({text: question.ans1, left:'38.5%', top:'60%', width:'10.5%', height:'7.8%'});
            btn2.Update({text: question.ans2, left:'51%', top:'60%', width:'10.5%', height:'7.8%'});
            btn3.Update({text: question.ans3, left:'51%', top:'60%', width:'10.5%', height:'7.8%'});
            btn4.Update({text: question.ans4, left:'63.5%', top:'60%', width:'10.5%', height:'7.8%'});
            break;
        case 3: // normal question with 3 answers
            bg.SetEnabled(true); title.SetEnabled(true); desc.SetEnabled(false);
            imgC.SetEnabled(false); imgW.SetEnabled(false); imgB.SetEnabled(true);
            btn1.SetEnabled(true); btn2.SetEnabled(true); btn3.SetEnabled(true); btn4.SetEnabled(false);
            title.Update({text: question.question, left:'0', top:'50%', width:'100%', height:'10%'});
            imgB.Update({left:'42.53%', top:'29%', width:'14.94%', height:'19.83%'});
            btn1.Update({text: question.ans1, left:'32.25%', top:'60%', width:'10.5%', height:'7.8%'});
            btn2.Update({text: question.ans2, left:'44.75%', top:'60%', width:'10.5%', height:'7.8%'});
            btn3.Update({text: question.ans3, left:'57.25%', top:'60%', width:'10.5%', height:'7.8%'});
            btn4.Update({text: question.ans4, left:'63.5%', top:'60%', width:'10.5%', height:'7.8%'});
            break;
        case 4: // normal question with 4 answers
            bg.SetEnabled(true); title.SetEnabled(true); desc.SetEnabled(false);
            imgC.SetEnabled(false); imgW.SetEnabled(false); imgB.SetEnabled(true);
            btn1.SetEnabled(true); btn2.SetEnabled(true); btn3.SetEnabled(true); btn4.SetEnabled(true);
            title.Update({text: question.question, left:'0', top:'50%', width:'100%', height:'10%'});
            imgB.Update({left:'42.53%', top:'29%', width:'14.94%', height:'19.83%'});
            btn1.Update({text: question.ans1, left:'26%', top:'60%', width:'10.5%', height:'7.8%'});
            btn2.Update({text: question.ans2, left:'38.5%', top:'60%', width:'10.5%', height:'7.8%'});
            btn3.Update({text: question.ans3, left:'51%', top:'60%', width:'10.5%', height:'7.8%'});
            btn4.Update({text: question.ans4, left:'63.5%', top:'60%', width:'10.5%', height:'7.8%'});
            break;
        case 5: // correct answer
            bg.SetEnabled(true); title.SetEnabled(true); desc.SetEnabled(true);
            imgC.SetEnabled(true); imgW.SetEnabled(false); imgB.SetEnabled(false);
            btn1.SetEnabled(true); btn2.SetEnabled(false); btn3.SetEnabled(false); btn4.SetEnabled(false);
            title.Update({text: "答案正確", left:'0', top:'49.5%', width:'100%', height:'10%'});
            imgC.Update({left:'45.31%', top:'29%', width:'9.375%', height:'16.67%'});
            desc.Update({text: question["ans"+question.correct[0]], left:'0', top:'56%', width:'100%', height:'10%'});
            btn1.Update({text: "確定", left:'41.55%', top:'63.2%', width:'16.9%', height:'7.8%'});
            break;
        case 6: // wrong answer
            bg.SetEnabled(true); title.SetEnabled(true); desc.SetEnabled(true);
            imgC.SetEnabled(false); imgW.SetEnabled(true); imgB.SetEnabled(false);
            btn1.SetEnabled(true); btn2.SetEnabled(false); btn3.SetEnabled(false); btn4.SetEnabled(false);
            title.Update({text: "答案不正確", left:'0', top:'49.5%', width:'100%', height:'10%'});
            imgW.Update({left:'45.31%', top:'29%', width:'9.375%', height:'16.67%'});
            desc.Update({text: question["ans"+question.correct[0]], left:'0', top:'56%', width:'100%', height:'10%'});
            btn1.Update({text: "確定", left:'41.55%', top:'63.2%', width:'16.9%', height:'7.8%'});
            break;
        case 7: // correct emotional answer
            bg.SetEnabled(true); title.SetEnabled(true); desc.SetEnabled(false);
            imgC.SetEnabled(true); imgW.SetEnabled(false); imgB.SetEnabled(false);
            btn1.SetEnabled(true); btn2.SetEnabled(false); btn3.SetEnabled(false); btn4.SetEnabled(false);
            title.Update({text: "無需批判自己的感受，<br/>謝謝您的分享！", left:'0', top:'49.5%', width:'100%', height:'10%'});
            imgB.Update({left:'42.53%', top:'29%', width:'14.94%', height:'19.83%'});
            btn1.Update({text: "確定", left:'41.55%', top:'63.2%', width:'16.9%', height:'7.8%'});
            break;
        case 8: // ending scene
            bg.SetEnabled(true); title.SetEnabled(true); desc.SetEnabled(false);
            imgC.SetEnabled(false); imgW.SetEnabled(false); imgB.SetEnabled(true);
            btn1.SetEnabled(true); btn2.SetEnabled(true); btn3.SetEnabled(false); btn4.SetEnabled(false);
            title.Update({text: "完成遊戲", left:'0', top:'29.5%', width:'100%', height:'10%'});
            imgB.Update({left:'42.53%', top:'38%', width:'14.94%', height:'19.83%'});
            btn1.Update({text: "再玩一次", left:'32%', top:'61.5%', width:'16.9%', height:'7.8%'});
            btn2.Update({text: "離開遊戲", left:'51.1%', top:'61.5%', width:'16.9%', height:'7.8%'});
            break;
    }
}

function ShowQuestionPanel() {
    gameUIState = 1;
    gameQuestionIndex = 0;
    gameUILibrary.data["ui-question-count-ballon"].Update({text:((gameQuestionIndex+1)+"/5")});
    ShowPanel(gameQuestionLibrary.data['q'+gameQuestionSelected[gameQuestionIndex]].layout);
    PlayAudio(gamePopupAudio);
}

function OnClickUIButton(_buttonId) {
    let question = gameQuestionLibrary.data['q'+gameQuestionSelected[gameQuestionIndex]];
    if (gameUIState == 1 || gameUIState == 3 || gameUIState == 5 || gameUIState == 7 || gameUIState == 9) {
        var isCorrect = question.IsCorrect(_buttonId);
        if (isCorrect && question.isEmotional) {
            gameUIState++;
            gameQuestionScore++;
            gameUILibrary.data["ui-score-count-ballon"].Update({text:gameQuestionScore});
            ShowPanel(7);
            PlayAudio(gameTrueAudio);
        } else if (isCorrect) {
            gameUIState++;
            gameQuestionScore++;
            gameUILibrary.data["ui-score-count-ballon"].Update({text:gameQuestionScore});
            ShowPanel(5);
            PlayAudio(gameTrueAudio);
        } else {
            gameUIState++;
            ShowPanel(6);
            PlayAudio(gamePressAudio);
        }
    } else if (gameUIState == 2 || gameUIState == 4 || gameUIState == 6 || gameUIState == 8) {
        gameUIState++;
        gameQuestionIndex++;
        gameUILibrary.data["ui-question-count-ballon"].Update({text:((gameQuestionIndex+1)+"/5")});
        ShowPanel(gameQuestionLibrary.data['q'+gameQuestionSelected[gameQuestionIndex]].layout);
        PlayAudio(gamePressAudio);
    } else if (gameUIState == 10) {
        gameUIState++;
        ShowPanel(8);
        PlayAudio(gamePressAudio);
    } else if (gameUIState == 11) {
        if (_buttonId == 1) {
            gameStage.removeAllChildren();
            gameStage.clear();
            ShowLoadingUI();
            LoadRandomScene();
            ShowPanel(0);
            PlayAudio(gamePressAudio);
            gameUILibrary.data["ui-question-count-ballon"].Update({text:"0/5"});
            gameUILibrary.data["ui-score-count-ballon"].Update({text:"0"});
        } else if (_buttonId == 2) {
            ExitGameView();
        }
    }
}

function GetRandomNumbers(min, max, count) {
    const range = Array.from({ length: max - min + 1 }, (_, i) => min + i); // Create array [min, ..., max]
    for (let i = range.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index
        [range[i], range[j]] = [range[j], range[i]]; // Swap elements
    }
    return range.slice(0, count); // Take the first `count` elements
}

function PlayAudio(_audio) {
    _audio.currentTime = 0;
    _audio.play();
}
