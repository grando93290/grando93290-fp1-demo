YMCA Web Game
20250305 Update: popup from 3 s to 5s, fix mobile browser behaviour.
20250225 Update: remove game 1 debug timer, update all game loading panel and win panel image (2x image size), update game 3 popup
20250220 Update: minor update Game1, game2, game3 and game5 (game 1 change text, game 2 change popup, game 3 add popup and adjust collision, game 5 change text)
20250214 Update: Update Game 3 and Game 4
20250127 Update: minor update game 3 
20250120 Update: update game 2 popup (renove "請注意")
20250117 Update: update game 2 popup, update game 3 swimer image, update game 4 sprite and randomize enemy.
20250114 Update: Minor update ui image
20250108 Update: Minor update fix "!" mark
20250106 Update: Minor update and Add landscape prompt
20241230 Update: Update loading UI title
20241224 Update: Game 2 Update bgm & Game 3 Update question & Game 4 Update image and bgm
20241223 Update: Game 1 UI Text Update
20241220 Update: Update default game finish url
20241217 Update: First Build


Implement guide:

1: Place '/audio', '/font', '/img', '/js' folders to the same place of the web app.

2: Add the following xml tag to the header of the web app:

    <script src="js/game/game-common.js"></script>
    <script src="js/game/easeljs.min.js"></script>
    <script src="js/game/game-classes.js"></script>
    <script src="js/game/game1-main.js"></script>
    <script src="js/game/game2-common.js"></script>
    <script src="js/game/game2-scene1.js"></script>
    <script src="js/game/game2-scene2.js"></script>
    <script src="js/game/game2-scene3.js"></script>
    <script src="js/game/game2-scene4.js"></script>
    <script src="js/game/game3-main.js"></script>
    <script src="js/game/game4-main.js"></script>
    <script src="js/game/game5-main.js"></script>

3: Open the game by the following javascript code:

	OpenGameView({gameId: 1, gameColor:'#DADC87', url:'/線上遊戲?game=1'})

	gameId: integer, the number of the game [1,2,3,4,5]
	gameColor: color code, background color of the game, default value:
        game1: '#DADC87', game2: '#DADC87', game3: '#DADC87', game4: '#DADC87', game5: '#DADC87'
	url: the link that the web app will go after finish the game, default value = '/線上遊戲?game={gameId}'}

4: please refer to the html file 'game1.html', 'game2.html', 'game3.html', 'game4.html', 'game5.html'. this is a simple demo for implementation.

5: the code for each game
    Game1: OpenGameView({gameId:1});
    Game2: OpenGameView({gameId:2});
    Game3: OpenGameView({gameId:3});
    Game4: OpenGameView({gameId:4});
    Game5: OpenGameView({gameId:5});