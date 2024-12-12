var gameSharedAssetLibrary;
var gameUILibrary;
var gameUIState;
var gamePopupAudio;
var gamePressAudio;
var gameTrueAudio;
var gameLoadingBar, gameLoadingBarNail;
var gameLoadSceneAction;

var gameAssetLibrary;
var gameObjectLibrary;
var gameTimeBuffer1, gameTimeBuffer2;
var gameSceneIndex;

var gameQuestionBallon;
var gamePlayerABallon, gamePlayerABallon_icon, gamePlayerABallon_text, gamePlayerABallon_score, gamePlayerABallon_arrow;
var gamePlayerBBallon, gamePlayerBBallon_icon, gamePlayerBBallon_text, gamePlayerBBallon_score, gamePlayerBBallon_arrow;

var gameStartUI, gameStartUITitle, gameStartUICard1, gameStartUICard2, gameStartUIOpacity, gameStartUIAnimation, gameStartUITimeBuffer1, gameStartUITimeBuffer2;
var gameMainUI, gameMainUITitle, gameMainUINoWin, gameMainUIWinnerA, gameMainUIWinnerB, gameMainUIImage, gameMainUIButton1, gameMainUIButton2;

var gameCardImageLibrary, gameCardLibrary, gameCardStatusList;

var gameLevel, gamePlayer, gameScore, gameCardFlipped;
var isPlayFlipAnimation, isShowPopup, isShowEndScenePanel, isWaitInterval;

function UpdateUI() {
    gameQuestionBallon.SetEnabled(true);
    gamePlayerABallon.SetEnabled(true); gamePlayerABallon_icon.SetEnabled(true); gamePlayerABallon_text.SetEnabled(true); gamePlayerABallon_score.SetEnabled(true);
    gamePlayerBBallon.SetEnabled(true); gamePlayerBBallon_icon.SetEnabled(true); gamePlayerBBallon_text.SetEnabled(true); gamePlayerBBallon_score.SetEnabled(true);
    if (isShowPopup) {
        gameStartUI.SetEnabled(true); gameStartUITitle.SetEnabled(true); gameStartUICard1.SetEnabled(true); gameStartUICard2.SetEnabled(true);
        gameStartUI.dom.style.opacity = '100%'; gameStartUITitle.dom.style.opacity = '100%'; gameStartUICard1.dom.style.opacity = '100%'; gameStartUICard2.dom.style.opacity = '100%';
        gameStartUITimeBuffer1 = true; gameStartUITimeBuffer2 = 0;
        gameStartUIAnimation = (evt)=>StartPopupAnimation(evt);
        createjs.Ticker.addEventListener("tick", gameStartUIAnimation);
    }
    if (isShowEndScenePanel) {
        gameMainUI.SetEnabled(true); gameMainUITitle.SetEnabled(true); gameMainUIImage.SetEnabled(true);
        if (gameScore[0] > gameScore[1]) {
            gameMainUIWinnerA.SetEnabled(true);
            gameMainUIWinnerB.SetEnabled(false);
            gameMainUINoWin.SetEnabled(false);
        } else if (gameScore[0] < gameScore[1]) {
            gameMainUIWinnerA.SetEnabled(false);
            gameMainUIWinnerB.SetEnabled(true);
            gameMainUINoWin.SetEnabled(false);
        } else {
            gameMainUIWinnerA.SetEnabled(false);
            gameMainUIWinnerB.SetEnabled(false);
            gameMainUINoWin.SetEnabled(true);
        }
        if (gameLevel < 2) {
            gameMainUIButton1.Update({text:"下一輪", left:"42%"});
            gameMainUIButton1.SetEnabled(true); gameMainUIButton2.SetEnabled(false);
        } else {
            gameMainUIButton1.Update({text:"再玩一次", left:"33.1%"});
            gameMainUIButton1.SetEnabled(true); gameMainUIButton2.SetEnabled(true);
        }
    } else {
        gameMainUI.SetEnabled(false); gameMainUITitle.SetEnabled(false); gameMainUIImage.SetEnabled(false);
        gameMainUIWinnerA.SetEnabled(false); gameMainUIWinnerB.SetEnabled(false); gameMainUINoWin.SetEnabled(false);
        gameMainUIButton1.SetEnabled(false); gameMainUIButton2.SetEnabled(false);
    }
    if (gamePlayer == 0) {
        gamePlayerABallon_icon.dom.style.opacity = '100%'; gamePlayerABallon_text.dom.style.opacity = '100%'; gamePlayerABallon_score.dom.style.opacity = '100%';
        gamePlayerBBallon_icon.dom.style.opacity = '30%'; gamePlayerBBallon_text.dom.style.opacity = '30%'; gamePlayerBBallon_score.dom.style.opacity = '30%';
        gamePlayerABallon_arrow.SetEnabled(true); gamePlayerBBallon_arrow.SetEnabled(false);
    } else {
        gamePlayerABallon_icon.dom.style.opacity = '30%'; gamePlayerABallon_text.dom.style.opacity = '30%'; gamePlayerABallon_score.dom.style.opacity = '30%';
        gamePlayerBBallon_icon.dom.style.opacity = '100%'; gamePlayerBBallon_text.dom.style.opacity = '100%'; gamePlayerBBallon_score.dom.style.opacity = '100%';
        gamePlayerABallon_arrow.SetEnabled(false); gamePlayerBBallon_arrow.SetEnabled(true);
    }
    gamePlayerABallon_score.Update({text:gameScore[0].toString()});
    gamePlayerBBallon_score.Update({text:gameScore[1].toString()});
    gameQuestionBallon.Update({text:(gameLevel+1)+"/3"});
}

