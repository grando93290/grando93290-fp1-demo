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

var gameQuestionLibrary;
var gameQuestionSelected;
var gameQuestionIndex;
var gameQuestionScore;
var gameQuestionCorrect;

var isGameQuestionDebugging;

// var debugLog = [];

function InitializeGame(_data) {
    // gameLoadSceneAction = ('forceScene' in _data) ? (() => LoadScene(_data.forceScene)) : (() => LoadRandomScene());
    gameLoadSceneAction = () => {};
    isGameQuestionDebugging = 'forceScene' in _data;
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
        "ui-loading-img-sound": {transform:{left:'17.5%', top:'77.5%', width:'2.8125%', height:'5%'}, image:{imgSrc:"img/gameCommon/loading-sound.png"}},
        "ui-loading-desc1": {transform:{left: '11%', top:'78.5%', width: '40%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'#F97930', text:'請打開聲音玩遊戲'}},
        "ui-loading-img-rotate": {transform:{left:'56.5%', top:'77.5%', width:'2.8125%', height:'5%'}, image:{imgSrc:"img/gameCommon/loading-rotate.png"}},
        "ui-loading-desc2": {transform:{left: '51.3%', top:'78.5%', width: '40%', height:'10%'}, text:{fontFamily:'CustomFont', fontSize:38, letterSpacing:4, color:'#F97930', text:'將你的裝置轉成橫向'}},

        "ui-question-count-ballon": {transform:{left:'81.5%', width:'8%', height:'9.5%'}, ballon:{imgSrc:"img/gameCommon/greenBallon.png", fontFamily:'CustomFont', fontSize:34, letterSpacing:4, color:'white', text:'0'}},
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

function LoadRandomScene() {
    gameSceneIndex = Math.floor(Math.random() * 4) + 1;
    LoadScene(gameSceneIndex);
}

function LoadScene(_gameSceneIndex) {
    if (_gameSceneIndex == 1) InitializeGameScene1();
    else if (_gameSceneIndex == 2) InitializeGameScene2();
    else if (_gameSceneIndex == 3) InitializeGameScene3();
    else if (_gameSceneIndex == 4) InitializeGameScene4();
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
    gameUILibrary.data["ui-question-count-ballon"].Update({text:((gameQuestionIndex+1)+"/"+gameQuestionSelected.length)});
    ShowPanel(gameQuestionLibrary.data['q'+gameQuestionSelected[gameQuestionIndex]].layout);
    PlayAudio(gamePopupAudio);
}

function OnClickUIButton(_buttonId) {
    let gameQuestionCount = gameQuestionSelected.length;
    let question = gameQuestionLibrary.data['q'+gameQuestionSelected[gameQuestionIndex]];
    if (gameUIState > 0 && gameUIState < (gameQuestionCount * 2) && gameUIState % 2 == 1) {
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
    } else if (gameUIState > 0 && gameUIState < (gameQuestionCount * 2) && gameUIState % 2 == 0) {
        gameUIState++;
        gameQuestionIndex++;
        gameUILibrary.data["ui-question-count-ballon"].Update({text:((gameQuestionIndex+1)+"/"+gameQuestionCount)});
        ShowPanel(gameQuestionLibrary.data['q'+gameQuestionSelected[gameQuestionIndex]].layout);
        PlayAudio(gamePressAudio);
    } else if (gameUIState == (gameQuestionCount * 2)) {
        gameUIState++;
        ShowPanel(8);
        PlayAudio(gamePressAudio);
    } else if (gameUIState == (gameQuestionCount * 2 + 1)) {
        if (_buttonId == 1) {
            gameStage.removeAllChildren();
            gameStage.clear();
            ShowLoadingUI();
            gameLoadSceneAction();
            ShowPanel(0);
            PlayAudio(gamePressAudio);
            gameUILibrary.data["ui-question-count-ballon"].Update({text:"0/"+gameQuestionCount});
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

function GetSequentialInteger(_max) {
    const result = [];
    for (let i = 1; i <= _max; i++) {
        result.push(i);
    }
    return result;
}