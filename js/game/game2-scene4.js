// quick access / buffer
var s4_bicycle, s4_car1, s4_car2, s4_bus, s4_pedestrian1, s4_pedestrian2, s4_pedestrian3;
var s4_car1_audio_hasPlay, s4_car2_audio_hasPlay, s4_bus_audio_hasPlay;

function InitializeGameScene4() {
    gameAssetLibrary = new AssetLibrary({
        "game2-scene4-bg": {image:"img/game2/game2-scene4-bg-min.png"},
        "game2-scene4-props": {image:"img/game2/game2-scene4-props-min.png"},
        "game2-scene4-car1": {image:"img/game2/game2-scene4-car1-min.png"},
        "game2-scene4-car2": {image:"img/game2/game2-scene4-car2-min.png"},
        "game2-scene4-bicycle": {image:"img/game2/game2-scene4-bicycle-min.png"},
        "game2-scene4-bus": {image:"img/game2/game2-scene4-bus-min.png"},
        "game2-scene4-pedestrian1": {image:"img/game2/game2-scene4-pedestrian1-min.png"},
        "game2-scene4-pedestrian2": {image:"img/game2/game2-scene4-pedestrian2-min.png"},
        "game2-scene4-pedestrian3": {image:"img/game2/game2-scene4-pedestrian3-min.png"},
        "game2-scene4-rubbishbin": {image:"img/game2/game2-scene4-rubbishbin-min.png"},
        "game2-scene4-trafficlight": {image:"img/game2/game2-scene4-trafficlight-min.png"},
        "game2-scene4-audio": {audio:"audio/game/game2scene4.mp3"},
        "game2-scene4-car-audio": {audio:"audio/game/game2scene4_car.mp3"},
    }, UpdateGame2LoadingBar, StartGameScene4);
}

