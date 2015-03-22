ABC.Preloader = function(game)
{
	ABC.GAME_WIDTH = 800;
	ABC.GAME_HEIGHT = 600;
};

ABC.Preloader.prototype = {

	preload: function()
	{
		this.stage.backgroundColor = '#B4D9E7';
        this.preloadStar = this.add.sprite((ABC.GAME_WIDTH-100)/2, (ABC.GAME_HEIGHT-100)/2, 'preloadStar');
        this.load.setPreloadSprite(this.preloadStar);
        this.load.image('start-background', 'assets/images/starting-background.png');
        this.load.image('background1', 'assets/images/new_bg.png');
        this.load.image('button-pause', 'assets/images/button-pause.png');
        this.load.image('floor', 'assets/images/floor.png');
        this.load.image('start', 'assets/images/ABC_click.png');

        this.load.spritesheet('bonus', 'assets/images/bonusCandy.png', 100, 100);
        this.load.spritesheet('bonusMarks', 'assets/images/bonusCandyMarks.png', 80, 80);
        this.load.spritesheet('button-start', 'assets/images/start_btn.png', 150, 50);
        this.load.spritesheet('abcd', 'assets/images/alphabet.png', 100, 100);
        this.load.spritesheet('abcd1', 'assets/images/alphabet_letters1.png', 100, 100);
	},

	create: function()
	{
		this.state.start('MainMenu');
	}

};