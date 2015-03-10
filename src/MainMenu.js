ABC.MainMenu = function(game)
{

};

ABC.MainMenu.prototype = {

	create: function()
	{
		this.add.sprite(0,0,'background1');
		

		this.add.button(ABC.GAME_WIDTH-500, ABC.GAME_HEIGHT-400,'button-start',this.startGame,this,1,0,2);
	},

	startGame: function()
	{
		this.state.start('Game');
	}

};