function StartGameScene4() {
    HideGame2LoadingUI();
    InitializeGameScene4Question();
    gameQuestionBallon.Update({text:"0/"+gameQuestionSelected.length});
    gameScoreBallon.Update({text:"0"});
    gameBackBallon.SetEnabled(true);

    gameObjectLibrary = new GameObjectLibrary({
        "s4_bg": {transform:{posX:0, posY:0, sizeX:1920, sizeY:1080},bitmap:gameAssetLibrary.data["game2-scene4-bg"]},
        // "s4_car1": {transform:{posX:0, posY:640, sizeX:108, sizeY:40, flip:true},bitmap:gameAssetLibrary.data["game2-scene4-car1"]},
        // "s4_car2": {transform:{posX:0, posY:640, sizeX:108, sizeY:40, flip:true},bitmap:gameAssetLibrary.data["game2-scene4-car2"]},
    });

    var bicycleSpriteSheet = new createjs.SpriteSheet({ 
        images: [gameAssetLibrary.data["game2-scene4-bicycle"].image], 
        frames: {width:48, height:50},
        animations: {'a0':0,'a1':1,}
    });
    s4_bicycle = gameObjectLibrary.AddGameObject("s4_bicycle", {transform:{posX:0, posY:630, sizeX:48, sizeY:50}, sprite:{spriteSheet:bicycleSpriteSheet, spriteIndices:[0,1]}});

    gameObjectLibrary.AddGameObject("s4_props", {transform:{posX:0, posY:0, sizeX:1920, sizeY:1080},bitmap:gameAssetLibrary.data["game2-scene4-props"]});

    s4_bus = gameObjectLibrary.AddGameObject("s4_bus", {transform:{posX:785, posY:762, sizeX:239, sizeY:400, anchorX:0.5, anchorY:1},bitmap:gameAssetLibrary.data["game2-scene4-bus"]});

    gameObjectLibrary.AddGameObject("s4_trafficlight1", {transform:{posX:520, posY:401, sizeX:77, sizeY:354},bitmap:gameAssetLibrary.data["game2-scene4-trafficlight"]});

    s4_pedestrian1 = gameObjectLibrary.AddGameObject("s4_pedestrian1", {transform:{posX:0, posY:540, sizeX:1920, sizeY:350},bitmap:gameAssetLibrary.data["game2-scene4-pedestrian1"]});
    s4_pedestrian2 = gameObjectLibrary.AddGameObject("s4_pedestrian2", {transform:{posX:0, posY:540, sizeX:1920, sizeY:350},bitmap:gameAssetLibrary.data["game2-scene4-pedestrian2"]});
    s4_pedestrian3 = gameObjectLibrary.AddGameObject("s4_pedestrian3", {transform:{posX:0, posY:540, sizeX:1920, sizeY:350},bitmap:gameAssetLibrary.data["game2-scene4-pedestrian3"]});

    gameObjectLibrary.AddGameObject("s4_trafficlight2", {transform:{posX:1609, posY:449, sizeX:87, sizeY:399},bitmap:gameAssetLibrary.data["game2-scene4-trafficlight"]});

    gameObjectLibrary.AddGameObject("s4_rubbishbin", {transform:{posX:1697, posY:716, sizeX:94, sizeY:137},bitmap:gameAssetLibrary.data["game2-scene4-rubbishbin"]});

    s4_car1 = gameObjectLibrary.AddGameObject("s4_car1", {transform:{posX:2100, posY:750, sizeX:689, sizeY:290},bitmap:gameAssetLibrary.data["game2-scene4-car1"]});
    s4_car2 = gameObjectLibrary.AddGameObject("s4_car2", {transform:{posX:2100, posY:750, sizeX:689, sizeY:290},bitmap:gameAssetLibrary.data["game2-scene4-car2"]});

    gameStage.update();

    s4_car1_audio_hasPlay = false;
    s4_car2_audio_hasPlay = false;
    s4_bus_audio_hasPlay = false;

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

    if (time < 5) {
        let s4_bus_targetPosY = 680;
        let s4_bus_posY = 762 - Math.sqrt(time/5.0) * (762 - s4_bus_targetPosY);
        let s4_bus_scale = (s4_bus_posY - s4_bus_targetPosY) / (762 - s4_bus_targetPosY);
        s4_bus_scale = 0.2 + s4_bus_scale * 0.8;
        s4_bus.SetPosition({posX: 785 + time/5.0*120, posY: s4_bus_posY, sizeX:239 * s4_bus_scale, sizeY:400 * s4_bus_scale});
    } else if (time < 6) {
        s4_bus.renderer.alpha = 1.0 - (time - 5.0);
    }

    if (time > 2.5 && time < 6) {
        s4_car1.SetPosition({posX:1920 - (time - 2.5) * 1080});
    }
    if (time > 0.5 && !s4_car1_audio_hasPlay) {
        PlayAudio(gameAssetLibrary.data["game2-scene4-car-audio"].audio);
        s4_car1_audio_hasPlay = true;
    }

    if (time > 9.5 && time < 12) {
        s4_car2.SetPosition({posX:1920 - (time - 9.5) * 1380});
    }
    if (time > 7 && !s4_car2_audio_hasPlay) {
        PlayAudio(gameAssetLibrary.data["game2-scene4-car-audio"].audio);
        s4_car2_audio_hasPlay = true;
    }

    if (time > 6 && time < 15) {
        s4_bicycle.SetPosition({posX:660 + (time - 6) * 100});
        s4_bicycle.SetAnimationIndex(Math.floor((Math.abs(runTime * 4)) % 2));
    }

    let t = time % 3;
    function lerp(a, b, fraction) {
        return a + (b - a) * fraction;
    }
    let alpha1 = 0, alpha2 = 0, alpha3 = 0;
    if (t < 0.8) {
        alpha1 = 1;
        alpha2 = 0;
        alpha3 = 0;
    } else if (t < 1) {
        const progress = (t - 0.8) / 0.2;
        alpha1 = lerp(1, 0, progress);
        alpha2 = lerp(0, 1, progress);
        alpha3 = 0;
    } else if (t < 1.8) {
        alpha1 = 0;
        alpha2 = 1;
        alpha3 = 0;
    } else if (t < 2) {
        const progress = (t - 1.8) / 0.2;
        alpha1 = 0;
        alpha2 = lerp(1, 0, progress);
        alpha3 = lerp(0, 1, progress);
    } else if (t < 2.8) {
        alpha1 = 0;
        alpha2 = 0;
        alpha3 = 1;
    } else if (t < 3) {
        const progress = (t - 2.8) / 0.2;
        alpha1 = lerp(0, 1, progress);
        alpha2 = 0;
        alpha3 = lerp(1, 0, progress);
    }
    s4_pedestrian1.renderer.alpha = alpha1;
    s4_pedestrian2.renderer.alpha = alpha2;
    s4_pedestrian3.renderer.alpha = alpha3;

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
        "q5": {"question": "您在場景中看到什麼車輛？", "ans1": "巴士", "ans2": "單車", "ans3": "的士", "ans4": "以上皆有", "correct":[1,2,3,4], "isEmotional":false, "layout":4},
        "q6": {"question": "有多少輛車經過（包括單車）", "ans1": "2輛", "ans2": "3輛", "ans3": "4輛", "ans4": "沒有", "correct":[3], "isEmotional":false, "layout":4},
        "q7": {"question": "街道上有多少張長椅？", "ans1": "1張", "ans2": "2張", "ans3": "3張", "ans4": "沒有", "correct":[4], "isEmotional":false, "layout":4},
        "q8": {"question": "街道上有多少個垃圾桶？", "ans1": "1個", "ans2": "2個", "ans3": "3個", "ans4": "沒有", "correct":[1], "isEmotional":false, "layout":4},
        "q9": {"question": "道路上有多少根燈柱？", "ans1": "1根", "ans2": "2根", "ans3": "3根", "ans4": "沒有", "correct":[2], "isEmotional":false, "layout":4},
        "q10": {"question": "道路上的交通標誌是什麼形狀？", "ans1": "圓形", "ans2": "三角形", "ans3": "正方形", "ans4": "沒有", "correct":[4], "isEmotional":false, "layout":4},
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
    gameQuestionSelected = isGameQuestionDebugging ? GetSequentialInteger(24) : GetRandomNumbers(1, 12, 3).concat(GetRandomNumbers(13, 24, 2));
    gameQuestionIndex = 0;
    gameQuestionScore = 0;
    gameQuestionCorrect = false;
}

