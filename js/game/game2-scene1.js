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
    gameQuestionBallon.Update({text:"0/"+gameQuestionSelected.length});
    gameScoreBallon.Update({text:"0"});

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
    gameQuestionSelected = isGameQuestionDebugging ? GetSequentialInteger(23) : GetRandomNumbers(1, 11, 3).concat(GetRandomNumbers(12, 23, 2));
    gameQuestionIndex = 0;
    gameQuestionScore = 0;
    gameQuestionCorrect = false;
}





