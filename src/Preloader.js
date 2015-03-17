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

        this.load.image('background1', 'assets/images/background1.png');
        this.load.image('button-pause', 'assets/images/button-pause.png');
        this.load.image('floor', 'assets/images/floor.png');

        this.load.spritesheet('bonus', 'assets/images/bonusCandy.png', 100, 100);
        this.load.spritesheet('button-start', 'assets/images/button-start.png', 401, 143);
        this.load.spritesheet('abcd', 'assets/images/alphabet.png', 100, 100);
        this.load.spritesheet('abcd1', 'assets/images/alphabet_letters1.png', 100, 100);
	},

	create: function()
	{
		this.state.start('MainMenu');
	}

};