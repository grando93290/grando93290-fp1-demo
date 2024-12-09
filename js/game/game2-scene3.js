// quick access / buffer
var s3_cloud1, s3_cloud2, s3_cloud3, s3_cloud4;
var s3_grass, s3_mushroom1, s3_mushroom2;
var s3_duck1, s3_duck2, s3_duck3, s3_duck4, s3_rabbit1, s3_rabbit2;
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
        "game2-scene3-duck1": {image:"img/game2/game2-scene3-duck1-min.png"},
        "game2-scene3-duck2": {image:"img/game2/game2-scene3-duck2-min.png"},
        "game2-scene3-rabbit": {image:"img/game2/game2-scene3-rabbit-min.png"},
        "game2-scene3-audio": {audio:"audio/game/game2scene3.mp3"},
    }, UpdateLoadingBar, StartGameScene3);
}

function StartGameScene3() {
    HideLoadingUI();
    InitializeGameScene3Question();
    gameQuestionBallon.Update({text:"0/"+gameQuestionSelected.length});
    gameScoreBallon.Update({text:"0"});

    gameObjectLibrary = new GameObjectLibrary({
        "s3_sky": {transform:{posX:0, posY:0, sizeX:1920, sizeY:1080},bitmap:gameAssetLibrary.data["game2-scene3-sky"]},
        "s3_cloud1": {transform:{posX:60, posY:75, sizeX:617, sizeY:254},bitmap:gameAssetLibrary.data["game2-scene3-cloud1"]},
        "s3_cloud2": {transform:{posX:737, posY:0, sizeX:504, sizeY:88},bitmap:gameAssetLibrary.data["game2-scene3-cloud2"]},
        "s3_cloud3": {transform:{posX:710, posY:232, sizeX:728, sizeY:263},bitmap:gameAssetLibrary.data["game2-scene3-cloud3"]},
        "s3_cloud4": {transform:{posX:1350, posY:60, sizeX:501, sizeY:193},bitmap:gameAssetLibrary.data["game2-scene3-cloud4"]},
        "s3_bg": {transform:{posX:0, posY:22, sizeX:1920, sizeY:1058},bitmap:gameAssetLibrary.data["game2-scene3-bg"]},
        "s3_grass": {transform:{posX:0, posY:1080, sizeX:1920, sizeY:448, anchorX:0, anchorY:1},bitmap:gameAssetLibrary.data["game2-scene3-grass"]},
        "s3_duck4": {transform:{posX:1000, posY:830, sizeX:288, sizeY:143, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game2-scene3-duck2"]},
        "s3_duck3": {transform:{posX:600, posY:830, sizeX:288, sizeY:147.8, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game2-scene3-duck1"]},
        "s3_duck2": {transform:{posX:1000, posY:0, sizeX:288, sizeY:143, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game2-scene3-duck2"]},
        "s3_duck1": {transform:{posX:600, posY:0, sizeX:288, sizeY:147.8, anchorX:0.5, anchorY:0.5},bitmap:gameAssetLibrary.data["game2-scene3-duck1"]},
    });
    s3_cloud1 = gameObjectLibrary.data["s3_cloud1"];
    s3_cloud2 = gameObjectLibrary.data["s3_cloud2"];
    s3_cloud3 = gameObjectLibrary.data["s3_cloud3"];
    s3_cloud4 = gameObjectLibrary.data["s3_cloud4"];
    s3_grass = gameObjectLibrary.data["s3_grass"];
    s3_mushroom1 = gameObjectLibrary.data["s3_mushroom1"];
    s3_mushroom2 = gameObjectLibrary.data["s3_mushroom2"];
    s3_duck1 = gameObjectLibrary.data["s3_duck1"];
    s3_duck1.SetupAnimation([
        { time: 0, x: 1053-500, y: 832+65 },
        { time: 4, x: 694-550, y: 850+75 },
        { time: 9, x: 325-500, y: 899+70 },
    ]);
    s3_duck2 = gameObjectLibrary.data["s3_duck2"];
    s3_duck2.SetupAnimation([
        { time: 0, x: 1013-500, y: 818+60 },
        { time: 4, x: 664-500, y: 830+60 },
        { time: 9, x: 345-500, y: 869+60 },
    ]);
    s3_duck3 = gameObjectLibrary.data["s3_duck3"];
    s3_duck3.SetupAnimation([
        { time: 0, x: 1251, y: 747 },
        { time: 4, x: 1053, y: 832 },
        { time: 9, x: 694, y: 850 },
        { time: 15, x: 325, y: 899 },
    ]);
    s3_duck4 = gameObjectLibrary.data["s3_duck4"];
    s3_duck4.SetupAnimation([
        { time: 0, x: 1281, y: 727 },
        { time: 4, x: 1013, y: 818 },
        { time: 9, x: 664, y: 830 },
        { time: 15, x: 345, y: 869 },
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
    // s3_duck1_scale = 0.5 + s3_duck1_scale * s3_duck1_scale * 0.5;
    s3_duck1_scale = 0.5 + s3_duck1_scale * 0.5;
    s3_duck1.transform.sizeX = 288*s3_duck1_scale;
    s3_duck1.transform.sizeY = 147.8*s3_duck1_scale;
    s3_duck1.PlayAnimation(time);

    let s3_duck2_scale = (s3_duck2.transform.posY - 747) / (962 - 747);
    // s3_duck2_scale = 0.5 + s3_duck2_scale * s3_duck2_scale * 0.5;
    s3_duck2_scale = 0.5 + s3_duck2_scale * 0.5;
    s3_duck2.transform.sizeX = 288*s3_duck2_scale;
    s3_duck2.transform.sizeY = 143*s3_duck2_scale;
    s3_duck2.PlayAnimation(time);

    let s3_duck3_scale = (s3_duck3.transform.posY - 747) / (962 - 747);
    // s3_duck3_scale = 0.5 + s3_duck3_scale * s3_duck3_scale * 0.5;
    s3_duck3_scale = 0.5 + s3_duck3_scale * 0.5;
    s3_duck3.transform.sizeX = 288*s3_duck3_scale;
    s3_duck3.transform.sizeY = 147.8*s3_duck3_scale;
    s3_duck3.PlayAnimation(time);

    let s3_duck4_scale = (s3_duck4.transform.posY - 747) / (962 - 747);
    // s3_duck4_scale = 0.5 + s3_duck4_scale * s3_duck4_scale * 0.5;
    s3_duck4_scale = 0.5 + s3_duck4_scale * 0.5;
    s3_duck4.transform.sizeX = 288*s3_duck4_scale;
    s3_duck4.transform.sizeY = 143*s3_duck4_scale;
    s3_duck4.PlayAnimation(time);

    let s3_rabbit1_scale = (s3_rabbit1.transform.posY - 700) / (1000 - 700);
    // s3_rabbit1_scale = 0.5 + s3_rabbit1_scale * s3_rabbit1_scale * 0.5;
    s3_rabbit1_scale = 0.5 + s3_rabbit1_scale * 0.5;
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
    // s3_rabbit2_scale = 0.5 + s3_rabbit2_scale * s3_rabbit2_scale * 0.5;
    s3_rabbit2_scale = 0.5 + s3_rabbit2_scale * 0.5;
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
    gameQuestionSelected = isGameQuestionDebugging ? GetSequentialInteger(24) : GetRandomNumbers(1, 11, 3).concat(GetRandomNumbers(12, 24, 2));
    gameQuestionIndex = 0;
    gameQuestionScore = 0;
    gameQuestionCorrect = false;
}

