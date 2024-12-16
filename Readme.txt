YMCA Web Game (20241216)

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

	OpenGameView({gameId: 1, gameColor:'#DADC87', url:'game1finish.html'})

	gameId: integer, the number of the game [1,2,3,4,5]
	gameColor: color code, background color of the game
	url: the link that the web app will go after finish the game.

4: please refer to the html file 'game1.html', 'game2.html', 'game3.html', 'game4.html', 'game5.html'. this is a simple demo for implementation.