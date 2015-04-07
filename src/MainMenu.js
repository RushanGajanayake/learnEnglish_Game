ABC.MainMenu = function(game)
{

};

ABC.MainMenu.prototype = {

	create: function()
	{
		this.add.sprite(0,0,'start-background');
		
		this.add.sprite(ABC.GAME_WIDTH-800, ABC.GAME_HEIGHT-600,'start');
		this.add.button(ABC.GAME_WIDTH-475, ABC.GAME_HEIGHT-150,'button-start',this.startGame,this,1,0,2);
	},

	startGame: function()
	{
		this.state.start('LevelSelect');
	}

};