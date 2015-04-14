var levelWord = {};

levelWord.global = {

	word : ['CAT',
			'ANT',
			'BAT',
			'RAT',
			'NEWS',
			'BIRD',
			'BABY',
			'FOOD',
			'STEAM',
			'GREEN',
			'APPLE',
			'LEADS',
			'HAPPY',
			'POINT',
			'HAMMER',
			'CAMERA',
			'PRESENT',
			'THUNDER',
			'POLITICAL']

};

ABC.Word = function(game)
{
};

ABC.Word.prototype = {

	create: function()
	{
		this.add.sprite(0,0,'background1');
		this.add.sprite(250,100,'levelBoard');	
		this.add.button(ABC.GAME_WIDTH-475, ABC.GAME_HEIGHT-200,'button-ok',this.startGame,this,1,0,2);


		this.fontStyle = { font: "60px Comic Sans MS", fill: "#FFCC00", stroke: "#333", strokeThickness: 7, align: "center" };
		this.fontStyle1 = { font: "20px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 1, align: "center" };
		this.add.text(330, 200, "Word is :", this.fontStyle1);
		this.add.text(325, 230, levelWord.global.word[ABC.global.level-1], this.fontStyle);
	},

	startGame: function()
	{
		this.state.start('Game');
	} 

};