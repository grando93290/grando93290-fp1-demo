var gameSharedAssetLibrary;
var gameUILibrary;
var gameUIState;
var gamePopupAudio;
var gamePressAudio;
var gameTrueAudio;
var gameLoadingBar, gameLoadingBarNail;
var gameQuestionBallon, gameScoreBallon, gameBackBallon;
var gameLoadSceneAction;

var gameAssetLibrary;
var gameObjectLibrary;
var gameTimeBuffer1, gameTimeBuffer2;

var game1vegetable1, game1vegetable2, game1vegetable3, game1vegetable4, game1vegetable5, game1vegetable6;
var game1ppl, game1cat;
var game1clock, game1clock_bg, game1clock_dot, game1clock_isHide;

var gameAudioCountdown, gameAudioWin, gameAudioLose;

var gameUIClockTitle, gameUIClockDesc, gameUIClockTimer, gameUIClockBtn;
var gameUITalkingBox, gameUITalkingText;

var gameUIMainBox, gameUIMainTitle, gameUIMainDesc, gameUIMainImage, gameUIMainButton1, gameUIMainButton2;

var gameScore, gameTime, gamePlayCountdown, gameTestIndex, gamePplTalkFadeOut;

var gameUIDebug;

function InitializeGame1(_data) {
    isGameQuestionDebugging = 'forceScene' in _data;
    gameSharedAssetLibrary = new AssetLibrary({
        "ui-back-ballon": {image:"img/gameCommon/backBallon-min.png"},
        "ui-question-count-ballon": {image:"img/gameCommon/greenBallon-min.png"},
        "ui-score-ballon": {image:"img/gameCommon/heartBallon-min.png"},
        "ui-score-ballon2": {image:"img/gameCommon/heartBallon2-min.png"},
        "ui-button": {image:"img/gameCommon/button-min.png"},
        "ui-talkingBubble-bg": {image:"img/game1ui/talkingBubble-min.png"},
        "ui-main-image": {image:"img/game1ui/ppl-min.png"},

        "game-popup-audio": {audio:"audio/game/popup.wav"},
        "game-press-audio": {audio:"audio/game/press.mp3"},
        "game-true-audio": {audio:"audio/game/true.wav"},
    }, null, InitializeGame1Scene);
    gamePopupAudio = gameSharedAssetLibrary.data["game-popup-audio"].audio;
    gamePressAudio = gameSharedAssetLibrary.data["game-press-audio"].audio;
    gameTrueAudio = gameSharedAssetLibrary.data["game-true-audio"].audio;
    InitializeGame1UI();
    ShowLoadingGame1UI();
}

