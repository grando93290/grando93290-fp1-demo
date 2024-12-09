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

var gameScore, gameTime, gamePlayCountdown;

var game1vegetable1, game1vegetable2, game1vegetable3, game1vegetable4, game1vegetable5, game1vegetable6;
var game1ppl, game1cat;
var game1clock, game1clock_bg, game1clock_dot, game1clock_isHide;

var gameAudioCountdown, gameAudioWin, gameAudioLose;

var gameUIQuestionCountBallon, gameUIScoreCountBallon;
var gameUIClockTitle, gameUIClockDesc, gameUIClockTimer, gameUIClockBtn;
var gameUITalkingBox, gameUITalkingText;

function InitializeGame(_data) {
    isGameQuestionDebugging = 'forceScene' in _data;
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
        "ui-loading-bg": {transform:{left:'0%', top:'0%', width:'100%', height:'100%'}, image:{imgSrc:"img/gameCommon/loading-bg.png"}},
        "ui-loading-title": {transform:{top:'17.5%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:46, letterSpacing:4, color:'#00693E', text:'「靜」之感知'}},
        "ui-loading-img-main": {transform:{left:'37.375%', top:'24.5%', width:'25.25%', height:'35.89%'}, image:{imgSrc:"img/game1ui/loading-main.png"}},
        "ui-loading-img-compass": {transform:{left:'55.7%', top:'48.2%', width:'9.75%', height:'16.33%'}, image:{imgSrc:"img/gameCommon/loading-compass.png"}},
        "ui-loading-loadingbar": {transform:{left:'28%', top:'70.5%', width:'44%', height:'1.8%'}, loadingBar:{color1: '#fff', color2: '#F97930', round: 10}},
        "ui-loading-img-nail": {transform:{left:'27%', top:'66.5%', width:'4%', height:'7.22%'}, image:{imgSrc:"img/gameCommon/loading-nail.png"}},
        "ui-loading-img-sound": {transform:{left:'17.5%', top:'77.5%', width:'2.8125%', height:'5%'}, image:{imgSrc:"img/gameCommon/loading-sound.gif"}},
        "ui-loading-desc1": {transform:{left: '11%', top:'78.5%', width: '40%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'#F97930', text:'請打開聲音玩遊戲'}},
        "ui-loading-img-rotate": {transform:{left:'55.89%', top:'76.42%', width:'4.03125%', height:'7.16666%'}, image:{imgSrc:"img/gameCommon/loading-rotate.gif"}},
        "ui-loading-desc2": {transform:{left: '51.3%', top:'78.5%', width: '40%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'#F97930', text:'將你的裝置轉成橫向'}},

        "ui-question-count-ballon": {transform:{left:'79.16%', width:'7.52%', height:'9.59%'}, ballon:{imgSrc:"img/gameCommon/greenBallon.png", fontFamily:'CustomFont', fontSize:30, letterSpacing:4, color:'white', text:''}},
        "ui-score-count-ballon": {transform:{left:'86.68%', width:'7.52%', height:'9.59%'}, ballon:{imgSrc:"img/gameCommon/heartBallon2.png", fontFamily:'CustomFont', fontSize:25, letterSpacing:4, color:'white', text:''}},

        "ui-clock-title": {transform:{top:'17.5%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:45, letterSpacing:4, color:'#00693E', text:'15秒感知練習'}},
        "ui-clock-desc": {transform:{top:'24.2%', height:'15%'}, text:{fontFamily:'CustomFont', fontSize:31, letterSpacing:4, color:'#000000', text:'請專注呼吸，平靜自己的思緒，<br/>感受時間的流逝。'}},
        "ui-clock-timer": {transform:{top:'74%', height:'15%'}, text:{fontFamily:'CustomFont', fontSize:55, letterSpacing:4, color:'#00693E', text:''}},
        "ui-clock-btn": {transform:{left:'42.19%', top:'75%', width:'15.625%', height:'7.8%'}, button:{imgSrc:"img/gameCommon/button.png", round:10, fontFamily:'CustomFont', fontSize:34, letterSpacing:4, color:'white', text:'開始', onclick:()=>{OnClickUIButton(1);}}},

        "ui-talkingBubble-bg": {transform:{left:'54%', top:'25%', width:'18.81%', height:'18.44%'}, image:{imgSrc:"img/game1ui/talkingBubble.png"}},
        "ui-talkingBubble-text": {transform:{left: '54.5%', top:'30.5%', width: '18.81%', height:'18.44%'}, text:{fontFamily:'CustomFont', fontSize:26, letterSpacing:4, color:'#F97930', text:'已完成感知練習<br/>現在進入下一個環節'}},

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
    gameLoadingBar = gameUILibrary.data["ui-loading-loadingbar"];
    gameLoadingBarNail = gameUILibrary.data["ui-loading-img-nail"];

    gameUIQuestionCountBallon = gameUILibrary.data["ui-question-count-ballon"];
    gameUIScoreCountBallon = gameUILibrary.data["ui-score-count-ballon"];

    gameUIClockTitle = gameUILibrary.data["ui-clock-title"];
    gameUIClockDesc = gameUILibrary.data["ui-clock-desc"];
    gameUIClockTimer = gameUILibrary.data["ui-clock-timer"];
    gameUIClockBtn = gameUILibrary.data["ui-clock-btn"];

    gameUITalkingBox = gameUILibrary.data["ui-talkingBubble-bg"];
    gameUITalkingText = gameUILibrary.data["ui-talkingBubble-text"];
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
    gameUILibrary.data["ui-loading-desc1"].SetEnabled(true);
    gameUILibrary.data["ui-loading-img-rotate"].SetEnabled(true);
    gameUILibrary.data["ui-loading-desc2"].SetEnabled(true);
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
    gameUILibrary.data["ui-loading-desc1"].SetEnabled(false);
    gameUILibrary.data["ui-loading-img-rotate"].SetEnabled(false);
    gameUILibrary.data["ui-loading-desc2"].SetEnabled(false);
    UpdateLoadingBar(0);
}

function InitializeGameScene() {
    gameAssetLibrary = new AssetLibrary({
        // "game1-bg": {image:"img/game1/2.png"},
        "game1-dot": {image:"img/game1/game1-dot.png"},
        "game1-ppl": {image:"img/game1/game1-ppl.png"},
        "game1-cat": {image:"img/game1/game1-cat.png"},

        "game1-vegetation1": {image:"img/game1/game1-vegetation1.png"},
        "game1-vegetation2": {image:"img/game1/game1-vegetation2.png"},
        "game1-vegetation3": {image:"img/game1/game1-vegetation3.png"},
        "game1-vegetation4": {image:"img/game1/game1-vegetation4.png"},
        "game1-vegetation5": {image:"img/game1/game1-vegetation5.png"},
        "game1-vegetation6": {image:"img/game1/game1-vegetation6.png"},
        "game1-vegetation7": {image:"img/game1/game1-vegetation7.png"},

        "game1-audio-bg": {audio:"audio/game/game1bg.mp3"},
        "game1-audio-start": {audio:"audio/game/game1start.mp3"},
        "game1-audio-lose": {audio:"audio/game/game1lose.mp3"},
        "game1-audio-win": {audio:"audio/game/game1win.mp3"},
        "game1-audio-countdown": {audio:"audio/game/game1countdown.wav"},
    }, UpdateLoadingBar, StartGame);
    gameAudioCountdown = gameAssetLibrary.data["game1-audio-countdown"].audio;
    gameAudioWin = gameAssetLibrary.data["game1-audio-win"].audio;
    gameAudioLose = gameAssetLibrary.data["game1-audio-lose"].audio;
}

function StartGame() {
    gameUIState = 0;
    gameScore = 0;
    gamePlayCountdown = false;
    HideLoadingUI();
    ShowPanel();

    gameObjectLibrary = new GameObjectLibrary({
        // "bg": {transform:{posX:0, posY:0, sizeX:1728, sizeY:900},bitmap:gameAssetLibrary.data["game1-bg"]},
        "vegetation1": {transform:{posX:675, posY:325, sizeX:439, sizeY:151},bitmap:gameAssetLibrary.data["game1-vegetation1"]},
        "vegetation2": {transform:{posX:130, posY:280, sizeX:208, sizeY:67},bitmap:gameAssetLibrary.data["game1-vegetation2"]},
        "vegetation3": {transform:{posX:1470, posY:380, sizeX:95, sizeY:34},bitmap:gameAssetLibrary.data["game1-vegetation3"]},
        "vegetation4": {transform:{posX:120, posY:445, sizeX:95, sizeY:54},bitmap:gameAssetLibrary.data["game1-vegetation4"]},
        "vegetation5": {transform:{posX:445, posY:360, sizeX:449, sizeY:137},bitmap:gameAssetLibrary.data["game1-vegetation5"]},
        "vegetation6": {transform:{posX:1550, posY:640, sizeX:136, sizeY:75},bitmap:gameAssetLibrary.data["game1-vegetation6"]},
        "vegetation7": {transform:{posX:440, posY:400, sizeX:920, sizeY:267},bitmap:gameAssetLibrary.data["game1-vegetation7"]},

        "ppl": {transform:{posX:862, posY:460, sizeX:242, sizeY:302, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game1-ppl"]},
        "cat": {transform:{posX:985, posY:460, sizeX:105, sizeY:132},bitmap:gameAssetLibrary.data["game1-cat"]},

        "clock_bg": {transform:{posX:864, posY:450, sizeX:764, sizeY:764, anchorX:0.5, anchorY:0.5}, clock:{radius:382, thickness:5, color: '#FFFFFF', startArc:-Math.PI * 0.5, endArc: Math.PI * 1.5}},
        "clock": {transform:{posX:864, posY:450, sizeX:764, sizeY:764, anchorX:0.5, anchorY:0.5}, clock:{radius:382, thickness:5, color: '#F97930', startArc:0, endArc: 0}},
        "clock_dot": {transform:{posX:864, posY:68, sizeX:60, sizeY:60, anchorX:0.5, anchorY:0.5}, bitmap:gameAssetLibrary.data["game1-dot"]},
    });

    game1vegetable1 = gameObjectLibrary.data["vegetation1"];
    game1vegetable2 = gameObjectLibrary.data["vegetation2"];
    game1vegetable3 = gameObjectLibrary.data["vegetation3"];
    game1vegetable4 = gameObjectLibrary.data["vegetation4"];
    game1vegetable5 = gameObjectLibrary.data["vegetation5"];
    game1vegetable6 = gameObjectLibrary.data["vegetation6"];
    game1ppl = gameObjectLibrary.data["ppl"];
    game1cat = gameObjectLibrary.data["cat"];

    game1clock = gameObjectLibrary.data["clock"];
    game1clock_bg = gameObjectLibrary.data["clock_bg"];
    game1clock_dot = gameObjectLibrary.data["clock_dot"];

    gameStage.update();

    gameTimeBuffer1 = true;
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", LoopGame);

    PlayAudio(gameAssetLibrary.data["game1-audio-bg"].audio);

    // createjs.Tween.get(game1clock.renderer, { loop: true })
    //     .to({ colorStep: 1 }, 1000) // ColorStep goes from 0 to 1 in 1 second
    //     .to({ colorStep: 0 }, 1000) // Then goes back to 0 in 1 second
    //     .addEventListener("change", (e) => {
    //     const tween = e.target;
    //     const colorStep = tween.target.colorStep || 0; // Default to 0 if undefined
    //     const startColor = { r: 255, g: 183, b: 130 }; // #ffb782
    //     const endColor = { r: 249, g: 121, b: 48 }; // #f97930
    //     const interpolatedColor = {
    //         r: Math.round(startColor.r + (endColor.r - startColor.r) * colorStep),
    //         g: Math.round(startColor.g + (endColor.g - startColor.g) * colorStep),
    //         b: Math.round(startColor.b + (endColor.b - startColor.b) * colorStep),
    //     };
    //     game1clock.clockData.color = `rgb(${interpolatedColor.r}, ${interpolatedColor.g}, ${interpolatedColor.b})`;
    //     game1clock.SetClockArc(); 
    //     stage.update();
    // });
}

function LoopGame(_evt) {
    let runTime = _evt.runTime / 1000;
    if (gameTimeBuffer1) {
        gameTimeBuffer2 = runTime;
        gameTimeBuffer1 = false;
    }
    let time = runTime - gameTimeBuffer2;

    game1vegetable1.SetPosition({posX: 675 - (Math.sin(runTime * 0.2 + 1) + 1) * 20});
    game1vegetable2.SetPosition({posX: 130 + Math.sin(runTime * 0.24 + 2) * 60});
    game1vegetable3.SetPosition({posX: 1470 + Math.sin(runTime * 0.3 + 3) * 70});
    game1vegetable4.SetPosition({posX: 120 + Math.sin(runTime * 0.27 + 4) * 80});
    game1vegetable5.SetPosition({posX: 445 + (Math.sin(runTime * 0.25 + 5) + 1) * 30});
    game1vegetable6.SetPosition({posX: 1550 + Math.sin(runTime * 0.19 + 6) * 70});
    game1ppl.SetPosition({posY: 460 + Math.sin(runTime * 0.6 + 5) * 20});
    game1cat.SetPosition({posY: 460 + Math.sin(runTime * 0.75 + 8) * 25});

    let colorAnim1 = { r: 255, g: 183, b: 130 }, colorAnim2 = { r: 249, g: 121, b: 48 };
    let colorStep = (Math.sin(runTime * 5) + 1) * 0.5;
    let interpolatedColor = {
        r: Math.round(colorAnim1.r + (colorAnim2.r - colorAnim1.r) * colorStep),
        g: Math.round(colorAnim1.g + (colorAnim2.g - colorAnim1.g) * colorStep),
        b: Math.round(colorAnim1.b + (colorAnim2.b - colorAnim1.b) * colorStep),
    };
    game1clock.clockData.color = `rgb(${interpolatedColor.r}, ${interpolatedColor.g}, ${interpolatedColor.b})`;

    switch (gameUIState) {
        case 1:
        case 2:
            SetClock(time*100.0/15.0);
            gameUIClockTimer.Update({text:Math.floor(time)+"秒"});
            if (time > 7.5) {
                gameUIState = 2;
                ShowPanel();
            }
            if (time > 15) {
                gameUIState = 3;
                ShowPanel();
                gameTimeBuffer1 = true;
                SetClock(0);
            }
            break;
        case 3:
            if (time > 3) {
                gameUIState = 4;
                ShowPanel();
                gameTimeBuffer1 = true;
            }
            break;
        case 5:
        case 6:
            SetClock(time*100.0/15.0);
            gameTime = time;
            if (time <= 7.5) {
                gameUIClockTimer.Update({text:Math.floor(time)+"秒"});
                if (time >= 7.5-3 && !gamePlayCountdown) {
                    gamePlayCountdown = true;
                    PlayAudio(gameAudioCountdown);
                }
            } else if (time > 7.5) {
                game1clock_isHide = true;
                gameUIState = 6;
                ShowPanel();
            }
            break;
    }

    gameStage.update();

}

function SetClock(_progress) {
    if (game1clock_isHide) {
        game1clock_bg.clockData.startArc = -Math.PI * 0.5;
        game1clock_bg.clockData.endArc = -Math.PI * 0.5;
        game1clock_bg.SetClockArc();
        game1clock.clockData.startArc = -Math.PI * 0.5;
        game1clock.clockData.endArc = Math.PI * 1.5;
        game1clock.SetClockArc();
        game1clock_dot.renderer.visible = false;
    } else {
        let angle =  -Math.PI * 0.5 + _progress * 0.02 * Math.PI;
        game1clock_bg.clockData.startArc = angle;
        game1clock_bg.clockData.endArc = Math.PI * 1.5;
        game1clock_bg.SetClockArc();
        game1clock.clockData.startArc = -Math.PI * 0.5;
        game1clock.clockData.endArc = angle;
        game1clock.SetClockArc();
        angle = _progress * 0.02 * Math.PI;
        game1clock_dot.SetPosition({posX: 864 + Math.sin(angle) * 382, posY: 450 - Math.cos(angle) * 382 });
        game1clock_dot.renderer.visible = true;
    }
}

function ShowPanel() {
    switch (gameUIState) {
        case 0:
            gameUIQuestionCountBallon.SetEnabled(false);
            gameUIScoreCountBallon.SetEnabled(false);
            gameUIClockTitle.Update({text:"15秒感知小練習"});
            gameUIClockTitle.SetEnabled(true);
            gameUIClockDesc.Update({text:"感受時間節拍 讓思緒代入時鐘"});
            gameUIClockDesc.SetEnabled(true);
            gameUIClockBtn.Update({text:"開始"});
            gameUIClockBtn.SetEnabled(true);
            gameUIClockTimer.SetEnabled(false);

            gameUITalkingBox.SetEnabled(false);
            gameUITalkingText.SetEnabled(false);
            break;
        case 1:
            gameUIQuestionCountBallon.SetEnabled(false);
            gameUIScoreCountBallon.SetEnabled(false);
            gameUIClockTitle.Update({text:"15秒感知小練習"});
            gameUIClockTitle.SetEnabled(true);
            gameUIClockDesc.Update({text:"感受時間節拍 讓思緒代入時鐘"});
            gameUIClockDesc.SetEnabled(true);
            gameUIClockBtn.SetEnabled(false);
            gameUIClockTimer.Update({text:""});
            gameUIClockTimer.SetEnabled(true);

            gameUITalkingBox.SetEnabled(false);
            gameUITalkingText.SetEnabled(false);
            break;
        case 2:
            gameUIQuestionCountBallon.SetEnabled(false);
            gameUIScoreCountBallon.SetEnabled(false);
            gameUIClockTitle.Update({text:"15秒感知小練習"});
            gameUIClockTitle.SetEnabled(true);
            gameUIClockDesc.Update({text:"練習即將完成"});
            gameUIClockDesc.SetEnabled(true);
            gameUIClockBtn.SetEnabled(false);
            // gameUIClockTimer.Update({text:""});
            gameUIClockTimer.SetEnabled(true);

            gameUITalkingBox.SetEnabled(false);
            gameUITalkingText.SetEnabled(false);
            break;
        case 3:
            gameUIQuestionCountBallon.Update({text:"1/3"});
            gameUIQuestionCountBallon.SetEnabled(true);
            gameUIScoreCountBallon.Update({text:gameScore});
            gameUIScoreCountBallon.SetEnabled(true);
            gameUIClockTitle.SetEnabled(false);
            gameUIClockDesc.SetEnabled(false);
            gameUIClockBtn.SetEnabled(false);
            gameUIClockTimer.SetEnabled(false);

            gameUITalkingBox.SetEnabled(true);
            gameUITalkingText.Update({text:"已完成感知練習<br/>現在進入下一個環節"});
            gameUITalkingText.SetEnabled(true);
            break;
        case 4:
            gameUIQuestionCountBallon.Update({text:"1/3"});
            gameUIQuestionCountBallon.SetEnabled(true);
            gameUIScoreCountBallon.Update({text:gameScore});
            gameUIScoreCountBallon.SetEnabled(true);
            gameUIClockTitle.Update({text:"進入自我覺察環節"});
            gameUIClockTitle.SetEnabled(true);
            gameUIClockDesc.Update({text:"目標時間15秒", fontSize:31});
            gameUIClockDesc.SetEnabled(true);
            gameUIClockBtn.Update({text:"開始"});
            gameUIClockBtn.SetEnabled(true);
            gameUIClockTimer.SetEnabled(false);

            gameUITalkingBox.SetEnabled(false);
            gameUITalkingText.SetEnabled(false);
            break;
        case 5:
            gameUIQuestionCountBallon.Update({text:"1/3"});
            gameUIQuestionCountBallon.SetEnabled(true);
            gameUIScoreCountBallon.Update({text:gameScore});
            gameUIScoreCountBallon.SetEnabled(true);
            gameUIClockTitle.Update({text:"進入自我覺察環節"});
            gameUIClockTitle.SetEnabled(true);
            gameUIClockDesc.Update({text:"畫面倒數即將消失，請你感受時間的流逝", fontSize:27});
            gameUIClockDesc.SetEnabled(true);
            gameUIClockBtn.SetEnabled(false);
            gameUIClockTimer.Update({text:""});
            gameUIClockTimer.SetEnabled(true);

            gameUITalkingBox.SetEnabled(false);
            gameUITalkingText.SetEnabled(false);
            break;
        case 6:
            gameUIQuestionCountBallon.Update({text:"1/3"});
            gameUIQuestionCountBallon.SetEnabled(true);
            gameUIScoreCountBallon.Update({text:gameScore});
            gameUIScoreCountBallon.SetEnabled(true);
            gameUIClockTitle.Update({text:"進入自我覺察環節"});
            gameUIClockTitle.SetEnabled(true);
            gameUIClockDesc.Update({text:"若你認為時間到，請按下完成按鈕，核對你的判斷", fontSize:22});
            gameUIClockDesc.SetEnabled(true);
            gameUIClockBtn.Update({text:"時間到"});
            gameUIClockBtn.SetEnabled(true);
            gameUIClockTimer.SetEnabled(false);

            gameUITalkingBox.SetEnabled(false);
            gameUITalkingText.SetEnabled(false);
            break;
        case 7:
            gameUIQuestionCountBallon.Update({text:"1/3"});
            gameUIQuestionCountBallon.SetEnabled(true);
            gameUIScoreCountBallon.Update({text:gameScore});
            gameUIScoreCountBallon.SetEnabled(true);
            gameUIClockTitle.Update({text:"你的時間 "+gameTime.toFixed(1)+"秒"});
            gameUIClockTitle.SetEnabled(true);
            gameUIClockDesc.Update({text:"目標時間 15秒", fontSize:31});
            gameUIClockDesc.SetEnabled(true);
            gameUIClockBtn.SetEnabled(false);
            gameUIClockTimer.SetEnabled(false);

            gameUITalkingBox.SetEnabled(true);
            gameUITalkingText.Update({text:(gameTime > 16 || gameTime < 14) ? "你可以做得更好" : "你做得很好"});
            gameUITalkingText.SetEnabled(true);
            break;
    }
}

function OnClickUIButton(_buttonId) {
    switch (gameUIState) {
        case 0:
            gameUIState = 1;
            ShowPanel();
            gameTimeBuffer1 = true;
            break;
        case 4:
            gameUIState = 5;
            ShowPanel();
            gameTimeBuffer1 = true;
            gamePlayCountdown = false;
            break;
        case 6:
            gameUIState = 7;
            ShowPanel();
            gameTimeBuffer1 = true;
            game1clock_isHide = false;
            SetClock(0);
            break;
    }
}

function PlayAudio(_audio) {
    _audio.currentTime = 0;
    _audio.play();
}