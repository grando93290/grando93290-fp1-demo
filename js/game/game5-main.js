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
var gameTimeBuffer1, gameTimeBuffer2;
var gameSceneIndex;

function InitializeGame(_data) {
    // gameLoadSceneAction = ('forceScene' in _data) ? (() => LoadScene(_data.forceScene)) : (() => LoadRandomScene());
    gameLoadSceneAction = () => {};
    gameSharedAssetLibrary = new AssetLibrary({
        "ui-question-count-ballon": {image:"img/gameCommon/greenBallon.png"},
        "ui-score-ballon": {image:"img/gameCommon/heartBallon.png"},
        "ui-score-ballon2": {image:"img/gameCommon/heartBallon2.png"},
        "ui-button": {image:"img/gameCommon/button.png"},

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

        "ui-question-count-ballon": {transform:{left:'81.5%', width:'8%', height:'9.5%'}, ballon:{imgSrc:"img/gameCommon/greenBallon.png", fontFamily:'CustomFont', fontSize:34, letterSpacing:4, color:'white', text:'0'}},
        "ui-score-count-ballon": {transform:{left:'89.5%', width:'8%', height:'9.5%'}, ballon:{imgSrc:"img/gameCommon/heartBallon.png", fontFamily:'CustomFont', fontSize:27, letterSpacing:4, color:'white', text:'0'}},
        // "ui-main-bg": {transform:{left:'20.93%', top:'17.78%', width:'58.12%', height:'64.44%'}, roundRect:{color:'white', round:150}},
        // "ui-main-title": {transform:{top:'25.2%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:37, letterSpacing:4, color:'#00693E', text:''}},
        // "ui-main-desc": {transform:{top:'56%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:20, letterSpacing:4, color:'#161616', text:''}},
        // "ui-main-button1": {transform:{left:'33.1%', top:'34.78%', width:'33.8%', height:'7.8%'}, button:{imgSrc:"img/gameCommon/button.png", round:10, fontFamily:'CustomFont', fontSize:34, letterSpacing:4, color:'white', text:'', onclick:()=>{OnClickUIButton(1);}}},
        // "ui-main-button2": {transform:{left:'33.1%', top:'45.25%', width:'33.8%', height:'7.8%'}, button:{imgSrc:"img/gameCommon/button.png", round:10, fontFamily:'CustomFont', fontSize:34, letterSpacing:4, color:'white', text:'', onclick:()=>{OnClickUIButton(2);}}},
        // "ui-main-button3": {transform:{left:'33.1%', top:'55.72%', width:'33.8%', height:'7.8%'}, button:{imgSrc:"img/gameCommon/button.png", round:10, fontFamily:'CustomFont', fontSize:34, letterSpacing:4, color:'white', text:'', onclick:()=>{OnClickUIButton(3);}}},
        // "ui-main-button4": {transform:{left:'33.1%', top:'66.19%', width:'33.8%', height:'7.8%'}, button:{imgSrc:"img/gameCommon/button.png", round:10, fontFamily:'CustomFont', fontSize:34, letterSpacing:4, color:'white', text:'', onclick:()=>{OnClickUIButton(4);}}},
        // "ui-main-image-correct": {transform:{left:'45.31%', top:'29%', width:'9.375%', height:'16.67%'}, image:{imgSrc:"img/gameCommon/correct.png"}},
        // "ui-main-image-wrong": {transform:{left:'45.31%', top:'29%', width:'9.375%', height:'16.67%'}, image:{imgSrc:"img/gameCommon/wrong.png"}},
        // "ui-main-image-bird": {transform:{left:'42.53%', top:'29%', width:'14.94%', height:'19.83%'}, image:{imgSrc:"img/game2ui/bird.png"}},
    });
    gameUILibrary.AddUIResizeEvent();
    gameUIState = 0;
    gameLoadingBar = gameUILibrary.data["ui-loading-loadingbar"];
    gameLoadingBarNail = gameUILibrary.data["ui-loading-img-nail"];
    gameQuestionBallon = gameUILibrary.data["ui-question-count-ballon"];
    gameScoreBallon = gameUILibrary.data["ui-score-count-ballon"];
    gameScoreBallon.AddCoveredBallon({imgSrc2:"img/gameCommon/heartBallon2.png"});
}

function ShowLoadingUI() {
    gameQuestionBallon.SetEnabled(false);
    gameScoreBallon.SetEnabled(false);
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
    gameQuestionBallon.SetEnabled(true);
    gameScoreBallon.SetEnabled(true);
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

function ShowPanel(_layout) {

}

function OnClickUIButton(_buttonId) {

}


function PlayAudio(_audio) {
    _audio.currentTime = 0;
    _audio.play();
}
