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

var gameStartUI, gameStartUITitle, gameStartUICard1, gameStartUICard2;
var gameMainUI, gameMainUITitle, gameMainUIWinnerA, gameMainUIWinnerB, gameMainUIImage, gameMainUIButton1, gameMainUIButton2;

function InitializeGame(_data) {
    // gameLoadSceneAction = ('forceScene' in _data) ? (() => LoadScene(_data.forceScene)) : (() => LoadRandomScene());
    // gameLoadSceneAction = () => {};
    gameLoadSceneAction = InitializeGameScene;
    gameSharedAssetLibrary = new AssetLibrary({
        "ui-question-count-ballon": {image:"img/gameCommon/greenBallon.png"},
        "ui-score-ballon": {image:"img/gameCommon/heartBallon.png"},
        "ui-score-ballon2": {image:"img/gameCommon/heartBallon2.png"},
        "ui-button": {image:"img/gameCommon/button.png"},
        "ui-main-image": {image:"img/game1ui/ppl.png"},

        "game-popup-audio": {audio:"audio/game/popup.wav"},
        "game-press-audio": {audio:"audio/game/press.mp3"},
        "game-true-audio": {audio:"audio/game/true.wav"},
    }, null, gameLoadSceneAction);
    gamePopupAudio = gameSharedAssetLibrary.data["game-popup-audio"].audio;
    gamePressAudio = gameSharedAssetLibrary.data["game-press-audio"].audio;
    gameTrueAudio = gameSharedAssetLibrary.data["game-true-audio"].audio;
    InitializeGameUI();
    ShowLoadingUI();
}