function InitializeGame1UI() {
    gameUILibrary = new UILibrary({});
    gameUILibrary.AddUIElements({
        "ui-loading-bg": {transform:{left:'0%', top:'0%', width:'100%', height:'100%'}, image:{imgSrc:"img/gameCommon/loading-bg-min.png"}},
        // "ui-loading-title": {transform:{top:'15.4%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'#00693E', text:'「靜」之感知'}},
        "ui-loading-title": {transform:{left:'40.39%', top:'13.66%', width:'19.67%', height:'9.28%'}, image:{imgSrc:"img/game1ui/title-1-min.png"}},
        "ui-loading-img-main": {transform:{left:'40.79%', top:'26.28%', width:'19.67%', height:'30.11%'}, image:{imgSrc:"img/game1ui/loading-main-min.png"}},
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

        "ui-clock-title": {transform:{top:'17.5%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:45, letterSpacing:4, color:'#00693E', text:'15秒感知練習'}},
        "ui-clock-desc": {transform:{top:'24.2%', height:'15%'}, text:{fontFamily:'CustomFont', fontSize:31, letterSpacing:4, color:'#000000', text:'請專注呼吸，平靜自己的思緒，<br/>感受時間的流逝。', lineHeight: 40}},
        "ui-clock-timer": {transform:{top:'73.5%', height:'15%'}, text:{fontFamily:'CustomFont', fontSize:58, letterSpacing:4, color:'#00693E', text:''}},
        "ui-clock-btn": {transform:{left:'42.19%', top:'75%', width:'15.625%', height:'7.8%'}, button:{imgSrc:"img/gameCommon/button-min.png", round:10, fontFamily:'CustomFont', fontSize:34, letterSpacing:4, color:'white', text:'開始', onclick:()=>{OnClickGame1UIButton(1);}}},

        "ui-talkingBubble-bg": {transform:{left:'55.7%', top:'30%', width:'18.81%', height:'18.44%'}, image:{imgSrc:"img/game1ui/talkingBubble-min.png"}},
        "ui-talkingBubble-text": {transform:{left: '56.2%', top:'35.5%', width: '18.81%', height:'18.44%'}, text:{fontFamily:'CustomFont', fontSize:26, letterSpacing:4, color:'#F97930', text:'已完成感知練習<br/>現在進入下一個環節'}},

        "ui-main-bg": {transform:{left:'15.28%', top:'11.11%', width:'69.44%', height:'77.78%'}, roundRect:{color:'white', round:150}},
        "ui-main-title": {transform:{top:'25%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:40, letterSpacing:4, color:'#00693E', text:'完成遊戲', lineHeight: 70}},
        "ui-main-desc": {transform:{top:'29%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:32, letterSpacing:4, color:'#F97930', text:'請進入下一輪遊戲'}},
        "ui-main-image": {transform:{left:'43.06%', top:'34%', width:'13.88%', height:'23.33%'}, image:{imgSrc:"img/game1ui/ppl-min.png"}},
        "ui-main-button1": {transform:{left:'33.1%', top:'61.5%', width:'16%', height:'9.36%'}, button:{imgSrc:"img/gameCommon/button-min.png", round:10, fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'white', text:'再玩一次', onclick:()=>{OnClickGame1UIButton(1);}}},
        "ui-main-button2": {transform:{left:'50.9%', top:'61.5%', width:'16%', height:'9.36%'}, button:{imgSrc:"img/gameCommon/button-min.png", round:10, fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'white', text:'離開遊戲', onclick:()=>{OnClickGame1UIButton(2);}}},

        "ui-debug": {transform:{top:'10%', left: '0%', width:'20%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:40, letterSpacing:4, color:'#FF0000', text:'0'}},
    });

    gameUILibrary.AddUIResizeEvent();
    gameUIState = 0;
    gameLoadingBar = gameUILibrary.data["ui-loading-loadingbar"];
    gameLoadingBarNail = gameUILibrary.data["ui-loading-img-nail"];
    gameQuestionBallon = gameUILibrary.data["ui-question-count-ballon"];
    gameScoreBallon = gameUILibrary.data["ui-score-count-ballon"];
    gameScoreBallon.AddCoveredBallon({imgSrc2:"img/gameCommon/heartBallon2-min.png"});
    gameBackBallon = gameUILibrary.data["ui-back-ballon"];
    gameBackBallon.dom.addEventListener('click', BackToWeb);

    gameUIClockTitle = gameUILibrary.data["ui-clock-title"];
    gameUIClockDesc = gameUILibrary.data["ui-clock-desc"];
    gameUIClockTimer = gameUILibrary.data["ui-clock-timer"];
    gameUIClockBtn = gameUILibrary.data["ui-clock-btn"];

    gameUITalkingBox = gameUILibrary.data["ui-talkingBubble-bg"];
    gameUITalkingText = gameUILibrary.data["ui-talkingBubble-text"];

    gameUIMainBox = gameUILibrary.data["ui-main-bg"];
    gameUIMainTitle = gameUILibrary.data["ui-main-title"];
    gameUIMainDesc = gameUILibrary.data["ui-main-desc"];
    gameUIMainImage = gameUILibrary.data["ui-main-image"];
    gameUIMainButton1 = gameUILibrary.data["ui-main-button1"];
    gameUIMainButton2 = gameUILibrary.data["ui-main-button2"];

    gameUIDebug = gameUILibrary.data["ui-debug"];
    gameUIDebug.SetEnabled(true);
}

function ShowLoadingGame1UI() {
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

function UpdateGame1LoadingBar(_progress) {
    gameLoadingBar.UpdateLoadingBar(_progress);
    gameLoadingBarNail.Update({left: (27+((_progress/100)*44))+'%'});
}

function HideGame1LoadingUI() {
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
    UpdateGame1LoadingBar(0);
}

function InitializeGame1Scene() {
    gameAssetLibrary = new AssetLibrary({
        // "game1-bg": {image:"img/game1ui/3.jpg"},
        "game1-dot": {image:"img/game1/game1-dot-min.png"},
        "game1-ppl": {image:"img/game1/game1-ppl-min.png"},
        "game1-cat": {image:"img/game1/game1-cat-min.png"},

        "game1-vegetation1": {image:"img/game1/game1-vegetation1-min.png"},
        "game1-vegetation2": {image:"img/game1/game1-vegetation2-min.png"},
        "game1-vegetation3": {image:"img/game1/game1-vegetation3-min.png"},
        "game1-vegetation4": {image:"img/game1/game1-vegetation4-min.png"},
        "game1-vegetation5": {image:"img/game1/game1-vegetation5-min.png"},
        "game1-vegetation6": {image:"img/game1/game1-vegetation6-min.png"},
        "game1-vegetation7": {image:"img/game1/game1-vegetation7-min.png"},

        "game1-audio-bg": {audio:"audio/game/game1bg.mp3"},
        "game1-audio-start": {audio:"audio/game/game1start.mp3"},
        "game1-audio-lose": {audio:"audio/game/game1lose.mp3"},
        "game1-audio-win": {audio:"audio/game/game1win.mp3"},
        "game1-audio-countdown": {audio:"audio/game/game1countdown.wav"},
    }, UpdateGame1LoadingBar, StartGame1);
    gameAudioCountdown = gameAssetLibrary.data["game1-audio-countdown"].audio;
    gameAudioWin = gameAssetLibrary.data["game1-audio-win"].audio;
    gameAudioLose = gameAssetLibrary.data["game1-audio-lose"].audio;
}

function StartGame1() {
    gameUIState = 0;
    gameScore = 0;
    gameTestIndex = 0;
    gamePlayCountdown = false;
    gamePplTalkFadeOut = false;
    HideGame1LoadingUI();
    SetGame1UIState();
    gameBackBallon.SetEnabled(true);

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
    createjs.Ticker.addEventListener("tick", LoopGame1);

    gameAssetLibrary.data["game1-audio-bg"].audio.loop = true;
    PlayAudio(gameAssetLibrary.data["game1-audio-bg"].audio);
}

function LoopGame1(_evt) {
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
    game1ppl.SetPosition({posY: 470 + Math.sin(runTime * 0.6 + 5) * 12});
    game1cat.SetPosition({posY: 460 + Math.sin(runTime * 0.75 + 8) * 18});

    let colorAnim1 = { r: 255, g: 183, b: 130 }, colorAnim2 = { r: 249, g: 121, b: 48 };
    let colorStep = (Math.sin(runTime * 5) + 1) * 0.5;
    let interpolatedColor = {
        r: Math.round(colorAnim1.r + (colorAnim2.r - colorAnim1.r) * colorStep),
        g: Math.round(colorAnim1.g + (colorAnim2.g - colorAnim1.g) * colorStep),
        b: Math.round(colorAnim1.b + (colorAnim2.b - colorAnim1.b) * colorStep),
    };
    game1clock.clockData.color = `rgb(${interpolatedColor.r}, ${interpolatedColor.g}, ${interpolatedColor.b})`;

    let testTime = (gameTestIndex == 0 || gameTestIndex == 1) ? 15 : gameTestIndex == 2 ? 20 : 30;
    switch (gameUIState) {
        case 1: // feeling 15 sec
            SetClock(time*100.0/testTime);
            gameUIClockTimer.Update({text:Math.floor(time)+"秒"});
            if (time > testTime * 0.5) {
                gameUIState++;
                SetGame1UIState();
            }
            break;
        case 2: // feeling 15 sec (after half of time)
            SetClock(time*100.0/testTime);
            gameUIClockTimer.Update({text:Math.floor(time)+"秒"});
            if (time > testTime) { // End of feeling 15sec
                gameUIState++;
                SetGame1UIState();
                SetClock(0);
                gameTimeBuffer1 = true;
            }
            break;
        case 3: // ppl talk to player for 4 seconds
        case 7: // 15 sec test finish (before 1 min), ppl talk to player for 4 seconds
        case 12: // 20 sec test finish (before 1 min), ppl talk to player for 4 seconds
        case 17: // 30 sec test finish (before 1 min), ppl talk to player for 4 seconds
            if (time > 3.6 && !gamePplTalkFadeOut) {
                gamePplTalkFadeOut = true;
                gameUITalkingBox.FadeOut(); gameUITalkingText.FadeOut();
            }
            if (time > 4) {
                gameTestIndex++;
                gameUIState++;
                gameTimeBuffer1 = true;
                gamePplTalkFadeOut = false;
                SetGame1UIState();
            }
            break;
        case 5: // 15 sec test
        case 10: // 20 sec test
        case 15: // 30 sec test
            SetClock(time*100.0/testTime);
            gameUIClockTimer.Update({text:Math.floor(time)+"秒"});
            if (time >= testTime * 0.5 - 2.5 && !gamePlayCountdown) {
                gamePlayCountdown = true;
                PlayAudio(gameAudioCountdown);
            }
            if (time > testTime * 0.5) {
                game1clock_isHide = true;
                gameUIState++;
                gamePlayCountdown = false;
                SetGame1UIState();
            }
            break;
        case 6: // 15 sec test (after half of time)
        case 11: // 20 sec test (after half of time)
        case 16: // 30 sec test (after half of time)
            gameTime = time;
            SetClock(time*100.0/testTime);
            if (time > 60) {
                gameUIState+=3;
                gameTestIndex++;
                PlayAudio(gameAudioWin);
                gameTimeBuffer1 = true;
                game1clock_isHide = false;
                SetClock(0);
                SetGame1UIState();
            }
            break;
    }

    gameUIDebug.Update({text:time.toFixed(1)});

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

function SetGame1UIState() {
    // UI Ballon
    if (gameUIState >= 4) {
        gameQuestionBallon.Update({text:Math.min(gameTestIndex, 3)+"/3"});
        gameQuestionBallon.SetEnabled(true);
        gameScoreBallon.Update({text:gameScore.toString()});
        gameScoreBallon.SetEnabled(true);
    } else {
        gameQuestionBallon.SetEnabled(false);
        gameScoreBallon.SetEnabled(false);
    }

    gameUIClockTitle.SetEnabled(false);
    gameUIClockDesc.SetEnabled(false);
    gameUIClockBtn.SetEnabled(false);
    gameUIClockTimer.SetEnabled(false);
    gameUITalkingBox.SetEnabled(false);
    gameUITalkingText.SetEnabled(false);

    gameUIMainBox.SetEnabled(false);
    gameUIMainTitle.SetEnabled(false);
    gameUIMainDesc.SetEnabled(false);
    gameUIMainImage.SetEnabled(false);
    gameUIMainButton1.SetEnabled(false);
    gameUIMainButton2.SetEnabled(false);

    let testTime = (gameTestIndex == 0 || gameTestIndex == 1) ? 15 : gameTestIndex == 2 ? 20 : 30;

    switch (gameUIState) {
        case 0: // Start Game (Waiting for feeling 15 sec)
            gameUIClockTitle.Update({text:"15秒感知練習"}); gameUIClockTitle.SetEnabled(true);
            gameUIClockDesc.Update({text:"請專注呼吸，平靜自己的思緒，<br/>感受時間的流逝。"}); gameUIClockDesc.SetEnabled(true);
            gameUIClockBtn.Update({text:"開始"}); gameUIClockBtn.SetEnabled(true);
            break;
        case 1: // feeling 15 sec
            gameUIClockTitle.Update({text:"15秒感知練習"}); gameUIClockTitle.SetEnabled(true);
            gameUIClockDesc.Update({text:"請專注呼吸，平靜自己的思緒，<br/>感受時間的流逝。"}); gameUIClockDesc.SetEnabled(true);
            gameUIClockTimer.Update({text:""}); gameUIClockTimer.SetEnabled(true);
            break;
        case 2: // feeling 15 sec (after half of time)
            gameUIClockTitle.Update({text:"15秒感知練習"}); gameUIClockTitle.SetEnabled(true);
            gameUIClockDesc.Update({text:"練習即將完成"}); gameUIClockDesc.SetEnabled(true);
            gameUIClockTimer.SetEnabled(true);
            break;
        case 3: // ppl talk to player for 4 seconds
            gameUITalkingBox.FadeIn();
            gameUITalkingText.Update({text:"已完成感知練習<br/>現在進入下一個環節", top: '35.5%'}); gameUITalkingText.FadeIn();
            break;
        case 4: // waiting for start test
            gameUIClockTitle.Update({text:"進入自我覺察環節"}); gameUIClockTitle.SetEnabled(true);
            gameUIClockDesc.Update({text:"目標時間15秒"}); gameUIClockDesc.SetEnabled(true);
            gameUIClockBtn.Update({text:"開始"}); gameUIClockBtn.SetEnabled(true);
            break;
        case 5: // 15 sec test
        case 10: // 20 sec test
        case 15: // 30 sec test
            gameUIClockTitle.Update({text:"進入自我覺察環節"}); gameUIClockTitle.SetEnabled(true);
            gameUIClockDesc.Update({text:"畫面的倒數即將消失，請判斷<br/>何時過了"+testTime+"秒"}); gameUIClockDesc.SetEnabled(true);
            gameUIClockTimer.Update({text:""}); gameUIClockTimer.SetEnabled(true);
            break;
        case 6: // 15 sec test (after half of time)
        case 11: // sec test (after half of time)
        case 16: // sec test (after half of time)
            gameUIClockTitle.Update({text:"進入自我覺察環節"}); gameUIClockTitle.SetEnabled(true);
            gameUIClockDesc.Update({text:"當你認為時間到，請按「時間到」</br>按鈕，看看與真實時間的差異"}); gameUIClockDesc.SetEnabled(true);
            gameUIClockBtn.Update({text:"時間到"}); gameUIClockBtn.SetEnabled(true);
            break;
        case 7: // 15 sec test finish (before 1 min), ppl talk to player for 4 seconds
        case 12: // 20 sec test finish (before 1 min), ppl talk to player for 4 seconds
        case 17: // 20 sec test finish (before 1 min), ppl talk to player for 4 seconds
            gameUITalkingBox.FadeIn();
            gameUITalkingText.Update({text:(gameTime <= testTime + 1 && gameTime >= testTime - 1) ? "你做得很好！" : "你可以做得更好！", top: '37.5%'}); gameUITalkingText.FadeIn();
            break;
        case 8: // 15 sec test finish (before 1 min), wait for end game or next round
        case 13: // 20 sec test finish (before 1 min), wait for end game or next round
        case 18: // 30 sec test finish (before 1 min), wait for end game or next round
            gameUIClockTitle.Update({text:"你的時間 "+gameTime.toFixed(1)+"秒"}); gameUIClockTitle.SetEnabled(true);
            gameUIClockDesc.Update({text:"目標時間 "+(gameUIState==8?"15秒":gameUIState==13?"20秒":"30秒")}); gameUIClockDesc.SetEnabled(true);
            gameUIClockBtn.Update({text:gameTestIndex>3?"完成":"下一輪"}); gameUIClockBtn.SetEnabled(true);
            break;
        case 9: // 15 sec test finish (after 1 min), wait for end game or next round
        case 14: // 20 sec test finish (after 1 min), wait for end game or next round
        case 19: // 30 sec test finish (after 1 min), wait for end game or next round
            gameUIMainBox.SetEnabled(true);
            gameUIMainTitle.Update({text:"本輪遊戲結束", top:'21%'}); gameUIMainTitle.SetEnabled(true);
            gameUIMainDesc.SetEnabled(true);
            gameUIMainImage.Update({top:'38%'}); gameUIMainImage.SetEnabled(true);
            gameUIMainButton1.Update({text:gameTestIndex>3?"完成":"下一輪", left:'42%', top:'67.5%', width:'16%'}); gameUIMainButton1.SetEnabled(true);
            gameUIMainButton2.SetEnabled(false);
            break;
        case 20: // End game
            gameUIMainBox.SetEnabled(true);
            gameUIMainTitle.Update({text:"完成遊戲", top:'25%'}); gameUIMainTitle.SetEnabled(true);
            gameUIMainDesc.SetEnabled(false);
            gameUIMainImage.Update({top:'34%'}); gameUIMainImage.SetEnabled(true);
            gameUIMainButton1.Update({text:"再玩一次", left:'33.1%', top:'61.5%', width:'16%'}); gameUIMainButton1.SetEnabled(true);
            gameUIMainButton2.SetEnabled(true);
            break;
    }
}

function OnClickGame1UIButton(_buttonId) {
    let testTime = (gameTestIndex == 0 || gameTestIndex == 1) ? 15 : gameTestIndex == 2 ? 20 : 30;
    switch (gameUIState) {
        case 0: // Start Game (Waiting for feeling 15 sec)
        case 4: // waiting for start test
            gameTimeBuffer1 = true;
            gameUIState++;
            SetGame1UIState();
            PlayAudio(gamePressAudio);
            break;
        case 6: // 15 sec test (after half of time)
        case 11: // 20 sec test (after half of time)
        case 16: // 30 sec test (after half of time)
            gameUIState++;
            if (gameTime <= testTime + 1 && gameTime >= testTime - 1) {
                gameScore++;
                PlayAudio(gameAudioWin);
            } else {
                PlayAudio(gameAudioWin);
            }
            gameTimeBuffer1 = true;
            game1clock_isHide = false;
            SetClock(0);
            SetGame1UIState();
            break;
        case 8: // 15 sec test finish (before 1 min), wait for end game or next round
        case 13: // 20 sec test finish (before 1 min), wait for end game or next round
        case 18: // 30 sec test finish (before 1 min), wait for end game or next round
            gameUIState+=2;
            gameTimeBuffer1 = true;
            gamePlayCountdown = false;
            SetGame1UIState();
            PlayAudio(gamePressAudio);
            break;
        case 9: // 15 sec test finish (after 1 min), wait for end game or next round
        case 14: // 20 sec test finish (after 1 min), wait for end game or next round
        case 19: // 30 sec test finish (after 1 min), wait for end game or next round
            gameUIState++;
            gameTimeBuffer1 = true;
            gamePlayCountdown = false;
            SetGame1UIState();
            PlayAudio(gamePressAudio);
            break;
        case 20: // End game
            createjs.Ticker.removeEventListener("tick", LoopGame1);
            if (_buttonId == 1) {
                gameStage.removeAllChildren();
                gameStage.clear();
                StartGame1();
            } else {
                ExitGameView();
            }
            break;
    }
}
