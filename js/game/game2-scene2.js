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
    }, UpdateGame2LoadingBar, StartGameScene2);
}

function StartGameScene2() {
    HideGame2LoadingUI();
    InitializeGameScene2Question();
    gameQuestionBallon.Update({text:"0/"+gameQuestionSelected.length});
    gameScoreBallon.Update({text:"0"});
    gameBackBallon.SetEnabled(true);

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

    gameIsFirstFrame = true;
    gameIsShowPopup = false;
    gameIsFadePopup = false;
    gameTimeBuffer1 = true;
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", LoopGameScene2);

    // PlayAudio(gameAssetLibrary.data["game2-scene2-audio"].audio);
}

function LoopGameScene2(_evt) {
    let runTime = _evt.runTime / 1000 * 0.8;
    if (gameTimeBuffer1) {
        gameTimeBuffer2 = runTime;
        gameTimeBuffer1 = false;
    }
    let time = runTime - gameTimeBuffer2;

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
            PlayAudio(gameAssetLibrary.data["game2-scene2-audio"].audio);
            gameIsShowPopup = true;
        }
        return;
    }

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
        s2_crab.SetAnimationIndex(Math.floor((Math.abs(time * 25)) % 4));
        s2_crab.PlayAnimation(time);
    }

    if (time < 3) {
        s2_seagull1.transform.posX = -300 + Math.sin(time / 3 * Math.PI) * 700;
        s2_seagull1.transform.posY = -300 + time * 400;
        s2_seagull1.transform.sizeX = time * 200;
        s2_seagull1.transform.sizeY = time * 125;
        s2_seagull1.UpdatePosition();
        s2_seagull1.SetAnimationIndex(Math.floor((Math.abs(time * 10)) % 4));
    }

    if (time > 5 && time < 9) {
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

    gameIsFirstFrame = false;
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
    gameQuestionSelected = isGameQuestionDebugging ? GetSequentialInteger(24) : GetRandomNumbers(1, 11, 3).concat(GetRandomNumbers(12, 24, 2));
    gameQuestionIndex = 0;
    gameQuestionScore = 0;
    gameQuestionCorrect = false;
}