function StartPopupAnimation(_evt) {
    let runTime = _evt.runTime / 1000;
    if (gameStartUITimeBuffer1) {
        gameStartUITimeBuffer2 = runTime;
        gameStartUITimeBuffer1 = false;
    }
    let time = runTime - gameStartUITimeBuffer2;
    if (time > 2) {
        let opacity = ((1.0 - (time - 2.0) * 2.0) * 100) + "%";
        gameStartUI.dom.style.opacity = opacity; gameStartUITitle.dom.style.opacity = opacity; gameStartUICard1.dom.style.opacity = opacity; gameStartUICard2.dom.style.opacity = opacity;
    }
    if (time > 2.5) {
         gameStartUI.SetEnabled(false); gameStartUITitle.SetEnabled(false); gameStartUICard1.SetEnabled(false); gameStartUICard2.SetEnabled(false);
         isShowPopup = false;
         createjs.Ticker.removeEventListener("tick", gameStartUIAnimation);
         gameStartUIAnimation = null;
    }
}

function InitializeGame(_data) {
    // gameLoadSceneAction = ('forceScene' in _data) ? (() => LoadScene(_data.forceScene)) : (() => LoadRandomScene());
    // gameLoadSceneAction = () => {};
    gameLoadSceneAction = InitializeGameScene;
    gameSharedAssetLibrary = new AssetLibrary({
        "game-popup-audio": {audio:"audio/game/popup.wav"},
        "game-press-audio": {audio:"audio/game/press.mp3"},
        "game-true-audio": {audio:"audio/game/true.wav"},
    }, null, gameLoadSceneAction);
    gamePopupAudio = gameSharedAssetLibrary.data["game-popup-audio"].audio;
    gamePressAudio = gameSharedAssetLibrary.data["game-press-audio"].audio;
    gameTrueAudio = gameSharedAssetLibrary.data["game-true-audio"].audio;
    InitializeGameUI();
    ShowLoadingUI();
    gameCardImageLibrary = [
        ['game5-card-a1', 'game5-card-a2'],
        ['game5-card-b1', 'game5-card-b2'],
        ['game5-card-c1', 'game5-card-c2'],
        ['game5-card-d1', 'game5-card-d2'],
        ['game5-card-e1'],
        ['game5-card-f1'],
        ['game5-card-g1'],
        ['game5-card-h1'],
        ['game5-card-i1', 'game5-card-i2'],
        ['game5-card-j1', 'game5-card-j2'],
        ['game5-card-k1', 'game5-card-k2'],
        ['game5-card-l1'],
        ['game5-card-m1'],
        ['game5-card-n1'],
        ['game5-card-o1'],
        ['game5-card-p1'],
    ];
    gameCardLibrary = [
        [
            {posX:220, posY:279, sizeX:199.5, sizeY:285, rotation: -11.06},
            {posX:536, posY:310, sizeX:199.5, sizeY:285, rotation: 3.25},
            {posX:863, posY:306, sizeX:199.5, sizeY:285, rotation: -2.95},
            {posX:1215, posY:306, sizeX:199.5, sizeY:285, rotation: -4.7},
            {posX:1531, posY:276, sizeX:199.5, sizeY:285, rotation: 6.32},
            {posX:190, posY:671, sizeX:199.5, sizeY:285, rotation: 4.33},
            {posX:530, posY:678, sizeX:199.5, sizeY:285, rotation: -9.56},
            {posX:873, posY:669, sizeX:199.5, sizeY:285, rotation: -6.11},
            {posX:1220, posY:673, sizeX:199.5, sizeY:285, rotation: 6.36},
            {posX:1539, posY:645, sizeX:199.5, sizeY:285, rotation: -12.47},    
        ],
        [
            {posX:142, posY:294, sizeX:180.6, sizeY:258, rotation: -11.06},
            {posX:407, posY:265, sizeX:180.6, sizeY:258, rotation: 3.25},
            {posX:641, posY:342, sizeX:180.6, sizeY:258, rotation: -2.95},
            {posX:872, posY:308, sizeX:180.6, sizeY:258, rotation: -4.7},
            {posX:1124, posY:319, sizeX:180.6, sizeY:258, rotation: 6.32},
            {posX:1370, posY:280, sizeX:180.6, sizeY:258, rotation: -4.7},
            {posX:1600, posY:323, sizeX:180.6, sizeY:258, rotation: 12.45},
            {posX:153, posY:685, sizeX:180.6, sizeY:258, rotation: 4.33},
            {posX:408, posY:673, sizeX:180.6, sizeY:258, rotation: -14.14},
            {posX:663, posY:668, sizeX:180.6, sizeY:258, rotation: -9.56},
            {posX:900, posY:692, sizeX:180.6, sizeY:258, rotation: 2.47},
            {posX:1130, posY:660, sizeX:180.6, sizeY:258, rotation: 6.36},
            {posX:1360, posY:632, sizeX:180.6, sizeY:258, rotation: -10.42},
            {posX:1593, posY:697, sizeX:180.6, sizeY:258, rotation: 11.05},
        ],
        [
            {posX:125, posY:372, sizeX:163.8, sizeY:234, rotation: -11.06},
            {posX:323, posY:300, sizeX:163.8, sizeY:234, rotation: 3.25},
            {posX:528, posY:366, sizeX:163.8, sizeY:234, rotation: -2.95},
            {posX:758, posY:328, sizeX:163.8, sizeY:234, rotation: 8.63},
            {posX:1009, posY:364, sizeX:163.8, sizeY:234, rotation: -8.2},
            {posX:1203, posY:290, sizeX:163.8, sizeY:234, rotation: -4.7},
            {posX:1410, posY:366, sizeX:163.8, sizeY:234, rotation: -14.59},
            {posX:1597, posY:289, sizeX:163.8, sizeY:234, rotation: -14.55},
            {posX:141, posY:688, sizeX:163.8, sizeY:234, rotation: 4.33},
            {posX:336, posY:660, sizeX:163.8, sizeY:234, rotation: -14.14},
            {posX:547, posY:651, sizeX:163.8, sizeY:234, rotation: -9.56},
            {posX:772, posY:675, sizeX:163.8, sizeY:234, rotation: 2.47},
            {posX:984, posY:653, sizeX:163.8, sizeY:234, rotation: 6.36},
            {posX:1191, posY:649, sizeX:163.8, sizeY:234, rotation: -10.42},
            {posX:1405, posY:693, sizeX:163.8, sizeY:234, rotation: 0.46},
            {posX:1609, posY:626, sizeX:163.8, sizeY:234, rotation: -8.39},
        ],
    ];
    gameUI.addEventListener("click", OnClickUI);
}

