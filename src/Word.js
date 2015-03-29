ABC.Word = function(game)
{

	this.givenWord = 'APPLE';

	ABC.showWord = null;
};

ABC.Word.prototype = {

	create: function()
	{
		this.add.sprite(0,0,'background1');
		this.add.sprite(250,100,'levelBoard');	
		this.add.button(ABC.GAME_WIDTH-475, ABC.GAME_HEIGHT-200,'button-ok',this.startGame,this,1,0,2);

		this.fontStyle = { font: "40px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
		this.fontStyle1 = { font: "20px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 1, align: "center" };
		this.add.text(330, 200, "Your word is :", this.fontStyle1);
		this.add.text(325, 250, "APPLE", this.fontStyle);
	},

	startGame: function()
	{
		this.state.start('Game');
	} 

};