function InitializeGameUI() {
    gameUILibrary = new UILibrary({});
    gameUILibrary.AddUIElements({
        "ui-loading-bg": {transform:{left:'0%', top:'0%', width:'100%', height:'100%'}, image:{imgSrc:"img/gameCommon/loading-bg.png"}},
        "ui-loading-title": {transform:{top:'15.4%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'#00693E', text:'靜觀動樂 配對大挑戰'}},
        "ui-loading-img-main": {transform:{left:'40.16%', top:'25.5%', width:'19.68%', height:'30.11%'}, image:{imgSrc:"img/game5ui/loading-main.png"}},
        "ui-loading-img-compass": {transform:{left:'53.2%', top:'43.4%', width:'9.03%', height:'16.33%'}, image:{imgSrc:"img/gameCommon/loading-compass.png"}},
        "ui-loading-loadingbar": {transform:{left:'30%', top:'64%', width:'40%', height:'1.8%'}, loadingBar:{color1: '#fff', color2: '#F97930', round: 10}},
        "ui-loading-img-nail": {transform:{left:'28%', top:'60%', width:'4%', height:'7.22%'}, image:{imgSrc:"img/gameCommon/loading-nail.png"}},
        "ui-loading-img-sound": {transform:{left:'17.5%', top:'77.5%', width:'3.47%', height:'6.67%'}, image:{imgSrc:"img/gameCommon/loading-sound.gif"}},
        "ui-loading-desc1": {transform:{left: '12%', top:'79.5%', width: '40%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'#F97930', text:'請打開聲音玩遊戲'}},
        "ui-loading-img-rotate": {transform:{left:'55.89%', top:'76.42%', width:'4.98%', height:'9.55%'}, image:{imgSrc:"img/gameCommon/loading-rotate.gif"}},
        "ui-loading-desc2": {transform:{left: '52.6%', top:'79.5%', width: '40%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'#F97930', text:'將你的裝置轉成橫向'}},

        "ui-main-bg": {transform:{left:'15.28%', top:'11.11%', width:'69.44%', height:'77.78%'}, roundRect:{color:'white', round:150}},
        "ui-main-title": {transform:{top:'23.5%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:40, letterSpacing:4, color:'#00693E', text:'完成遊戲', lineHeight: 70}},
        "ui-main-winner-a": {transform:{left:'41.29%', top:'31.5%', width:'17.41%', height:'6.67%'}, image:{imgSrc:"img/game5ui/playera-win.png"}},
        "ui-main-winner-b": {transform:{left:'41.29%', top:'31.5%', width:'17.41%', height:'6.67%'}, image:{imgSrc:"img/game5ui/playerb-win.png"}},
        "ui-main-button1": {transform:{left:'33.1%', top:'65.5%', width:'16%', height:'9.36%'}, button:{imgSrc:"img/gameCommon/button.png", round:10, fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'white', text:'再玩一次', onclick:()=>{OnClickUIButton(1);}}},
        "ui-main-button2": {transform:{left:'50.9%', top:'65.5%', width:'16%', height:'9.36%'}, button:{imgSrc:"img/gameCommon/button.png", round:10, fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'white', text:'離開遊戲', onclick:()=>{OnClickUIButton(2);}}},
        "ui-main-image": {transform:{left:'43.9%', top:'41%', width:'12.21%', height:'19.78%'}, image:{imgSrc:"img/game5ui/card.png"}},

        "ui-start-bg": {transform:{left:'15.28%', top:'11.11%', width:'69.44%', height:'77.78%'}, roundRect:{color:'#FFF9EA', round:150}},
        "ui-start-title": {transform:{top:'23.5%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:40, letterSpacing:4, color:'#00693E', text:'請配對相同的小角色卡片', lineHeight: 70}},
        "ui-start-card1": {transform:{left:'37%', top:'40%', width:'11.63%', height:'33.33%'}, image:{imgSrc:"img/game5/card_c1.png"}},
        "ui-start-card2": {transform:{left:'51.37%', top:'40%', width:'11.63%', height:'33.33%'}, image:{imgSrc:"img/game5/card_c1.png"}},

        // "ui-bg": {transform:{left:'0%', top:'0%', width:'100%', height:'100%'}, image:{imgSrc:"img/game5ui/1.png"}},
    });
    gameUILibrary.AddUIResizeEvent();
    gameUIState = 0;
    gameLoadingBar = gameUILibrary.data["ui-loading-loadingbar"];
    gameLoadingBarNail = gameUILibrary.data["ui-loading-img-nail"];

    gameMainUI = gameUILibrary.data["ui-main-bg"];
    gameMainUITitle = gameUILibrary.data["ui-main-title"];
    gameMainUIWinnerA = gameUILibrary.data["ui-main-winner-a"];
    gameMainUIWinnerB = gameUILibrary.data["ui-main-winner-b"];
    gameMainUIImage = gameUILibrary.data["ui-main-image"];
    gameMainUIButton1 = gameUILibrary.data["ui-main-button1"];
    gameMainUIButton2 = gameUILibrary.data["ui-main-button2"];

    gameStartUI = gameUILibrary.data["ui-start-bg"];
    gameStartUITitle = gameUILibrary.data["ui-start-title"];
    gameStartUICard1 = gameUILibrary.data["ui-start-card1"];
    gameStartUICard2 = gameUILibrary.data["ui-start-card2"];

    // gameUILibrary.data["ui-bg"].dom.style.opacity = 0.5;
    // gameUILibrary.data["ui-bg"].SetEnabled(true);
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
        // "game5-bg": {image:"img/game5ui/1.png"},
        "game5-card-ui": {image:"img/game5ui/card.png"},
        "game5-playera-icon": {image:"img/game5ui/playera-icon.png"},
        "game5-playera-text": {image:"img/game5ui/playera-text.png"},
        "game5-playera-win": {image:"img/game5ui/playera-win.png"},
        "game5-playerb-icon": {image:"img/game5ui/playerb-icon.png"},
        "game5-playerb-text": {image:"img/game5ui/playerb-text.png"},
        "game5-playerb-win": {image:"img/game5ui/playerb-win.png"},
        "game5-heart": {image:"img/game5ui/heart.png"},
        "game5-heart2": {image:"img/game5ui/heart2.png"},
        "game5-arrow": {image:"img/game5ui/arrow.png"},
        "game5-arrow2": {image:"img/game5ui/arrow2.png"},
        "game5-ballon": {image:"img/game5ui/ballon.png"},

        "game5-card": {image:"img/game5/card.png"},
        "game5-card-a1": {image:"img/game5/card_a1.png"},
        "game5-card-a2": {image:"img/game5/card_a2.png"},
        "game5-card-b1": {image:"img/game5/card_b1.png"},
        "game5-card-b2": {image:"img/game5/card_b2.png"},
        "game5-card-c1": {image:"img/game5/card_c1.png"},
        "game5-card-c2": {image:"img/game5/card_c2.png"},
        "game5-card-d1": {image:"img/game5/card_d1.png"},
        "game5-card-d2": {image:"img/game5/card_d2.png"},
        "game5-card-e1": {image:"img/game5/card_e1.png"},
        "game5-card-f1": {image:"img/game5/card_f1.png"},
        "game5-card-g1": {image:"img/game5/card_g1.png"},
        "game5-card-h1": {image:"img/game5/card_h1.png"},
        "game5-card-i1": {image:"img/game5/card_i1.png"},
        "game5-card-i2": {image:"img/game5/card_i2.png"},
        "game5-card-j1": {image:"img/game5/card_j1.png"},
        "game5-card-j2": {image:"img/game5/card_j2.png"},
        "game5-card-k1": {image:"img/game5/card_k1.png"},
        "game5-card-k2": {image:"img/game5/card_k2.png"},
        "game5-card-l1": {image:"img/game5/card_l1.png"},
        "game5-card-m1": {image:"img/game5/card_m1.png"},
        "game5-card-n1": {image:"img/game5/card_n1.png"},
        "game5-card-o1": {image:"img/game5/card_o1.png"},
        "game5-card-p1": {image:"img/game5/card_p1.png"},
    }, UpdateLoadingBar, StartGame);

}

function StartGame() {
    HideLoadingUI();

    gameObjectLibrary = new GameObjectLibrary({
        "card0_back": {transform:{posX:187, posY:278.48, sizeX:199.5, sizeY:285, anchorX: 0.5, anchorY: 0.5, rotation: -11.06},bitmap:gameAssetLibrary.data["game5-card"]},
    });
    // gameObjectLibrary.data["bg"].renderer.alpha = 0.5;

    gameUI.style.display = 'none';

    gameStage.addEventListener("click", OnMouseClick);

    gameStage.update();

}

function OnMouseClick(event) {
    console.log(JSON.stringify(event));
}


function ShowPanel(_layout) {

}

function OnClickUIButton(_buttonId) {

}


function PlayAudio(_audio) {
    _audio.currentTime = 0;
    _audio.play();
}