function InitializeGameUI() {
    gameUILibrary = new UILibrary({});
    gameUILibrary.AddUIElements({
        "ui-loading-bg": {transform:{left:'0%', top:'0%', width:'100%', height:'100%'}, image:{imgSrc:"img/gameCommon/loading-bg-min.png"}},
        "ui-loading-title": {transform:{top:'15.4%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'#00693E', text:'靜觀動樂 配對大挑戰'}},
        "ui-loading-img-main": {transform:{left:'40.16%', top:'25.5%', width:'19.68%', height:'30.11%'}, image:{imgSrc:"img/game5ui/loading-main-min.png"}},
        "ui-loading-img-compass": {transform:{left:'53.2%', top:'43.4%', width:'9.03%', height:'16.33%'}, image:{imgSrc:"img/gameCommon/loading-compass-min.png"}},
        "ui-loading-loadingbar": {transform:{left:'30%', top:'64%', width:'40%', height:'1.8%'}, loadingBar:{color1: '#fff', color2: '#F97930', round: 10}},
        "ui-loading-img-nail": {transform:{left:'28%', top:'60%', width:'4%', height:'7.22%'}, image:{imgSrc:"img/gameCommon/loading-nail-min.png"}},
        "ui-loading-img-sound": {transform:{left:'17.5%', top:'77.5%', width:'3.47%', height:'6.67%'}, image:{imgSrc:"img/gameCommon/loading-sound.gif"}},
        "ui-loading-desc1": {transform:{left: '12%', top:'79.5%', width: '40%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'#F97930', text:'請打開聲音玩遊戲'}},
        "ui-loading-img-rotate": {transform:{left:'55.89%', top:'76.42%', width:'4.98%', height:'9.55%'}, image:{imgSrc:"img/gameCommon/loading-rotate.gif"}},
        "ui-loading-desc2": {transform:{left: '52.6%', top:'79.5%', width: '40%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'#F97930', text:'將你的裝置轉成橫向'}},

        "ui-question-ballon": {transform:{left: '46.22%', top:'0', width: '7.54%', height:'9.55%'}, ballon:{imgSrc:"img/gameCommon/greenBallon-min.png", fontFamily:'CustomFont', fontSize:34, letterSpacing:4, color:'white', text:'0'}},
        "ui-playera-ballon": {transform:{left: '27.71%', top:'0', width: '18.51%', height:'9.55%'}, image:{imgSrc:"img/game5ui/ballon-min.png"}},
        "ui-playera-ballon-text": {transform:{left: '33.96%', top:'3.2%', width: '5.09%', height:'3%'}, image:{imgSrc:"img/game5ui/playera-text-min.png"}},
        "ui-playera-ballon-score": {transform:{left: '29.5%', top:'2.22%', width: '3.29%', height:'5.11%'}, ballon:{imgSrc:"img/game5ui/heart-min.png", fontFamily:'CustomFont', fontSize:25, letterSpacing:4, color:'white', text:'0'}},
        "ui-playera-ballon-icon": {transform:{left: '40.1%', top:'0.6%', width: '4.05%', height:'7.78%'}, image:{imgSrc:"img/game5ui/playera-icon-min.png"}},
        "ui-playera-ballon-arrow": {transform:{left: '45.38%', top:'2.78%', width: '1.73%', height:'3.33%'}, image:{imgSrc:"img/game5ui/arrow-min.png"}},
        "ui-playerb-ballon": {transform:{left: '53.76%', top:'0', width: '18.51%', height:'9.55%'}, image:{imgSrc:"img/game5ui/ballon-min.png"}},
        "ui-playerb-ballon-text": {transform:{left: '60.96%', top:'3.2%', width: '5.09%', height:'3%'}, image:{imgSrc:"img/game5ui/playerb-text-min.png"}},
        "ui-playerb-ballon-score": {transform:{left: '67.19%', top:'2.22%', width: '3.29%', height:'5.11%'}, ballon:{imgSrc:"img/game5ui/heart-min.png", fontFamily:'CustomFont', fontSize:25, letterSpacing:4, color:'white', text:'0'}},
        "ui-playerb-ballon-icon": {transform:{left: '55.7%', top:'0.6%', width: '4.05%', height:'7.78%'}, image:{imgSrc:"img/game5ui/playerb-icon-min.png"}},
        "ui-playerb-ballon-arrow": {transform:{left: '52.89%', top:'2.78%', width: '1.73%', height:'3.33%'}, image:{imgSrc:"img/game5ui/arrow2-min.png"}},

        "ui-main-bg": {transform:{left:'15.28%', top:'11.11%', width:'69.44%', height:'77.78%'}, roundRect:{color:'white', round:150}},
        "ui-main-title": {transform:{top:'23.5%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:40, letterSpacing:4, color:'#00693E', text:'完成遊戲', lineHeight: 70}},
        "ui-main-winner-a": {transform:{left:'41.29%', top:'31.5%', width:'17.41%', height:'6.67%'}, image:{imgSrc:"img/game5ui/playera-win-min.png"}},
        "ui-main-winner-b": {transform:{left:'41.29%', top:'31.5%', width:'17.41%', height:'6.67%'}, image:{imgSrc:"img/game5ui/playerb-win-min.png"}},
        "ui-main-no-winner": {transform:{left:'41.29%', top:'31.5%', width:'17.41%', height:'6.67%'}, image:{imgSrc:"img/game5ui/no-win-min.png"}},
        "ui-main-button1": {transform:{left:'33.1%', top:'65.5%', width:'16%', height:'9.36%'}, button:{imgSrc:"img/gameCommon/button-min.png", round:10, fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'white', text:'再玩一次', onclick:()=>{OnClickUIButton(1);}}},
        "ui-main-button2": {transform:{left:'50.9%', top:'65.5%', width:'16%', height:'9.36%'}, button:{imgSrc:"img/gameCommon/button-min.png", round:10, fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'white', text:'離開遊戲', onclick:()=>{OnClickUIButton(2);}}},
        "ui-main-image": {transform:{left:'43.9%', top:'41%', width:'12.21%', height:'19.78%'}, image:{imgSrc:"img/game5ui/card-min.png"}},

        "ui-start-bg": {transform:{left:'15.28%', top:'11.11%', width:'69.44%', height:'77.78%'}, roundRect:{color:'#FFF9EA', round:150}},
        "ui-start-title": {transform:{top:'23.5%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:40, letterSpacing:4, color:'#00693E', text:'請配對相同的小角色卡片', lineHeight: 70}},
        "ui-start-card1": {transform:{left:'37%', top:'40%', width:'11.63%', height:'33.33%'}, image:{imgSrc:"img/game5/card_c1-min.png"}},
        "ui-start-card2": {transform:{left:'51.37%', top:'40%', width:'11.63%', height:'33.33%'}, image:{imgSrc:"img/game5/card_c1-min.png"}},

        "ui-bg": {transform:{left:'0%', top:'0%', width:'100%', height:'100%'}, image:{imgSrc:"img/game5ui/2-min.png"}},
    });
    gameUILibrary.AddUIResizeEvent();
    gameUIState = 0;
    gameLoadingBar = gameUILibrary.data["ui-loading-loadingbar"];
    gameLoadingBarNail = gameUILibrary.data["ui-loading-img-nail"];

    gameMainUI = gameUILibrary.data["ui-main-bg"];
    gameMainUITitle = gameUILibrary.data["ui-main-title"];
    gameMainUIWinnerA = gameUILibrary.data["ui-main-winner-a"];
    gameMainUIWinnerB = gameUILibrary.data["ui-main-winner-b"];
    gameMainUINoWin = gameUILibrary.data["ui-main-no-winner"];
    gameMainUIImage = gameUILibrary.data["ui-main-image"];
    gameMainUIButton1 = gameUILibrary.data["ui-main-button1"];
    gameMainUIButton2 = gameUILibrary.data["ui-main-button2"];

    gameStartUI = gameUILibrary.data["ui-start-bg"];
    gameStartUITitle = gameUILibrary.data["ui-start-title"];
    gameStartUICard1 = gameUILibrary.data["ui-start-card1"];
    gameStartUICard2 = gameUILibrary.data["ui-start-card2"];
    gameStartUIOpacity = 100;

    // gameUILibrary.data["ui-bg"].dom.style.opacity = 0.5;
    // gameUILibrary.data["ui-bg"].SetEnabled(true);

    gameQuestionBallon = gameUILibrary.data["ui-question-ballon"];
    gamePlayerABallon = gameUILibrary.data["ui-playera-ballon"];
    gamePlayerABallon_score = gameUILibrary.data["ui-playera-ballon-score"];
    gamePlayerABallon_score.AddCoveredBallon({imgSrc2:"img/game5ui/heart2-min.png"});
    gamePlayerABallon_text = gameUILibrary.data["ui-playera-ballon-text"];
    gamePlayerABallon_icon = gameUILibrary.data["ui-playera-ballon-icon"];
    gamePlayerABallon_arrow = gameUILibrary.data["ui-playera-ballon-arrow"];
    gamePlayerBBallon = gameUILibrary.data["ui-playerb-ballon"];
    gamePlayerBBallon_score = gameUILibrary.data["ui-playerb-ballon-score"];
    gamePlayerBBallon_score.AddCoveredBallon({imgSrc2:"img/game5ui/heart2-min.png"});
    gamePlayerBBallon_text = gameUILibrary.data["ui-playerb-ballon-text"];
    gamePlayerBBallon_icon = gameUILibrary.data["ui-playerb-ballon-icon"];
    gamePlayerBBallon_arrow = gameUILibrary.data["ui-playerb-ballon-arrow"];
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
    gameLoadingBarNail.Update({left: (28+((_progress/100)*40))+'%'});
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

    // gameUILibrary.data["ui-bg"].SetEnabled(true);
    // gameUILibrary.data["ui-bg"].dom.style.opacity = '50%';
    // gameUILibrary.data["ui-bg"].dom.style.touchAction = 'none';

    // gameMainUI.SetEnabled(true);
    // gameMainUITitle.SetEnabled(true);
    // gameMainUIWinnerB.SetEnabled(true);
    // gameMainUIImage.SetEnabled(true);
    // gameMainUIButton1.SetEnabled(true);
    // gameMainUIButton2.SetEnabled(true);

    // gameStartUI.SetEnabled(true);
    // gameStartUITitle.SetEnabled(true);
    // gameStartUICard1.SetEnabled(true);
    // gameStartUICard2.SetEnabled(true);

    gameAssetLibrary = new AssetLibrary({
        // "game5-bg": {image:"img/game5ui/1-min.png"},
        "game5-card-ui": {image:"img/game5ui/card-min.png"},
        "game5-playera-icon": {image:"img/game5ui/playera-icon-min.png"},
        "game5-playera-text": {image:"img/game5ui/playera-text-min.png"},
        "game5-playera-win": {image:"img/game5ui/playera-win-min.png"},
        "game5-playerb-icon": {image:"img/game5ui/playerb-icon-min.png"},
        "game5-playerb-text": {image:"img/game5ui/playerb-text-min.png"},
        "game5-playerb-win": {image:"img/game5ui/playerb-win-min.png"},
        "game5-heart": {image:"img/game5ui/heart-min.png"},
        "game5-heart2": {image:"img/game5ui/heart2-min.png"},
        "game5-arrow": {image:"img/game5ui/arrow-min.png"},
        "game5-arrow2": {image:"img/game5ui/arrow2-min.png"},
        "game5-ballon": {image:"img/game5ui/ballon-min.png"},
        "ui-question-count-ballon": {image:"img/gameCommon/greenBallon-min.png"},
        "ui-button": {image:"img/gameCommon/button-min.png"},

        "game5-card": {image:"img/game5/card-min.png"},
        "game5-card-a1": {image:"img/game5/card_a1-min.png"},
        "game5-card-a2": {image:"img/game5/card_a2-min.png"},
        "game5-card-b1": {image:"img/game5/card_b1-min.png"},
        "game5-card-b2": {image:"img/game5/card_b2-min.png"},
        "game5-card-c1": {image:"img/game5/card_c1-min.png"},
        "game5-card-c2": {image:"img/game5/card_c2-min.png"},
        "game5-card-d1": {image:"img/game5/card_d1-min.png"},
        "game5-card-d2": {image:"img/game5/card_d2-min.png"},
        "game5-card-e1": {image:"img/game5/card_e1-min.png"},
        "game5-card-f1": {image:"img/game5/card_f1-min.png"},
        "game5-card-g1": {image:"img/game5/card_g1-min.png"},
        "game5-card-h1": {image:"img/game5/card_h1-min.png"},
        "game5-card-i1": {image:"img/game5/card_i1-min.png"},
        "game5-card-i2": {image:"img/game5/card_i2-min.png"},
        "game5-card-j1": {image:"img/game5/card_j1-min.png"},
        "game5-card-j2": {image:"img/game5/card_j2-min.png"},
        "game5-card-k1": {image:"img/game5/card_k1-min.png"},
        "game5-card-k2": {image:"img/game5/card_k2-min.png"},
        "game5-card-l1": {image:"img/game5/card_l1-min.png"},
        "game5-card-m1": {image:"img/game5/card_m1-min.png"},
        "game5-card-n1": {image:"img/game5/card_n1-min.png"},
        "game5-card-o1": {image:"img/game5/card_o1-min.png"},
        "game5-card-p1": {image:"img/game5/card_p1-min.png"},
    }, UpdateLoadingBar, StartGame);

    gameCardStatusList = [];
    gameTimeBuffer1 = true;
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", LoopGame);

}

function StartGame() {
    HideLoadingUI();
    isShowPopup = true;
    gameLevel = 0;
    GameLevel();
}

function GameLevel() {
    gameScore = [0,0];
    isShowEndScenePanel = false;
    gameTimeBuffer1 = true;
    gameTimeBuffer2 = 0;
    isWaitInterval = true;
    createjs.Ticker.addEventListener("tick", WaitInterval);

    gameStage.removeAllChildren();
    gameStage.clear();
    gameObjectLibrary = new GameObjectLibrary({});
    let gameCards = gameCardLibrary[gameLevel];
    let cardCount = gameCards.length;
    let cardIndices = GetCardIndices(cardCount/2);
    gameCardStatusList = [];
    gameCardFlipped = [];
    gamePlayer = gameLevel % 2;
    isPlayFlipAnimation = false;
    let cardStyle =  Math.random() > 0.5;
    for (let i = 0; i < cardCount; i++) {
        let gameCard = gameCards[i];
        let gameCardIndex = cardIndices[i];
        let gameCardImg = gameCardImageLibrary[gameCardIndex];
        if (gameCardImg.length > 1 && cardStyle) gameCardImg = gameCardImg[1];
        else gameCardImg = gameCardImg[0];
        let gameCardStatus = {
            id: gameCardIndex, posX:gameCard.posX, posY:gameCard.posY, sizeX:gameCard.sizeX, sizeY:gameCard.sizeY, rotation:gameCard.rotation,
            bitmap:gameCardImg
        };
        gameCardStatus.cardFront = gameObjectLibrary.AddGameObject("card"+i+"f", {
            transform:{
                posX: gameCardStatus.posX, posY: gameCardStatus.posY, sizeX: 0, sizeY: gameCardStatus.sizeY,
                anchorX: 0.5, anchorY: 0.5, rotation: gameCardStatus.rotation
            },
            bitmap:gameAssetLibrary.data[gameCardStatus.bitmap],
        });
        gameCardStatus.cardBack = gameObjectLibrary.AddGameObject("card"+i+"b", {
            transform:{
                posX: gameCardStatus.posX, posY: gameCardStatus.posY, sizeX: gameCardStatus.sizeX, sizeY: gameCardStatus.sizeY,
                anchorX: 0.5, anchorY: 0.5, rotation: gameCardStatus.rotation
            },
            bitmap:gameAssetLibrary.data["game5-card"],
        });
        gameCardStatusList.push(gameCardStatus);
        // console.log(JSON.stringify(t.transform));
    }
    // console.log(JSON.stringify(gameCardStatusList));
    UpdateUI();
    gameStage.update();
}

function GetCardIndices(_pairSize) {
    let indices = [];
    let randomNumbers = GetRandomNumbers(0, gameCardImageLibrary.length - 1, _pairSize);
    for (let i = 0; i < randomNumbers.length; i++) {
        let cardIndex = randomNumbers[i];
        indices.push(cardIndex, cardIndex); // Add two of each index for pairing
    }
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [indices[i], indices[j]] = [indices[j], indices[i]]; // Swap elements
    }
    return indices;
}

function GetRandomNumbers(min, max, count) {
    const range = Array.from({ length: max - min + 1 }, (_, i) => min + i); // Create array [min, ..., max]
    for (let i = range.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index
        [range[i], range[j]] = [range[j], range[i]]; // Swap elements
    }
    return range.slice(0, count); // Take the first `count` elements
}

function OnClickUI(event) {
    let x = (event.clientX - gameUI.offsetLeft) / gameUI.offsetWidth;
    let y = (event.clientY - gameUI.offsetTop) / gameUI.offsetHeight;
    let touchCardIndex = DetectRect(x, y);
    if (touchCardIndex != -1) {
        FlipCard(touchCardIndex);
    }
}

function DetectRect(touchX, touchY) {
    let pointX = touchX * gameOriginalWidth;
    let pointY = touchY * gameOriginalHeight;
    for (let i = 0; i < gameCardStatusList.length; i++) {
        let gameCardStatus = gameCardStatusList[i];
        let { posX, posY, sizeX, sizeY, rotation } = gameCardStatus;
        let dx = pointX - posX;
        let dy = pointY - posY;
        let angle = -rotation * (Math.PI / 180); // Convert to radians
        let localX = dx * Math.cos(angle) - dy * Math.sin(angle);
        let localY = dx * Math.sin(angle) + dy * Math.cos(angle);
        if (
            localX >= -sizeX / 2 &&
            localX <= sizeX / 2 &&
            localY >= -sizeY / 2 &&
            localY <= sizeY / 2
        ) {
            return i; // Collision detected
        }
    }
    return -1; // No collision
}

function FlipCard(_cardIndex) {
    // console.log(JSON.stringify(gameCardFlipped));
    if (isPlayFlipAnimation) return;
    if (isShowPopup) return;
    if (isShowEndScenePanel) return;
    if (isWaitInterval) return;
    for (let i = 0; i < gameCardFlipped.length; i++) {
        if (_cardIndex == gameCardFlipped[i]) return;
    }
    let gameCardStatus = gameCardStatusList[_cardIndex];
    if (gameCardStatus.flipCardAnimation != null) return;
    gameCardStatus.flipCardAnimationBuffer1 = true;
    gameCardStatus.flipCardAnimationBuffer2 = 0;
    gameCardStatus.flipCardAnimation = (_evt) => FlipCardAnimation(_evt,_cardIndex);
    createjs.Ticker.addEventListener("tick", gameCardStatus.flipCardAnimation);
    isPlayFlipAnimation = true;
}

function FlipCardAnimation(_evt, _cardIndex) {
    let gameCardStatus = gameCardStatusList[_cardIndex];
    let runTime = _evt.runTime / 1000;
    if (gameCardStatus.flipCardAnimationBuffer1) {
        gameCardStatus.flipCardAnimationBuffer2 = runTime;
        gameCardStatus.flipCardAnimationBuffer1 = false;
    }
    let time = runTime - gameCardStatus.flipCardAnimationBuffer2;
    let interval1 = 0.15, interval2 = 0.5;
    let isPairOfFirst = gameCardFlipped.length % 2 == 0;
    if (isPairOfFirst) interval2 = 0;
    if (time < interval1) {
        let cardFrontScaleX = -1 + time * (2.0 / interval1);
        let cardBackScaleX = -cardFrontScaleX;
        cardFrontScaleX = Math.max(cardFrontScaleX, 0);
        cardBackScaleX = Math.max(cardBackScaleX, 0);
        gameCardStatus.cardFront.SetPosition({sizeX:(cardFrontScaleX) * gameCardStatus.sizeX});
        gameCardStatus.cardBack.SetPosition({sizeX:(cardBackScaleX) * gameCardStatus.sizeX});
    } else if (time < interval1 + interval2) {
        gameCardStatus.cardFront.SetPosition({sizeX:gameCardStatus.sizeX});
        gameCardStatus.cardBack.SetPosition({sizeX:0});
    } else {
        gameCardStatus.cardFront.SetPosition({sizeX:gameCardStatus.sizeX});
        gameCardStatus.cardBack.SetPosition({sizeX:0});
        createjs.Ticker.removeEventListener("tick", gameCardStatus.flipCardAnimation);
        gameCardStatus.flipCardAnimation = null;
        isPlayFlipAnimation = false;
        // gameCardStatus.isFlipped = true;
        gameCardFlipped.push(_cardIndex);
        if (!isPairOfFirst) {
            let cardIndex0 = gameCardFlipped[gameCardFlipped.length-2];
            let gameCardStatus0 = gameCardStatusList[cardIndex0];
            if (gameCardStatus.id == gameCardStatus0.id) {
                gameScore[gamePlayer]++;
                if (gameCardStatusList.length == gameCardFlipped.length) {
                    isShowEndScenePanel = true;
                }
                UpdateUI();
            } else {
                gameCardFlipped.pop();
                gameCardFlipped.pop();
                FlipBackCard(cardIndex0, _cardIndex);
                gamePlayer = (gamePlayer + 1) % 2;
                UpdateUI();
            }
        }
    }
    gameStage.update();
}

function FlipBackCard(_cardIndex0, _cardIndex1) {
    let gameCardStatus = gameCardStatusList[_cardIndex0];
    gameCardStatus.flipCardAnimationBuffer1 = true;
    gameCardStatus.flipCardAnimationBuffer2 = 0;
    gameCardStatus.flipCardAnimation = (_evt) => FlipBackCardAnimation(_evt,_cardIndex0, _cardIndex1);
    createjs.Ticker.addEventListener("tick", gameCardStatus.flipCardAnimation);
    isPlayFlipAnimation = true;
}

function FlipBackCardAnimation(_evt, _cardIndex0, _cardIndex1) {
    let gameCardStatus0 = gameCardStatusList[_cardIndex0];
    let gameCardStatus1 = gameCardStatusList[_cardIndex1];
    let runTime = _evt.runTime / 1000;
    if (gameCardStatus0.flipCardAnimationBuffer1) {
        gameCardStatus0.flipCardAnimationBuffer2 = runTime;
        gameCardStatus0.flipCardAnimationBuffer1 = false;
    }
    let time = runTime - gameCardStatus0.flipCardAnimationBuffer2;
    let interval1 = 0.15;
    if (time < interval1) {
        let cardBackScaleX = -1 + time * (2.0 / interval1);
        let cardFrontScaleX = -cardBackScaleX;
        cardFrontScaleX = Math.max(cardFrontScaleX, 0);
        cardBackScaleX = Math.max(cardBackScaleX, 0);
        gameCardStatus0.cardFront.SetPosition({sizeX:(cardFrontScaleX) * gameCardStatus0.sizeX});
        gameCardStatus0.cardBack.SetPosition({sizeX:(cardBackScaleX) * gameCardStatus0.sizeX});
        gameCardStatus1.cardFront.SetPosition({sizeX:(cardFrontScaleX) * gameCardStatus1.sizeX});
        gameCardStatus1.cardBack.SetPosition({sizeX:(cardBackScaleX) * gameCardStatus1.sizeX});
    } else {
        gameCardStatus0.cardFront.SetPosition({sizeX:0});
        gameCardStatus0.cardBack.SetPosition({sizeX:gameCardStatus0.sizeX});
        gameCardStatus1.cardFront.SetPosition({sizeX:0});
        gameCardStatus1.cardBack.SetPosition({sizeX:gameCardStatus1.sizeX});
        createjs.Ticker.removeEventListener("tick", gameCardStatus0.flipCardAnimation);
        gameCardStatus0.flipCardAnimation = null;
        isPlayFlipAnimation = false;
        // gameCardStatus0.isFlipped = false;
        // gameCardStatus1.isFlipped = false;
    }
}

function LoopGame(_evt) {
    gameStage.update();
}

function WaitInterval(_evt) {
    let runTime = _evt.runTime / 1000;
    if (gameTimeBuffer1) {
        gameTimeBuffer2 = runTime;
        gameTimeBuffer1 = false;
    }
    let time = runTime - gameTimeBuffer2;
    if (time > 0.1) {
        isWaitInterval = false;
        createjs.Ticker.removeEventListener("tick", WaitInterval);
    }
}

function OnClickUIButton(_buttonId) {
    if (_buttonId == 1) {
        if (gameLevel < 2) {
            gameLevel++;
            GameLevel();
        } else {
            gameLevel = 0;
            StartGame();
        }
    } else {
        ExitGameView();
    }
}


function PlayAudio(_audio) {
    _audio.currentTime = 0;
    _audio.play();
}
